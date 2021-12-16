{
  const input = await Deno.readTextFile('day-16-input.txt');

  const bits = input
    .split('')
    .map(char => parseInt(char, 16).toString(2).padStart(4, '0'))
    .join('');

  const versionLength = 3;
  const typeIdLength = 3;
  const headerLength = versionLength + typeIdLength;

  const getPacketVersion = (str: string) =>
    parseInt(str.slice(0, versionLength), 2);

  const getPacketTypeId = (str: string) =>
    parseInt(str.slice(versionLength, headerLength), 2);

  const getLiteralValues = (str: string) => {
    let zeroFound = false;
    let index = 0;
    const size = 5;
    const chunks = [];

    while (!zeroFound) {
      const slice = str.slice(index, index + size);
      const [lead, chunk] = [slice.slice(0, 1), slice.slice(1)];
      chunks.push(chunk);
      zeroFound = lead === '0';
      index += size;
    }

    return { chunks, index };
  };

  const literalValueType = 4;

  const getSubacketsVersionCount = (packet = bits) => {
    let versionCount = 0;

    while (packet.length) {
      const version = getPacketVersion(packet);
      const typeId = getPacketTypeId(packet);
      const body = packet.slice(headerLength);
      versionCount += version;

      if (typeId === literalValueType) {
        const { index } = getLiteralValues(body);
        packet = body.slice(index);
      } else {
        const lengthTypeIdLength = 1;
        const lengthTypeId = body.slice(0, lengthTypeIdLength) as '0' | '1';

        if (lengthTypeId === '0') {
          const totalLengthTypeLength = 15;
          packet = body.slice(lengthTypeIdLength + totalLengthTypeLength);
        } else {
          const amountTypeLength = 11;
          packet = body.slice(lengthTypeIdLength + amountTypeLength);
        }
      }
    }

    return versionCount;
  };

  console.log('versionCount', getSubacketsVersionCount());
}
