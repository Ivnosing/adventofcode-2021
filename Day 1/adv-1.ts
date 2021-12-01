{
  const input = await Deno.readTextFile('day-1-input.json');
  const depthMeasurements: number[] = JSON.parse(input);

  const increments = depthMeasurements.reduce(
    ({ last, count }, curr) => ({
      last: curr,
      count: last < curr ? count + 1 : count
    }),
    { last: depthMeasurements[0], count: 0 }
  );

  console.log(increments.count);
}
