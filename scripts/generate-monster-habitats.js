const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'assets', 'data');
const imageDir = path.join(root, 'assets', 'image');
const docsDir = path.join(root, 'docs');

const outputs = [
  { dungeon: '0001', file: 'dungeon-0001-monster-habitat.svg', maxFloor: 30 },
  { dungeon: '0002', file: 'dungeon-0002-monster-habitat.svg', maxFloor: 25 },
  { dungeon: '0003', file: 'dungeon-0003-monster-habitat.svg', maxFloor: 99 },
  { dungeon: '0004', file: 'dungeon-0004-monster-habitat.svg', maxFloor: 50 },
  { dungeon: '0005', file: 'dungeon-0005-monster-habitat.svg', maxFloor: 50 }
];

function parseCsv(text) {
  return text.trim().split(/\r?\n/).map((line) => {
    const fields = [];
    let field = '';
    let quoted = false;

    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      if (character === '"') {
        quoted = !quoted;
      } else if (character === ',' && !quoted) {
        fields.push(field.trim());
        field = '';
      } else {
        field += character;
      }
    }

    fields.push(field.trim());
    return fields;
  });
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadEnemies() {
  const rows = parseCsv(fs.readFileSync(path.join(dataDir, 'enemy.csv'), 'utf8'));
  return new Map(rows.map((row) => [Number(row[0]), {
    name: row[1],
    image: row[2],
    symbol: row[4]
  }]));
}

function loadDungeon(dungeonId) {
  const lines = fs.readFileSync(path.join(dataDir, `dungeon-${dungeonId}.dat`), 'utf8').split(/\r?\n/);
  const name = lines.find((line) => line.startsWith('dungeon-name')).match(/"(.*)"/)[1];
  const enemyMapStart = lines.indexOf('[enemy-map]') + 1;
  const itemMapStart = lines.indexOf('[item-map]');
  const floors = new Map();

  for (let index = enemyMapStart; index < itemMapStart; index += 1) {
    const match = lines[index].match(/^(\d+):.*?\s(\d+\^\d+(?:,\s*\d+\^\d+)*)$/);
    if (!match) continue;

    floors.set(Number(match[1]), match[2].split(', ').map((entry) => {
      const [id, rate] = entry.split('^').map(Number);
      return { id, rate };
    }));
  }

  return { name, floors };
}

function dataUri(image) {
  const file = path.join(imageDir, image);
  if (!fs.existsSync(file)) throw new Error(`Missing image: ${file}`);
  return `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;
}

function renderSvg(dungeon, enemies, maxFloor) {
  const usedImages = new Set();
  for (let floor = 1; floor <= maxFloor; floor += 1) {
    for (const spawn of dungeon.floors.get(floor) || []) {
      const enemy = enemies.get(spawn.id);
      if (!enemy) throw new Error(`Unknown enemy ID ${spawn.id} on floor ${floor}`);
      usedImages.add(enemy.image);
      if (enemy.symbol) usedImages.add(enemy.symbol);
    }
  }

  const height = 106 + maxFloor * 91;
  const defs = [...usedImages].sort().map((image) => {
    const size = image.startsWith('Symbol') ? 18 : 42;
    return `    <image id="asset-${image.replace('.', '-')}" width="${size}" height="${size}" href="${dataUri(image)}"/>`;
  }).join('\n');

  const rows = [];
  for (let floor = 1; floor <= maxFloor; floor += 1) {
    const top = 106 + (floor - 1) * 91;
    const bottom = top + 91;
    const spawns = dungeon.floors.get(floor) || [];
    const width = 82 + spawns.length * 120;
    const cells = spawns.map((spawn, index) => {
      const enemy = enemies.get(spawn.id);
      const left = 82 + index * 120;
      const center = left + 60;
      const imageId = `asset-${enemy.image.replace('.', '-')}`;
      const symbol = enemy.symbol
        ? `<use href="#asset-${enemy.symbol.replace('.', '-')}" x="${left + 69}" y="${top + 10}"/>`
        : '';
      return `<g><line x1="${left}" y1="${top}" x2="${left}" y2="${bottom}" class="grid"/><use href="#${imageId}" x="${left + 39}" y="${top + 16}"/>${symbol}<text x="${center}" y="${top + 69}" class="name">${escapeXml(enemy.name)}</text><text x="${center}" y="${top + 83}" class="rate">${spawn.rate}%</text></g>`;
    }).join('');

    rows.push(`  <g><rect x="0" y="${top}" width="1480" height="91" fill="${floor % 2 ? '#f1f7f5' : '#f9fcfb'}"/><text x="41" y="${top + 53}" class="floor">${floor}F</text><line x1="0" y1="${bottom}" x2="${width}" y2="${bottom}" class="grid"/><line x1="82" y1="${top}" x2="82" y2="${bottom}" class="grid"/>${cells}<line x1="${width}" y1="${top}" x2="${width}" y2="${bottom}" class="grid"/></g>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1480" height="${height}" viewBox="0 0 1480 ${height}">
  <defs>
${defs}
  </defs>
  <style>
    .title { font: 35px sans-serif; fill: #20364a; }
    .subtitle { font: 16px sans-serif; fill: #6a7881; }
    .floor { font: 20px sans-serif; fill: #a34a2a; text-anchor: middle; }
    .name { font: 12px sans-serif; fill: #17212a; text-anchor: middle; }
    .rate { font: 11px sans-serif; fill: #688088; text-anchor: middle; }
    .grid { stroke: #cbd8d8; stroke-width: 1; }
  </style>
  <rect width="100%" height="100%" fill="#e5eef1"/>
  <rect x="0" y="0" width="1480" height="106" fill="#f9fcfb"/>
  <text x="36" y="50" class="title">${escapeXml(dungeon.name)} モンスター生息図</text>
  <text x="1440" y="49" class="subtitle" text-anchor="end">地下 1 階 - ${maxFloor} 階</text>
  <line x1="30" y1="76" x2="1450" y2="76" stroke="#bf5d33" stroke-width="4"/>
${rows.join('\n')}
</svg>
`;
}

const enemies = loadEnemies();
for (const output of outputs) {
  const dungeon = loadDungeon(output.dungeon);
  const svg = renderSvg(dungeon, enemies, output.maxFloor);
  fs.writeFileSync(path.join(docsDir, output.file), svg);
  console.log(`Generated ${output.file}`);
}