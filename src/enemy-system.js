const EnemySystem = {
  spawnEnemies() {
    const floorEnemies = this.dungeonData.enemyMap.get(this.playerStatus.floor);
    if (!floorEnemies) {
      this.enemies = [];
      return;
    }
    const enemyCount = Phaser.Math.Between(
      floorEnemies.minimumEnemies,
      floorEnemies.maximumEnemies,
    );
    this.enemies = [];
    for (let index = 0; index < Math.min(enemyCount, this.dungeonData.maxEnemies); index += 1) {
      this.spawnEnemy(floorEnemies);
    }
  },

  spawnMonsterHouse() {
    const floorEnemies = this.dungeonData.enemyMap.get(this.playerStatus.floor);
    if (!floorEnemies || Math.random() * 100 >= floorEnemies.monsterHouseChance) {
      return false;
    }
    const heroRoom = this.getRoomAt(this.heroTileX, this.heroTileY);
    const rooms = this.dungeonRooms.map((room) => {
      const tiles = [];
      for (let y = room.y; y < room.y + room.height; y += 1) {
        for (let x = room.x; x < room.x + room.width; x += 1) {
          if (!this.isStairTile(x, y)) {
            tiles.push({ x, y });
          }
        }
      }
      const enemies = this.enemies.filter((enemy) => this.getRoomAt(enemy.tileX, enemy.tileY) === room);
      const openTiles = tiles.filter((tile) => !this.isTileOccupied(tile.x, tile.y));
      const targetCount = Math.ceil(tiles.length * 0.66);
      return { room, tiles, enemies, openTiles, targetCount };
    }).filter((candidate) => (
      candidate.room !== heroRoom
      && candidate.enemies.length + candidate.openTiles.length >= candidate.targetCount
      && this.enemies.length - candidate.enemies.length + candidate.targetCount <= this.dungeonData.maxEnemies
    ));
    const monsterHouse = Phaser.Utils.Array.GetRandom(rooms);
    if (!monsterHouse) {
      return false;
    }
    this.monsterHouseRoom = monsterHouse.room;
    this.monsterHouseAnnounced = false;
    const occupiedTiles = monsterHouse.enemies.map((enemy) => ({ x: enemy.tileX, y: enemy.tileY }));
    const spawnTiles = Phaser.Utils.Array.Shuffle([...monsterHouse.openTiles])
      .slice(0, monsterHouse.targetCount - occupiedTiles.length);
    spawnTiles.forEach((tile) => this.spawnEnemy(floorEnemies, tile));
    this.enemies
      .filter((enemy) => this.getRoomAt(enemy.tileX, enemy.tileY) === monsterHouse.room)
      .forEach((enemy) => {
        enemy.status = 'spawn-sleep';
        enemy.idleTween?.stop();
        enemy.sleepText.setVisible(enemy.sprite.visible && !enemy.disguised);
      });
    const itemEntries = this.dungeonData.itemMap.get(this.playerStatus.floor)?.entries;
    const itemIds = itemEntries ? null : [...this.itemDefinitions.keys()];
    [...occupiedTiles, ...spawnTiles].forEach((tile) => {
      if (this.getFloorItemAt(tile.x, tile.y)) {
        return;
      }
      const item = itemEntries
        ? this.chooseFloorItem(itemEntries)
        : { id: Phaser.Utils.Array.GetRandom(itemIds) };
      if (item) {
        this.placeFloorItem(item, tile.x, tile.y);
      }
    });
    return true;
  },

  spawnEnemy(floorEnemies, position = null, startsAwake = false, excludedImageFile = null) {
    const entries = floorEnemies.entries.filter((entry) => (
      this.enemyDefinitions.find((enemy) => enemy.id === entry.id)?.imageFile !== excludedImageFile
    ));
    const definition = this.chooseEnemy(entries);
    let spawnPosition = position;
    if (!spawnPosition) {
      const heroRoom = this.getRoomAt(this.heroTileX, this.heroTileY);
      const availableRooms = this.dungeonRooms.filter((room) => room !== heroRoom);
      const room = Phaser.Utils.Array.GetRandom(availableRooms);
      spawnPosition = room && this.findOpenTileInRoom(room);
    }
    if (!definition || !spawnPosition) {
      return false;
    }
    const textureKey = this.textures.exists(definition.imageFile) ? definition.imageFile : 'Chara0024.png';
    const sprite = this.add.image(
      (spawnPosition.x + 0.5) * TILE_SIZE,
      (spawnPosition.y + 1) * TILE_SIZE,
      textureKey,
    );
    sprite.setOrigin(0.5, 1);
    sprite.setDisplaySize(ENEMY_DISPLAY_SIZE, ENEMY_DISPLAY_SIZE);
    this.updateCharacterDepth(sprite, spawnPosition.y);
    const enemy = {
      ...definition,
      maxHitPoints: definition.hitPoints,
      tileX: spawnPosition.x,
      tileY: spawnPosition.y,
      sprite,
      disguised: definition.specialAbilityId === ENEMY_SKILL_EMMA_DISGUISE,
      slowSkipNextTurn: KATJA_AIMED_SHOT_SKILL_IDS.includes(definition.specialAbilityId),
      status: !startsAwake
        && definition.specialAbilityId !== ENEMY_SKILL_EMMA_DISGUISE
        && Math.random() < SPAWN_SLEEP_CHANCE
        ? 'spawn-sleep'
        : null,
    };
    if (enemy.disguised) {
      const itemDefinition = Phaser.Utils.Array.GetRandom([...this.itemDefinitions.values()]);
      const iconKey = ITEM_ICON_KEYS[itemDefinition.category] || ITEM_ICON_KEYS[90];
      enemy.sprite.setTexture(iconKey)
        .setOrigin(0.5)
        .setDisplaySize(40, 40)
        .setPosition(
          (spawnPosition.x + 0.5) * TILE_SIZE,
          (spawnPosition.y + 0.5) * TILE_SIZE,
        )
        .setDepth(spawnPosition.y + 0.5);
    }
    if (enemy.specialAbilityId === ENEMY_SKILL_SUA_COPY_ABILITY) {
      const copiedDefinition = this.chooseEnemy(floorEnemies.entries.filter((entry) => (
        this.enemyDefinitions.find((candidate) => candidate.id === entry.id)?.specialAbilityId
          !== ENEMY_SKILL_SUA_COPY_ABILITY
      )));
      enemy.copiedSpecialAbilityId = copiedDefinition?.specialAbilityId ?? null;
      enemy.specialAbilityId = enemy.copiedSpecialAbilityId;
    }
    if (enemy.specialAbilityId === ENEMY_SKILL_JACKIE_ADRENALINE) {
      enemy.jackieLevel = 1;
      enemy.jackieLevelText = this.add.text(sprite.x + 30, sprite.y - 10, 'Lv1', {
        fontFamily: 'Yusei Magic, sans-serif',
        fontSize: '16px',
        color: '#f3f1e8',
        stroke: '#17212a',
        strokeThickness: 3,
      }).setOrigin(0.5).setDepth(sprite.depth + 0.3);
    }
    if (enemy.symbolFile) {
      const symbolKey = this.getSymbolTextureKey(enemy.symbolFile);
      enemy.symbolOutline = this.add.image(sprite.x + 28, sprite.y - 20, symbolKey)
        .setOrigin(0.5)
        .setDisplaySize(26, 26)
        .setTintFill(0x000000);
      enemy.symbol = this.add.image(sprite.x + 28, sprite.y - 20, symbolKey)
        .setOrigin(0.5)
        .setDisplaySize(24, 24)
        .setDepth(sprite.depth + 0.2);
      this.updateEnemySymbolDepth(enemy);
    }
    enemy.sleepText = this.add.text(sprite.x + 34, sprite.y - 90, 'Zz', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(sprite.depth + 1).setVisible(enemy.status === 'spawn-sleep');
    enemy.confusionText = this.add.text(sprite.x + 34, sprite.y - 90, '?', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '26px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(sprite.depth + 1).setVisible(false);
    enemy.peaceText = this.add.text(sprite.x + 34, sprite.y - 90, '和', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '24px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(sprite.depth + 1).setVisible(false);
    enemy.hasteText = this.add.text(sprite.x + 34, sprite.y - 90, '>>', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(sprite.depth + 1).setVisible(false);
    enemy.slowText = this.add.text(sprite.x + 34, sprite.y - 90, '<<', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(sprite.depth + 1).setVisible(false);
    enemy.paralysisText = this.add.text(sprite.x + 34, sprite.y - 90, '#', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '26px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(sprite.depth + 1).setVisible(false);
    const visible = this.getVisibleTiles(this.heroTileX, this.heroTileY)
      .has(`${spawnPosition.x},${spawnPosition.y}`);
    enemy.sprite.setVisible(visible);
    enemy.symbolOutline?.setVisible(visible && !enemy.disguised);
    enemy.symbol?.setVisible(visible && !enemy.disguised);
    enemy.jackieLevelText?.setVisible(visible && !enemy.disguised);
    enemy.sleepText.setVisible(visible && !enemy.disguised && enemy.status != null);
    enemy.hasteText.setVisible(visible && !enemy.disguised && enemy.heldItem != null);
    if (enemy.status !== 'spawn-sleep' && !enemy.disguised) {
      this.startEnemyIdleMotion(enemy);
    }
    this.enemies.push(enemy);
    return enemy;
  },

  getSymbolTextureKey(symbolFile) {
    return `symbol-${symbolFile.slice(6, -4).toLowerCase()}`;
  },

  chooseEnemy(entries) {
    const totalWeight = entries.reduce((total, entry) => total + entry.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const entry of entries) {
      roll -= entry.weight;
      if (roll < 0) {
        return this.enemyDefinitions.find((enemy) => enemy.id === entry.id);
      }
    }
    return this.enemyDefinitions.find((enemy) => enemy.id === entries.at(-1)?.id) || null;
  },

  findOpenTileInRoom(room) {
    const candidates = [];
    for (let y = room.y; y < room.y + room.height; y += 1) {
      for (let x = room.x; x < room.x + room.width; x += 1) {
        if ((x !== this.heroTileX || y !== this.heroTileY) && !this.getEnemyAt(x, y)) {
          candidates.push({ x, y });
        }
      }
    }
    return Phaser.Utils.Array.GetRandom(candidates);
  },
};
