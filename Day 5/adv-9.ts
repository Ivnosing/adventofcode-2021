{
  const input = await Deno.readTextFile('day-5-input.txt');
  const lines = input
    .split('\r\n')
    .map(line => line.match(/\d+/g) as string[])
    .map(line => line.map(Number))
    .map(([x1, y1, x2, y2]) => ({ x1, y1, x2, y2 }));

  const coords = new Map<string, number>();

  lines.forEach(line => {
    const diffX = line.x2 - line.x1;
    const diffY = line.y2 - line.y1;

    if (diffX && diffY) {
      return;
    }

    new Array(Math.abs(diffX || diffY) + 1)
      .fill(undefined)
      .map((_, i) =>
        diffX
          ? `${line.x1 + i * Math.sign(diffX)},${line.y1}`
          : `${line.x1},${line.y1 + i * Math.sign(diffY)}`
      )
      .forEach(key => coords.set(key, (coords.get(key) || 0) + 1));
  });

  const moreThan2 = [...coords.values()].filter(v => v > 1).length;

  console.log(moreThan2);
}
