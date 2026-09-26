const ENEMY_BOOK_STORAGE_KEY = 'lumia-underground-labyrinth-enemy-book';

class EnemyBook {
  static IMAGE_FILES = [
    ...Array.from({ length: 45 }, (_, index) => `Chara${String(index + 2).padStart(4, '0')}.png`),
    'Chara9000.png',
    'Chara9001.png',
  ];

  static SYMBOL_FILES = ['SymbolGold.png', 'SymbolMith.png', 'SymbolEta.png', 'SymbolDemi.png', 'SymbolDia.png'];

  static getRegisteredIds() {
    try {
      const savedValue = window.localStorage.getItem(ENEMY_BOOK_STORAGE_KEY);
      const ids = JSON.parse(savedValue ?? '[]');
      return new Set(Array.isArray(ids) ? ids.filter(Number.isInteger) : []);
    } catch {
      return new Set();
    }
  }

  static register(enemyId) {
    const enemyIds = EnemyBook.getRegisteredIds();
    if (enemyIds.has(enemyId)) {
      return false;
    }
    enemyIds.add(enemyId);
    try {
      window.localStorage.setItem(ENEMY_BOOK_STORAGE_KEY, JSON.stringify([...enemyIds]));
    } catch {
      // Keep the current session usable when browser storage is unavailable.
    }
    return true;
  }

  constructor(scene, enemyDefinitions, enemySkillDefinitions, depth = STAIR_MENU_DEPTH + 10) {
    this.scene = scene;
    this.enemyDefinitions = enemyDefinitions;
    this.enemySkillDefinitions = enemySkillDefinitions;
    this.selectedIndex = 0;
    this.page = 0;
    this.rowsPerPage = 12;
    const panelWidth = 1100;
    const panelHeight = 620;
    const panelX = (GAME_WIDTH - panelWidth) / 2;
    const panelY = (GAME_HEIGHT - panelHeight) / 2;
    const background = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, panelWidth, panelHeight, 0x101820, 0.98)
      .setStrokeStyle(2, 0xd9b85a);
    const title = scene.add.text(panelX + 28, panelY + 22, '実験体図鑑', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '28px', color: '#ffdc4a',
    });
    this.countText = scene.add.text(panelX + 440, panelY + 28, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#b7c6d3',
    });
    this.rowGraphics = scene.add.graphics();
    this.rowTexts = Array.from({ length: this.rowsPerPage }, () => scene.add.text(0, 0, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '20px', color: '#f3f1e8',
    }));
    this.detailGraphics = scene.add.graphics();
    this.enemyImage = scene.add.image(panelX + 825, panelY + 268, EnemyBook.IMAGE_FILES[0])
      .setDisplaySize(176, 176).setVisible(false);
    this.symbolImage = scene.add.image(panelX + 902, panelY + 180, EnemyBook.SYMBOL_FILES[0])
      .setDisplaySize(54, 54).setVisible(false);
    this.detailName = scene.add.text(panelX + 825, panelY + 64, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '28px', color: '#ffdc4a',
    }).setOrigin(0.5, 0);
    this.statusText = scene.add.text(panelX + 570, panelY + 386, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#f3f1e8',
      align: 'left', lineSpacing: 4, wordWrap: { width: 500, useAdvancedWrap: true },
    });
    const hint = scene.add.text(GAME_WIDTH / 2, panelY + panelHeight - 30, '上下キー: 選択    左右キー: ページ    Xキー: 戻る', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#9ab5c7',
    }).setOrigin(0.5);
    this.container = scene.add.container(0, 0, [
      background, title, this.countText, this.rowGraphics, ...this.rowTexts, this.detailGraphics,
      this.enemyImage, this.symbolImage, this.detailName, this.statusText, hint,
    ]).setScrollFactor(0).setDepth(depth).setVisible(false);
  }

  get enemies() {
    const registeredIds = EnemyBook.getRegisteredIds();
    return this.enemyDefinitions.filter((definition) => registeredIds.has(definition.id));
  }

  open() {
    this.selectedIndex = 0;
    this.page = 0;
    this.container.setVisible(true);
    this.refresh();
  }

  close() {
    this.container.setVisible(false);
  }

  handleInput(code) {
    if (code === 'KeyX' || code === 'Escape' || code === 'KeyD' || code === 'KeyF') {
      this.close();
      return true;
    }
    const enemies = this.enemies;
    if (enemies.length === 0 || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) {
      return false;
    }
    const pageCount = Math.ceil(enemies.length / this.rowsPerPage);
    if (code === 'ArrowLeft' || code === 'ArrowRight') {
      const selectedRow = this.selectedIndex % this.rowsPerPage;
      this.page = (this.page + (code === 'ArrowRight' ? 1 : pageCount - 1)) % pageCount;
      const pageStart = this.page * this.rowsPerPage;
      this.selectedIndex = pageStart + Math.min(selectedRow, enemies.length - pageStart - 1);
    } else {
      const pageStart = this.page * this.rowsPerPage;
      const pageEnd = Math.min(enemies.length - 1, pageStart + this.rowsPerPage - 1);
      this.selectedIndex = code === 'ArrowUp'
        ? (this.selectedIndex === pageStart ? pageEnd : this.selectedIndex - 1)
        : (this.selectedIndex === pageEnd ? pageStart : this.selectedIndex + 1);
    }
    this.refresh();
    return true;
  }

  refresh() {
    const enemies = this.enemies;
    const panelX = (GAME_WIDTH - 1100) / 2;
    const panelY = (GAME_HEIGHT - 620) / 2;
    this.countText.setText(`${enemies.length} / ${this.enemyDefinitions.length}`);
    this.rowGraphics.clear();
    this.rowTexts.forEach((text, row) => {
      const index = this.page * this.rowsPerPage + row;
      const enemy = enemies[index];
      const y = panelY + 76 + row * 38;
      const selected = index === this.selectedIndex;
      this.rowGraphics.fillStyle(selected ? 0x384d58 : 0x1c2932, 1);
      this.rowGraphics.fillRect(panelX + 24, y, 500, 34);
      this.rowGraphics.lineStyle(selected ? 2 : 1, selected ? 0xffdc4a : 0x607785, 1);
      this.rowGraphics.strokeRect(panelX + 24, y, 500, 34);
      text.setPosition(panelX + 40, y + 6).setText(enemy ? `No.${enemy.id + 1}　${enemy.name}` : '');
      text.setColor(selected && enemy ? '#ffdc4a' : '#f3f1e8');
    });
    this.detailGraphics.clear();
    this.detailGraphics.lineStyle(1, 0x607785, 1);
    this.detailGraphics.lineBetween(panelX + 550, panelY + 50, panelX + 550, panelY + 570);
    this.detailGraphics.lineBetween(panelX + 570, panelY + 365, panelX + 1070, panelY + 365);
    const enemy = enemies[this.selectedIndex];
    this.enemyImage.setVisible(Boolean(enemy));
    this.symbolImage.setVisible(Boolean(enemy?.symbolFile));
    this.detailName.setText(enemy?.name ?? '撃破済みの実験体はありません');
    this.statusText.setText(enemy ? this.getStatusText(enemy) : '実験体を倒すと、ここに記録されます。');
    if (enemy) {
      this.enemyImage.setTexture(enemy.imageFile);
      if (enemy.symbolFile) {
        this.symbolImage.setTexture(enemy.symbolFile);
      }
    }
  }

  getStatusText(enemy) {
    const skill = enemy.specialAbilityId === null ? null : this.enemySkillDefinitions.get(enemy.specialAbilityId);
    return [
      `HP: ${enemy.hitPoints}    攻撃力: ${enemy.attack}    防御力: ${enemy.defense}`,
      `経験値: ${enemy.experience}    移動回数: ${enemy.movementCount}    攻撃回数: ${enemy.attackCount}`,
      `特殊能力: ${this.getSkillDescription(skill?.description) || 'なし'}`,
    ].join('\n');
  }

  getSkillDescription(description = '') {
    let quoteDepth = 0;
    return [...description].filter((character) => {
      if (character === '「') {
        quoteDepth += 1;
        return false;
      }
      if (character === '」' && quoteDepth > 0) {
        quoteDepth -= 1;
        return false;
      }
      return quoteDepth === 0;
    }).join('').trim();
  }
}