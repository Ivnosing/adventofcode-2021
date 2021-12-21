{
  const input = await Deno.readTextFile('day-21-input.txt');
  const [player1Start, player2Start] = input
    .split('\r\n')
    .map(line => Number(line.split(': ')[1]));

  class DeterministicDice {
    public get rolls(): number {
      return this._rolls;
    }

    protected nextValue = 1;
    protected _rolls = 0;

    public roll(): number {
      if (this.nextValue > 100) this.nextValue = 1;
      this._rolls++;
      return this.nextValue++;
    }
  }

  class Player {
    protected _score = 0;

    public get score(): number {
      return this._score;
    }

    public get position(): number {
      return this._position;
    }

    constructor(protected _position: number = 1) {}

    public advancePositions(positions: number): void {
      this._position = (this._position + positions) % 10 || 10;
      this._score += this._position;
    }
  }

  const dice = new DeterministicDice();
  const player1 = new Player(player1Start);
  const player2 = new Player(player2Start);

  while (player1.score < 1000 && player2.score < 1000) {
    let position = 0;
    position += dice.roll();
    position += dice.roll();
    position += dice.roll();

    const player = dice.rolls % 2 ? player1 : player2;
    player.advancePositions(position);
  }

  console.log('Rolls', dice.rolls);
  console.log('Player 1 score', player1.score);
  console.log('Player 2 score', player2.score);
}
