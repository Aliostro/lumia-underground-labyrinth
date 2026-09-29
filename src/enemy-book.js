const ENEMY_BOOK_STORAGE_KEY = 'lumia-underground-labyrinth-enemy-book';

class EnemyBook {
  static IMAGE_FILES = [
    ...Array.from({ length: 45 }, (_, index) => `Chara${String(index + 2).padStart(4, '0')}.png`),
    'Chara0047.png',
    'Chara0047a.png',
    'Chara0048.png',
    'Chara0049.png',
    'Chara0050.png',
    'Chara0051.png',
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

  static clearRegisteredIds() {
    try {
      window.localStorage.removeItem(ENEMY_BOOK_STORAGE_KEY);
    } catch {
      // Keep the current session usable when browser storage is unavailable.
    }
  }

  constructor(scene, enemyDefinitions, enemyBookDescriptions, depth = STAIR_MENU_DEPTH + 10) {
    this.scene = scene;
    this.enemyDefinitions = enemyDefinitions;
    this.enemyBookDescriptions = enemyBookDescriptions;
    this.selectedGroupIndex = 0;
    this.selectedEnemyIndex = 0;
    this.focusedColumn = 'groups';
    this.rowsPerPage = 12;
    const panelWidth = 1200;
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
    this.groupTitle = scene.add.text(panelX + 24, panelY + 58, '種類', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#9ab5c7',
    });
    this.enemyTitle = scene.add.text(panelX + 305, panelY + 58, '実験体', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#9ab5c7',
    });
    this.groupPageText = scene.add.text(panelX + 151, panelY + 557, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '16px', color: '#9ab5c7',
    }).setOrigin(0.5);
    this.groupGraphics = scene.add.graphics();
    this.enemyGraphics = scene.add.graphics();
    this.groupTexts = Array.from({ length: this.rowsPerPage }, () => scene.add.text(0, 0, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#f3f1e8',
    }));
    this.enemyTexts = Array.from({ length: this.rowsPerPage }, () => scene.add.text(0, 0, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '20px', color: '#f3f1e8',
    }));
    this.detailGraphics = scene.add.graphics();
    this.enemyImage = scene.add.image(panelX + 895, panelY + 268, EnemyBook.IMAGE_FILES[0])
      .setDisplaySize(176, 176).setVisible(false);
    this.symbolImage = scene.add.image(panelX + 972, panelY + 180, EnemyBook.SYMBOL_FILES[0])
      .setDisplaySize(54, 54).setVisible(false);
    this.detailName = scene.add.text(panelX + 895, panelY + 64, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '28px', color: '#ffdc4a',
    }).setOrigin(0.5, 0);
    this.statusText = scene.add.text(panelX + 640, panelY + 386, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#f3f1e8',
      align: 'left', lineSpacing: 4, wordWrap: { width: 530, useAdvancedWrap: true },
    });
    const hint = scene.add.text(GAME_WIDTH / 2, panelY + panelHeight - 30, '種類: 上下キーで選択 / 左右キーでページ    Zキー: 個体選択    Xキー: 戻る', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#9ab5c7',
    }).setOrigin(0.5);
    this.container = scene.add.container(0, 0, [
      background, title, this.countText, this.groupTitle, this.enemyTitle, this.groupPageText,
      this.groupGraphics, this.enemyGraphics, ...this.groupTexts, ...this.enemyTexts, this.detailGraphics,
      this.enemyImage, this.symbolImage, this.detailName, this.statusText, hint,
    ]).setScrollFactor(0).setDepth(depth).setVisible(false);
  }

  get groups() {
    const registeredIds = EnemyBook.getRegisteredIds();
    const definitionsById = new Map(this.enemyDefinitions.map((definition) => [definition.id, definition]));
    const predecessorIds = new Map();
    this.enemyDefinitions.forEach((definition) => {
      if (definition.evolutionId != null) {
        predecessorIds.set(definition.evolutionId, definition.id);
      }
    });
    const groupsByRootId = new Map();
    this.enemyDefinitions.forEach((definition) => {
      let rootId = definition.id;
      while (predecessorIds.has(rootId)) {
        rootId = predecessorIds.get(rootId);
      }
      if (!groupsByRootId.has(rootId)) {
        groupsByRootId.set(rootId, []);
      }
      groupsByRootId.get(rootId).push(definition);
    });
    return [...groupsByRootId.entries()]
      .map(([rootId, definitions]) => ({
        name: `${definitionsById.get(rootId)?.name ?? definitions[0].name}種`,
        definitions: definitions.sort((left, right) => left.id - right.id),
        enemies: definitions.filter((definition) => registeredIds.has(definition.id)),
      }))
      .filter((group) => group.enemies.length > 0)
      .sort((left, right) => (
        left.name.localeCompare(right.name, 'ja')
        || left.definitions[0].id - right.definitions[0].id
      ));
  }

  open() {
    this.selectedGroupIndex = 0;
    this.selectedEnemyIndex = 0;
    this.focusedColumn = 'groups';
    this.container.setVisible(true);
    this.refresh();
  }

  close() {
    this.container.setVisible(false);
  }

  handleInput(code) {
    if (code === 'KeyD' || code === 'KeyF') {
      this.close();
      return true;
    }
    if (code === 'KeyX' || code === 'Escape') {
      if (this.focusedColumn === 'enemies') {
        this.focusedColumn = 'groups';
        this.refresh();
      } else {
        this.close();
      }
      return true;
    }
    const groups = this.groups;
    if (groups.length === 0) {
      return false;
    }
    if (this.focusedColumn === 'groups' && code === 'KeyZ') {
      this.focusedColumn = 'enemies';
      this.refresh();
      return true;
    }
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) {
      return false;
    }
    if (this.focusedColumn === 'groups' && (code === 'ArrowLeft' || code === 'ArrowRight')) {
      const pageCount = Math.ceil(groups.length / this.rowsPerPage);
      const selectedRow = this.selectedGroupIndex % this.rowsPerPage;
      const currentPage = Math.floor(this.selectedGroupIndex / this.rowsPerPage);
      const targetPage = (currentPage + (code === 'ArrowRight' ? 1 : pageCount - 1)) % pageCount;
      this.selectedGroupIndex = Math.min(targetPage * this.rowsPerPage + selectedRow, groups.length - 1);
      this.selectedEnemyIndex = 0;
    } else if (this.focusedColumn === 'enemies' && (code === 'ArrowLeft' || code === 'ArrowRight')) {
      if (code === 'ArrowLeft') {
        this.focusedColumn = 'groups';
      }
    } else {
      const delta = code === 'ArrowUp' ? -1 : 1;
      if (this.focusedColumn === 'groups') {
        const currentPage = Math.floor(this.selectedGroupIndex / this.rowsPerPage);
        const pageStart = currentPage * this.rowsPerPage;
        const pageEnd = Math.min(pageStart + this.rowsPerPage - 1, groups.length - 1);
        this.selectedGroupIndex = delta < 0
          ? (this.selectedGroupIndex === pageStart ? pageEnd : this.selectedGroupIndex - 1)
          : (this.selectedGroupIndex === pageEnd ? pageStart : this.selectedGroupIndex + 1);
        this.selectedEnemyIndex = 0;
      } else {
        const enemies = groups[this.selectedGroupIndex].enemies;
        this.selectedEnemyIndex = (this.selectedEnemyIndex + delta + enemies.length) % enemies.length;
      }
    }
    this.refresh();
    return true;
  }

  refresh() {
    const groups = this.groups;
    const panelX = (GAME_WIDTH - 1200) / 2;
    const panelY = (GAME_HEIGHT - 620) / 2;
    if (this.selectedGroupIndex >= groups.length) {
      this.selectedGroupIndex = 0;
      this.selectedEnemyIndex = 0;
    }
    const selectedGroup = groups[this.selectedGroupIndex];
    if (this.selectedEnemyIndex >= (selectedGroup?.enemies.length ?? 0)) {
      this.selectedEnemyIndex = 0;
    }
    const discoveredEnemies = groups.reduce((count, group) => count + group.enemies.length, 0);
    this.countText.setText(`${discoveredEnemies} / ${this.enemyDefinitions.length}`);
    this.groupTitle.setColor(this.focusedColumn === 'groups' ? '#ffdc4a' : '#9ab5c7');
    this.enemyTitle.setColor(this.focusedColumn === 'enemies' ? '#ffdc4a' : '#9ab5c7');
    const groupPage = Math.floor(this.selectedGroupIndex / this.rowsPerPage);
    const groupPageCount = Math.ceil(groups.length / this.rowsPerPage);
    const groupPageStart = groupPage * this.rowsPerPage;
    this.groupPageText.setText(`${groupPage + 1} / ${groupPageCount}`);
    this.groupGraphics.clear();
    this.groupTexts.forEach((text, row) => {
      const index = groupPageStart + row;
      const group = groups[index];
      const y = panelY + 86 + row * 38;
      const selected = index === this.selectedGroupIndex;
      this.drawRow(this.groupGraphics, panelX + 24, y, 255, selected, this.focusedColumn === 'groups');
      text.setPosition(panelX + 34, y + 7).setText(group ? `${group.name}  ${group.enemies.length}/${group.definitions.length}` : '');
      text.setColor(selected && group ? '#ffdc4a' : '#f3f1e8');
    });
    this.enemyGraphics.clear();
    this.enemyTexts.forEach((text, row) => {
      const enemy = selectedGroup?.enemies[row];
      const y = panelY + 86 + row * 38;
      const selected = row === this.selectedEnemyIndex;
      this.drawRow(this.enemyGraphics, panelX + 300, y, 305, selected, this.focusedColumn === 'enemies');
      text.setPosition(panelX + 310, y + 6).setText(enemy?.name ?? '');
      text.setColor(selected && enemy ? '#ffdc4a' : '#f3f1e8');
    });
    this.detailGraphics.clear();
    this.detailGraphics.lineStyle(1, 0x607785, 1);
    this.detailGraphics.lineBetween(panelX + 287, panelY + 50, panelX + 287, panelY + 570);
    this.detailGraphics.lineBetween(panelX + 620, panelY + 50, panelX + 620, panelY + 570);
    this.detailGraphics.lineBetween(panelX + 640, panelY + 365, panelX + 1170, panelY + 365);
    const enemy = selectedGroup?.enemies[this.selectedEnemyIndex];
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

  drawRow(graphics, x, y, width, selected, isFocused) {
    graphics.fillStyle(selected ? 0x384d58 : 0x1c2932, 1);
    graphics.fillRect(x, y, width, 34);
    graphics.lineStyle(selected && isFocused ? 2 : 1, selected && isFocused ? 0xffdc4a : 0x607785, 1);
    graphics.strokeRect(x, y, width, 34);
  }

  getStatusText(enemy) {
    const description = enemy.specialAbilityId === null
      ? ''
      : this.enemyBookDescriptions.get(enemy.specialAbilityId)?.description ?? '';
    return [
      `HP: ${enemy.hitPoints}    攻撃力: ${enemy.attack}    防御力: ${enemy.defense}`,
      `経験値: ${enemy.experience}    移動回数: ${enemy.movementCount}    攻撃回数: ${enemy.attackCount}`,
      `特殊能力: ${description || 'なし'}`,
    ].join('\n');
  }
}