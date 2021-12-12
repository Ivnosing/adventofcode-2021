{
  const input = await Deno.readTextFile('day-12-input.txt');
  const caveRels = input.split('\r\n').map(line => line.split('-'));

  const initialCave = 'start';
  const finalCave = 'end';

  const findPaths = (
    startingCave: string,
    visited?: Set<string>
  ): string[][] => {
    return caveRels
      .filter(
        caveRel =>
          caveRel.includes(startingCave) &&
          caveRel.every(cr => cr !== cr.toLowerCase() || !visited?.has(cr))
      )
      .reduce((acc, [c1, c2]) => {
        const start = startingCave;
        const end = c1 !== start ? c1 : c2;
        const set = new Set<string>([...(visited || [])]);
        set.add(start);

        if (end === finalCave) {
          set.add(end);
          return [...acc, [...set]];
        }

        return [...acc, ...findPaths(end, set)];
      }, [] as string[][]);
  };

  console.log(findPaths(initialCave).length);
}
