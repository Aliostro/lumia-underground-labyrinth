const InventoryUiBehavior = {
  createInventoryUi() {
    const panelWidth = 760;
    const panelHeight = 580;
    const panelX = (GAME_WIDTH - panelWidth) / 2;
    const panelY = (GAME_HEIGHT - panelHeight) / 2;
    const background = this.add.graphics();
    background.fillStyle(0x101820, 0.96);
    background.fillRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
    background.lineStyle(2, 0xd9b85a, 1);
    background.strokeRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
    this.inventoryBackground = background;
    this.inventoryPanel = { panelX, panelY, panelWidth, panelHeight };
    const title = this.add.text(panelX + 28, panelY + 20, '持ち物', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '28px',
      color: '#f3f1e8',
    });
    const capacity = this.add.text(panelX + 620, panelY + 26, '0 / 20', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '18px',
      color: '#b7c6d3',
    });
    this.inventoryTitleText = title;
    this.inventoryPageText = this.add.text(panelX + 352, panelY + 26, '1 / 2', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '18px',
      color: '#b7c6d3',
    });
    this.inventorySlotGraphics = this.add.graphics();
    this.inventoryItemTexts = Array.from({ length: 10 }, (_, index) => this.add.text(0, 0, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
    }).setName(`inventory-item-${index}`));
    this.inventoryItemIcons = Array.from({ length: 10 }, (_, index) => this.add.image(0, 0, 'item-icon-junk')
      .setDisplaySize(28, 28)
      .setVisible(false)
      .setName(`inventory-icon-${index}`));
    this.inventoryRecipeResultIcons = Array.from({ length: 10 }, (_, index) => this.add.image(0, 0, 'item-icon-junk')
      .setDisplaySize(20, 20)
      .setVisible(false)
      .setName(`inventory-recipe-result-icon-${index}`));
    this.inventoryDescriptionText = this.add.text(panelX + 30, panelY + 482, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '18px',
      color: '#cdd8df',
      wordWrap: { width: panelWidth - 60, useAdvancedWrap: true },
      lineSpacing: 6,
    });
    this.inventoryCapacityText = capacity;
    this.inventoryPage = 0;
    this.selectedInventoryIndex = 0;
    this.inventoryUi = this.add.container(0, 0, [
      background,
      title,
      capacity,
      this.inventoryPageText,
      this.inventorySlotGraphics,
      ...this.inventoryItemIcons,
      ...this.inventoryRecipeResultIcons,
      ...this.inventoryItemTexts,
      this.inventoryDescriptionText,
    ])
      .setScrollFactor(0)
      .setDepth(INVENTORY_DEPTH)
      .setVisible(false);

    const menuBackground = this.add.graphics();
    menuBackground.fillStyle(0x0b1118, 1);
    menuBackground.fillRoundedRect(panelX + 510, panelY + 106, 190, 222, 6);
    menuBackground.lineStyle(2, 0xd9b85a, 1);
    menuBackground.strokeRoundedRect(panelX + 510, panelY + 106, 190, 222, 6);
    this.inventoryMenuTexts = Array.from({ length: 5 }, () => this.add.text(0, 0, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '20px',
      color: '#f3f1e8',
    }));
    this.inventoryMenuGraphics = this.add.graphics();
    this.inventoryMenuUi = this.add.container(0, 0, [
      menuBackground,
      this.inventoryMenuGraphics,
      ...this.inventoryMenuTexts,
    ]).setScrollFactor(0).setDepth(INVENTORY_DEPTH + 1).setVisible(false);
    this.inventoryMenuActions = [];
    this.selectedInventoryMenuIndex = 0;
  },

  refreshInventoryUi() {
    const panelX = (GAME_WIDTH - 760) / 2;
    const panelY = (GAME_HEIGHT - 580) / 2;
    const slotWidth = 700;
    const slotHeight = 38;
    const slotStartX = panelX + 30;
    const slotStartY = panelY + 82;
    this.inventorySlotGraphics.clear();
    this.inventoryCapacityText.setText(`${this.playerStatus.inventory.length} / ${this.playerStatus.inventoryCapacity}`);
    const floorItem = this.getFloorItemAt(this.heroTileX, this.heroTileY);
    const pageCount = floorItem ? 3 : 2;
    if (this.inventoryPage >= pageCount) {
      this.inventoryPage = pageCount - 1;
      this.selectedInventoryIndex = this.inventoryPage * 10;
    }
    this.inventoryTitleText.setText(this.inventoryPage === 2 ? '足下アイテム' : '持ち物');
    this.inventoryPageText.setText(`${this.inventoryPage + 1} / ${pageCount}`);
    const registeredRecipeIds = RecipeBook.getRegisteredIds();
    this.inventoryItemTexts.forEach((text, row) => {
      const index = this.inventoryPage * 10 + row;
      const x = slotStartX;
      const y = slotStartY + row * slotHeight;
      const item = this.inventoryPage === 2 ? (row === 0 ? floorItem : null) : this.playerStatus.inventory[index];
      const craftingMaterial = item && item === this.pendingCraftItem;
      const definition = item && this.itemDefinitions.get(item.id);
      const craftingUnavailable = this.pendingCraftItem && definition?.category === 80;
      const disabled = craftingMaterial || craftingUnavailable;
      const selected = index === this.selectedInventoryIndex;
      this.inventorySlotGraphics.fillStyle(disabled ? 0x253039 : selected ? 0x384d58 : 0x1c2932, 1);
      this.inventorySlotGraphics.fillRect(x, y, slotWidth, slotHeight - 4);
      this.inventorySlotGraphics.lineStyle(selected ? 3 : 1, selected ? 0xffdc4a : disabled ? 0x52606a : 0x607785, 1);
      this.inventorySlotGraphics.strokeRect(x, y, slotWidth, slotHeight - 4);
      const icon = this.inventoryItemIcons[row];
      icon.setPosition(x + 24, y + 17).setVisible(Boolean(definition));
      if (definition) {
        icon.setTexture(ITEM_ICON_KEYS[definition.category] || ITEM_ICON_KEYS[90]);
      }
      icon.setTint(disabled ? 0x69747c : 0xffffff);
      const useCount = item?.usesRemaining != null ? ` (${item.usesRemaining})` : '';
      const recipeResultDefinition = definition?.category === 80
        ? this.getRecipeResultDefinition(definition)
        : null;
      const recipeNamePrefix = recipeResultDefinition
        ? definition.name.slice(0, -'のレシピ'.length)
        : '';
      const recipeName = recipeResultDefinition
        ? `${recipeNamePrefix}　　のレシピ`
        : definition?.name ?? '';
      const registeredRecipeLabel = definition?.category === 80 && registeredRecipeIds.has(definition.id)
        ? '（登録済）'
        : '';
      const itemName = item?.equipped != null
        ? `[装備中] ${recipeName}${registeredRecipeLabel}${useCount}`
        : `${recipeName}${registeredRecipeLabel}${useCount}`;
      const disabledLabel = craftingMaterial ? '[選択済み]' : craftingUnavailable ? '[製作不可]' : '';
      const recipePrefixWidth = recipeResultDefinition ? text.setText(recipeNamePrefix).width : 0;
      text.setPosition(x + 48, y + 7).setText(disabled ? `${itemName} ${disabledLabel}` : itemName);
      text.setColor(disabled ? '#7f8c95' : item ? '#f3f1e8' : '#607785');
      const recipeIcon = this.inventoryRecipeResultIcons[row];
      recipeIcon.setVisible(Boolean(recipeResultDefinition));
      if (recipeResultDefinition) {
        recipeIcon
          .setTexture(ITEM_ICON_KEYS[recipeResultDefinition.category] || ITEM_ICON_KEYS[90])
          .setPosition(x + 48 + recipePrefixWidth + 14, y + 17)
          .setTint(disabled ? 0x69747c : 0xffffff);
      }
    });
    const selectedItem = this.getSelectedInventoryItem();
    const selectedDefinition = selectedItem && this.itemDefinitions.get(selectedItem.id);
    this.inventoryDescriptionText.setText(selectedDefinition?.description ?? '空き枠');
    this.refreshInventoryBorder();
  },

  getRecipeResultDefinition(recipeDefinition) {
    const resultName = recipeDefinition.name.replace(/のレシピ$/, '');
    return [...this.itemDefinitions.values()].find((definition) => (
      definition.category !== 80 && definition.name === resultName
    ));
  },

  refreshInventoryBorder() {
    const { panelX, panelY, panelWidth, panelHeight } = this.inventoryPanel;
    this.inventoryBackground.lineStyle(2, this.pendingCraftItem ? 0x72f27a : 0xd9b85a, 1);
    this.inventoryBackground.strokeRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
  },

  sortInventoryByCategory() {
    this.playerStatus.inventory.sort((firstItem, secondItem) => {
      const firstDefinition = this.itemDefinitions.get(firstItem.id);
      const secondDefinition = this.itemDefinitions.get(secondItem.id);
      const getSortCategory = (category) => ({ 80: 90, 90: 80 }[category] ?? category ?? 999);
      return Number(secondItem.equipped != null) - Number(firstItem.equipped != null)
        || getSortCategory(firstDefinition?.category) - getSortCategory(secondDefinition?.category)
        || firstItem.id - secondItem.id;
    });
    this.inventoryPage = 0;
    this.selectedInventoryIndex = 0;
    this.refreshInventoryUi();
  },

  openInventoryMenu() {
    const item = this.getSelectedInventoryItem();
    const definition = item && this.itemDefinitions.get(item.id);
    if (!definition) {
      return;
    }
    this.inventoryMenuActions = this.getItemActions(item, definition, this.isFloorItemSelected());
    this.selectedInventoryMenuIndex = 0;
    this.refreshInventoryMenu();
    this.inventoryMenuUi.setVisible(true);
  },

  getItemActions(item, definition, fromFloor) {
    if (fromFloor) {
      if ([40, 70].includes(definition.category)) {
        return ['拾う', '食べる', '投げる', '製作'];
      } else if (definition.category === 50) {
        return ['拾う', '使う', '投げる', '製作'];
      } else if (definition.category === 80) {
        return ['拾う', '登録', '投げる'];
      } else {
        return ['拾う', '投げる', '製作'];
      }
    } else if ([0, 10, 20, 30].includes(definition.category)) {
      const actions = item.equipped != null ? ['外す', '置く', '投げる', '製作'] : ['装備', '置く', '投げる', '製作'];
      return this.canExchangeWithFloorItem() ? [...actions, '交換'] : actions;
    } else if ([40, 70].includes(definition.category)) {
      const actions = ['食べる', '置く', '投げる', '製作'];
      return this.canExchangeWithFloorItem() ? [...actions, '交換'] : actions;
    } else if (definition.category === 50) {
      const actions = ['使う', '置く', '投げる', '製作'];
      return this.canExchangeWithFloorItem() ? [...actions, '交換'] : actions;
    } else if (definition.category === 80) {
      const actions = ['登録', '置く', '投げる'];
      return this.canExchangeWithFloorItem() ? [...actions, '交換'] : actions;
    }
    const actions = ['置く', '投げる', '製作'];
    return this.canExchangeWithFloorItem() ? [...actions, '交換'] : actions;
  },

  canExchangeWithFloorItem() {
    const floorItem = this.getFloorItemAt(this.heroTileX, this.heroTileY);
    return Boolean(floorItem && floorItem.kind !== 'coffin' && this.itemDefinitions.has(floorItem.id));
  },

  closeInventoryMenu() {
    this.inventoryMenuUi.setVisible(false);
  },

  refreshInventoryMenu() {
    const panelX = (GAME_WIDTH - 760) / 2;
    const panelY = (GAME_HEIGHT - 580) / 2;
    this.inventoryMenuGraphics.clear();
    this.inventoryMenuTexts.forEach((text, index) => {
      const selected = index === this.selectedInventoryMenuIndex;
      const y = panelY + 118 + index * 40;
      if (index < this.inventoryMenuActions.length) {
        this.inventoryMenuGraphics.fillStyle(selected ? 0x384d58 : 0x0b1118, 1);
        this.inventoryMenuGraphics.fillRect(panelX + 520, y - 2, 170, 34);
      }
      text.setPosition(panelX + 534, y + 3).setText(this.inventoryMenuActions[index] ?? '');
      text.setColor(selected ? '#ffdc4a' : '#f3f1e8');
    });
  },

  moveInventoryMenuSelection(code) {
    const actionCount = this.inventoryMenuActions.length;
    if (actionCount === 0) {
      return;
    }
    if (code === 'ArrowUp') {
      this.selectedInventoryMenuIndex = (this.selectedInventoryMenuIndex - 1 + actionCount) % actionCount;
    } else if (code === 'ArrowDown') {
      this.selectedInventoryMenuIndex = (this.selectedInventoryMenuIndex + 1) % actionCount;
    }
    this.refreshInventoryMenu();
  },
};
