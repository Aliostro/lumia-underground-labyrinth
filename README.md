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
HTML/JavaScript and runtime image/audio/font/library assets are published.
Third-party license text remains public. This discourages casual inspection;
it is not encryption or protection against determined reverse engineering.

Keep a separate private backup of `assets/data/`, `src/`, `scripts/`,
`package.json`, `package-lock.json`, and `start.sh`. A fresh clone of this
public repository can run the game but cannot recreate the editing environment.