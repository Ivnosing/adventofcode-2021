{
  const input = await Deno.readTextFile('day-3-input.txt');
  const binaryNumbers: string[] = input.split('\r\n');

  const { gammaRate, epsilonRate } = new Array(binaryNumbers[0].length)
    .fill(undefined)
    .map((_, i) => {
      const zeros = binaryNumbers.filter(bn => bn[i] === '0').length;
      const ones = binaryNumbers.filter(bn => bn[i] === '1').length;
      return { g: zeros > ones ? '0' : '1', e: zeros > ones ? '1' : '0' };
    })
    .reduce<{ gammaRate: string; epsilonRate: string }>(
      (acc, curr) => ({
        gammaRate: acc.gammaRate + curr.g,
        epsilonRate: acc.epsilonRate + curr.e
      }),
      { gammaRate: '', epsilonRate: '' }
    );

  console.log('gammaRate', gammaRate);
  console.log('epsilonRate', epsilonRate);
  console.log(parseInt(gammaRate, 2));
  console.log(parseInt(epsilonRate, 2));
  console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
}
