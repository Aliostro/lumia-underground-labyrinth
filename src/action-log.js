class ActionLog {
  constructor(scene, messages, getFloorTurn) {
    this.scene = scene;
    this.messages = messages;
    this.getFloorTurn = getFloorTurn;
    this.entries = [];
    this.pendingEntries = [];
    this.pendingEntryTimer = null;
    this.historyVisible = false;
    this.historyOffset = 0;
    const width = 440;
    const height = 240;
    const x = GAME_WIDTH - width - 24;
    const y = GAME_HEIGHT - height - 24;
    this.position = { x, y, height };
    this.texts = Array.from({ length: 8 }, () => scene.add.text(x + 12, y, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '18px',
      color: '#f3f1e8',
      backgroundColor: '#00000099',
      padding: { x: 8, y: 3 },
      wordWrap: { width: width - 40, useAdvancedWrap: true },
    }).setScrollFactor(0).setDepth(STATUS_DEPTH).setVisible(false));
    const historyWidth = GAME_WIDTH - 96;
    const historyHeight = GAME_HEIGHT - 112;
    const historyX = GAME_WIDTH / 2;
    const historyY = GAME_HEIGHT / 2;
    this.historyPanel = scene.add.rectangle(historyX, historyY, historyWidth, historyHeight, 0x101820, 0.96)
      .setStrokeStyle(2, 0xffdc4a)
      .setScrollFactor(0)
      .setDepth(STATUS_DEPTH + 10)
      .setVisible(false);
    this.historyTitle = scene.add.text(historyX - historyWidth / 2 + 24, historyY - historyHeight / 2 + 18, 'メッセージログ', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '24px',
      color: '#ffdc4a',
    }).setScrollFactor(0).setDepth(STATUS_DEPTH + 11).setVisible(false);
    this.historyPage = scene.add.text(historyX + historyWidth / 2 - 24, historyY - historyHeight / 2 + 22, '', {
      fontFamily: 'Yusei Magic, sans-serif',
      fontSize: '16px',
      color: '#9ab5c7',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(STATUS_DEPTH + 11).setVisible(false);
    this.historyTurns = Array.from({ length: 12 }, (_, index) => scene.add.text(
      historyX - historyWidth / 2 + 24,
      historyY - historyHeight / 2 + 62 + index * 44,
      '',
      {
        fontFamily: 'Yusei Magic, sans-serif',
        fontSize: '16px',
        color: '#9ab5c7',
      },
    ).setScrollFactor(0).setDepth(STATUS_DEPTH + 11).setVisible(false));
    this.historyTexts = Array.from({ length: 12 }, (_, index) => scene.add.text(
      historyX - historyWidth / 2 + 128,
      historyY - historyHeight / 2 + 62 + index * 44,
      '',
      {
        fontFamily: 'Yusei Magic, sans-serif',
        fontSize: '18px',
        color: '#f3f1e8',
        wordWrap: { width: historyWidth - 152, useAdvancedWrap: true },
      },
    ).setScrollFactor(0).setDepth(STATUS_DEPTH + 11).setVisible(false));
  }

  add(messageId, values = {}) {
    const template = this.messages.get(messageId);
    if (!template) {
      return;
    }
    const text = template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
    this.pendingEntries.push(text);
    if (!this.pendingEntryTimer) {
      this.showNextPendingEntry(0);
    }
  }

  addEntry(text) {
    const entry = { text, floorTurn: this.getFloorTurn() };
    this.entries.push(entry);
    this.render();
    this.showNextPendingEntry();
  }

  toggleHistory() {
    this.historyVisible = !this.historyVisible;
    this.historyOffset = 0;
    this.render();
  }

  scrollHistory(amount) {
    const maximumOffset = Math.max(0, this.entries.length - this.historyTexts.length);
    this.historyOffset = Phaser.Math.Clamp(this.historyOffset + amount, 0, maximumOffset);
    this.renderHistory();
  }

  showNextPendingEntry(delay = 50) {
    if (this.pendingEntries.length === 0) {
      return;
    }
    this.pendingEntryTimer = this.scene.time.delayedCall(delay, () => {
      this.pendingEntryTimer = null;
      this.addEntry(this.pendingEntries.shift());
    });
  }

  render() {
    let bottom = this.position.y + this.position.height;
    const recentEntries = this.entries.slice(-this.texts.length);
    this.texts.forEach((logText, index) => {
      const entry = recentEntries[index];
      logText.setVisible(false);
      if (entry) {
        logText.setText(entry.text);
      }
    });
    for (let index = recentEntries.length - 1; index >= 0; index -= 1) {
      const logText = this.texts[index];
      if (bottom - logText.height < this.position.y) {
        continue;
      }
      bottom -= logText.height;
      logText.setY(bottom);
      logText.setVisible(true);
    }
    this.renderHistory();
  }

  renderHistory() {
    this.historyPanel.setVisible(this.historyVisible);
    this.historyTitle.setVisible(this.historyVisible);
    this.historyPage.setVisible(this.historyVisible);
    this.texts.forEach((text) => text.setVisible(!this.historyVisible && text.visible));
    if (!this.historyVisible) {
      this.historyTurns.forEach((text) => text.setVisible(false));
      this.historyTexts.forEach((text) => text.setVisible(false));
      return;
    }
    const endIndex = this.entries.length - this.historyOffset;
    const startIndex = Math.max(0, endIndex - this.historyTexts.length);
    const visibleEntries = this.entries.slice(startIndex, endIndex);
    this.historyPage.setText(`${startIndex + 1}-${endIndex} / ${this.entries.length}`);
    this.historyTexts.forEach((logText, index) => {
      const entry = visibleEntries[index];
      logText.setText(entry?.text ?? '').setVisible(Boolean(entry));
      this.historyTurns[index]
        .setText(entry ? `${entry.floorTurn} ターン目` : '')
        .setVisible(Boolean(entry));
    });
  }
}