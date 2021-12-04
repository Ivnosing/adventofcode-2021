{
  const input = await Deno.readTextFile('day-4-input.txt');
  const randomNumbers = input.split('\r\n', 1)[0].split(',');
  const boards = input
    .split('\r\n\r\n')
    .filter(s => s.includes('\r\n'))
    .map(board => board.split('\r\n'));

  const checkRowsAndColumns = (
    luckyNumbers: string[],
    board: string[]
  ): boolean => {
    const check = (rowsCols: string[]) =>
      rowsCols.every(rc => !!luckyNumbers.find(ln => rc === ln));

    return board.reduce((lucky, rowString, index, arr) => {
      const row = rowString.match(/\d+/g) as string[];
      const col = arr.map(r => (r.match(/\d+/g) as string[])[index]);

      if (check(row) && check(col)) {
        return true;
      }

      return lucky;
    }, false as boolean);
  };

  const numbers: string[] = [];

  outerLoop: for (const index in randomNumbers) {
    const number = randomNumbers[index];
    numbers.push(number);

    for (const board of boards) {
      if (checkRowsAndColumns(numbers, board)) {
        console.log(numbers);
        console.log(board);

        const unmarkedNumbers = board
          .map(row => row.match(/\d+/g) as string[])
          .flat()
          .filter(n => !numbers.includes(n));

        console.log(unmarkedNumbers);

        const unmarkedSum = unmarkedNumbers.reduce(
          (a, b) => Number(a) + Number(b),
          0
        );

        console.log(unmarkedSum);
        console.log(number);
        console.log('Result:', unmarkedSum * Number(number));
        break outerLoop;
      }
    }
  }
}
