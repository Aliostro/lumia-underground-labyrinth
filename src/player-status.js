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
    this.bindTurns = 0;
    this.slowSkipNextTurn = false;
    this.brandTurns = 0;
    this.brainwashed = false;
    this.peaceTurns = 0;
    this.trapAvoidance = false;
    this.confusionImmunity = false;
    this.equipmentMaxHitPointBonus = 0;
    this.equipmentMaxHitPointPenalty = 0;
    this.equipmentEffectFailures = {};
    this.inventory = [];
    this.inventoryCapacity = 20;
  }

  addItem(itemId, quantity = 1, itemDefinitions = null, itemData = null) {
    let addedQuantity = 0;
    while (addedQuantity < quantity && this.inventory.length < this.inventoryCapacity) {
      const definition = itemDefinitions?.get(itemId);
      const item = { id: itemId };
      if (GameData.hasItemCharge(item)) {
        item.charge = GameData.getItemCharge(itemData);
        item.chargeTurns = itemData?.chargeTurns ?? 0;
      }
      if (definition?.category === 10 || definition?.category === 50) {
        item.usesRemaining = itemData?.usesRemaining ?? Phaser.Math.Between(
          definition.useCountMinimum,
          definition.useCountMaximum,
        );
      }
      if (itemData?.frozen) {
        item.frozen = true;
      }
      if (itemData?.upgraded) {
        item.upgraded = true;
      }
      this.inventory.push(item);
      addedQuantity += 1;
    }
    return addedQuantity === quantity;
  }

  equipItem(item, definition) {
    if (GameData.hasItemCharge(item)) {
      item.charge = Math.max(0, GameData.getItemCharge(item) - 1);
    }
    this.inventory.forEach((inventoryItem) => {
      if (inventoryItem.equipped != null && inventoryItem.equipped === definition.category) {
        inventoryItem.equipped = null;
      }
    });
    item.equipped = definition.category;
    item.equipmentAttack = definition.attack;
    item.equipmentDefense = definition.defense + (item.upgraded && definition.category === 20 ? 3 : 0);
    item.equipmentEffectId = definition.equipEffectId;
    item.equipmentMaxHitPointBonus = {
      [ITEM_EQUIP_EFFECT_MAX_HIT_POINTS]: 15,
      [ITEM_EQUIP_EFFECT_GREATER_MAX_HIT_POINTS]: 30,
    }[definition.equipEffectId] ?? 0;
    this.resetEquipmentEffectFailures();
    this.updateEquipmentStats();
  }

  unequipItem(item) {
    item.equipped = null;
    this.resetEquipmentEffectFailures();
    this.updateEquipmentStats();
  }

  getEquipmentEffectChance(effectId, baseChance) {
    const failures = this.equipmentEffectFailures?.[effectId] ?? 0;
    return Math.min(1, baseChance * (failures + 1));
  }

  tryEquipmentEffect(effectId, baseChance) {
    if (Math.random() >= this.getEquipmentEffectChance(effectId, baseChance)) {
      return false;
    }
    this.resetEquipmentEffectFailures(effectId);
    return true;
  }

  recordEquipmentEffectFailure(effectId) {
    this.equipmentEffectFailures ??= {};
    this.equipmentEffectFailures[effectId] = (this.equipmentEffectFailures[effectId] ?? 0) + 1;
  }

  resetEquipmentEffectFailures(effectId = null) {
    if (effectId == null) {
      this.equipmentEffectFailures = {};
      return;
    }
    this.equipmentEffectFailures ??= {};
    this.equipmentEffectFailures[effectId] = 0;
  }

  updateEquipmentStats() {
    this.attack = this.baseAttack;
    this.defense = this.baseDefense;
    let equipmentMaxHitPointBonus = 0;
    const baseMaxHitPoints = this.maxHitPoints
      - this.equipmentMaxHitPointBonus
      + (this.equipmentMaxHitPointPenalty ?? 0);
    let hasLifeStealMaxHitPointPenalty = false;
    this.inventory.forEach((item) => {
      if (item.equipped == null) {
        return;
      }
      this.attack += Number(item.equipmentAttack) || 0;
      if (item.equipmentEffectId === ITEM_EQUIP_EFFECT_CHARGED_ATTACK_INCREASE
        && GameData.getItemCharge(item) > 0) {
        this.attack += 30;
      }
      this.defense += Number(item.equipmentDefense) || 0;
      equipmentMaxHitPointBonus += Number(item.equipmentMaxHitPointBonus) || 0;
      hasLifeStealMaxHitPointPenalty ||= item.equipmentEffectId === ITEM_EQUIP_EFFECT_LIFE_STEAL;
    });
    this.equipmentMaxHitPointBonus = equipmentMaxHitPointBonus;
    this.equipmentMaxHitPointPenalty = hasLifeStealMaxHitPointPenalty
      ? Math.floor((baseMaxHitPoints + equipmentMaxHitPointBonus) * 0.15)
      : 0;
    this.maxHitPoints = baseMaxHitPoints
      + equipmentMaxHitPointBonus
      - this.equipmentMaxHitPointPenalty;
    this.hitPoints = Math.min(this.hitPoints, this.maxHitPoints);
  }

  getLevelExperienceRequirement(level) {
    let requirement = 10;
    for (let currentLevel = 1; currentLevel < level; currentLevel += 1) {
      const multiplier = currentLevel >= 40
        ? 1
        : currentLevel >= 30
          ? 1.05
          : currentLevel >= 20
            ? 1.2
            : 1.5;
      requirement = Math.ceil(requirement * multiplier);
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

  advanceTurn(moved, hasCladRing = false, recoveryBonus = 0, hasSlowHungerLoss = false, hasDoubleDamage = false) {
    this.inventory.forEach((item) => {
      if (!GameData.hasItemCharge(item) || item.equipped == null) {
        return;
      }
      item.charge = GameData.getItemCharge(item);
      item.chargeTurns = (item.chargeTurns ?? 0) + 1;
      if (item.chargeTurns >= 10) {
        item.charge = Math.max(0, item.charge - 1);
        item.chargeTurns = 0;
        this.updateEquipmentStats();
      }
    });
    if (this.hunger === 0) {
      this.hitPoints = Math.max(0, this.hitPoints - (hasDoubleDamage ? 2 : 1));
    } else {
      this.stepsSinceHungerLoss += 1;
      if (this.stepsSinceHungerLoss >= (hasSlowHungerLoss ? 20 : 10)) {
        this.hunger -= 1;
        this.stepsSinceHungerLoss = 0;
      }
      if (hasCladRing) {
        this.hunger = Math.max(0, this.hunger - 1);
      }
    }

    if (this.hunger > 0 && this.hitPoints < this.maxHitPoints && this.brandTurns === 0) {
      this.recoveryProgress += (this.maxHitPoints / 100 + recoveryBonus) * (hasCladRing ? 3 : 1);
      const recovery = Math.floor(this.recoveryProgress);
      this.hitPoints = Math.min(this.maxHitPoints, this.hitPoints + recovery);
      this.recoveryProgress -= recovery;
    }
    if (this.brandTurns > 0) {
      this.brandTurns -= 1;
    }
  }
}