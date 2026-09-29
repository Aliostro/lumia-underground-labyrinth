const RECIPE_BOOK_STORAGE_KEY = 'lumia-underground-labyrinth-recipe-book';
const RECIPE_CATEGORY_LABELS = {
  0: '武器',
  10: '遠距離武器',
  20: '防具',
  30: '装飾',
  40: '食料',
  50: '装置',
  70: '草',
  80: 'レシピ',
  90: 'その他',
};

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

  static clearRegisteredIds() {
    try {
      window.localStorage.removeItem(RECIPE_BOOK_STORAGE_KEY);
    } catch {
      // Keep the current session usable when browser storage is unavailable.
    }
  }

  constructor(scene, itemDefinitions, depth = STAIR_MENU_DEPTH + 10) {
    this.scene = scene;
    this.itemDefinitions = itemDefinitions;
    this.selectedGroupIndex = 0;
    this.selectedRecipeIndex = 0;
    this.focusedColumn = 'groups';
    this.rowsPerPage = 10;
    const panelWidth = 1000;
    const panelHeight = 640;
    const panelX = (GAME_WIDTH - panelWidth) / 2;
    const panelY = (GAME_HEIGHT - panelHeight) / 2;
    const background = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, panelWidth, panelHeight, 0x101820, 0.98)
      .setStrokeStyle(2, 0xd9b85a);
    const title = scene.add.text(panelX + 28, panelY + 22, 'レシピ図鑑', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '28px', color: '#ffdc4a',
    });
    this.countText = scene.add.text(panelX + panelWidth - 28, panelY + 28, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#b7c6d3',
    }).setOrigin(1, 0);
    this.groupTitle = scene.add.text(panelX + 24, panelY + 58, '種類', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#9ab5c7',
    });
    this.recipeTitle = scene.add.text(panelX + 300, panelY + 58, 'レシピ', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#9ab5c7',
    });
    this.recipePageText = scene.add.text(panelX + 633, panelY + 480, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '16px', color: '#9ab5c7',
    }).setOrigin(0.5);
    this.groupGraphics = scene.add.graphics();
    this.recipeGraphics = scene.add.graphics();
    this.recipeIcons = Array.from({ length: this.rowsPerPage }, () => scene.add.image(0, 0, 'item-icon-junk')
      .setDisplaySize(24, 24).setVisible(false));
    this.groupTexts = Array.from({ length: this.rowsPerPage }, () => scene.add.text(0, 0, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#f3f1e8',
    }));
    this.recipeTexts = Array.from({ length: this.rowsPerPage }, () => scene.add.text(0, 0, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '20px', color: '#f3f1e8',
    }));
    this.descriptionText = scene.add.text(panelX + 28, panelY + 504, '', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#cdd8df',
      wordWrap: { width: panelWidth - 56, useAdvancedWrap: true }, lineSpacing: 6,
    });
    this.separatorGraphics = scene.add.graphics();
    const hint = scene.add.text(GAME_WIDTH / 2, panelY + panelHeight - 30, '種類: 上下キーで選択 / 左右キーでページ    Zキー: レシピ選択    レシピ: 上下・左右キーで選択    Xキー: 戻る', {
      fontFamily: 'Yusei Magic, sans-serif', fontSize: '18px', color: '#9ab5c7',
    }).setOrigin(0.5);
    this.container = scene.add.container(0, 0, [
      background, title, this.countText, this.groupTitle, this.recipeTitle, this.recipePageText,
      this.groupGraphics, this.recipeGraphics, ...this.recipeIcons, ...this.groupTexts, ...this.recipeTexts,
      this.separatorGraphics, this.descriptionText, hint,
    ]).setScrollFactor(0).setDepth(depth).setVisible(false);
  }

  get recipeGroups() {
    const registeredIds = RecipeBook.getRegisteredIds();
    const recipes = [...this.itemDefinitions.values()]
      .filter((definition) => definition.category === 80 && registeredIds.has(definition.id))
      .sort((first, second) => first.id - second.id);
    const groupsByCategory = new Map();
    recipes.forEach((recipe) => {
      const category = this.getResultDefinition(recipe)?.category ?? 90;
      if (!groupsByCategory.has(category)) {
        groupsByCategory.set(category, []);
      }
      groupsByCategory.get(category).push(recipe);
    });
    return [...groupsByCategory.entries()]
      .map(([category, groupedRecipes]) => ({
        name: RECIPE_CATEGORY_LABELS[category] ?? 'その他',
        recipes: groupedRecipes,
      }))
      .sort((left, right) => {
        const leftCategory = Object.keys(RECIPE_CATEGORY_LABELS).find((key) => RECIPE_CATEGORY_LABELS[key] === left.name);
        const rightCategory = Object.keys(RECIPE_CATEGORY_LABELS).find((key) => RECIPE_CATEGORY_LABELS[key] === right.name);
        return Number(leftCategory) - Number(rightCategory);
      });
  }

  open() {
    this.selectedGroupIndex = 0;
    this.selectedRecipeIndex = 0;
    this.focusedColumn = 'groups';
    this.container.setVisible(true);
    this.refresh();
  }

  close() {
    this.container.setVisible(false);
  }

  handleInput(code) {
    if (code === 'KeyD') {
      this.close();
      return true;
    }
    if (code === 'KeyX' || code === 'Escape') {
      if (this.focusedColumn === 'recipes') {
        this.focusedColumn = 'groups';
        this.refresh();
      } else {
        this.close();
      }
      return true;
    }
    const groups = this.recipeGroups;
    if (groups.length === 0) {
      return false;
    }
    if (this.focusedColumn === 'groups' && code === 'KeyZ') {
      this.focusedColumn = 'recipes';
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
      this.selectedRecipeIndex = 0;
    } else if (this.focusedColumn === 'recipes' && (code === 'ArrowLeft' || code === 'ArrowRight')) {
      const recipes = groups[this.selectedGroupIndex].recipes;
      const pageCount = Math.ceil(recipes.length / this.rowsPerPage);
      const selectedRow = this.selectedRecipeIndex % this.rowsPerPage;
      const currentPage = Math.floor(this.selectedRecipeIndex / this.rowsPerPage);
      const targetPage = (currentPage + (code === 'ArrowRight' ? 1 : pageCount - 1)) % pageCount;
      const pageStart = targetPage * this.rowsPerPage;
      const pageLength = Math.min(this.rowsPerPage, recipes.length - pageStart);
      this.selectedRecipeIndex = pageStart + Math.min(selectedRow, pageLength - 1);
    } else {
      const delta = code === 'ArrowUp' ? -1 : 1;
      if (this.focusedColumn === 'groups') {
        const currentPage = Math.floor(this.selectedGroupIndex / this.rowsPerPage);
        const pageStart = currentPage * this.rowsPerPage;
        const pageEnd = Math.min(pageStart + this.rowsPerPage - 1, groups.length - 1);
        this.selectedGroupIndex = delta < 0
          ? (this.selectedGroupIndex === pageStart ? pageEnd : this.selectedGroupIndex - 1)
          : (this.selectedGroupIndex === pageEnd ? pageStart : this.selectedGroupIndex + 1);
        this.selectedRecipeIndex = 0;
      } else {
        const recipes = groups[this.selectedGroupIndex].recipes;
        const currentPage = Math.floor(this.selectedRecipeIndex / this.rowsPerPage);
        const pageStart = currentPage * this.rowsPerPage;
        const pageEnd = Math.min(pageStart + this.rowsPerPage - 1, recipes.length - 1);
        this.selectedRecipeIndex = delta < 0
          ? (this.selectedRecipeIndex === pageStart ? pageEnd : this.selectedRecipeIndex - 1)
          : (this.selectedRecipeIndex === pageEnd ? pageStart : this.selectedRecipeIndex + 1);
      }
    }
    this.refresh();
    return true;
  }

  refresh() {
    const groups = this.recipeGroups;
    const panelX = (GAME_WIDTH - 1000) / 2;
    const panelY = (GAME_HEIGHT - 640) / 2;
    const totalRecipeCount = [...this.itemDefinitions.values()]
      .filter((definition) => definition.category === 80)
      .length;
    if (this.selectedGroupIndex >= groups.length) {
      this.selectedGroupIndex = 0;
      this.selectedRecipeIndex = 0;
    }
    const selectedGroup = groups[this.selectedGroupIndex];
    const selectedRecipes = selectedGroup?.recipes ?? [];
    if (this.selectedRecipeIndex >= selectedRecipes.length) {
      this.selectedRecipeIndex = 0;
    }
    const registeredRecipeCount = groups.reduce((count, group) => count + group.recipes.length, 0);
    this.countText.setText(`${registeredRecipeCount} / ${totalRecipeCount}`);
    this.groupTitle.setColor(this.focusedColumn === 'groups' ? '#ffdc4a' : '#9ab5c7');
    this.recipeTitle.setColor(this.focusedColumn === 'recipes' ? '#ffdc4a' : '#9ab5c7');
    const groupPageStart = Math.floor(this.selectedGroupIndex / this.rowsPerPage) * this.rowsPerPage;
    this.groupGraphics.clear();
    this.groupTexts.forEach((text, row) => {
      const group = groups[groupPageStart + row];
      const y = panelY + 92 + row * 38;
      const selected = Boolean(group) && group === selectedGroup;
      this.drawRow(this.groupGraphics, panelX + 24, y, 250, selected, this.focusedColumn === 'groups');
      text.setPosition(panelX + 34, y + 7).setText(group ? `${group.name}  ${group.recipes.length}` : '');
      text.setColor(selected && group ? '#ffdc4a' : '#f3f1e8');
    });
    this.recipeGraphics.clear();
    const recipePage = selectedRecipes.length > 0
      ? Math.floor(this.selectedRecipeIndex / this.rowsPerPage)
      : 0;
    const recipePageCount = Math.max(1, Math.ceil(selectedRecipes.length / this.rowsPerPage));
    const recipePageStart = recipePage * this.rowsPerPage;
    this.recipePageText.setText(`${recipePage + 1} / ${recipePageCount}`);
    this.recipeTexts.forEach((text, row) => {
      const recipeIndex = recipePageStart + row;
      const recipe = selectedRecipes[recipeIndex];
      const y = panelY + 92 + row * 38;
      const selected = Boolean(recipe) && recipeIndex === this.selectedRecipeIndex;
      this.drawRow(this.recipeGraphics, panelX + 290, y, 686, selected, this.focusedColumn === 'recipes');
      const result = recipe && this.getResultDefinition(recipe);
      this.recipeIcons[row].setVisible(Boolean(result));
      const recipeNamePrefix = recipe ? recipe.name.slice(0, -'のレシピ'.length) : '';
      const recipeLabelPrefix = recipeNamePrefix;
      const recipeLabel = recipe ? `${recipeLabelPrefix}　　のレシピ` : '';
      const recipePrefixWidth = recipe ? text.setText(recipeLabelPrefix).width : 0;
      if (result) {
        this.recipeIcons[row]
          .setTexture(ITEM_ICON_KEYS[result.category] || ITEM_ICON_KEYS[90])
          .setPosition(panelX + 304 + recipePrefixWidth + 14, y + 17);
      }
      text.setPosition(panelX + 304, y + 6).setText(recipeLabel);
      text.setColor(selected && recipe ? '#ffdc4a' : '#f3f1e8');
    });
    this.separatorGraphics.clear();
    this.separatorGraphics.lineStyle(1, 0x607785, 1);
    this.separatorGraphics.lineBetween(panelX + 282, panelY + 50, panelX + 282, panelY + 488);
    this.separatorGraphics.lineBetween(panelX + 24, panelY + 488, panelX + 976, panelY + 488);
    const selectedRecipe = selectedRecipes[this.selectedRecipeIndex];
    const result = selectedRecipe && this.getResultDefinition(selectedRecipe);
    const description = selectedRecipe?.description ?? '登録済みのレシピはありません。';
    this.descriptionText.setText(result ? `${description}\n“${result.description}”` : description);
  }

  drawRow(graphics, x, y, width, selected, isFocused) {
    graphics.fillStyle(selected ? 0x384d58 : 0x1c2932, 1);
    graphics.fillRect(x, y, width, 34);
    graphics.lineStyle(selected && isFocused ? 2 : 1, selected && isFocused ? 0xffdc4a : 0x607785, 1);
    graphics.strokeRect(x, y, width, 34);
  }

  getResultDefinition(recipeDefinition) {
    const resultName = recipeDefinition.name.replace(/のレシピ$/, '');
    return [...this.itemDefinitions.values()].find((definition) => (
      definition.category !== 80 && definition.name === resultName
    ));
  }
}