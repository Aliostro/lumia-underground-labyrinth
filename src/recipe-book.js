const RECIPE_BOOK_STORAGE_KEY = 'lumia-underground-labyrinth-recipe-book';

class RecipeBook {
  static getRegisteredIds() {
    try {
      const savedValue = window.localStorage.getItem(RECIPE_BOOK_STORAGE_KEY);
      const ids = JSON.parse(savedValue ?? '[]');
      return new Set(Array.isArray(ids) ? ids.filter(Number.isInteger) : []);
    } catch {
      return new Set();
    }
  }

  static register(recipeId) {
    const recipeIds = RecipeBook.getRegisteredIds();
    if (recipeIds.has(recipeId)) {
      return false;
    }
    recipeIds.add(recipeId);
    try {
      window.localStorage.setItem(RECIPE_BOOK_STORAGE_KEY, JSON.stringify([...recipeIds]));
    } catch {
      // The current session can still use the recipe even when storage is unavailable.
    }
    return true;
  }

  constructor(scene, itemDefinitions, depth = STAIR_MENU_DEPTH + 10) {
    this.scene = scene;
    this.itemDefinitions = itemDefinitions;
    this.selectedIndex = 0;
    this.page = 0;
    this.sortByCategory = false;
    this.rowsPerPage = 10;
    const panelWidth = 760;
    const panelHeight = 600;
    const panelX = (GAME_WIDTH - panelWidth) / 2;
    const panelY = (GAME_HEIGHT - panelHeight) / 2;
    const background = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, panelWidth, panelHeight, 0x101820, 0.98)
      .setStrokeStyle(2, 0xd9b85a);
    const title = scene.add.text(panelX + 28, panelY + 22, 'レシピ図鑑', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '28px', color: '#ffdc4a',
    });
    this.pageText = scene.add.text(panelX + panelWidth - 28, panelY + 28, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#b7c6d3',
    }).setOrigin(1, 0);
    this.rowGraphics = scene.add.graphics();
    this.rowIcons = Array.from({ length: this.rowsPerPage }, () => scene.add.image(0, 0, 'item-icon-junk')
      .setDisplaySize(24, 24).setVisible(false));
    this.rowTexts = Array.from({ length: this.rowsPerPage }, () => scene.add.text(0, 0, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '20px', color: '#f3f1e8',
    }));
    this.descriptionText = scene.add.text(panelX + 28, panelY + 478, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#cdd8df',
      wordWrap: { width: panelWidth - 56, useAdvancedWrap: true }, lineSpacing: 6,
    });
    const hint = scene.add.text(GAME_WIDTH / 2, panelY + panelHeight - 30, '上下キー: 選択    左右キー: ページ    Cキー: 並び替え    Xキー: 戻る', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#9ab5c7',
    }).setOrigin(0.5);
    this.container = scene.add.container(0, 0, [
      background, title, this.pageText, this.rowGraphics, ...this.rowIcons, ...this.rowTexts, this.descriptionText, hint,
    ]).setScrollFactor(0).setDepth(depth).setVisible(false);
  }

  get recipes() {
    const registeredIds = RecipeBook.getRegisteredIds();
    return [...this.itemDefinitions.values()]
      .filter((definition) => definition.category === 80 && registeredIds.has(definition.id))
      .sort((first, second) => {
        if (!this.sortByCategory) {
          return first.id - second.id;
        }
        const firstResult = this.getResultDefinition(first);
        const secondResult = this.getResultDefinition(second);
        return (firstResult?.category ?? 999) - (secondResult?.category ?? 999)
          || (firstResult?.id ?? 99999) - (secondResult?.id ?? 99999);
      });
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
    if (code === 'KeyX' || code === 'Escape' || code === 'KeyD') {
      this.close();
      return true;
    }
    if (code === 'KeyC') {
      this.sortByCategory = !this.sortByCategory;
      this.selectedIndex = 0;
      this.page = 0;
      this.refresh();
      return true;
    }
    const recipes = this.recipes;
    if (
      recipes.length === 0
      || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)
    ) {
      return false;
    }
    const pageCount = Math.ceil(recipes.length / this.rowsPerPage);
    if (code === 'ArrowLeft' || code === 'ArrowRight') {
      const selectedRow = this.selectedIndex % this.rowsPerPage;
      this.page = (this.page + (code === 'ArrowRight' ? 1 : pageCount - 1)) % pageCount;
      const pageStart = this.page * this.rowsPerPage;
      const pageLength = Math.min(this.rowsPerPage, recipes.length - pageStart);
      this.selectedIndex = pageStart + Math.min(selectedRow, pageLength - 1);
    } else {
      const pageStart = this.page * this.rowsPerPage;
      const pageEnd = Math.min(recipes.length - 1, pageStart + this.rowsPerPage - 1);
      this.selectedIndex = code === 'ArrowUp'
        ? (this.selectedIndex === pageStart ? pageEnd : this.selectedIndex - 1)
        : (this.selectedIndex === pageEnd ? pageStart : this.selectedIndex + 1);
    }
    this.refresh();
    return true;
  }

  refresh() {
    const recipes = this.recipes;
    const panelX = (GAME_WIDTH - 760) / 2;
    const panelY = (GAME_HEIGHT - 600) / 2;
    const totalRecipeCount = [...this.itemDefinitions.values()]
      .filter((definition) => definition.category === 80)
      .length;
    this.pageText.setText(`${this.sortByCategory ? '種別順' : 'ID順'}　${recipes.length} / ${totalRecipeCount}`);
    this.rowGraphics.clear();
    this.rowTexts.forEach((text, row) => {
      const index = this.page * this.rowsPerPage + row;
      const recipe = recipes[index];
      const y = panelY + 76 + row * 38;
      const selected = index === this.selectedIndex;
      this.rowGraphics.fillStyle(selected ? 0x384d58 : 0x1c2932, 1);
      this.rowGraphics.fillRect(panelX + 24, y, 712, 34);
      this.rowGraphics.lineStyle(selected ? 2 : 1, selected ? 0xffdc4a : 0x607785, 1);
      this.rowGraphics.strokeRect(panelX + 24, y, 712, 34);
      const result = recipe && this.getResultDefinition(recipe);
      this.rowIcons[row].setVisible(Boolean(result));
      const recipeNamePrefix = recipe ? recipe.name.slice(0, -'のレシピ'.length) : '';
      const recipeLabelPrefix = recipe ? `No.${recipe.id - 8000}　${recipeNamePrefix}` : '';
      const recipeLabel = recipe ? `${recipeLabelPrefix}　　のレシピ` : '';
      const recipePrefixWidth = recipe ? text.setText(recipeLabelPrefix).width : 0;
      if (result) {
        this.rowIcons[row]
          .setTexture(ITEM_ICON_KEYS[result.category] || ITEM_ICON_KEYS[90])
          .setPosition(panelX + 38 + recipePrefixWidth + 14, y + 17);
      }
      text.setPosition(panelX + 38, y + 6).setText(recipeLabel);
      text.setColor(selected && recipe ? '#ffdc4a' : '#f3f1e8');
    });
    const selectedRecipe = recipes[this.selectedIndex];
    this.descriptionText.setText(selectedRecipe ? selectedRecipe.description : '登録済みのレシピはありません。');
  }

  getResultDefinition(recipeDefinition) {
    const resultName = recipeDefinition.name.replace(/のレシピ$/, '');
    return [...this.itemDefinitions.values()].find((definition) => (
      definition.category !== 80 && definition.name === resultName
    ));
  }
}