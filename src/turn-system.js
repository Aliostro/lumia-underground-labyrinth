const TurnSystem = {
  playTurnAnimations(heroTarget, enemyMovements, allowQueuedMove, playerAttacks, enemyAttacks) {
    this.playAttackAnimations(playerAttacks, () => {
      this.playMovementAnimations(heroTarget, enemyMovements, allowQueuedMove, enemyAttacks);
    });
  },

  playMovementAnimations(heroTarget, enemyMovements, allowQueuedMove, enemyAttacks) {
    const animations = [];
    if (heroTarget) {
      animations.push({ targets: this.hero, ...heroTarget });
    }
    const finalEnemyMovements = new Map();
    for (const movement of enemyMovements) {
      finalEnemyMovements.set(movement.enemy, movement);
    }
    const visibleTiles = this.getVisibleTiles(this.heroTileX, this.heroTileY);
    for (const movement of finalEnemyMovements.values()) {
      const fromTileX = Math.round(movement.fromX / TILE_SIZE - 0.5);
      const fromTileY = Math.round(movement.fromY / TILE_SIZE - 1);
      const toTileX = movement.enemy.tileX;
      const toTileY = movement.enemy.tileY;
      const movementIsVisible = visibleTiles.has(`${fromTileX},${fromTileY}`)
        || visibleTiles.has(`${toTileX},${toTileY}`);
      if (movementIsVisible) {
        animations.push({
          targets: movement.enemy.sprite,
          x: movement.toX,
          y: movement.toY,
          onUpdate: () => {
            movement.enemy.symbolOutline?.setPosition(movement.enemy.sprite.x + 28, movement.enemy.sprite.y - 20);
            movement.enemy.symbol?.setPosition(movement.enemy.sprite.x + 28, movement.enemy.sprite.y - 20);
            movement.enemy.jackieLevelText?.setPosition(movement.enemy.sprite.x + 30, movement.enemy.sprite.y - 10);
            movement.enemy.sleepText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
            movement.enemy.confusionText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
            movement.enemy.peaceText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
            movement.enemy.hasteText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
            movement.enemy.slowText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
            movement.enemy.paralysisText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
          },
        });
      } else {
        movement.enemy.sprite.setPosition(movement.toX, movement.toY);
        movement.enemy.symbolOutline?.setPosition(movement.toX + 28, movement.toY - 20);
        movement.enemy.symbol?.setPosition(movement.toX + 28, movement.toY - 20);
        movement.enemy.jackieLevelText?.setPosition(movement.toX + 30, movement.toY - 10);
        movement.enemy.sleepText?.setPosition(movement.toX + 34, movement.toY - 90);
        movement.enemy.confusionText?.setPosition(movement.toX + 34, movement.toY - 90);
        movement.enemy.peaceText?.setPosition(movement.toX + 34, movement.toY - 90);
        movement.enemy.hasteText?.setPosition(movement.toX + 34, movement.toY - 90);
        movement.enemy.slowText?.setPosition(movement.toX + 34, movement.toY - 90);
        movement.enemy.paralysisText?.setPosition(movement.toX + 34, movement.toY - 90);
      }
    }

    if (animations.length === 0) {
      this.playAttackAnimations(enemyAttacks, () => this.finishTurn(allowQueuedMove));
      return;
    }

    let completedAnimations = 0;
    const completeAnimation = () => {
      completedAnimations += 1;
      if (completedAnimations === animations.length) {
        this.playAttackAnimations(enemyAttacks, () => this.finishTurn(allowQueuedMove));
      }
    };
    animations.forEach((animation) => {
      this.tweens.add({
        targets: animation.targets,
        x: animation.x,
        y: animation.y,
        duration: animation.duration ?? 120,
        ease: 'Quad.easeOut',
        onUpdate: animation.onUpdate,
        onComplete: () => {
          animation.onComplete?.();
          completeAnimation();
        },
      });
    });
  },

  playAttackAnimations(attacks, onComplete) {
    if (attacks.length === 0) {
      onComplete();
      return;
    }
    const freezesCamera = attacks.some((attack) => attack.sprite === this.hero);
    if (freezesCamera) {
      this.cameras.main.stopFollow();
    }
    this.isAttackAnimating = true;
    const playNextAttack = (index) => {
      if (index === attacks.length) {
        this.isAttackAnimating = false;
        if (freezesCamera) {
          this.cameras.main.startFollow(this.hero);
        }
        onComplete();
        return;
      }
      const attack = attacks[index];
      if (attack.sprite !== this.hero && !this.enemies.some((enemy) => enemy.sprite === attack.sprite)) {
        playNextAttack(index + 1);
        return;
      }
      if (attack.getDirection) {
        const direction = attack.getDirection();
        if (!direction) {
          playNextAttack(index + 1);
          return;
        }
        attack.direction = direction;
      }
      if (attack.onStartAsync) {
        attack.onStart(() => playNextAttack(index + 1));
        return;
      }
      attack.onStart?.();
      if (attack.knockback) {
        this.tweens.add({
          targets: attack.knockback.targets,
          x: attack.knockback.x,
          y: attack.knockback.y,
          duration: attack.knockback.duration,
          ease: 'Quad.easeOut',
          onUpdate: attack.knockback.onUpdate,
          onComplete: () => {
            attack.onComplete?.();
            playNextAttack(index + 1);
          },
        });
        return;
      }
      if (attack.onStartOnly) {
        playNextAttack(index + 1);
        return;
      }
      if (attack.sprite !== this.hero && !attack.sprite.visible && !attack.targetsHero) {
        attack.onImpact?.();
        playNextAttack(index + 1);
        return;
      }
      if (attack.ranged) {
        const projectileStart = this.getRangedProjectileStart(attack);
        const projectileDuration = Math.hypot(
          attack.targetX - projectileStart.x,
          attack.targetY - projectileStart.y,
        ) / TILE_SIZE * 60 / (attack.projectileSpeedMultiplier ?? 1);
        const projectile = this.add.circle(
          projectileStart.x,
          projectileStart.y,
          8,
          0xffdc4a,
        ).setDepth(attack.sprite.visible ? attack.sprite.depth + 1 : FOG_DEPTH + 1);
        this.tweens.add({
          targets: projectile,
          x: attack.targetX,
          y: attack.targetY,
          duration: projectileDuration,
          ease: 'Linear',
          onComplete: () => {
            projectile.destroy();
            if (!attack.impactEffect) {
              attack.onImpact?.();
              attack.onComplete?.();
              playNextAttack(index + 1);
              return;
            }
            attack.onImpact?.();
            const effect = this.add.graphics().setDepth(FOG_DEPTH - 1);
            effect.fillStyle(0xff6b00, 0.62);
            effect.fillCircle(0, 0, TILE_SIZE * attack.impactEffect.radius);
            effect.lineStyle(8, 0xffa000, 1);
            effect.strokeCircle(0, 0, TILE_SIZE * attack.impactEffect.radius * 0.72);
            effect.setPosition(attack.targetX, attack.targetY).setScale(0.2);
            this.tweens.add({
              targets: effect,
              scale: 1,
              alpha: 0,
              duration: attack.impactEffect.duration,
              ease: 'Quad.easeOut',
              onComplete: () => {
                effect.destroy();
                attack.onComplete?.();
                playNextAttack(index + 1);
              },
            });
          },
        });
        return;
      }
      const attackingEnemy = attack.sprite === this.hero
        ? null
        : this.enemies.find((enemy) => enemy.sprite === attack.sprite);
      const targets = attackingEnemy?.symbol
        ? [attack.sprite, attackingEnemy.symbolOutline, attackingEnemy.symbol]
        : attack.sprite;
      this.tweens.add({
        targets,
        x: `+=${attack.direction.x * ATTACK_LUNGE_DISTANCE}`,
        y: `+=${attack.direction.y * ATTACK_LUNGE_DISTANCE}`,
        duration: 120,
        ease: 'Quad.easeOut',
        yoyo: true,
        onComplete: () => {
          attack.onComplete?.();
          if (attack.sprite !== this.hero) {
            const enemy = this.enemies.find((otherEnemy) => otherEnemy.sprite === attack.sprite);
            if (enemy) {
              this.updateEnemySymbolDepth(enemy);
            }
          }
          if (attack.postAttackMovement) {
            const movement = attack.postAttackMovement;
            this.tweens.add({
              targets: movement.enemy.sprite,
              x: movement.toX,
              y: movement.toY,
              duration: 120,
              ease: 'Quad.easeOut',
              onUpdate: () => {
                movement.enemy.symbolOutline?.setPosition(movement.enemy.sprite.x + 28, movement.enemy.sprite.y - 20);
                movement.enemy.symbol?.setPosition(movement.enemy.sprite.x + 28, movement.enemy.sprite.y - 20);
                movement.enemy.jackieLevelText?.setPosition(movement.enemy.sprite.x + 30, movement.enemy.sprite.y - 10);
                movement.enemy.sleepText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
                movement.enemy.confusionText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
                movement.enemy.peaceText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
                movement.enemy.hasteText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
                movement.enemy.slowText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
                movement.enemy.paralysisText?.setPosition(movement.enemy.sprite.x + 34, movement.enemy.sprite.y - 90);
              },
              onComplete: () => {
                if (movement.enemy.specialAbilityId === ENEMY_SKILL_FIORA_RETREAT) {
                  this.actionLog.add('ENEMY_FIORA_BACKSTEP', { enemy: movement.enemy.name });
                }
                playNextAttack(index + 1);
              },
            });
            return;
          }
          playNextAttack(index + 1);
        },
      });
    };
    playNextAttack(0);
  },

  getRangedProjectileStart(attack) {
    const startX = attack.sprite.x;
    const startY = attack.sprite.y - TILE_SIZE / 2;
    const worldView = this.cameras.main.worldView;
    if (worldView.contains(startX, startY)) {
      return { x: startX, y: startY };
    }

    const deltaX = attack.targetX - startX;
    const deltaY = attack.targetY - startY;
    const intersections = [];
    const addIntersection = (progress) => {
      if (progress < 0 || progress > 1) {
        return;
      }
      const x = startX + deltaX * progress;
      const y = startY + deltaY * progress;
      if (x >= worldView.x && x <= worldView.right && y >= worldView.y && y <= worldView.bottom) {
        intersections.push(progress);
      }
    };
    if (deltaX !== 0) {
      addIntersection((worldView.x - startX) / deltaX);
      addIntersection((worldView.right - startX) / deltaX);
    }
    if (deltaY !== 0) {
      addIntersection((worldView.y - startY) / deltaY);
      addIntersection((worldView.bottom - startY) / deltaY);
    }
    if (intersections.length === 0) {
      return { x: startX, y: startY };
    }

    const entryProgress = Math.min(...intersections);
    const length = Math.hypot(deltaX, deltaY);
    const visibleProgress = Math.min(1, entryProgress + 8 / length);
    return {
      x: startX + deltaX * visibleProgress,
      y: startY + deltaY * visibleProgress,
    };
  },

  finishTurn(allowQueuedMove) {
    this.isHeroMoving = false;
    this.enemyAlertSfxPlayed = false;
    this.enemyFireSfxPlayed = false;
    this.enemyPureSfxPlayed = false;
    this.enemyTrapSetSfxPlayed = false;
    this.enemyViolinSfxPlayed = false;
    this.enemyWarpSfxPlayed = false;
    this.advanceFirePillars();
    this.advanceEnemyRespawn();
    this.updateVisibility();
    this.drawMinimapMarker();
    if (!this.isGameOver) {
      this.startIdleMotion();
    }
    this.enemies.forEach((enemy) => {
      if (enemy.needsIdleMotion && enemy.status !== 'spawn-sleep') {
        this.startEnemyIdleMotion(enemy);
        enemy.needsIdleMotion = false;
      }
    });
    if (this.playerStatus.sleepTurns > 0) {
      this.queueSleepTurn();
    } else if (this.playerStatus.paralysisTurns > 0) {
      this.queueParalysisTurn();
    } else if (this.playerStatus.slowTurns > 0 && this.playerStatus.slowSkipNextTurn) {
      this.queueSlowTurn();
    } else if (this.playerStatus.brainwashed) {
      this.queueBrainwashedTurn();
    } else if (this.openStairMenuAfterTurn) {
      this.openStairMenuAfterTurn = false;
      this.openStairMenu();
    } else if (this.dashDirection) {
      this.tryMoveHero(this.dashDirection.x, this.dashDirection.y, false);
    } else if (allowQueuedMove) {
      this.queueMove(0, false);
    }
  },
};
