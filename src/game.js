class DungeonTestScene extends Phaser.Scene {
  constructor() {
    super('DungeonTestScene');
  }

  preload() {
    this.load.spritesheet('map-chips-0001', 'assets/image/MapChip0001.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
    this.load.spritesheet('map-chips-0002', 'assets/image/MapChip0002.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
    this.load.spritesheet('map-chips-0003', 'assets/image/MapChip0003.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
    this.load.spritesheet('map-chips-0004', 'assets/image/MapChip0004.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
    this.load.spritesheet('map-chips-0005', 'assets/image/MapChip0005.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
    this.load.image('hero', 'assets/image/Chara0001.png');
    this.load.image('stairs', 'assets/image/Steps.png');
    this.load.image('WanaSpring', 'assets/image/WanaSpring.png');
    this.load.image('WanaMine', 'assets/image/WanaMine.png');
    this.load.text('enemy-data', 'assets/data/enemy.csv');
    this.load.text('enemy-skill-data', 'assets/data/enemy-skill.csv');
    this.load.text('dungeon-data', `assets/data/dungeon-0001.dat?v=${Date.now()}`);
    this.load.text('message-data', `assets/data/message.csv?v=${Date.now()}`);
    this.load.text('item-data', 'assets/data/item.csv');
    this.load.text('item-equip-effect-data', 'assets/data/item-equip-eff.csv');
    this.load.text('item-effect-data', 'assets/data/item-effect.csv');
    this.load.text('craft-data', 'assets/data/craft.csv');
    this.load.image('Chara0002.png', 'assets/image/Chara0002.png');
    this.load.image('Chara0003.png', 'assets/image/Chara0003.png');
    this.load.image('Chara0004.png', 'assets/image/Chara0004.png');
    this.load.image('Chara0005.png', 'assets/image/Chara0005.png');
    this.load.image('Chara0006.png', 'assets/image/Chara0006.png');
    this.load.image('Chara0007.png', 'assets/image/Chara0007.png');
    this.load.image('Chara0008.png', 'assets/image/Chara0008.png');
    this.load.image('Chara0009.png', 'assets/image/Chara0009.png');
    this.load.image('Chara0010.png', 'assets/image/Chara0010.png');
    this.load.image('Chara0011.png', 'assets/image/Chara0011.png');
    this.load.image('Chara0012.png', 'assets/image/Chara0012.png');
    this.load.image('Chara0013.png', 'assets/image/Chara0013.png');
    this.load.image('Chara0014.png', 'assets/image/Chara0014.png');
    this.load.image('Chara0015.png', 'assets/image/Chara0015.png');
    this.load.image('Chara0016.png', 'assets/image/Chara0016.png');
    this.load.image('Chara0017.png', 'assets/image/Chara0017.png');
    this.load.image('Chara0018.png', 'assets/image/Chara0018.png');
    this.load.image('Chara0019.png', 'assets/image/Chara0019.png');
    this.load.image('Chara0020.png', 'assets/image/Chara0020.png');
    this.load.image('Chara0021.png', 'assets/image/Chara0021.png');
    this.load.image('Chara0022.png', 'assets/image/Chara0022.png');
    this.load.image('Chara0023.png', 'assets/image/Chara0023.png');
    this.load.image('Chara0024.png', 'assets/image/Chara0024.png');
    this.load.image('Chara0025.png', 'assets/image/Chara0025.png');
    this.load.image('Chara0026.png', 'assets/image/Chara0026.png');
    this.load.image('Chara0027.png', 'assets/image/Chara0027.png');
    this.load.image('Chara0028.png', 'assets/image/Chara0028.png');
    this.load.image('Chara0029.png', 'assets/image/Chara0029.png');
    this.load.image('Chara0030.png', 'assets/image/Chara0030.png');
    this.load.image('Chara0031.png', 'assets/image/Chara0031.png');
    this.load.image('Chara0032.png', 'assets/image/Chara0032.png');
    this.load.image('Chara0033.png', 'assets/image/Chara0033.png');
    this.load.image('Chara0034.png', 'assets/image/Chara0034.png');
    this.load.image('Chara0035.png', 'assets/image/Chara0035.png');
    this.load.image('Chara0036.png', 'assets/image/Chara0036.png');
    this.load.image('Chara0037.png', 'assets/image/Chara0037.png');
    this.load.image('Chara0038.png', 'assets/image/Chara0038.png');
    this.load.image('Chara0039.png', 'assets/image/Chara0039.png');
    this.load.image('Chara0040.png', 'assets/image/Chara0040.png');
    this.load.image('Chara0041.png', 'assets/image/Chara0041.png');
    this.load.image('Chara0042.png', 'assets/image/Chara0042.png');
    this.load.image('Chara0043.png', 'assets/image/Chara0043.png');
    this.load.image('Chara0044.png', 'assets/image/Chara0044.png');
    this.load.image('Chara9000.png', 'assets/image/Chara9000.png');
    this.load.image('Chara9001.png', 'assets/image/Chara9001.png');
    this.load.image('symbol-gold', 'assets/image/SymbolGold.png');
    this.load.image('symbol-dia', 'assets/image/SymbolDia.png');
    this.load.image('symbol-mith', 'assets/image/SymbolMith.png');
    this.load.image('symbol-demi', 'assets/image/SymbolDemi.png');
    this.load.image('symbol-eta', 'assets/image/SymbolEta.png');
    this.load.image('item-icon-sword', 'assets/image/IconSword.png');
    this.load.image('item-icon-bow', 'assets/image/IconBow.png');
    this.load.image('item-icon-armor', 'assets/image/IconArmor.png');
    this.load.image('item-icon-acce', 'assets/image/IconAcce.png');
    this.load.image('item-icon-food', 'assets/image/IconFood.png');
    this.load.image('item-icon-device', 'assets/image/IconDevice.png');
    this.load.image('item-icon-herb', 'assets/image/IconHerb.png');
    this.load.image('item-icon-recipe', 'assets/image/IconRecipe.png');
    this.load.image('item-icon-junk', 'assets/image/IconJunk.png');
  }

  create(data) {
    this.isChangingFloor = false;
    this.isGameOver = false;
    this.inputReady = false;
    this.isHeroMoving = false;
    this.isAttackAnimating = false;
    this.queuedMove = null;
    this.queuedMoveDirection = null;
    this.queuedRangedAttackDirection = null;
    this.queuedRangedAttackVector = null;
    this.pendingThrow = null;
    this.pendingCraftItem = null;
    this.enemyDefinitions = GameData.parseEnemyData(this.cache.text.get('enemy-data'));
    this.enemySkillDefinitions = GameData.parseEnemySkillData(this.cache.text.get('enemy-skill-data'));
    this.itemEquipEffectDefinitions = GameData.parseItemEquipEffectData(this.cache.text.get('item-equip-effect-data'));
    this.itemEffectDefinitions = GameData.parseItemEffectData(this.cache.text.get('item-effect-data'));
    this.craftDefinitions = GameData.parseCraftData(this.cache.text.get('craft-data'));
    this.dungeonData = GameData.parseDungeonData(this.cache.text.get('dungeon-data'));
    this.messageData = GameData.parseMessageData(this.cache.text.get('message-data'));
    this.itemDefinitions = GameData.parseItemData(this.cache.text.get('item-data'));
    const dungeon = new DungeonGenerator().generate();
    this.dungeonTiles = dungeon.tiles;
    this.dungeonRooms = dungeon.rooms;
    this.corridorTiles = this.getCorridorTiles();
    const continuesExistingRun = data?.newRun !== true && data?.playerStatus != null;
    this.playerStatus = continuesExistingRun ? data.playerStatus : new PlayerStatus();
    if (!continuesExistingRun) {
      this.playerStatus.floor = this.dungeonData.startFloor;
      this.playerStatus.setLevel(this.dungeonData.startLevel);
      this.dungeonData.startItems.forEach((itemId) => this.playerStatus.addItem(itemId, 1, this.itemDefinitions));
    }
    this.floorItems = [];
    this.floorTurn = 0;
    this.isaacHayesInvasion = false;
    this.firePillars = [];
    this.traps = [];
    this.monsterHouseRoom = null;
    this.monsterHouseAnnounced = false;
    const mapChipNumber = this.dungeonData.designMap.get(this.playerStatus.floor) ?? 1;
    this.dungeonRenderer = new DungeonRenderer(this, {
      tileSize: TILE_SIZE,
      floorTile: FLOOR_TILE,
      corridorTile: CORRIDOR_TILE,
      decorationChance: FLOOR_DECORATION_CHANCE,
      chunkSize: MAP_CHUNK_SIZE,
      marginX: OUTER_WALL_MARGIN_X,
      marginY: OUTER_WALL_MARGIN_Y,
      mapChipKey: `map-chips-${String(mapChipNumber).padStart(4, '0')}`,
    });
    this.dungeonRenderer.draw(dungeon);

    const spawnRoom = Phaser.Utils.Array.GetRandom(dungeon.rooms);
    this.heroTileX = spawnRoom.centerX;
    this.heroTileY = spawnRoom.centerY;
    this.hero = this.add.image(
      (spawnRoom.centerX + 0.5) * TILE_SIZE,
      (spawnRoom.centerY + 1) * TILE_SIZE,
      'hero',
    );
    this.hero.setOrigin(0.5, 1);
    this.hero.setDisplaySize(HERO_DISPLAY_SIZE, HERO_DISPLAY_SIZE);
    this.heroSleepText = this.add.text(this.hero.x + 34, this.hero.y - 90, 'Zz', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(this.hero.depth + 1).setVisible(false);
    this.heroConfusionText = this.add.text(this.hero.x + 34, this.hero.y - 90, '?', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '26px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(this.hero.depth + 1).setVisible(false);
    this.heroPeaceText = this.add.text(this.hero.x + 34, this.hero.y - 90, '和', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '24px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(this.hero.depth + 1).setVisible(false);
    this.heroHasteText = this.add.text(this.hero.x + 34, this.hero.y - 90, '>>', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(this.hero.depth + 1).setVisible(false);
    this.heroSlowText = this.add.text(this.hero.x + 34, this.hero.y - 90, '<<', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(this.hero.depth + 1).setVisible(false);
    this.heroParalysisText = this.add.text(this.hero.x + 34, this.hero.y - 90, '#', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '26px',
      color: '#f3f1e8',
      stroke: '#17212a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(this.hero.depth + 1).setVisible(false);
    this.updateHeroDepth(this.heroTileY);
    this.startIdleMotion();
    this.spawnStairs();
    this.spawnEnemies(dungeon.rooms);
    this.spawnFloorItems();
    this.spawnMonsterHouse();
    this.enemyRespawnTurns = 0;

    this.cameras.main.startFollow(this.hero);
    this.cameras.main.setRoundPixels(true);
    this.cameras.main.centerOn(this.hero.x, this.hero.y);
    this.createVisibilityOverlay();

    this.moveKeys = this.input.keyboard.addKeys('UP,DOWN,LEFT,RIGHT');
    this.rangedAttackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dashDirection = null;
    this.game.canvas.setAttribute('tabindex', '0');
    this.game.canvas.focus();
    this.game.canvas.addEventListener('pointerdown', () => this.game.canvas.focus());
    this.createStatusUi();
    this.createMinimap();
    this.createInventoryUi();
    this.createStairMenuUi();
    this.actionLog = new ActionLog(this, this.messageData, () => this.floorTurn);
    this.messageLogScrollDirection = 0;
    this.messageLogScrollNextAt = 0;
    this.time.delayedCall(0, () => {
      this.inputReady = true;
    });
    if (data?.fadeIn) {
      this.cameras.main.fadeIn(250, 0, 0, 0);
    }
    this.onMapOverlayKeyDown = () => {
      if (this.inventoryUi.visible || this.stairMenuUi.visible || this.pendingThrow) {
        return;
      }
      this.mapOverlay.setVisible(true);
      this.cancelQueuedMove();
    };
    this.onMapOverlayKeyUp = () => this.mapOverlay.setVisible(false);
    this.onGameKeyDown = (event) => {
      if (!this.inputReady || this.isGameOver) {
        return;
      }
      if (this.actionLog.historyVisible) {
        if (event.code === 'KeyS' || event.code === 'KeyX' || event.code === 'Escape') {
          this.playSfx('se-cursor-cancel');
          this.actionLog.toggleHistory();
        } else if (event.code === 'ArrowUp') {
          this.actionLog.scrollHistory(1);
          if (!event.repeat) {
            this.messageLogScrollDirection = 1;
            this.messageLogScrollNextAt = this.time.now + 280;
          }
        } else if (event.code === 'ArrowDown') {
          this.actionLog.scrollHistory(-1);
          if (!event.repeat) {
            this.messageLogScrollDirection = -1;
            this.messageLogScrollNextAt = this.time.now + 280;
          }
        }
        return;
      }
      if (this.playerStatus.brainwashed && !this.isHeroMoving && !this.queuedMove && !this.pendingThrow) {
        this.forceBrainwashedAction();
        return;
      }
      if (this.stairMenuUi.visible) {
        this.handleStairMenuInput(event);
        return;
      }
      if (
        event.code === 'KeyS'
        && !this.inventoryUi.visible
        && !this.pendingThrow
        && !this.mapOverlay.visible
      ) {
        this.playSfx('se-cursor-enter');
        this.actionLog.toggleHistory();
        this.cancelQueuedMove();
        return;
      }
      if (
        !this.inventoryUi.visible
        && (this.playerStatus.sleepTurns > 0 || this.playerStatus.paralysisTurns > 0)
      ) {
        return;
      }
      if (this.pendingThrow && event.code === 'KeyX') {
        this.playSfx('se-cursor-cancel');
        this.pendingThrow = null;
        this.refreshInventoryUi();
        this.inventoryUi.setVisible(true);
        return;
      }
      if (this.pendingThrow && this.isMoveKey(event.code)) {
        event.preventDefault();
        this.queueThrowDirection(this.getDirectionForKey(event.code));
        return;
      }
      if (!this.inventoryUi.visible) {
        if (event.code === 'KeyC' && !this.pendingThrow && !this.mapOverlay.visible) {
          this.playSfx('se-cursor-enter');
          this.inventoryPage = 0;
          this.selectedInventoryIndex = 0;
          this.refreshInventoryUi();
          this.inventoryUi.setVisible(true);
          this.cancelQueuedMove();
          return;
        }
        if (event.code === 'KeyZ') {
          this.waitTurn();
          return;
        }
        if (event.code === 'KeyX') {
          if (this.isHeroOnStairs()) {
            this.openStairMenu();
          } else {
            this.pickupFloorItem();
          }
          return;
        }
        if (this.isMoveKey(event.code)) {
          event.preventDefault();
          const direction = this.playerStatus.confusionTurns > 0
            ? Phaser.Utils.Array.GetRandom(MOVE_DIRECTIONS)
            : this.getDirectionForKey(event.code);
          if (this.playerStatus.confusionTurns > 0) {
            this.dashDirection = null;
            this.queueMove(MOVE_INPUT_GRACE_MS, true, direction, false, true, true);
            return;
          }
          if (this.rangedAttackKey.isDown && this.queueRangedAttackDirection(direction)) {
            return;
          }
          if (event.shiftKey) {
            this.startDash(direction);
          } else {
            this.queueMove(MOVE_INPUT_GRACE_MS, true, direction);
          }
        }
        return;
      }
      if (event.code === 'KeyX' || event.code === 'Escape') {
        this.playSfx('se-cursor-cancel');
        if (this.inventoryMenuUi.visible) {
          this.closeInventoryMenu();
        } else if (this.pendingCraftItem) {
          const firstItemIndex = this.playerStatus.inventory.indexOf(this.pendingCraftItem);
          this.pendingCraftItem = null;
          if (firstItemIndex >= 0) {
            this.selectedInventoryIndex = firstItemIndex;
            this.inventoryPage = Math.floor(firstItemIndex / 10);
          } else if (this.getFloorItemAt(this.heroTileX, this.heroTileY)) {
            this.selectedInventoryIndex = 20;
            this.inventoryPage = 2;
          }
          this.refreshInventoryUi();
          this.openInventoryMenu();
        } else {
          this.inventoryUi.setVisible(false);
        }
        return;
      }
      if (event.code === 'KeyC' && !this.inventoryMenuUi.visible && !this.pendingCraftItem) {
        this.sortInventoryByCategory();
        return;
      }
      if (event.code === 'KeyZ' || event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        this.playSfx('se-cursor-enter');
        if (this.inventoryMenuUi.visible) {
          this.executeInventoryAction();
        } else if (this.pendingCraftItem) {
          this.craftWithSelectedItem();
        } else {
          this.openInventoryMenu();
        }
        return;
      }
      if (!this.isMoveKey(event.code)) {
        return;
      }
      event.preventDefault();
      if (this.inventoryMenuUi.visible) {
        this.playSfx('se-cursor-move');
        this.moveInventoryMenuSelection(event.code);
        return;
      }
      this.playSfx('se-cursor-move');
      this.moveInventorySelection(event.code);
    };
    this.input.keyboard.on('keydown-V', this.onMapOverlayKeyDown);
    this.input.keyboard.on('keyup-V', this.onMapOverlayKeyUp);
    this.input.keyboard.on('keydown', this.onGameKeyDown);
    this.events.once('shutdown', () => {
      this.input.keyboard.off('keydown-V', this.onMapOverlayKeyDown);
      this.input.keyboard.off('keyup-V', this.onMapOverlayKeyUp);
      this.input.keyboard.off('keydown', this.onGameKeyDown);
    });
  }

  playSfx(key, config) {
    this.sound.play(key, config);
  }

  playEnemyWarpSfx() {
    if (this.enemyWarpSfxPlayed) {
      return;
    }
    this.enemyWarpSfxPlayed = true;
    this.playSfx('se-warp');
  }

  playEnemyAlertSfx() {
    if (this.enemyAlertSfxPlayed) {
      return;
    }
    this.enemyAlertSfxPlayed = true;
    this.playSfx('se-suzu-alert');
  }

  playEnemyTrapSetSfx() {
    if (this.enemyTrapSetSfxPlayed) {
      return;
    }
    this.enemyTrapSetSfxPlayed = true;
    this.playSfx('se-wana-set');
  }

  playEnemyFireSfx() {
    if (this.enemyFireSfxPlayed) {
      return;
    }
    this.enemyFireSfxPlayed = true;
    this.playSfx('se-fire');
  }

  playEnemyPureSfx() {
    if (this.enemyPureSfxPlayed) {
      return;
    }
    this.enemyPureSfxPlayed = true;
    this.playSfx('se-pure');
  }

  playEnemyViolinSfx() {
    if (this.enemyViolinSfxPlayed) {
      return;
    }
    this.enemyViolinSfxPlayed = true;
    this.playSfx('se-violin', { volume: 0.5 });
  }

  playSfxForDuration(key, duration) {
    const sound = this.sound.add(key);
    sound.play();
    window.setTimeout(() => {
      sound.stop();
      sound.destroy();
    }, duration);
  }

  spawnFloorItems() {
    const floorItems = this.dungeonData.itemMap.get(this.playerStatus.floor);
    if (!floorItems) {
      return;
    }
    const itemCount = Phaser.Math.Between(floorItems.minimumItems, floorItems.maximumItems);
    for (let index = 0; index < itemCount; index += 1) {
      const item = this.chooseFloorItem(floorItems.entries);
      const position = this.findOpenFloorItemTile();
      if (!item || !position) {
        return;
      }
      this.placeFloorItem(item, position.x, position.y);
    }
    if (!floorItems.recipeDropEnabled) {
      return;
    }
    const recipeItemIds = [...this.itemDefinitions.values()]
      .filter((definition) => definition.category === 80)
      .map((definition) => definition.id);
    const recipeItemCount = Phaser.Math.Between(
      floorItems.minimumRecipeItems,
      floorItems.maximumRecipeItems,
    );
    for (let index = 0; index < recipeItemCount; index += 1) {
      const position = this.findOpenFloorItemTile();
      if (!position || recipeItemIds.length === 0) {
        return;
      }
      this.placeFloorItem({ id: Phaser.Utils.Array.GetRandom(recipeItemIds) }, position.x, position.y);
    }
  }

  chooseFloorItem(entries) {
    const totalWeight = entries.reduce((total, entry) => total + entry.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const entry of entries) {
      roll -= entry.weight;
      if (roll < 0) {
        return { id: entry.id };
      }
    }
    return entries.at(-1) ? { id: entries.at(-1).id } : null;
  }

  findOpenFloorItemTile() {
    const candidates = [];
    this.dungeonRooms.forEach((room) => {
      for (let y = room.y; y < room.y + room.height; y += 1) {
        for (let x = room.x; x < room.x + room.width; x += 1) {
          if (!this.isTileOccupied(x, y) && !this.hasStaticObjectAt(x, y)) {
            candidates.push({ x, y });
          }
        }
      }
    });
    return Phaser.Utils.Array.GetRandom(candidates);
  }

  spawnStairs() {
    const candidates = [];
    this.dungeonRooms.forEach((room) => {
      for (let y = room.y; y < room.y + room.height; y += 1) {
        for (let x = room.x; x < room.x + room.width; x += 1) {
          if (x !== this.heroTileX || y !== this.heroTileY) {
            candidates.push({ x, y });
          }
        }
      }
    });
    const position = Phaser.Utils.Array.GetRandom(candidates);
    if (!position) {
      this.stairs = null;
      return;
    }
    const sprite = this.add.image(
      (position.x + 0.5) * TILE_SIZE,
      (position.y + 0.5) * TILE_SIZE,
      'stairs',
    ).setDisplaySize(TILE_SIZE, TILE_SIZE).setDepth(position.y + 0.25);
    this.stairs = { ...position, sprite };
  }

  getCorridorTiles() {
    const tiles = [];
    this.dungeonTiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === CORRIDOR_TILE) {
          tiles.push({ x, y });
        }
      });
    });
    return tiles;
  }

  updateCharacterDepth(sprite, tileY) {
    sprite.setDepth(tileY + 1);
  }

  updateHeroDepth(tileY) {
    this.hero.setDepth(tileY + 1.5);
    this.heroSleepText?.setDepth(this.hero.depth + 1);
    this.heroConfusionText?.setDepth(this.hero.depth + 1);
    this.heroPeaceText?.setDepth(this.hero.depth + 1);
    this.heroHasteText?.setDepth(this.hero.depth + 1);
    this.heroSlowText?.setDepth(this.hero.depth + 1);
    this.heroParalysisText?.setDepth(this.hero.depth + 1);
  }

  createVisibilityOverlay() {
    this.visibilityOverlay = this.add.graphics().setDepth(FOG_DEPTH);
    this.visibilityOverlay.fillStyle(0x000000, 0.76);
    this.visibilityOverlay.fillRect(
      -OUTER_WALL_MARGIN_X * TILE_SIZE,
      -OUTER_WALL_MARGIN_Y * TILE_SIZE,
      (this.dungeonTiles[0].length + OUTER_WALL_MARGIN_X * 2) * TILE_SIZE,
      (this.dungeonTiles.length + OUTER_WALL_MARGIN_Y * 2) * TILE_SIZE,
    );
    this.visibilityMaskShape = this.make.graphics({ add: false });
    this.visibilityMask = this.visibilityMaskShape.createGeometryMask();
    this.visibilityMask.invertAlpha = true;
    this.visibilityOverlay.setMask(this.visibilityMask);
    this.updateVisibility();
  }

  updateVisibility() {
    const tileX = this.heroTileX;
    const tileY = this.heroTileY;
    const heroCenterX = this.hero.x;
    const heroCenterY = this.hero.y - TILE_SIZE / 2;
    const currentRoom = this.getRoomAt(tileX, tileY);

    this.visibilityMaskShape.clear();
    this.visibilityMaskShape.fillStyle(0xffffff, 1);
    const danielLimitsVision = currentRoom && this.hasDanielVisionEffect(currentRoom);
    if (currentRoom && !danielLimitsVision) {
      this.visibilityMaskShape.fillRect(
        (currentRoom.x - 1) * TILE_SIZE,
        (currentRoom.y - 1) * TILE_SIZE,
        (currentRoom.width + 2) * TILE_SIZE,
        (currentRoom.height + 2) * TILE_SIZE,
      );
    } else {
      const corridorVisibilityRadius = danielLimitsVision ? 1.5 : this.hasEquipEffect(1) ? 2.5 : 1.5;
      this.visibilityMaskShape.fillRect(
        heroCenterX - TILE_SIZE * corridorVisibilityRadius,
        heroCenterY - TILE_SIZE * corridorVisibilityRadius,
        TILE_SIZE * corridorVisibilityRadius * 2,
        TILE_SIZE * corridorVisibilityRadius * 2,
      );
    }

    const visibleTiles = this.getVisibleTiles(tileX, tileY);
    this.revealMinimapTiles(visibleTiles);
    this.updateEnemyVisibility(visibleTiles);
    this.firePillars.forEach((pillar) => {
      pillar.graphics.setVisible(visibleTiles.has(`${pillar.tileX},${pillar.tileY}`));
    });
    this.traps.forEach((trap) => {
      trap.marker.setVisible(visibleTiles.has(`${trap.tileX},${trap.tileY}`));
    });
    if (this.minimapMarker) {
      this.drawMinimapMarker();
    }
  }

  update() {
    if (this.actionLog?.historyVisible) {
      const direction = this.moveKeys.UP.isDown ? 1 : this.moveKeys.DOWN.isDown ? -1 : 0;
      if (direction === 0) {
        this.messageLogScrollDirection = 0;
      } else if (
        direction !== this.messageLogScrollDirection
        || this.time.now >= this.messageLogScrollNextAt
      ) {
        this.actionLog.scrollHistory(direction);
        this.messageLogScrollDirection = direction;
        this.messageLogScrollNextAt = this.time.now + 80;
      }
      return;
    }
    this.updateStatusMarkers();
    if (this.isHeroMoving && !this.isAttackAnimating && !this.springTrapWarpPending) {
      this.updateVisibility();
    }
  }

  updateStatusMarkers() {
    const alternateMarker = Math.floor(this.time.now / 400) % 2 === 0;
    const statusMarkerTick = Math.floor(this.time.now / 400);
    const heroSleeping = this.playerStatus.sleepTurns > 0;
    const heroConfused = this.playerStatus.confusionTurns > 0;
    const heroPeaceful = this.playerStatus.peaceTurns > 0;
    const heroHasted = this.playerStatus.speedTurns > 0;
    const heroSlowed = this.playerStatus.slowTurns > 0;
    const heroParalyzed = this.playerStatus.paralysisTurns > 0;
    const heroMarkers = [
      heroSleeping && 'sleep',
      heroConfused && 'confusion',
      heroPeaceful && 'peace',
      heroHasted && 'haste',
      heroSlowed && 'slow',
      heroParalyzed && 'paralysis',
    ].filter(Boolean);
    const visibleHeroMarker = heroMarkers[statusMarkerTick % heroMarkers.length];
    this.heroSleepText?.setPosition(this.hero.x + 34, this.hero.y - 90).setVisible(visibleHeroMarker === 'sleep');
    this.heroConfusionText?.setPosition(this.hero.x + 34, this.hero.y - 90).setVisible(visibleHeroMarker === 'confusion');
    this.heroPeaceText?.setPosition(this.hero.x + 34, this.hero.y - 90).setVisible(visibleHeroMarker === 'peace');
    this.heroHasteText?.setPosition(this.hero.x + 34, this.hero.y - 90).setVisible(visibleHeroMarker === 'haste');
    this.heroSlowText?.setPosition(this.hero.x + 34, this.hero.y - 90).setVisible(visibleHeroMarker === 'slow');
    this.heroParalysisText?.setPosition(this.hero.x + 34, this.hero.y - 90).setVisible(visibleHeroMarker === 'paralysis');
    this.enemies.forEach((enemy) => {
      const sleeping = enemy.status != null;
      const confused = enemy.confusionTurns > 0;
      const peaceful = enemy.peaceTurns > 0;
      const hasted = this.isEnemyHasted(enemy);
      const slowed = this.isEnemySlowed(enemy);
      const paralyzed = enemy.paralysisTurns > 0;
      const activeMarkers = [
        sleeping && 'sleep',
        peaceful && 'peace',
        hasted && 'haste',
        confused && 'confusion',
        slowed && 'slow',
        paralyzed && 'paralysis',
      ].filter(Boolean);
      const visibleMarker = activeMarkers[statusMarkerTick % activeMarkers.length];
      const showMarker = enemy.sprite.visible && !enemy.disguised;
      enemy.sleepText?.setPosition(enemy.sprite.x + 34, enemy.sprite.y - 90)
        .setVisible(showMarker && visibleMarker === 'sleep');
      enemy.confusionText?.setPosition(enemy.sprite.x + 34, enemy.sprite.y - 90)
        .setVisible(showMarker && visibleMarker === 'confusion');
      enemy.peaceText?.setPosition(enemy.sprite.x + 34, enemy.sprite.y - 90)
        .setVisible(showMarker && visibleMarker === 'peace');
      enemy.hasteText?.setPosition(enemy.sprite.x + 34, enemy.sprite.y - 90)
        .setVisible(showMarker && visibleMarker === 'haste');
      enemy.slowText?.setPosition(enemy.sprite.x + 34, enemy.sprite.y - 90)
        .setVisible(showMarker && visibleMarker === 'slow');
      enemy.paralysisText?.setPosition(enemy.sprite.x + 34, enemy.sprite.y - 90)
        .setVisible(showMarker && visibleMarker === 'paralysis');
    });
  }

  getRoomAt(tileX, tileY) {
    return this.dungeonRooms.find((room) => (
      tileX >= room.x
      && tileX < room.x + room.width
      && tileY >= room.y
      && tileY < room.y + room.height
    ));
  }

  setHeroEnteredRoom(room) {
    this.enteredRoom = room;
    if (this.monsterHouseRoom && room === this.monsterHouseRoom && !this.monsterHouseAnnounced) {
      this.monsterHouseAnnounced = true;
      this.actionLog.add('MONSTER_HOUSE_ENTERED');
    }
  }

  hasEquipEffect(effectId) {
    return this.playerStatus.inventory.some((item) => (
      item.equipped != null
      && this.itemDefinitions.get(item.id)?.equipEffectId === effectId
      && this.itemEquipEffectDefinitions.has(effectId)
    ));
  }

  hasDanielVisionEffect(room) {
    return this.enemies.some((enemy) => (
      enemy.specialAbilityId === ENEMY_SKILL_DANIEL_LIMITS_VISION
      && this.getRoomAt(enemy.tileX, enemy.tileY) === room
    ));
  }

  getEnemyLogName(enemy) {
    return enemy.name;
  }

  revealEmma(enemy) {
    enemy.disguised = false;
    this.playSfx('se-craft-ok');
    enemy.sprite.setTexture(enemy.imageFile)
      .setOrigin(0.5, 1)
      .setDisplaySize(ENEMY_DISPLAY_SIZE, ENEMY_DISPLAY_SIZE)
      .setPosition(
        (enemy.tileX + 0.5) * TILE_SIZE,
        (enemy.tileY + 1) * TILE_SIZE,
      );
    this.updateCharacterDepth(enemy.sprite, enemy.tileY);
    this.updateEnemySymbolDepth(enemy);
    enemy.needsIdleMotion = true;
    this.updateVisibility();
    this.playEmmaRevealEffect(enemy.tileX, enemy.tileY);
    this.actionLog.add('ENEMY_EMMA_REVEALED', { enemy: this.getEnemyLogName(enemy) });
  }

  playEmmaRevealEffect(tileX, tileY) {
    const effect = this.add.graphics().setDepth(FOG_DEPTH - 1);
    effect.fillStyle(0xdde5e9, 0.65);
    effect.fillCircle(-TILE_SIZE * 0.16, TILE_SIZE * 0.13, TILE_SIZE * 0.19);
    effect.fillCircle(TILE_SIZE * 0.15, TILE_SIZE * 0.1, TILE_SIZE * 0.23);
    effect.fillCircle(0, -TILE_SIZE * 0.13, TILE_SIZE * 0.2);
    effect.setPosition(
      (tileX + 0.5) * TILE_SIZE,
      (tileY + 0.5) * TILE_SIZE,
    ).setScale(0.45);
    this.tweens.add({
      targets: effect,
      y: `-=${TILE_SIZE * 0.55}`,
      scale: 1.5,
      alpha: 0,
      duration: 460,
      ease: 'Quad.easeOut',
      onComplete: () => effect.destroy(),
    });
  }

  getVisibleTiles(tileX, tileY) {
    const visibleTiles = new Set();
    const currentRoom = this.getRoomAt(tileX, tileY);
    const heroHasDanielVisionEffect = currentRoom
      && tileX === this.heroTileX
      && tileY === this.heroTileY
      && this.hasDanielVisionEffect(currentRoom);
    const corridorVisibilityRadius = tileX === this.heroTileX
      && tileY === this.heroTileY
      && this.hasEquipEffect(1)
      ? 2
      : 1;
    const visibilityRadius = heroHasDanielVisionEffect ? 1 : corridorVisibilityRadius;
    const startX = currentRoom && !heroHasDanielVisionEffect ? currentRoom.x - 1 : tileX - visibilityRadius;
    const startY = currentRoom && !heroHasDanielVisionEffect ? currentRoom.y - 1 : tileY - visibilityRadius;
    const width = currentRoom && !heroHasDanielVisionEffect ? currentRoom.width + 2 : visibilityRadius * 2 + 1;
    const height = currentRoom && !heroHasDanielVisionEffect ? currentRoom.height + 2 : visibilityRadius * 2 + 1;

    for (let y = startY; y < startY + height; y += 1) {
      for (let x = startX; x < startX + width; x += 1) {
        if (this.dungeonTiles[y]?.[x] !== undefined) {
          visibleTiles.add(`${x},${y}`);
        }
      }
    }

    return visibleTiles;
  }

  updateEnemyVisibility(visibleTiles) {
    this.enemies.forEach((enemy) => {
      const visible = visibleTiles.has(`${enemy.tileX},${enemy.tileY}`);
      enemy.sprite.setVisible(visible);
      enemy.symbolOutline?.setVisible(visible && !enemy.disguised);
      enemy.symbol?.setVisible(visible && !enemy.disguised);
      enemy.jackieLevelText?.setVisible(visible && !enemy.disguised);
      enemy.sleepText.setVisible(visible && !enemy.disguised && enemy.status != null);
      enemy.confusionText?.setVisible(visible && !enemy.disguised && enemy.confusionTurns > 0);
      enemy.peaceText?.setVisible(visible && !enemy.disguised && enemy.peaceTurns > 0);
      enemy.hasteText?.setVisible(visible && !enemy.disguised && this.isEnemyHasted(enemy));
      enemy.slowText?.setVisible(visible && !enemy.disguised && this.isEnemySlowed(enemy));
      enemy.paralysisText?.setVisible(visible && !enemy.disguised && enemy.paralysisTurns > 0);
    });
    this.floorItems.forEach((item) => {
      item.marker.setVisible(visibleTiles.has(`${item.tileX},${item.tileY}`));
    });
    if (this.stairs) {
      const stairsVisible = visibleTiles.has(`${this.stairs.x},${this.stairs.y}`);
      this.stairs.sprite.setVisible(stairsVisible);
      this.stairs.discovered = this.stairs.discovered || stairsVisible;
    }
  }

  createStatusUi() {
    this.statusUi = new StatusUi(this, {
      x: STATUS_X,
      y: STATUS_Y,
      height: STATUS_HEIGHT,
      depth: STATUS_DEPTH,
    });
    this.statusUi.create(this.playerStatus, this.itemDefinitions);
  }

  updateStatusUi() {
    this.statusUi.update(this.playerStatus, this.itemDefinitions);
  }

  createMinimap() {
    this.minimapUi = new MinimapUi(this, {
      gameWidth: GAME_WIDTH,
      gameHeight: GAME_HEIGHT,
      overlayDepth: MAP_OVERLAY_DEPTH,
      depth: MINIMAP_DEPTH,
      markerDepth: MINIMAP_MARKER_DEPTH,
      floorTile: FLOOR_TILE,
      corridorTile: CORRIDOR_TILE,
      scale: MINIMAP_SCALE,
      x: MINIMAP_X,
      y: MINIMAP_Y,
    });
    this.minimapUi.create(this.getVisibleTiles(this.heroTileX, this.heroTileY));
    this.mapOverlay = this.minimapUi.overlay;
    this.minimapMarker = this.minimapUi.marker;
  }

  createStairMenuUi() {
    const panelWidth = 420;
    const panelHeight = 180;
    const panelX = (GAME_WIDTH - panelWidth) / 2;
    const panelY = (GAME_HEIGHT - panelHeight) / 2;
    const background = this.add.graphics();
    background.fillStyle(0x101820, 0.97);
    background.fillRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
    background.lineStyle(2, 0xd9b85a, 1);
    background.strokeRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
    const title = this.add.text(panelX + 24, panelY + 24, '次のフロアへ進みますか？', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '24px', color: '#f3f1e8',
    });
    this.stairMenuGraphics = this.add.graphics();
    this.stairMenuTexts = ['はい', 'いいえ'].map((label, index) => this.add.text(
      panelX + 56 + index * 150,
      panelY + 112,
      label,
      { fontFamily: 'Yusei Magic, sans-serif', fontSize: '24px', color: '#f3f1e8' },
    ));
    this.stairMenuUi = this.add.container(0, 0, [
      background, title, this.stairMenuGraphics, ...this.stairMenuTexts,
    ]).setScrollFactor(0).setDepth(STAIR_MENU_DEPTH).setVisible(false);
    this.selectedStairMenuIndex = 0;
  }

  refreshStairMenu() {
    const panelX = (GAME_WIDTH - 420) / 2;
    const panelY = (GAME_HEIGHT - 180) / 2;
    this.stairMenuGraphics.clear();
    this.stairMenuTexts.forEach((text, index) => {
      const selected = index === this.selectedStairMenuIndex;
      this.stairMenuGraphics.fillStyle(selected ? 0x384d58 : 0x101820, 1);
      this.stairMenuGraphics.fillRect(panelX + 38 + index * 150, panelY + 106, 120, 40);
      text.setColor(selected ? '#ffdc4a' : '#f3f1e8');
    });
  }

  openStairMenu() {
    this.selectedStairMenuIndex = 0;
    this.refreshStairMenu();
    this.stairMenuUi.setVisible(true);
    this.dashDirection = null;
  }

  handleStairMenuInput(event) {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      this.selectedStairMenuIndex = 1 - this.selectedStairMenuIndex;
      this.refreshStairMenu();
    } else if (event.code === 'KeyZ' || event.code === 'Enter' || event.code === 'Space') {
      if (this.selectedStairMenuIndex === 0) {
        this.advanceFloor();
      } else {
        this.stairMenuUi.setVisible(false);
      }
    } else if (event.code === 'KeyX' || event.code === 'Escape') {
      this.stairMenuUi.setVisible(false);
    }
  }

  advanceFloor() {
    if (this.isChangingFloor) {
      return;
    }
    this.playSfxForDuration('se-next-floor', 2000);
    if (this.playerStatus.floor >= this.dungeonData.maxFloor) {
      this.showResult(null, true);
      return;
    }
    this.isChangingFloor = true;
    this.playerStatus.sleepTurns = 0;
    this.playerStatus.confusionTurns = 0;
    this.playerStatus.confusionJustEnded = false;
    this.playerStatus.speedTurns = 0;
    this.playerStatus.hasteExtraAction = false;
    this.playerStatus.slowTurns = 0;
    this.playerStatus.slowSkipNextTurn = false;
    this.playerStatus.paralysisTurns = 0;
    this.playerStatus.brandTurns = 0;
    this.playerStatus.brainwashed = false;
    this.playerStatus.peaceTurns = 0;
    this.playerStatus.trapAvoidance = false;
    this.playerStatus.floor += 1;
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.time.delayedCall(250, () => {
      this.scene.restart({ playerStatus: this.playerStatus, fadeIn: true });
    });
  }

  executeInventoryAction() {
    const item = this.getSelectedInventoryItem();
    const definition = item && this.itemDefinitions.get(item.id);
    const action = this.inventoryMenuActions[this.selectedInventoryMenuIndex];
    if (!item || !definition || !action) {
      return;
    }
    if (this.playerStatus.peaceTurns > 0 && action === '投げる') {
      this.actionLog.add('PLAYER_PEACEFUL');
      return;
    }
    if (action === '拾う') {
      this.inventoryUi.setVisible(false);
      this.closeInventoryMenu();
      this.pickupFloorItem();
      return;
    }
    if (action === '交換') {
      this.exchangeInventoryItemWithFloorItem(item);
      return;
    }
    if (action === '投げる') {
      this.pendingThrow = { item, definition, fromFloor: this.isFloorItemSelected() };
      this.inventoryUi.setVisible(false);
      this.closeInventoryMenu();
      this.actionLog.add('ITEM_THROW_DIRECTION', { item: definition.name });
      return;
    }
    if (
      action === '使う'
      && (
        definition.useEffectId === ITEM_EFFECT_SLEEP_GAS
        || definition.useEffectId === ITEM_EFFECT_VOLTICLET
        || definition.useEffectId === ITEM_EFFECT_DIRECTIONAL_WARP
      )
    ) {
      this.pendingThrow = {
        item,
        definition,
        fromFloor: this.isFloorItemSelected(),
        sleepGas: definition.useEffectId === ITEM_EFFECT_SLEEP_GAS,
        volticlet: definition.useEffectId === ITEM_EFFECT_VOLTICLET,
        directionalWarp: definition.useEffectId === ITEM_EFFECT_DIRECTIONAL_WARP,
      };
      this.inventoryUi.setVisible(false);
      this.closeInventoryMenu();
      this.actionLog.add('ITEM_USE_DIRECTION', { item: definition.name });
      return;
    }
    if (action === '製作') {
      this.pendingCraftItem = item;
      this.closeInventoryMenu();
      this.refreshInventoryUi();
      this.actionLog.add('ITEM_CRAFT_SELECT', { item: definition.name });
      return;
    }
    if (action === '装備') {
      this.playerStatus.equipItem(item, definition);
    } else if (action === '外す') {
      this.playerStatus.unequipItem(item);
    } else if (action === '食べる' || action === '使う') {
      this.playSfx(action === '食べる' ? 'se-eat' : 'se-use');
      const hitPointsBefore = this.playerStatus.hitPoints;
      const hungerBefore = this.playerStatus.hunger;
      const wasAtMaximumHitPoints = hitPointsBefore === this.playerStatus.maxHitPoints;
      const wasAtMaximumHunger = hungerBefore === this.playerStatus.maxHunger;
      this.playerStatus.hitPoints = Math.min(this.playerStatus.maxHitPoints, this.playerStatus.hitPoints + definition.hitPoints);
      this.playerStatus.hunger = Math.min(this.playerStatus.maxHunger, this.playerStatus.hunger + definition.hunger);
      const recoveredHitPoints = this.playerStatus.hitPoints - hitPointsBefore;
      const recoveredHunger = this.playerStatus.hunger - hungerBefore;
      this.actionLog.add(action === '食べる' ? 'ITEM_ATE' : 'ITEM_USED', { item: definition.name });
      this.applyItemUseEffect(definition, wasAtMaximumHitPoints, wasAtMaximumHunger);
      if (definition.category !== 50 || this.consumeDeviceUse(item)) {
        this.removeInventoryOrFloorItem(item);
      }
      if (recoveredHitPoints > 0) {
        this.actionLog.add('ITEM_HP_RECOVERY', { amount: recoveredHitPoints });
      }
      if (recoveredHunger > 0) {
        this.actionLog.add('ITEM_HUNGER_RECOVERY', { amount: recoveredHunger });
      }
    } else {
      this.removeInventoryOrFloorItem(item);
      const dropTile = {
        x: this.heroTileX,
        y: this.heroTileY,
      };
      this.placeDroppedItem(item, dropTile.x, dropTile.y);
    }
    this.selectedInventoryIndex = Math.min(
      this.selectedInventoryIndex,
      this.playerStatus.inventoryCapacity - 1,
    );
    this.inventoryPage = Math.floor(this.selectedInventoryIndex / 10);
    this.updateStatusUi();
    this.refreshInventoryUi();
    this.closeInventoryMenu();
    if (action === '装備' || action === '外す') {
      this.updateVisibility();
    }
    this.drawMinimapMarker();
    if (action === '装備') {
      this.actionLog.add('ITEM_ACTION', { item: definition.name, action: '装備した' });
    } else if (action === '外す') {
      this.actionLog.add('ITEM_ACTION', { item: definition.name, action: '外した' });
    } else if (action === '置く') {
      this.actionLog.add('ITEM_ACTION', { item: definition.name, action: '置いた' });
    }
    this.consumeItemTurn();
  }

  exchangeInventoryItemWithFloorItem(inventoryItem) {
    const floorItem = this.getFloorItemAt(this.heroTileX, this.heroTileY);
    const floorDefinition = floorItem && this.itemDefinitions.get(floorItem.id);
    const inventoryIndex = this.playerStatus.inventory.indexOf(inventoryItem);
    if (!floorItem || floorItem.kind === 'coffin' || !floorDefinition || inventoryIndex < 0) {
      return;
    }
    const exchangedItem = { id: floorItem.id };
    if (floorItem.usesRemaining != null) {
      exchangedItem.usesRemaining = floorItem.usesRemaining;
    }
    floorItem.marker.destroy();
    this.floorItems = this.floorItems.filter((item) => item !== floorItem);
    this.playerStatus.inventory.splice(inventoryIndex, 1, exchangedItem);
    this.playerStatus.updateEquipmentStats();
    this.placeFloorItem(inventoryItem, this.heroTileX, this.heroTileY);
    this.actionLog.add('ITEM_EXCHANGED', {
      inventoryItem: this.itemDefinitions.get(inventoryItem.id)?.name ?? 'アイテム',
      floorItem: floorDefinition.name,
    });
    this.updateStatusUi();
    this.refreshInventoryUi();
    this.closeInventoryMenu();
    this.drawMinimapMarker();
    this.consumeItemTurn();
  }

  craftWithSelectedItem() {
    const firstItem = this.pendingCraftItem;
    const secondItem = this.getSelectedInventoryItem();
    const secondDefinition = secondItem && this.itemDefinitions.get(secondItem.id);
    if (!firstItem || !secondItem || firstItem === secondItem || secondDefinition?.category === 80) {
      return;
    }
    if (!this.isInventoryOrFloorItem(firstItem) || !this.isInventoryOrFloorItem(secondItem)) {
      return;
    }
    this.pendingCraftItem = null;
    const materialIds = [firstItem.id, secondItem.id].sort((first, second) => first - second);
    const recipe = this.craftDefinitions.get(materialIds.join(','));
    const firstDefinition = this.itemDefinitions.get(firstItem.id);
    this.removeInventoryOrFloorItem(firstItem);
    this.removeInventoryOrFloorItem(secondItem);
    if (recipe && this.playerStatus.addItem(recipe.resultItemId, 1, this.itemDefinitions)) {
      const resultDefinition = this.itemDefinitions.get(recipe.resultItemId);
      this.playSfx('se-craft-ok');
      this.actionLog.add('ITEM_CRAFT_SUCCESS', {
        first: firstDefinition?.name ?? 'アイテム',
        second: secondDefinition?.name ?? 'アイテム',
        item: resultDefinition?.name ?? 'アイテム',
      });
    } else {
      this.playSfx('se-craft-miss');
      this.actionLog.add('ITEM_CRAFT_FAILURE', {
        first: firstDefinition?.name ?? 'アイテム',
        second: secondDefinition?.name ?? 'アイテム',
      });
    }
    this.selectedInventoryIndex = Math.min(this.selectedInventoryIndex, this.playerStatus.inventory.length);
    this.inventoryPage = Math.floor(this.selectedInventoryIndex / 10);
    this.updateStatusUi();
    this.refreshInventoryUi();
    this.consumeItemTurn();
  }

  applyItemUseEffect(definition, wasAtMaximumHitPoints, wasAtMaximumHunger, options = {}) {
    if (
      definition.useEffectId === ITEM_EFFECT_FLYING_HERB
      || definition.useEffectId === ITEM_EFFECT_JUMP_PAD
    ) {
      this.useJumpPad(!options.deferPresentation);
      return;
    }
    if (definition.useEffectId === ITEM_EFFECT_CONFUSE_ROOM) {
      this.applyRoomConfusion();
      return;
    }
    if (definition.useEffectId === ITEM_EFFECT_PARALYZE_ROOM) {
      this.applyRoomParalysis();
      return;
    }
    if (definition.useEffectId === ITEM_EFFECT_TRAP_AVOIDANCE) {
      this.playerStatus.trapAvoidance = true;
      this.actionLog.add('PLAYER_TRAP_AVOIDANCE');
      return;
    }
    if (definition.useEffectId === ITEM_EFFECT_CALMING_HERB) {
      if (this.playerStatus.confusionTurns > 0) {
        this.playerStatus.confusionTurns = 0;
        this.actionLog.add('CONFUSION_ENDED', { target: 'プレイヤー' });
      }
      return;
    }
    if (definition.useEffectId === ITEM_EFFECT_HASTE_HERB) {
      if (this.playerStatus.slowTurns > 0) {
        this.playerStatus.slowTurns = 0;
        this.playerStatus.slowSkipNextTurn = false;
        this.actionLog.add('PLAYER_SLOW_ENDED');
        return;
      }
      this.playerStatus.speedTurns = HASTE_TURN_COUNT;
      this.playerStatus.hasteExtraAction = false;
      this.actionLog.add('PLAYER_HASTED');
      return;
    }
    if (definition.useEffectId === ITEM_EFFECT_SLOW_HERB) {
      if (this.playerStatus.speedTurns > 0) {
        this.playerStatus.speedTurns = 0;
        this.playerStatus.hasteExtraAction = false;
        this.actionLog.add('PLAYER_HASTE_ENDED');
        return;
      }
      if (this.hasEquipEffect(ITEM_EQUIP_EFFECT_SLOW_IMMUNITY)) {
        return;
      }
      this.playerStatus.slowTurns = SLOW_TURN_COUNT;
      this.playerStatus.slowSkipNextTurn = true;
      this.actionLog.add('PLAYER_SLOWED');
      return;
    }
    if (
      definition.useEffectId === ITEM_EFFECT_SLEEP
      && this.playerStatus.sleepTurns === 0
      && !this.hasEquipEffect(ITEM_EQUIP_EFFECT_SLEEP_IMMUNITY)
    ) {
      this.playerStatus.sleepTurns = SLEEP_TURN_COUNT;
      this.heroSleepText.setVisible(true);
      this.actionLog.add('PLAYER_FELL_ASLEEP');
      return;
    }
    const maximumHitPointIncrease = {
      [ITEM_EFFECT_INCREASE_MAX_HIT_POINTS_BY_2]: 2,
      [ITEM_EFFECT_INCREASE_MAX_HIT_POINTS_BY_3]: 3,
    }[definition.useEffectId];
    if (maximumHitPointIncrease && wasAtMaximumHitPoints) {
      const amount = maximumHitPointIncrease;
      this.playerStatus.maxHitPoints += amount;
      this.playerStatus.hitPoints = Math.min(
        this.playerStatus.maxHitPoints,
        this.playerStatus.hitPoints + amount,
      );
      this.actionLog.add('ITEM_MAX_HP_INCREASE', { amount });
      return;
    }
    const maximumHungerIncrease = {
      [ITEM_EFFECT_INCREASE_MAX_HUNGER]: 1,
      [ITEM_EFFECT_INCREASE_MAX_HUNGER_BY_2]: 2,
      [ITEM_EFFECT_INCREASE_MAX_HUNGER_BY_3]: 3,
    }[definition.useEffectId];
    if (maximumHungerIncrease && wasAtMaximumHunger) {
      const amount = maximumHungerIncrease;
      this.playerStatus.maxHunger += amount;
      this.playerStatus.hunger = Math.min(
        this.playerStatus.maxHunger,
        this.playerStatus.hunger + amount,
      );
      this.actionLog.add('ITEM_MAX_HUNGER_INCREASE', { amount });
    }
  }

  useJumpPad(updatePresentation = true) {
    const currentRoom = this.getRoomAt(this.heroTileX, this.heroTileY);
    const destinations = this.dungeonRooms
      .filter((room) => room !== currentRoom)
      .flatMap((room) => {
        const tiles = [];
        for (let y = room.y; y < room.y + room.height; y += 1) {
          for (let x = room.x; x < room.x + room.width; x += 1) {
            if (!this.isTileOccupied(x, y) && !this.isStairTile(x, y)) {
              tiles.push({ x, y });
            }
          }
        }
        return tiles;
      });
    const destination = Phaser.Utils.Array.GetRandom(destinations);
    if (!destination) {
      return false;
    }
    this.playSfx('se-warp');
    this.dashDirection = null;
    this.heroTileX = destination.x;
    this.heroTileY = destination.y;
    this.setHeroEnteredRoom(this.getRoomAt(destination.x, destination.y));
    if (updatePresentation) {
      this.hero.setPosition((destination.x + 0.5) * TILE_SIZE, (destination.y + 1) * TILE_SIZE);
      this.updateHeroDepth(destination.y);
      this.updateVisibility();
    }
    return true;
  }

  throwPendingItem(direction) {
    const {
      item,
      definition,
      fromFloor,
      sleepGas,
      volticlet,
      directionalWarp,
    } = this.pendingThrow;
    this.pendingThrow = null;
    if (fromFloor ? this.getFloorItemAt(this.heroTileX, this.heroTileY) !== item : !this.playerStatus.inventory.includes(item)) {
      return;
    }
    if (directionalWarp) {
      this.playSfx('se-use');
      this.useDirectionalWarp(item, definition, direction);
      return;
    }
    if (sleepGas || volticlet) {
      this.playSfx('se-use');
    }
    this.playSfx('se-throw');
    if (!sleepGas && !volticlet) {
      this.removeInventoryOrFloorItem(item);
    }
    const throwResult = volticlet
      ? { destination: this.getVolticletDestination(direction), enemy: null }
      : this.getThrowDestination(direction);
    const { destination } = throwResult;
    this.selectedInventoryIndex = Math.min(this.selectedInventoryIndex, this.playerStatus.inventoryCapacity - 1);
    this.inventoryPage = Math.floor(this.selectedInventoryIndex / 10);
    this.actionLog.add('ITEM_ACTION', { item: definition.name, action: sleepGas || volticlet ? '撃った' : '投げた' });
    this.isHeroMoving = true;
    this.idleTween.stop();
    this.hero.setScale(HERO_SCALE);
    const iconKey = ITEM_ICON_KEYS[definition.category] || ITEM_ICON_KEYS[90];
    const thrownIcon = this.add.image(this.hero.x, this.hero.y - 40, iconKey)
      .setDisplaySize(40, 40)
      .setDepth(99);
    this.tweens.add({
      targets: thrownIcon,
      x: (destination.x + 0.5) * TILE_SIZE,
      y: (destination.y + 0.5) * TILE_SIZE,
      angle: 360,
      duration: 280,
      ease: 'Quad.easeOut',
      onComplete: () => {
        thrownIcon.destroy();
        if (sleepGas) {
          if (throwResult.enemy) {
            this.applySleepGas(throwResult.enemy);
          }
          if (this.consumeDeviceUse(item)) {
            this.removeInventoryOrFloorItem(item);
          }
        } else if (volticlet) {
          this.applyVolticlet(direction, definition);
          if (this.consumeDeviceUse(item)) {
            this.removeInventoryOrFloorItem(item);
          }
        } else if (
          throwResult.enemy
          && !this.evadesProjectile(throwResult.enemy)
          && this.isAttackHit(THROW_ACCURACY)
        ) {
          this.applyThrownItemToEnemy(item, definition, throwResult.enemy);
        } else if (throwResult.enemy) {
          this.playSfx('se-miss');
          const dropped = this.placeDroppedItem(item, throwResult.enemy.tileX, throwResult.enemy.tileY);
          this.actionLog.add('ITEM_THROW_MISS', {
            item: definition.name,
            enemy: this.getEnemyLogName(throwResult.enemy),
          });
          if (!dropped) {
            this.actionLog.add('ITEM_DISAPPEARED', { item: definition.name });
          }
        } else {
          this.playSfx('se-miss');
          const dropped = this.placeDroppedItem(item, destination.x, destination.y);
          if (!dropped) {
            this.actionLog.add('ITEM_DISAPPEARED', { item: definition.name });
          }
        }
        this.resolvePlayerTurn(false);
        const enemyTurn = this.resolveEnemyTurnAfterPlayerAction();
        this.playTurnAnimations(null, enemyTurn.movements, false, [], enemyTurn.attacks);
      },
    });
  }

  getVolticletDestination(direction) {
    let destination = { x: this.heroTileX, y: this.heroTileY };
    for (let distance = 1; distance <= 10; distance += 1) {
      const tileX = this.heroTileX + direction.x * distance;
      const tileY = this.heroTileY + direction.y * distance;
      if (!this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX])) {
        break;
      }
      destination = { x: tileX, y: tileY };
    }
    return destination;
  }

  getEquippedRangedWeapon() {
    return this.playerStatus.inventory.find((item) => (
      item.equipped === 10
      && this.itemDefinitions.get(item.id)?.category === 10
      && item.usesRemaining > 0
    ));
  }

  shootEquippedRangedWeapon(direction) {
    if (this.isHeroMoving || this.queuedMove || this.playerStatus.peaceTurns > 0) {
      if (this.playerStatus.peaceTurns > 0) {
        this.actionLog.add('PLAYER_PEACEFUL');
      }
      return false;
    }
    const weapon = this.getEquippedRangedWeapon();
    if (!weapon) {
      return false;
    }
    const definition = this.itemDefinitions.get(weapon.id);
    const shot = this.getRangedWeaponTarget(direction);
    this.playSfx('se-long-range-attack');
    this.actionLog.add('PLAYER_RANGED_WEAPON_FIRED', { item: definition.name });
    this.isHeroMoving = true;
    this.idleTween.stop();
    this.hero.setScale(HERO_SCALE);
    const playerAttack = shot.enemy
      ? this.playerAttack(shot.enemy, true)
      : {
        sprite: this.hero,
        ranged: true,
        targetX: (shot.destination.x + 0.5) * TILE_SIZE,
        targetY: (shot.destination.y + 0.5) * TILE_SIZE,
        onImpact: () => {
          this.playSfx('se-miss');
          this.actionLog.add('PLAYER_RANGED_NOTHING_HIT');
        },
      };
    weapon.usesRemaining -= 1;
    if (weapon.usesRemaining <= 0) {
      this.removeInventoryOrFloorItem(weapon);
      this.actionLog.add('ITEM_DEPLETED', { item: definition.name });
    }
    this.updateStatusUi();
    this.refreshInventoryUi();
    this.resolvePlayerTurn(false);
    const enemyTurn = this.resolveEnemyTurnAfterPlayerAction();
    this.playTurnAnimations(null, enemyTurn.movements, false, [playerAttack], enemyTurn.attacks);
    return true;
  }

  getRangedWeaponTarget(direction) {
    let destination = { x: this.heroTileX, y: this.heroTileY };
    for (let distance = 1; distance <= 10; distance += 1) {
      const tileX = this.heroTileX + direction.x * distance;
      const tileY = this.heroTileY + direction.y * distance;
      if (!this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX])) {
        break;
      }
      destination = { x: tileX, y: tileY };
      const enemy = this.getEnemyAt(tileX, tileY);
      if (enemy) {
        return { destination, enemy };
      }
    }
    return { destination, enemy: null };
  }

  useDirectionalWarp(item, definition, direction) {
    const destination = this.getDirectionalWarpDestination(direction);
    this.playSfx('se-warp');
    this.dashDirection = null;
    this.heroTileX = destination.x;
    this.heroTileY = destination.y;
    this.setHeroEnteredRoom(this.getRoomAt(destination.x, destination.y));
    this.hero.setPosition((destination.x + 0.5) * TILE_SIZE, (destination.y + 1) * TILE_SIZE);
    this.updateHeroDepth(destination.y);
    this.updateVisibility();
    this.actionLog.add('ITEM_ACTION', { item: definition.name, action: '使った' });
    if (this.consumeDeviceUse(item)) {
      this.removeInventoryOrFloorItem(item);
    }
    this.selectedInventoryIndex = Math.min(this.selectedInventoryIndex, this.playerStatus.inventoryCapacity - 1);
    this.inventoryPage = Math.floor(this.selectedInventoryIndex / 10);
    this.updateStatusUi();
    this.refreshInventoryUi();
    this.drawMinimapMarker();
    this.consumeItemTurn();
  }

  getDirectionalWarpDestination(direction) {
    let destination = { x: this.heroTileX, y: this.heroTileY };
    for (let distance = 1; ; distance += 1) {
      const tileX = this.heroTileX + direction.x * distance;
      const tileY = this.heroTileY + direction.y * distance;
      if (
        !this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX])
        || this.getEnemyAt(tileX, tileY)
      ) {
        break;
      }
      destination = { x: tileX, y: tileY };
    }
    return destination;
  }

  applyVolticlet(direction, definition) {
    const targets = [];
    for (let distance = 1; distance <= 10; distance += 1) {
      const tileX = this.heroTileX + direction.x * distance;
      const tileY = this.heroTileY + direction.y * distance;
      if (!this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX])) {
        break;
      }
      const enemy = this.getEnemyAt(tileX, tileY);
      if (enemy) {
        targets.push(enemy);
      }
    }
    targets.forEach((enemy) => {
      const damage = 50;
      this.wakeSpawnSleepingEnemy(enemy);
      this.applyEnemyDamage(enemy, damage);
      this.actionLog.add('ITEM_VOLTIC_DAMAGE', {
        item: definition.name,
        enemy: this.getEnemyLogName(enemy),
        damage,
      });
      this.warpEstersToDamagedEnemy(enemy);
      if (this.applyEnemySurvivalAbility(enemy) || enemy.hitPoints > 0) {
        return;
      }
      this.applyEnemyDefeatDrop(enemy);
      this.dropEnemyHeldItem(enemy);
      const levelsGained = this.playerStatus.gainExperience(enemy.experience);
      this.updateStatusUi();
      this.actionLog.add('ENEMY_DEFEATED', {
        enemy: this.getEnemyLogName(enemy),
        experience: enemy.experience,
      });
      levelsGained.forEach((level) => {
        this.playSfx('se-level-up');
        this.actionLog.add('LEVEL_UP', { level });
      });
      enemy.sprite.destroy();
      enemy.symbolOutline?.destroy();
      enemy.symbol?.destroy();
      enemy.jackieLevelText?.destroy();
      enemy.sleepText.destroy();
      enemy.confusionText.destroy();
      enemy.peaceText?.destroy();
      enemy.hasteText.destroy();
      enemy.slowText.destroy();
      enemy.paralysisText.destroy();
      this.enemies = this.enemies.filter((otherEnemy) => otherEnemy !== enemy);
    });
  }

  consumeItemTurn() {
    this.inventoryUi.setVisible(false);
    this.isHeroMoving = true;
    this.idleTween.stop();
    this.hero.setScale(HERO_SCALE);
    this.resolvePlayerTurn(false);
    const enemyTurn = this.resolveEnemyTurnAfterPlayerAction();
    this.playTurnAnimations(null, enemyTurn.movements, false, [], enemyTurn.attacks);
  }

  resolveEnemyTurnAfterPlayerAction() {
    if (this.playerStatus.speedTurns === 0) {
      return this.resolveEnemyTurn();
    }
    if (!this.playerStatus.hasteExtraAction) {
      this.playerStatus.hasteExtraAction = true;
      return { movements: [], attacks: [] };
    }
    this.playerStatus.hasteExtraAction = false;
    this.playerStatus.speedTurns -= 1;
    if (this.playerStatus.speedTurns === 0) {
      this.actionLog.add('PLAYER_HASTE_ENDED');
    }
    return this.resolveEnemyTurn();
  }

  waitTurn() {
    if (this.mapOverlay.visible || this.isHeroMoving || this.queuedMove || this.pendingThrow) {
      return;
    }
    this.consumeItemTurn();
  }

  forceBrainwashedAction() {
    this.playerStatus.brainwashed = false;
    this.mapOverlay.setVisible(false);
    this.inventoryUi.setVisible(false);
    this.closeInventoryMenu();
    const movementCandidates = MOVE_DIRECTIONS.filter((direction) => {
      const tileX = this.heroTileX + direction.x;
      const tileY = this.heroTileY + direction.y;
      return this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX])
        && this.canMoveDiagonally(direction.x, direction.y)
        && !this.getEnemyAt(tileX, tileY)
        && !this.isStairTile(tileX, tileY);
    });
    const items = this.playerStatus.inventory.filter((item) => this.itemDefinitions.has(item.id));
    if (this.playerStatus.peaceTurns > 0) {
      if (movementCandidates.length > 0) {
        const direction = Phaser.Utils.Array.GetRandom(movementCandidates);
        this.tryMoveHero(direction.x, direction.y, false);
      } else {
        this.consumeItemTurn();
      }
      return;
    }
    if (movementCandidates.length > 0 && (items.length === 0 || Math.random() < 0.5)) {
      const direction = Phaser.Utils.Array.GetRandom(movementCandidates);
      this.tryMoveHero(direction.x, direction.y, false);
      return;
    }
    const item = Phaser.Utils.Array.GetRandom(items);
    if (!item) {
      this.consumeItemTurn();
      return;
    }
    const definition = this.itemDefinitions.get(item.id);
    const action = Phaser.Utils.Array.GetRandom(
      this.getItemActions(item, definition, false).filter((candidate) => candidate !== '製作'),
    );
    if (
      action === '投げる'
      || (
        action === '使う'
        && (
          definition.useEffectId === ITEM_EFFECT_SLEEP_GAS
          || definition.useEffectId === ITEM_EFFECT_VOLTICLET
          || definition.useEffectId === ITEM_EFFECT_DIRECTIONAL_WARP
        )
      )
    ) {
      this.pendingThrow = {
        item,
        definition,
        fromFloor: false,
        sleepGas: definition.useEffectId === ITEM_EFFECT_SLEEP_GAS,
        volticlet: definition.useEffectId === ITEM_EFFECT_VOLTICLET,
        directionalWarp: definition.useEffectId === ITEM_EFFECT_DIRECTIONAL_WARP,
      };
      this.throwPendingItem(Phaser.Utils.Array.GetRandom(MOVE_DIRECTIONS));
      return;
    }
    this.selectedInventoryIndex = this.playerStatus.inventory.indexOf(item);
    this.inventoryMenuActions = [action];
    this.selectedInventoryMenuIndex = 0;
    this.executeInventoryAction();
  }

  isAttackHit(accuracy) {
    return Math.random() < accuracy;
  }

  evadesProjectile(enemy) {
    return enemy.specialAbilityId === ENEMY_SKILL_EVADE_PROJECTILES;
  }

  getThrowDestination(direction) {
    let destination = { x: this.heroTileX, y: this.heroTileY };
    for (let distance = 1; distance <= 10; distance += 1) {
      const tileX = this.heroTileX + direction.x * distance;
      const tileY = this.heroTileY + direction.y * distance;
      if (!this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX])) {
        break;
      }
      destination = { x: tileX, y: tileY };
      const enemy = this.getEnemyAt(tileX, tileY);
      if (enemy) {
        return { destination, enemy };
      }
    }
    return { destination, enemy: null };
  }

  applyThrownItemToEnemy(item, definition, enemy) {
    this.wakeSpawnSleepingEnemy(enemy);
    if (definition.category === 70) {
      this.applyItemEffectToEnemy(definition, enemy);
      return;
    }

    const damage = 5;
    this.playSfx('se-player-attack');
    this.applyEnemyDamage(enemy, damage);
    this.actionLog.add('ITEM_THROW_DAMAGE', {
      item: definition.name,
      enemy: this.getEnemyLogName(enemy),
      damage,
    });
    this.warpEstersToDamagedEnemy(enemy);
    if (this.applyEnemySurvivalAbility(enemy)) {
      return;
    }
    if (enemy.hitPoints > 0) {
      return;
    }
    this.applyEnemyDefeatDrop(enemy);
    this.dropEnemyHeldItem(enemy);
    const levelsGained = this.playerStatus.gainExperience(enemy.experience);
    this.updateStatusUi();
    this.actionLog.add('ENEMY_DEFEATED', {
      enemy: this.getEnemyLogName(enemy),
      experience: enemy.experience,
    });
    levelsGained.forEach((level) => {
      this.playSfx('se-level-up');
      this.actionLog.add('LEVEL_UP', { level });
    });
    enemy.sprite.destroy();
    enemy.symbolOutline?.destroy();
    enemy.symbol?.destroy();
    enemy.jackieLevelText?.destroy();
    enemy.sleepText.destroy();
    enemy.confusionText.destroy();
    enemy.peaceText?.destroy();
    enemy.hasteText.destroy();
    enemy.slowText.destroy();
    enemy.paralysisText.destroy();
    this.enemies = this.enemies.filter((otherEnemy) => otherEnemy !== enemy);
  }

  applyEnemySurvivalAbility(enemy) {
    if (
      enemy.hitPoints > 0
      || enemy.hasUsedSurvivalAbility
      || enemy.specialAbilityId !== ENEMY_SKILL_SURVIVE_LETHAL_DAMAGE
    ) {
      return false;
    }
    enemy.hitPoints = 1;
    enemy.hasUsedSurvivalAbility = true;
    this.actionLog.add('ENEMY_SURVIVED', { enemy: this.getEnemyLogName(enemy) });
    return true;
  }

  applySleepGas(target) {
    this.sleepAppliedEnemies = new Set();
    this.enemies.forEach((enemy) => {
      if (Math.max(Math.abs(enemy.tileX - target.tileX), Math.abs(enemy.tileY - target.tileY)) > 1) {
        return;
      }
      this.applySleepToEnemy(enemy);
    });
  }

  applyEnemyDefeatDrop(enemy) {
    if (
      [
        ENEMY_SKILL_ADRIANA_FIRE_PILLAR,
        ENEMY_SKILL_GOLD_ADRIANA_FIRE_PILLAR,
        ENEMY_SKILL_MITHRIL_ADRIANA_FIRE_PILLAR,
        ENEMY_SKILL_ETA_ADRIANA_FIRE_PILLAR,
      ].includes(enemy.specialAbilityId)
      && Math.random() < 0.3
    ) {
      const definition = this.itemDefinitions.get(9002);
      const dropped = this.placeDroppedItem({ id: 9002 }, enemy.tileX, enemy.tileY);
      if (dropped) {
        this.actionLog.add('ENEMY_DROP_ITEM', { enemy: this.getEnemyLogName(enemy), item: definition.name });
      } else {
        this.actionLog.add('ITEM_DISAPPEARED', { item: definition.name });
      }
      return;
    }
    if (
      [
        ENEMY_SKILL_KIARA_BRAND,
        ENEMY_SKILL_MITHRIL_KIARA_BRAND,
        ENEMY_SKILL_ETA_KIARA_BRAND,
      ].includes(enemy.specialAbilityId)
      && Math.random() < 0.5
    ) {
      this.placeKiaraCoffin(enemy);
      return;
    }
    if (
      [
        ENEMY_SKILL_ZAHIR_BRAINWASH,
        ENEMY_SKILL_GOLD_ZAHIR_BRAINWASH,
        ENEMY_SKILL_MITHRIL_ZAHIR_BRAINWASH,
        ENEMY_SKILL_ETA_ZAHIR_BRAINWASH,
      ].includes(enemy.specialAbilityId)
      && Math.random() < 0.5
    ) {
      this.placeKiaraCoffin(enemy);
      return;
    }
    if (enemy.specialAbilityId === ENEMY_SKILL_BIANCA_LIFE_STEAL && Math.random() < 0.5) {
      this.placeKiaraCoffin(enemy);
      return;
    }
    if (enemy.specialAbilityId === ENEMY_SKILL_JOHANN_REVIVE && Math.random() < 0.5) {
      this.placeKiaraCoffin(enemy);
      return;
    }
    if (enemy.specialAbilityId !== ENEMY_SKILL_DROP_FOOD) {
      return;
    }
    const itemId = Phaser.Utils.Array.GetRandom([4000, 4001, 4002, 4003]);
    const definition = this.itemDefinitions.get(itemId);
    if (!definition) {
      return;
    }
    const dropped = this.placeDroppedItem({ id: itemId }, enemy.tileX, enemy.tileY);
    this.actionLog.add('ENEMY_DROP_ITEM', { enemy: this.getEnemyLogName(enemy), item: definition.name });
    if (!dropped) {
      this.actionLog.add('ITEM_DISAPPEARED', { item: definition.name });
    }
  }

  applyItemEffectToEnemy(definition, enemy) {
    if (definition.useEffectId === ITEM_EFFECT_HASTE_HERB) {
      if (enemy.slowTurns > 0) {
        enemy.slowTurns = 0;
        enemy.slowSkipNextTurn = false;
        return;
      }
      this.applyHasteToEnemy(enemy);
      return;
    }
    if (definition.useEffectId === ITEM_EFFECT_SLOW_HERB) {
      if (enemy.speedTurns > 0) {
        enemy.speedTurns = 0;
        return;
      }
      enemy.slowTurns = SLOW_TURN_COUNT;
      enemy.slowSkipNextTurn = true;
      return;
    }
    if (definition.useEffectId === ITEM_EFFECT_FLYING_HERB) {
      const currentRoom = this.getRoomAt(enemy.tileX, enemy.tileY);
      const destinations = this.dungeonRooms
        .filter((room) => room !== currentRoom)
        .flatMap((room) => {
          const tiles = [];
          for (let y = room.y; y < room.y + room.height; y += 1) {
            for (let x = room.x; x < room.x + room.width; x += 1) {
              if (!this.isTileOccupied(x, y) && !this.isStairTile(x, y)) {
                tiles.push({ x, y });
              }
            }
          }
          return tiles;
        });
      const destination = Phaser.Utils.Array.GetRandom(destinations);
      if (!destination) {
        return;
      }
      enemy.tileX = destination.x;
      enemy.tileY = destination.y;
      this.playEnemyWarpSfx();
      enemy.sprite.setPosition((destination.x + 0.5) * TILE_SIZE, (destination.y + 1) * TILE_SIZE);
      this.updateCharacterDepth(enemy.sprite, destination.y);
      this.updateEnemySymbolDepth(enemy);
      this.updateVisibility();
      this.actionLog.add('ENEMY_WARPED', { enemy: this.getEnemyLogName(enemy) });
      return;
    }
    if (definition.useEffectId === ITEM_EFFECT_SLEEP) {
      this.applySleepToEnemy(enemy);
      return;
    }
    const hitPointsBefore = enemy.hitPoints;
    enemy.hitPoints = Math.min(enemy.maxHitPoints, enemy.hitPoints + definition.hitPoints);
    const recoveredHitPoints = enemy.hitPoints - hitPointsBefore;
    if (recoveredHitPoints > 0) {
      this.actionLog.add('ITEM_THROW_HEAL', {
        item: definition.name,
        enemy: this.getEnemyLogName(enemy),
        amount: recoveredHitPoints,
      });
    }
  }

  applySleepToEnemy(enemy) {
    if (enemy.status != null) {
      return false;
    }
    enemy.idleTween?.stop();
    enemy.status = 'sleep';
    enemy.sleepTurns = SLEEP_TURN_COUNT;
    enemy.sleepText.setVisible(true);
    this.sleepAppliedEnemies ||= new Set();
    this.sleepAppliedEnemies.add(enemy);
    if (this.getVisibleTiles(this.heroTileX, this.heroTileY).has(`${enemy.tileX},${enemy.tileY}`)) {
      this.actionLog.add('ENEMY_FELL_ASLEEP', { enemy: this.getEnemyLogName(enemy) });
    }
    return true;
  }

  consumeDeviceUse(item) {
    item.usesRemaining -= 1;
    return item.usesRemaining <= 0;
  }

  applyRoomConfusion() {
    const heroRoom = this.getRoomAt(this.heroTileX, this.heroTileY);
    this.confusionAppliedEnemies = new Set();
    this.enemies.forEach((enemy) => {
      const isTarget = heroRoom
        ? this.getRoomAt(enemy.tileX, enemy.tileY) === heroRoom
        : Math.max(Math.abs(enemy.tileX - this.heroTileX), Math.abs(enemy.tileY - this.heroTileY)) <= 1;
      if (!isTarget || enemy.confusionTurns > 0) {
        return;
      }
      enemy.confusionTurns = CONFUSION_TURN_COUNT;
      this.confusionAppliedEnemies.add(enemy);
      this.actionLog.add('ENEMY_CONFUSED', { enemy: this.getEnemyLogName(enemy) });
    });
  }

  applyRoomParalysis() {
    const heroRoom = this.getRoomAt(this.heroTileX, this.heroTileY);
    this.enemies.forEach((enemy) => {
      const isTarget = heroRoom
        ? this.getRoomAt(enemy.tileX, enemy.tileY) === heroRoom
        : Math.max(Math.abs(enemy.tileX - this.heroTileX), Math.abs(enemy.tileY - this.heroTileY)) <= 1;
      if (!isTarget || enemy.paralysisTurns > 0) {
        return;
      }
      enemy.paralysisTurns = PARALYSIS_TURN_COUNT;
      this.actionLog.add('ENEMY_PARALYZED', { enemy: this.getEnemyLogName(enemy) });
    });
  }

  placeFloorItem(item, tileX, tileY) {
    if (this.isStairTile(tileX, tileY)) {
      return this.placeDroppedItem(item, tileX, tileY);
    }
    if (item.kind === 'coffin') {
      const marker = this.add.graphics().setDepth(tileY + 0.5);
      const x = (tileX + 0.5) * TILE_SIZE;
      const y = (tileY + 0.5) * TILE_SIZE;
      marker.fillStyle(0x3c2417, 1);
      marker.fillRoundedRect(x - 18, y - 28, 36, 56, 5);
      marker.lineStyle(3, 0xd9b85a, 1);
      marker.strokeRoundedRect(x - 18, y - 28, 36, 56, 5);
      marker.lineBetween(x - 12, y - 4, x + 12, y - 4);
      marker.lineBetween(x, y - 16, x, y + 10);
      this.floorItems.push({ ...item, tileX, tileY, marker });
      return;
    }
    const definition = this.itemDefinitions.get(item.id);
    if (
      item.usesRemaining == null
      && (definition?.category === 10 || definition?.category === 50)
    ) {
      item.usesRemaining = Phaser.Math.Between(definition.useCountMinimum, definition.useCountMaximum);
    }
    const iconKey = ITEM_ICON_KEYS[definition?.category] || ITEM_ICON_KEYS[90];
    const marker = this.add.image(
      (tileX + 0.5) * TILE_SIZE,
      (tileY + 0.5) * TILE_SIZE,
      iconKey,
    ).setDisplaySize(40, 40).setDepth(tileY + 0.5);
    this.floorItems.push({ ...item, tileX, tileY, marker });
  }

  placeDroppedItem(item, tileX, tileY) {
    if (!this.hasStaticObjectAt(tileX, tileY)) {
      this.placeFloorItem(item, tileX, tileY);
      return true;
    }
    const nearbyTile = this.findOpenDropTile(tileX, tileY, 1)
      || this.findOpenDropTile(tileX, tileY, 2);
    if (!nearbyTile) {
      return false;
    }
    this.placeFloorItem(item, nearbyTile.x, nearbyTile.y);
    return true;
  }

  findOpenDropTile(tileX, tileY, radius) {
    const candidates = [];
    for (let y = tileY - radius; y <= tileY + radius; y += 1) {
      for (let x = tileX - radius; x <= tileX + radius; x += 1) {
        if (
          (x !== tileX || y !== tileY)
          && this.isWalkableTile(this.dungeonTiles[y]?.[x])
          && !this.hasStaticObjectAt(x, y)
        ) {
          candidates.push({ x, y });
        }
      }
    }
    return Phaser.Utils.Array.GetRandom(candidates) || null;
  }

  getFloorItemAt(tileX, tileY) {
    return this.floorItems.find((item) => item.tileX === tileX && item.tileY === tileY);
  }

  getTrapAt(tileX, tileY) {
    return this.traps.find((trap) => trap.tileX === tileX && trap.tileY === tileY);
  }

  hasStaticObjectAt(tileX, tileY) {
    return this.getFloorItemAt(tileX, tileY)
      || this.isStairTile(tileX, tileY)
      || this.firePillars.some((pillar) => pillar.tileX === tileX && pillar.tileY === tileY)
      || this.getTrapAt(tileX, tileY);
  }

  placeSpringTrap(tileX, tileY) {
    return this.placeTrap('spring', tileX, tileY, 'WanaSpring', TILE_SIZE / 2);
  }

  placeMineTrap(tileX, tileY) {
    return this.placeTrap('mine', tileX, tileY, 'WanaMine', TILE_SIZE / 2);
  }

  placeTrap(kind, tileX, tileY, textureKey, size) {
    let position = { x: tileX, y: tileY };
    if (!this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX]) || this.hasStaticObjectAt(tileX, tileY)) {
      position = this.findOpenDropTile(tileX, tileY, 1) || this.findOpenDropTile(tileX, tileY, 2);
    }
    if (!position) {
      return false;
    }
    const marker = this.add.image(
      (position.x + 0.5) * TILE_SIZE,
      (position.y + 0.5) * TILE_SIZE,
      textureKey,
    ).setDisplaySize(size, size).setDepth(position.y + 0.5).setVisible(false);
    this.traps.push({ tileX: position.x, tileY: position.y, kind, marker });
    return true;
  }

  activateSpringTrapAtHero(deferPresentation = false) {
    const trap = this.getTrapAt(this.heroTileX, this.heroTileY);
    if (trap?.kind !== 'spring') {
      return false;
    }
    if (this.playerStatus.trapAvoidance) {
      this.actionLog.add('TRAP_AVOIDED');
      return false;
    }
    this.springTrapWarpPending = deferPresentation;
    this.applyItemUseEffect(
      { useEffectId: ITEM_EFFECT_FLYING_HERB },
      false,
      false,
      { deferPresentation },
    );
    trap.marker.destroy();
    this.traps = this.traps.filter((otherTrap) => otherTrap !== trap);
    this.actionLog.add('SPRING_TRAP_TRIGGERED');
    return true;
  }

  activateMineTrapAtHero() {
    const trap = this.getTrapAt(this.heroTileX, this.heroTileY);
    if (trap?.kind !== 'mine') {
      return false;
    }
    if (this.playerStatus.trapAvoidance) {
      this.actionLog.add('TRAP_AVOIDED');
      return false;
    }
    const effect = this.add.graphics().setDepth(FOG_DEPTH - 1);
    effect.fillStyle(0xff6b00, 0.62);
    effect.fillCircle(0, 0, TILE_SIZE * 2);
    effect.lineStyle(8, 0xffa000, 1);
    effect.strokeCircle(0, 0, TILE_SIZE * 2 * 0.72);
    effect.setPosition(
      (trap.tileX + 0.5) * TILE_SIZE,
      (trap.tileY + 0.5) * TILE_SIZE,
    ).setScale(0.2);
    this.tweens.add({
      targets: effect,
      scale: 1,
      alpha: 0,
      duration: 300,
      ease: 'Quad.easeOut',
      onComplete: () => effect.destroy(),
    });
    const damage = this.getExplosionDamage(Math.ceil(this.playerStatus.hitPoints * 0.5));
    this.playSfx('se-bomb');
    this.applyHeroDamage(damage, '地雷');
    this.dashDirection = null;
    [...this.enemies].filter((enemy) => (
      Math.max(Math.abs(enemy.tileX - trap.tileX), Math.abs(enemy.tileY - trap.tileY)) <= 1
    )).forEach((enemy) => this.removeEnemyWithoutDrop(enemy));
    this.floorItems.filter((item) => (
      item.kind !== 'coffin'
      && Math.max(Math.abs(item.tileX - trap.tileX), Math.abs(item.tileY - trap.tileY)) <= 1
    )).forEach((item) => this.removeInventoryOrFloorItem(item));
    trap.marker.destroy();
    this.traps = this.traps.filter((otherTrap) => otherTrap !== trap);
    this.updateStatusUi();
    this.actionLog.add('MINE_TRAP_TRIGGERED', { damage });
    return true;
  }

  applyHeroDamage(damage, cause = 'ダメージ') {
    const holyRobeReducesDamage = damage > 0
      && this.playerStatus.hunger >= 5
      && this.hasEquipEffect(ITEM_EQUIP_EFFECT_HOLY_ROBE);
    if (holyRobeReducesDamage) {
      this.playerStatus.hunger -= 5;
      damage = Math.ceil(damage * 0.5);
      this.updateStatusUi();
    }
    const actualDamage = Math.min(this.playerStatus.hitPoints, damage);
    this.playerStatus.hitPoints = Math.max(0, this.playerStatus.hitPoints - damage);
    if (actualDamage > 0 && this.playerStatus.paralysisTurns > 0) {
      this.playerStatus.paralysisTurns = 0;
      this.heroParalysisText.setVisible(false);
      this.actionLog.add('PLAYER_PARALYSIS_ENDED');
    }
    if (actualDamage > 0 && this.playerStatus.hitPoints === 0 && !this.reviveWithRegenerationBracelet()) {
      this.showResult(cause);
    }
    return damage;
  }

  showResult(cause, succeeded = false) {
    if (this.isGameOver) {
      return;
    }
    this.isGameOver = true;
    if (!succeeded) {
      this.idleTween?.stop();
      this.tweens.killTweensOf(this.hero);
      this.hero
        .setOrigin(0.5)
        .setPosition(
          (this.heroTileX + 0.5) * TILE_SIZE,
          (this.heroTileY + 0.5) * TILE_SIZE,
        )
        .setAngle(90);
      this.time.delayedCall(0, () => this.actionLog.add('PLAYER_DEFEATED'));
    }
    const equipmentCategories = [
      { category: 0, label: '武器' },
      { category: 10, label: '遠距離武器' },
      { category: 20, label: '防具' },
      { category: 30, label: '装飾' },
    ];
    const equipment = equipmentCategories.map(({ category, label }) => {
      const item = this.playerStatus.inventory.find((inventoryItem) => inventoryItem.equipped === category);
      const name = item ? this.itemDefinitions.get(item.id)?.name ?? 'なし' : 'なし';
      return `${label}: ${name}`;
    });
    const result = {
      cause,
      succeeded,
      status: {
        floor: this.playerStatus.floor,
        hitPoints: this.playerStatus.hitPoints,
        maxHitPoints: this.playerStatus.maxHitPoints,
        hunger: this.playerStatus.hunger,
        maxHunger: this.playerStatus.maxHunger,
        attack: this.playerStatus.attack,
        defense: this.playerStatus.defense,
        level: this.playerStatus.level,
      },
      equipment,
    };
    if (succeeded) {
      this.scene.start('ResultScene', result);
    } else {
      this.time.delayedCall(1000, () => this.scene.start('ResultScene', result));
    }
  }

  getRangedDamage(baseDamage) {
    if (this.hasEquipEffect(ITEM_EQUIP_EFFECT_GREATER_RANGED_DAMAGE_REDUCTION)) {
      return Math.ceil(baseDamage * 0.25);
    }
    if (this.hasEquipEffect(ITEM_EQUIP_EFFECT_RANGED_DAMAGE_REDUCTION)) {
      return Math.ceil(baseDamage * 0.5);
    }
    return baseDamage;
  }

  getExplosionDamage(baseDamage) {
    return this.hasEquipEffect(ITEM_EQUIP_EFFECT_EXPLOSIVE_DAMAGE_REDUCTION)
      ? Math.ceil(baseDamage * 0.5)
      : baseDamage;
  }

  reviveWithRegenerationBracelet() {
    const bracelet = this.playerStatus.inventory.find((item) => (
      item.equipped != null
      && this.itemDefinitions.get(item.id)?.equipEffectId === ITEM_EQUIP_EFFECT_REVIVE
      && this.itemEquipEffectDefinitions.has(ITEM_EQUIP_EFFECT_REVIVE)
    ));
    if (!bracelet) {
      return false;
    }
    this.playerStatus.hitPoints = this.playerStatus.maxHitPoints;
    this.playerStatus.hunger = this.playerStatus.maxHunger;
    this.playerStatus.sleepTurns = 0;
    this.playerStatus.confusionTurns = 0;
    this.playerStatus.confusionJustEnded = false;
    this.playerStatus.speedTurns = 0;
    this.playerStatus.hasteExtraAction = false;
    this.playerStatus.slowTurns = 0;
    this.playerStatus.slowSkipNextTurn = false;
    this.playerStatus.paralysisTurns = 0;
    this.playerStatus.brandTurns = 0;
    this.playerStatus.brainwashed = false;
    this.playerStatus.peaceTurns = 0;
    this.playerStatus.trapAvoidance = false;
    this.removeInventoryOrFloorItem(bracelet);
    this.updateStatusUi();
    this.refreshInventoryUi();
    this.time.delayedCall(0, () => this.actionLog.add('PLAYER_REVIVED'));
    return true;
  }

  applyEnemyDamage(enemy, damage) {
    const actualDamage = Math.min(enemy.hitPoints, damage);
    enemy.hitPoints -= damage;
    if (actualDamage > 0 && enemy.paralysisTurns > 0) {
      enemy.paralysisTurns = 0;
      enemy.paralysisText.setVisible(false);
      this.actionLog.add('ENEMY_PARALYSIS_ENDED', { enemy: this.getEnemyLogName(enemy) });
    }
  }

  removeEnemyWithoutDrop(enemy) {
    enemy.idleTween?.stop();
    enemy.sprite.destroy();
    enemy.symbolOutline?.destroy();
    enemy.symbol?.destroy();
    enemy.jackieLevelText?.destroy();
    enemy.sleepText.destroy();
    enemy.confusionText.destroy();
    enemy.peaceText?.destroy();
    enemy.hasteText.destroy();
    enemy.slowText.destroy();
    enemy.paralysisText.destroy();
    this.enemies = this.enemies.filter((otherEnemy) => otherEnemy !== enemy);
  }

  placeKiaraCoffin(enemy) {
    this.placeDroppedItem({
      kind: 'coffin',
      ownerId: enemy.id,
      ownerName: this.getEnemyLogName(enemy),
    }, enemy.tileX, enemy.tileY);
  }

  isStairTile(tileX, tileY) {
    return this.stairs?.x === tileX && this.stairs?.y === tileY;
  }

  isHeroOnStairs() {
    return this.isStairTile(this.heroTileX, this.heroTileY);
  }

  pickupFloorItem(consumesTurn = true) {
    const item = this.getFloorItemAt(this.heroTileX, this.heroTileY);
    if (!item) {
      return;
    }
    if (item.kind === 'coffin') {
      this.actionLog.add('COFFIN_RIDDEN', { enemy: item.ownerName });
      return;
    }
    const definition = this.itemDefinitions.get(item.id);
    if (!definition) {
      return;
    }
    if (!this.playerStatus.addItem(item.id, 1, this.itemDefinitions, item)) {
      this.actionLog.add(consumesTurn ? 'ITEM_PICKUP_FULL' : 'ITEM_STEPPED_ON', {
        item: definition?.name ?? 'アイテム',
      });
      return;
    }
    item.marker.destroy();
    this.floorItems = this.floorItems.filter((floorItem) => floorItem !== item);
    this.playSfx('se-get');
    this.actionLog.add('ITEM_PICKUP', { item: definition?.name ?? 'アイテム' });
    if (consumesTurn) {
      this.consumeItemTurn();
    }
  }

  moveInventorySelection(code) {
    const movesUp = code === 'ArrowUp';
    const movesDown = code === 'ArrowDown';
    const changesPage = code === 'ArrowLeft' || code === 'ArrowRight';
    if (changesPage) {
      const pageCount = this.getFloorItemAt(this.heroTileX, this.heroTileY) ? 3 : 2;
      this.inventoryPage = (this.inventoryPage + (code === 'ArrowRight' ? 1 : pageCount - 1)) % pageCount;
      this.selectedInventoryIndex = this.inventoryPage === 2
        ? 20
        : this.inventoryPage * 10 + (this.selectedInventoryIndex % 10);
    } else if (this.inventoryPage === 2) {
      this.selectedInventoryIndex = 20;
    } else if (movesUp) {
      this.selectedInventoryIndex = this.selectedInventoryIndex % 10 === 0
        ? this.inventoryPage * 10 + 9
        : this.selectedInventoryIndex - 1;
    } else if (movesDown) {
      this.selectedInventoryIndex = this.selectedInventoryIndex % 10 === 9
        ? this.inventoryPage * 10
        : this.selectedInventoryIndex + 1;
    }
    this.inventoryPage = Math.floor(this.selectedInventoryIndex / 10);
    this.refreshInventoryUi();
  }

  getSelectedInventoryItem() {
    if (this.inventoryPage === 2 && this.selectedInventoryIndex === 20) {
      return this.getFloorItemAt(this.heroTileX, this.heroTileY);
    }
    return this.playerStatus.inventory[this.selectedInventoryIndex];
  }

  isFloorItemSelected() {
    return this.inventoryPage === 2 && this.selectedInventoryIndex === 20;
  }

  isInventoryOrFloorItem(item) {
    return this.playerStatus.inventory.includes(item) || this.floorItems.includes(item);
  }

  removeInventoryOrFloorItem(item) {
    const inventoryIndex = this.playerStatus.inventory.indexOf(item);
    if (inventoryIndex >= 0) {
      this.playerStatus.inventory.splice(inventoryIndex, 1);
      this.playerStatus.updateEquipmentStats();
      return;
    }
    const floorItemIndex = this.floorItems.indexOf(item);
    if (floorItemIndex >= 0) {
      item.marker.destroy();
      this.floorItems.splice(floorItemIndex, 1);
    }
  }

  revealMinimapTiles(visibleTiles) {
    this.minimapUi?.reveal(visibleTiles);
  }

  drawMinimapMarker() {
    this.minimapUi?.drawMarker();
  }

  startIdleMotion() {
    this.hero.setScale(HERO_SCALE);
    this.idleTween = this.tweens.add({
      targets: this.hero,
      scaleY: HERO_SCALE * 1.04,
      duration: 700,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });
  }

  startEnemyIdleMotion(enemy) {
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.idleTween = this.tweens.add({
      targets: enemy.sprite,
      scaleY: ENEMY_SCALE * 1.04,
      duration: 700,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });
  }

  isHeroDirectionObvious() {
    const direction = this.heroMovementDirection;
    if (!direction || (direction.x !== 0 && direction.y !== 0)) {
      return false;
    }
    if (this.dungeonTiles[this.heroTileY]?.[this.heroTileX] !== CORRIDOR_TILE) {
      return false;
    }
    return this.dungeonTiles[this.heroTileY + direction.y]?.[this.heroTileX + direction.x]
      === CORRIDOR_TILE;
  }

  isMoveKey(code) {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code);
  }

  getMovementDirection() {
    const movingUp = this.moveKeys.UP.isDown;
    const movingDown = this.moveKeys.DOWN.isDown;
    const movingLeft = this.moveKeys.LEFT.isDown;
    const movingRight = this.moveKeys.RIGHT.isDown;

    return {
      x: Number(movingRight) - Number(movingLeft),
      y: Number(movingDown) - Number(movingUp),
    };
  }

  getDirectionForKey(code) {
    const directions = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };
    return directions[code];
  }

  queueThrowDirection(direction) {
    if (this.queuedThrowDirection) {
      this.queuedThrowVector = {
        x: Phaser.Math.Clamp(this.queuedThrowVector.x + direction.x, -1, 1),
        y: Phaser.Math.Clamp(this.queuedThrowVector.y + direction.y, -1, 1),
      };
      return;
    }
    this.queuedThrowVector = direction;
    this.queuedThrowDirection = this.time.delayedCall(MOVE_INPUT_GRACE_MS, () => {
      this.queuedThrowDirection = null;
      const heldDirection = this.getMovementDirection();
      const directionToThrow = heldDirection.x !== 0 || heldDirection.y !== 0
        ? heldDirection
        : this.queuedThrowVector;
      this.queuedThrowVector = null;
      this.throwPendingItem(directionToThrow);
    });
  }

  queueRangedAttackDirection(direction) {
    if (this.queuedRangedAttackDirection) {
      this.queuedRangedAttackVector = {
        x: Phaser.Math.Clamp(this.queuedRangedAttackVector.x + direction.x, -1, 1),
        y: Phaser.Math.Clamp(this.queuedRangedAttackVector.y + direction.y, -1, 1),
      };
      return true;
    }
    if (!this.getEquippedRangedWeapon()) {
      return false;
    }
    this.queuedRangedAttackVector = direction;
    this.queuedRangedAttackDirection = this.time.delayedCall(MOVE_INPUT_GRACE_MS, () => {
      this.queuedRangedAttackDirection = null;
      const heldDirection = this.getMovementDirection();
      const directionToShoot = heldDirection.x !== 0 || heldDirection.y !== 0
        ? heldDirection
        : this.queuedRangedAttackVector;
      this.queuedRangedAttackVector = null;
      this.shootEquippedRangedWeapon(directionToShoot);
    });
    return true;
  }

  startDash(direction) {
    this.dashDirection = direction;
    this.queueMove(MOVE_INPUT_GRACE_MS, false, direction, true);
  }

  queueMove(
    delay,
    allowAttack = true,
    direction = null,
    isDashing = false,
    useQueuedDirection = false,
    consumesBlockedMove = false,
  ) {
    if (this.queuedMove && direction) {
      this.queuedMoveDirection = {
        x: Phaser.Math.Clamp(this.queuedMoveDirection.x + direction.x, -1, 1),
        y: Phaser.Math.Clamp(this.queuedMoveDirection.y + direction.y, -1, 1),
      };
      return;
    }
    if (this.mapOverlay.visible || this.inventoryUi.visible || this.isHeroMoving || this.queuedMove) {
      return;
    }

    this.queuedMoveDirection = direction || { x: 0, y: 0 };
    this.queuedMove = this.time.delayedCall(delay, () => {
      this.queuedMove = null;
      const heldDirection = this.getMovementDirection();
      const movementDirection = !useQueuedDirection && (heldDirection.x !== 0 || heldDirection.y !== 0)
        ? heldDirection
        : this.queuedMoveDirection;
      this.queuedMoveDirection = null;
      if (isDashing) {
        this.dashDirection = movementDirection;
      }
      this.tryMoveHero(movementDirection.x, movementDirection.y, allowAttack, consumesBlockedMove);
    });
  }

  cancelQueuedMove() {
    if (this.queuedMove) {
      this.queuedMove.remove(false);
      this.queuedMove = null;
    }
    this.queuedMoveDirection = null;
    this.dashDirection = null;
  }

  tryMoveHero(offsetX, offsetY, allowAttack = true, consumesBlockedMove = false) {
    if (this.mapOverlay.visible || this.inventoryUi.visible || this.isHeroMoving || (offsetX === 0 && offsetY === 0)) {
      return;
    }

    const nextX = this.heroTileX + offsetX;
    const nextY = this.heroTileY + offsetY;
    const destination = this.dungeonTiles[nextY]?.[nextX];
    const enemy = this.getEnemyAt(nextX, nextY);
    const currentRoom = this.getRoomAt(this.heroTileX, this.heroTileY);
    const nextRoom = this.getRoomAt(nextX, nextY);
    const isDashing = this.dashDirection != null;

    if (
      destination === 0
      && !isDashing
      && (offsetX === 0 || offsetY === 0)
      && (this.hasEquipEffect(ITEM_EQUIP_EFFECT_DIG_WALL) || this.hasEquipEffect(ITEM_EQUIP_EFFECT_GOLDEN_DIG_WALL))
    ) {
      this.dungeonTiles[nextY][nextX] = CORRIDOR_TILE;
      this.playSfx('se-kabehori');
      this.dungeonRenderer.refreshTiles([{ x: nextX, y: nextY }]);
      this.corridorTiles = this.getCorridorTiles();
      this.minimapUi.refreshTiles([{ x: nextX, y: nextY }]);
      this.updateVisibility();
      this.dashDirection = null;
      this.actionLog.add('PICKAXE_DUG');
      const pickaxe = this.playerStatus.inventory.find((item) => (
        item.equipped != null
        && PICKAXE_BREAK_CHANCES[this.itemDefinitions.get(item.id)?.equipEffectId] != null
      ));
      const breakChance = PICKAXE_BREAK_CHANCES[this.itemDefinitions.get(pickaxe?.id)?.equipEffectId] ?? 0;
      if (pickaxe && Math.random() < breakChance) {
        const definition = this.itemDefinitions.get(pickaxe.id);
        this.removeInventoryOrFloorItem(pickaxe);
        this.updateStatusUi();
        this.actionLog.add('ITEM_DISAPPEARED', { item: definition.name });
      }
      this.isHeroMoving = true;
      this.idleTween.stop();
      this.hero.setScale(HERO_SCALE);
      this.resolvePlayerTurn(false);
      const enemyTurn = this.resolveEnemyTurnAfterPlayerAction();
      this.playTurnAnimations(null, enemyTurn.movements, false, [], enemyTurn.attacks);
      return;
    }

    if (!this.isWalkableTile(destination) || !this.canMoveDiagonally(offsetX, offsetY)) {
      this.dashDirection = null;
      if (consumesBlockedMove) {
        this.isHeroMoving = true;
        this.idleTween.stop();
        this.hero.setScale(HERO_SCALE);
        this.resolvePlayerTurn(false);
        const enemyTurn = this.resolveEnemyTurnAfterPlayerAction();
        this.playTurnAnimations(null, enemyTurn.movements, false, [], enemyTurn.attacks);
      }
      return;
    }

    if (currentRoom && !nextRoom && this.warpHeroFromNia(currentRoom)) {
      return;
    }

    if (enemy) {
      this.dashDirection = null;
      if (enemy.disguised) {
        this.revealEmma(enemy);
        this.isHeroMoving = true;
        this.idleTween.stop();
        this.hero.setScale(HERO_SCALE);
        this.resolvePlayerTurn(false);
        const enemyTurn = this.resolveEnemyTurnAfterPlayerAction();
        this.playTurnAnimations(null, enemyTurn.movements, false, [], enemyTurn.attacks);
        return;
      }
      if (!allowAttack || this.playerStatus.peaceTurns > 0) {
        if (this.playerStatus.peaceTurns > 0) {
          this.actionLog.add('PLAYER_PEACEFUL');
        }
        return;
      }
      this.isHeroMoving = true;
      this.idleTween.stop();
      this.hero.setScale(HERO_SCALE);
      const playerAttacks = [this.playerAttack(enemy)];
      if (
        this.hasEquipEffect(ITEM_EQUIP_EFFECT_DOUBLE_ATTACK)
        && enemy.hitPoints > 0
        && Math.random() < WINDRUNNER_DOUBLE_ATTACK_CHANCE
      ) {
        playerAttacks.push(this.playerAttack(enemy));
      }
      this.resolvePlayerTurn(false);
      const enemyTurn = this.resolveEnemyTurnAfterPlayerAction();
      this.playTurnAnimations(null, enemyTurn.movements, false, playerAttacks, enemyTurn.attacks);
      return;
    }

    this.isHeroMoving = true;
    this.idleTween.stop();
    this.hero.setScale(HERO_SCALE);
    this.heroMovementDirection = { x: offsetX, y: offsetY };
    this.setHeroEnteredRoom(nextRoom && nextRoom !== currentRoom ? nextRoom : null);
    this.heroTileX = nextX;
    this.heroTileY = nextY;
    this.updateHeroDepth(nextY);
    this.enemies.forEach((otherEnemy) => this.updateEnemySymbolDepth(otherEnemy));
    const springTrapActivated = this.activateSpringTrapAtHero(true);
    this.activateMineTrapAtHero();
    const dashStopsAtItem = this.dashDirection && this.getFloorItemAt(this.heroTileX, this.heroTileY);
    const enteredStairs = this.isHeroOnStairs();
    const dashStopsAtAreaTransition = isDashing && nextRoom !== currentRoom;
    const dashStopsAtCorridorContact = isDashing
      && nextRoom
      && MOVE_DIRECTIONS.some((direction) => (
        this.dungeonTiles[nextY + direction.y]?.[nextX + direction.x] === CORRIDOR_TILE
      ));
    const dashStopsAtCorridorBranch = isDashing && !nextRoom && this.hasCorridorBranch(nextX, nextY);
    if (
      dashStopsAtItem
      || dashStopsAtAreaTransition
      || dashStopsAtCorridorContact
      || dashStopsAtCorridorBranch
      || enteredStairs
    ) {
      this.dashDirection = null;
      if (dashStopsAtItem) {
        if (dashStopsAtItem.kind === 'coffin') {
          this.actionLog.add('COFFIN_RIDDEN', { enemy: dashStopsAtItem.ownerName });
        } else {
          const definition = this.itemDefinitions.get(dashStopsAtItem.id);
          this.actionLog.add('ITEM_STEPPED_ON', { item: definition?.name ?? 'アイテム' });
        }
      }
    } else {
      this.pickupFloorItem(false);
    }
    this.resolvePlayerTurn(true);
    if (enteredStairs) {
      this.openStairMenuAfterTurn = true;
    }
    const enemyTurn = this.resolveEnemyTurnAfterPlayerAction();
    this.playTurnAnimations(
      {
        x: (nextX + 0.5) * TILE_SIZE,
        y: (nextY + 1) * TILE_SIZE,
        duration: isDashing ? 60 : 120,
        onComplete: springTrapActivated ? () => {
          this.hero.setPosition(
            (this.heroTileX + 0.5) * TILE_SIZE,
            (this.heroTileY + 1) * TILE_SIZE,
          );
          this.updateHeroDepth(this.heroTileY);
          this.springTrapWarpPending = false;
          this.updateVisibility();
        } : undefined,
      },
      enemyTurn.movements,
      !isDashing,
      [],
      enemyTurn.attacks,
    );
  }

  warpHeroFromNia(room) {
    const nia = this.enemies.find((enemy) => (
      enemy.specialAbilityId === ENEMY_SKILL_PREVENT_ROOM_EXIT
      && enemy.status !== 'spawn-sleep'
      && this.getRoomAt(enemy.tileX, enemy.tileY) === room
    ));
    if (!nia) {
      return false;
    }
    const candidates = [];
    for (let y = room.y; y < room.y + room.height; y += 1) {
      for (let x = room.x; x < room.x + room.width; x += 1) {
        if (!this.isTileOccupied(x, y) && !this.isStairTile(x, y)) {
          candidates.push({ x, y });
        }
      }
    }
    const destination = Phaser.Utils.Array.GetRandom(candidates);
    if (!destination) {
      return false;
    }
    this.playSfx('se-warp');
    this.dashDirection = null;
    this.isHeroMoving = true;
    this.idleTween.stop();
    this.hero.setScale(HERO_SCALE);
    this.heroTileX = destination.x;
    this.heroTileY = destination.y;
    this.updateHeroDepth(destination.y);
    this.enemies.forEach((enemy) => this.updateEnemySymbolDepth(enemy));
    this.actionLog.add('ENEMY_NIA_PREVENTED_EXIT', { enemy: this.getEnemyLogName(nia) });
    this.resolvePlayerTurn(false);
    const enemyTurn = this.resolveEnemyTurnAfterPlayerAction();
    this.playTurnAnimations(
      { x: (destination.x + 0.5) * TILE_SIZE, y: (destination.y + 1) * TILE_SIZE },
      enemyTurn.movements,
      false,
      [],
      enemyTurn.attacks,
    );
    return true;
  }

  resolvePlayerTurn(moved, forcedSlowTurn = false) {
    this.floorTurn += 1;
    this.activateIsaacHayesInvasion();
    if (moved && !this.playerStatus.trapAvoidance) {
      this.activateSpringTrapAtHero();
    }
    this.playerStatus.confusionJustEnded = false;
    const wasBranded = this.playerStatus.brandTurns > 0;
    this.playerStatus.advanceTurn(moved);
    if (this.playerStatus.hitPoints === 0) {
      this.showResult('空腹');
      return;
    }
    if (wasBranded && this.playerStatus.brandTurns === 0) {
      this.actionLog.add('PLAYER_BRAND_ENDED');
    }
    if (this.playerStatus.confusionTurns > 0) {
      this.playerStatus.confusionTurns -= 1;
      if (this.playerStatus.confusionTurns === 0) {
        this.playerStatus.confusionJustEnded = true;
        this.actionLog.add('CONFUSION_ENDED', { target: 'プレイヤー' });
      }
    }
    if (this.playerStatus.peaceTurns > 0) {
      this.playerStatus.peaceTurns -= 1;
      if (this.playerStatus.peaceTurns === 0) {
        this.actionLog.add('PLAYER_PEACE_ENDED');
      }
    }
    if (this.playerStatus.slowTurns > 0) {
      this.playerStatus.slowTurns -= 1;
      this.playerStatus.slowSkipNextTurn = !forcedSlowTurn && this.playerStatus.slowTurns > 0;
      if (this.playerStatus.slowTurns === 0) {
        this.playerStatus.slowSkipNextTurn = false;
        this.actionLog.add('PLAYER_SLOW_ENDED');
      }
    }
    if (this.playerStatus.paralysisTurns > 0) {
      this.playerStatus.paralysisTurns -= 1;
      if (this.playerStatus.paralysisTurns === 0) {
        this.heroParalysisText.setVisible(false);
        this.actionLog.add('PLAYER_PARALYSIS_ENDED');
      }
    }
    this.updateStatusUi();
  }

  consumeSleepTurn() {
    this.playerStatus.sleepTurns -= 1;
    if (this.playerStatus.sleepTurns <= 0) {
      this.playerStatus.sleepTurns = 0;
      this.wakePlayer();
      return;
    }
    this.resolvePlayerTurn(false);
    const enemyTurn = this.resolveEnemyTurn();
    this.isHeroMoving = true;
    this.idleTween.stop();
    this.hero.setScale(HERO_SCALE);
    this.playTurnAnimations(null, enemyTurn.movements, false, [], enemyTurn.attacks);
  }

  queueSleepTurn() {
    if (this.sleepTurnTimer) {
      return;
    }
    this.sleepTurnTimer = this.time.delayedCall(400, () => {
      this.sleepTurnTimer = null;
      if (this.playerStatus.sleepTurns > 0 && !this.isHeroMoving) {
        this.consumeSleepTurn();
      }
    });
  }

  consumeParalysisTurn() {
    this.resolvePlayerTurn(false, true);
    const enemyTurn = this.resolveEnemyTurn();
    this.isHeroMoving = true;
    this.idleTween.stop();
    this.hero.setScale(HERO_SCALE);
    this.playTurnAnimations(null, enemyTurn.movements, false, [], enemyTurn.attacks);
  }

  queueParalysisTurn() {
    if (this.paralysisTurnTimer) {
      return;
    }
    this.paralysisTurnTimer = this.time.delayedCall(400, () => {
      this.paralysisTurnTimer = null;
      if (this.playerStatus.paralysisTurns > 0 && !this.isHeroMoving) {
        this.consumeParalysisTurn();
      }
    });
  }

  consumeSlowTurn() {
    this.resolvePlayerTurn(false, true);
    const enemyTurn = this.resolveEnemyTurn();
    this.isHeroMoving = true;
    this.idleTween.stop();
    this.hero.setScale(HERO_SCALE);
    this.playTurnAnimations(null, enemyTurn.movements, false, [], enemyTurn.attacks);
  }

  queueSlowTurn() {
    if (this.slowTurnTimer) {
      return;
    }
    this.slowTurnTimer = this.time.delayedCall(400, () => {
      this.slowTurnTimer = null;
      if (this.playerStatus.slowTurns > 0 && this.playerStatus.slowSkipNextTurn && !this.isHeroMoving) {
        this.consumeSlowTurn();
      }
    });
  }

  wakePlayer() {
    this.heroSleepText.setVisible(false);
    this.actionLog.add('PLAYER_WOKE_UP');
  }

  queueBrainwashedTurn() {
    if (this.brainwashedTurnTimer) {
      return;
    }
    this.brainwashedTurnTimer = this.time.delayedCall(400, () => {
      this.brainwashedTurnTimer = null;
      if (this.playerStatus.brainwashed && !this.isHeroMoving) {
        this.forceBrainwashedAction();
      }
    });
  }

  playerAttack(enemy, ranged = false) {
    this.wakeSpawnSleepingEnemy(enemy);
    const damage = Math.max(1, this.playerStatus.attack - enemy.defense);
    const hit = !ranged || !this.evadesProjectile(enemy)
      ? this.isAttackHit(NORMAL_ATTACK_ACCURACY)
      : false;
    if (hit) {
      if (!ranged) {
        this.playSfx('se-player-attack');
      }
      this.applyEnemyDamage(enemy, damage);
      this.actionLog.add(ranged ? 'PLAYER_RANGED_ATTACK' : 'PLAYER_ATTACK', {
        enemy: this.getEnemyLogName(enemy),
        damage,
      });
      if (!ranged && this.hasEquipEffect(ITEM_EQUIP_EFFECT_LIFE_STEAL)) {
        const recoveredHitPoints = Math.floor(damage * 0.3);
        this.playerStatus.hitPoints = Math.min(
          this.playerStatus.maxHitPoints,
          this.playerStatus.hitPoints + recoveredHitPoints,
        );
        this.updateStatusUi();
      }
      this.warpEstersToDamagedEnemy(enemy);
    } else if (!ranged) {
      this.playSfx('se-miss');
      this.actionLog.add('PLAYER_MISS', { enemy: this.getEnemyLogName(enemy) });
    }
    const attack = {
      sprite: this.hero,
      direction: { x: enemy.tileX - this.heroTileX, y: enemy.tileY - this.heroTileY },
    };
    if (ranged) {
      attack.ranged = true;
      attack.targetX = (enemy.tileX + 0.5) * TILE_SIZE;
      attack.targetY = (enemy.tileY + 0.5) * TILE_SIZE;
      if (hit) {
        attack.onImpact = () => this.playSfx('se-player-attack');
      } else {
        attack.onImpact = () => {
          this.playSfx('se-miss');
          this.actionLog.add('PLAYER_RANGED_NOTHING_HIT');
        };
      }
    }
    const survived = hit && this.applyEnemySurvivalAbility(enemy);
    if (hit && !survived && enemy.hitPoints <= 0) {
      this.applyEnemyDefeatDrop(enemy);
      this.dropEnemyHeldItem(enemy);
      const levelsGained = this.playerStatus.gainExperience(enemy.experience);
      this.updateStatusUi();
      this.actionLog.add('ENEMY_DEFEATED', {
        enemy: this.getEnemyLogName(enemy),
        experience: enemy.experience,
      });
      levelsGained.forEach((level) => {
        this.playSfx('se-level-up');
        this.actionLog.add('LEVEL_UP', { level });
      });
      attack.onComplete = () => {
        enemy.sprite.destroy();
        enemy.symbolOutline?.destroy();
        enemy.symbol?.destroy();
        enemy.jackieLevelText?.destroy();
        enemy.sleepText.destroy();
        enemy.confusionText.destroy();
        enemy.peaceText?.destroy();
        enemy.hasteText.destroy();
        enemy.slowText.destroy();
        enemy.paralysisText.destroy();
      };
      this.enemies = this.enemies.filter((otherEnemy) => otherEnemy !== enemy);
    }
    return attack;
  }

  warpEstersToDamagedEnemy(damagedEnemy) {
    this.enemies
      .filter((enemy) => (
        enemy.specialAbilityId === ENEMY_SKILL_ESTER_EMERGENCY_WARP
        && enemy !== damagedEnemy
        && enemy.status == null
        && !enemy.esterEmergencyWarpUsed
        && !this.getEnemyVisibleTiles(enemy).has(`${this.heroTileX},${this.heroTileY}`)
      ))
      .forEach((ester) => {
        const destinations = MOVE_DIRECTIONS.map((direction) => ({
          x: damagedEnemy.tileX + direction.x,
          y: damagedEnemy.tileY + direction.y,
        })).filter((tile) => (
          this.isWalkableTile(this.dungeonTiles[tile.y]?.[tile.x])
          && !this.isTileOccupied(tile.x, tile.y)
          && !this.isStairTile(tile.x, tile.y)
        ));
        const destination = Phaser.Utils.Array.GetRandom(destinations);
        if (!destination) {
          return;
        }
        ester.idleTween?.stop();
        ester.sprite.setScale(ENEMY_SCALE);
        ester.needsIdleMotion = true;
        ester.tileX = destination.x;
        ester.tileY = destination.y;
        this.playEnemyWarpSfx();
        ester.sprite.setPosition((destination.x + 0.5) * TILE_SIZE, (destination.y + 1) * TILE_SIZE);
        this.updateCharacterDepth(ester.sprite, destination.y);
        this.updateEnemySymbolDepth(ester);
        ester.esterEmergencyWarpUsed = true;
        ester.esterEmergencyWarpTurn = true;
        this.actionLog.add('ENEMY_ESTER_EMERGENCY_WARP', { enemy: this.getEnemyLogName(ester) });
      });
  }

  resolveEnemyTurn() {
    const movements = [];
    const attacks = [];
    this.sleepAppliedEnemies ||= new Set();
    this.sleepJustEndedEnemies = new Set();
    this.confusionAppliedEnemies ||= new Set();
    this.confusionEndedEnemies = new Set();
    this.peaceAppliedEnemies ||= new Set();
    for (const enemy of [...this.enemies]) {
      if (enemy.disguised) {
        continue;
      }
      if (enemy.esterEmergencyWarpTurn) {
        enemy.esterEmergencyWarpTurn = false;
        continue;
      }
      if (enemy.summonCooldown > 0) {
        enemy.summonCooldown -= 1;
      }
      if (enemy.checkAttackCooldown > 0) {
        enemy.checkAttackCooldown -= 1;
      }
      if (enemy.lenoreConfusionCooldown > 0) {
        enemy.lenoreConfusionCooldown -= 1;
      }
      if (enemy.speedTurns > 0) {
        enemy.speedTurns -= 1;
      }
      if (enemy.paralysisTurns > 0) {
        enemy.paralysisTurns -= 1;
        continue;
      }
      if (this.isEnemySlowed(enemy)) {
        if (enemy.slowTurns > 0) {
          enemy.slowTurns -= 1;
        }
        if (enemy.slowSkipNextTurn) {
          enemy.slowSkipNextTurn = false;
          continue;
        }
        enemy.slowSkipNextTurn = true;
      }
      if (enemy.trapCooldown > 0) {
        enemy.trapCooldown -= 1;
      }
      if (enemy.peaceTurns > 0) {
        if (!this.peaceAppliedEnemies.has(enemy)) {
          enemy.peaceTurns -= 1;
        }
        if (enemy.peaceTurns === 0) {
          this.actionLog.add('ENEMY_PEACE_ENDED', { enemy: this.getEnemyLogName(enemy) });
        }
        let movesTaken = 0;
        while (
          enemy.specialAbilityId !== ENEMY_SKILL_PREVENT_ROOM_EXIT
          && movesTaken < this.getEnemyMovementCount(enemy)
          && !this.isEnemyAdjacent(enemy)
        ) {
          const movement = this.resolveEnemyMove(enemy);
          if (!movement) {
            break;
          }
          movements.push(movement);
          movesTaken += 1;
        }
        continue;
      }
      if (enemy.status === 'spawn-sleep') {
        const enteredEnemyRoom = this.enteredRoom === this.getRoomAt(enemy.tileX, enemy.tileY);
        const enteredMonsterHouse = this.monsterHouseRoom
          && this.enteredRoom === this.monsterHouseRoom
          && this.getRoomAt(enemy.tileX, enemy.tileY) === this.monsterHouseRoom;
        if (enteredMonsterHouse || ((enteredEnemyRoom || this.isEnemyAdjacent(enemy)) && Math.random() < 0.5)) {
          this.wakeEnemy(enemy);
        }
        this.advanceEnemyConfusion(enemy);
        continue;
      }
      if (enemy.status === 'sleep') {
        if (!this.sleepAppliedEnemies.has(enemy)) {
          enemy.sleepTurns -= 1;
          if (enemy.sleepTurns <= 0) {
            this.wakeEnemy(enemy);
            this.sleepJustEndedEnemies.add(enemy);
          }
        }
        this.advanceEnemyConfusion(enemy);
        continue;
      }
      if (enemy.confusionTurns > 0) {
        this.resolveConfusedEnemyTurn(enemy, movements, attacks);
        this.advanceEnemyConfusion(enemy);
        continue;
      }
      if (this.useHeartPeace(enemy, attacks)) {
        continue;
      }
      if (this.useLenoreConfusion(enemy, attacks)) {
        continue;
      }
      const sisselaPainRelease = this.createSisselaPainRelease(enemy);
      if (sisselaPainRelease) {
        attacks.push(sisselaPainRelease);
        continue;
      }
      if (this.useElevenMealTime(enemy, attacks)) {
        continue;
      }
      if (this.useBarbaraModification(enemy, attacks)) {
        continue;
      }
      if (this.useYukiDisarm(enemy, attacks)) {
        continue;
      }
      if (this.useKiaraBrand(enemy, attacks)) {
        continue;
      }
      if (this.useZahirBrainwash(enemy, attacks)) {
        continue;
      }
      if (this.resolveJohannRevival(enemy, attacks)) {
        continue;
      }
      if (this.resolveAdrianaFirePillars(enemy)) {
        continue;
      }
      const reniMovements = this.resolveReniTurn(enemy);
      if (enemy.specialAbilityId === ENEMY_SKILL_RENI_SPRING_TRAP) {
        movements.push(...(reniMovements || []));
        continue;
      }
      if (this.resolveIsolMineTrap(enemy)) {
        continue;
      }
      const justynaLaser = this.createJustynaLaser(enemy);
      if (justynaLaser) {
        attacks.push(justynaLaser);
        continue;
      }
      const katjaAttack = this.createKatjaAimedAttack(enemy);
      if (katjaAttack) {
        if (katjaAttack !== true) {
          attacks.push(katjaAttack);
        }
        continue;
      }
      if (this.useSleepWind(enemy, attacks)) {
        continue;
      }
      if (this.resolveIstvanAction(enemy)) {
        continue;
      }
      const martinaMovement = this.resolveMartinaAction(enemy);
      if (martinaMovement) {
        movements.push(martinaMovement);
        continue;
      }
      const lauraTheftMovement = this.resolveLauraTheft(enemy);
      if (lauraTheftMovement) {
        movements.push(lauraTheftMovement);
        continue;
      }
      const specialMovement = this.resolveEnemySpecialMovement(enemy);
      if (specialMovement) {
        movements.push(specialMovement);
        continue;
      }
      if (this.transformItemUnderPriya(enemy)) {
        continue;
      }
      if (this.resolveLukeAction(enemy)) {
        continue;
      }
      const hyunwooCharge = this.createHyunwooChargeAction(enemy);
      if (hyunwooCharge) {
        movements.push(hyunwooCharge.movement);
        attacks.push(hyunwooCharge.attack);
        continue;
      }
      const aidenElectricBurst = this.createAidenElectricBurst(enemy);
      if (aidenElectricBurst) {
        attacks.push(aidenElectricBurst);
        continue;
      }
      const bombAttack = this.createCelineBombAttack(enemy);
      if (bombAttack) {
        attacks.push(bombAttack);
        continue;
      }
      const rangedAttack = this.createEnemyRangedAttack(enemy);
      if (rangedAttack) {
        attacks.push(rangedAttack);
        continue;
      }
      let movesTaken = 0;
      while (
        enemy.specialAbilityId !== ENEMY_SKILL_PREVENT_ROOM_EXIT
        && movesTaken < this.getEnemyMovementCount(enemy)
        && (
          this.isMartinaSummoner(enemy)
          || !(this.isJackie(enemy) ? this.hasJackieTarget(enemy) : this.isEnemyAdjacent(enemy))
        )
      ) {
        const movement = this.resolveEnemyMove(enemy);
        if (!movement) {
          break;
        }
        movements.push(movement);
        movesTaken += 1;
      }
      const lauraTheftAfterMovement = movesTaken < Math.max(
        this.getEnemyMovementCount(enemy),
        this.getEnemyAttackCount(enemy),
      ) && this.resolveLauraTheft(enemy);
      if (lauraTheftAfterMovement) {
        movements.push(lauraTheftAfterMovement);
        continue;
      }
      const actionCount = Math.max(this.getEnemyMovementCount(enemy), this.getEnemyAttackCount(enemy));
      const remainingAttacks = Math.min(this.getEnemyAttackCount(enemy), actionCount - movesTaken);
      if (
        !this.isMartinaSummoner(enemy)
        && remainingAttacks > 0
      ) {
        if (this.isJackie(enemy)) {
          attacks.push(...this.createJackieAttacks(enemy, remainingAttacks));
        } else if (this.isEnemyAdjacent(enemy)) {
          attacks.push(...this.enemyAttack(enemy, remainingAttacks));
        }
      }
    }
    this.enteredRoom = null;
    if (
      this.dashDirection
      && (
        attacks.some((attack) => attack.sprite === this.hero)
        || this.enemies.some((enemy) => this.isEnemyAdjacent(enemy))
      )
    ) {
      this.dashDirection = null;
    }
    this.sleepAppliedEnemies = null;
    this.confusionAppliedEnemies = null;
    this.confusionEndedEnemies = null;
    this.peaceAppliedEnemies = null;
    return { movements, attacks };
  }

  useHeartPeace(enemy, attacks) {
    const enemyRoom = this.getRoomAt(enemy.tileX, enemy.tileY);
    const heroRoom = this.getRoomAt(this.heroTileX, this.heroTileY);
    const peaceSettings = {
      [ENEMY_SKILL_GOLD_HEART_PEACE]: {
        isHeroInRange: () => this.isEnemyAdjacent(enemy),
        isTargetInRange: (target) => Math.max(
          Math.abs(target.tileX - enemy.tileX),
          Math.abs(target.tileY - enemy.tileY),
        ) <= 1,
      },
      [ENEMY_SKILL_MITHRIL_HEART_PEACE]: {
        isHeroInRange: () => (
          Math.max(Math.abs(this.heroTileX - enemy.tileX), Math.abs(this.heroTileY - enemy.tileY)) <= 2
          && this.getEnemyVisibleTiles(enemy).has(`${this.heroTileX},${this.heroTileY}`)
        ),
        isTargetInRange: (target) => Math.max(
          Math.abs(target.tileX - enemy.tileX),
          Math.abs(target.tileY - enemy.tileY),
        ) <= 2,
      },
      [ENEMY_SKILL_ETA_HEART_PEACE]: {
        isHeroInRange: () => (
          enemyRoom
            ? enemyRoom === heroRoom
            : Math.max(Math.abs(this.heroTileX - enemy.tileX), Math.abs(this.heroTileY - enemy.tileY)) <= 1
        ),
        isTargetInRange: (target) => (
          enemyRoom
            ? this.getRoomAt(target.tileX, target.tileY) === enemyRoom
            : Math.max(Math.abs(target.tileX - enemy.tileX), Math.abs(target.tileY - enemy.tileY)) <= 1
        ),
      },
    };
    const settings = peaceSettings[enemy.specialAbilityId];
    if (
      !settings
      || !settings.isHeroInRange()
      || Math.random() >= 0.5
    ) {
      return false;
    }
    const targets = [];
    if (
      !this.hasEquipEffect(ITEM_EQUIP_EFFECT_PEACE_IMMUNITY)
      && !this.hasEquipEffect(ITEM_EQUIP_EFFECT_PEACE_AND_PARALYSIS_IMMUNITY)
    ) {
      this.playerStatus.peaceTurns = PEACE_TURN_COUNT;
      targets.push({ tileX: this.heroTileX, tileY: this.heroTileY });
    }
    this.enemies.forEach((target) => {
      if (!settings.isTargetInRange(target)) {
        return;
      }
      target.peaceTurns = PEACE_TURN_COUNT;
      this.peaceAppliedEnemies.add(target);
      targets.push(target);
    });
    attacks.push({
      sprite: enemy.sprite,
      onStartAsync: true,
      onStart: (complete) => {
        this.playEnemyPureSfx();
        this.actionLog.add('ENEMY_HEART_PEACE', { enemy: this.getEnemyLogName(enemy) });
        this.playHeartPeaceEffects(targets, complete);
      },
    });
    return true;
  }

  playHeartPeaceEffects(targets, onComplete) {
    if (targets.length === 0) {
      onComplete();
      return;
    }
    let completedEffects = 0;
    const completeEffect = () => {
      completedEffects += 1;
      if (completedEffects === targets.length) {
        onComplete();
      }
    };
    targets.forEach((target) => {
      const effect = this.add.text(
        (target.tileX + 0.5) * TILE_SIZE,
        (target.tileY + 0.5) * TILE_SIZE,
        '\u2665',
        { fontFamily: 'sans-serif', fontSize: '38px', color: '#ff8fb6', stroke: '#fff1f6', strokeThickness: 2 },
      ).setOrigin(0.5).setDepth(FOG_DEPTH - 1).setScale(0.45);
      this.tweens.add({
        targets: effect,
        y: `-=${TILE_SIZE * 0.85}`,
        scale: 1.15,
        alpha: 0,
        duration: 480,
        ease: 'Quad.easeOut',
        onComplete: () => {
          effect.destroy();
          completeEffect();
        },
      });
    });
  }

  useYukiDisarm(enemy, attacks) {
    const disarmSettings = {
      [ENEMY_SKILL_GOLD_YUKI_DISARM]: { chance: 0.15, equipmentCategories: [0, 20] },
      [ENEMY_SKILL_MITHRIL_YUKI_DISARM]: { chance: 0.2, equipmentCategories: [0, 20, 30] },
      [ENEMY_SKILL_ETA_YUKI_DISARM]: { chance: 0.25, equipmentCategories: [0, 20, 30] },
    };
    const settings = disarmSettings[enemy.specialAbilityId];
    if (
      !settings
      || !this.isEnemyAdjacent(enemy)
      || Math.random() >= settings.chance
    ) {
      return false;
    }
    const candidates = this.playerStatus.inventory.filter((item) => (
      item.equipped != null && settings.equipmentCategories.includes(item.equipped)
    ));
    const item = Phaser.Utils.Array.GetRandom(candidates);
    if (!item) {
      return false;
    }
    const definition = this.itemDefinitions.get(item.id);
    const direction = {
      x: Math.sign(this.heroTileX - enemy.tileX),
      y: Math.sign(this.heroTileY - enemy.tileY),
    };
    const throwResult = this.getThrowDestination(direction);
    const { destination } = throwResult;
    this.playerStatus.unequipItem(item);
    this.removeInventoryOrFloorItem(item);
    this.updateStatusUi();
    this.refreshInventoryUi();
    attacks.push({
      sprite: enemy.sprite,
      targetsHero: true,
      onStartOnly: true,
      onStartAsync: true,
      onStart: (complete) => {
        this.playSfx('se-sword');
        const iconKey = ITEM_ICON_KEYS[definition.category] || ITEM_ICON_KEYS[90];
        const thrownIcon = this.add.image(this.hero.x, this.hero.y - 40, iconKey)
          .setDisplaySize(40, 40)
          .setDepth(99);
        this.tweens.add({
          targets: thrownIcon,
          x: (destination.x + 0.5) * TILE_SIZE,
          y: (destination.y + 0.5) * TILE_SIZE,
          angle: 360,
          duration: 280,
          ease: 'Quad.easeOut',
          onComplete: () => {
            thrownIcon.destroy();
            this.playImpactEffect(this.heroTileX, this.heroTileY);
            this.actionLog.add('ENEMY_GOLD_YUKI_DISARM', {
              enemy: this.getEnemyLogName(enemy),
              item: definition.name,
            });
            const hitEnemy = throwResult.enemy
              && !this.evadesProjectile(throwResult.enemy)
              && this.isAttackHit(THROW_ACCURACY);
            if (hitEnemy) {
              this.applyThrownItemToEnemy(item, definition, throwResult.enemy);
            } else if (throwResult.enemy) {
              const dropped = this.placeDroppedItem(item, throwResult.enemy.tileX, throwResult.enemy.tileY);
              this.actionLog.add('ITEM_THROW_MISS', {
                item: definition.name,
                enemy: this.getEnemyLogName(throwResult.enemy),
              });
              if (!dropped) {
                this.actionLog.add('ITEM_DISAPPEARED', { item: definition.name });
              }
            } else {
              const dropped = this.placeDroppedItem(item, destination.x, destination.y);
              if (!dropped) {
                this.actionLog.add('ITEM_DISAPPEARED', { item: definition.name });
              }
            }
            complete();
          },
        });
      },
    });
    return true;
  }

  playImpactEffect(tileX, tileY) {
    const effect = this.add.graphics().setDepth(FOG_DEPTH - 1);
    effect.lineStyle(4, 0xffffff, 0.95);
    effect.lineBetween(-TILE_SIZE * 0.12, 0, TILE_SIZE * 0.12, 0);
    effect.lineBetween(0, -TILE_SIZE * 0.12, 0, TILE_SIZE * 0.12);
    effect.lineBetween(-TILE_SIZE * 0.09, -TILE_SIZE * 0.09, TILE_SIZE * 0.09, TILE_SIZE * 0.09);
    effect.lineBetween(TILE_SIZE * 0.09, -TILE_SIZE * 0.09, -TILE_SIZE * 0.09, TILE_SIZE * 0.09);
    effect.setPosition(
      (tileX + 0.5) * TILE_SIZE,
      (tileY + 0.5) * TILE_SIZE,
    ).setScale(0.4);
    this.tweens.add({
      targets: effect,
      scale: 1.75,
      alpha: 0,
      duration: 240,
      ease: 'Quad.easeOut',
      onComplete: () => effect.destroy(),
    });
  }

  wakeEnemy(enemy) {
    if (enemy.status !== 'spawn-sleep' && enemy.status !== 'sleep') {
      return;
    }
    const wasSpawnSleeping = enemy.status === 'spawn-sleep';
    enemy.status = null;
    enemy.sleepTurns = 0;
    enemy.sleepText.setVisible(false);
    this.startEnemyIdleMotion(enemy);
    if (!wasSpawnSleeping && this.getVisibleTiles(this.heroTileX, this.heroTileY).has(`${enemy.tileX},${enemy.tileY}`)) {
      this.actionLog.add('ENEMY_WOKE_UP', { enemy: this.getEnemyLogName(enemy) });
    }
  }

  advanceEnemyConfusion(enemy) {
    if (enemy.confusionTurns <= 0 || this.confusionAppliedEnemies.has(enemy)) {
      return;
    }
    enemy.confusionTurns -= 1;
    if (enemy.confusionTurns === 0) {
      this.confusionEndedEnemies.add(enemy);
      this.actionLog.add('CONFUSION_ENDED', { target: this.getEnemyLogName(enemy) });
    }
  }

  wakeSpawnSleepingEnemy(enemy) {
    if (enemy.status === 'spawn-sleep') {
      this.wakeEnemy(enemy);
    }
  }

  useKiaraBrand(enemy, attacks) {
    const enemyRoom = this.getRoomAt(enemy.tileX, enemy.tileY);
    const heroRoom = this.getRoomAt(this.heroTileX, this.heroTileY);
    const brandSettings = {
      [ENEMY_SKILL_KIARA_BRAND]: { chance: 1, isTargetInRange: () => this.isEnemyAdjacent(enemy) },
      [ENEMY_SKILL_MITHRIL_KIARA_BRAND]: {
        chance: 0.3,
        isTargetInRange: () => (
          (enemyRoom && enemyRoom === heroRoom)
          || this.isEnemyAdjacent(enemy)
        ),
      },
      [ENEMY_SKILL_ETA_KIARA_BRAND]: { chance: 0.3, isTargetInRange: () => true },
    };
    const settings = brandSettings[enemy.specialAbilityId];
    if (
      !settings
      || !settings.isTargetInRange()
      || this.playerStatus.brandTurns > 0
      || Math.random() >= settings.chance
    ) {
      return false;
    }
    this.playerStatus.brandTurns = BRAND_TURN_COUNT;
    this.updateStatusUi();
    attacks.push({
      sprite: enemy.sprite,
      targetsHero: true,
      onStartOnly: true,
      onStart: () => {
        this.actionLog.add('ENEMY_KIARA_BRAND', { enemy: this.getEnemyLogName(enemy) });
      },
    });
    return true;
  }

  useZahirBrainwash(enemy, attacks) {
    const brainwashChances = {
      [ENEMY_SKILL_ZAHIR_BRAINWASH]: 0.15,
      [ENEMY_SKILL_GOLD_ZAHIR_BRAINWASH]: 0.2,
      [ENEMY_SKILL_MITHRIL_ZAHIR_BRAINWASH]: 0.25,
      [ENEMY_SKILL_ETA_ZAHIR_BRAINWASH]: 0.3,
    };
    const brainwashChance = brainwashChances[enemy.specialAbilityId] ?? 0;
    if (
      brainwashChance === 0
      || !this.isEnemyAdjacent(enemy)
      || Math.random() >= brainwashChance
    ) {
      return false;
    }
    this.playerStatus.brainwashed = true;
    attacks.push({
      sprite: enemy.sprite,
      targetsHero: true,
      onStartAsync: true,
      onStart: (complete) => {
        this.playSfx('se-gravity');
        this.actionLog.add('ENEMY_ZAHIR_BRAINWASH', { enemy: this.getEnemyLogName(enemy) });
        this.playZahirBrainwashEffect(complete);
      },
    });
    return true;
  }

  playZahirBrainwashEffect(onComplete) {
    const effect = this.add.graphics().setDepth(FOG_DEPTH - 1);
    effect.fillStyle(0xd9b6ff, 0.9);
    effect.fillEllipse(0, 0, TILE_SIZE * 0.76, TILE_SIZE * 0.42);
    effect.lineStyle(3, 0x5c2f8a, 1);
    effect.strokeEllipse(0, 0, TILE_SIZE * 0.76, TILE_SIZE * 0.42);
    effect.fillStyle(0x28123d, 1);
    effect.fillCircle(0, 0, TILE_SIZE * 0.13);
    effect.setPosition(
      (this.heroTileX + 0.5) * TILE_SIZE,
      (this.heroTileY + 0.5) * TILE_SIZE,
    ).setScale(0.35);
    this.tweens.add({
      targets: effect,
      scale: 1.25,
      alpha: 0,
      duration: 420,
      ease: 'Quad.easeOut',
      onComplete: () => {
        effect.destroy();
        onComplete();
      },
    });
  }

  resolveJohannRevival(enemy, attacks) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_JOHANN_REVIVE) {
      return false;
    }
    const coffins = this.floorItems.filter((item) => (
      item.kind === 'coffin'
      && item.ownerId != null
      && Math.max(Math.abs(item.tileX - enemy.tileX), Math.abs(item.tileY - enemy.tileY)) <= 1
    ));
    const coffin = Phaser.Utils.Array.GetRandom(coffins);
    if (!coffin) {
      return false;
    }
    const destination = coffin.tileX === enemy.tileX && coffin.tileY === enemy.tileY
      ? Phaser.Utils.Array.GetRandom(MOVE_DIRECTIONS.map((direction) => ({
        x: coffin.tileX + direction.x,
        y: coffin.tileY + direction.y,
      })).filter((tile) => (
        this.isWalkableTile(this.dungeonTiles[tile.y]?.[tile.x])
        && !this.isTileOccupied(tile.x, tile.y)
        && !this.isStairTile(tile.x, tile.y)
      )))
      : (!this.isTileOccupied(coffin.tileX, coffin.tileY) ? { x: coffin.tileX, y: coffin.tileY } : null);
    if (!destination) {
      return false;
    }
    const revivedEnemy = this.spawnEnemy({ entries: [{ id: coffin.ownerId, weight: 1 }] }, destination, true);
    if (!revivedEnemy) {
      return false;
    }
    coffin.marker.destroy();
    this.floorItems = this.floorItems.filter((item) => item !== coffin);
    this.playEnemyAlertSfx();
    this.actionLog.add('ENEMY_JOHANN_PRAYED', { enemy: this.getEnemyLogName(enemy) });
    this.actionLog.add('ENEMY_REVIVED', { enemy: this.getEnemyLogName(revivedEnemy) });
    attacks.push({
      sprite: enemy.sprite,
      onStartAsync: true,
      onStart: (complete) => {
        this.playJohannRevivalEffect(destination, complete);
      },
    });
    return true;
  }

  playJohannRevivalEffect(destination, onComplete) {
    const effect = this.add.graphics().setDepth(FOG_DEPTH - 1);
    effect.lineStyle(5, 0xf4f8ff, 0.6);
    effect.lineBetween(-TILE_SIZE * 0.24, 0, TILE_SIZE * 0.24, 0);
    effect.lineBetween(0, -TILE_SIZE * 0.36, 0, TILE_SIZE * 0.36);
    effect.setPosition(
      (destination.x + 0.5) * TILE_SIZE,
      (destination.y + 0.5) * TILE_SIZE,
    ).setScale(0.45);
    this.tweens.add({
      targets: effect,
      y: `-=${TILE_SIZE * 0.9}`,
      scale: 1.2,
      alpha: 0,
      duration: 520,
      ease: 'Quad.easeOut',
      onComplete: () => {
        effect.destroy();
        onComplete();
      },
    });
  }

  resolveAdrianaFirePillars(enemy) {
    const firePillarCounts = {
      [ENEMY_SKILL_ADRIANA_FIRE_PILLAR]: 1,
      [ENEMY_SKILL_GOLD_ADRIANA_FIRE_PILLAR]: 2,
      [ENEMY_SKILL_MITHRIL_ADRIANA_FIRE_PILLAR]: 3,
      [ENEMY_SKILL_ETA_ADRIANA_FIRE_PILLAR]: 4,
    };
    const firePillarCount = firePillarCounts[enemy.specialAbilityId];
    if (!firePillarCount || Math.random() >= 0.15) {
      return false;
    }
    const candidates = MOVE_DIRECTIONS.map((direction) => ({
      x: enemy.tileX + direction.x,
      y: enemy.tileY + direction.y,
    })).filter((tile) => (
      this.isWalkableTile(this.dungeonTiles[tile.y]?.[tile.x])
      && !this.hasStaticObjectAt(tile.x, tile.y)
    ));
    if (candidates.length === 0) {
      return false;
    }
    Phaser.Utils.Array.Shuffle(candidates)
      .slice(0, firePillarCount)
      .forEach((tile) => this.createFirePillar(tile.x, tile.y));
    this.playEnemyFireSfx();
    this.actionLog.add('ENEMY_ADRIANA_FIRE_PILLARS', { enemy: this.getEnemyLogName(enemy) });
    return true;
  }

  createFirePillar(tileX, tileY) {
    const graphics = this.add.graphics().setDepth(FOG_DEPTH - 1);
    const x = (tileX + 0.5) * TILE_SIZE;
    const y = (tileY + 0.5) * TILE_SIZE;
    graphics.fillStyle(0xff6b00, 0.72);
    graphics.fillCircle(x, y, TILE_SIZE * 0.34);
    graphics.fillStyle(0xffdc4a, 0.9);
    graphics.fillCircle(x, y + 8, TILE_SIZE * 0.18);
    this.tweens.add({
      targets: graphics,
      alpha: 0.5,
      duration: 240,
      yoyo: true,
      repeat: -1,
    });
    graphics.setVisible(this.getVisibleTiles(this.heroTileX, this.heroTileY).has(`${tileX},${tileY}`));
    this.firePillars.push({ tileX, tileY, turnsRemaining: 20, graphics });
  }

  advanceFirePillars() {
    this.firePillars.forEach((pillar) => {
      const floorItem = this.getFloorItemAt(pillar.tileX, pillar.tileY);
      if (floorItem) {
        const definition = floorItem.kind === 'coffin' ? null : this.itemDefinitions.get(floorItem.id);
        this.removeInventoryOrFloorItem(floorItem);
        this.actionLog.add('FIRE_PILLAR_BURNED_ITEM', { item: definition?.name ?? '棺桶' });
      }
      if (this.heroTileX === pillar.tileX && this.heroTileY === pillar.tileY) {
        const damage = this.applyHeroDamage(10, '炎柱');
        this.dashDirection = null;
        this.updateStatusUi();
        this.actionLog.add('FIRE_PILLAR_HIT_PLAYER', { damage });
      }
      [...this.enemies].filter((enemy) => (
        enemy.tileX === pillar.tileX
        && enemy.tileY === pillar.tileY
        && ![
          ENEMY_SKILL_ADRIANA_FIRE_PILLAR,
          ENEMY_SKILL_GOLD_ADRIANA_FIRE_PILLAR,
          ENEMY_SKILL_MITHRIL_ADRIANA_FIRE_PILLAR,
          ENEMY_SKILL_ETA_ADRIANA_FIRE_PILLAR,
        ].includes(enemy.specialAbilityId)
      ))
        .forEach((enemy) => {
          this.applyEnemyDamage(enemy, 10);
          this.actionLog.add('FIRE_PILLAR_HIT_ENEMY', {
            enemy: this.getEnemyLogName(enemy),
            damage: 10,
          });
          if (enemy.hitPoints <= 0 && !this.applyEnemySurvivalAbility(enemy)) {
            this.defeatEnemyByFire(enemy);
          }
        });
      pillar.turnsRemaining -= 1;
    });
    this.firePillars = this.firePillars.filter((pillar) => {
      if (pillar.turnsRemaining > 0) {
        return true;
      }
      pillar.graphics.destroy();
      return false;
    });
  }

  defeatEnemyByFire(enemy) {
    this.applyEnemyDefeatDrop(enemy);
    this.dropEnemyHeldItem(enemy);
    enemy.sprite.destroy();
    enemy.symbolOutline?.destroy();
    enemy.symbol?.destroy();
    enemy.jackieLevelText?.destroy();
    enemy.sleepText.destroy();
    enemy.confusionText.destroy();
    enemy.peaceText?.destroy();
    enemy.hasteText.destroy();
    enemy.slowText.destroy();
    enemy.paralysisText.destroy();
    this.enemies = this.enemies.filter((otherEnemy) => otherEnemy !== enemy);
  }

  useSleepWind(enemy, attacks) {
    const sleepWindRange = enemy.specialAbilityId === ENEMY_SKILL_SLEEP_WIND
      ? 1
      : enemy.specialAbilityId === ENEMY_SKILL_MITHRIL_BANYA_SLEEP_WIND
        ? 2
        : enemy.specialAbilityId === ENEMY_SKILL_ETA_BANYA_SLEEP_WIND ? 3 : 0;
    const heroDistance = Math.max(
      Math.abs(this.heroTileX - enemy.tileX),
      Math.abs(this.heroTileY - enemy.tileY),
    );
    if (
      sleepWindRange === 0
      || heroDistance > sleepWindRange
      || (sleepWindRange > 1
        && !this.getEnemyVisibleTiles(enemy).has(`${this.heroTileX},${this.heroTileY}`))
      || Math.random() >= 0.2
    ) {
      return false;
    }
    const newlySleepingEnemies = [];
    const windTargets = [{ tileX: this.heroTileX, tileY: this.heroTileY }];
    this.enemies.forEach((target) => {
      if (
        target !== enemy
        && Math.max(
          Math.abs(target.tileX - enemy.tileX),
          Math.abs(target.tileY - enemy.tileY),
        ) <= sleepWindRange
      ) {
        windTargets.push(target);
        const wasSleeping = target.status != null || this.sleepJustEndedEnemies.has(target);
        if (!wasSleeping) {
          target.idleTween?.stop();
          target.status = 'sleep';
          target.sleepTurns = SLEEP_TURN_COUNT;
          this.sleepAppliedEnemies.add(target);
          newlySleepingEnemies.push(target);
        }
      }
    });
    if (heroDistance <= sleepWindRange) {
      const wasSleeping = this.playerStatus.sleepTurns > 0
        || this.hasEquipEffect(ITEM_EQUIP_EFFECT_SLEEP_IMMUNITY);
      if (!wasSleeping) {
        this.playerStatus.sleepTurns = SLEEP_TURN_COUNT;
      }
      attacks.push({
        sprite: enemy.sprite,
        onStartAsync: true,
        onStart: (complete) => {
          this.playSfx('se-wind');
          this.actionLog.add('ENEMY_SLEEP_WIND', { enemy: this.getEnemyLogName(enemy) });
          newlySleepingEnemies.forEach((target) => {
            target.sleepText.setVisible(true);
            if (this.getVisibleTiles(this.heroTileX, this.heroTileY).has(`${target.tileX},${target.tileY}`)) {
              this.actionLog.add('ENEMY_FELL_ASLEEP', { enemy: this.getEnemyLogName(target) });
            }
          });
          if (!wasSleeping) {
            this.heroSleepText.setVisible(true);
            this.actionLog.add('PLAYER_FELL_ASLEEP');
          }
          this.playSleepWindEffects(windTargets, complete);
        },
      });
    }
    return true;
  }

  playSleepWindEffects(targets, onComplete) {
    if (targets.length === 0) {
      onComplete();
      return;
    }
    let completedEffects = 0;
    const completeEffect = () => {
      completedEffects += 1;
      if (completedEffects === targets.length) {
        onComplete();
      }
    };
    targets.forEach((target) => {
      const effect = this.add.graphics().setDepth(FOG_DEPTH - 1);
      effect.lineStyle(3, 0xc5f6ff, 0.9);
      effect.beginPath();
      effect.arc(0, -5, TILE_SIZE * 0.26, 0.2, Math.PI * 1.55, false);
      effect.arc(0, 5, TILE_SIZE * 0.22, Math.PI * 1.2, Math.PI * 2.55, false);
      effect.arc(0, 0, TILE_SIZE * 0.16, 0.15, Math.PI * 1.65, false);
      effect.strokePath();
      effect.setPosition(
        (target.tileX + 0.5) * TILE_SIZE,
        (target.tileY + 0.5) * TILE_SIZE,
      ).setScale(0.45);
      this.tweens.add({
        targets: effect,
        angle: 150,
        scale: 1.45,
        alpha: 0,
        duration: 380,
        ease: 'Quad.easeOut',
        onComplete: () => {
          effect.destroy();
          completeEffect();
        },
      });
    });
  }

  advanceEnemyRespawn() {
    const floorEnemies = this.dungeonData.enemyMap.get(this.playerStatus.floor);
    if (!floorEnemies || this.enemies.length >= this.dungeonData.maxEnemies) {
      return;
    }
    this.enemyRespawnTurns += 1;
    if (this.enemyRespawnTurns < floorEnemies.respawnInterval) {
      return;
    }
    this.enemyRespawnTurns = 0;
    this.spawnEnemy(this.isaacHayesInvasion ? {
      entries: [{ id: 900, weight: 1 }, { id: 901, weight: 1 }],
    } : floorEnemies);
  }

  activateIsaacHayesInvasion() {
    const floorEnemies = this.dungeonData.enemyMap.get(this.playerStatus.floor);
    if (
      this.isaacHayesInvasion
      || !floorEnemies?.turnLimit
      || this.floorTurn < floorEnemies.turnLimit
    ) {
      return;
    }
    this.isaacHayesInvasion = true;
    this.actionLog.add('ENEMY_ISAAC_ANNOUNCEMENT');
    const invasionEntries = [{ id: 900, weight: 1 }, { id: 901, weight: 1 }];
    const invasionCount = Phaser.Math.Between(
      floorEnemies.minimumEnemies,
      floorEnemies.maximumEnemies,
    );
    for (let index = 0; index < invasionCount; index += 1) {
      if (!this.spawnEnemy({ entries: invasionEntries }, null, true)) {
        break;
      }
    }
  }

  isEnemyAdjacent(enemy) {
    return this.isEnemyAdjacentTo(enemy, this.heroTileX, this.heroTileY);
  }

  isEnemyAdjacentTo(enemy, tileX, tileY) {
    const offsetX = tileX - enemy.tileX;
    const offsetY = tileY - enemy.tileY;
    return Math.max(Math.abs(offsetX), Math.abs(offsetY)) <= 1
      && this.canEnemyPassBetweenTiles(enemy, enemy.tileX, enemy.tileY, offsetX, offsetY);
  }

  enemyAttack(enemy, attackCount = this.getEnemyAttackCount(enemy)) {
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    const attacks = [];
    for (let attack = 0; attack < attackCount; attack += 1) {
      const hit = this.isAttackHit(NORMAL_ATTACK_ACCURACY);
      attacks.push({
        sprite: enemy.sprite,
        symbolOutline: enemy.symbolOutline,
        symbol: enemy.symbol,
        targetsHero: true,
        direction: { x: this.heroTileX - enemy.tileX, y: this.heroTileY - enemy.tileY },
        postAttackMovement: attack === attackCount - 1 ? this.createFioraRetreatMovement(enemy) : null,
        onStart: () => {
          const checkAttackThresholds = {
            [ENEMY_SKILL_CHECK_ATTACK]: 0.2,
            [ENEMY_SKILL_GOLD_ADELA_CHECK_ATTACK]: 0.4,
            [ENEMY_SKILL_MITHRIL_ADELA_CHECK_ATTACK]: 0.6,
            [ENEMY_SKILL_ETA_ADELA_CHECK_ATTACK]: 0.8,
          };
          const checkAttackThreshold = checkAttackThresholds[enemy.specialAbilityId];
          if (
            checkAttackThreshold !== undefined
            && !enemy.checkAttackCooldown
            && this.playerStatus.hitPoints <= this.playerStatus.maxHitPoints * checkAttackThreshold
            && this.playerStatus.hitPoints >= 2
          ) {
            this.playSfx('se-enemy-attack-crit');
            this.applyHeroDamage(this.playerStatus.hitPoints - 1, this.getEnemyLogName(enemy));
            enemy.checkAttackCooldown = CHECK_ATTACK_COOLDOWN_TURNS;
            this.dashDirection = null;
            this.updateStatusUi();
            this.actionLog.add('ENEMY_CHECK_ATTACK', { enemy: this.getEnemyLogName(enemy) });
            return;
          }
          if (hit) {
            const baseDamage = Math.max(1, enemy.attack - this.playerStatus.defense);
            const criticalHit = enemy.specialAbilityId === ENEMY_SKILL_MARKUS_CRITICAL_HIT
              && Math.random() < MARKUS_CRITICAL_HIT_CHANCE;
            this.playSfx(criticalHit ? 'se-enemy-attack-crit' : 'se-enemy-attack');
            const damage = criticalHit ? Math.floor(baseDamage * 1.5) : baseDamage;
            const actualDamage = this.applyHeroDamage(damage, this.getEnemyLogName(enemy));
            if (criticalHit) {
              this.actionLog.add('ENEMY_MARKUS_CRITICAL_HIT', { enemy: this.getEnemyLogName(enemy) });
            }
            if (enemy.specialAbilityId === ENEMY_SKILL_BIANCA_LIFE_STEAL) {
              const recoveredHitPoints = Math.floor(damage * 0.3);
              const hitPointsBefore = enemy.hitPoints;
              enemy.hitPoints = Math.min(enemy.maxHitPoints, enemy.hitPoints + recoveredHitPoints);
              const recoveredAmount = enemy.hitPoints - hitPointsBefore;
              if (recoveredAmount > 0) {
                this.actionLog.add('ENEMY_BIANCA_LIFE_STEAL', {
                  enemy: this.getEnemyLogName(enemy),
                  amount: recoveredAmount,
                });
              }
            }
            this.dashDirection = null;
            this.updateStatusUi();
            this.actionLog.add('ENEMY_ATTACK', { enemy: this.getEnemyLogName(enemy), damage: actualDamage });
          } else {
            this.playSfx('se-miss');
            this.actionLog.add('ENEMY_MISS', { enemy: this.getEnemyLogName(enemy) });
          }
        },
      });
    }
    return attacks;
  }

  createFioraRetreatMovement(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_FIORA_RETREAT) {
      return null;
    }
    return this.resolveEnemyMoveInDirection(enemy, {
      x: Math.sign(enemy.tileX - this.heroTileX),
      y: Math.sign(enemy.tileY - this.heroTileY),
    });
  }

  isJackie(enemy) {
    return enemy.specialAbilityId === ENEMY_SKILL_JACKIE_ADRENALINE;
  }

  getJackieTargets(enemy) {
    const targets = [];
    if (this.isEnemyAdjacent(enemy)) {
      targets.push(this.hero);
    }
    this.enemies.forEach((target) => {
      if (target !== enemy && this.isEnemyAdjacentTo(enemy, target.tileX, target.tileY)) {
        targets.push(target);
      }
    });
    return targets;
  }

  hasJackieTarget(enemy) {
    return this.getJackieTargets(enemy).length > 0;
  }

  createJackieAttacks(enemy, attackCount) {
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    return Array.from({ length: attackCount }, () => {
      let target = null;
      return {
        sprite: enemy.sprite,
        symbolOutline: enemy.symbolOutline,
        symbol: enemy.symbol,
        getDirection: () => {
          target = Phaser.Utils.Array.GetRandom(this.getJackieTargets(enemy));
          if (!target) {
            return null;
          }
          const targetX = target === this.hero ? this.heroTileX : target.tileX;
          const targetY = target === this.hero ? this.heroTileY : target.tileY;
          return { x: targetX - enemy.tileX, y: targetY - enemy.tileY };
        },
        onStart: () => {
          this.playSfx('se-enemy-attack');
          const damage = enemy.attack;
          if (target === this.hero) {
            const actualDamage = this.applyHeroDamage(damage);
            this.dashDirection = null;
            this.updateStatusUi();
            this.actionLog.add('ENEMY_ATTACK', { enemy: this.getEnemyLogName(enemy), damage: actualDamage });
            return;
          }
          this.wakeEnemy(target);
          this.applyEnemyDamage(target, damage);
          this.actionLog.add('ENEMY_JACKIE_ATTACK_ENEMY', {
            enemy: this.getEnemyLogName(enemy),
            target: this.getEnemyLogName(target),
            damage,
          });
          if (target.hitPoints <= 0 && !this.applyEnemySurvivalAbility(target)) {
            this.defeatEnemyByEnemy(enemy, target);
          }
        },
      };
    });
  }

  createHyunwooChargeAction(enemy) {
    if (
      ![
        ENEMY_SKILL_GOLD_HYUNWOO_CHARGE,
        ENEMY_SKILL_MITHRIL_HYUNWOO_CHARGE,
        ENEMY_SKILL_ETA_HYUNWOO_CHARGE,
      ].includes(enemy.specialAbilityId)
      || !this.getEnemyVisibleTiles(enemy).has(`${this.heroTileX},${this.heroTileY}`)
      || Math.random() >= 0.15
    ) {
      return null;
    }
    const offsetX = this.heroTileX - enemy.tileX;
    const offsetY = this.heroTileY - enemy.tileY;
    const distance = Math.max(Math.abs(offsetX), Math.abs(offsetY));
    const isStraightLine = offsetX === 0
      || offsetY === 0
      || Math.abs(offsetX) === Math.abs(offsetY);
    if (distance < 1 || distance > 10 || !isStraightLine) {
      return null;
    }
    const direction = { x: Math.sign(offsetX), y: Math.sign(offsetY) };
    let target = this.hero;
    let targetDistance = distance;
    for (let step = 0; step < distance; step += 1) {
      const pathX = enemy.tileX + direction.x * step;
      const pathY = enemy.tileY + direction.y * step;
      if (!this.canMoveFrom(pathX, pathY, direction.x, direction.y)) {
        return null;
      }
    }
    for (let step = 1; step < distance; step += 1) {
      const tileX = enemy.tileX + direction.x * step;
      const tileY = enemy.tileY + direction.y * step;
      if (!this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX])) {
        return null;
      }
      const interveningEnemy = this.getEnemyAt(tileX, tileY);
      if (interveningEnemy) {
        target = interveningEnemy;
        targetDistance = step;
        break;
      }
    }
    const targetX = target === this.hero ? this.heroTileX : target.tileX;
    const targetY = target === this.hero ? this.heroTileY : target.tileY;
    const destinationX = targetX - direction.x;
    const destinationY = targetY - direction.y;
    const movement = {
      enemy,
      fromX: enemy.sprite.x,
      fromY: enemy.sprite.y,
      toX: (destinationX + 0.5) * TILE_SIZE,
      toY: (destinationY + 1) * TILE_SIZE,
      duration: targetDistance * 45,
    };
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    enemy.tileX = destinationX;
    enemy.tileY = destinationY;
    this.updateCharacterDepth(enemy.sprite, destinationY);
    this.updateEnemySymbolDepth(enemy);
    const knockback = this.getHyunwooKnockback(targetX, targetY, direction, enemy, target);
    if (target === this.hero) {
      this.heroTileX = knockback.x;
      this.heroTileY = knockback.y;
    } else {
      target.tileX = knockback.x;
      target.tileY = knockback.y;
      this.updateCharacterDepth(target.sprite, knockback.y);
      this.updateEnemySymbolDepth(target);
    }
    return {
      movement,
      attack: {
        sprite: enemy.sprite,
        targetsHero: target === this.hero,
        knockback: {
          targets: target === this.hero ? this.hero : target.sprite,
          x: (knockback.x + 0.5) * TILE_SIZE,
          y: (knockback.y + 1) * TILE_SIZE,
          duration: knockback.distance * 45,
          onUpdate: target === this.hero ? undefined : () => {
            this.updateEnemySymbolDepth(target);
            target.symbolOutline?.setPosition(target.sprite.x + 28, target.sprite.y - 20);
            target.symbol?.setPosition(target.sprite.x + 28, target.sprite.y - 20);
            target.sleepText?.setPosition(target.sprite.x + 34, target.sprite.y - 90);
            target.confusionText?.setPosition(target.sprite.x + 34, target.sprite.y - 90);
            target.peaceText?.setPosition(target.sprite.x + 34, target.sprite.y - 90);
            target.hasteText?.setPosition(target.sprite.x + 34, target.sprite.y - 90);
            target.slowText?.setPosition(target.sprite.x + 34, target.sprite.y - 90);
            target.paralysisText?.setPosition(target.sprite.x + 34, target.sprite.y - 90);
          },
        },
        onStart: () => {
          this.playSfx('se-enemy-attack-crit');
          this.actionLog.add('ENEMY_HYUNWOO_CHARGE', { enemy: this.getEnemyLogName(enemy) });
        },
        onComplete: () => {
          this.resolveHyunwooCharge(enemy, target, knockback.collisionTarget);
          const targets = [target, knockback.collisionTarget].filter(Boolean);
          targets.forEach((impactTarget) => {
            const tileX = impactTarget === this.hero ? this.heroTileX : impactTarget.tileX;
            const tileY = impactTarget === this.hero ? this.heroTileY : impactTarget.tileY;
            this.playImpactEffect(tileX, tileY);
          });
        },
      },
    };
  }

  getHyunwooKnockback(startX, startY, direction, enemy, target) {
    let x = startX;
    let y = startY;
    let distance = 0;
    let collisionTarget = null;
    for (let step = 1; step <= 10; step += 1) {
      const tileX = x + direction.x;
      const tileY = y + direction.y;
      if (!this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX])) {
        break;
      }
      const collisionEnemy = this.getEnemyAt(tileX, tileY);
      const collidesWithHero = tileX === this.heroTileX && tileY === this.heroTileY;
      if (collisionEnemy && collisionEnemy !== enemy && collisionEnemy !== target) {
        collisionTarget = collisionEnemy;
        break;
      }
      if (collidesWithHero && target !== this.hero) {
        collisionTarget = this.hero;
        break;
      }
      x = tileX;
      y = tileY;
      distance += 1;
    }
    return { x, y, distance, collisionTarget };
  }

  resolveHyunwooCharge(enemy, target, collisionTarget) {
    this.dashDirection = null;
    this.applyHyunwooChargeDamage(enemy, target, 20);
    const collisionDamage = {
      [ENEMY_SKILL_GOLD_HYUNWOO_CHARGE]: 20,
      [ENEMY_SKILL_MITHRIL_HYUNWOO_CHARGE]: 35,
      [ENEMY_SKILL_ETA_HYUNWOO_CHARGE]: 50,
    }[enemy.specialAbilityId] ?? 20;
    if (collisionTarget && collisionTarget !== this.hero && this.enemies.includes(collisionTarget)) {
      this.applyHyunwooChargeDamage(enemy, collisionTarget, collisionDamage);
    } else if (collisionTarget === this.hero) {
      this.applyHyunwooChargeDamage(enemy, collisionTarget, collisionDamage);
    }
    this.updateHeroDepth(this.heroTileY);
    this.updateStatusUi();
  }

  applyHyunwooChargeDamage(enemy, target, damage) {
    if (target === this.hero) {
      this.playSfx('se-enemy-attack');
      const actualDamage = this.applyHeroDamage(damage, this.getEnemyLogName(enemy));
      this.actionLog.add('ENEMY_ATTACK', { enemy: this.getEnemyLogName(enemy), damage: actualDamage });
      return;
    }
    if (!this.enemies.includes(target)) {
      return;
    }
    this.wakeSpawnSleepingEnemy(target);
    this.applyEnemyDamage(target, damage);
    this.actionLog.add('ENEMY_HYUNWOO_CHARGE_HIT_ENEMY', {
      enemy: this.getEnemyLogName(enemy),
      target: this.getEnemyLogName(target),
      damage,
    });
    if (target.hitPoints <= 0 && !this.applyEnemySurvivalAbility(target)) {
      this.defeatEnemyByEnemy(enemy, target);
    }
  }

  createCelineBombAttack(enemy) {
    const bombSettings = {
      [ENEMY_SKILL_BOMB_THROW]: { range: 4, damage: 10 },
      [ENEMY_SKILL_GOLD_CELINE_BOMB_THROW]: { range: 5, damage: 25 },
      [ENEMY_SKILL_MITHRIL_CELINE_BOMB_THROW]: { range: 6, damage: 40 },
      [ENEMY_SKILL_ETA_CELINE_BOMB_THROW]: { range: 7, damage: 60 },
    };
    const settings = bombSettings[enemy.specialAbilityId];
    const distance = Math.max(
      Math.abs(this.heroTileX - enemy.tileX),
      Math.abs(this.heroTileY - enemy.tileY),
    );
    if (
      !settings
      || distance < 1
      || distance > settings.range
      || Math.random() >= 0.25
    ) {
      return null;
    }
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    return {
      sprite: enemy.sprite,
      symbolOutline: enemy.symbolOutline,
      symbol: enemy.symbol,
      targetsHero: true,
      direction: {
        x: Math.sign(this.heroTileX - enemy.tileX),
        y: Math.sign(this.heroTileY - enemy.tileY),
      },
      ranged: true,
      targetX: (this.heroTileX + 0.5) * TILE_SIZE,
      targetY: (this.heroTileY + 0.5) * TILE_SIZE,
      impactEffect: { radius: 2, duration: 300 },
      onImpact: () => {
        this.playSfx('se-bomb');
        const destroyedWalls = [];
        for (let y = this.heroTileY - 1; y <= this.heroTileY + 1; y += 1) {
          for (let x = this.heroTileX - 1; x <= this.heroTileX + 1; x += 1) {
            if (this.dungeonTiles[y]?.[x] === 0) {
              this.dungeonTiles[y][x] = CORRIDOR_TILE;
              destroyedWalls.push({ x, y });
            }
          }
        }
        if (destroyedWalls.length > 0) {
          this.dungeonRenderer.refreshTiles(destroyedWalls);
          this.corridorTiles = this.getCorridorTiles();
          this.minimapUi.refreshTiles(destroyedWalls);
          this.updateVisibility();
        }
        const damage = this.getExplosionDamage(settings.damage);
        const actualDamage = this.applyHeroDamage(damage, this.getEnemyLogName(enemy));
        this.dashDirection = null;
        this.updateStatusUi();
        this.actionLog.add('ENEMY_CELINE_BOMB', {
          enemy: this.getEnemyLogName(enemy),
          damage: actualDamage,
        });
        [...this.enemies].forEach((target) => {
          if (
            target === enemy
            || Math.max(
              Math.abs(target.tileX - this.heroTileX),
              Math.abs(target.tileY - this.heroTileY),
            ) > 1
          ) {
            return;
          }
          this.applyEnemyDamage(target, settings.damage);
          this.actionLog.add('ENEMY_CELINE_BOMB_HIT_ENEMY', {
            enemy: this.getEnemyLogName(enemy),
            target: this.getEnemyLogName(target),
            damage: settings.damage,
          });
          if (target.hitPoints <= 0 && !this.applyEnemySurvivalAbility(target)) {
            this.defeatEnemyByEnemy(enemy, target);
          }
        });
      },
    };
  }

  createEnemyRangedAttack(enemy) {
    const isAdinaMagicBolt = [
      ENEMY_SKILL_ADINA_MAGIC_BOLT,
      ENEMY_SKILL_GOLD_ADINA_MAGIC_BOLT,
      ENEMY_SKILL_MITHRIL_ADINA_MAGIC_BOLT,
      ENEMY_SKILL_ETA_ADINA_MAGIC_BOLT,
    ].includes(enemy.specialAbilityId);
    const ignoresVisibility = enemy.specialAbilityId === ENEMY_SKILL_RIO_LONG_RANGE_ATTACK;
    const seesHero = ignoresVisibility || (
      isAdinaMagicBolt
        ? this.getEnemyVisibleTiles(enemy).has(`${this.heroTileX},${this.heroTileY}`)
        : this.getVisibleTiles(enemy.tileX, enemy.tileY).has(`${this.heroTileX},${this.heroTileY}`)
    );
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_RANGED_ATTACK
      && !isAdinaMagicBolt
      && enemy.specialAbilityId !== ENEMY_SKILL_RIO_LONG_RANGE_ATTACK
      || Math.random() >= 0.5
      || !seesHero
    ) {
      return null;
    }
    const offsetX = this.heroTileX - enemy.tileX;
    const offsetY = this.heroTileY - enemy.tileY;
    const distance = Math.max(Math.abs(offsetX), Math.abs(offsetY));
    const isStraightLine = offsetX === 0
      || offsetY === 0
      || Math.abs(offsetX) === Math.abs(offsetY);
    const range = enemy.specialAbilityId === ENEMY_SKILL_RIO_LONG_RANGE_ATTACK
      ? Infinity
      : isAdinaMagicBolt ? 5 : 3;
    if (distance > range || distance < 1 || !isStraightLine) {
      return null;
    }
    const direction = { x: Math.sign(offsetX), y: Math.sign(offsetY) };
    let target = null;
    let targetTileX = this.heroTileX;
    let targetTileY = this.heroTileY;
    for (let step = 1; step <= distance; step += 1) {
      const targetX = enemy.tileX + direction.x * step;
      const targetY = enemy.tileY + direction.y * step;
      if (!this.isWalkableTile(this.dungeonTiles[targetY]?.[targetX])) {
        return null;
      }
      const interveningEnemy = this.getEnemyAt(targetX, targetY);
      if (interveningEnemy && interveningEnemy !== enemy) {
        target = interveningEnemy;
        targetTileX = targetX;
        targetTileY = targetY;
        break;
      }
    }
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    return {
      sprite: enemy.sprite,
      symbolOutline: enemy.symbolOutline,
      symbol: enemy.symbol,
      targetsHero: target == null,
      direction,
      ranged: true,
      targetX: (targetTileX + 0.5) * TILE_SIZE,
      targetY: (targetTileY + 0.5) * TILE_SIZE,
      onStart: () => {
        if (isAdinaMagicBolt) {
          this.playSfx('se-long-range-attack');
        }
        if (target) {
          if (this.evadesProjectile(target)) {
            this.actionLog.add('ENEMY_RANGED_MISS_ENEMY', {
              enemy: this.getEnemyLogName(enemy),
              target: this.getEnemyLogName(target),
            });
            return;
          }
          if (isAdinaMagicBolt) {
            this.actionLog.add('ENEMY_ADINA_MAGIC_BOLT', {
              enemy: this.getEnemyLogName(enemy),
              target: this.getEnemyLogName(target),
            });
            this.applyAdinaStatus(target, enemy.specialAbilityId);
            return;
          }
          const damage = Math.max(1, enemy.attack - target.defense);
          this.applyEnemyDamage(target, damage);
          this.actionLog.add('ENEMY_RANGED_HIT_ENEMY', {
            enemy: this.getEnemyLogName(enemy),
            target: this.getEnemyLogName(target),
            damage,
          });
          if (target.hitPoints <= 0 && !this.applyEnemySurvivalAbility(target)) {
            this.defeatEnemyByEnemy(enemy, target);
          } else if (isAdinaMagicBolt) {
            this.applyAdinaStatus(target, enemy.specialAbilityId);
          }
          return;
        }
        if (isAdinaMagicBolt) {
          this.actionLog.add('ENEMY_ADINA_MAGIC_BOLT', {
            enemy: this.getEnemyLogName(enemy),
            target: 'プレイヤー',
          });
          this.applyAdinaStatus(null, enemy.specialAbilityId);
          return;
        }
        const baseDamage = Math.max(1, enemy.attack - this.playerStatus.defense);
        const damage = this.getRangedDamage(baseDamage);
        this.playSfx('se-long-range-attack');
        const actualDamage = this.applyHeroDamage(damage, this.getEnemyLogName(enemy));
        this.updateStatusUi();
        this.actionLog.add('ENEMY_RANGED_ATTACK', { enemy: this.getEnemyLogName(enemy), damage: actualDamage });
      },
    };
  }

  createKatjaAimedAttack(enemy) {
    const aimedShotRanges = {
      [ENEMY_SKILL_KATJA_AIMED_SHOT]: 15,
      [ENEMY_SKILL_GOLD_KATJA_AIMED_SHOT]: 20,
      [ENEMY_SKILL_MITHRIL_KATJA_AIMED_SHOT]: 30,
      [ENEMY_SKILL_ETA_KATJA_AIMED_SHOT]: Infinity,
      [ENEMY_SKILL_HAYES_AIMED_SHOT]: 20,
    };
    const range = aimedShotRanges[enemy.specialAbilityId];
    if (range == null) {
      return null;
    }
    const minimumRange = enemy.specialAbilityId === ENEMY_SKILL_HAYES_AIMED_SHOT ? 6 : 0;
    const distance = Math.max(
      Math.abs(this.heroTileX - enemy.tileX),
      Math.abs(this.heroTileY - enemy.tileY),
    );
    if (enemy.katjaAiming && (distance > range || distance < minimumRange)) {
      enemy.katjaAiming = false;
      return null;
    }
    if (!enemy.katjaAiming) {
      if (enemy.specialAbilityId === ENEMY_SKILL_HAYES_AIMED_SHOT && distance <= minimumRange) {
        const offsetX = this.heroTileX - enemy.tileX;
        const offsetY = this.heroTileY - enemy.tileY;
        const isStraightLine = offsetX === 0 || offsetY === 0 || Math.abs(offsetX) === Math.abs(offsetY);
        if (!isStraightLine || Math.random() >= 0.5) {
          return null;
        }
      } else if (distance > range || distance < minimumRange) {
        return null;
      }
      if (enemy.specialAbilityId !== ENEMY_SKILL_HAYES_AIMED_SHOT || distance > minimumRange) {
        enemy.katjaAiming = true;
      }
      if (enemy.specialAbilityId === ENEMY_SKILL_HAYES_AIMED_SHOT && distance <= minimumRange) {
        enemy.idleTween?.stop();
        enemy.sprite.setScale(ENEMY_SCALE);
        enemy.needsIdleMotion = true;
      } else {
        return {
          sprite: enemy.sprite,
          targetsHero: true,
          onStartAsync: true,
          onStart: (complete) => {
            this.playSfx('se-sogeki-ready');
            this.actionLog.add('ENEMY_KATJA_AIMS', { enemy: this.getEnemyLogName(enemy) });
            this.playKatjaTargetMarker(complete);
          },
        };
      }
    }
    enemy.katjaAiming = false;
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    return {
      sprite: enemy.sprite,
      symbolOutline: enemy.symbolOutline,
      symbol: enemy.symbol,
      targetsHero: true,
      ranged: true,
      projectileSpeedMultiplier: 1.5,
      targetX: (this.heroTileX + 0.5) * TILE_SIZE,
      targetY: (this.heroTileY + 0.5) * TILE_SIZE,
      onStart: () => {
        const baseDamage = Math.max(1, enemy.attack - this.playerStatus.defense);
        const damage = this.getRangedDamage(baseDamage);
        this.playSfx('se-sogeki');
        const actualDamage = this.applyHeroDamage(damage, this.getEnemyLogName(enemy));
        this.updateStatusUi();
        this.actionLog.add('ENEMY_RANGED_ATTACK', { enemy: this.getEnemyLogName(enemy), damage: actualDamage });
      },
    };
  }

  playKatjaTargetMarker(onComplete) {
    const marker = this.add.graphics().setDepth(FOG_DEPTH - 1);
    marker.lineStyle(4, 0xff5e5e, 0.95);
    marker.strokeCircle(0, 0, TILE_SIZE * 0.3);
    marker.lineBetween(-TILE_SIZE * 0.43, 0, -TILE_SIZE * 0.18, 0);
    marker.lineBetween(TILE_SIZE * 0.18, 0, TILE_SIZE * 0.43, 0);
    marker.lineBetween(0, -TILE_SIZE * 0.43, 0, -TILE_SIZE * 0.18);
    marker.lineBetween(0, TILE_SIZE * 0.18, 0, TILE_SIZE * 0.43);
    marker.setPosition(
      (this.heroTileX + 0.5) * TILE_SIZE,
      (this.heroTileY + 0.5) * TILE_SIZE,
    ).setScale(1.6).setAlpha(0.25);
    this.tweens.add({
      targets: marker,
      scale: 1,
      alpha: 1,
      duration: 180,
      yoyo: true,
      repeat: 1,
      ease: 'Quad.easeOut',
      onComplete: () => {
        marker.destroy();
        onComplete();
      },
    });
  }

  applyAdinaStatus(target, abilityId) {
    const statusesByAbility = {
      [ENEMY_SKILL_ADINA_MAGIC_BOLT]: ['slow', 'confusion', 'warp'],
      [ENEMY_SKILL_GOLD_ADINA_MAGIC_BOLT]: ['slow', 'confusion', 'paralysis'],
      [ENEMY_SKILL_MITHRIL_ADINA_MAGIC_BOLT]: ['slow', 'paralysis', 'peace'],
      [ENEMY_SKILL_ETA_ADINA_MAGIC_BOLT]: ['slow', 'sleep', 'peace'],
    };
    const status = Phaser.Utils.Array.GetRandom(statusesByAbility[abilityId] || []);
    if (!status) {
      return;
    }
    if (!target) {
      if (status === 'confusion') {
        if (
          this.playerStatus.confusionTurns > 0
          || this.hasEquipEffect(ITEM_EQUIP_EFFECT_CONFUSION_IMMUNITY)
        ) {
          return;
        }
        this.playerStatus.confusionTurns = CONFUSION_TURN_COUNT;
        this.actionLog.add('PLAYER_CONFUSED');
      } else if (status === 'slow') {
        if (this.playerStatus.slowTurns > 0 || this.hasEquipEffect(ITEM_EQUIP_EFFECT_SLOW_IMMUNITY)) {
          return;
        }
        this.playerStatus.slowTurns = SLOW_TURN_COUNT;
        this.playerStatus.slowSkipNextTurn = true;
        this.actionLog.add('PLAYER_SLOWED');
      } else if (status === 'paralysis') {
        if (
          this.playerStatus.paralysisTurns > 0
          || this.hasEquipEffect(ITEM_EQUIP_EFFECT_PEACE_AND_PARALYSIS_IMMUNITY)
        ) {
          return;
        }
        this.playerStatus.paralysisTurns = PARALYSIS_TURN_COUNT;
        this.actionLog.add('PLAYER_PARALYZED');
      } else if (status === 'peace') {
        if (
          this.hasEquipEffect(ITEM_EQUIP_EFFECT_PEACE_IMMUNITY)
          || this.hasEquipEffect(ITEM_EQUIP_EFFECT_PEACE_AND_PARALYSIS_IMMUNITY)
        ) {
          return;
        }
        this.playerStatus.peaceTurns = PEACE_TURN_COUNT;
      } else if (status === 'sleep') {
        if (
          this.playerStatus.sleepTurns > 0
          || this.hasEquipEffect(ITEM_EQUIP_EFFECT_SLEEP_IMMUNITY)
        ) {
          return;
        }
        this.playerStatus.sleepTurns = SLEEP_TURN_COUNT;
        this.heroSleepText.setVisible(true);
        this.actionLog.add('PLAYER_FELL_ASLEEP');
      } else if (status === 'warp') {
        this.useJumpPad();
      }
      return;
    }
    if (status === 'confusion') {
      if (target.confusionTurns > 0) {
        return;
      }
      target.confusionTurns = CONFUSION_TURN_COUNT;
      this.actionLog.add('ENEMY_CONFUSED', { enemy: this.getEnemyLogName(target) });
    } else if (status === 'slow') {
      if (target.slowTurns > 0) {
        return;
      }
      target.slowTurns = SLOW_TURN_COUNT;
      target.slowSkipNextTurn = true;
      this.actionLog.add('ENEMY_SLOWED', { enemy: this.getEnemyLogName(target) });
    } else if (status === 'paralysis') {
      if (target.paralysisTurns > 0) {
        return;
      }
      target.paralysisTurns = PARALYSIS_TURN_COUNT;
      this.actionLog.add('ENEMY_PARALYZED', { enemy: this.getEnemyLogName(target) });
    } else if (status === 'peace') {
      target.peaceTurns = PEACE_TURN_COUNT;
    } else if (status === 'sleep') {
      this.applySleepToEnemy(target);
    } else if (status === 'warp') {
      this.warpAdinaTarget(target);
    }
  }

  warpAdinaTarget(target) {
    const currentRoom = this.getRoomAt(target.tileX, target.tileY);
    const destinations = this.dungeonRooms
      .filter((room) => room !== currentRoom)
      .flatMap((room) => {
        const tiles = [];
        for (let y = room.y; y < room.y + room.height; y += 1) {
          for (let x = room.x; x < room.x + room.width; x += 1) {
            if (!this.isTileOccupied(x, y) && !this.isStairTile(x, y)) {
              tiles.push({ x, y });
            }
          }
        }
        return tiles;
      });
    const destination = Phaser.Utils.Array.GetRandom(destinations);
    if (!destination) {
      return;
    }
    target.tileX = destination.x;
    target.tileY = destination.y;
    this.playEnemyWarpSfx();
    target.sprite.setPosition((destination.x + 0.5) * TILE_SIZE, (destination.y + 1) * TILE_SIZE);
    this.updateCharacterDepth(target.sprite, destination.y);
    this.updateEnemySymbolDepth(target);
    this.updateVisibility();
  }

  defeatEnemyByEnemy(attacker, target) {
    this.applyEnemyDefeatDrop(target);
    this.dropEnemyHeldItem(target);
    target.sprite.destroy();
    target.symbolOutline?.destroy();
    target.symbol?.destroy();
    target.jackieLevelText?.destroy();
    target.sleepText.destroy();
    target.confusionText.destroy();
    target.peaceText?.destroy();
    target.hasteText.destroy();
    target.slowText.destroy();
    target.paralysisText.destroy();
    this.enemies = this.enemies.filter((otherEnemy) => otherEnemy !== target);
    if (this.isJackie(attacker)) {
      attacker.attack += 5;
      attacker.hitPoints = attacker.maxHitPoints;
      attacker.jackieLevel += 1;
      attacker.jackieLevelText.setText(`Lv${attacker.jackieLevel}`);
      this.playSfx('se-level-up');
      this.actionLog.add('ENEMY_JACKIE_ADRENALINE', { enemy: this.getEnemyLogName(attacker) });
    }
    this.evolveEnemy(attacker);
  }

  dropEnemyHeldItem(enemy) {
    if (!enemy.heldItem) {
      return;
    }
    const definition = this.itemDefinitions.get(enemy.heldItem.id);
    const dropped = this.placeDroppedItem(enemy.heldItem, enemy.tileX, enemy.tileY);
    this.actionLog.add('ENEMY_LUKE_DROPPED', {
      enemy: this.getEnemyLogName(enemy),
      item: definition?.name ?? 'アイテム',
    });
    if (!dropped) {
      this.actionLog.add('ITEM_DISAPPEARED', { item: definition?.name ?? 'アイテム' });
    }
    enemy.heldItem = null;
  }

  evolveEnemy(enemy) {
    if (this.isJackie(enemy) || enemy.evolutionId == null) {
      return;
    }
    const evolution = this.enemyDefinitions.find((definition) => definition.id === enemy.evolutionId);
    if (!evolution) {
      return;
    }
    const previousName = this.getEnemyLogName(enemy);
    const copiedSpecialAbilityId = enemy.copiedSpecialAbilityId;
    enemy.symbolOutline?.destroy();
    enemy.symbol?.destroy();
    Object.assign(enemy, evolution, {
      tileX: enemy.tileX,
      tileY: enemy.tileY,
      sprite: enemy.sprite,
      sleepText: enemy.sleepText,
      confusionText: enemy.confusionText,
      hasteText: enemy.hasteText,
      slowText: enemy.slowText,
      paralysisText: enemy.paralysisText,
      status: null,
      sleepTurns: 0,
      confusionTurns: 0,
      slowTurns: 0,
      paralysisTurns: 0,
      slowSkipNextTurn: false,
      speedTurns: 0,
      maxHitPoints: evolution.hitPoints,
      hitPoints: evolution.hitPoints,
      hasUsedSurvivalAbility: false,
    });
    if (copiedSpecialAbilityId != null) {
      enemy.copiedSpecialAbilityId = copiedSpecialAbilityId;
      enemy.specialAbilityId = copiedSpecialAbilityId;
    }
    if (enemy.symbolFile) {
      const symbolKey = this.getSymbolTextureKey(enemy.symbolFile);
      enemy.symbolOutline = this.add.image(enemy.sprite.x + 28, enemy.sprite.y - 20, symbolKey)
        .setOrigin(0.5)
        .setDisplaySize(26, 26)
        .setTintFill(0x000000);
      enemy.symbol = this.add.image(enemy.sprite.x + 28, enemy.sprite.y - 20, symbolKey)
        .setOrigin(0.5)
        .setDisplaySize(24, 24);
      this.updateEnemySymbolDepth(enemy);
    }
    enemy.sleepText.setVisible(false);
    enemy.confusionText.setVisible(false);
    enemy.hasteText.setVisible(false);
    enemy.slowText.setVisible(false);
    enemy.paralysisText.setVisible(false);
    this.playSfx('se-level-up');
    this.actionLog.add('ENEMY_EVOLVED', {
      enemy: previousName,
      evolution: this.getEnemyLogName(enemy),
    });
  }

  resolveEnemyMove(enemy) {
    const target = this.getJohannCoffinTarget(enemy)
      || this.getLukeItemTarget(enemy)
      || this.getPriyaItemTarget(enemy)
      || this.getEnemyTarget(enemy);
    let nextStep = target ? this.findShortestPathStep(enemy, target) : this.findCorridorPatrolStep(enemy);
    if (!nextStep && enemy.lastKnownHeroTile) {
      enemy.lastKnownHeroTile = null;
      nextStep = this.findCorridorPatrolStep(enemy);
      if (!nextStep) {
        const patrolTarget = this.getEnemyTarget(enemy);
        if (!patrolTarget) {
          nextStep = this.findAvailablePatrolStep(enemy);
        } else {
          nextStep = this.findShortestPathStep(enemy, patrolTarget);
        }
      }
    }
    if (!nextStep) {
      nextStep = this.findAvailablePatrolStep(enemy);
      if (!nextStep) {
        return null;
      }
    }
    let nextX = nextStep.x;
    let nextY = nextStep.y;
    if (this.isTileOccupied(nextX, nextY)) {
      if (enemy.lastKnownHeroTile) {
        enemy.lastKnownHeroTile = null;
      }
      const corridorStep = this.findCorridorPatrolStep(enemy);
      const fallbackStep = corridorStep || this.findAvailablePatrolStep(enemy);
      if (!fallbackStep) {
        return null;
      }
      nextX = fallbackStep.x;
      nextY = fallbackStep.y;
    }

    const movement = {
      enemy,
      fromX: enemy.sprite.x,
      fromY: enemy.sprite.y,
      toX: (nextX + 0.5) * TILE_SIZE,
      toY: (nextY + 1) * TILE_SIZE,
    };
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    enemy.patrolDirection = { x: nextX - enemy.tileX, y: nextY - enemy.tileY };
    enemy.tileX = nextX;
    enemy.tileY = nextY;
    this.updateCharacterDepth(enemy.sprite, nextY);
    this.updateEnemySymbolDepth(enemy);
    return movement;
  }

  resolveReniTurn(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_RENI_SPRING_TRAP) {
      return null;
    }
    const seesHero = this.getEnemyVisibleTiles(enemy).has(`${this.heroTileX},${this.heroTileY}`);
    if (seesHero) {
      enemy.reniFleeTurns = 5;
    } else if (enemy.reniFleeTurns > 0) {
      enemy.reniFleeTurns -= 1;
    }
    if (
      !enemy.trapCooldown
      && !this.getTrapAt(enemy.tileX, enemy.tileY)
      && Math.random() < 0.1
      && this.placeSpringTrap(enemy.tileX, enemy.tileY)
    ) {
      enemy.trapCooldown = 20;
      this.playEnemyTrapSetSfx();
      this.actionLog.add('ENEMY_RENI_TRAP', { enemy: this.getEnemyLogName(enemy) });
      return [];
    }
    if (!enemy.reniFleeTurns) {
      const movements = [];
      for (let move = 0; move < this.getEnemyMovementCount(enemy); move += 1) {
        const movement = this.resolveEnemyMove(enemy);
        if (!movement) {
          break;
        }
        movements.push(movement);
      }
      return movements;
    }
    const movements = [];
    for (let move = 0; move < this.getEnemyMovementCount(enemy); move += 1) {
      const currentDistance = Math.max(
        Math.abs(enemy.tileX - this.heroTileX),
        Math.abs(enemy.tileY - this.heroTileY),
      );
      const candidates = MOVE_DIRECTIONS.map((direction) => ({
        direction,
        x: enemy.tileX + direction.x,
        y: enemy.tileY + direction.y,
      })).filter((candidate) => (
        this.canEnemyEnterTile(enemy, candidate.x, candidate.y)
        && this.canEnemyPassBetweenTiles(enemy, enemy.tileX, enemy.tileY, candidate.direction.x, candidate.direction.y)
        && !this.isTileOccupied(candidate.x, candidate.y)
      ));
      const nonReversingCandidates = candidates.filter((candidate) => (
        !enemy.reniFleeDirection
        || candidate.direction.x !== -enemy.reniFleeDirection.x
        || candidate.direction.y !== -enemy.reniFleeDirection.y
      ));
      const fleeCandidates = nonReversingCandidates.length > 0 ? nonReversingCandidates : candidates;
      const farthestDistance = Math.max(...fleeCandidates.map((candidate) => Math.max(
        Math.abs(candidate.x - this.heroTileX),
        Math.abs(candidate.y - this.heroTileY),
      )), currentDistance);
      const destination = Phaser.Utils.Array.GetRandom(fleeCandidates.filter((candidate) => (
        Math.max(Math.abs(candidate.x - this.heroTileX), Math.abs(candidate.y - this.heroTileY)) === farthestDistance
      )));
      if (!destination || farthestDistance <= currentDistance) {
        const corridorEscapeStep = this.getReniCorridorEscapeStep(enemy);
        const escapeMovement = corridorEscapeStep && this.resolveEnemyMoveInDirection(enemy, corridorEscapeStep);
        if (escapeMovement) {
          enemy.reniFleeDirection = corridorEscapeStep;
          movements.push(escapeMovement);
        }
        break;
      }
      const movement = this.resolveEnemyMoveInDirection(enemy, destination.direction);
      if (!movement) {
        break;
      }
      enemy.reniFleeDirection = destination.direction;
      movements.push(movement);
    }
    return movements;
  }

  resolveIsolMineTrap(enemy) {
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_ISOL_MINE_TRAP
      || enemy.trapCooldown > 0
      || this.getTrapAt(enemy.tileX, enemy.tileY)
      || Math.random() >= 0.1
      || !this.placeMineTrap(enemy.tileX, enemy.tileY)
    ) {
      return false;
    }
    enemy.trapCooldown = 20;
    this.playEnemyTrapSetSfx();
    this.actionLog.add('ENEMY_ISOL_MINE_TRAP', { enemy: this.getEnemyLogName(enemy) });
    return true;
  }

  getReniCorridorEscapeStep(enemy) {
    if (!this.getRoomAt(enemy.tileX, enemy.tileY)) {
      return null;
    }
    const corridorTargets = this.corridorTiles
      .map((tile) => ({
        ...tile,
        distance: Math.max(Math.abs(tile.x - enemy.tileX), Math.abs(tile.y - enemy.tileY)),
      }))
      .sort((first, second) => first.distance - second.distance);
    for (const target of corridorTargets) {
      const step = this.findShortestPathStep(enemy, target);
      if (step) {
        return { x: step.x - enemy.tileX, y: step.y - enemy.tileY };
      }
    }
    return null;
  }

  resolveConfusedEnemyTurn(enemy, movements, attacks) {
    const actionCount = Math.max(this.getEnemyMovementCount(enemy), this.getEnemyAttackCount(enemy));
    for (let action = 0; action < actionCount; action += 1) {
      const direction = Phaser.Utils.Array.GetRandom(MOVE_DIRECTIONS);
      const targetX = enemy.tileX + direction.x;
      const targetY = enemy.tileY + direction.y;
      const target = targetX === this.heroTileX && targetY === this.heroTileY
        ? this.hero
        : this.getEnemyAt(targetX, targetY);
      if (target && Math.random() < 0.5) {
        if (target === this.hero) {
          attacks.push(...this.enemyAttack(enemy, 1));
        } else {
          attacks.push(this.createConfusedEnemyAttack(enemy, target, direction));
        }
        continue;
      }
      const movement = this.resolveEnemyMoveInDirection(enemy, direction);
      if (movement) {
        movements.push(movement);
      }
    }
  }

  isEnemyHasted(enemy) {
    return enemy.speedTurns > 0 || (
      enemy.specialAbilityId === ENEMY_SKILL_STEAL_ITEM
      && enemy.heldItem != null
    );
  }

  isEnemySlowed(enemy) {
    return enemy.slowTurns > 0 || (
      KATJA_AIMED_SHOT_SKILL_IDS.includes(enemy.specialAbilityId)
      && !enemy.speedTurns
    );
  }

  applyHasteToEnemy(enemy) {
    enemy.speedTurns = HASTE_TURN_COUNT;
  }

  getEnemyMovementCount(enemy) {
    if (KATJA_AIMED_SHOT_SKILL_IDS.includes(enemy.specialAbilityId)) {
      return enemy.movementCount;
    }
    return enemy.movementCount * (this.isEnemyHasted(enemy) ? 2 : 1);
  }

  getEnemyAttackCount(enemy) {
    if (KATJA_AIMED_SHOT_SKILL_IDS.includes(enemy.specialAbilityId)) {
      return enemy.attackCount;
    }
    return enemy.attackCount * (this.isEnemyHasted(enemy) ? 2 : 1);
  }

  resolveLukeAction(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_STEAL_ITEM || enemy.heldItem) {
      return false;
    }
    const item = this.getFloorItemAt(enemy.tileX, enemy.tileY);
    if (!item || item.kind === 'coffin') {
      return false;
    }
    const definition = this.itemDefinitions.get(item.id);
    enemy.heldItem = { id: item.id, usesRemaining: item.usesRemaining };
    item.marker.destroy();
    this.floorItems = this.floorItems.filter((floorItem) => floorItem !== item);
    this.playEnemyAlertSfx();
    this.actionLog.add('ENEMY_LUKE_PICKUP', {
      enemy: this.getEnemyLogName(enemy),
      item: definition?.name ?? 'アイテム',
    });
    return true;
  }

  resolveLauraTheft(enemy) {
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_LAURA_THEFT
      || enemy.heldItem
      || !this.isEnemyAdjacent(enemy)
    ) {
      return null;
    }
    const candidates = this.playerStatus.inventory.filter((item) => item.equipped == null);
    const item = Phaser.Utils.Array.GetRandom(candidates);
    const currentRoom = this.getRoomAt(enemy.tileX, enemy.tileY);
    const destinations = this.dungeonRooms
      .filter((room) => room !== currentRoom)
      .map((room) => this.findOpenTileInRoom(room))
      .filter(Boolean);
    const destination = Phaser.Utils.Array.GetRandom(destinations);
    if (!item || !destination) {
      return null;
    }
    const definition = this.itemDefinitions.get(item.id);
    enemy.heldItem = { ...item };
    this.removeInventoryOrFloorItem(item);
    this.refreshInventoryUi();
    const movement = {
      enemy,
      fromX: enemy.sprite.x,
      fromY: enemy.sprite.y,
      toX: (destination.x + 0.5) * TILE_SIZE,
      toY: (destination.y + 1) * TILE_SIZE,
    };
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    enemy.tileX = destination.x;
    enemy.tileY = destination.y;
    this.playEnemyWarpSfx();
    this.updateCharacterDepth(enemy.sprite, destination.y);
    this.updateEnemySymbolDepth(enemy);
    this.actionLog.add('ENEMY_LAURA_THEFT', {
      enemy: this.getEnemyLogName(enemy),
      item: definition?.name ?? 'アイテム',
    });
    return movement;
  }

  getLukeItemTarget(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_STEAL_ITEM || enemy.heldItem) {
      return null;
    }
    const visibleTiles = this.getVisibleTiles(enemy.tileX, enemy.tileY);
    const targets = this.floorItems.filter((item) => (
      item.kind !== 'coffin' && visibleTiles.has(`${item.tileX},${item.tileY}`)
    ));
    if (targets.length === 0) {
      return null;
    }
    targets.sort((first, second) => (
      Math.max(Math.abs(first.tileX - enemy.tileX), Math.abs(first.tileY - enemy.tileY))
      - Math.max(Math.abs(second.tileX - enemy.tileX), Math.abs(second.tileY - enemy.tileY))
    ));
    return { x: targets[0].tileX, y: targets[0].tileY };
  }

  resolveEnemyMoveInDirection(enemy, direction) {
    const nextX = enemy.tileX + direction.x;
    const nextY = enemy.tileY + direction.y;
    if (
      !this.canEnemyEnterTile(enemy, nextX, nextY)
      || !this.canEnemyPassBetweenTiles(enemy, enemy.tileX, enemy.tileY, direction.x, direction.y)
      || this.isTileOccupied(nextX, nextY)
    ) {
      return null;
    }
    const movement = {
      enemy,
      fromX: enemy.sprite.x,
      fromY: enemy.sprite.y,
      toX: (nextX + 0.5) * TILE_SIZE,
      toY: (nextY + 1) * TILE_SIZE,
    };
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    enemy.tileX = nextX;
    enemy.tileY = nextY;
    this.updateCharacterDepth(enemy.sprite, nextY);
    this.updateEnemySymbolDepth(enemy);
    return movement;
  }

  createConfusedEnemyAttack(enemy, target, direction) {
    return {
      sprite: enemy.sprite,
      symbolOutline: enemy.symbolOutline,
      symbol: enemy.symbol,
      direction,
      getDirection: () => {
        if (!this.enemies.includes(target)) {
          return null;
        }
        const targetDirection = {
          x: target.tileX - enemy.tileX,
          y: target.tileY - enemy.tileY,
        };
        return Math.max(Math.abs(targetDirection.x), Math.abs(targetDirection.y)) <= 1
          ? targetDirection
          : null;
      },
      onStart: () => {
        const damage = Math.max(1, enemy.attack - target.defense);
        this.applyEnemyDamage(target, damage);
        this.actionLog.add('ENEMY_ATTACK_ENEMY', {
          enemy: this.getEnemyLogName(enemy),
          target: this.getEnemyLogName(target),
          damage,
        });
        if (target.hitPoints <= 0 && !this.applyEnemySurvivalAbility(target)) {
          this.defeatEnemyByEnemy(enemy, target);
        }
      },
    };
  }

  resolveEnemySpecialMovement(enemy) {
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_WARP_TO_HERO
      && enemy.specialAbilityId !== ENEMY_SKILL_ETA_ABIGAIL_WARP_TO_HERO
      && enemy.specialAbilityId !== ENEMY_SKILL_ISAAC_WARP
    ) {
      return null;
    }
    if (
      (enemy.specialAbilityId === ENEMY_SKILL_WARP_TO_HERO
        || enemy.specialAbilityId === ENEMY_SKILL_ETA_ABIGAIL_WARP_TO_HERO)
      && (
        this.isEnemyAdjacent(enemy)
        || (enemy.specialAbilityId === ENEMY_SKILL_WARP_TO_HERO
          && !this.getVisibleTiles(enemy.tileX, enemy.tileY).has(`${this.heroTileX},${this.heroTileY}`))
      )
    ) {
      return null;
    }
    const distance = Math.max(
      Math.abs(this.heroTileX - enemy.tileX),
      Math.abs(this.heroTileY - enemy.tileY),
    );
    if (
      enemy.specialAbilityId === ENEMY_SKILL_ISAAC_WARP
      && (distance < 4 || distance > 10)
    ) {
      return null;
    }
    const candidates = MOVE_DIRECTIONS.map((direction) => ({
      x: this.heroTileX + direction.x,
      y: this.heroTileY + direction.y,
    })).filter((candidate) => (
      this.isWalkableTile(this.dungeonTiles[candidate.y]?.[candidate.x])
      && !this.isTileOccupied(candidate.x, candidate.y)
      && !this.isStairTile(candidate.x, candidate.y)
    ));
    const destination = Phaser.Utils.Array.GetRandom(candidates);
    if (!destination) {
      return null;
    }
    const movement = {
      enemy,
      fromX: enemy.sprite.x,
      fromY: enemy.sprite.y,
      toX: (destination.x + 0.5) * TILE_SIZE,
      toY: (destination.y + 1) * TILE_SIZE,
    };
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    enemy.tileX = destination.x;
    enemy.tileY = destination.y;
    this.playEnemyWarpSfx();
    this.updateCharacterDepth(enemy.sprite, destination.y);
    this.updateEnemySymbolDepth(enemy);
    this.actionLog.add(
      enemy.specialAbilityId === ENEMY_SKILL_ISAAC_WARP ? 'ENEMY_ISAAC_WARP' : 'ENEMY_WARPED',
      { enemy: this.getEnemyLogName(enemy) },
    );
    return movement;
  }

  resolveMartinaAction(enemy) {
    if (!this.isMartinaSummoner(enemy) || !this.isEnemyAdjacent(enemy)) {
      return null;
    }
    const summonCounts = {
      [ENEMY_SKILL_SUMMON_AND_WARP]: 1,
      [ENEMY_SKILL_GOLD_MARTINA_SUMMON_AND_WARP]: 2,
      [ENEMY_SKILL_MITHRIL_MARTINA_SUMMON_AND_WARP]: 3,
      [ENEMY_SKILL_ETA_MARTINA_SUMMON_AND_WARP]: 4,
    };
    const summonCount = summonCounts[enemy.specialAbilityId];
    const summonCandidates = MOVE_DIRECTIONS.map((direction) => ({
      x: this.heroTileX + direction.x,
      y: this.heroTileY + direction.y,
    })).filter((candidate) => (
      this.isWalkableTile(this.dungeonTiles[candidate.y]?.[candidate.x])
      && !this.isTileOccupied(candidate.x, candidate.y)
      && !this.isStairTile(candidate.x, candidate.y)
    ));
    const currentRoom = this.getRoomAt(enemy.tileX, enemy.tileY);
    const destinations = this.dungeonRooms
      .filter((room) => room !== currentRoom)
      .map((room) => this.findOpenTileInRoom(room))
      .filter(Boolean);
    const summonPositions = Phaser.Utils.Array.Shuffle([...summonCandidates]).slice(0, summonCount);
    const destination = Phaser.Utils.Array.GetRandom(destinations);
    const floorEnemies = this.dungeonData.enemyMap.get(this.playerStatus.floor);
    const summonableEntries = floorEnemies?.entries.filter((entry) => (
      this.enemyDefinitions.find((definition) => definition.id === entry.id)?.imageFile !== enemy.imageFile
    ));
    if (!destination || summonPositions.length === 0 || !summonableEntries?.length) {
      return null;
    }
    const summonedEnemies = summonPositions
      .map((position) => this.spawnEnemy({ entries: summonableEntries }, position, true))
      .filter(Boolean);
    if (summonedEnemies.length === 0) {
      return null;
    }
    const movement = {
      enemy,
      fromX: enemy.sprite.x,
      fromY: enemy.sprite.y,
      toX: (destination.x + 0.5) * TILE_SIZE,
      toY: (destination.y + 1) * TILE_SIZE,
    };
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    enemy.tileX = destination.x;
    enemy.tileY = destination.y;
    this.playEnemyWarpSfx();
    this.updateCharacterDepth(enemy.sprite, destination.y);
    this.updateEnemySymbolDepth(enemy);
    this.actionLog.add('ENEMY_MARTINA_SUMMONS', { enemy: this.getEnemyLogName(enemy) });
    summonedEnemies.forEach((summonedEnemy) => {
      this.actionLog.add('ENEMY_SUMMONED', { enemy: this.getEnemyLogName(summonedEnemy) });
    });
    return movement;
  }

  isMartinaSummoner(enemy) {
    return [
      ENEMY_SKILL_SUMMON_AND_WARP,
      ENEMY_SKILL_GOLD_MARTINA_SUMMON_AND_WARP,
      ENEMY_SKILL_MITHRIL_MARTINA_SUMMON_AND_WARP,
      ENEMY_SKILL_ETA_MARTINA_SUMMON_AND_WARP,
    ].includes(enemy.specialAbilityId);
  }

  resolveIstvanAction(enemy) {
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_SUMMON_SELF
      || enemy.cannotSummonSelf
      || enemy.summonCooldown > 0
      || Math.random() >= 0.1
    ) {
      return false;
    }
    const candidates = MOVE_DIRECTIONS.map((direction) => ({
      x: enemy.tileX + direction.x,
      y: enemy.tileY + direction.y,
    })).filter((candidate) => (
      this.isWalkableTile(this.dungeonTiles[candidate.y]?.[candidate.x])
      && !this.isTileOccupied(candidate.x, candidate.y)
      && !this.isStairTile(candidate.x, candidate.y)
    ));
    const position = Phaser.Utils.Array.GetRandom(candidates);
    if (!position) {
      return false;
    }
    const summonedEnemy = this.spawnEnemy({ entries: [{ id: enemy.id, weight: 1 }] }, position, true);
    if (!summonedEnemy) {
      return false;
    }
    enemy.summonCooldown = 40;
    summonedEnemy.cannotSummonSelf = true;
    this.playEnemyAlertSfx();
    this.actionLog.add('ENEMY_ISTVAN_SUMMONS', { enemy: this.getEnemyLogName(enemy) });
    this.actionLog.add('ENEMY_SUMMONED', { enemy: this.getEnemyLogName(summonedEnemy) });
    return true;
  }

  transformItemUnderPriya(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_TRANSFORM_ITEMS) {
      return false;
    }
    const item = this.getFloorItemAt(enemy.tileX, enemy.tileY);
    if (!item || item.kind === 'coffin' || item.id === FLOWER_ITEM_ID) {
      return false;
    }
    item.id = FLOWER_ITEM_ID;
    item.marker.setTexture(ITEM_ICON_KEYS[90]).setTint(0xffffff);
    this.playEnemyAlertSfx();
    this.actionLog.add('ENEMY_PRIYA_SINGS', { enemy: this.getEnemyLogName(enemy) });
    return true;
  }

  getPriyaItemTarget(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_TRANSFORM_ITEMS) {
      return null;
    }
    const visibleTiles = this.getVisibleTiles(enemy.tileX, enemy.tileY);
    const targets = this.floorItems.filter((item) => (
      item.kind !== 'coffin' && item.id !== FLOWER_ITEM_ID && visibleTiles.has(`${item.tileX},${item.tileY}`)
    ));
    if (targets.length === 0) {
      return null;
    }
    targets.sort((first, second) => (
      Math.max(Math.abs(first.tileX - enemy.tileX), Math.abs(first.tileY - enemy.tileY))
      - Math.max(Math.abs(second.tileX - enemy.tileX), Math.abs(second.tileY - enemy.tileY))
    ));
    return { x: targets[0].tileX, y: targets[0].tileY };
  }

  getJohannCoffinTarget(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_JOHANN_REVIVE) {
      return null;
    }
    const visibleTiles = this.getEnemyVisibleTiles(enemy);
    const coffins = this.floorItems.filter((item) => (
      item.kind === 'coffin'
      && item.ownerId != null
      && visibleTiles.has(`${item.tileX},${item.tileY}`)
    ));
    if (coffins.length === 0) {
      return null;
    }
    coffins.sort((first, second) => (
      Math.max(Math.abs(first.tileX - enemy.tileX), Math.abs(first.tileY - enemy.tileY))
      - Math.max(Math.abs(second.tileX - enemy.tileX), Math.abs(second.tileY - enemy.tileY))
    ));
    return { x: coffins[0].tileX, y: coffins[0].tileY };
  }

  updateEnemySymbolDepth(enemy) {
    enemy.symbolOutline?.setPosition(enemy.sprite.x + 28, enemy.sprite.y - 20)
      .setDepth(enemy.sprite.depth + 0.1);
    enemy.symbol?.setPosition(enemy.sprite.x + 28, enemy.sprite.y - 20)
      .setDepth(enemy.sprite.depth + 0.2);
    enemy.jackieLevelText?.setPosition(enemy.sprite.x + 30, enemy.sprite.y - 10).setDepth(enemy.sprite.depth + 0.3);
    enemy.sleepText?.setDepth(enemy.sprite.depth + 1);
    enemy.confusionText?.setDepth(enemy.sprite.depth + 1);
    enemy.peaceText?.setDepth(enemy.sprite.depth + 1);
    enemy.hasteText?.setDepth(enemy.sprite.depth + 1);
  }

  findCorridorPatrolStep(enemy) {
    if (this.dungeonTiles[enemy.tileY]?.[enemy.tileX] !== CORRIDOR_TILE) {
      return null;
    }

    const directions = [
      { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 },
    ];
    const candidates = directions.map((direction) => ({
      x: enemy.tileX + direction.x,
      y: enemy.tileY + direction.y,
      direction,
    })).filter((candidate) => (
      this.isWalkableTile(this.dungeonTiles[candidate.y]?.[candidate.x])
      && !this.isTileOccupied(candidate.x, candidate.y)
    ));
    if (candidates.length === 0) {
      return null;
    }

    const forwardStep = candidates.find((candidate) => (
      candidate.direction.x === enemy.patrolDirection?.x
      && candidate.direction.y === enemy.patrolDirection?.y
    ));
    const corridorStep = candidates.find((candidate) => (
      this.dungeonTiles[candidate.y][candidate.x] === CORRIDOR_TILE
    ));
    return forwardStep || corridorStep || Phaser.Utils.Array.GetRandom(candidates);
  }

  findAvailablePatrolStep(enemy) {
    const candidates = MOVE_DIRECTIONS.map((direction) => ({
      x: enemy.tileX + direction.x,
      y: enemy.tileY + direction.y,
      direction,
    })).filter((candidate) => (
      this.canEnemyEnterTile(enemy, candidate.x, candidate.y)
      && this.canEnemyPassBetweenTiles(enemy, enemy.tileX, enemy.tileY, candidate.direction.x, candidate.direction.y)
      && !this.isTileOccupied(candidate.x, candidate.y)
    ));
    if (candidates.length === 0) {
      return null;
    }

    const forwardStep = candidates.find((candidate) => (
      candidate.direction.x === enemy.patrolDirection?.x
      && candidate.direction.y === enemy.patrolDirection?.y
    ));
    const corridorStep = candidates.find((candidate) => (
      this.dungeonTiles[candidate.y][candidate.x] === CORRIDOR_TILE
    ));
    return forwardStep || corridorStep || Phaser.Utils.Array.GetRandom(candidates);
  }

  getEnemyTarget(enemy) {
    const visibleTiles = this.getEnemyVisibleTiles(enemy);
    if (visibleTiles.has(`${this.heroTileX},${this.heroTileY}`)) {
      enemy.patrolTarget = null;
      enemy.lastKnownHeroTile = { x: this.heroTileX, y: this.heroTileY };
      enemy.pursuitGraceTurns = ENEMY_PURSUIT_GRACE_TURNS;
      return enemy.lastKnownHeroTile;
    }

    if (enemy.pursuitGraceTurns > 0) {
      enemy.pursuitGraceTurns -= 1;
      enemy.lastKnownHeroTile = { x: this.heroTileX, y: this.heroTileY };
      return enemy.lastKnownHeroTile;
    }

    if (this.isHeroDirectionObvious()) {
      enemy.lastKnownHeroTile = { x: this.heroTileX, y: this.heroTileY };
      return enemy.lastKnownHeroTile;
    }

    if (enemy.lastKnownHeroTile) {
      if (enemy.tileX !== enemy.lastKnownHeroTile.x || enemy.tileY !== enemy.lastKnownHeroTile.y) {
        return enemy.lastKnownHeroTile;
      }
      enemy.lastKnownHeroTile = null;
    }

    if (this.dungeonTiles[enemy.tileY]?.[enemy.tileX] === CORRIDOR_TILE) {
      return null;
    }

    if (!enemy.patrolTarget
      || this.isOccupiedByOtherEnemy(enemy.patrolTarget.x, enemy.patrolTarget.y, enemy)
      || (enemy.tileX === enemy.patrolTarget.x && enemy.tileY === enemy.patrolTarget.y)) {
      const availableTargets = this.corridorTiles.filter((tile) => !this.isTileOccupied(tile.x, tile.y));
      enemy.patrolTarget = Phaser.Utils.Array.GetRandom(availableTargets) || null;
    }
    return enemy.patrolTarget;
  }

  findShortestPathStep(enemy, target) {
    const queue = [{ x: enemy.tileX, y: enemy.tileY, firstStep: null }];
    const visited = new Set([`${enemy.tileX},${enemy.tileY}`]);

    for (let index = 0; index < queue.length; index += 1) {
      const current = queue[index];
      if (current.x === target.x && current.y === target.y) {
        return current.firstStep;
      }

      const diagonalDirection = {
        x: Math.sign(target.x - current.x),
        y: Math.sign(target.y - current.y),
      };
      const directions = diagonalDirection.x !== 0 && diagonalDirection.y !== 0
        ? [
          diagonalDirection,
          ...MOVE_DIRECTIONS.filter((direction) => (
            direction.x !== diagonalDirection.x || direction.y !== diagonalDirection.y
          )),
        ]
        : MOVE_DIRECTIONS;
      for (const direction of directions) {
        const nextX = current.x + direction.x;
        const nextY = current.y + direction.y;
        const key = `${nextX},${nextY}`;
        if (visited.has(key) || !this.canEnemyEnterTile(enemy, nextX, nextY)) {
          continue;
        }
        if (!this.canEnemyPassBetweenTiles(enemy, current.x, current.y, direction.x, direction.y)) {
          continue;
        }
        if (this.isOccupiedByOtherEnemy(nextX, nextY, enemy)) {
          continue;
        }
        visited.add(key);
        queue.push({
          x: nextX,
          y: nextY,
          firstStep: current.firstStep || { x: nextX, y: nextY },
        });
      }
    }

    return null;
  }

  canMoveFrom(tileX, tileY, offsetX, offsetY) {
    if (offsetX === 0 || offsetY === 0) {
      return true;
    }
    return this.isWalkableTile(this.dungeonTiles[tileY]?.[tileX + offsetX])
      && this.isWalkableTile(this.dungeonTiles[tileY + offsetY]?.[tileX]);
  }

  hasCorridorBranch(tileX, tileY) {
    const directions = [
      { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 },
    ];
    return directions.filter((direction) => (
      this.isWalkableTile(this.dungeonTiles[tileY + direction.y]?.[tileX + direction.x])
    )).length >= 3;
  }

  isOccupiedByOtherEnemy(tileX, tileY, currentEnemy) {
    return this.enemies.some((enemy) => (
      enemy !== currentEnemy && enemy.tileX === tileX && enemy.tileY === tileY
    ));
  }

  isEva(enemy) {
    return enemy.specialAbilityId === ENEMY_SKILL_PHASE_THROUGH_WALLS;
  }

  getEnemyVisibleTiles(enemy) {
    const visibleTiles = this.getVisibleTiles(enemy.tileX, enemy.tileY);
    if (!this.isEva(enemy)) {
      return visibleTiles;
    }
    for (let y = enemy.tileY - 30; y <= enemy.tileY + 30; y += 1) {
      for (let x = enemy.tileX - 30; x <= enemy.tileX + 30; x += 1) {
        if (this.dungeonTiles[y]?.[x] !== undefined) {
          visibleTiles.add(`${x},${y}`);
        }
      }
    }
    return visibleTiles;
  }

  canEnemyEnterTile(enemy, tileX, tileY) {
    const tile = this.dungeonTiles[tileY]?.[tileX];
    return tile !== undefined && (this.isWalkableTile(tile) || this.isEva(enemy));
  }

  canEnemyPassBetweenTiles(enemy, tileX, tileY, offsetX, offsetY) {
    return this.isEva(enemy) || this.canMoveFrom(tileX, tileY, offsetX, offsetY);
  }

  canEnemyMoveDiagonally(enemy, offsetX, offsetY) {
    const horizontalTile = this.dungeonTiles[enemy.tileY]?.[enemy.tileX + offsetX];
    const verticalTile = this.dungeonTiles[enemy.tileY + offsetY]?.[enemy.tileX];
    return this.isWalkableTile(horizontalTile) && this.isWalkableTile(verticalTile);
  }

  isTileOccupied(tileX, tileY) {
    return (tileX === this.heroTileX && tileY === this.heroTileY)
      || this.enemies.some((enemy) => enemy.tileX === tileX && enemy.tileY === tileY);
  }

  getEnemyAt(tileX, tileY) {
    return this.enemies.find((enemy) => enemy.tileX === tileX && enemy.tileY === tileY);
  }

  isWalkableTile(tile) {
    return tile === FLOOR_TILE || tile === CORRIDOR_TILE;
  }

  canMoveDiagonally(offsetX, offsetY) {
    if (offsetX === 0 || offsetY === 0) {
      return true;
    }

    const horizontalTile = this.dungeonTiles[this.heroTileY]?.[this.heroTileX + offsetX];
    const verticalTile = this.dungeonTiles[this.heroTileY + offsetY]?.[this.heroTileX];
    return this.isWalkableTile(horizontalTile) && this.isWalkableTile(verticalTile);
  }

}

Object.assign(DungeonTestScene.prototype, InventoryUiBehavior, EnemySystem, EnemyAbilities, TurnSystem);

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  scene: [TitleScene, DungeonTestScene, ResultScene],
};

const startGame = () => new Phaser.Game(config);

if (document.fonts?.load) {
  document.fonts.load('16px "Yusei Magic"').then(startGame, startGame);
} else {
  startGame();
}