{
  const input = await Deno.readTextFile('day-14-input.txt');
  const [polymerTemplate, pairInsertionsInput] = input.split('\r\n\r\n');

  const pairInsertions = pairInsertionsInput
    .split('\r\n')
    .map(line => line.split(' -> ') as [string, string]);

  const splitInPairs = (polymer: string) =>
    Array.from({ length: polymer.length - 1 }).map((_, i) =>
      polymer.substring(i, i + 2)
    );

  const steps = 40;

  let occurrences = new Map<string, number>(
    [...new Set(pairInsertions.map(([pairMatch]) => pairMatch))].reduce(
      (acc, pairMatch) => [
        ...acc,
        [
          pairMatch,
          splitInPairs(polymerTemplate).filter(pair => pair === pairMatch)
            .length
        ]
      ],
      [] as [string, number][]
    )
  );

  const letterCount = polymerTemplate.split('').reduce(
    (count, letter) => ({
      ...count,
      [letter]: (count[letter] || 0) + 1
    }),
    {} as { [prop: string]: number }
  );

  for (let i = 0; i < steps; i++) {
    const innerOccurrences = new Map<string, number>();

    for (const [pairMatch, count] of occurrences.entries()) {
      const match = pairInsertions.find(([pm]) => pairMatch === pm)![1];
      const result1 = `${pairMatch[0]}${match}`;
      const result2 = `${match}${pairMatch[1]}`;

      innerOccurrences.set(
        result1,
        count + (innerOccurrences.get(result1) || 0)
      );
      innerOccurrences.set(
        result2,
        count + (innerOccurrences.get(result2) || 0)
      );

      letterCount[match] = (letterCount[match] || 0) + count;
    }

    occurrences = innerOccurrences;
  }

  console.log(
    Math.max(...Object.values(letterCount)) -
      Math.min(...Object.values(letterCount))
  );
}
