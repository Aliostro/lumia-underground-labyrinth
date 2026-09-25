let isZKeyHeld = false;
const SFX_VOLUME_STORAGE_KEY = 'lumia-underground-labyrinth-sfx-volume';

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
    this.load.audio('se-sword', 'assets/audio/SESword.mp3');
    this.load.audio('se-spark', 'assets/audio/SESpark.mp3');
    this.load.audio('se-throw', 'assets/audio/SEThrow.mp3');
    this.load.audio('se-use', 'assets/audio/SEUse.mp3');
    this.load.audio('se-violin', 'assets/audio/SEViolin.mp3');
    this.load.audio('se-wana-set', 'assets/audio/SEWanaSet.mp3');
    this.load.audio('se-warp', 'assets/audio/SEWarp.mp3');
    this.load.audio('se-wind', 'assets/audio/SEWind.mp3');
    this.load.text('version-data', `assets/data/version.txt?v=${Date.now()}`);
    this.load.text('item-data', 'assets/data/item.csv');
    this.load.image('item-icon-sword', 'assets/image/IconSword.png');
    this.load.image('item-icon-bow', 'assets/image/IconBow.png?v=2');
    this.load.image('item-icon-armor', 'assets/image/IconArmor.png');
    this.load.image('item-icon-acce', 'assets/image/IconAcce.png');
    this.load.image('item-icon-food', 'assets/image/IconFood.png');
    this.load.image('item-icon-device', 'assets/image/IconDevice.png');
    this.load.image('item-icon-herb', 'assets/image/IconHerb.png');
    this.load.image('item-icon-recipe', 'assets/image/IconRecipe.png');
    this.load.image('item-icon-junk', 'assets/image/IconJunk.png');
  }

  create() {
    applySfxVolume(this.sound);
    this.cameras.main.setBackgroundColor('#101820');
    this.add.text(GAME_WIDTH / 2, 190, 'ルミア島の地下迷宮', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '56px',
      color: '#f3f1e8',
      stroke: '#05080c',
      strokeThickness: 8,
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH - 24, GAME_HEIGHT - 22, `ver. ${this.cache.text.get('version-data')?.trim() || '0.0.0'}`, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '18px',
      color: '#9ab5c7',
    }).setOrigin(1, 1);
    this.add.text(GAME_WIDTH / 2, 315, 'メニュー', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '24px',
      color: '#9ab5c7',
    }).setOrigin(0.5);
    this.titleSelection = 0;
    this.itemDefinitions = GameData.parseItemData(this.cache.text.get('item-data'));
    this.recipeBook = new RecipeBook(this, this.itemDefinitions, 20);
    this.titleMenuItems = [
      this.createTitleMenuItem(380, 'ルミア島の地下迷宮', () => {
        this.sound.play('se-cursor-enter');
        this.scene.start('DungeonTestScene', { newRun: true });
      }, '地下 30 階'),
      this.createTitleMenuItem(468, 'レシピ図鑑', () => this.openRecipeBook()),
      this.createTitleMenuItem(546, 'オプション', () => this.openOptionsMenu()),
    ];
    this.updateTitleMenuSelection();
    this.add.text(GAME_WIDTH / 2, 650, '上下キー: 選択    Zキー: 決定', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '22px',
      color: '#f3f1e8',
    }).setOrigin(0.5);
    this.onTitleKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      if (this.optionWindowVisible) {
        this.handleOptionsInput(event.code);
        return;
      }
      if (this.recipeBook.container.visible) {
        if (this.recipeBook.handleInput(event.code)) {
          this.sound.play(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyC'].includes(event.code) ? 'se-cursor-move' : 'se-cursor-cancel');
        }
        return;
      }
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        this.titleSelection = (this.titleSelection + (event.code === 'ArrowUp' ? -1 : 1) + this.titleMenuItems.length)
          % this.titleMenuItems.length;
        this.sound.play('se-cursor-move');
        this.updateTitleMenuSelection();
      } else if (event.code === 'KeyZ' || event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        this.titleMenuItems[this.titleSelection].action();
      }
    };
    this.input.keyboard.on('keydown', this.onTitleKeyDown);
    this.events.once('shutdown', () => {
      this.input.keyboard.off('keydown', this.onTitleKeyDown);
    });
  }

  createTitleMenuItem(y, label, action, subtitle = '') {
    const height = subtitle ? 84 : 66;
    const background = this.add.rectangle(GAME_WIDTH / 2, y, 420, height, 0x384d58)
      .setStrokeStyle(2, 0x6e8996)
      .setInteractive({ useHandCursor: true });
    const text = this.add.text(GAME_WIDTH / 2, y + (subtitle ? -12 : 0), label, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '30px',
      color: '#f3f1e8',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    const subtitleText = subtitle ? this.add.text(GAME_WIDTH / 2, y + 20, subtitle, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#b7c6d3',
    }).setOrigin(0.5).setResolution(2).setInteractive({ useHandCursor: true }) : null;
    const selectItem = () => {
      this.titleSelection = this.titleMenuItems.findIndex((item) => item.background === background);
      this.updateTitleMenuSelection();
    };
    background.on('pointerover', selectItem);
    text.on('pointerover', selectItem);
    subtitleText?.on('pointerover', selectItem);
    background.on('pointerdown', action);
    text.on('pointerdown', action);
    subtitleText?.on('pointerdown', action);
    return { background, text, subtitleText, action };
  }

  updateTitleMenuSelection() {
    this.titleMenuItems.forEach((item, index) => {
      const selected = index === this.titleSelection;
      item.background.setFillStyle(selected ? 0x4d6875 : 0x384d58);
      item.background.setStrokeStyle(2, selected ? 0xffdc4a : 0x6e8996);
      item.text.setColor(selected ? '#ffdc4a' : '#f3f1e8');
      item.subtitleText?.setColor(selected ? '#ffdc4a' : '#b7c6d3');
    });
  }

  openOptionsMenu() {
    this.sound.play('se-cursor-enter');
    this.optionWindowVisible = true;
    const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.62)
      .setDepth(10);
    const panel = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 600, 350, 0x182831, 0.98)
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
    const hint = this.add.text(GAME_WIDTH / 2, 465, '左右キーで調整    Xキーで戻る', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#9ab5c7',
    }).setOrigin(0.5).setDepth(12);
    this.optionWindowObjects = [overlay, panel, title, label, this.optionVolumeTrack, this.optionVolumeFill, this.optionVolumeValue, hint];
    this.updateSfxVolumeDisplay();
  }

  openRecipeBook() {
    this.sound.play('se-cursor-enter');
    this.recipeBook.open();
  }

  closeOptionsMenu() {
    this.optionWindowObjects.forEach((object) => object.destroy());
    this.optionWindowObjects = [];
    this.optionWindowVisible = false;
    this.sound.play('se-cursor-cancel');
  }

  handleOptionsInput(code) {
    if (code === 'ArrowLeft' || code === 'ArrowRight') {
      const volume = setSfxVolume(getSfxVolume() + (code === 'ArrowLeft' ? -0.1 : 0.1));
      this.sound.volume = volume;
      this.updateSfxVolumeDisplay();
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
    this.add.text(GAME_WIDTH / 2, 90, succeeded ? '任務成功' : '任務失敗', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '46px',
      color: succeeded ? '#76d7ea' : '#ffdc4a',
    }).setOrigin(0.5);
    if (!succeeded) {
      this.add.text(GAME_WIDTH / 2, 165, `死因: ${result?.cause ?? '力尽きた'}`, {
        fontFamily: 'Yusei Magic, sans-serif',
        fontSize: '25px',
        color: '#f3f1e8',
      }).setOrigin(0.5);
    }
    const statusLines = [
      `到達階層: 地下${status.floor ?? 1}階`,
      `レベル: ${status.level ?? 1}`,
      `HP: ${status.hitPoints ?? 0} / ${status.maxHitPoints ?? 0}`,
      `満腹度: ${status.hunger ?? 0} / ${status.maxHunger ?? 0}`,
      `攻撃力: ${status.attack ?? 0}    防御力: ${status.defense ?? 0}`,
    ];
    this.add.text(300, 245, `最終ステータス\n\n${statusLines.join('\n')}`, {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '23px',
      color: '#f3f1e8',
      lineSpacing: 8,
    });
    this.add.text(720, 245, `装備\n\n${equipment.join('\n') || 'なし'}`, {
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