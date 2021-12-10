{
  const input = await Deno.readTextFile('day-10-input.txt');
  const lines = input.split('\r\n');

  const openingValues = ['(', '[', '{', '<'];
  const closingValues = [')', ']', '}', '>'];

  enum CharValues {
    ')' = 1,
    ']',
    '}',
    '>'
  }

  const incompleteLines = new Map<string, string>();

  for (const line of lines) {
    const opening: string[] = [];

    for (const char of line.split('')) {
      if (openingValues.includes(char)) {
        opening.push(char);
      } else {
        const equivalentChar = openingValues[closingValues.indexOf(char)];

        if (opening[opening.length - 1] !== equivalentChar) {
          opening.splice(0);
          break;
        }

        opening.splice(opening.lastIndexOf(equivalentChar), 1);
      }
    }

    if (opening.length) {
      const closing = opening
        .reverse()
        .map(char => closingValues[openingValues.indexOf(char)])
        .join('');

      incompleteLines.set(line, closing);
    }
  }

  const scores = [...incompleteLines.values()].map(tail =>
    tail
      .split('')
      .reduce(
        (acc, curr) => acc * 5 + CharValues[curr as keyof typeof CharValues],
        0
      )
  );

  console.log(scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)]);
}
