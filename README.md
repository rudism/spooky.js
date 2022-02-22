**Note:** Active development of Spooky.js has moved to https://code.sitosis.com/rudism/spooky.js

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

You can animate alpha changes with `fg.setAlpha(newValue, step)` where `step` is optional and will determine how quickly the fade in/out will occur.

### CRT

Based on original code from [Alec Lownes](http://aleclownes.com/2017/02/01/crt-display.html).

```
var crt = new Spooky.CRT({containerId: 'mydiv'});
fg.execute();
fg.stop();
```

Takes required `options` configuration object:
  - `containerId`: id of the element to apply the CRT effect to (required)
  - `screenDoorColor`: color of the screen door effect (`#000000`)
  - `screenDoorSize`: size in pixels of the screen door effect (`2`)
  - `screenDoorOpacity`: opacity of the screen door effect from 0-1 (`0.25`)
  - `separationColor`: color of the separation effect (`#000000`)
  - `separationDistance`: horizontal movement distance in pixels of the separation effect (`5`)
  - `separationBlur`: blur size in pixels of the separation effect (`1`)
  - `separationOpacity`: opacity of the separation effect from 0-1 (`0.5`)
