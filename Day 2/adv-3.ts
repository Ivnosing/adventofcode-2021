{
  const input = await Deno.readTextFile('day-2-input.txt');
  const commands: string[] = input.split('\r\n');

  const position = commands.reduce(
    ({ horizontal, depth }, curr) => {
      const amount = Number(curr[curr.length - 1]);

      return {
        horizontal: curr.includes('forward')
          ? horizontal + amount
          : horizontal,
        depth: curr.includes('down')
          ? depth + amount
          : curr.includes('up')
            ? depth - amount
            : depth
      };
    },
    { horizontal: 0, depth: 0 }
  );

  console.log(position);
  console.log(position.horizontal * position.depth);
}
