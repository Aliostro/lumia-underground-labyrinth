# lumia-underground-labyrinth

This repository contains the generated public distribution of the game.
Editing sources and raw CSV/DAT/TXT game data are kept locally and are not
included in new commits. Public branch history starts from a distribution-only
snapshot; earlier development history is no longer part of this branch.

## Local Editing Environment

- Edit game data in `assets/data/` and code/templates in `src/`.
- Install build dependencies with `npm ci` (or `npm install` initially).
- Run `npm run build` after changes. Do not edit generated `index.html` or
	`assets/game.*.js` directly.
- Run `sh start.sh` for development. It builds the ignored `.dev/` directory
	using `assets/data/dev-flg.dat` (`o`: enabled, `x`: disabled).
	After editing the flag or game files, run `npm run build:dev` and reload.
	Development builds do not modify public distribution files.
- Run `sh start.sh release` to build and preview the public-only `.release/`
	directory. Both this command and `npm run build` always force the flag to `x`,
	regardless of the local flag file or environment variables.
- Review `git diff --stat` and `git diff --cached --stat` before committing
	generated distribution changes.

The build gzip-compresses the text data, bundles and obfuscates the JavaScript,
disables developer flags, and does not publish source maps. Only generated
HTML/JavaScript, media packs, and runtime font/library assets are copied to the
distribution preview. Original image/audio files remain available locally;
packaging does not remove files from earlier public commits.
Third-party license text remains public. This discourages casual inspection;
it is not encryption or protection against determined reverse engineering.

## Packed Media

- The build collects the actual scene asset queues and creates two compressed
	packs: non-game screens/shared assets, and in-game-only assets. Shared files
	occur in only one pack. Only referenced images/audio are included.
- Title/background/book images, menu sounds, and title/result music are shared.
	Dungeon music, combat sounds, and game-only images are loaded when entering
	the game. Packs and internal entries use hashed names.
- Phaser receives local Blob URLs after unpacking. Packs are fetched once per
	game instance and reused across scene transitions. A failed pack stops loading
	and asks for a page reload rather than falling back to individual asset URLs.
- Development and release previews do not contain individual image/audio files.
	Packing reduces individual HTTP requests; it does not prevent extraction.

Run `npm run build:dev && npm run test:assets` to verify pack classification,
exact asset reconstruction, scene loading, failure handling, and cache reuse
without opening a browser.

Run `npm run test:dungeon` to verify maze dimensions, room entrances, loops,
water/pond/river settings, deterministic generation, and existing layouts.

Run `npm run test:enchantments` to verify enchantment crafting/inheritance,
equipment stats, force-core effects, saved state, floor exchange, and prefix colors.

Keep a separate private backup of `assets/data/`, `src/`, `scripts/`,
`package.json`, `package-lock.json`, and `start.sh`. A fresh clone of this
public repository can run the game but cannot recreate the editing environment.