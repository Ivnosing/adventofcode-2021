{
  const input = await Deno.readTextFile('day-8-input.txt');
  const digits = input
    .split('\r\n')
    .flatMap(line => line.split(' | ')[1].split(' '));

  const digitCount = digits.reduce(
    (acc, curr) => {
      switch (curr.length) {
        case 2:
          return { ...acc, one: ++acc.one };
        case 4:
          return { ...acc, four: ++acc.four };
        case 3:
          return { ...acc, seven: ++acc.seven };
        case 7:
          return { ...acc, eight: ++acc.eight };
      }

      return acc;
    },
    { one: 0, four: 0, seven: 0, eight: 0 }
  );

  console.log(digitCount);
  console.log(Object.values(digitCount).reduce((a, b) => a + b));
}
