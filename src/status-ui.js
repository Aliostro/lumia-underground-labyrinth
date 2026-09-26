class StatusUi {
  constructor(scene, options) {
    this.scene = scene;
    this.x = options.x;
    this.y = options.y;
    this.height = options.height;
    this.depth = options.depth;
  }

  create(playerStatus, itemDefinitions) {
    const floorWidth = 120;
    const levelWidth = 120;
    const statWidth = 300;
    const combatStatWidth = 140;
    const equipmentWidth = 380;
    const equipmentHeight = 112;
    const gap = 8;
    const levelX = this.x + floorWidth + gap;
    const healthX = levelX + levelWidth + gap;
    const hungerX = healthX + statWidth + gap;
    const attackX = hungerX + statWidth + gap;
    const defenseX = attackX + combatStatWidth + gap;
    const equipmentY = this.y + this.height + gap;
    this.graphics = this.scene.add.graphics().setScrollFactor(0).setDepth(this.depth);
    const textStyle = { fontFamily: 'Yusei Magic, sans-serif', color: '#f3f1e8' };
    this.scene.add.text(this.x + 16, this.y + 22, `B${playerStatus.floor}F`, {
      ...textStyle,
      fontSize: '32px',
    }).setScrollFactor(0).setDepth(this.depth);
    this.levelText = this.scene.add.text(levelX + 14, this.y + 12, '', {
      ...textStyle,
      fontSize: '18px',
    }).setScrollFactor(0).setDepth(this.depth);
    this.healthLabelText = this.scene.add.text(healthX + 14, this.y + 12, 'HP', {
      ...textStyle,
      fontSize: '18px',
    }).setScrollFactor(0).setDepth(this.depth);
    this.hitPointsText = this.scene.add.text(healthX + statWidth - 14, this.y + 12, '', {
      ...textStyle,
      fontSize: '18px',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(this.depth);
    this.hungerLabelText = this.scene.add.text(hungerX + 14, this.y + 12, '満腹度', {
      ...textStyle,
      fontSize: '18px',
    }).setScrollFactor(0).setDepth(this.depth);
    this.hungerText = this.scene.add.text(hungerX + statWidth - 14, this.y + 12, '', {
      ...textStyle,
      fontSize: '18px',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(this.depth);
    this.scene.add.text(attackX + 14, this.y + 12, '攻撃力', {
      ...textStyle,
      fontSize: '18px',
    }).setScrollFactor(0).setDepth(this.depth);
    this.attackText = this.scene.add.text(attackX + combatStatWidth - 14, this.y + 12, '', {
      ...textStyle,
      fontSize: '18px',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(this.depth);
    this.scene.add.text(defenseX + 14, this.y + 12, '防御力', {
      ...textStyle,
      fontSize: '18px',
    }).setScrollFactor(0).setDepth(this.depth);
    this.defenseText = this.scene.add.text(defenseX + combatStatWidth - 14, this.y + 12, '', {
      ...textStyle,
      fontSize: '18px',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(this.depth);
    this.equipmentCategories = [
      { category: 0, label: '武器' },
      { category: 10, label: '遠距離武器' },
      { category: 20, label: '防具' },
      { category: 30, label: '装飾' },
    ];
    this.equipmentTexts = this.equipmentCategories.map((equipment, index) => this.scene.add.text(
      this.x + 14,
      equipmentY + 8 + index * 25,
      '',
      { ...textStyle, fontSize: '18px' },
    ).setScrollFactor(0).setDepth(this.depth));
    this.layout = {
      floorWidth,
      levelWidth,
      statWidth,
      combatStatWidth,
      equipmentWidth,
      equipmentHeight,
      levelX,
      healthX,
      hungerX,
      attackX,
      defenseX,
      equipmentY,
    };
    this.update(playerStatus, itemDefinitions);
  }

  update(playerStatus, itemDefinitions) {
    const {
      floorWidth,
      levelWidth,
      statWidth,
      combatStatWidth,
      equipmentWidth,
      equipmentHeight,
      levelX,
      healthX,
      hungerX,
      attackX,
      defenseX,
      equipmentY,
    } = this.layout;
    this.graphics.clear();
    this.graphics.fillStyle(0x000000, 0.48);
    this.graphics.fillRect(this.x, this.y, floorWidth, this.height);
    this.graphics.fillRect(levelX, this.y, levelWidth, this.height);
    this.graphics.fillRect(healthX, this.y, statWidth, this.height);
    this.graphics.fillRect(hungerX, this.y, statWidth, this.height);
    this.graphics.fillRect(attackX, this.y, combatStatWidth, this.height);
    this.graphics.fillRect(defenseX, this.y, combatStatWidth, this.height);
    this.graphics.fillRect(this.x, equipmentY, equipmentWidth, equipmentHeight);
    this.drawGauge(
      levelX,
      playerStatus.getCurrentLevelExperience(),
      playerStatus.getExperienceToNextLevel(),
      0x76d7ea,
      levelWidth - 28,
    );
    this.drawGauge(healthX, playerStatus.hitPoints, playerStatus.maxHitPoints, 0xdf5b62, statWidth - 28);
    this.drawGauge(hungerX, playerStatus.hunger, playerStatus.maxHunger, 0xe7bc52, statWidth - 28);
    this.levelText.setText(`Lv ${playerStatus.level}`);
    this.hitPointsText.setText(`${playerStatus.hitPoints} / ${playerStatus.maxHitPoints}`);
    const hitPointsColor = playerStatus.brandTurns > 0 ? '#ffdc4a' : '#f3f1e8';
    this.healthLabelText.setColor(hitPointsColor);
    this.hitPointsText.setColor(hitPointsColor);
    this.hungerText.setText(`${playerStatus.hunger} / ${playerStatus.maxHunger}`);
    const hungerColor = playerStatus.hunger === 0 ? '#df5b62' : '#f3f1e8';
    this.hungerLabelText.setColor(hungerColor);
    this.hungerText.setColor(hungerColor);
    this.attackText.setText(playerStatus.attack);
    this.defenseText.setText(playerStatus.defense);
    this.equipmentTexts.forEach((text, index) => {
      const equipment = this.equipmentCategories[index];
      const item = playerStatus.inventory.find((inventoryItem) => inventoryItem.equipped === equipment.category);
      const name = item ? itemDefinitions.get(item.id)?.name ?? '' : '';
      const uses = equipment.category === 10 && item?.usesRemaining != null
        ? ` (${item.usesRemaining})`
        : '';
      text.setText(`${equipment.label}: ${name}${uses}`);
    });
  }

  drawGauge(x, value, maximum, color, width) {
    const gaugeX = x + 14;
    const gaugeY = this.y + 49;
    const gaugeHeight = 14;
    const ratio = Phaser.Math.Clamp(value / maximum, 0, 1);
    this.graphics.fillStyle(0x17212a, 1);
    this.graphics.fillRect(gaugeX, gaugeY, width, gaugeHeight);
    this.graphics.fillStyle(color, 1);
    this.graphics.fillRect(gaugeX, gaugeY, width * ratio, gaugeHeight);
  }
}