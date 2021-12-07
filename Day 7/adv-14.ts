{
  const input = await Deno.readTextFile('day-7-input.txt');
  const positions = input
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);

  const fuelCosts = positions.map((pos, _, arr) =>
    arr.reduce((acc, curr) => {
      const fuelCost = Math.abs(pos - curr);
      return acc + fuelCost * (fuelCost + 1) / 2;
    }, 0)
  );

  const min = Math.min(...fuelCosts);
  console.log(min);

  // const min = fuelCosts.reduce(
  //   (acc, curr, i) => ({
  //     n: acc.n && curr > acc.n ? acc.n : curr,
  //     i: acc.n && curr > acc.n ? acc.i : i
  //   }),
  //   {} as { n: number; i: number }
  // );

  // console.log(positions[min.i]);
  // console.log(min.n);
}
