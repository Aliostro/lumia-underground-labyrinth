class DungeonRenderer {
  constructor(scene, options) {
    this.scene = scene;
    this.tileSize = options.tileSize;
    this.floorTile = options.floorTile;
    this.corridorTile = options.corridorTile;
    this.waterTile = options.waterTile;
    this.iceTile = options.iceTile;
    this.waterKey = options.waterKey;
    this.waterSprite = this.scene.make.image({ key: this.waterKey, add: false })
      .setOrigin(0)
      .setDisplaySize(this.tileSize, this.tileSize);
    this.tileEraser = this.scene.make.graphics({ add: false });
    this.tileEraser.fillStyle(0xffffff, 1);
    this.tileEraser.fillRect(0, 0, this.tileSize, this.tileSize);
    this.waterBorder = this.scene.make.graphics({ add: false });
    this.wallShadow = this.scene.make.graphics({ add: false });
    const shadowHeight = Math.round(this.tileSize * 0.2);
    for (let row = 0; row < shadowHeight; row += 1) {
      this.wallShadow.fillStyle(0x000000, 0.26 * (1 - row / shadowHeight));
      this.wallShadow.fillRect(0, row, this.tileSize, 1);
    }
    this.iceSurface = this.scene.make.graphics({ add: false });
    this.iceSurface.fillStyle(0xd9f7ff, 0.62);
    this.iceSurface.fillRect(0, 0, this.tileSize, this.tileSize);
    this.iceSurface.fillStyle(0xffffff, 0.3);
    this.iceSurface.fillCircle(20, 20, 18);
    this.iceSurface.fillCircle(47, 43, 15);
    this.iceSurface.lineStyle(1, 0xffffff, 0.92);
    this.iceSurface.lineBetween(3, 15, 17, 20);
    this.iceSurface.lineBetween(17, 20, 25, 14);
    this.iceSurface.lineBetween(25, 14, 34, 19);
    this.iceSurface.lineBetween(61, 47, 47, 43);
    this.iceSurface.lineBetween(47, 43, 39, 51);
    this.iceSurface.lineBetween(39, 51, 27, 48);
    this.iceSurface.lineStyle(2, 0xffffff, 0.72);
    this.iceSurface.lineBetween(0, 4, 12, 1);
    this.iceSurface.lineBetween(52, 63, 63, 55);
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
    texture.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    for (let y = 0; y < this.chunkSize; y += 1) {
      for (let x = 0; x < this.chunkSize; x += 1) {
        this.drawMapTile(texture, startX + x, startY + y, x, y);
      }
    }
    this.mapChunks.set(key, texture);
  }

  drawMapTile(texture, tileX, tileY, chunkTileX, chunkTileY, clearExisting = false) {
    const drawX = chunkTileX * this.tileSize;
    const drawY = chunkTileY * this.tileSize;
    if (clearExisting) {
      texture.erase(this.tileEraser, drawX, drawY);
    }
    const tile = this.tiles[tileY]?.[tileX];
    if (tile === undefined) {
      texture.drawFrame(this.mapChipKey, 0, drawX, drawY);
    } else if (tile === this.waterTile || tile === this.iceTile) {
      this.waterSprite.setPosition(drawX, drawY);
      texture.draw(this.waterSprite);
      if (tile === this.iceTile) {
        this.iceSurface.setPosition(drawX, drawY);
        texture.draw(this.iceSurface);
      } else {
        this.drawWaterBorder(texture, tileX, tileY, drawX, drawY);
      }
    } else {
      const frame = tile === undefined ? 0 : this.mapFrames[tileY][tileX];
      texture.drawFrame(this.mapChipKey, frame, drawX, drawY);
    }
    const isGround = tile === this.floorTile || tile === this.corridorTile
      || tile === this.waterTile || tile === this.iceTile;
    if (isGround && this.tiles[tileY - 1]?.[tileX] === 0) {
      this.wallShadow.setPosition(drawX, drawY);
      texture.draw(this.wallShadow);
    }
  }

  drawWaterBorder(texture, tileX, tileY, drawX, drawY) {
    const size = this.tileSize;
    const edges = [
      { direction: [0, -1], border: [0, 0, size, 3], highlight: [0, 1, size, 1] },
      { direction: [1, 0], border: [size - 3, 0, 3, size], highlight: [size - 2, 0, 1, size] },
      { direction: [0, 1], border: [0, size - 3, size, 3], highlight: [0, size - 2, size, 1] },
      { direction: [-1, 0], border: [0, 0, 3, size], highlight: [1, 0, 1, size] },
    ];
    this.waterBorder.clear().setPosition(drawX, drawY);
    let hasBorder = false;
    for (const edge of edges) {
      const [offsetX, offsetY] = edge.direction;
      const neighbor = this.tiles[tileY + offsetY]?.[tileX + offsetX];
      if (neighbor !== this.floorTile && neighbor !== this.corridorTile && neighbor !== this.iceTile) {
        continue;
      }
      this.waterBorder.fillStyle(0x1b4652, 0.65);
      this.waterBorder.fillRect(...edge.border);
      this.waterBorder.fillStyle(0xb7e8e2, 0.8);
      this.waterBorder.fillRect(...edge.highlight);
      hasBorder = true;
    }
    if (hasBorder) {
      texture.draw(this.waterBorder);
    }
  }

  refreshTiles(tiles) {
    const updatedTiles = new Set();
    tiles.forEach((tile) => {
      [
        [tile.x, tile.y], [tile.x, tile.y - 1], [tile.x + 1, tile.y],
        [tile.x, tile.y + 1], [tile.x - 1, tile.y],
      ].forEach(([x, y]) => {
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
      this.mapFrames[y][x] = frame;
      const texture = this.mapChunks.get(`${chunkX},${chunkY}`);
      if (texture) {
        this.drawMapTile(
          texture,
          x,
          y,
          x - chunkX * this.chunkSize,
          y - chunkY * this.chunkSize,
          true,
        );
      }
    });
  }

  getMapChipFrame(tiles, x, y, tile) {
    if (tile === this.floorTile || tile === this.corridorTile) {
      return Math.random() < this.decorationChance ? 3 : 2;
    }
    const tileBelow = tiles[y + 1]?.[x];
    return tileBelow === this.floorTile || tileBelow === this.corridorTile
      || tileBelow === this.waterTile || tileBelow === this.iceTile ? 1 : 0;
  }

}