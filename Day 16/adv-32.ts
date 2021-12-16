{
  const input = await Deno.readTextFile('day-16-input.txt');

  const bits = input
    .split('')
    .map(char => parseInt(char, 16).toString(2).padStart(4, '0'))
    .join('');

  const versionLength = 3;
  const typeIdLength = 3;
  const headerLength = versionLength + typeIdLength;

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

  enum TypeIds {
    SUM,
    PRODUCT,
    MINIMUM,
    MAXIMUM,
    LITERAL,
    GREATER_THAN,
    LESS_THAN,
    EQUAL_TO
  }

  const operate = (operation: keyof typeof TypeIds, ...values: number[]) => {
    switch (operation) {
      case 'PRODUCT':
        return values.reduce((a, b) => a * b, 1);
      case 'MINIMUM':
        return Math.min(...values);
      case 'MAXIMUM':
        return Math.max(...values);
      case 'GREATER_THAN':
        return Number(values[0] > values[1]);
      case 'LESS_THAN':
        return Number(values[0] < values[1]);
      case 'EQUAL_TO':
        return Number(values[0] === values[1]);
      case 'SUM':
      default:
        return values.reduce((a, b) => a + b, 0);
    }
  };

  class Operation {
    constructor(
      public operation: keyof typeof TypeIds,
      public values: number[],
      public suboperations: Operation[] = []
    ) {}
  }

  const decodePacket = (
    packet = bits,
    operation: Operation = new Operation('SUM', [0]),
    opts?: {
      iteration: number;
      maxIterations: number;
    }
  ) => {
    let length = packet.length;

    while (packet.length) {
      if (!packet.replaceAll('0', '').trim()) break;

      if (opts) {
        opts.iteration++;

        if (opts.iteration === opts.maxIterations) {
          length -= packet.length;
          break;
        }
      }

      const typeId = getPacketTypeId(packet);
      const body = packet.slice(headerLength);

      if (typeId === TypeIds.LITERAL) {
        const { chunks, index } = getLiteralValues(body);
        const literalValue = parseInt(chunks.join(''), 2);
        operation.values.push(literalValue);
        packet = body.slice(index);
      } else {
        const lengthTypeIdLength = 1;
        const lengthTypeId = body.slice(0, lengthTypeIdLength) as '0' | '1';

        if (lengthTypeId === '0') {
          const totalLengthTypeLength = 15;
          const subpacketsLength = parseInt(
            body.slice(
              lengthTypeIdLength,
              totalLengthTypeLength + lengthTypeIdLength
            ),
            2
          );

          const { operation: o } = decodePacket(
            body.slice(
              lengthTypeIdLength + totalLengthTypeLength,
              lengthTypeIdLength + totalLengthTypeLength + subpacketsLength
            ),
            new Operation(TypeIds[typeId] as keyof typeof TypeIds, [])
          );

          operation.suboperations.push(o);

          packet = body.slice(
            lengthTypeIdLength + totalLengthTypeLength + subpacketsLength
          );
        } else {
          const amountTypeLength = 11;
          const subpacketsAmount = parseInt(
            body.slice(
              lengthTypeIdLength,
              amountTypeLength + lengthTypeIdLength
            ),
            2
          );

          const { operation: o, length: l } = decodePacket(
            body.slice(lengthTypeIdLength + amountTypeLength),
            new Operation(TypeIds[typeId] as keyof typeof TypeIds, []),
            {
              iteration: 0,
              maxIterations: subpacketsAmount + 1
            }
          );

          operation.suboperations.push(o);

          packet = body.slice(lengthTypeIdLength + amountTypeLength + l);
        }
      }
    }

    return { operation, length };
  };

  const recurseOperations = (operation: Operation): number => {
    return operate(
      operation.operation,
      ...operation.values,
      ...operation.suboperations.map(so => recurseOperations(so))
    );
  };

  console.log(recurseOperations(decodePacket().operation));
}
