class GameData {
  static parseEnemyData(csv) {
    const lines = csv.trim().split(/\r?\n/).slice(1);
    return lines.map((line) => {
      const fields = line.match(/"([^"]*)"/g).map((field) => field.slice(1, -1));
      return {
        id: Number(fields[0]),
        name: fields[1],
        imageFile: fields[2],
        evolutionId: fields[3] === '' ? null : Number(fields[3]),
        symbolFile: fields[4],
        hitPoints: Number(fields[5]),
        attack: Number(fields[6]),
        defense: Number(fields[7]),
        experience: Number(fields[8]),
        movementCount: Number(fields[9]),
        attackCount: Number(fields[10]),
        specialAbilityId: fields[11] === '' ? null : Number(fields[11]),
      };
    });
  }

  static parseEnemySkillData(csv) {
    const lines = csv.trim().split(/\r?\n/).slice(1);
    return new Map(lines.map((line) => {
      const fields = line.match(/"([^"]*)"/g).map((field) => field.slice(1, -1));
      return [Number(fields[0]), { id: Number(fields[0]), description: fields[1] }];
    }));
  }

  static parseEnemyBookDescriptionData(csv) {
    const lines = csv.trim().split(/\r?\n/).slice(1);
    return new Map(lines.map((line) => {
      const fields = line.match(/"([^"]*)"/g).map((field) => field.slice(1, -1));
      return [Number(fields[0]), { id: Number(fields[0]), description: fields[1] }];
    }));
  }

  static parseItemEffectData(csv) {
    const lines = csv.trim().split(/\r?\n/).slice(1);
    return new Map(lines.map((line) => {
      const fields = line.match(/"([^"]*)"/g).map((field) => field.slice(1, -1));
      return [Number(fields[0]), { id: Number(fields[0]), description: fields[1] }];
    }));
  }

  static parseItemEquipEffectData(csv) {
    const lines = csv.trim().split(/\r?\n/).slice(1);
    return new Map(lines.map((line) => {
      const fields = line.match(/"([^"]*)"/g).map((field) => field.slice(1, -1));
      return [Number(fields[0]), { id: Number(fields[0]), description: fields[1] }];
    }));
  }

  static parseCraftData(csv) {
    const lines = csv.trim().split(/\r?\n/).slice(1);
    return new Map(lines.map((line) => {
      const fields = line.match(/"([^"]*)"/g).map((field) => field.slice(1, -1));
      const materialIds = [Number(fields[1]), Number(fields[2])].sort((first, second) => first - second);
      return [materialIds.join(','), { id: Number(fields[0]), materialIds, resultItemId: Number(fields[3]) }];
    }));
  }

  static parseItemData(csv) {
    const lines = csv.trim().split(/\r?\n/).slice(1);
    return new Map(lines.map((line) => {
      const fields = line.match(/"([^"]*)"/g).map((field) => field.slice(1, -1));
      return [Number(fields[0]), {
        id: Number(fields[0]),
        category: Number(fields[1]),
        name: fields[2],
        attack: Number(fields[3]) || 0,
        defense: Number(fields[4]) || 0,
        hitPoints: Number(fields[5]) || 0,
        hunger: Number(fields[6]) || 0,
        equipEffectId: fields[7] === '' ? null : Number(fields[7]),
        useEffectId: fields[8] === '' ? null : Number(fields[8]),
        useCountMinimum: fields[9] === '' ? null : Number(fields[9]),
        useCountMaximum: fields[10] === '' ? null : Number(fields[10]),
        description: fields[11],
      }];
    }));
  }

  static parseMessageData(csv) {
    const messages = new Map();
    csv.trim().split(/\r?\n/).slice(1).forEach((line) => {
      const fields = line.match(/"([^"]*)"/g)?.map((field) => field.slice(1, -1));
      if (fields?.[0] && fields[1]) {
        messages.set(fields[0], fields[1]);
      }
    });
    return messages;
  }

  static parseDungeonData(data) {
    const dungeonName = data.match(/^dungeon-name\s*=\s*"([^"]+)"/m)?.[1];
    const dungeonDescription = data.match(/^dungeon-desc\s*=\s*"([^"]+)"/m)?.[1];
    const maxFloor = Number(data.match(/^max-floor\s*=\s*(\d+)/m)?.[1]);
    const maxEnemies = Number(data.match(/^max-enemies\s*=\s*(\d+)/m)?.[1]);
    const startLevel = Number(data.match(/^start-level\s*=\s*(\d+)/m)?.[1]) || 1;
    const startFloor = Number(data.match(/^start-floor\s*=\s*(\d+)/m)?.[1]) || 1;
    const startItems = (data.match(/^start-item\s*=\s*(.+)$/m)?.[1] || '')
      .split(',')
      .map((itemId) => Number(itemId.trim()))
      .filter(Number.isInteger);
    const designMap = new Map();
    const designMapSection = data.split('[design-map]')[1]?.split('[enemy-map]')[0] || '';
    designMapSection.trim().split(/\r?\n/).forEach((line) => {
      const match = line.match(/^(\d+):\s*(\d+)\s*$/);
      if (match) {
        designMap.set(Number(match[1]), Number(match[2]));
      }
    });
    const enemyMap = new Map();
    const itemMap = new Map();
    const enemyMapSection = data.split('[enemy-map]')[1] || '';
    const itemMapSection = data.split('[item-map]')[1] || '';

    enemyMapSection.trim().split(/\r?\n/).forEach((line) => {
      const match = line.match(/^(\d+):\s*\[(\d+)-(\d+)\]\s*<(\d+)(?:\/(\d+))?>\s*(?:\|(\d+)\|\s*)?(.+)$/);
      if (!match) {
        return;
      }
      const entries = match[7].split(',').map((entry) => {
        const [id, weight] = entry.trim().split('^').map(Number);
        return { id, weight };
      });
      const totalWeight = entries.reduce((total, entry) => total + entry.weight, 0);
      if (Math.abs(totalWeight - 100) > 0.000001) {
        throw new Error(`フロア ${match[1]} の敵出現割合は合計100%にしてください。`);
      }
      enemyMap.set(Number(match[1]), {
        minimumEnemies: Number(match[2]),
        maximumEnemies: Number(match[3]),
        respawnInterval: Number(match[4]),
        turnLimit: Number(match[5]) || 0,
        monsterHouseChance: Number(match[6]) || 0,
        entries,
      });
    });

    itemMapSection.trim().split(/\r?\n/).forEach((line) => {
      const match = line.match(/^(\d+):\s*\[(\d+)-(\d+)\]\s+(?:([ox])(\d+)-(\d+)\s+)?(.+)$/);
      if (!match) {
        return;
      }
      const entries = match[7].split(',').map((entry) => {
        const [id, weight] = entry.trim().split('^').map(Number);
        return { id, weight };
      });
      const totalWeight = entries.reduce((total, entry) => total + entry.weight, 0);
      if (Math.abs(totalWeight - 100) > 0.5) {
        throw new Error(`フロア ${match[1]} のアイテム出現割合は合計100%にしてください。`);
      }
      itemMap.set(Number(match[1]), {
        minimumItems: Number(match[2]),
        maximumItems: Number(match[3]),
        recipeDropEnabled: match[4] === 'o',
        minimumRecipeItems: match[4] === 'o' ? Number(match[5]) : 0,
        maximumRecipeItems: match[4] === 'o' ? Number(match[6]) : 0,
        entries,
      });
    });

    return {
      dungeonName,
      dungeonDescription,
      maxFloor,
      maxEnemies,
      startLevel,
      startFloor,
      startItems,
      designMap,
      enemyMap,
      itemMap,
    };
  }
}