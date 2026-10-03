# lumia-underground-labyrinth

## Map Design

Each floor's `[design-map]` entry accepts:

```text
0001: 0004 [15, 0-5, 100]
```

The fields are the map-chip number, followed by the room-water chance (%),
pond-count range, and river chance (%). The third bracketed value accepts
0-100 (an optional `%` suffix is supported); omitting it disables rivers.

A river meanders between opposite map edges, horizontally or vertically,
with a width varying from 3 to 4 tiles. It always passes through the central
28-by-28-tile area. Its route ignores existing structures,
but room floors and corridors remain intact, interrupting the water where
they cross the river. The same setting applies to title-screen backgrounds.