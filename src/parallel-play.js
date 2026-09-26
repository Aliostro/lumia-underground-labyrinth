const PARALLEL_CODE_PATTERN = /^[12][0-9A-F]{7}$/;

function createParallelCode(dungeonNumber) {
  const randomValue = Math.floor(Math.random() * 0x10000000).toString(16).toUpperCase().padStart(7, '0');
  return `${dungeonNumber}${randomValue}`;
}

function parseParallelCode(value) {
  const code = value.trim().toUpperCase();
  if (!PARALLEL_CODE_PATTERN.test(code)) {
    return null;
  }
  const dungeonNumber = Number(code[0]);
  return {
    code,
    dungeonDataKey: `dungeon-data-${String(dungeonNumber).padStart(4, '0')}`,
    dungeonDataFile: `dungeon-${String(dungeonNumber).padStart(4, '0')}.dat`,
  };
}

function createParallelFloorRandom(code, floor) {
  let state = (Number.parseInt(code, 16) ^ Math.imul(floor, 0x9e3779b9)) >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x100000000;
  };
}