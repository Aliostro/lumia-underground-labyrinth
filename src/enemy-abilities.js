const EnemyAbilities = {
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
      [ENEMY_SKILL_GOLD_JUSTYNA_LASER]: { range: 10, chance: 0.2, damage: 30 },
      [ENEMY_SKILL_MITHRIL_JUSTYNA_LASER]: { range: 20, chance: 0.3, damage: 40 },
      [ENEMY_SKILL_ETA_JUSTYNA_LASER]: { range: Infinity, chance: 0.4, damage: 50 },
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
      if (this.dungeonTiles[tileY]?.[tileX] === 0) {
        this.dungeonTiles[tileY][tileX] = CORRIDOR_TILE;
        destroyedWalls.push({ x: tileX, y: tileY });
      }
      if (tileX === this.heroTileX && tileY === this.heroTileY) {
        const actualDamage = this.applyHeroDamage(damage, this.getEnemyLogName(enemy));
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
      [ENEMY_SKILL_GOLD_AIDEN_ELECTRIC_BURST]: 40,
      [ENEMY_SKILL_MITHRIL_AIDEN_ELECTRIC_BURST]: 60,
      [ENEMY_SKILL_ETA_AIDEN_ELECTRIC_BURST]: 80,
    }[enemy.specialAbilityId];
    const actualDamage = this.applyHeroDamage(damage, this.getEnemyLogName(enemy));
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