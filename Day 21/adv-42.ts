{
  const input = await Deno.readTextFile('day-21-input.txt');
  const [player1Start, player2Start] = input
    .split('\r\n')
    .map(line => Number(line.split(': ')[1]));

  class QuantumDice {
    public roll(): [number, number, number] {
      return [1, 2, 3];
    }
  }

  class Player {
    public get score(): number {
      return this._score;
    }

    public get position(): number {
      return this._position;
    }

    constructor(
      protected _position: number = 1,
      protected _score: number = 0
    ) {}

    public advancePositions(positions: number): void {
      this._position = (this._position + positions) % 10 || 10;
      this._score += this._position;
    }
  }

  const dice = new QuantumDice();
  const wins = { player1: 0, player2: 0 };
  const rollSums: Map<number, number> = new Map();

  for (const r1 of dice.roll()) {
    for (const r2 of dice.roll()) {
      for (const r3 of dice.roll()) {
        const rollSum = r1 + r2 + r3;
        rollSums.set(rollSum, (rollSums.get(rollSum) || 0) + 1);
      }
    }
  }

  const play = (config: {
    players: { player1: Player; player2: Player };
    turn: 0 | 1;
    count: number;
  }) => {
    if (
      config.players.player1.score >= 21 ||
      config.players.player2.score >= 21
    ) {
      const player = config.players.player1.score >= 21 ? 'player1' : 'player2';
      wins[player] += config.count;
      return;
    }

    for (const [rollSum, rollSumCount] of rollSums) {
      const player1 = new Player(
        config.players.player1.position,
        config.players.player1.score
      );
      const player2 = new Player(
        config.players.player2.position,
        config.players.player2.score
      );
      const player = config.turn ? player2 : player1;
      player.advancePositions(rollSum);

      play({
        players: { player1, player2 },
        turn: Number(!config.turn) as 0 | 1,
        count: config.count * rollSumCount
      });
    }
  };

  for (const [rollSum, rollSumCount] of rollSums) {
    const player1 = new Player(player1Start);
    const player2 = new Player(player2Start);
    player1.advancePositions(rollSum);

    play({
      players: { player1, player2 },
      turn: 1,
      count: rollSumCount
    });
  }

  console.log(wins);
}
