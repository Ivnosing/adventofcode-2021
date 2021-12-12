{
  const input = await Deno.readTextFile('day-12-input.txt');
  const caveRels = input.split('\r\n').map(line => line.split('-'));

  const initialCave = 'start';
  const finalCave = 'end';

  const findPaths = (startingCave: string, visited?: string[]): string[][] => {
    const visitedSmallTwice = Object.entries(
      visited?.reduce(
        (acc, curr) => ({ ...acc, [curr]: (acc[curr] || 0) + 1 }),
        {} as { [prop: string]: number }
      ) || {}
    ).some(([key, value]) => key === key.toLowerCase() && value > 1);

    return caveRels
      .filter(
        caveRel =>
          caveRel.includes(startingCave) &&
          caveRel.every(
            cr =>
              cr !== cr.toLowerCase() ||
              (!visitedSmallTwice &&
                !(visited?.includes(initialCave) && cr === initialCave)) ||
              !visited?.includes(cr)
          )
      )
      .reduce((acc, [c1, c2]) => {
        const start = startingCave;
        const end = c1 !== start ? c1 : c2;
        const arr = [...(visited || [])];
        arr.push(start);

        if (end === finalCave) {
          arr.push(end);
          return [...acc, [...arr]];
        }

        return [...acc, ...findPaths(end, arr)];
      }, [] as string[][]);
  };

  console.log(findPaths(initialCave).length);
}
