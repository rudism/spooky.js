# spooky.js

## Available Effects

### Film Grain

Based on original code from [Szenia Zadvornykh](https://codepen.io/zadvorsky/pen/PwyoMm).

```
var fg = new Spooky.FilmGrain(options);
fg.execute();
fg.stop();
```

Takes optional `options` configuration object:
  - `patternSize`: dimensions of the repeating grain pattern (`64`)
  - `alpha`: transparency of the effect from 0-255 (`25`)
  - `grainScale`: x and y scale of each grain (`{x: 3, y: 1}`)
  - `refreshInterval`: how often to redraw the effect
  - `canvasId`: optional id of an existing canvas to apply the effect to

If no existing `canvasId` is provided then the effect will be applied to the entire browser screen.
