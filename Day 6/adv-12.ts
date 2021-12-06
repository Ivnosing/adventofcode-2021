{
  const input = await Deno.readTextFile('day-6-input.txt');
  const fishes = input.split(',').map(Number);
  const days = 256;
  const fishTimer = 6;
  const newFishTimer = 8;

  let newFishes = new Map<number, number>(
    [...new Set(fishes)].reduce(
      (acc, curr) => [...acc, [curr, fishes.filter(f => f === curr).length]],
      [] as [number, number][]
    )
  );

  for (let i = 0; i < days; i++) {
    const innerNewFishes = new Map<number, number>();

    for (const [age, amount] of newFishes.entries()) {
      if (age === 0) {
        innerNewFishes.set(
          fishTimer,
          amount + (innerNewFishes.get(fishTimer) ?? 0)
        );
        innerNewFishes.set(
          newFishTimer,
          amount + (innerNewFishes.get(newFishTimer) ?? 0)
        );
      } else {
        innerNewFishes.set(
          age - 1,
          amount + (innerNewFishes.get(age - 1) ?? 0)
        );
      }
    }

    newFishes = innerNewFishes;
  }

  console.log(
    [...newFishes.values()]
      .reduce((a, b) => a + b)
      .toLocaleString(undefined, { useGrouping: false })
  );
}
