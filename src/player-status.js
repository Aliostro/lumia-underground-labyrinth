class PlayerStatus {
  constructor() {
    this.floor = 1;
    this.hitPoints = 20;
    this.maxHitPoints = 20;
    this.hunger = 100;
    this.maxHunger = 100;
    this.baseAttack = 3;
    this.baseDefense = 0;
    this.attack = this.baseAttack;
    this.defense = this.baseDefense;
    this.level = 1;
    this.experience = 0;
    this.stepsSinceHungerLoss = 0;
    this.recoveryProgress = 0;
    this.sleepTurns = 0;
    this.confusionTurns = 0;
    this.confusionJustEnded = false;
    this.speedTurns = 0;
    this.hasteExtraAction = false;
    this.slowTurns = 0;
    this.paralysisTurns = 0;
    this.slowSkipNextTurn = false;
    this.brandTurns = 0;
    this.brainwashed = false;
    this.peaceTurns = 0;
    this.trapAvoidance = false;
    this.confusionImmunity = false;
    this.equipmentMaxHitPointBonus = 0;
    this.inventory = [];
    this.inventoryCapacity = 20;
  }

  addItem(itemId, quantity = 1, itemDefinitions = null, itemData = null) {
    let addedQuantity = 0;
    while (addedQuantity < quantity && this.inventory.length < this.inventoryCapacity) {
      const definition = itemDefinitions?.get(itemId);
      const item = { id: itemId };
      if (definition?.category === 10 || definition?.category === 50) {
        item.usesRemaining = itemData?.usesRemaining ?? Phaser.Math.Between(
          definition.useCountMinimum,
          definition.useCountMaximum,
        );
      }
      this.inventory.push(item);
      addedQuantity += 1;
    }
    return addedQuantity === quantity;
  }

  equipItem(item, definition) {
    this.inventory.forEach((inventoryItem) => {
      if (inventoryItem.equipped != null && inventoryItem.equipped === definition.category) {
        inventoryItem.equipped = null;
      }
    });
    item.equipped = definition.category;
    item.equipmentAttack = definition.attack;
    item.equipmentDefense = definition.defense;
    item.equipmentMaxHitPointBonus = {
      [ITEM_EQUIP_EFFECT_MAX_HIT_POINTS]: 15,
      [ITEM_EQUIP_EFFECT_GREATER_MAX_HIT_POINTS]: 30,
    }[definition.equipEffectId] ?? 0;
    this.updateEquipmentStats();
  }

  unequipItem(item) {
    item.equipped = null;
    this.updateEquipmentStats();
  }

  updateEquipmentStats() {
    this.attack = this.baseAttack;
    this.defense = this.baseDefense;
    let equipmentMaxHitPointBonus = 0;
    this.inventory.forEach((item) => {
      if (item.equipped == null) {
        return;
      }
      this.attack += Number(item.equipmentAttack) || 0;
      this.defense += Number(item.equipmentDefense) || 0;
      equipmentMaxHitPointBonus += Number(item.equipmentMaxHitPointBonus) || 0;
    });
    this.maxHitPoints += equipmentMaxHitPointBonus - this.equipmentMaxHitPointBonus;
    this.equipmentMaxHitPointBonus = equipmentMaxHitPointBonus;
    this.hitPoints = Math.min(this.hitPoints, this.maxHitPoints);
  }

  getLevelExperienceRequirement(level) {
    let requirement = 10;
    for (let currentLevel = 1; currentLevel < level; currentLevel += 1) {
      requirement = Math.ceil(requirement * 1.5);
    }
    return requirement;
  }

  getLevelStartExperience(level) {
    let totalExperience = 0;
    for (let currentLevel = 1; currentLevel < level; currentLevel += 1) {
      totalExperience += this.getLevelExperienceRequirement(currentLevel);
    }
    return totalExperience;
  }

  getNextLevelExperience() {
    return this.getLevelStartExperience(this.level + 1);
  }

  getCurrentLevelExperience() {
    return this.experience - this.getLevelStartExperience(this.level);
  }

  getExperienceToNextLevel() {
    return this.getLevelExperienceRequirement(this.level);
  }

  gainExperience(amount) {
    this.experience += amount;
    const levelsGained = [];
    while (this.experience >= this.getNextLevelExperience()) {
      this.level += 1;
      const hitPointIncrease = Math.floor(Math.random() * 3) + 3;
      this.maxHitPoints += hitPointIncrease;
      this.hitPoints += hitPointIncrease;
      if (this.level <= 30) {
        this.baseAttack += 1;
      }
      this.updateEquipmentStats();
      levelsGained.push(this.level);
    }
    return levelsGained;
  }

  setLevel(level) {
    const targetLevel = Math.max(1, level);
    if (targetLevel <= this.level) {
      return;
    }
    this.gainExperience(this.getLevelStartExperience(targetLevel));
  }

  advanceTurn(moved) {
    if (this.hunger === 0) {
      this.hitPoints = Math.max(0, this.hitPoints - 1);
    } else {
      this.stepsSinceHungerLoss += 1;
      if (this.stepsSinceHungerLoss === 10) {
        this.hunger -= 1;
        this.stepsSinceHungerLoss = 0;
      }
    }

    if (this.hunger > 0 && this.hitPoints < this.maxHitPoints && this.brandTurns === 0) {
      this.recoveryProgress += this.maxHitPoints / 100;
      const recovery = Math.floor(this.recoveryProgress);
      this.hitPoints = Math.min(this.maxHitPoints, this.hitPoints + recovery);
      this.recoveryProgress -= recovery;
    }
    if (this.brandTurns > 0) {
      this.brandTurns -= 1;
    }
  }
}