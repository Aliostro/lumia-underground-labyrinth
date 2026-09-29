class DungeonGenerator {
  constructor(random = Math.random) {
    this.random = random;
    this.width = 64;
    this.height = 64;
    this.areaSize = 16;
    this.areaColumns = 4;
    this.areaRows = 4;
    this.minRooms = 8;
    this.maxRooms = 12;
  }

  generate(options = {}) {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      try {
        const dungeon = this.createDungeon(
          options.waterChance ?? 0,
          options.minimumPonds ?? 0,
          options.maximumPonds ?? 0,
        );
        if (this.areRoomsConnected(dungeon)) {
          return dungeon;
        }
      } catch (error) {
        continue;
      }
    }

    throw new Error('ダンジョンの生成に失敗しました。');
  }

  createDungeon(waterChance, minimumPonds, maximumPonds) {
    const tiles = Array.from(
      { length: this.height },
      () => Array(this.width).fill(0),
    );
    const rooms = this.createRooms();

    for (const room of rooms) {
      this.carveRoom(tiles, room);
    }

    const connectedRooms = [rooms[0]];
    const unconnectedRooms = rooms.slice(1);

    while (unconnectedRooms.length > 0) {
      const nextRoomIndex = this.randomInt(0, unconnectedRooms.length - 1);
      const nextRoom = unconnectedRooms.splice(nextRoomIndex, 1)[0];
      const nearestRoom = connectedRooms.reduce((closest, room) => (
        this.distance(room, nextRoom) < this.distance(closest, nextRoom) ? room : closest
      ));

      this.carveCorridor(tiles, nearestRoom, nextRoom);
      connectedRooms.push(nextRoom);
    }

    this.placeWater(tiles, rooms, waterChance);
    this.placePonds(tiles, minimumPonds, maximumPonds);
    return { tiles, rooms };
  }

  placePonds(tiles, minimumPonds, maximumPonds) {
    const pondCount = this.randomInt(minimumPonds, maximumPonds);
    for (let index = 0; index < pondCount; index += 1) {
      const pondTiles = this.createPond(tiles);
      if (!pondTiles) {
        continue;
      }
      pondTiles.forEach((tile) => {
        if (tiles[tile.y][tile.x] === 0) {
          tiles[tile.y][tile.x] = 3;
        }
      });
    }
  }

  createPond(tiles) {
    const targetCount = this.randomInt(30, 50);
    const start = {
      x: this.randomInt(1, this.width - 2),
      y: this.randomInt(1, this.height - 2),
    };
    const pondTiles = [start];
    const pondTileKeys = new Set([`${start.x},${start.y}`]);
    while (pondTiles.length < targetCount) {
      const candidates = pondTiles.flatMap((source) => (
        [[0, -1], [1, 0], [0, 1], [-1, 0]]
          .map(([offsetX, offsetY]) => ({ x: source.x + offsetX, y: source.y + offsetY }))
          .filter((tile) => tile.x > 0 && tile.x < this.width - 1 && tile.y > 0 && tile.y < this.height - 1)
          .filter((tile) => !pondTileKeys.has(`${tile.x},${tile.y}`))
      ));
      if (candidates.length === 0) {
        break;
      }
      const nextTile = candidates[this.randomInt(0, candidates.length - 1)];
      pondTiles.push(nextTile);
      pondTileKeys.add(`${nextTile.x},${nextTile.y}`);
    }
    return pondTiles;
  }

  placeWater(tiles, rooms, waterChance) {
    for (const room of rooms) {
      if (this.random() * 100 >= waterChance) {
        continue;
      }
      const candidates = [];
      for (let y = room.y; y < room.y + room.height; y += 1) {
        for (let x = room.x; x < room.x + room.width; x += 1) {
          if (this.isWaterCandidate(tiles, x, y)) {
            candidates.push({ x, y });
          }
        }
      }
      const start = candidates.length > 0 ? candidates[this.randomInt(0, candidates.length - 1)] : null;
      if (!start) {
        continue;
      }
      const waterTiles = [start];
      const targetCount = this.randomInt(3, 5);
      for (let index = 0; index < waterTiles.length && waterTiles.length < targetCount; index += 1) {
        const tile = waterTiles[index];
        const neighbors = [[0, -1], [1, 0], [0, 1], [-1, 0]]
          .map(([offsetX, offsetY]) => ({ x: tile.x + offsetX, y: tile.y + offsetY }))
          .filter((neighbor) => this.isWaterCandidate(tiles, neighbor.x, neighbor.y))
          .filter((neighbor) => !waterTiles.some((water) => water.x === neighbor.x && water.y === neighbor.y));
        this.shuffle(neighbors);
        waterTiles.push(...neighbors.slice(0, targetCount - waterTiles.length));
      }
      if (waterTiles.length < 3) {
        continue;
      }
      if (!this.keepsRoomAccessible(tiles, room, waterTiles)) {
        continue;
      }
      waterTiles.forEach((tile) => {
        tiles[tile.y][tile.x] = 3;
      });
    }
  }

  isWaterCandidate(tiles, tileX, tileY) {
    return tiles[tileY]?.[tileX] === 1
      && ![[0, -1], [1, 0], [0, 1], [-1, 0]].some(([offsetX, offsetY]) => (
        tiles[tileY + offsetY]?.[tileX + offsetX] === 2
      ));
  }

  keepsRoomAccessible(tiles, room, waterTiles) {
    const waterKeys = new Set(waterTiles.map((tile) => `${tile.x},${tile.y}`));
    const roomTiles = [];
    const entrances = [];
    for (let y = room.y; y < room.y + room.height; y += 1) {
      for (let x = room.x; x < room.x + room.width; x += 1) {
        if (tiles[y][x] !== 1 || waterKeys.has(`${x},${y}`)) {
          continue;
        }
        const tile = { x, y };
        roomTiles.push(tile);
        if ([[0, -1], [1, 0], [0, 1], [-1, 0]].some(([offsetX, offsetY]) => (
          tiles[y + offsetY]?.[x + offsetX] === 2
        ))) {
          entrances.push(tile);
        }
      }
    }
    const start = entrances[0] || roomTiles[0];
    if (!start) {
      return false;
    }
    const visited = new Set([`${start.x},${start.y}`]);
    const queue = [start];
    for (let index = 0; index < queue.length; index += 1) {
      const tile = queue[index];
      for (const [offsetX, offsetY] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
        const x = tile.x + offsetX;
        const y = tile.y + offsetY;
        const key = `${x},${y}`;
        if (
          visited.has(key)
          || waterKeys.has(key)
          || tiles[y]?.[x] !== 1
          || x < room.x
          || x >= room.x + room.width
          || y < room.y
          || y >= room.y + room.height
        ) {
          continue;
        }
        visited.add(key);
        queue.push({ x, y });
      }
    }
    return roomTiles.every((tile) => visited.has(`${tile.x},${tile.y}`));
  }

  createRooms() {
    const areas = Array.from({ length: this.areaColumns * this.areaRows }, (_, index) => index);
    this.shuffle(areas);

    const roomCount = this.randomInt(this.minRooms, this.maxRooms);
    return areas.slice(0, roomCount).map((areaIndex) => {
      const areaX = (areaIndex % this.areaColumns) * this.areaSize;
      const areaY = Math.floor(areaIndex / this.areaColumns) * this.areaSize;
      const width = this.randomInt(5, 12);
      const height = this.randomInt(5, 12);
      const x = this.randomInt(areaX + 1, areaX + this.areaSize - width - 1);
      const y = this.randomInt(areaY + 1, areaY + this.areaSize - height - 1);

      return {
        x,
        y,
        width,
        height,
        centerX: x + Math.floor(width / 2),
        centerY: y + Math.floor(height / 2),
      };
    });
  }

  carveRoom(tiles, room) {
    for (let y = room.y; y < room.y + room.height; y += 1) {
      for (let x = room.x; x < room.x + room.width; x += 1) {
        tiles[y][x] = 1;
      }
    }
  }

  carveCorridor(tiles, fromRoom, toRoom) {
    const horizontalFirst = this.random() < 0.5;
    const directPaths = [horizontalFirst, !horizontalFirst].map((isHorizontalFirst) => (
      this.createCorridorPath(fromRoom, toRoom, isHorizontalFirst)
    ));
    const windingPaths = [horizontalFirst, !horizontalFirst]
      .map((isHorizontalFirst) => this.createWindingCorridorPath(fromRoom, toRoom, isHorizontalFirst))
      .filter(Boolean);
    const pathOptions = this.random() < 0.75
      ? [...windingPaths, ...directPaths]
      : [...directPaths, ...windingPaths];
    const path = pathOptions.find((option) => this.canCarveCorridor(tiles, option));

    if (!path) {
      throw new Error('通路を配置できません。');
    }

    for (const tile of path) {
      if (tiles[tile.y][tile.x] === 0) {
        tiles[tile.y][tile.x] = 2;
      }
    }
  }

  createCorridorPath(fromRoom, toRoom, isHorizontalFirst) {
    const corner = isHorizontalFirst
      ? { x: toRoom.centerX, y: fromRoom.centerY }
      : { x: fromRoom.centerX, y: toRoom.centerY };
    return [
      ...this.createLine(fromRoom.centerX, fromRoom.centerY, corner.x, corner.y),
      ...this.createLine(corner.x, corner.y, toRoom.centerX, toRoom.centerY).slice(1),
    ];
  }

  createWindingCorridorPath(fromRoom, toRoom, isHorizontalFirst) {
    const startX = fromRoom.centerX;
    const startY = fromRoom.centerY;
    const endX = toRoom.centerX;
    const endY = toRoom.centerY;
    if (isHorizontalFirst) {
      if (Math.abs(endX - startX) < 3) {
        return null;
      }
      const bendX = this.randomInt(Math.min(startX, endX) + 1, Math.max(startX, endX) - 1);
      return [
        ...this.createLine(startX, startY, bendX, startY),
        ...this.createLine(bendX, startY, bendX, endY).slice(1),
        ...this.createLine(bendX, endY, endX, endY).slice(1),
      ];
    }
    if (Math.abs(endY - startY) < 3) {
      return null;
    }
    const bendY = this.randomInt(Math.min(startY, endY) + 1, Math.max(startY, endY) - 1);
    return [
      ...this.createLine(startX, startY, startX, bendY),
      ...this.createLine(startX, bendY, endX, bendY).slice(1),
      ...this.createLine(endX, bendY, endX, endY).slice(1),
    ];
  }

  createLine(startX, startY, endX, endY) {
    const stepX = Math.sign(endX - startX);
    const stepY = Math.sign(endY - startY);
    const path = [];
    let x = startX;
    let y = startY;

    while (x !== endX || y !== endY) {
      path.push({ x, y });
      x += stepX;
      y += stepY;
    }
    path.push({ x, y });
    return path;
  }

  canCarveCorridor(tiles, path) {
    return path.every((tile, index) => {
      if (tiles[tile.y][tile.x] !== 0) {
        return true;
      }

      const previous = path[index - 1];
      const next = path[index + 1];
      return [[0, -1], [1, 0], [0, 1], [-1, 0]].every(([offsetX, offsetY]) => {
        const neighborX = tile.x + offsetX;
        const neighborY = tile.y + offsetY;
        const isPathNeighbor = (previous && previous.x === neighborX && previous.y === neighborY)
          || (next && next.x === neighborX && next.y === neighborY);

        const runsParallelToRoom = tiles[neighborY][neighborX] === 1
          && [previous, next].some((pathTile) => pathTile && (
            offsetY !== 0 ? pathTile.y === tile.y : pathTile.x === tile.x
          ));
        if (runsParallelToRoom) {
          return false;
        }

        return tiles[neighborY][neighborX] === 0 || isPathNeighbor;
      });
    });
  }

  areRoomsConnected(dungeon) {
    const visited = Array.from(
      { length: this.height },
      () => Array(this.width).fill(false),
    );
    const startRoom = dungeon.rooms[0];
    const queue = [{ x: startRoom.centerX, y: startRoom.centerY }];
    visited[startRoom.centerY][startRoom.centerX] = true;

    for (let index = 0; index < queue.length; index += 1) {
      const current = queue[index];
      for (const direction of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
        const x = current.x + direction[0];
        const y = current.y + direction[1];
        if (x < 0 || x >= this.width || y < 0 || y >= this.height
          || visited[y][x] || dungeon.tiles[y][x] === 0) {
          continue;
        }
        visited[y][x] = true;
        queue.push({ x, y });
      }
    }

    return dungeon.rooms.every((room) => visited[room.centerY][room.centerX]);
  }

  distance(first, second) {
    return Math.abs(first.centerX - second.centerX) + Math.abs(first.centerY - second.centerY);
  }

  randomInt(minimum, maximum) {
    return Math.floor(this.random() * (maximum - minimum + 1)) + minimum;
  }

  shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const swapIndex = this.randomInt(0, index);
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
    }
  }
}