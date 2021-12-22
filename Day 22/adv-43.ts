{
  const input = await Deno.readTextFile('day-22-input.txt');
  const instructions = input.split('\r\n').map(line => {
    const [instruction, coords] = line.split(' ') as ['on' | 'off', string];
    const [x, y, z] = coords.split(',');
    const [x1, x2] = x.slice(2).split('..').map(Number);
    const [y1, y2] = y.slice(2).split('..').map(Number);
    const [z1, z2] = z.slice(2).split('..').map(Number);
    return { instruction, x1, x2, y1, y2, z1, z2 };
  });

  const set = new Set<string>();

  for (const { instruction, x1, x2, y1, y2, z1, z2 } of instructions) {
    for (let x = Math.max(x1, -50); x <= Math.min(x2, 50); x++) {
      for (let y = Math.max(y1, -50); y <= Math.min(y2, 50); y++) {
        for (let z = Math.max(z1, -50); z <= Math.min(z2, 50); z++) {
          if (instruction === 'on') {
            set.add(`${x},${y},${z}`);
          } else {
            set.delete(`${x},${y},${z}`);
          }
        }
      }
    }
  }

  console.log(set.size);
}
