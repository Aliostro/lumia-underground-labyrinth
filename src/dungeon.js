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

  generate() {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      try {
        const dungeon = this.createDungeon();
        if (this.areRoomsConnected(dungeon)) {
          return dungeon;
        }
      } catch (error) {
        continue;
      }
    }

    throw new Error('ダンジョンの生成に失敗しました。');
  }

  createDungeon() {
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

    return { tiles, rooms };
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

      return [[0, -1], [1, 0], [0, 1], [-1, 0]].every(([offsetX, offsetY]) => {
        const neighborX = tile.x + offsetX;
        const neighborY = tile.y + offsetY;
        const previous = path[index - 1];
        const next = path[index + 1];
        const isPathNeighbor = (previous && previous.x === neighborX && previous.y === neighborY)
          || (next && next.x === neighborX && next.y === neighborY);

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