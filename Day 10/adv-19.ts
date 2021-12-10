{
  const input = await Deno.readTextFile('day-10-input.txt');
  const lines = input.split('\r\n');

  const openingValues = ['(', '[', '{', '<'];
  const closingValues = [')', ']', '}', '>'];

  enum CharValues {
    ')' = 3,
    ']' = 57,
    '}' = 1197,
    '>' = 25137
  }

  const errorsFound = new Map<string, number>([
    [')', 0],
    [']', 0],
    ['}', 0],
    ['>', 0]
  ]);

  for (const line of lines) {
    const opening: string[] = [];

    for (const char of line.split('')) {
      if (openingValues.includes(char)) {
        opening.push(char);
      } else {
        const equivalentChar = openingValues[closingValues.indexOf(char)];

        if (opening[opening.length - 1] === equivalentChar) {
          opening.splice(opening.lastIndexOf(equivalentChar), 1);
        } else {
          errorsFound.set(char, (errorsFound.get(char) as number) + 1);
          break;
        }
      }
    }
  }

  console.log(errorsFound);
  console.log(
    [...errorsFound.entries()].reduce(
      (acc, [char, count]) =>
        acc + CharValues[char as keyof typeof CharValues] * count,
      0
    )
  );
}
