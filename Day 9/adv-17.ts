{
  const input = await Deno.readTextFile('day-9-input.txt');
  const heightmap = input.split('\r\n').map(row => row.split('').map(Number));

  const adjacent = new Map<string, [number, number]>([
    ['u', [ 0, -1]],
    ['l', [-1,  0]],
    ['r', [ 1,  0]],
    ['d', [ 0,  1]]
  ]);

  let sum = 0;

  for (let j = 0; j < heightmap.length; j++) {
    const row = heightmap[j];

    for (let i = 0; i < row.length; i++) {
      const adj = [...adjacent.values()]
        .map(([x, y]) => [x + i, y + j])
        .filter(
          ([x, y]) => x >= 0 && y >= 0 && x < row.length && y < heightmap.length
        );

      if (adj.every(([x, y]) => heightmap[y][x] > row[i])) {
        sum += row[i] + 1;
      }
    }
  }

  console.log(sum);
}
