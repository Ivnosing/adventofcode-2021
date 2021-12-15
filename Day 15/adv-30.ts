import { equal } from 'https://deno.land/x/equal/mod.ts';
import { clone } from 'https://deno.land/x/object_clone@1.1.0/mod.ts';

{
  const input = await Deno.readTextFile('day-15-input.txt');
  const map = input.split('\r\n').map(line => line.split('').map(Number));
  const size = map.length;
  const expandedSize = size * 5;

  const expandedMap = Array.from({ length: expandedSize }, (_, j) =>
    Array.from(
      { length: expandedSize },
      (_, i) =>
        ((map[j % size][i % size] +
          Math.floor(j / size) +
          Math.floor(i / size) -
          1) %
          9) +
        1
    )
  );

  const getAdjacent = (i: number, j: number) => [
    [i, j - 1],
    [i, j + 1],
    [i - 1, j],
    [i + 1, j]
  ];

  const riskCount: number[][] = Array.from({ length: expandedSize }, () =>
    Array.from<number>({ length: expandedSize }).fill(Infinity)
  );

  riskCount[0][0] = 0;

  let previousRisks: number[][] = [];

  while (!equal(riskCount, previousRisks)) {
    previousRisks = clone(riskCount);

    for (let j = 0; j < expandedSize; j++) {
      for (let i = 0; i < expandedSize; i++) {
        if (j === 0 && i === 0) continue;

        riskCount[j][i] =
          Math.min(
            ...getAdjacent(i, j).map(([x, y]) => riskCount[y]?.[x] ?? Infinity)
          ) + expandedMap[j][i];
      }
    }
  }

  console.log(riskCount[expandedSize - 1][expandedSize - 1]);
}
