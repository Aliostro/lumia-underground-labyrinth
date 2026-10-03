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
        if (this.areRoomsConnected(dungeon) && !this.hasLongStraightCorridor(dungeon.tiles)) {
          if (options.riverChance > 0 && this.random() * 100 < options.riverChance) {
            this.placeRiver(dungeon.tiles);
          }
          return dungeon;
        }
      } catch (error) {
        continue;
      }
    }

    throw new Error('ダンジョンの生成に失敗しました。');
  }

  placeRiver(tiles) {
    const vertical = this.random() < 0.5;
    const length = vertical ? this.height : this.width;
    const breadth = vertical ? this.width : this.height;
    const minimumCenter = Math.floor((breadth - 28) / 2) + 2;
    const maximumCenter = breadth - 1 - minimumCenter;
    const chooseTargetCenter = (position) => {
      const offset = this.randomInt(4, 8) * (this.random() < 0.5 ? -1 : 1);
      const target = position + offset;
      return target >= minimumCenter && target <= maximumCenter ? target : position - offset;
    };
    let center = this.randomInt(minimumCenter, maximumCenter);
    let targetCenter = chooseTargetCenter(center);
    let segmentLength = this.randomInt(8, 14);
    let segmentStep = 0;
    let width = this.randomInt(3, 4);
    let targetWidth = this.randomInt(3, 4);
    let previousStart = Math.round(center - (width - 1) / 2);

    for (let step = 0; step < length; step += 1) {
      if (segmentStep === segmentLength) {
        center = targetCenter;
        targetCenter = chooseTargetCenter(center);
        segmentLength = this.randomInt(8, 14);
        segmentStep = 0;
        targetWidth = this.randomInt(3, 4);
      }
      if (step % 3 === 0) {
        width += Math.sign(targetWidth - width);
      }
      const progress = segmentStep / segmentLength;
      const curve = progress * progress * (3 - 2 * progress);
      const position = center + (targetCenter - center) * curve;
      const desiredStart = Math.round(position - (width - 1) / 2);
      const start = Math.max(0, Math.min(
        breadth - width,
        Math.max(previousStart - 1, Math.min(previousStart + 1, desiredStart)),
      ));
      for (let offset = 0; offset < width; offset += 1) {
        const tileX = vertical ? start + offset : step;
        const tileY = vertical ? step : start + offset;
        if (tiles[tileY][tileX] !== 1 && tiles[tileY][tileX] !== 2) {
          tiles[tileY][tileX] = 3;
        }
      }
      previousStart = start;
      segmentStep += 1;
    }
  }

  createDungeon(waterChance, minimumPonds, maximumPonds) {
    const layoutRoll = this.random();
    if (layoutRoll < 0.05) {
      return this.createRingDungeon(waterChance, minimumPonds, maximumPonds);
    }

    const tiles = Array.from(
      { length: this.height },
      () => Array(this.width).fill(0),
    );
    const rooms = this.createRooms();

    for (const room of rooms) {
      this.carveRoom(tiles, room);
    }

    if (layoutRoll < 0.525) {
      const routeRooms = this.createLoopRoute(rooms);
      for (let index = 1; index < routeRooms.length; index += 1) {
        this.carveCorridor(tiles, routeRooms[index - 1], routeRooms[index]);
      }
      this.carveCorridor(tiles, routeRooms[routeRooms.length - 1], routeRooms[0]);
      this.carveLoopBranch(tiles, routeRooms);
    } else {
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
    }

    this.placeWater(tiles, rooms, waterChance);
    this.placePonds(tiles, minimumPonds, maximumPonds);
    return { tiles, rooms };
  }

  createRingDungeon(waterChance, minimumPonds, maximumPonds) {
    const tiles = Array.from(
      { length: this.height },
      () => Array(this.width).fill(0),
    );
    const rooms = this.createRingRooms();

    for (const room of rooms) {
      this.carveRoom(tiles, room);
    }

    for (const [fromIndex, toIndex] of [[0, 1], [1, 3], [3, 2], [2, 0]]) {
      this.carveRingCorridor(tiles, rooms[fromIndex], rooms[toIndex]);
    }

    this.placeWater(tiles, rooms, waterChance, true);
    this.placePonds(tiles, minimumPonds, maximumPonds);
    return { tiles, rooms };
  }

  createRingRooms() {
    const roomPositions = [[2, 2], [35, 2], [2, 35], [35, 35]];
    return roomPositions.map(([x, y]) => {
      const roomSize = this.randomInt(15, 26);
      return {
        x,
        y,
        width: roomSize,
        height: roomSize,
        centerX: x + Math.floor(roomSize / 2),
        centerY: y + Math.floor(roomSize / 2),
      };
    });
  }

  carveRingCorridor(tiles, fromRoom, toRoom) {
    const path = this.addCorridorBends(tiles, this.createRingCorridorPath(fromRoom, toRoom));
    if (!path || !this.canCarveCorridor(tiles, path, fromRoom, toRoom)) {
      throw new Error('通路を配置できません。');
    }
    for (const tile of path) {
      if (tiles[tile.y][tile.x] === 0) {
        tiles[tile.y][tile.x] = 2;
      }
    }
  }

  createRingCorridorPath(fromRoom, toRoom) {
    const isHorizontal = Math.abs(fromRoom.centerX - toRoom.centerX)
      > Math.abs(fromRoom.centerY - toRoom.centerY);
    const points = isHorizontal
      ? this.createHorizontalRingPath(fromRoom, toRoom)
      : this.createVerticalRingPath(fromRoom, toRoom);
    const path = [];

    for (let index = 1; index < points.length; index += 1) {
      path.push(...this.createLine(points[index - 1].x, points[index - 1].y, points[index].x, points[index].y)
        .slice(index === 1 ? 0 : 1));
    }
    return path;
  }

  createHorizontalRingPath(fromRoom, toRoom) {
    const direction = Math.sign(toRoom.centerX - fromRoom.centerX);
    const firstBendX = direction > 0 ? fromRoom.x + fromRoom.width + 2 : fromRoom.x - 3;
    const secondBendX = direction > 0 ? toRoom.x - 3 : toRoom.x + toRoom.width + 2;
    const gap = direction > 0 ? toRoom.x - fromRoom.x - fromRoom.width : fromRoom.x - toRoom.x - toRoom.width;
    const shape = this.randomInt(gap <= 8 ? 1 : 0, 2);
    if (shape !== 0) {
      const overlapTop = Math.max(fromRoom.y, toRoom.y) + 2;
      const overlapBottom = Math.min(fromRoom.y + fromRoom.height, toRoom.y + toRoom.height) - 3;
      const centerY = Math.floor((overlapTop + overlapBottom) / 2);
      const startOffset = this.randomInt(2, Math.min(5, centerY - overlapTop));
      const endOffset = this.randomInt(2, Math.min(5, overlapBottom - centerY));
      const startY = centerY + (shape === 1 ? startOffset : -startOffset);
      const endY = centerY + (shape === 1 ? -endOffset : endOffset);
      const bendX = this.randomInt(Math.min(firstBendX, secondBendX), Math.max(firstBendX, secondBendX));
      return [
        { x: fromRoom.centerX, y: startY },
        { x: bendX, y: startY },
        { x: bendX, y: endY },
        { x: toRoom.centerX, y: endY },
      ];
    }
    const side = fromRoom.centerY < this.height / 2 ? 1 : -1;
    const overlapTop = Math.max(fromRoom.y, toRoom.y) + 2;
    const overlapBottom = Math.min(fromRoom.y + fromRoom.height, toRoom.y + toRoom.height) - 3;
    const middleY = Math.floor((overlapTop + overlapBottom) / 2) + side * this.randomInt(2, 5);
    const startY = Math.max(fromRoom.y + 1, Math.min(fromRoom.y + fromRoom.height - 2,
      middleY - side * this.randomInt(2, 5)));
    const endY = Math.max(toRoom.y + 1, Math.min(toRoom.y + toRoom.height - 2,
      middleY - side * this.randomInt(2, 5)));
    return [
      { x: fromRoom.centerX, y: startY },
      { x: firstBendX, y: startY },
      { x: firstBendX, y: middleY },
      { x: secondBendX, y: middleY },
      { x: secondBendX, y: endY },
      { x: toRoom.centerX, y: endY },
    ];
  }

  createVerticalRingPath(fromRoom, toRoom) {
    const direction = Math.sign(toRoom.centerY - fromRoom.centerY);
    const firstBendY = direction > 0 ? fromRoom.y + fromRoom.height + 2 : fromRoom.y - 3;
    const secondBendY = direction > 0 ? toRoom.y - 3 : toRoom.y + toRoom.height + 2;
    const gap = direction > 0 ? toRoom.y - fromRoom.y - fromRoom.height : fromRoom.y - toRoom.y - toRoom.height;
    const shape = this.randomInt(gap <= 8 ? 1 : 0, 2);
    if (shape !== 0) {
      const overlapLeft = Math.max(fromRoom.x, toRoom.x) + 2;
      const overlapRight = Math.min(fromRoom.x + fromRoom.width, toRoom.x + toRoom.width) - 3;
      const centerX = Math.floor((overlapLeft + overlapRight) / 2);
      const startOffset = this.randomInt(2, Math.min(5, centerX - overlapLeft));
      const endOffset = this.randomInt(2, Math.min(5, overlapRight - centerX));
      const startX = centerX + (shape === 1 ? startOffset : -startOffset);
      const endX = centerX + (shape === 1 ? -endOffset : endOffset);
      const bendY = this.randomInt(Math.min(firstBendY, secondBendY), Math.max(firstBendY, secondBendY));
      return [
        { x: startX, y: fromRoom.centerY },
        { x: startX, y: bendY },
        { x: endX, y: bendY },
        { x: endX, y: toRoom.centerY },
      ];
    }
    const side = fromRoom.centerX < this.width / 2 ? 1 : -1;
    const overlapLeft = Math.max(fromRoom.x, toRoom.x) + 2;
    const overlapRight = Math.min(fromRoom.x + fromRoom.width, toRoom.x + toRoom.width) - 3;
    const middleX = Math.floor((overlapLeft + overlapRight) / 2) + side * this.randomInt(2, 5);
    const startX = Math.max(fromRoom.x + 1, Math.min(fromRoom.x + fromRoom.width - 2,
      middleX - side * this.randomInt(2, 5)));
    const endX = Math.max(toRoom.x + 1, Math.min(toRoom.x + toRoom.width - 2,
      middleX - side * this.randomInt(2, 5)));
    return [
      { x: startX, y: fromRoom.centerY },
      { x: startX, y: firstBendY },
      { x: middleX, y: firstBendY },
      { x: middleX, y: secondBendY },
      { x: endX, y: secondBendY },
      { x: endX, y: toRoom.centerY },
    ];
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

  placeWater(tiles, rooms, waterChance, guaranteeWater = false) {
    const placeWaterInRoom = (room) => {
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
        return false;
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
        return false;
      }
      if (!this.keepsRoomAccessible(tiles, room, waterTiles)) {
        return false;
      }
      waterTiles.forEach((tile) => {
        tiles[tile.y][tile.x] = 3;
      });
      return true;
    };

    let waterPlaced = false;
    for (const room of rooms) {
      if (this.random() * 100 < waterChance) {
        waterPlaced = placeWaterInRoom(room) || waterPlaced;
      }
    }
    if (!guaranteeWater || waterChance <= 0 || waterPlaced) {
      return;
    }
    const fallbackRooms = [...rooms];
    this.shuffle(fallbackRooms);
    for (const room of fallbackRooms) {
      if (placeWaterInRoom(room)) {
        return;
      }
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
    const path = pathOptions
      .map((option) => this.addCorridorBends(tiles, option))
      .find((option) => option && this.canCarveCorridor(tiles, option, fromRoom, toRoom));

    if (!path) {
      throw new Error('通路を配置できません。');
    }

    let carvedTiles = 0;
    for (const tile of path) {
      if (tiles[tile.y][tile.x] === 0) {
        tiles[tile.y][tile.x] = 2;
        carvedTiles += 1;
      }
    }
    return carvedTiles > 0;
  }

  addCorridorBends(tiles, path) {
    if (this.countCorridorBends(path) >= 6) {
      return null;
    }
    const bentPath = [...path];
    let straightLength = 1;
    let previousDirection = null;
    for (let index = 1; index < bentPath.length; index += 1) {
      const previous = bentPath[index - 1];
      const current = bentPath[index];
      const directionX = current.x - previous.x;
      const directionY = current.y - previous.y;
      const direction = `${directionX},${directionY}`;
      const isCorridorTile = (tile) => tiles[tile.y]?.[tile.x] === 0
        || tiles[tile.y]?.[tile.x] === 2;
      if (!isCorridorTile(previous) || !isCorridorTile(current)) {
        straightLength = 1;
        previousDirection = null;
        continue;
      }
      straightLength = direction === previousDirection ? straightLength + 1 : 2;
      previousDirection = direction;
      if (straightLength <= 20) {
        continue;
      }

      const runStart = index - straightLength + 1;
      const pathKeys = new Set(bentPath.map((tile) => `${tile.x},${tile.y}`));
      const sides = this.random() < 0.5 ? [1, -1] : [-1, 1];
      const span = this.randomInt(6, 10);
      const depth = this.randomInt(1, 4);
      const secondDepth = depth === 1 ? 2 : depth - 1;
      const midpoint = this.randomInt(3, span - 3);
      const shapes = ['stepped', 's-shaped', 'simple'];
      this.shuffle(shapes);
      const bendStarts = Array.from({ length: 18 - span }, (_, offset) => runStart + 3 + offset);
      this.shuffle(bendStarts);
      let replacement = null;
      let replacementStart = null;
      for (const bendStart of bendStarts) {
        const start = bentPath[bendStart];
        const removedKeys = new Set(bentPath.slice(bendStart + 1, bendStart + span)
          .map((tile) => `${tile.x},${tile.y}`));
        for (const shape of shapes) {
          for (const side of sides) {
            const offset = depth * side;
            const nextOffset = secondDepth * (shape === 's-shaped' ? -side : side);
            const points = shape === 'simple'
              ? [[0, 0], [0, offset], [span, offset], [span, 0]]
              : [[0, 0], [0, offset], [midpoint, offset], [midpoint, nextOffset], [span, nextOffset], [span, 0]];
            const worldPoints = points.map(([forward, sideways]) => ({
              x: start.x + directionX * forward - directionY * sideways,
              y: start.y + directionY * forward + directionX * sideways,
            }));
            const detour = [];
            for (let pointIndex = 1; pointIndex < worldPoints.length; pointIndex += 1) {
              const from = worldPoints[pointIndex - 1];
              const to = worldPoints[pointIndex];
              detour.push(...this.createLine(from.x, from.y, to.x, to.y)
                .slice(pointIndex === 1 ? 0 : 1));
            }
            const candidatePath = [
              ...bentPath.slice(0, bendStart),
              ...detour,
              ...bentPath.slice(bendStart + span + 1),
            ];
            if (this.countCorridorBends(candidatePath) < 6 && detour.slice(1, -1).every((tile) => (
              tile.x > 0 && tile.x < this.width - 1
              && tile.y > 0 && tile.y < this.height - 1
              && tiles[tile.y][tile.x] === 0
              && (!pathKeys.has(`${tile.x},${tile.y}`) || removedKeys.has(`${tile.x},${tile.y}`))
            ))) {
              replacement = detour;
              replacementStart = bendStart;
              break;
            }
          }
          if (replacement) break;
        }
        if (replacement) break;
      }
      if (!replacement) {
        return null;
      }
      bentPath.splice(replacementStart, span + 1, ...replacement);
      index = 0;
      straightLength = 1;
      previousDirection = null;
    }
    return bentPath;
  }

  countCorridorBends(path) {
    let bends = 0;
    let previousDirection = null;
    for (let index = 1; index < path.length; index += 1) {
      const directionX = path[index].x - path[index - 1].x;
      const directionY = path[index].y - path[index - 1].y;
      const direction = `${directionX},${directionY}`;
      if (previousDirection !== null && direction !== previousDirection) {
        bends += 1;
      }
      previousDirection = direction;
    }
    return bends;
  }

  hasLongStraightCorridor(tiles) {
    const verticalLengths = Array(this.width).fill(0);
    for (const row of tiles) {
      let horizontalLength = 0;
      for (let column = 0; column < row.length; column += 1) {
        horizontalLength = row[column] === 2 ? horizontalLength + 1 : 0;
        verticalLengths[column] = row[column] === 2 ? verticalLengths[column] + 1 : 0;
        if (horizontalLength > 20 || verticalLengths[column] > 20) {
          return true;
        }
      }
    }
    return false;
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
    const startX = isHorizontalFirst ? fromRoom.centerX : this.randomInt(fromRoom.x + 1, fromRoom.x + fromRoom.width - 2);
    const startY = isHorizontalFirst ? this.randomInt(fromRoom.y + 1, fromRoom.y + fromRoom.height - 2) : fromRoom.centerY;
    const endX = isHorizontalFirst ? toRoom.centerX : this.randomInt(toRoom.x + 1, toRoom.x + toRoom.width - 2);
    const endY = isHorizontalFirst ? this.randomInt(toRoom.y + 1, toRoom.y + toRoom.height - 2) : toRoom.centerY;
    const shape = this.randomInt(0, 2);
    if (isHorizontalFirst) {
      if (Math.abs(endX - startX) < 3) {
        return null;
      }
      const direction = Math.sign(endX - startX);
      const gap = direction > 0 ? toRoom.x - fromRoom.x - fromRoom.width : fromRoom.x - toRoom.x - toRoom.width;
      if (shape !== 0 && gap > 8) {
        const firstBendX = direction > 0
          ? fromRoom.x + fromRoom.width + this.randomInt(1, 2)
          : fromRoom.x - this.randomInt(2, 3);
        const secondBendX = direction > 0
          ? toRoom.x - this.randomInt(2, 3)
          : toRoom.x + toRoom.width + this.randomInt(1, 2);
        const offset = this.randomInt(2, 5);
        const middleY = shape === 1
          ? Math.min(this.height - 2, Math.max(startY, endY) + offset)
          : Math.max(1, Math.min(startY, endY) - offset);
        return [
          ...this.createLine(startX, startY, firstBendX, startY),
          ...this.createLine(firstBendX, startY, firstBendX, middleY).slice(1),
          ...this.createLine(firstBendX, middleY, secondBendX, middleY).slice(1),
          ...this.createLine(secondBendX, middleY, secondBendX, endY).slice(1),
          ...this.createLine(secondBendX, endY, endX, endY).slice(1),
        ];
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
    const direction = Math.sign(endY - startY);
    const gap = direction > 0 ? toRoom.y - fromRoom.y - fromRoom.height : fromRoom.y - toRoom.y - toRoom.height;
    if (shape !== 0 && gap > 8) {
      const firstBendY = direction > 0
        ? fromRoom.y + fromRoom.height + this.randomInt(1, 2)
        : fromRoom.y - this.randomInt(2, 3);
      const secondBendY = direction > 0
        ? toRoom.y - this.randomInt(2, 3)
        : toRoom.y + toRoom.height + this.randomInt(1, 2);
      const offset = this.randomInt(2, 5);
      const middleX = shape === 1
        ? Math.min(this.width - 2, Math.max(startX, endX) + offset)
        : Math.max(1, Math.min(startX, endX) - offset);
      return [
        ...this.createLine(startX, startY, startX, firstBendY),
        ...this.createLine(startX, firstBendY, middleX, firstBendY).slice(1),
        ...this.createLine(middleX, firstBendY, middleX, secondBendY).slice(1),
        ...this.createLine(middleX, secondBendY, endX, secondBendY).slice(1),
        ...this.createLine(endX, secondBendY, endX, endY).slice(1),
      ];
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

  canCarveCorridor(tiles, path, fromRoom, toRoom) {
    if (fromRoom && toRoom) {
      const isInside = (tile, room) => tile.x >= room.x && tile.x < room.x + room.width
        && tile.y >= room.y && tile.y < room.y + room.height;
      let stage = 0;
      for (const tile of path) {
        if (isInside(tile, fromRoom)) {
          if (stage !== 0) return false;
        } else if (isInside(tile, toRoom)) {
          if (stage === 0) return false;
          stage = 2;
        } else {
          if (stage === 2 || tiles[tile.y]?.[tile.x] !== 0) return false;
          stage = 1;
        }
      }
      if (stage !== 2 || this.hasDirectCorridor(tiles, fromRoom, toRoom)) {
        return false;
      }
    }

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

  hasDirectCorridor(tiles, fromRoom, toRoom) {
    const queue = [];
    const visited = new Set();
    for (let roomY = fromRoom.y; roomY < fromRoom.y + fromRoom.height; roomY += 1) {
      for (let roomX = fromRoom.x; roomX < fromRoom.x + fromRoom.width; roomX += 1) {
        for (const [offsetX, offsetY] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
          const x = roomX + offsetX;
          const y = roomY + offsetY;
          const key = `${x},${y}`;
          if (tiles[y]?.[x] === 2 && !visited.has(key)) {
            visited.add(key);
            queue.push({ x, y });
          }
        }
      }
    }

    for (let index = 0; index < queue.length; index += 1) {
      const current = queue[index];
      for (const [offsetX, offsetY] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
        const x = current.x + offsetX;
        const y = current.y + offsetY;
        if (x >= toRoom.x && x < toRoom.x + toRoom.width
          && y >= toRoom.y && y < toRoom.y + toRoom.height) {
          return true;
        }
        const key = `${x},${y}`;
        if (tiles[y]?.[x] === 2 && !visited.has(key)) {
          visited.add(key);
          queue.push({ x, y });
        }
      }
    }
    return false;
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

  createLoopRoute(rooms) {
    const unvisitedRooms = [...rooms];
    const routeRooms = [unvisitedRooms.splice(this.randomInt(0, unvisitedRooms.length - 1), 1)[0]];

    while (unvisitedRooms.length > 0) {
      const currentRoom = routeRooms[routeRooms.length - 1];
      const nextRoomIndex = unvisitedRooms.reduce((nearestIndex, room, index) => (
        this.distance(currentRoom, room) < this.distance(currentRoom, unvisitedRooms[nearestIndex])
          ? index
          : nearestIndex
      ), 0);
      routeRooms.push(unvisitedRooms.splice(nextRoomIndex, 1)[0]);
    }

    return routeRooms;
  }

  carveLoopBranch(tiles, routeRooms) {
    const candidates = [];
    for (let fromIndex = 0; fromIndex < routeRooms.length; fromIndex += 1) {
      for (let toIndex = fromIndex + 2; toIndex < routeRooms.length; toIndex += 1) {
        if (fromIndex === 0 && toIndex === routeRooms.length - 1) {
          continue;
        }
        candidates.push({ from: routeRooms[fromIndex], to: routeRooms[toIndex] });
      }
    }
    candidates.sort((first, second) => this.distance(first.from, first.to) - this.distance(second.from, second.to));

    for (const candidate of candidates) {
      try {
        if (this.carveCorridor(tiles, candidate.from, candidate.to)) {
          return;
        }
      } catch (error) {
        continue;
      }
    }

    throw new Error('一筆書きルートの分岐を配置できません。');
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