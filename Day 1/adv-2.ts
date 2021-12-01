{
  const input = await Deno.readTextFile('day-1-input.json');
  const depthMeasurements: number[] = JSON.parse(input);

  const depthMeasurementsWindows = depthMeasurements?.reduce(
    (acc, curr, index, array) =>
      index >= 2 ? [...acc, array[index - 2] + array[index - 1] + curr] : acc,
    [] as number[]
  );

  const increments = depthMeasurementsWindows?.reduce(
    ({ last, count }, curr) => ({
      last: curr,
      count: last < curr ? count + 1 : count
    }),
    { last: depthMeasurementsWindows?.[0], count: 0 }
  );

  console.log(increments.count);
}
