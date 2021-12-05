{
  const input = await Deno.readTextFile('day-4-input.txt');
  const randomNumbers = input.split('\r\n', 1)[0].split(',');
  const boards = input
    .split('\r\n\r\n')
    .filter(s => s.includes('\r\n'))
    .map(board => board.split('\r\n'))
    .map(board => board.map(row => row.match(/\d+/g) as string[]));

  const checkRowsAndColumns = (
    luckyNumbers: string[],
    board: string[][]
  ): boolean => {
    const check = (rowsCols: string[]) =>
      rowsCols.every(rc => !!luckyNumbers.find(ln => rc === ln));

    return board.reduce((lucky, row, index, arr) => {
      const col = arr.map(r => r[index]);

      if (check(row) || check(col)) {
        return true;
      }

      return lucky;
    }, false as boolean);
  };

  const numbers: string[] = [];
  const provisionalNumbers: string[] = [];
  const wonBoards: string[][][] = [];
  let lastBoard: { lastBoard: string[][]; number: string } = {
    lastBoard: [],
    number: ''
  };

  for (const index in randomNumbers) {
    const number = randomNumbers[index];
    provisionalNumbers.push(number);

    for (const board of boards) {
      if (
        checkRowsAndColumns(provisionalNumbers, board) &&
        board.toString() !== lastBoard.lastBoard.toString()
      ) {
        if (!wonBoards.find(b => b.toString() === board.toString())) {
          numbers.push(...provisionalNumbers);
          wonBoards.push(board);
          lastBoard = { lastBoard: board, number };
        }
      }
    }
  }

  const unmarkedNumbers = lastBoard.lastBoard
    .flat()
    .filter(n => !numbers.includes(n));

  const unmarkedSum = unmarkedNumbers.reduce(
    (a, b) => Number(a) + Number(b),
    0
  );

  console.log(unmarkedSum);
  console.log(lastBoard.number);
  console.log('Result:', unmarkedSum * Number(lastBoard.number));
}
