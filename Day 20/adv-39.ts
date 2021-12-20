{
  const input = await Deno.readTextFile('day-20-input.txt');
  const [imgEnhancementAlgorithmInput, imgInput] = input
    .split('\r\n\r\n')
    .map(l => l.replaceAll('#', '1').replaceAll('.', '0'));

  const imgEnhancementAlgorithm = imgEnhancementAlgorithmInput
    .split('')
    .map(Number);
  const imgGrid = imgInput.split('\r\n').map(row => row.split('').map(Number));

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

  const getAdjacent = (i: number, j: number): [number, number][] => {
    return [...adjacent.values()].map(([x, y]) => [x + i, y + j]);
  };

  const getBoundary = (time: number) => imgEnhancementAlgorithm[0] & time;

  const padImage = (image: number[][], t: number): number[][] => {
    const size = image.length + 2;
    const paddedImage: number[][] = [];

    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        paddedImage[j] ??= [];
        paddedImage[j][i] = image[j - 1]?.[i - 1] ?? getBoundary(t);
      }
    }

    return paddedImage;
  };

  const enhanceImage = (image: number[][], times: number): number[][] => {
    let finalImg: number[][] = image;

    for (let t = 0; t < times; t++) {
      const paddedImage: number[][] = padImage(finalImg, t);
      const enhancedImage: number[][] = [];

      for (let j = 0; j < paddedImage.length; j++) {
        const enhancedRow = [];
        for (let i = 0; i < paddedImage.length; i++) {
          const bits = getAdjacent(i, j).map(
            ([x, y]) => paddedImage[y]?.[x] ?? getBoundary(t)
          );
          const decimal = parseInt(bits.join(''), 2);

          enhancedRow.push(Number(imgEnhancementAlgorithm[decimal]));
        }
        enhancedImage.push(enhancedRow);
      }

      finalImg = enhancedImage;
    }

    return finalImg;
  };

  console.log(
    enhanceImage(imgGrid, 2)
      .flat()
      .filter(i => i === 1).length
  );
}
