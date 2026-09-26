class MinimapUi {
  constructor(scene, options) {
    this.scene = scene;
    this.options = options;
  }

  create(visibleTiles) {
    const { gameWidth, gameHeight, overlayDepth, depth, markerDepth } = this.options;
    this.overlay = this.scene.add.graphics().setScrollFactor(0).setDepth(overlayDepth).setVisible(false);
    this.overlay.fillStyle(0x000000, 0.78);
    this.overlay.fillRect(0, 0, gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics().setScrollFactor(0).setDepth(depth);
    this.marker = this.scene.add.graphics().setScrollFactor(0).setDepth(markerDepth);
    this.discoveredTiles = new Set();
    this.reveal(visibleTiles);
    this.drawMarker();
  }

  reveal(visibleTiles) {
    for (const coordinate of visibleTiles) {
      if (this.discoveredTiles.has(coordinate)) {
        continue;
      }
      this.discoveredTiles.add(coordinate);
    }
    this.redrawTerrain();
  }

  refreshTiles(tiles) {
    tiles.forEach((tile) => this.discoveredTiles.add(`${tile.x},${tile.y}`));
    this.redrawTerrain();
  }

  redrawTerrain() {
    const { floorTile, corridorTile, scale, x: originX, y: originY } = this.options;
    this.graphics.clear();
    this.discoveredTiles.forEach((coordinate) => {
      const [x, y] = coordinate.split(',').map(Number);
      const tile = this.scene.dungeonTiles[y]?.[x];
      if (tile === floorTile || tile === corridorTile) {
        this.graphics.fillStyle(0x76d7ea, 0.9);
        this.graphics.fillRect(originX + x * scale, originY + y * scale, scale, scale);
      }
    });
  }

  drawMarker() {
    const { scale, x: originX, y: originY } = this.options;
    const markerRadius = 3;
    const detectsAllEnemies = this.scene.playerStatus.inventory.some((item) => (
      item.equipped != null
      && this.scene.itemDefinitions.get(item.id)?.equipEffectId === 0
      && this.scene.itemEquipEffectDefinitions.has(0)
    ));
    this.marker.clear();
    this.marker.fillStyle(0x3d9b57);
    this.marker.lineStyle(0.5, 0x000000);
    this.scene.floorItems.forEach((item) => {
      if (item.marker.visible) {
        const itemX = originX + (item.tileX + 0.5) * scale;
        const itemY = originY + (item.tileY + 0.5) * scale;
        this.marker.fillCircle(itemX, itemY, markerRadius);
        this.marker.strokeCircle(itemX, itemY, markerRadius);
      }
    });
    this.marker.lineStyle(2, 0xffffff);
    this.scene.traps.forEach((trap) => {
      if (!trap.marker.visible) {
        return;
      }
      const trapX = originX + (trap.tileX + 0.5) * scale;
      const trapY = originY + (trap.tileY + 0.5) * scale;
      this.marker.lineBetween(trapX - markerRadius, trapY - markerRadius, trapX + markerRadius, trapY + markerRadius);
      this.marker.lineBetween(trapX - markerRadius, trapY + markerRadius, trapX + markerRadius, trapY - markerRadius);
    });
    if (this.scene.stairs?.discovered) {
      const stairsX = originX + (this.scene.stairs.x + 0.5) * scale;
      const stairsY = originY + (this.scene.stairs.y + 0.5) * scale;
      this.marker.fillStyle(0xffffff);
      this.marker.fillCircle(stairsX, stairsY, markerRadius);
      this.marker.lineStyle(1, 0x000000);
      this.marker.strokeCircle(stairsX, stairsY, markerRadius);
    }
    this.scene.enemies.forEach((enemy) => {
      const enemyLocationRevealed = detectsAllEnemies || this.scene.monsterHouseAnnounced;
      if (!enemyLocationRevealed && !enemy.sprite.visible) {
        return;
      }
      this.marker.fillStyle(
        enemy.disguised && !enemyLocationRevealed ? 0x3d9b57 : 0xdf5b62,
      );
      const enemyX = originX + (enemy.tileX + 0.5) * scale;
      const enemyY = originY + (enemy.tileY + 0.5) * scale;
      this.marker.fillCircle(enemyX, enemyY, markerRadius);
      if (enemy.disguised && !enemyLocationRevealed) {
        this.marker.lineStyle(0.5, 0x000000);
        this.marker.strokeCircle(enemyX, enemyY, markerRadius);
      }
    });
    this.marker.fillStyle(0xffdc4a);
    this.marker.fillCircle(
      originX + (this.scene.heroTileX + 0.5) * scale,
      originY + (this.scene.heroTileY + 0.5) * scale,
      markerRadius,
    );
  }
}