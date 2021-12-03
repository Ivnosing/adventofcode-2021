{
  const input = await Deno.readTextFile('day-2-input.txt');
  const commands: string[] = input.split('\r\n');

  const position = commands.reduce(
    ({ horizontal, depth, aim }, curr) => {
      const amount = Number(curr[curr.length - 1]);

      return {
        horizontal: curr.includes('forward')
          ? horizontal + amount
          : horizontal,
        aim: curr.includes('down')
          ? aim + amount
          : curr.includes('up')
            ? aim - amount
            : aim,
        depth: curr.includes('forward')
          ? depth + aim * amount
          : depth
      };
    },
    { horizontal: 0, depth: 0, aim: 0 }
  );

  console.log(position);
  console.log(position.horizontal * position.depth);
}
