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

  const steps = 10;

  const finalPolymer = Array.from({ length: steps }).reduce<string>(
    acc =>
      splitInPairs(acc)
        .map(pair => {
          const { 1: result } = pairInsertions.find(
            ([pairMatch]) => pair === pairMatch
          ) as [string, string];
          return `${pair[0]}${result}`;
        })
        .join('')
        .concat(acc[acc.length - 1]),
    polymerTemplate
  );

  const occurrences = new Map<string, number>(
    [...new Set(finalPolymer.split(''))].reduce(
      (acc, char) => [
        ...acc,
        [char, finalPolymer.split('').filter(c => c === char).length]
      ],
      [] as [string, number][]
    )
  );

  console.log([...occurrences.values()].reduce((a, b) => a + b));

  console.log(
    Math.max(...occurrences.values()) - Math.min(...occurrences.values())
  );
}
