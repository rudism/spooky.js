// credit: https://codepen.io/zadvorsky/pen/PwyoMm

import * as $ from 'jquery';

export interface FilmGrainOptions {
  patternSize?: number;
  alpha?: number;
  grainScale?: { x: number, y: number };
  refreshInterval?: number;
  canvasId?: string;
}

export class FilmGrain {
  private patternSize: number;
  private grainScaleX: number;
  private grainScaleY: number;
  private refreshInterval: number;
  private alpha: number;
  private canvasId?: string;
  private patternPixelDataLength: number;

  private canvas?: JQuery<HTMLCanvasElement>;
  private patternCanvas?: HTMLCanvasElement;

  private viewWidth: number = 0;
  private viewHeight: number = 0;
  private context?: CanvasRenderingContext2D;
  private patternContext?: CanvasRenderingContext2D;
  private patternData?: ImageData;

  private frame: number = 0;

  constructor(options?: FilmGrainOptions) {
    this.patternSize = options?.patternSize || 64;
    this.grainScaleX = options?.grainScale?.x || 3;
    this.grainScaleY = options?.grainScale?.y || 1;
    this.refreshInterval = options?.refreshInterval || 4;
    this.alpha = options?.alpha || 25;
    this.canvasId = options?.canvasId;
    this.patternPixelDataLength = this.patternSize * this.patternSize * 4;
  }

  private initCanvas(canvasId?: string): void {
    if (!this.canvasId) {
      // create full-screne canvas
      this.canvas = $<HTMLCanvasElement>('<canvas/>')
      .css({
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      })
      .click(() => false);
      $('html').css({
        position: 'relative',
        width: '100%',
        height: '100%',
      }).append(this.canvas);
    } else {
      // use provided canvas
      this.canvas = $(`#${this.canvasId}`);
    }

    this.viewWidth = this.canvas[0].width = this.canvas[0].clientWidth;
    this.viewHeight = this.canvas[0].height = this.canvas[0].clientHeight;
    this.context = this.canvas[0].getContext('2d')!;
    this.context.scale(this.grainScaleX, this.grainScaleY);
  }

  private initGrain(): void {
    this.patternCanvas = document.createElement('canvas');
    this.patternCanvas.width = this.patternSize;
    this.patternCanvas.height = this.patternSize;
    this.patternContext = this.patternCanvas.getContext('2d')!;
    this.patternData = this.patternContext.createImageData(
      this.patternSize, this.patternSize);
  }

  private update(): void {
    // put a random shade of gray into every pixel of the pattern
    if (this.patternData && this.patternContext) {
      for (let i = 0; i < this.patternPixelDataLength; i += 4) {
        const value = (Math.random() * 255) | 0;
        this.patternData.data[i] = value;
        this.patternData.data[i + 1] = value;
        this.patternData.data[i + 2] = value;
        this.patternData.data[i + 3] = this.alpha;
      }
      this.patternContext.putImageData(this.patternData, 0, 0);
    }
  }

  private draw(): void {
    if (this.context && this.patternCanvas) {
      this.context.clearRect(0, 0, this.viewWidth, this.viewHeight);
      this.context.fillStyle = this.context.createPattern(this.patternCanvas, 'repeat')!;
      this.context.fillRect(0, 0, this.viewWidth, this.viewHeight);
    }
  }

  private loop(): void {
    if (++(this.frame) % this.refreshInterval === 0) {
      this.update();
      this.draw();
    }
    requestAnimationFrame(() => this.loop());
  }

  public execute(): void {
    this.initCanvas();
    this.initGrain();
    requestAnimationFrame(() => this.loop());
  }
}
