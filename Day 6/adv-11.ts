{
  const input = await Deno.readTextFile('day-6-input.txt');
  const fishes = input.split(',').map(Number);
  const days = 80;
  const fishTimer = 6;
  const newFishTimer = 8;

  const newFishes: number[] = fishes;
  for (let i = 0; i < days; i++) {
    newFishes.forEach((fish, i) => {
      if (fish === 0) {
        newFishes[i] = fishTimer;
        newFishes.push(newFishTimer);
      } else {
        newFishes[i] = --fish;
      }
    });
  }

  console.log(newFishes.length);
}
