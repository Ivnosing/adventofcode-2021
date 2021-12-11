{
  const input = await Deno.readTextFile('day-11-input.txt');
  const octopuses = input.split('\r\n').map(row => row.split('').map(Number));

  const width = octopuses.length;
  const height = octopuses.length;

  const adjacent = new Map<string, [number, number]>([
    ['ul', [-1, -1]],
    ['u', [0, -1]],
    ['ur', [1, -1]],
    ['cl', [-1, 0]],
    ['c', [0, 0]],
    ['cr', [1, 0]],
    ['dl', [-1, 1]],
    ['d', [0, 1]],
    ['dr', [1, 1]]
  ]);

  const getAdjacent = (i: number, j: number) => {
    return [...adjacent.values()]
      .map(([x, y]) => [x + i, y + j])
      .filter(([x, y]) => x >= 0 && y >= 0 && x < width && y < height);
  };

  const flash = (flashes: Set<string>, x: number, y: number) => {
    if (!flashes.has(`${x},${y}`) && octopuses[x][y] > 9) {
      flashes.add(`${x},${y}`);
      octopuses[x][y] = 0;

      getAdjacent(x, y).forEach(([a, b]) => {
        if (!flashes.has(`${a},${b}`) && octopuses[a][b] !== 0) {
          ++octopuses[a][b];
        }

        flash(flashes, a, b);
      });

      return flashes;
    }
  };

  let step = 0;
  let syncFlash = false;

  while (!syncFlash) {
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        ++octopuses[i][j];
      }
    }

    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        if (octopuses[i][j] > 9) {
          flash(new Set(), i, j);
        }
      }
    }

    step += 1;

    if (octopuses.every(row => row.every(o => o === 0))) {
      syncFlash = true;
    }
  }

  console.log(step);
}
