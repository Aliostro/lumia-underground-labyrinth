class DungeonRenderer {
  constructor(scene, options) {
    this.scene = scene;
    this.tileSize = options.tileSize;
    this.floorTile = options.floorTile;
    this.corridorTile = options.corridorTile;
    this.decorationChance = options.decorationChance;
    this.chunkSize = options.chunkSize;
    this.marginX = options.marginX;
    this.marginY = options.marginY;
    this.mapChipKey = options.mapChipKey;
  }

  draw(dungeon) {
    this.tiles = dungeon.tiles;
    this.mapFrames = dungeon.tiles.map((row, y) => row.map((tile, x) => (
      this.getMapChipFrame(dungeon.tiles, x, y, tile)
    )));
    this.mapChunks = new Map();
    this.createAllMapChunks();
  }

  createAllMapChunks() {
    const minimumChunkX = Math.floor(-this.marginX / this.chunkSize);
    const minimumChunkY = Math.floor(-this.marginY / this.chunkSize);
    const maximumChunkX = Math.ceil((this.tiles[0].length + this.marginX) / this.chunkSize) - 1;
    const maximumChunkY = Math.ceil((this.tiles.length + this.marginY) / this.chunkSize) - 1;
    for (let chunkY = minimumChunkY; chunkY <= maximumChunkY; chunkY += 1) {
      for (let chunkX = minimumChunkX; chunkX <= maximumChunkX; chunkX += 1) {
        this.createMapChunk(chunkX, chunkY);
      }
    }
  }

  createMapChunk(chunkX, chunkY) {
    const key = `${chunkX},${chunkY}`;
    this.mapChunks.get(key)?.destroy();
    const startX = chunkX * this.chunkSize;
    const startY = chunkY * this.chunkSize;
    const texture = this.scene.add.renderTexture(
      startX * this.tileSize,
      startY * this.tileSize,
      this.chunkSize * this.tileSize,
      this.chunkSize * this.tileSize,
    ).setOrigin(0).setDepth(-1);
    for (let y = 0; y < this.chunkSize; y += 1) {
      for (let x = 0; x < this.chunkSize; x += 1) {
        const tileY = startY + y;
        const tileX = startX + x;
        const tile = this.tiles[tileY]?.[tileX];
        const frame = tile === undefined ? 0 : this.mapFrames[tileY][tileX];
        texture.drawFrame(this.mapChipKey, frame, x * this.tileSize, y * this.tileSize);
      }
    }
    this.mapChunks.set(key, texture);
  }

  refreshTiles(tiles) {
    const updatedTiles = new Set();
    tiles.forEach((tile) => {
      [[tile.x, tile.y], [tile.x, tile.y - 1]].forEach(([x, y]) => {
        if (this.tiles[y]?.[x] === undefined) {
          return;
        }
        updatedTiles.add(`${x},${y}`);
      });
    });
    updatedTiles.forEach((key) => {
      const [x, y] = key.split(',').map(Number);
      const tile = this.tiles[y][x];
      const frame = this.getMapChipFrame(this.tiles, x, y, tile);
      const chunkX = Math.floor(x / this.chunkSize);
      const chunkY = Math.floor(y / this.chunkSize);
      const texture = this.mapChunks.get(`${chunkX},${chunkY}`);
      this.mapFrames[y][x] = frame;
      texture?.drawFrame(
        this.mapChipKey,
        frame,
        (x - chunkX * this.chunkSize) * this.tileSize,
        (y - chunkY * this.chunkSize) * this.tileSize,
      );
    });
  }

  getMapChipFrame(tiles, x, y, tile) {
    if (tile === this.floorTile || tile === this.corridorTile) {
      return Math.random() < this.decorationChance ? 3 : 2;
    }
    const tileBelow = tiles[y + 1]?.[x];
    return tileBelow === this.floorTile || tileBelow === this.corridorTile ? 1 : 0;
  }
}