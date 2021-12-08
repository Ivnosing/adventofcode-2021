{
  const input = await Deno.readTextFile('day-8-input.txt');
  const entries = input.split('\r\n').flatMap(line => {
    const [left, right] = line.split(' | ').map(s => s.split(' '));
    return { left, right };
  });

  const segmentToNumber = new Map<string, number>([
    ['abcefg', 0],
    ['cf', 1],
    ['acdeg', 2],
    ['acdfg', 3],
    ['bcdf', 4],
    ['abdfg', 5],
    ['abdefg', 6],
    ['acf', 7],
    ['abcdefg', 8],
    ['abcdfg', 9]
  ]);

  const getDigitMap = (digits: string[]) => {
    try {
      const map = new Map<string, string>();
  
      const eight = digits.find(d => d.length === 7) as string;
      const four = digits.find(d => d.length === 4) as string;
      const seven = digits.find(d => d.length === 3) as string;
      const one = digits.find(d => d.length === 2) as string;
  
      const addDigits = (...ds: string[]) =>
        [...new Set(ds.flatMap(d => d.split('')))].join('');
      const subtractDigits = (d1: string, d2: string) =>
        d2.split('').reduce((acc, curr) => acc.replace(curr, ''), d1);

      const a = subtractDigits(seven, one);

      const abcdf = addDigits(four, a);
      const bd = subtractDigits(four, one);

      const nine = digits.find(
        d =>
          d.length === 6 &&
          abcdf.split('').every(ad => d.split('').includes(ad))
      ) as string;

      const six = digits.find(
        d =>
          d.length === 6 &&
          d !== nine &&
          bd.split('').every(ad => d.split('').includes(ad))
      ) as string;

      const zero = digits.find(
        d => d.length === 6 && d !== nine && d !== six
      ) as string;

      const c = subtractDigits(eight, six);
      const d = subtractDigits(eight, zero);
      const e = subtractDigits(eight, nine);
      const f = subtractDigits(one, c);
      const g = subtractDigits(nine, abcdf);
      const b = subtractDigits(bd, d);

      map.set(a, 'a');
      map.set(b, 'b');
      map.set(c, 'c');
      map.set(d, 'd');
      map.set(e, 'e');
      map.set(f, 'f');
      map.set(g, 'g');

      return map;
    } catch {
      throw new Error('Not enough data!');
    }
  };

  const getEntryValue = (entry: {
    right: string[];
    left: string[];
  }): number => {
    const map = getDigitMap([...entry.left, ...entry.right]);
    return Number(
      entry.right
        .map(value =>
          value
            .split('')
            .map(key => map.get(key))
            .sort()
            .join('')
        )
        .map(value => segmentToNumber.get(value))
        .join('')
    );
  };

  const entriesValues = entries.map(entry => getEntryValue(entry));

  console.log(Object.values(entriesValues).reduce((a, b) => a + b));

  //    0:      1:      2:      3:      4:
  //   aaaa    ....    aaaa    aaaa    ....
  //  b    c  .    c  .    c  .    c  b    c
  //  b    c  .    c  .    c  .    c  b    c
  //   ....    ....    dddd    dddd    dddd
  //  e    f  .    f  e    .  .    f  .    f
  //  e    f  .    f  e    .  .    f  .    f
  //   gggg    ....    gggg    gggg    ....

  //    5:      6:      7:      8:      9:
  //   aaaa    aaaa    aaaa    aaaa    aaaa
  //  b    .  b    .  .    c  b    c  b    c
  //  b    .  b    .  .    c  b    c  b    c
  //   dddd    dddd    ....    dddd    dddd
  //  .    f  e    f  .    f  e    f  .    f
  //  .    f  e    f  .    f  e    f  .    f
  //   gggg    gggg    ....    gggg    gggg
}
