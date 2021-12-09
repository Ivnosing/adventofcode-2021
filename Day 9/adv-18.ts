{
  const input = await Deno.readTextFile('day-9-input.txt');
  const heightmap = input.split('\r\n').map(row => row.split('').map(Number));

  const width = heightmap[0].length;
  const height = heightmap.length;

  const adjacent = new Map<string, [number, number]>([
    ['u', [ 0, -1]],
    ['l', [-1,  0]],
    ['r', [ 1,  0]],
    ['d', [ 0,  1]]
  ]);

  const getAdjacent = (i: number, j: number) => {
    return [...adjacent.values()]
      .map(([x, y]) => [x + i, y + j])
      .filter(([x, y]) => x >= 0 && y >= 0 && x < width && y < height);
  };

  const getBasin = (basin: Set<string>, x: number, y: number) => {
    if (!basin.has(`${x},${y}`) && heightmap[y][x] !== 9) {
      basin.add(`${x},${y}`);
      getAdjacent(x, y).forEach(([x, y]) => getBasin(basin, x, y));
      return basin;
    }
  };

  const basins: number[] = [];

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      if (getAdjacent(i, j).every(([x, y]) => heightmap[y][x] > heightmap[j][i])) {
        basins.push((getBasin(new Set(), i, j) as Set<string>).size);
      }
    }
  }

  console.log(
    basins
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b, 1)
  );
}
