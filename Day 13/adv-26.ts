{
  const input = await Deno.readTextFile('day-13-input.txt');
  const [dotsInput, foldInstructionsInput] = input
    .split('\r\n\r\n')
    .map(lines => lines.split('\r\n'));

  const dots = dotsInput.map(
    line => line.split(',').map(Number) as [number, number]
  );
  const foldInstructions = foldInstructionsInput.map(line => {
    const [axis, value] = line.replace('fold along ', '').split('=');
    return [axis, Number(value)] as ['x' | 'y', number];
  });

  const fold = (paper: typeof dots, dir: 'x' | 'y', value: number) => {
    const dirX = dir === 'x';
    const max = Math.max(...paper.map(([x, y]) => (dirX ? x : y)));
    const recalcAxis = ([x, y]: [number, number]): [number, number] => [
      dirX && x > value ? Math.abs(x - max) : x,
      !dirX && y > value ? Math.abs(y - max) : y
    ];

    return paper.map(recalcAxis);
  };

  const folded = foldInstructions.reduce(
    (acc, [dir, value]) => fold(acc, dir, value),
    dots
  );

  const uniqueDots: [number, number][] = [
    ...new Set(folded.map(f => JSON.stringify(f)))
  ].map(f => JSON.parse(f));

  // Draw
  const maxX = Math.max(...uniqueDots.map(([x]) => x));
  const maxY = Math.max(...uniqueDots.map(([_, y]) => y));
  const grid: string[][] = new Array(maxY + 1)
    .fill([])
    .map((_, iY) =>
      new Array(maxX + 1)
        .fill('.')
        .map((_, iX) =>
          uniqueDots.some(([x, y]) => x === iX && y === iY) ? '#' : '.'
        )
    );

  console.log(grid.map(row => row.join('')).join('\n'));
}
