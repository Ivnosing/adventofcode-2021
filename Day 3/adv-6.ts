{
  const input = await Deno.readTextFile('day-3-input.txt');
  const binaryNumbers: string[] = input.split('\r\n');

  const getRate = (
    arr: string[],
    options: { prefer: 'ones' | 'zeros'; find: 'smaller' | 'greater' },
    i = 0
  ): string => {
    console.log(arr);
    if (arr.length === 1) {
      return arr[0];
    }

    // const zeros = arr.filter(bn => bn[i] === '0');
    // const ones = arr.filter(bn => bn[i] === '1');

    const { zeros, ones } = arr.reduce(
      (acc, bn) => ({
        zeros: bn[i] === '0' ? [...acc.zeros, bn] : acc.zeros,
        ones: bn[i] === '1' ? [...acc.ones, bn] : acc.ones
      }),
      { zeros: [] as string[], ones: [] as string[] }
    );

    const keepOnes =
      options.prefer === 'ones'
        ? options.find === 'greater'
          ? ones.length >= zeros.length
          : zeros.length > ones.length
        : options.find === 'greater'
          ? ones.length > zeros.length
          : zeros.length > ones.length;

    return getRate(keepOnes ? ones : zeros, options, i + 1);
  };

  const oxigenGeneratorRating = getRate(binaryNumbers, {
    prefer: 'ones',
    find: 'greater'
  });
  const co2ScrubberRating = getRate(binaryNumbers, {
    prefer: 'zeros',
    find: 'smaller'
  });

  console.log('oxigenGeneratorRating', oxigenGeneratorRating);
  console.log('co2ScrubberRating', co2ScrubberRating);
  console.log(parseInt(oxigenGeneratorRating, 2));
  console.log(parseInt(co2ScrubberRating, 2));
  console.log(parseInt(oxigenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2));
}
