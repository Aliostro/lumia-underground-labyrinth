let isZKeyHeld = false;
const SFX_VOLUME_STORAGE_KEY = 'lumia-underground-labyrinth-sfx-volume';
const PLAYER_SKIN_STORAGE_KEY = 'lumia-underground-labyrinth-player-skin';
const DUNGEON_CLEAR_STORAGE_KEY = 'lumia-underground-labyrinth-cleared-dungeons';
const SUSPENDED_RUN_STORAGE_KEY = 'lumia-underground-labyrinth-suspended-run';
const DUNGEON_CLEAR_DISPLAYS = [
  { file: 'dungeon-0001.dat', label: 'ルミア島の地下迷宮 踏破', imageKey: 'dungeon-clear-rul', imageFile: 'IconClearRUL.png' },
  { file: 'dungeon-0003.dat', label: '地下迷宮のさらに先 踏破', imageKey: 'dungeon-clear-lb', imageFile: 'IconClearLB.png' },
  { file: 'dungeon-0002.dat', label: 'ホテル裏の下り階段 踏破', imageKey: 'dungeon-clear-hd', imageFile: 'IconClearHD.png' },
  { file: 'dungeon-0004.dat', label: '港倉庫の秘密通路 踏破', imageKey: 'dungeon-clear-hd-below', imageFile: 'IconClearMSH.png' },
  { file: 'dungeon-0005.dat', label: '花咲き乱れる森 踏破', imageKey: 'dungeon-clear-flower', imageFile: 'IconFlower.png' },
];
const PLAYER_SKINS = [
  { key: 'player-skin-default', file: 'Chara0001.png', label: 'デフォルト' },
  { key: 'player-skin-alternate', file: 'Chara0001a.png', label: 'ブラサバ', unlockDungeonFile: 'dungeon-0001.dat' },
  { key: 'player-skin-detective', file: 'Chara0001b.png', label: '探偵', unlockDungeonFile: 'dungeon-0002.dat' },
];

function saveSuspendedRun(run) {
  try {
    const now = Date.now();
    const elapsedGameTimeMs = Math.max(0, now - (run.playerStatus.runStartedAt ?? now));
    window.localStorage.setItem(SUSPENDED_RUN_STORAGE_KEY, JSON.stringify({ ...run, elapsedGameTimeMs }));
    return true;
  } catch {
    return false;
  }
}

function takeSuspendedRun() {
  try {
    const savedValue = window.localStorage.getItem(SUSPENDED_RUN_STORAGE_KEY);
    window.localStorage.removeItem(SUSPENDED_RUN_STORAGE_KEY);
    const run = JSON.parse(savedValue ?? 'null');
    if (run?.playerStatus && Number.isFinite(run.elapsedGameTimeMs)) {
      run.playerStatus.runStartedAt = Date.now() - Math.max(0, run.elapsedGameTimeMs);
    }
    return run && typeof run === 'object' ? run : null;
  } catch {
    return null;
  }
}

function getSuspendedRun() {
  try {
    const run = JSON.parse(window.localStorage.getItem(SUSPENDED_RUN_STORAGE_KEY) ?? 'null');
    return run && typeof run === 'object' ? run : null;
  } catch {
    return null;
  }
}

function hasSuspendedRun() {
  try {
    return window.localStorage.getItem(SUSPENDED_RUN_STORAGE_KEY) != null;
  } catch {
    return false;
  }
}

function getSfxVolume() {
  try {
    const savedValue = window.localStorage.getItem(SFX_VOLUME_STORAGE_KEY);
    const savedVolume = savedValue === null ? Number.NaN : Number(savedValue);
    if (Number.isFinite(savedVolume)) {
      return Phaser.Math.Clamp(savedVolume, 0, 1);
    }
  } catch {
    // Ignore unavailable browser storage and use the default volume.
  }
  return 0.5;
}

function setSfxVolume(volume) {
  const normalizedVolume = Math.round(Phaser.Math.Clamp(volume, 0, 1) * 10) / 10;
  try {
    window.localStorage.setItem(SFX_VOLUME_STORAGE_KEY, String(normalizedVolume));
  } catch {
    // Keep the in-memory volume when browser storage is unavailable.
  }
  return normalizedVolume;
}

function applySfxVolume(soundManager) {
  soundManager.volume = getSfxVolume();
}

function getClearedDungeonFiles() {
  try {
    const savedValue = window.localStorage.getItem(DUNGEON_CLEAR_STORAGE_KEY);
    const files = JSON.parse(savedValue ?? '[]');
    return new Set(Array.isArray(files) ? files.filter((file) => typeof file === 'string') : []);
  } catch {
    return new Set();
  }
}

function markDungeonCleared(dungeonFile) {
  const clearedFiles = getClearedDungeonFiles();
  const firstClear = !clearedFiles.has(dungeonFile);
  clearedFiles.add(dungeonFile);
  try {
    window.localStorage.setItem(DUNGEON_CLEAR_STORAGE_KEY, JSON.stringify([...clearedFiles]));
  } catch {
    // Keep gameplay functional when browser storage is unavailable.
  }
  return firstClear;
}

function getUnlockedPlayerSkinIndexes() {
  const clearedFiles = getClearedDungeonFiles();
  return PLAYER_SKINS.flatMap((skin, index) => (
    !skin.unlockDungeonFile || clearedFiles.has(skin.unlockDungeonFile) ? [index] : []
  ));
}
      window.showInitialLoadingScreen?.('迷宮を生成中');

function getSkinUnlockedByDungeonClear(dungeonFile) {
  return PLAYER_SKINS.find((skin) => skin.unlockDungeonFile === dungeonFile) ?? null;
}

function markAllDungeonsCleared() {
  DUNGEON_CLEAR_DISPLAYS.forEach(({ file }) => markDungeonCleared(file));
}

function clearAllDungeonClears() {
  try {
    window.localStorage.removeItem(DUNGEON_CLEAR_STORAGE_KEY);
  } catch {
    // Keep gameplay functional when browser storage is unavailable.
  }
}

function isDungeonClearDebugInput(event) {
  return event.shiftKey && !event.altKey && (event.code === 'Backquote' || event.key === '`' || event.key === '~');
}

function isDungeonClearResetDebugInput(event) {
  return event.shiftKey && event.altKey && (event.code === 'Backquote' || event.key === '`' || event.key === '~');
}

function areDebugKeysEnabled(value) {
  return value?.trim().toLowerCase() === 'o';
}

function getPlayerSkinIndex() {
  try {
    const savedIndex = Number(window.localStorage.getItem(PLAYER_SKIN_STORAGE_KEY));
    if (Number.isInteger(savedIndex) && getUnlockedPlayerSkinIndexes().includes(savedIndex)) {
      return savedIndex;
    }
  } catch {
    // Ignore unavailable browser storage and use the default skin.
  }
  return 0;
}

function setPlayerSkinIndex(index) {
  const unlockedSkinIndexes = getUnlockedPlayerSkinIndexes();
  const normalizedIndex = unlockedSkinIndexes.includes(index) ? index : unlockedSkinIndexes[0];
  try {
    window.localStorage.setItem(PLAYER_SKIN_STORAGE_KEY, String(normalizedIndex));
  } catch {
    // Keep the selected skin for the current session when browser storage is unavailable.
  }
  return normalizedIndex;
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyZ') {
    isZKeyHeld = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyZ') {
    isZKeyHeld = false;
  }
});

function waitForFreshZPress(scene, onPress) {
  const keyboard = scene.input.keyboard;
  const handleKeyDown = (event) => {
    if (!event.repeat) {
      onPress();
    }
  };
  const armKeyDown = () => keyboard.once('keydown-Z', handleKeyDown);
  if (isZKeyHeld) {
    keyboard.once('keyup-Z', armKeyDown);
  } else {
    armKeyDown();
  }
  scene.events.once('shutdown', () => {
    keyboard.off('keyup-Z', armKeyDown);
    keyboard.off('keydown-Z', handleKeyDown);
  });
}

class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    this.load.audio('se-beam', 'assets/audio/SEBeam.mp3');
    this.load.audio('se-bomb', 'assets/audio/SEBomb.mp3');
    this.load.audio('se-craft-miss', 'assets/audio/SECraftMiss.mp3');
    this.load.audio('se-craft-ok', 'assets/audio/SECraftOK.mp3');
    this.load.audio('se-cursor-cancel', 'assets/audio/SECursorCancel.mp3');
    this.load.audio('se-cursor-enter', 'assets/audio/SECursorEnter.mp3');
    this.load.audio('se-cursor-move', 'assets/audio/SECursorMove.mp3');
    this.load.audio('se-eat', 'assets/audio/SEEat.mp3');
    this.load.audio('se-enemy-attack', 'assets/audio/SEEnemyAttack.mp3');
    this.load.audio('se-enemy-attack-crit', 'assets/audio/SEEnemyAttackCrit.mp3');
    this.load.audio('se-fire', 'assets/audio/SEFire.mp3');
    this.load.audio('se-get', 'assets/audio/SEGet.mp3');
    this.load.audio('se-gravity', 'assets/audio/SEGravity.mp3');
    this.load.audio('se-kabehori', 'assets/audio/SEKabehori.mp3');
    this.load.audio('se-level-up', 'assets/audio/SELevelUP.mp3');
    this.load.audio('se-long-range-attack', 'assets/audio/SELongRangeAttack.mp3');
    this.load.audio('se-magic', 'assets/audio/SEMagic.mp3');
    this.load.audio('se-miss', 'assets/audio/SEMiss.mp3');
    this.load.audio('se-next-floor', 'assets/audio/SENextFloor.mp3');
    this.load.audio('se-player-attack', 'assets/audio/SEPlayerAttack.mp3');
    this.load.audio('se-pure', 'assets/audio/SEPure.mp3');
    this.load.audio('se-suzu-alert', 'assets/audio/SESuzuAlert.mp3');
    this.load.audio('se-saint-bomb', 'assets/audio/SESaintBomb.mp3');
    this.load.audio('se-sogeki', 'assets/audio/SESogeki.mp3');
    this.load.audio('se-sogeki-ready', 'assets/audio/SESogekiReady.mp3');
    this.load.audio('se-stamp', 'assets/audio/SEStamp.mp3');
    this.load.audio('se-sword', 'assets/audio/SESword.mp3');
    this.load.audio('se-spark', 'assets/audio/SESpark.mp3');
    this.load.audio('se-throw', 'assets/audio/SEThrow.mp3');
    this.load.audio('se-use', 'assets/audio/SEUse.mp3');
    this.load.audio('se-violin', 'assets/audio/SEViolin.mp3');
    this.load.audio('se-wana-set', 'assets/audio/SEWanaSet.mp3');
    this.load.audio('se-lock', 'assets/audio/SELock.mp3');
    this.load.audio('se-water', 'assets/audio/SEWater.mp3');
    this.load.audio('se-warp', 'assets/audio/SEWarp.mp3');
    this.load.audio('se-wind', 'assets/audio/SEWind.mp3');
    this.load.text('version-data', `assets/data/version.txt?v=${Date.now()}`);
    this.load.text('dev-flag-data', `assets/data/dev-flg.dat?v=${Date.now()}`);
    this.load.text('dungeon-data-0001', `assets/data/dungeon-0001.dat?v=${Date.now()}`);
    this.load.text('dungeon-data-0002', `assets/data/dungeon-0002.dat?v=${Date.now()}`);
    this.load.text('dungeon-data-0003', `assets/data/dungeon-0003.dat?v=${Date.now()}`);
    this.load.text('dungeon-data-0004', `assets/data/dungeon-0004.dat?v=${Date.now()}`);
    this.load.text('dungeon-data-0005', `assets/data/dungeon-0005.dat?v=${Date.now()}`);
    this.load.text('item-data', `assets/data/item.csv?v=${Date.now()}`);
    this.load.text('enemy-data', `assets/data/enemy.csv?v=${Date.now()}`);
    this.load.text('enemy-skill-data', `assets/data/enemy-skill.csv?v=${Date.now()}`);
    this.load.text('enemy-book-description-data', `assets/data/enemy-book-desc.csv?v=${Date.now()}`);
    [1, 2, 3, 4, 5, 6].forEach((number) => {
      this.load.spritesheet(`map-chips-${String(number).padStart(4, '0')}`, `assets/image/MapChip${String(number).padStart(4, '0')}.png`, {
        frameWidth: TILE_SIZE,
        frameHeight: TILE_SIZE,
      });
    });
    this.load.image('water', 'assets/image/Water.png');
    this.load.image('bridge', 'assets/image/Bridge.png');
    DUNGEON_CLEAR_DISPLAYS.forEach(({ imageKey, imageFile }) => this.load.image(imageKey, `assets/image/${imageFile}`));
    PLAYER_SKINS.forEach((skin) => this.load.image(skin.key, `assets/image/${skin.file}`));
    EnemyBook.IMAGE_FILES.forEach((file) => this.load.image(file, `assets/image/${file}`));
    EnemyBook.SYMBOL_FILES.forEach((file) => this.load.image(file, `assets/image/${file}`));
    this.load.image('item-icon-sword', 'assets/image/IconSword.png');
    this.load.image('item-icon-bow', 'assets/image/IconBow.png?v=2');
    this.load.image('item-icon-armor', 'assets/image/IconArmor.png');
    this.load.image('item-icon-acce', 'assets/image/IconAcce.png');
    this.load.image('item-icon-food', 'assets/image/IconFood.png');
    this.load.image('item-icon-device', 'assets/image/IconDevice.png');
    this.load.image('item-icon-herb', 'assets/image/IconHerb.png');
    this.load.image('item-icon-recipe', 'assets/image/IconRecipe.png');
    this.load.image('item-icon-junk', 'assets/image/IconJunk.png');
    this.load.image('icon-complete-enemy-book', 'assets/image/IconCompEnemyBook.png');
  }

  createDungeonBackground() {
    const dungeonKey = Phaser.Utils.Array.GetRandom([
      'dungeon-data-0001', 'dungeon-data-0002', 'dungeon-data-0003', 'dungeon-data-0004', 'dungeon-data-0005',
    ]);
    this.backgroundDungeonData = GameData.parseDungeonData(this.cache.text.get(dungeonKey));
    this.backgroundFloor = Phaser.Math.Between(1, this.backgroundDungeonData.maxFloor);
    const design = this.backgroundDungeonData.designMap.get(this.backgroundFloor) ?? {
      mapChipNumber: 1, waterChance: 0, minimumPonds: 0, maximumPonds: 0,
    };
    const dungeon = new DungeonGenerator().generate(design);
    const mapChipNumber = design.mapChipNumber;
    const renderer = new DungeonRenderer(this, {
      tileSize: TILE_SIZE,
      floorTile: FLOOR_TILE,
      corridorTile: CORRIDOR_TILE,
      waterTile: WATER_TILE,
      iceTile: ICE_TILE,
      waterKey: 'water',
      decorationChance: FLOOR_DECORATION_CHANCE,
      chunkSize: MAP_CHUNK_SIZE,
      marginX: OUTER_WALL_MARGIN_X,
      marginY: OUTER_WALL_MARGIN_Y,
      mapChipKey: `map-chips-${String(mapChipNumber).padStart(4, '0')}`,
    });
    renderer.draw(dungeon);
    const backgroundScale = 0.35;
    const mapWidth = dungeon.tiles[0].length * TILE_SIZE;
    const mapHeight = dungeon.tiles.length * TILE_SIZE;
    const offsetX = (GAME_WIDTH - mapWidth * backgroundScale) / 2;
    const offsetY = (GAME_HEIGHT - mapHeight * backgroundScale) / 2;
    renderer.mapChunks.forEach((chunk) => chunk
      .setScale(backgroundScale)
      .setPosition(chunk.x * backgroundScale + offsetX, chunk.y * backgroundScale + offsetY));
    this.placeBackgroundEnemies(dungeon, backgroundScale, offsetX, offsetY);
    this.placeBackgroundItems(dungeon, backgroundScale, offsetX, offsetY);
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x101820, 0.72)
      .setDepth(-0.5);
  }

  placeBackgroundEnemies(dungeon, scale, offsetX, offsetY) {
    const floorEnemies = this.backgroundDungeonData.enemyMap.get(this.backgroundFloor);
    const enemyDefinitions = new Map(GameData.parseEnemyData(this.cache.text.get('enemy-data'))
      .filter((enemy) => this.textures.exists(enemy.imageFile))
      .map((enemy) => [enemy.id, enemy]));
    const entries = floorEnemies?.entries.filter((entry) => enemyDefinitions.has(entry.id)) ?? [];
    this.backgroundMonsterHouseTiles = [];
    if (entries.length === 0) {
      return new Set();
    }
    const availableTiles = dungeon.rooms.flatMap((room) => {
      const tiles = [];
      for (let y = room.y; y < room.y + room.height; y += 1) {
        for (let x = room.x; x < room.x + room.width; x += 1) {
          if ([FLOOR_TILE, CORRIDOR_TILE, ICE_TILE].includes(dungeon.tiles[y]?.[x])) {
            tiles.push({ x, y });
          }
        }
      }
      return tiles;
    });
    const count = Math.min(
      Phaser.Math.Between(floorEnemies.minimumEnemies, floorEnemies.maximumEnemies),
      this.backgroundDungeonData.maxEnemies,
      availableTiles.length,
    );
    Phaser.Utils.Array.Shuffle(availableTiles);
    const occupiedTiles = new Set();
    const placeEnemy = (position) => {
      const enemy = enemyDefinitions.get(this.chooseBackgroundEntry(entries).id);
      this.placeBackgroundSprite(position, enemy.imageFile, scale, offsetX, offsetY, true);
      occupiedTiles.add(`${position.x},${position.y}`);
    };
    for (let index = 0; index < count; index += 1) {
      placeEnemy(availableTiles[index]);
    }
    if (Math.random() * 100 < floorEnemies.monsterHouseChance) {
      const candidates = dungeon.rooms.map((room) => {
        const tiles = availableTiles.filter((tile) => tile.x >= room.x && tile.x < room.x + room.width
          && tile.y >= room.y && tile.y < room.y + room.height);
        const enemyTiles = tiles.filter((tile) => occupiedTiles.has(`${tile.x},${tile.y}`));
        const openTiles = tiles.filter((tile) => !occupiedTiles.has(`${tile.x},${tile.y}`));
        const targetCount = Math.ceil(tiles.length * 0.3);
        return { enemyTiles, openTiles, targetCount };
      }).filter((candidate) => candidate.targetCount > 0
        && occupiedTiles.size - candidate.enemyTiles.length + candidate.targetCount
          <= this.backgroundDungeonData.maxEnemies);
      const house = Phaser.Utils.Array.GetRandom(candidates);
      if (house) {
        const spawnTiles = Phaser.Utils.Array.Shuffle(house.openTiles)
          .slice(0, Math.max(0, house.targetCount - house.enemyTiles.length));
        spawnTiles.forEach(placeEnemy);
        this.backgroundMonsterHouseTiles = [...house.enemyTiles, ...spawnTiles];
      }
    }
    return occupiedTiles;
  }

  placeBackgroundItems(dungeon, scale, offsetX, offsetY) {
    const floorItems = this.backgroundDungeonData.itemMap.get(this.backgroundFloor);
    const itemDefinitions = GameData.parseItemData(this.cache.text.get('item-data'));
    if (!floorItems || itemDefinitions.size === 0) {
      return;
    }
    const entries = floorItems.entries.filter((entry) => itemDefinitions.has(entry.id));
    const availableTiles = dungeon.rooms.flatMap((room) => {
      const tiles = [];
      for (let y = room.y; y < room.y + room.height; y += 1) {
        for (let x = room.x; x < room.x + room.width; x += 1) {
          if ([FLOOR_TILE, CORRIDOR_TILE, ICE_TILE].includes(dungeon.tiles[y]?.[x])) {
            tiles.push({ x, y });
          }
        }
      }
      return tiles;
    });
    const count = Phaser.Math.Between(floorItems.minimumItems, floorItems.maximumItems);
    Phaser.Utils.Array.Shuffle(availableTiles);
    const itemTiles = new Set();
    const placeItem = (position, entry) => {
      const item = itemDefinitions.get(entry?.id);
      if (!position || !item) return;
      const iconKey = ITEM_ICON_KEYS[item.category] || ITEM_ICON_KEYS[90];
      this.placeBackgroundSprite(position, iconKey, scale, offsetX, offsetY, false);
      itemTiles.add(`${position.x},${position.y}`);
    };
    const guaranteedId = Phaser.Utils.Array.GetRandom(floorItems.guaranteedItemIds);
    if (guaranteedId != null) {
      placeItem(availableTiles.pop(), { id: guaranteedId });
    }
    for (let index = 0; index < count && availableTiles.length > 0; index += 1) {
      placeItem(availableTiles.pop(), this.chooseBackgroundEntry(entries));
    }
    if (floorItems.recipeDropEnabled) {
      const registeredIds = RecipeBook.getRegisteredIds();
      const recipes = [...itemDefinitions.values()].filter((item) => item.category === 80);
      const recipeCount = Math.max(
        Phaser.Math.Between(floorItems.minimumRecipeItems, floorItems.maximumRecipeItems),
        recipes.some((item) => !registeredIds.has(item.id)) ? 1 : 0,
      );
      const spawnedIds = new Set();
      for (let index = 0; index < recipeCount && availableTiles.length > 0; index += 1) {
        let candidates = recipes.filter((item) => !spawnedIds.has(item.id));
        if (index === 0 && candidates.some((item) => !registeredIds.has(item.id))) {
          candidates = candidates.filter((item) => !registeredIds.has(item.id));
        }
        const entry = this.chooseBackgroundEntry(candidates.map((item) => ({
          id: item.id, weight: registeredIds.has(item.id) ? 2 : 8,
        })));
        if (!entry) break;
        placeItem(availableTiles.pop(), entry);
        spawnedIds.add(entry.id);
      }
    }
    for (const position of this.backgroundMonsterHouseTiles) {
      if (!itemTiles.has(`${position.x},${position.y}`)) {
        placeItem(position, this.chooseBackgroundEntry(entries));
      }
    }
  }

  chooseBackgroundEntry(entries) {
    const totalWeight = entries.reduce((total, entry) => total + entry.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const entry of entries) {
      roll -= entry.weight;
      if (roll < 0) return entry;
    }
    return entries.at(-1) ?? null;
  }

  placeBackgroundSprite(position, key, scale, offsetX, offsetY, isEnemy) {
    const x = offsetX + (position.x + 0.5) * TILE_SIZE * scale;
    const y = offsetY + (position.y + (isEnemy ? 1 : 0.5)) * TILE_SIZE * scale;
    this.add.ellipse(
      x, y + (isEnemy ? -8 : 12) * scale,
      (isEnemy ? 48 : 28) * scale, (isEnemy ? 16 : 10) * scale,
      0x000000, 0.28,
    ).setDepth(-0.9);
    const size = (isEnemy ? ENEMY_DISPLAY_SIZE : 40) * scale;
    this.add.image(x, y, key).setOrigin(0.5, isEnemy ? 1 : 0.5)
      .setDisplaySize(size, size).setDepth(isEnemy ? -0.75 : -0.7);
  }

  create() {
    applySfxVolume(this.sound);
    this.debugKeysEnabled = areDebugKeysEnabled(this.cache.text.get('dev-flag-data'));
    this.cameras.main.setBackgroundColor('#101820');
    this.createDungeonBackground();
    this.titleText = this.add.text(GAME_WIDTH / 2, 190, 'ルミア島の地下迷宮', {
      fontFamily: '"Yusei Magic", sans-serif',
      fontSize: '56px',
      color: '#f3f1e8',
      stroke: '#05080c',
      strokeThickness: 8,
    }).setOrigin(0.5);
    const titleFontLoad = document.fonts?.load(
      '56px "Yusei Magic"',
      'ルミア島の地下迷宮踏破ホテル裏の下り階段レシピ図鑑完成実験体',
    );
    titleFontLoad?.then(() => this.refreshTitleFonts());
    this.titleFontLoadingHandler = () => this.refreshTitleFonts();
    document.fonts?.addEventListener('loadingdone', this.titleFontLoadingHandler);
    this.events.once('shutdown', () => {
      document.fonts?.removeEventListener('loadingdone', this.titleFontLoadingHandler);
    });
    this.add.text(GAME_WIDTH - 24, GAME_HEIGHT - 22, `ver. ${this.cache.text.get('version-data')?.trim() || '0.0.0'}`, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '18px',
      color: '#9ab5c7',
    }).setOrigin(1, 1);
    this.dungeonTextDisplay = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 8, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
      stroke: '#05080c',
      strokeThickness: 3,
      align: 'center',
      lineSpacing: 2,
      maxLines: 2,
      wordWrap: { width: GAME_WIDTH - 320, useAdvancedWrap: true },
    }).setOrigin(0.5, 1);
    this.createDungeonClearDisplays();
    this.add.text(GAME_WIDTH / 2, 315, 'メニュー', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '24px',
      color: '#9ab5c7',
    }).setOrigin(0.5);
    this.itemDefinitions = GameData.parseItemData(this.cache.text.get('item-data'));
    this.enemyDefinitions = GameData.parseEnemyData(this.cache.text.get('enemy-data'));
    this.enemyBookDescriptions = GameData.parseEnemyBookDescriptionData(this.cache.text.get('enemy-book-description-data'));
    this.createCompletionTitleDisplays();
    const dungeonOptions = [
      { key: 'dungeon-data-0001', file: 'dungeon-0001.dat' },
      { key: 'dungeon-data-0002', file: 'dungeon-0002.dat' },
      { key: 'dungeon-data-0003', file: 'dungeon-0003.dat' },
      { key: 'dungeon-data-0004', file: 'dungeon-0004.dat' },
      { key: 'dungeon-data-0005', file: 'dungeon-0005.dat' },
    ].map((option) => ({
      ...option,
      data: GameData.parseDungeonData(this.cache.text.get(option.key)),
    }));
    const startDungeon = (option, parallelCode = createParallelCode(Number(option.file.match(/\d+/)?.[0]))) => {
      this.sound.play('se-cursor-enter');
      this.scene.start('DungeonTestScene', {
        newRun: true,
        dungeonDataKey: option.key,
        dungeonDataFile: option.file,
        parallelCode,
        playerSkinIndex: getPlayerSkinIndex(),
      });
    };
    this.startDungeon = startDungeon;
    this.dungeonOptions = dungeonOptions;
    this.recipeBook = new RecipeBook(this, this.itemDefinitions, 20);
    this.enemyBook = new EnemyBook(this, this.enemyDefinitions, this.enemyBookDescriptions, 20);
    const isDungeon0003Unlocked = getClearedDungeonFiles().has('dungeon-0001.dat');
    const mainMenuItems = [0, 2, 1, 3, 4].map((index, row) => {
      const option = dungeonOptions[index];
      const disabled = option.file === 'dungeon-0003.dat' && !isDungeon0003Unlocked;
      return this.createTitleMenuItem(GAME_WIDTH / 2, 394 + row * 76, disabled ? '???' : option.data.dungeonName, () => {
        if (!disabled) {
          startDungeon(option);
        }
      }, disabled ? '' : option.data.dungeonDescription ?? '', {
        height: 70, fontSize: 26, disabled, dungeonText: disabled ? '' : option.data.dungeonText,
      });
    });
    const bookMenuItems = [
      this.createTitleMenuItem(1060, 420, 'レシピ図鑑', () => this.openRecipeBook(), '', { width: 280, height: 64, fontSize: 24 }),
      this.createTitleMenuItem(1060, 508, '実験体図鑑', () => this.openEnemyBook(), '', { width: 280, height: 64, fontSize: 24 }),
      this.createTitleMenuItem(1060, 596, 'オプション', () => this.openOptionsMenu(), '', { width: 280, height: 64, fontSize: 24 }),
    ];
    const suspendedRun = getSuspendedRun();
    const suspendedDungeon = dungeonOptions.find((option) => option.key === suspendedRun?.dungeonDataKey);
    const canResume = suspendedDungeon != null && suspendedRun?.playerStatus != null;
    const resume = () => {
      if (!canResume) {
        return;
      }
      this.openResumeConfirmation();
    };
    this.resumeSuspendedRun = () => {
      const run = takeSuspendedRun();
      if (!run?.dungeonDataKey || !run?.dungeonDataFile || !run?.playerStatus) {
        return;
      }
      window.showInitialLoadingScreen?.('中断した迷宮を復元中');
      this.scene.start('DungeonTestScene', {
        dungeonDataKey: run.dungeonDataKey,
        dungeonDataFile: run.dungeonDataFile,
        parallelCode: run.parallelCode,
        playerSkinIndex: run.playerSkinIndex,
        playerStatus: run.playerStatus,
        suspendedState: run.suspendedState,
      });
    };
    const resumeMenuItems = [this.createTitleMenuItem(
      184,
      414,
      '中断データから開始',
      resume,
      '',
      { width: 320, height: 42, fontSize: 20, disabled: !canResume },
    )];
    this.add.text(184, 452, canResume ? `${suspendedDungeon.data.dungeonName} B${suspendedRun.playerStatus.floor}F` : '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#b7c6d3',
    }).setOrigin(0.5);
    this.titleMenuColumns = [resumeMenuItems, mainMenuItems, bookMenuItems];
    this.titleMenuItems = this.titleMenuColumns.flat();
    this.titleMenuColumns.forEach((items, column) => items.forEach((item, row) => {
      item.column = column;
      item.row = row;
    }));
    this.titleDungeonVisibleCount = 4;
    this.titleDungeonScrollOffset = 0;
    this.dungeonScrollTrack = this.add.rectangle(GAME_WIDTH / 2 + 230, 393, 18, 230, 0x101820)
      .setOrigin(0.5, 0).setStrokeStyle(1, 0x6e8996).setInteractive({ useHandCursor: true });
    this.dungeonScrollThumb = this.add.rectangle(GAME_WIDTH / 2 + 230, 393, 14, 230, 0xb7c6d3)
      .setOrigin(0.5, 0).setInteractive({ useHandCursor: true });
    this.input.setDraggable(this.dungeonScrollThumb);
    this.dungeonScrollTrack.on('pointerdown', (pointer) => {
      this.scrollTitleDungeons(pointer.y < this.dungeonScrollThumb.y ? -1 : 1);
    });
    this.dungeonScrollThumb.on('pointerover', () => this.dungeonScrollThumb.setFillStyle(0xffdc4a));
    this.dungeonScrollThumb.on('pointerout', () => this.dungeonScrollThumb.setFillStyle(0xb7c6d3));
    this.dungeonScrollThumb.on('drag', (pointer, dragX, dragY) => {
      const maximumOffset = this.titleMenuColumns[1].length - this.titleDungeonVisibleCount;
      const travel = this.dungeonScrollTrack.height - this.dungeonScrollThumb.displayHeight;
      if (maximumOffset <= 0 || travel <= 0) {
        return;
      }
      const ratio = Phaser.Math.Clamp((dragY - this.dungeonScrollTrack.y) / travel, 0, 1);
      const offset = Math.round(ratio * maximumOffset);
      this.scrollTitleDungeons(offset - this.titleDungeonScrollOffset);
    });
    this.dungeonScrollUp = this.add.text(GAME_WIDTH / 2 + 230, 375, '▲', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '20px', color: '#ffdc4a',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.dungeonScrollDown = this.add.text(GAME_WIDTH / 2 + 230, 641, '▼', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '20px', color: '#ffdc4a',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.dungeonScrollUp.on('pointerdown', () => this.scrollTitleDungeons(-1));
    this.dungeonScrollDown.on('pointerdown', () => this.scrollTitleDungeons(1));
    this.titleSelectionColumn = 1;
    this.titleSelectionRow = 0;
    this.updateTitleMenuSelection();
    this.createParallelControls(startDungeon, dungeonOptions);
    this.createResumeConfirmationUi();
    this.add.text(GAME_WIDTH / 2, 736, '十字キー: 選択    Zキー: 決定', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '22px',
      color: '#f3f1e8',
    }).setOrigin(0.5);
    this.onTitleKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      if (this.resumeConfirmationUi?.visible) {
        this.handleResumeConfirmationInput(event.code);
        return;
      }
      if (this.optionWindowVisible) {
        this.handleOptionsInput(event.code);
        return;
      }
      if (this.recipeBook.container.visible) {
        if (this.recipeBook.handleInput(event.code)) {
          this.sound.play(event.code === 'KeyZ' ? 'se-cursor-enter' : ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyC'].includes(event.code) ? 'se-cursor-move' : 'se-cursor-cancel');
        }
        return;
      }
      if (this.enemyBook.container.visible) {
        if (this.enemyBook.handleInput(event.code)) {
          this.sound.play(event.code === 'KeyZ' ? 'se-cursor-enter' : ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code) ? 'se-cursor-move' : 'se-cursor-cancel');
        }
        return;
      }
      if (this.parallelCodeInputFocused && this.handleParallelCodeInput(event)) {
        return;
      }
      if (this.debugKeysEnabled && event.shiftKey && event.altKey && event.code === 'Semicolon') {
        RecipeBook.clearRegisteredIds();
        this.createCompletionTitleDisplays();
        this.sound.play('se-cursor-cancel');
      } else if (this.debugKeysEnabled && event.shiftKey && event.altKey && event.code === 'Quote') {
        EnemyBook.clearRegisteredIds();
        this.createCompletionTitleDisplays();
        this.sound.play('se-cursor-cancel');
      } else if (this.debugKeysEnabled && event.shiftKey && event.code === 'Semicolon') {
        this.itemDefinitions.forEach((definition) => {
          if (definition.category === 80) {
            RecipeBook.register(definition.id);
          }
        });
        this.createCompletionTitleDisplays();
        this.sound.play('se-cursor-enter');
      } else if (this.debugKeysEnabled && event.shiftKey && event.code === 'Quote') {
        this.enemyDefinitions.forEach((definition) => EnemyBook.register(definition.id));
        this.createCompletionTitleDisplays();
        this.sound.play('se-cursor-enter');
      } else if (this.debugKeysEnabled && isDungeonClearResetDebugInput(event)) {
        clearAllDungeonClears();
        this.createDungeonClearDisplays();
        this.sound.play('se-cursor-cancel');
      } else if (this.debugKeysEnabled && isDungeonClearDebugInput(event)) {
        markAllDungeonsCleared();
        this.createDungeonClearDisplays();
        this.sound.play('se-cursor-enter');
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        this.moveTitleMenuSelection(event.code);
        this.sound.play('se-cursor-move');
        this.updateTitleMenuSelection();
      } else if (event.code === 'KeyZ' || event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        this.getSelectedTitleMenuItem().action();
      }
    };
    this.onTitleWheel = (pointer, gameObjects, deltaX, deltaY) => {
      if (pointer.x >= GAME_WIDTH / 2 - 210 && pointer.x <= GAME_WIDTH / 2 + 250
        && pointer.y >= 359 && pointer.y <= 657 && deltaY !== 0) {
        this.scrollTitleDungeons(deltaY > 0 ? 1 : -1);
      }
    };
    this.input.on('wheel', this.onTitleWheel);
    this.input.keyboard.on('keydown', this.onTitleKeyDown);
    this.events.once('shutdown', () => {
      this.input.off('wheel', this.onTitleWheel);
      this.input.keyboard.off('keydown', this.onTitleKeyDown);
    });
    window.requestAnimationFrame(() => {
      window.hideInitialLoadingScreen?.();
    });
  }

  createDungeonClearDisplays() {
    this.dungeonClearDisplayObjects?.forEach((object) => object.destroy());
    const clearedFiles = getClearedDungeonFiles();
    this.dungeonClearDisplayObjects = DUNGEON_CLEAR_DISPLAYS
      .flatMap(({ file, label: clearLabel, imageKey }, index) => {
        const y = 28 + index * 42;
        const cleared = clearedFiles.has(file);
        const crown = this.createTitleCrown(y, cleared ? 0x3f3108 : 0x000000);
        if (!cleared) {
          return [crown];
        }
        const icon = this.add.image(GAME_WIDTH - 24, y, imageKey)
          .setDisplaySize(32, 32).setOrigin(1, 0.5);
        const label = this.add.text(GAME_WIDTH - 80, y, clearLabel, {
          fontFamily: 'Yusei Magic, sans-serif',
          fontSize: '18px',
          color: '#f3f1e8',
          stroke: '#05080c',
          strokeThickness: 3,
        }).setOrigin(1, 0.5);
        return [crown, label, icon];
      });
  }

  refreshTitleFonts() {
    this.children.list.forEach((child) => {
      if (child.type === 'Text' && child.style.fontFamily.includes('Yusei Magic')) {
        child.setFontFamily('sans-serif');
        child.setFontFamily('Yusei Magic, sans-serif');
        child.setText(child.text);
      }
    });
    if (this.titleMenuItems?.length) {
      this.updateTitleMenuSelection();
    }
  }

  createTitleCrown(y, color) {
    const crown = this.add.graphics();
    crown.fillStyle(color, 0.9);
    crown.beginPath();
    crown.moveTo(GAME_WIDTH - 64, y + 11);
    crown.lineTo(GAME_WIDTH - 62, y - 16);
    crown.lineTo(GAME_WIDTH - 53, y - 4);
    crown.lineTo(GAME_WIDTH - 40, y - 20);
    crown.lineTo(GAME_WIDTH - 27, y - 4);
    crown.lineTo(GAME_WIDTH - 18, y - 16);
    crown.lineTo(GAME_WIDTH - 16, y + 11);
    crown.closePath();
    crown.fillPath();
    crown.fillRect(GAME_WIDTH - 64, y + 8, 48, 7);
    return crown;
  }

  createCompletionTitleDisplays() {
    this.completionTitleDisplayObjects?.forEach((object) => object.destroy());
    const recipeIds = [...this.itemDefinitions.values()]
      .filter((definition) => definition.category === 80)
      .map((definition) => definition.id);
    const registeredRecipeIds = RecipeBook.getRegisteredIds();
    const registeredEnemyIds = EnemyBook.getRegisteredIds();
    const titles = [
      {
        label: 'レシピ図鑑 完成',
        imageKey: 'item-icon-recipe',
        complete: recipeIds.length > 0 && recipeIds.every((id) => registeredRecipeIds.has(id)),
      },
      {
        label: '実験体図鑑 完成',
        imageKey: 'icon-complete-enemy-book',
        complete: this.enemyDefinitions.length > 0
          && this.enemyDefinitions.every((definition) => registeredEnemyIds.has(definition.id)),
      },
    ];
    this.completionTitleDisplayObjects = titles
      .flatMap(({ label, imageKey, complete }, index) => {
        const y = 28 + (DUNGEON_CLEAR_DISPLAYS.length + index) * 42;
        const crown = this.createTitleCrown(y, complete ? 0x3f3108 : 0x000000);
        if (!complete) {
          return [crown];
        }
        const icon = this.add.image(GAME_WIDTH - 24, y, imageKey)
          .setDisplaySize(32, 32).setOrigin(1, 0.5);
        const text = this.add.text(GAME_WIDTH - 80, y, label, {
          fontFamily: 'Yusei Magic, sans-serif',
          fontSize: '18px',
          color: '#f3f1e8',
          stroke: '#05080c',
          strokeThickness: 3,
        }).setOrigin(1, 0.5);
        return [crown, text, icon];
      });
  }

  createParallelControls(startDungeon, dungeonOptions) {
    const x = 184;
    this.parallelCodeInputValue = '';
    this.parallelCodeInputFocused = false;
    this.add.text(x, 486, 'パラレルプレイコード', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '18px',
      color: '#f3f1e8',
    }).setOrigin(0.5);
    this.parallelCodeInputBackground = this.add.rectangle(x, 522, 320, 42, 0x182831)
      .setStrokeStyle(2, 0x6e8996)
      .setInteractive({ useHandCursor: true });
    this.parallelCodeInputText = this.add.text(x - 148, 522, '例: 1A2B3C4D', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#9ab5c7',
    }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
    this.parallelStartBackground = this.add.rectangle(x, 574, 320, 42, 0x384d58)
      .setStrokeStyle(2, 0x6e8996)
      .setInteractive({ useHandCursor: true });
    this.parallelStartText = this.add.text(x, 574, 'パラレルスタート', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.parallelCodeMessage = this.add.text(x, 608, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '14px',
      color: '#df5b62',
      align: 'center',
      wordWrap: { width: 320 },
    }).setOrigin(0.5, 0);
    const focusInput = () => {
      if (this.isTitleWindowOpen()) {
        return;
      }
      this.parallelCodeInputFocused = true;
      this.updateParallelCodeInput();
    };
    this.parallelCodeInputBackground.on('pointerdown', focusInput);
    this.parallelCodeInputText.on('pointerdown', focusInput);
    const start = () => this.startParallelPlay(startDungeon, dungeonOptions);
    this.parallelStartBackground.on('pointerdown', start);
    this.parallelStartText.on('pointerdown', start);
    this.parallelStartBackground.on('pointerover', () => this.parallelStartBackground.setStrokeStyle(2, 0xffdc4a));
    this.parallelStartBackground.on('pointerout', () => this.parallelStartBackground.setStrokeStyle(2, 0x6e8996));
  }

  handleParallelCodeInput(event) {
    if (event.code === 'Escape') {
      this.parallelCodeInputFocused = false;
    } else if (event.code === 'Backspace') {
      this.parallelCodeInputValue = this.parallelCodeInputValue.slice(0, -1);
    } else if (event.code === 'Enter') {
      this.startParallelPlay(this.startDungeon, this.dungeonOptions);
      return true;
    } else if (/^[0-9A-F]$/i.test(event.key) && this.parallelCodeInputValue.length < 8) {
      this.parallelCodeInputValue += event.key.toUpperCase();
    } else {
      return false;
    }
    this.parallelCodeMessage.setText('');
    this.updateParallelCodeInput();
    return true;
  }

  updateParallelCodeInput() {
    const hasValue = this.parallelCodeInputValue.length > 0;
    this.parallelCodeInputText.setText(hasValue ? this.parallelCodeInputValue : '例: 1A2B3C4D');
    this.parallelCodeInputText.setColor(hasValue ? '#f3f1e8' : '#9ab5c7');
    this.parallelCodeInputBackground.setStrokeStyle(2, this.parallelCodeInputFocused ? 0xffdc4a : 0x6e8996);
  }

  startParallelPlay(startDungeon, dungeonOptions) {
    if (this.isTitleWindowOpen()) {
      return;
    }
    const parallelRun = parseParallelCode(this.parallelCodeInputValue);
    if (!parallelRun) {
      this.parallelCodeMessage.setText('1から5で始まる8桁の16進数を入力してください。');
      return;
    }
    const option = dungeonOptions.find((candidate) => candidate.key === parallelRun.dungeonDataKey);
    if (!option) {
      this.parallelCodeMessage.setText('対応していないダンジョンです。');
      return;
    }
    startDungeon(option, parallelRun.code);
  }

  isTitleWindowOpen() {
    return this.resumeConfirmationUi?.visible
      || this.optionWindowVisible
      || this.recipeBook?.container.visible
      || this.enemyBook?.container.visible;
  }

  createResumeConfirmationUi() {
    const panelWidth = 640;
    const panelHeight = 250;
    const panelX = (GAME_WIDTH - panelWidth) / 2;
    const panelY = (GAME_HEIGHT - panelHeight) / 2;
    const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.62);
    const panel = this.add.graphics();
    panel.fillStyle(0x101820, 0.98);
    panel.fillRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
    panel.lineStyle(2, 0xd9b85a, 1);
    panel.strokeRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
    const message = this.add.text(GAME_WIDTH / 2, panelY + 54, '中断データから再開します。', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '22px', color: '#f3f1e8', align: 'center',
    }).setOrigin(0.5);
    const warning = this.add.text(GAME_WIDTH / 2, panelY + 92, '再開後この中断データは削除されます。', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '22px', color: '#ff7b7b', align: 'center',
    }).setOrigin(0.5);
    this.resumeConfirmationGraphics = this.add.graphics();
    this.resumeConfirmationTexts = ['はい', 'いいえ'].map((label, index) => this.add.text(
      panelX + 205 + index * 230, panelY + 190, label,
      { fontFamily: 'Yusei Magic, sans-serif', fontSize: '24px', color: '#f3f1e8' },
    ).setOrigin(0.5));
    this.resumeConfirmationUi = this.add.container(0, 0, [
      overlay, panel, message, warning, this.resumeConfirmationGraphics, ...this.resumeConfirmationTexts,
    ]).setScrollFactor(0).setDepth(20).setVisible(false);
    this.resumeConfirmationIndex = 0;
  }

  openResumeConfirmation() {
    this.resumeConfirmationIndex = 0;
    this.refreshResumeConfirmation();
    this.resumeConfirmationUi.setVisible(true);
    this.sound.play('se-cursor-enter');
  }

  closeResumeConfirmation() {
    this.resumeConfirmationUi.setVisible(false);
  }

  refreshResumeConfirmation() {
    const panelX = (GAME_WIDTH - 640) / 2;
    const panelY = (GAME_HEIGHT - 250) / 2;
    this.resumeConfirmationGraphics.clear();
    this.resumeConfirmationTexts.forEach((text, index) => {
      const selected = index === this.resumeConfirmationIndex;
      this.resumeConfirmationGraphics.fillStyle(selected ? 0x384d58 : 0x101820, 1);
      this.resumeConfirmationGraphics.fillRect(panelX + 130 + index * 230, panelY + 170, 150, 40);
      text.setColor(selected ? '#ffdc4a' : '#f3f1e8');
    });
  }

  handleResumeConfirmationInput(code) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(code)) {
      this.resumeConfirmationIndex = 1 - this.resumeConfirmationIndex;
      this.refreshResumeConfirmation();
      this.sound.play('se-cursor-move');
    } else if (code === 'KeyZ' || code === 'Enter' || code === 'Space') {
      this.sound.play('se-cursor-enter');
      if (this.resumeConfirmationIndex === 0) {
        this.resumeSuspendedRun();
      } else {
        this.closeResumeConfirmation();
      }
    } else if (code === 'KeyX' || code === 'Escape') {
      this.closeResumeConfirmation();
      this.sound.play('se-cursor-cancel');
    }
  }

  createTitleMenuItem(x, y, label, action, subtitle = '', options = {}) {
    const { width = 420, height = 84, fontSize = 30, disabled = false, dungeonText = '' } = options;
    const background = this.add.rectangle(x, y, width, height, disabled ? 0x000000 : 0x384d58)
      .setStrokeStyle(2, disabled ? 0x000000 : 0x6e8996);
    const text = this.add.text(x, y + (subtitle ? -12 : 0), label, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: `${fontSize}px`,
      color: disabled ? '#9ab5c7' : '#f3f1e8',
    }).setOrigin(0.5);
    const subtitleText = subtitle ? this.add.text(x, y + 20, subtitle, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#b7c6d3',
    }).setOrigin(0.5).setResolution(2) : null;
    if (disabled) {
      return { background, text, subtitleText, action, disabled, dungeonText };
    }
    background.setInteractive({ useHandCursor: true });
    text.setInteractive({ useHandCursor: true });
    subtitleText?.setInteractive({ useHandCursor: true });
    const selectItem = () => {
      const item = this.titleMenuItems.find((candidate) => candidate.background === background);
      this.titleSelectionColumn = item.column;
      this.titleSelectionRow = item.row;
      this.updateTitleMenuSelection();
    };
    background.on('pointerover', selectItem);
    text.on('pointerover', selectItem);
    subtitleText?.on('pointerover', selectItem);
    const handlePointerDown = () => {
      if (this.isTitleWindowOpen()) {
        return;
      }
      action();
    };
    background.on('pointerdown', handlePointerDown);
    text.on('pointerdown', handlePointerDown);
    subtitleText?.on('pointerdown', handlePointerDown);
    return { background, text, subtitleText, action, disabled, dungeonText };
  }

  updateTitleMenuSelection() {
    this.updateTitleDungeonScroll();
    const dungeonText = this.getSelectedTitleMenuItem().dungeonText;
    let fontSize = 20;
    this.dungeonTextDisplay.setWordWrapWidth(GAME_WIDTH - 320, true)
      .setFontSize(fontSize).setText(dungeonText).setVisible(Boolean(dungeonText));
    while (fontSize > 1 && this.dungeonTextDisplay.getWrappedText().length > 2) {
      fontSize -= 1;
      this.dungeonTextDisplay.setFontSize(fontSize);
    }
    const wrappedText = this.dungeonTextDisplay.getWrappedText().join('\n');
    this.dungeonTextDisplay.setWordWrapWidth(0).setText(wrappedText);
    while (fontSize > 1 && this.dungeonTextDisplay.height > 46) {
      fontSize -= 1;
      this.dungeonTextDisplay.setFontSize(fontSize);
    }
    this.titleMenuItems.forEach((item) => {
      const selected = item.column === this.titleSelectionColumn && item.row === this.titleSelectionRow;
      if (item.disabled) {
        item.background.setFillStyle(selected ? 0x182831 : 0x101820);
        item.background.setStrokeStyle(2, selected ? 0xffdc4a : 0x273946);
        item.text.setColor(selected ? '#9ab5c7' : '#64717b');
        item.subtitleText?.setColor('#64717b');
        return;
      }
      item.background.setFillStyle(selected ? 0x4d6875 : 0x384d58);
      item.background.setStrokeStyle(2, selected ? 0xffdc4a : 0x6e8996);
      item.text.setColor(selected ? '#ffdc4a' : '#f3f1e8');
      item.subtitleText?.setColor(selected ? '#ffdc4a' : '#b7c6d3');
    });
  }

  getSelectedTitleMenuItem() {
    return this.titleMenuColumns[this.titleSelectionColumn][this.titleSelectionRow];
  }

  updateTitleDungeonScroll() {
    const items = this.titleMenuColumns[1];
    const count = this.titleDungeonVisibleCount;
    if (this.titleSelectionColumn === 1) {
      if (this.titleSelectionRow < this.titleDungeonScrollOffset) {
        this.titleDungeonScrollOffset = this.titleSelectionRow;
      } else if (this.titleSelectionRow >= this.titleDungeonScrollOffset + count) {
        this.titleDungeonScrollOffset = this.titleSelectionRow - count + 1;
      }
    }
    items.forEach((item, row) => {
      const visible = row >= this.titleDungeonScrollOffset && row < this.titleDungeonScrollOffset + count;
      const y = 394 + (row - this.titleDungeonScrollOffset) * 76;
      item.background.setY(y).setVisible(visible);
      item.text.setY(y + (item.subtitleText ? -12 : 0)).setVisible(visible);
      item.subtitleText?.setY(y + 20).setVisible(visible);
    });
    const maximumOffset = Math.max(0, items.length - count);
    const scrollable = maximumOffset > 0;
    const thumbHeight = Math.max(32, this.dungeonScrollTrack.height * Math.min(1, count / items.length));
    const thumbY = this.dungeonScrollTrack.y
      + (this.dungeonScrollTrack.height - thumbHeight) * this.titleDungeonScrollOffset / (maximumOffset || 1);
    this.dungeonScrollTrack.setVisible(scrollable);
    this.dungeonScrollThumb.setDisplaySize(14, thumbHeight).setY(thumbY).setVisible(scrollable);
    this.dungeonScrollUp.setVisible(scrollable).setColor(this.titleDungeonScrollOffset > 0 ? '#ffdc4a' : '#64717b');
    this.dungeonScrollDown.setVisible(scrollable).setColor(this.titleDungeonScrollOffset < maximumOffset ? '#ffdc4a' : '#64717b');
  }

  scrollTitleDungeons(direction) {
    if (this.isTitleWindowOpen() || this.parallelCodeInputFocused) {
      return;
    }
    const items = this.titleMenuColumns[1];
    const offset = Phaser.Math.Clamp(this.titleDungeonScrollOffset + direction, 0,
      Math.max(0, items.length - this.titleDungeonVisibleCount));
    if (offset === this.titleDungeonScrollOffset) {
      return;
    }
    let row = direction > 0 ? offset + this.titleDungeonVisibleCount - 1 : offset;
    while (items[row]?.disabled) {
      row -= Math.sign(direction);
    }
    this.titleDungeonScrollOffset = offset;
    this.titleSelectionColumn = 1;
    this.titleSelectionRow = row;
    this.updateTitleMenuSelection();
    this.sound.play('se-cursor-move');
  }

  moveTitleMenuSelection(code) {
    if (code === 'ArrowUp' || code === 'ArrowDown') {
      const items = this.titleMenuColumns[this.titleSelectionColumn];
      const direction = code === 'ArrowUp' ? -1 : 1;
      for (let offset = 1; offset <= items.length; offset += 1) {
        const row = (this.titleSelectionRow + direction * offset + items.length) % items.length;
        if (!items[row].disabled) {
          this.titleSelectionRow = row;
          return;
        }
      }
      return;
    }
    const column = (this.titleSelectionColumn + (code === 'ArrowLeft' ? -1 : 1) + this.titleMenuColumns.length)
      % this.titleMenuColumns.length;
    const row = Math.min(this.titleSelectionRow, this.titleMenuColumns[column].length - 1);
    if (!this.titleMenuColumns[column][row].disabled) {
      this.titleSelectionColumn = column;
      this.titleSelectionRow = row;
    }
  }

  openOptionsMenu() {
    this.sound.play('se-cursor-enter');
    this.optionWindowVisible = true;
    const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.62)
      .setDepth(10);
    const panel = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 800, 460, 0x182831, 0.98)
      .setStrokeStyle(2, 0xffdc4a)
      .setDepth(11);
    const title = this.add.text(GAME_WIDTH / 2, 240, 'オプション', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '32px',
      color: '#ffdc4a',
    }).setOrigin(0.5).setDepth(12);
    const label = this.add.text(460, 340, 'SE音量', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '26px',
      color: '#f3f1e8',
    }).setOrigin(1, 0.5).setDepth(12);
    this.optionVolumeTrack = this.add.rectangle(490, 340, 340, 16, 0x0b1217)
      .setOrigin(0, 0.5).setDepth(12);
    this.optionVolumeFill = this.add.rectangle(490, 340, 1, 16, 0x76d7ea)
      .setOrigin(0, 0.5).setDepth(13);
    this.optionVolumeValue = this.add.text(865, 340, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '24px',
      color: '#f3f1e8',
    }).setOrigin(0, 0.5).setDepth(12);
    this.optionSkinLabel = this.add.text(460, 440, 'プレイヤースキン', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '26px',
      color: '#f3f1e8',
    }).setOrigin(1, 0.5).setDepth(12);
    this.optionSkinValue = this.add.text(490, 440, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '24px',
      color: '#f3f1e8',
    }).setOrigin(0, 0.5).setDepth(12);
    this.optionSkinPreview = this.add.image(780, 476, PLAYER_SKINS[0].key)
      .setDisplaySize(112, 112).setOrigin(0.5, 1).setDepth(12);
    const hint = this.add.text(GAME_WIDTH / 2, 555, '上下キー: 項目選択    左右キー: 調整    Xキーで戻る', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#9ab5c7',
    }).setOrigin(0.5).setDepth(12);
    this.optionSelection = 0;
    this.optionWindowObjects = [overlay, panel, title, label, this.optionVolumeTrack, this.optionVolumeFill, this.optionVolumeValue, this.optionSkinLabel, this.optionSkinValue, this.optionSkinPreview, hint];
    this.updateSfxVolumeDisplay();
    this.updatePlayerSkinDisplay();
    this.updateOptionSelection();
  }

  openRecipeBook() {
    this.sound.play('se-cursor-enter');
    this.recipeBook.open();
  }

  openEnemyBook() {
    this.sound.play('se-cursor-enter');
    this.enemyBook.open();
  }

  closeOptionsMenu() {
    this.optionWindowObjects.forEach((object) => object.destroy());
    this.optionWindowObjects = [];
    this.optionWindowVisible = false;
    this.sound.play('se-cursor-cancel');
  }

  handleOptionsInput(code) {
    if (code === 'ArrowUp' || code === 'ArrowDown') {
      this.optionSelection = (this.optionSelection + (code === 'ArrowUp' ? -1 : 1) + 2) % 2;
      this.updateOptionSelection();
      this.sound.play('se-cursor-move');
    } else if ((code === 'ArrowLeft' || code === 'ArrowRight') && this.optionSelection === 0) {
      const volume = setSfxVolume(getSfxVolume() + (code === 'ArrowLeft' ? -0.1 : 0.1));
      this.sound.volume = volume;
      this.updateSfxVolumeDisplay();
      this.sound.play('se-cursor-move');
    } else if ((code === 'ArrowLeft' || code === 'ArrowRight') && this.optionSelection === 1) {
      const unlockedSkinIndexes = getUnlockedPlayerSkinIndexes();
      const currentIndex = unlockedSkinIndexes.indexOf(getPlayerSkinIndex());
      const nextIndex = (currentIndex + (code === 'ArrowLeft' ? -1 : 1) + unlockedSkinIndexes.length)
        % unlockedSkinIndexes.length;
      setPlayerSkinIndex(unlockedSkinIndexes[nextIndex]);
      this.updatePlayerSkinDisplay();
      this.sound.play('se-cursor-move');
    } else if (code === 'KeyX' || code === 'Escape' || code === 'KeyZ' || code === 'Enter' || code === 'Space') {
      this.closeOptionsMenu();
    }
  }

  updateSfxVolumeDisplay() {
    const volume = getSfxVolume();
    this.optionVolumeFill.setDisplaySize(340 * volume, 16);
    this.optionVolumeValue.setText(`${Math.round(volume * 100)}%`);
  }

  updatePlayerSkinDisplay() {
    const skin = PLAYER_SKINS[getPlayerSkinIndex()];
    this.optionSkinValue.setText(skin.label);
    this.optionSkinPreview.setTexture(skin.key);
  }

  updateOptionSelection() {
    const volumeSelected = this.optionSelection === 0;
    this.optionVolumeTrack.setStrokeStyle(2, volumeSelected ? 0xffdc4a : 0x6e8996);
    this.optionSkinLabel.setColor(volumeSelected ? '#f3f1e8' : '#ffdc4a');
    this.optionSkinValue.setColor(volumeSelected ? '#f3f1e8' : '#ffdc4a');
  }
}

class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  create(result) {
    this.cameras.main.setBackgroundColor('#101820');
    const succeeded = result?.succeeded === true;
    const status = result?.status ?? {};
    const equipment = result?.equipment ?? [];
    const dungeonName = result?.dungeonName ?? '';
    const parallelCode = result?.parallelCode ?? '';
    const gameTime = result?.gameTime ?? '00:00:00';
    this.add.text(GAME_WIDTH / 2, 90, succeeded ? '任務成功' : '任務失敗', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '46px',
      color: succeeded ? '#76d7ea' : '#ffdc4a',
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, 145, dungeonName, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '22px',
      color: '#9ab5c7',
    }).setOrigin(0.5);
    if (result?.unlockedSkin) {
      const alertX = GAME_WIDTH - 495;
      const alertY = 24;
      this.add.rectangle(alertX, alertY, 470, 126, 0x17212a, 0.96)
        .setOrigin(0).setStrokeStyle(2, 0x76d7ea);
      this.add.image(alertX + 54, alertY + 108, result.unlockedSkin.key)
        .setDisplaySize(88, 88).setOrigin(0.5, 1);
      this.add.text(alertX + 110, alertY + 63, `${result.unlockedSkin.label}スキンが使えるようになった！\nスキンはオプションで変更することができます。`, {
        fontFamily: 'Yusei Magic, sans-serif',
        fontSize: '13px',
        color: '#f3f1e8',
        lineSpacing: 9,
        wordWrap: { width: 345 },
      }).setOrigin(0, 0.5);
    }
    if (parallelCode) {
      this.add.text(GAME_WIDTH / 2, 175, `(${parallelCode})`, {
        fontFamily: 'Yusei Magic, sans-serif',
        fontSize: '20px',
        color: '#9ab5c7',
      }).setOrigin(0.5);
    }
    if (!succeeded) {
      this.add.text(GAME_WIDTH / 2, parallelCode ? 205 : 185, `死因: ${result?.cause ?? '力尽きた'}`, {
        fontFamily: 'Yusei Magic, sans-serif',
        fontSize: '25px',
        color: '#f3f1e8',
      }).setOrigin(0.5);
    }
    this.add.text(GAME_WIDTH / 2, parallelCode ? (succeeded ? 215 : 235) : 215, `ゲーム時間: ${gameTime}`, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '22px',
      color: '#9ab5c7',
    }).setOrigin(0.5);
    const statusLines = [
      `到達階層: 地下${status.floor ?? 1}階`,
      `レベル: ${status.level ?? 1}`,
      `HP: ${status.hitPoints ?? 0} / ${status.maxHitPoints ?? 0}`,
      `満腹度: ${status.hunger ?? 0} / ${status.maxHunger ?? 0}`,
      `攻撃力: ${status.attack ?? 0}    防御力: ${status.defense ?? 0}`,
    ];
    this.add.text(300, 270, `最終ステータス\n\n${statusLines.join('\n')}`, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '23px',
      color: '#f3f1e8',
      lineSpacing: 8,
    });
    this.add.text(720, 270, `装備\n\n${equipment.join('\n') || 'なし'}`, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '23px',
      color: '#f3f1e8',
      lineSpacing: 12,
    });
    this.add.text(GAME_WIDTH / 2, 625, 'Zキーでタイトルに戻る', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '22px',
      color: '#9ab5c7',
    }).setOrigin(0.5);
    waitForFreshZPress(this, () => {
      this.sound.play('se-cursor-enter');
      this.scene.start('TitleScene');
    });
  }
}