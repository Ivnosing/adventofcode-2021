// import dijkstra from 'https://deno.land/x/dijkstra/mod.ts';
import { equal } from 'https://deno.land/x/equal/mod.ts';
import { clone } from 'https://deno.land/x/object_clone@1.1.0/mod.ts';

{
  const input = await Deno.readTextFile('day-15-input.txt');
  const map = input.split('\r\n').map(line => line.split('').map(Number));
  const size = map.length;

  const getAdjacent = (i: number, j: number) => [
    [i, j - 1],
    [i, j + 1],
    [i - 1, j],
    [i + 1, j]
  ];

  // const graph: { [prop: string]: { [prop: string]: number } } =
  //   Object.fromEntries(
  //     Object.entries(
  //       map.reduce(
  //         (acc, curr, j) => ({
  //           ...acc,
  //           ...curr.reduce(
  //             (inAcc, _, i) => ({
  //               ...inAcc,
  //               [`${i},${j}`]: getAdjacent(i, j).reduce(
  //                 (obj, [x, y]) => ({
  //                   ...obj,
  //                   [`${x},${y}`]: map[y] ? map[y][x] : null
  //                 }),
  //                 {} as { [prop: string]: number | null }
  //               )
  //             }),
  //             {} as { [prop: string]: { [prop: string]: number | null } }
  //           )
  //         }),
  //         {} as { [prop: string]: { [prop: string]: number | null } }
  //       )
  //     ).map(([key, value]) => [
  //       key,
  //       Object.fromEntries(
  //         Object.entries(value).filter(
  //           ({ 1: v }) => v !== null && v !== undefined
  //         ) as [string, number][]
  //       )
  //     ])
  //   );

  // const path = dijkstra.find_path(graph, '0,0', `${size - 1},${size - 1}`);

  // console.log(
  //   path
  //     .map(coord => coord.split(',').map(Number))
  //     .map(([x, y]) => map[y][x])
  //     .reduce((a, b) => a + b, 0) - 1
  // );

  const riskCount: number[][] = Array.from({ length: size }, () =>
    Array.from<number>({ length: size }).fill(Infinity)
  );

  riskCount[0][0] = 0;

  let previousRisks: number[][] = [];

  while (!equal(riskCount, previousRisks)) {
    previousRisks = clone(riskCount);

    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        if (j === 0 && i === 0) continue;

        riskCount[j][i] =
          Math.min(
            ...getAdjacent(i, j).map(([x, y]) => riskCount[y]?.[x] ?? Infinity)
          ) + map[j][i];
      }
    }
  }

  console.log(riskCount[size - 1][size - 1]);
}
