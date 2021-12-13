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

  const folded = fold(dots, foldInstructions[0][0], foldInstructions[0][1]);

  console.log(new Set(folded.map(f => JSON.stringify(f))).size);
}
