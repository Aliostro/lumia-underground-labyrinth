const EnemyAbilities = {
  freezeWaterUnderElena(enemy) {
    if (
      !ELENA_FREEZE_SKILL_IDS.includes(enemy.specialAbilityId)
      || this.dungeonTiles[enemy.tileY]?.[enemy.tileX] !== WATER_TILE
    ) {
      return false;
    }
    this.dungeonTiles[enemy.tileY][enemy.tileX] = ICE_TILE;
    const tile = { x: enemy.tileX, y: enemy.tileY };
    this.dungeonRenderer.refreshTiles([tile]);
    const tileKey = `${tile.x},${tile.y}`;
    if (this.empDroneActive || this.minimapUi?.discoveredTiles.has(tileKey)) {
      this.minimapUi.refreshTiles([tile]);
    }
    return true;
  },

  useAldaDig(enemy) {
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_ALDA_DIG
      || this.getEnemyVisibleTiles(enemy).has(`${this.heroTileX},${this.heroTileY}`)
    ) {
      return false;
    }
    const directions = [
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
    ];
    const canDig = ({ x, y }) => {
      const tileX = enemy.tileX + x;
      const tileY = enemy.tileY + y;
      return this.dungeonTiles[tileY]?.[tileX] === 0
        && !this.isOuterWallTile(tileX, tileY)
        && !this.isTileOccupied(tileX, tileY);
    };
    let direction = enemy.aldaDigDirection;
    if (
      direction
      && enemy.aldaDigsUntilTurn > 0
      && this.isWalkableTile(this.dungeonTiles[enemy.tileY + direction.y]?.[enemy.tileX + direction.x])
    ) {
      return false;
    }
    if (!direction || enemy.aldaDigsUntilTurn <= 0 || !canDig(direction)) {
      const turnDirections = direction
        ? [
          { x: -direction.y, y: direction.x },
          { x: direction.y, y: -direction.x },
        ].filter(canDig)
        : [];
      direction = Phaser.Utils.Array.GetRandom(turnDirections.length > 0
        ? turnDirections
        : directions.filter(canDig));
      enemy.aldaDigsUntilTurn = 4 + Math.floor(this.getInitialRandom() * 3);
    }
    if (!direction) {
      return false;
    }
    const tileX = enemy.tileX + direction.x;
    const tileY = enemy.tileY + direction.y;
    this.dungeonTiles[tileY][tileX] = CORRIDOR_TILE;
    const tile = { x: tileX, y: tileY };
    this.pendingAldaDugTiles.push(tile);
    const tileKey = `${tileX},${tileY}`;
    if (this.empDroneActive || this.minimapUi?.discoveredTiles.has(tileKey)) {
      this.pendingAldaMinimapTiles.push(tile);
    }
    this.corridorTiles.push(tile);
    enemy.aldaDigDirection = direction;
    enemy.aldaDigsUntilTurn -= 1;
    return true;
  },

  resolveAldaAdvanceMove(enemy) {
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_ALDA_DIG
      || !enemy.aldaDigDirection
      || this.getEnemyVisibleTiles(enemy).has(`${this.heroTileX},${this.heroTileY}`)
    ) {
      return null;
    }
    const { x, y } = enemy.aldaDigDirection;
    return this.isWalkableTile(this.dungeonTiles[enemy.tileY + y]?.[enemy.tileX + x])
      ? this.resolveEnemyMoveInDirection(enemy, enemy.aldaDigDirection)
      : null;
  },

  getTiaPaintTargets(enemy) {
    const visibleTiles = this.getEnemyVisibleTiles(enemy);
    return this.enemies.filter((target) => (
      target !== enemy
      && !target.tiaPaintColor
      && visibleTiles.has(`${target.tileX},${target.tileY}`)
    ));
  },

  useTiaPaint(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_TIA_PAINT) {
      return false;
    }
    const adjacentTargets = this.getTiaPaintTargets(enemy).filter((target) => (
      this.isEnemyAdjacentTo(enemy, target.tileX, target.tileY)
    ));
    const target = Phaser.Utils.Array.GetRandom(adjacentTargets);
    if (!target) {
      return false;
    }
    const color = this.getInitialRandomItem(['red', 'yellow', 'blue']);
    target.tiaPaintColor = color;
    if (color === 'red') {
      target.attack += 5;
    } else if (color === 'blue') {
      target.defense += 5;
    }
    this.refreshTiaPaintMarker(target);
    this.actionLog.add('ENEMY_TIA_PAINTS', {
      enemy: this.getEnemyLogName(enemy),
      target: this.getEnemyLogName(target),
      color: { red: 'あかっ', yellow: 'きいろっ', blue: 'あおっ' }[color],
    });
    return true;
  },

  resolveTiaMovement(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_TIA_PAINT) {
      return null;
    }
    const targets = this.getTiaPaintTargets(enemy).sort((first, second) => (
      Math.max(Math.abs(first.tileX - enemy.tileX), Math.abs(first.tileY - enemy.tileY))
      - Math.max(Math.abs(second.tileX - enemy.tileX), Math.abs(second.tileY - enemy.tileY))
    ));
    const target = targets[0];
    if (!target) {
      return null;
    }
    const step = this.findShortestPathStep(enemy, { x: target.tileX, y: target.tileY });
    return step && this.resolveEnemyMoveInDirection(enemy, {
      x: step.x - enemy.tileX,
      y: step.y - enemy.tileY,
    });
  },

  refreshTiaPaintMarker(enemy) {
    if (!enemy.tiaPaintColor) {
      enemy.tiaPaintMarker?.setVisible(false);
      return;
    }
    const color = { red: 0xf04f4f, yellow: 0xf1ca3a, blue: 0x4c9dff }[enemy.tiaPaintColor];
    if (!enemy.tiaPaintMarker) {
      enemy.tiaPaintMarker = this.add.graphics()
        .fillStyle(color, 1)
        .fillCircle(0, 0, 10)
        .lineStyle(2, 0x6b4327, 1)
        .strokeCircle(0, 0, 10);
    }
    enemy.tiaPaintMarker
      .setPosition(enemy.sprite.x + 34, enemy.sprite.y - 90)
      .setDepth(enemy.sprite.depth + 1);
  },

  getMaiUpgradeTargets(enemy) {
    const visibleTiles = this.getEnemyVisibleTiles(enemy);
    return this.floorItems.filter((item) => {
      const definition = this.itemDefinitions.get(item.id);
      return definition?.category === 20
        && !item.upgraded
        && visibleTiles.has(`${item.tileX},${item.tileY}`);
    });
  },

  useMaiUpgrade(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_MAI_UPGRADE) {
      return false;
    }
    const item = this.getFloorItemAt(enemy.tileX, enemy.tileY);
    const definition = item && this.itemDefinitions.get(item.id);
    if (definition?.category !== 20 || item.upgraded) {
      return false;
    }
    item.upgraded = true;
    this.actionLog.add('ENEMY_MAI_UPGRADES_ARMOR', {
      enemy: this.getEnemyLogName(enemy),
    });
    this.refreshInventoryUi();
    return true;
  },

  resolveMaiMovement(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_MAI_UPGRADE) {
      return null;
    }
    const targets = this.getMaiUpgradeTargets(enemy).sort((first, second) => (
      Math.max(Math.abs(first.tileX - enemy.tileX), Math.abs(first.tileY - enemy.tileY))
      - Math.max(Math.abs(second.tileX - enemy.tileX), Math.abs(second.tileY - enemy.tileY))
    ));
    const target = targets[0];
    if (!target) {
      return null;
    }
    const step = this.findShortestPathStep(enemy, { x: target.tileX, y: target.tileY });
    return step && this.resolveEnemyMoveInDirection(enemy, {
      x: step.x - enemy.tileX,
      y: step.y - enemy.tileY,
    });
  },

  useElenaFreezeItems(enemy, attacks) {
    const frozenItemCount = {
      [ENEMY_SKILL_GOLD_ELENA_FREEZE]: 1,
      [ENEMY_SKILL_MITHRIL_ELENA_FREEZE]: 2,
      [ENEMY_SKILL_ETA_ELENA_FREEZE]: 3,
    }[enemy.specialAbilityId] ?? 0;
    if (
      frozenItemCount === 0
      || !this.isEnemyAdjacent(enemy)
      || Math.random() >= 0.25
    ) {
      return false;
    }
    const freezePrevented = this.hasEquipEffect(ITEM_EQUIP_EFFECT_ITEM_THEFT_AND_TRANSFORMATION_IMMUNITY);
    const candidates = this.playerStatus.inventory.filter((item) => (
      item.equipped == null && !item.frozen
    ));
    const frozenItems = Phaser.Utils.Array.Shuffle(candidates).slice(0, frozenItemCount);
    if (!freezePrevented && frozenItems.length === 0) {
      return false;
    }
    if (!freezePrevented) {
      frozenItems.forEach((item) => {
        item.frozen = true;
      });
    }
    attacks.push({
      sprite: enemy.sprite,
      targetsHero: true,
      onStartAsync: true,
      onStart: (complete) => {
        this.playSfx('se-kabehori');
        this.playElenaFreezeEffect(complete);
      },
    });
    this.actionLog.add('ENEMY_ELENA_FREEZES', { enemy: this.getEnemyLogName(enemy) });
    if (freezePrevented) {
      this.actionLog.add('ITEM_FREEZE_PREVENTED_BY_SWORD_STOPPER');
    } else {
      frozenItems.forEach((item) => {
        this.actionLog.add('ITEM_FROZEN', {
          item: this.itemDefinitions.get(item.id)?.name ?? 'アイテム',
        });
      });
      this.refreshInventoryUi();
    }
    return true;
  },

  playElenaFreezeEffect(onComplete) {
    const effect = this.add.graphics().setDepth(this.hero.depth + 3);
    effect.fillStyle(0xc8f4ff, 0.9);
    effect.lineStyle(2, 0xffffff, 0.95);
    Array.from({ length: 8 }, (_, index) => {
      const angle = Phaser.Math.DegToRad(index * 45);
      const distance = 28 + (index % 2) * 14;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      effect.fillTriangle(x, y - 12, x - 7, y + 8, x + 7, y + 8);
      effect.strokeTriangle(x, y - 12, x - 7, y + 8, x + 7, y + 8);
    });
    effect.setPosition(this.hero.x, this.hero.y - TILE_SIZE / 2);
    this.tweens.add({
      targets: effect,
      scaleX: 1.35,
      scaleY: 1.35,
      alpha: 0,
      duration: 360,
      ease: 'Sine.easeOut',
      onComplete: () => {
        effect.destroy();
        onComplete();
      },
    });
  },

  useYuminWakeAll(enemy) {
    if (enemy.specialAbilityId !== ENEMY_SKILL_YUMIN_WAKE_ALL) {
      return false;
    }
    const hasSleepingTarget = this.playerStatus.sleepTurns > 0 || this.enemies.some((target) => (
      target.status === 'sleep' || target.status === 'spawn-sleep'
    ));
    if (!hasSleepingTarget) {
      return false;
    }
    this.playerStatus.sleepTurns = 0;
    this.heroSleepText.setVisible(false);
    this.enemies.forEach((target) => this.wakeEnemy(target));
    this.playSfx('se-wind');
    this.playYuminWakeAllEffect();
    this.actionLog.add('ENEMY_YUMIN_WAKES_ALL');
    return true;
  },

  playYuminWakeAllEffect() {
    Array.from({ length: 14 }, (_, index) => {
      const effect = this.add.graphics().setScrollFactor(0).setDepth(200);
      effect.lineStyle(index % 3 === 0 ? 4 : 2, 0xc5f6ff, 0.75);
      effect.lineBetween(-90, 0, 105, Phaser.Math.Between(-12, 12));
      effect.setPosition(-120, Phaser.Math.Between(36, GAME_HEIGHT - 36));
      this.tweens.add({
        targets: effect,
        x: GAME_WIDTH + 120,
        alpha: 0,
        duration: Phaser.Math.Between(480, 720),
        delay: index * 28,
        ease: 'Sine.easeOut',
        onComplete: () => effect.destroy(),
      });
    });
  },

  useLenoreConfusion(enemy, attacks) {
    const enemyRoom = this.getRoomAt(enemy.tileX, enemy.tileY);
    const isHeroTarget = enemyRoom
      ? this.getRoomAt(this.heroTileX, this.heroTileY) === enemyRoom
      : Math.max(Math.abs(this.heroTileX - enemy.tileX), Math.abs(this.heroTileY - enemy.tileY)) <= 1;
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_LENORE_CONFUSION
      || !isHeroTarget
      || enemy.lenoreConfusionCooldown > 0
      || this.playerStatus.confusionJustEnded
      || Math.random() >= 0.2
    ) {
      return false;
    }
    enemy.lenoreConfusionCooldown = LENORE_CONFUSION_COOLDOWN_TURNS;
    const targets = [];
    if (
      this.playerStatus.confusionTurns === 0
      && !this.playerStatus.confusionImmunity
      && !this.hasEquipEffect(ITEM_EQUIP_EFFECT_CONFUSION_IMMUNITY)
    ) {
      this.playerStatus.confusionTurns = CONFUSION_TURN_COUNT;
      targets.push({ tileX: this.heroTileX, tileY: this.heroTileY });
    }
    this.enemies.forEach((target) => {
      const isTarget = target !== enemy && (enemyRoom
        ? this.getRoomAt(target.tileX, target.tileY) === enemyRoom
        : Math.max(Math.abs(target.tileX - enemy.tileX), Math.abs(target.tileY - enemy.tileY)) <= 1);
      if (!isTarget || target.confusionTurns > 0 || this.confusionEndedEnemies.has(target)) {
        return;
      }
      target.confusionTurns = CONFUSION_TURN_COUNT;
      this.confusionAppliedEnemies.add(target);
      targets.push(target);
    });
    attacks.push({
      sprite: enemy.sprite,
      onStartAsync: true,
      onStart: (complete) => {
        this.playEnemyViolinSfx();
        this.actionLog.add('ENEMY_LENORE_CONFUSION', { enemy: this.getEnemyLogName(enemy) });
        if (targets.some((target) => target.tileX === this.heroTileX && target.tileY === this.heroTileY)) {
          this.actionLog.add('PLAYER_CONFUSED');
        }
        targets.filter((target) => target !== this.hero && target.tileX != null && target.sleepText != null)
          .forEach((target) => this.actionLog.add('ENEMY_CONFUSED', { enemy: this.getEnemyLogName(target) }));
        this.playLenoreDarkAuraEffects(targets, complete);
      },
    });
    return true;
  },

  playLenoreDarkAuraEffects(targets, onComplete) {
    if (targets.length === 0) {
      onComplete();
      return;
    }
    let completedEffects = 0;
    const completeEffect = () => {
      completedEffects += 1;
      if (completedEffects === targets.length) {
        onComplete();
      }
    };
    targets.forEach((target) => {
      const effect = this.add.graphics().setDepth(FOG_DEPTH - 1);
      effect.fillStyle(0x4a1a6e, 0.42);
      effect.fillCircle(-TILE_SIZE * 0.2, TILE_SIZE * 0.16, TILE_SIZE * 0.17);
      effect.fillCircle(TILE_SIZE * 0.24, 0, TILE_SIZE * 0.14);
      effect.fillCircle(0, -TILE_SIZE * 0.22, TILE_SIZE * 0.12);
      effect.setPosition(
        (target.tileX + 0.5) * TILE_SIZE,
        (target.tileY + 0.5) * TILE_SIZE,
      ).setScale(0.55);
      this.tweens.add({
        targets: effect,
        angle: 120,
        scale: 1.35,
        alpha: 0,
        duration: 520,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          effect.destroy();
          completeEffect();
        },
      });
    });
  },

  createSisselaPainRelease(enemy) {
    const room = this.getRoomAt(enemy.tileX, enemy.tileY);
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_SISSELA_PAIN_RELEASE
      || enemy.sisselaPainReleased
      || enemy.hitPoints <= 1
      || !room
      || this.getRoomAt(this.heroTileX, this.heroTileY) !== room
      || Math.random() >= 0.25
    ) {
      return null;
    }
    const damage = enemy.hitPoints - 1;
    enemy.sisselaPainReleased = true;
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    return {
      sprite: enemy.sprite,
      symbolOutline: enemy.symbolOutline,
      symbol: enemy.symbol,
      targetsHero: true,
      onStartAsync: true,
      onStart: (complete) => {
        this.playSfx('se-saint-bomb');
        this.playSisselaPainReleaseEffect(() => {
        enemy.hitPoints = 1;
        this.actionLog.add('ENEMY_SISSELA_RELEASES_PAIN', { enemy: this.getEnemyLogName(enemy) });
        const heroDamage = Math.min(damage, Math.max(0, this.playerStatus.hitPoints - 1));
        const actualDamage = this.applyHeroDamage(heroDamage, this.getEnemyLogName(enemy));
        this.actionLog.add('ENEMY_SISSELA_PAIN_HIT_PLAYER', {
          enemy: this.getEnemyLogName(enemy),
          damage: actualDamage,
        });
        this.dashDirection = null;
        this.updateStatusUi();
        [...this.enemies].forEach((target) => {
          if (target === enemy || this.getRoomAt(target.tileX, target.tileY) !== room) {
            return;
          }
          this.wakeSpawnSleepingEnemy(target);
          const targetDamage = Math.min(damage, Math.max(0, target.hitPoints - 1));
          this.applyEnemyDamage(target, targetDamage);
          this.actionLog.add('ENEMY_SISSELA_PAIN_HIT_ENEMY', {
            enemy: this.getEnemyLogName(enemy),
            target: this.getEnemyLogName(target),
            damage: targetDamage,
          });
        });
          complete();
        });
      },
    };
  },

  playSisselaPainReleaseEffect(onComplete) {
    const effects = Array.from({ length: 18 }, () => {
      const effect = this.add.graphics().setScrollFactor(0).setDepth(200);
      effect.lineStyle(5, 0xffe75c, 0.95);
      effect.lineBetween(0, 0, 0, Phaser.Math.Between(50, 120));
      effect.setPosition(
        Phaser.Math.Between(0, GAME_WIDTH),
        Phaser.Math.Between(-GAME_HEIGHT, -40),
      );
      return effect;
    });
    let completedEffects = 0;
    effects.forEach((effect) => {
      this.tweens.add({
        targets: effect,
        y: GAME_HEIGHT + Phaser.Math.Between(40, 140),
        duration: Phaser.Math.Between(260, 420),
        delay: Phaser.Math.Between(0, 140),
        ease: 'Quad.easeIn',
        onComplete: () => {
          effect.destroy();
          completedEffects += 1;
          if (completedEffects === effects.length) {
            onComplete();
          }
        },
      });
    });
  },

  useElevenMealTime(enemy, attacks) {
    const mealTimeChances = {
      [ENEMY_SKILL_ELEVEN_MEAL_TIME]: 0.15,
      [ENEMY_SKILL_GOLD_ELEVEN_MEAL_TIME]: 0.2,
      [ENEMY_SKILL_MITHRIL_ELEVEN_MEAL_TIME]: 0.25,
      [ENEMY_SKILL_ETA_ELEVEN_MEAL_TIME]: 0.3,
    };
    const mealTimeChance = mealTimeChances[enemy.specialAbilityId] ?? 0;
    if (
      mealTimeChance === 0
      || !this.isEnemyAdjacent(enemy)
      || this.hasEquipEffect(ITEM_EQUIP_EFFECT_ITEM_THEFT_AND_TRANSFORMATION_IMMUNITY)
      || Math.random() >= mealTimeChance
    ) {
      return false;
    }
    const candidates = this.playerStatus.inventory.filter((item) => item.equipped == null);
    const item = Phaser.Utils.Array.GetRandom(candidates);
    if (!item) {
      return false;
    }
    const definition = this.itemDefinitions.get(item.id);
    item.id = 4004;
    delete item.usesRemaining;
    this.refreshInventoryUi();
    attacks.push({
      sprite: enemy.sprite,
      targetsHero: true,
      onStartAsync: true,
      onStart: (complete) => {
        this.playSfx('se-magic');
        this.actionLog.add('ENEMY_ELEVEN_MEAL_TIME', { enemy: this.getEnemyLogName(enemy) });
        this.actionLog.add('ITEM_TRANSFORMED_TO_HAMBURGER', { item: definition.name });
        this.playHeartPeaceEffects([{ tileX: this.heroTileX, tileY: this.heroTileY }], complete);
      },
    });
    return true;
  },

  useBarbaraModification(enemy, attacks) {
    if (
      enemy.specialAbilityId !== ENEMY_SKILL_BARBARA_MODIFICATION
      || !this.isEnemyAdjacent(enemy)
      || this.hasEquipEffect(ITEM_EQUIP_EFFECT_ITEM_THEFT_AND_TRANSFORMATION_IMMUNITY)
      || Math.random() >= 0.3
    ) {
      return false;
    }
    const item = Phaser.Utils.Array.GetRandom(this.playerStatus.inventory.filter((candidate) => (
      this.itemDefinitions.get(candidate.id)?.category === 50
    )));
    if (!item) {
      return false;
    }
    const definition = this.itemDefinitions.get(item.id);
    const replacements = [...this.itemDefinitions.values()].filter((candidate) => (
      candidate.category === 50 && candidate.id !== item.id
    ));
    const replacement = Phaser.Utils.Array.GetRandom(replacements);
    if (!replacement) {
      return false;
    }
    item.id = replacement.id;
    item.usesRemaining = Phaser.Math.Between(replacement.useCountMinimum, replacement.useCountMaximum);
    this.refreshInventoryUi();
    attacks.push({
      sprite: enemy.sprite,
      targetsHero: true,
      onStartOnly: true,
      onStart: () => {
        this.playSfx('se-craft-ok');
        this.playEmmaRevealEffect(this.heroTileX, this.heroTileY);
        this.actionLog.add('ENEMY_BARBARA_MODIFICATION', {
          enemy: this.getEnemyLogName(enemy),
          item: definition.name,
          result: replacement.name,
        });
      },
    });
    return true;
  },

  createJustynaLaser(enemy) {
    const laserSettings = {
      [ENEMY_SKILL_JUSTYNA_LASER]: { range: 10, chance: 0.2, damage: 15 },
      [ENEMY_SKILL_GOLD_JUSTYNA_LASER]: { range: 10, chance: 0.2, damage: 25 },
      [ENEMY_SKILL_MITHRIL_JUSTYNA_LASER]: { range: 20, chance: 0.3, damage: 30 },
      [ENEMY_SKILL_ETA_JUSTYNA_LASER]: { range: Infinity, chance: 0.4, damage: 40 },
    };
    const settings = laserSettings[enemy.specialAbilityId];
    if (!settings || Math.random() >= settings.chance) {
      return null;
    }
    const offsetX = this.heroTileX - enemy.tileX;
    const offsetY = this.heroTileY - enemy.tileY;
    const distance = Math.max(Math.abs(offsetX), Math.abs(offsetY));
    const isStraightLine = offsetX === 0
      || offsetY === 0
      || Math.abs(offsetX) === Math.abs(offsetY);
    if (distance < 1 || distance > settings.range || !isStraightLine) {
      return null;
    }
    const direction = { x: Math.sign(offsetX), y: Math.sign(offsetY) };
    const laserRange = Number.isFinite(settings.range)
      ? settings.range
      : Math.max(this.dungeonTiles.length, this.dungeonTiles[0]?.length ?? 0);
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    return {
      sprite: enemy.sprite,
      targetsHero: true,
      onStartAsync: true,
      onStart: (complete) => {
        const startX = (enemy.tileX + 0.5) * TILE_SIZE;
        const startY = (enemy.tileY + 0.5) * TILE_SIZE;
        const endX = (enemy.tileX + direction.x * laserRange + 0.5) * TILE_SIZE;
        const endY = (enemy.tileY + direction.y * laserRange + 0.5) * TILE_SIZE;
        const laser = this.add.graphics().setDepth(FOG_DEPTH - 1);
        laser.lineStyle(10, 0x7df9ff, 0.82);
        laser.lineBetween(startX, startY, endX, endY);
        laser.lineStyle(3, 0xffffff, 1);
        laser.lineBetween(startX, startY, endX, endY);
        this.playSfx('se-beam');
        this.actionLog.add('ENEMY_JUSTYNA_LASER', { enemy: this.getEnemyLogName(enemy) });
        this.tweens.add({
          targets: laser,
          alpha: 0,
          duration: 220,
          ease: 'Quad.easeOut',
          onComplete: () => {
            laser.destroy();
            this.resolveJustynaLaser(enemy, direction, laserRange, settings.damage);
            complete();
          },
        });
      },
    };
  },

  resolveJustynaLaser(enemy, direction, range, damage) {
    const destroyedWalls = [];
    for (let distance = 1; distance <= range; distance += 1) {
      const tileX = enemy.tileX + direction.x * distance;
      const tileY = enemy.tileY + direction.y * distance;
      if (this.dungeonTiles[tileY]?.[tileX] === 0 && !this.isOuterWallTile(tileX, tileY)) {
        this.dungeonTiles[tileY][tileX] = CORRIDOR_TILE;
        destroyedWalls.push({ x: tileX, y: tileY });
      }
      if (tileX === this.heroTileX && tileY === this.heroTileY) {
        const actualDamage = this.applyHeroDamage(
          this.getElectricAndLaserDamage(damage),
          this.getEnemyLogName(enemy),
        );
        this.dashDirection = null;
        this.updateStatusUi();
        this.actionLog.add('ENEMY_JUSTYNA_LASER_HIT_PLAYER', {
          enemy: this.getEnemyLogName(enemy),
          damage: actualDamage,
        });
      }
      [...this.enemies]
        .filter((target) => target !== enemy && target.tileX === tileX && target.tileY === tileY)
        .forEach((target) => {
          this.wakeSpawnSleepingEnemy(target);
          this.applyEnemyDamage(target, damage);
          this.actionLog.add('ENEMY_JUSTYNA_LASER_HIT_ENEMY', {
            enemy: this.getEnemyLogName(enemy),
            target: this.getEnemyLogName(target),
            damage,
          });
          if (target.hitPoints <= 0 && !this.applyEnemySurvivalAbility(target)) {
            this.defeatEnemyByEnemy(enemy, target);
          }
        });
    }
    if (destroyedWalls.length > 0) {
      this.dungeonRenderer.refreshTiles(destroyedWalls);
      this.corridorTiles = this.getCorridorTiles();
      this.minimapUi.refreshTiles(destroyedWalls);
      this.updateVisibility();
    }
  },

  createAidenElectricBurst(enemy) {
    if (
      !AIDEN_ELECTRIC_BURST_SKILL_IDS.includes(enemy.specialAbilityId)
      || !this.isEnemyAdjacent(enemy)
      || Math.random() >= 0.5
    ) {
      return null;
    }
    enemy.idleTween?.stop();
    enemy.sprite.setScale(ENEMY_SCALE);
    enemy.needsIdleMotion = true;
    return {
      sprite: enemy.sprite,
      symbolOutline: enemy.symbolOutline,
      symbol: enemy.symbol,
      targetsHero: true,
      onStartAsync: true,
      onStart: (complete) => {
        const effect = this.add.graphics().setDepth(FOG_DEPTH - 1);
        effect.lineStyle(8, 0xa8f7ff, 0.95);
        effect.strokeCircle(0, 0, TILE_SIZE * 0.25);
        effect.setPosition(
          (this.heroTileX + 0.5) * TILE_SIZE,
          (this.heroTileY + 0.5) * TILE_SIZE,
        ).setScale(0.2);
        this.playSfx('se-spark');
        this.actionLog.add('ENEMY_AIDEN_ELECTRIC_BURST', { enemy: this.getEnemyLogName(enemy) });
        this.tweens.add({
          targets: effect,
          scale: 1.7,
          alpha: 0,
          duration: 250,
          ease: 'Quad.easeOut',
          onComplete: () => {
            effect.destroy();
            this.resolveAidenElectricBurst(enemy);
            complete();
          },
        });
      },
    };
  },

  resolveAidenElectricBurst(enemy) {
    const damage = {
      [ENEMY_SKILL_AIDEN_ELECTRIC_BURST]: 20,
      [ENEMY_SKILL_GOLD_AIDEN_ELECTRIC_BURST]: 30,
      [ENEMY_SKILL_MITHRIL_AIDEN_ELECTRIC_BURST]: 40,
      [ENEMY_SKILL_ETA_AIDEN_ELECTRIC_BURST]: 50,
    }[enemy.specialAbilityId];
    const actualDamage = this.applyHeroDamage(
      this.getElectricAndLaserDamage(damage),
      this.getEnemyLogName(enemy),
    );
    this.dashDirection = null;
    this.updateStatusUi();
    this.actionLog.add('ENEMY_AIDEN_ELECTRIC_BURST_HIT_PLAYER', {
      enemy: this.getEnemyLogName(enemy),
      damage: actualDamage,
    });
    [...this.enemies].forEach((target) => {
      if (
        target === enemy
        || Math.max(
          Math.abs(target.tileX - this.heroTileX),
          Math.abs(target.tileY - this.heroTileY),
        ) > 1
      ) {
        return;
      }
      this.wakeSpawnSleepingEnemy(target);
      this.applyEnemyDamage(target, damage);
      this.actionLog.add('ENEMY_AIDEN_ELECTRIC_BURST_HIT_ENEMY', {
        enemy: this.getEnemyLogName(enemy),
        target: this.getEnemyLogName(target),
        damage,
      });
      if (target.hitPoints <= 0 && !this.applyEnemySurvivalAbility(target)) {
        this.defeatEnemyByEnemy(enemy, target);
      }
    });
  },
};