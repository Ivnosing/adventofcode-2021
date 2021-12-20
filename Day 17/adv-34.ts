{
  const input = await Deno.readTextFile('day-17-input.txt');
  const [x1, x2, y1, y2] = (input.match(/-?\d+/g) as string[]).map(Number);

  const checkProbeInTarget = ([x, y]: [number, number]) => {
    return x1 <= x && x <= x2 && y1 <= y && y <= y2;
  };

  const advanceStep = ({
    pos: [posX, posY],
    speed: [speedX, speedY]
  }: {
    pos: [number, number];
    speed: [number, number];
  }): {
    pos: [number, number];
    speed: [number, number];
  } => {
    return {
      pos: [posX + speedX, posY + speedY],
      speed: [speedX + Math.sign(speedX) * -1, speedY - 1]
    };
  };

  const throwProbe = (): number => {
    let count = 0;

    for (let x = 1; x < 500; x++) {
      for (let y = -1000; y < 1000; y++) {
        let currentPosition: [number, number] = [0, 0];
        let currentSpeed: [number, number] = [x,y];
        let innerHighestY = -Infinity;

        for (let i = 0; i < 300; i++) {

          if (checkProbeInTarget(currentPosition)) {
            count++;
            break;
          }

          ({ pos: currentPosition, speed: currentSpeed } = advanceStep({
            pos: currentPosition,
            speed: currentSpeed
          }));

          innerHighestY = Math.max(innerHighestY, currentPosition[1]);
        }
      }
    }

    return count;
  };

  console.log(throwProbe());
}
