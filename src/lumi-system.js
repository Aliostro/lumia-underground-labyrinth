const LumiSystem = {
  createLumiExchangeUi() {
    const width = 640;
    const height = 520;
    const x = (GAME_WIDTH - width) / 2;
    const y = (GAME_HEIGHT - height) / 2;
    const background = this.add.graphics();
    background.fillStyle(0x101820, 0.97);
    background.fillRoundedRect(x, y, width, height, 8);
    background.lineStyle(2, 0x76d7ea, 1);
    background.strokeRoundedRect(x, y, width, height, 8);
    const title = this.add.text(x + 28, y + 22, 'LUMI', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '28px',
      color: '#76d7ea',
    });
    const prompt = this.add.text(x + 28, y + 70, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '18px',
      color: '#f3f1e8',
    });
    const pageIndicator = this.add.text(x + width - 28, y + 30, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '15px',
      color: '#9ab5c7',
    }).setOrigin(1, 0);
    const rows = Array.from({ length: 10 }, (_, index) => this.add.text(x + 40, y + 116 + index * 32, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '18px',
      color: '#f3f1e8',
    }));
    const hint = this.add.text(x + 28, y + height - 34, '上下: 選択　左右: ページ　Z: 決定　X: やめる', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '16px',
      color: '#9ab5c7',
    });
    this.lumiExchangeUi = this.add.container(0, 0, [background, title, prompt, pageIndicator, ...rows, hint])
      .setScrollFactor(0)
      .setDepth(INVENTORY_DEPTH + 2)
      .setVisible(false);
    this.lumiExchangeRows = rows;
    this.lumiExchangePrompt = prompt;
    this.lumiExchangePageIndicator = pageIndicator;
    this.lumiExchange = null;
  },

  isLumiAt(tileX, tileY) {
    return this.lumi?.tileX === tileX && this.lumi?.tileY === tileY;
  },

  updateLumiVisibility(visibleTiles) {
    if (!this.lumi) {
      return;
    }
    this.lumi.sprite.setVisible(visibleTiles.has(`${this.lumi.tileX},${this.lumi.tileY}`));
  },

  isLumiPatrolTile(tileX, tileY, room) {
    return this.getRoomAt(tileX, tileY) === room
      && this.dungeonTiles[tileY]?.[tileX] === FLOOR_TILE
      && ![
        [0, -1], [1, 0], [0, 1], [-1, 0],
      ].some(([offsetX, offsetY]) => (
        this.dungeonTiles[tileY + offsetY]?.[tileX + offsetX] === CORRIDOR_TILE
      ));
  },

  resolveLumiTurn() {
    if (!this.lumi) {
      return null;
    }
    const room = this.getRoomAt(this.lumi.tileX, this.lumi.tileY);
    if (!room) {
      return null;
    }
    const directions = Phaser.Utils.Array.Shuffle([...MOVE_DIRECTIONS]);
    const direction = directions.find((candidate) => (
      this.isLumiPatrolTile(this.lumi.tileX + candidate.x, this.lumi.tileY + candidate.y, room)
      && !this.isTileOccupied(this.lumi.tileX + candidate.x, this.lumi.tileY + candidate.y)
    ));
    return direction ? this.resolveEnemyMoveInDirection(this.lumi, direction) : null;
  },

  startLumiExchange() {
    const offerItemIds = this.getLumiOfferItemIds();
    const materialItems = this.playerStatus.inventory.filter((item) => (
      this.itemDefinitions.get(item.id)?.category === 90
    ));
    if (materialItems.length === 0) {
      this.actionLog.add('LUMI_NEEDS_MATERIAL');
      return;
    }
    if (offerItemIds.length === 0) {
      this.actionLog.add('LUMI_SAD');
      return;
    }
    this.lumiExchange = {
      phase: 'offer',
      offerItemIds,
      materialItems,
      selectedIndex: 0,
      offeredItemId: null,
    };
    this.refreshLumiExchangeUi();
    this.lumiExchangeUi.setVisible(true);
  },

  getLumiOfferItemIds() {
    return [9000, 9001, 9002, 9003, 9004, 9005, 9007, 9010, 9011, 9012, 9015, 9017]
      .filter((itemId) => this.itemDefinitions.get(itemId)?.category === 90);
  },

  refreshLumiExchangeUi() {
    const exchange = this.lumiExchange;
    if (!exchange) {
      return;
    }
    const choices = exchange.phase === 'offer' ? exchange.offerItemIds : exchange.materialItems;
    const page = Math.floor(exchange.selectedIndex / this.lumiExchangeRows.length);
    const pageCount = Math.ceil(choices.length / this.lumiExchangeRows.length);
    const firstIndex = page * this.lumiExchangeRows.length;
    const selectedDefinition = exchange.offeredItemId && this.itemDefinitions.get(exchange.offeredItemId);
    this.lumiExchangePrompt.setText(exchange.phase === 'offer'
      ? '交換で受け取る素材を選んでください。'
      : `${selectedDefinition?.name ?? '素材'} と交換する手持ち素材を選んでください。`);
    this.lumiExchangePageIndicator.setText(pageCount > 1 ? `ページ ${page + 1}/${pageCount}` : '');
    this.lumiExchangeRows.forEach((row, index) => {
      const choiceIndex = firstIndex + index;
      const choice = choices[choiceIndex];
      const definition = this.itemDefinitions.get(exchange.phase === 'offer' ? choice : choice?.id);
      row.setText(definition ? `${choiceIndex === exchange.selectedIndex ? '>' : ' '} ${definition.name}` : '');
      row.setColor(choiceIndex === exchange.selectedIndex ? '#ffdc4a' : '#f3f1e8');
    });
  },

  handleLumiExchangeInput(event) {
    const exchange = this.lumiExchange;
    if (!exchange) {
      return false;
    }
    const choices = exchange.phase === 'offer' ? exchange.offerItemIds : exchange.materialItems;
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      const currentPage = Math.floor(exchange.selectedIndex / this.lumiExchangeRows.length);
      const firstIndex = currentPage * this.lumiExchangeRows.length;
      const lastIndex = Math.min(firstIndex + this.lumiExchangeRows.length - 1, choices.length - 1);
      exchange.selectedIndex = event.code === 'ArrowUp'
        ? (exchange.selectedIndex === firstIndex ? lastIndex : exchange.selectedIndex - 1)
        : (exchange.selectedIndex === lastIndex ? firstIndex : exchange.selectedIndex + 1);
      this.playSfx('se-cursor-move');
      this.refreshLumiExchangeUi();
      return true;
    }
    if ((event.code === 'ArrowLeft' || event.code === 'ArrowRight') && choices.length > this.lumiExchangeRows.length) {
      const pageCount = Math.ceil(choices.length / this.lumiExchangeRows.length);
      const pageOffset = event.code === 'ArrowRight' ? 1 : pageCount - 1;
      const nextPage = (Math.floor(exchange.selectedIndex / this.lumiExchangeRows.length) + pageOffset) % pageCount;
      exchange.selectedIndex = Math.min(
        nextPage * this.lumiExchangeRows.length + (exchange.selectedIndex % this.lumiExchangeRows.length),
        choices.length - 1,
      );
      this.playSfx('se-cursor-move');
      this.refreshLumiExchangeUi();
      return true;
    }
    if (event.code === 'KeyX' || event.code === 'Escape') {
      this.closeLumiExchange(false);
      return true;
    }
    if (!['KeyZ', 'Enter', 'Space'].includes(event.code)) {
      return true;
    }
    this.playSfx('se-cursor-enter');
    if (exchange.phase === 'offer') {
      exchange.offeredItemId = choices[exchange.selectedIndex];
      exchange.phase = 'material';
      exchange.selectedIndex = 0;
      this.refreshLumiExchangeUi();
      return true;
    }
    const material = choices[exchange.selectedIndex];
    this.removeInventoryOrFloorItem(material);
    this.playerStatus.addItem(exchange.offeredItemId, 1, this.itemDefinitions);
    this.playSfx('se-craft-ok');
    this.closeLumiExchange(true);
    this.refreshInventoryUi();
    this.destroyLumi();
    this.actionLog.add('LUMI_HAPPY');
    this.consumeItemTurn();
    return true;
  },

  closeLumiExchange(exchanged) {
    this.lumiExchangeUi.setVisible(false);
    this.lumiExchange = null;
    if (!exchanged) {
      this.playSfx('se-cursor-cancel');
      this.actionLog.add('LUMI_SAD');
    }
  },

  destroyLumi() {
    this.lumi?.sprite.destroy();
    this.lumi = null;
    this.updateVisibility();
  },
};