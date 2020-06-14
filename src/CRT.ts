// credit: http://aleclownes.com/2017/02/01/crt-display.html

import * as $ from 'jquery';
import * as uuid from 'uuid';
import { IEffect } from './IEffect';
import { rgbColor } from './Util';

export interface CRTOptions {
  containerId: string;
  screenDoorColor?: string;
  screenDoorSize?: number;
  screenDoorOpacity?: number;
  separationColor?: string;
  separationDistance?: number;
  separationBlur?: number;
  separationOpacity?: number;
}

export class CRT implements IEffect {
  private containerId: string;
  private styleId: string;
  private wrapperId: string;

  private separationColor: string;
  private separationDistance: number;
  private separationBlur: number;
  private separationOpacity: number;

  constructor(options: CRTOptions) {
    this.containerId = options.containerId;
    this.styleId = `crt${uuid.v4().replace(/-/g, '')}`;
    this.wrapperId = `crt${uuid.v4().replace(/-/g, '')}`;

    let screenDoorColor = options.screenDoorColor || '#000000';
    let screenDoorRgb = new rgbColor(screenDoorColor);
    let screenDoorSize = options.screenDoorSize || 2;
    if (screenDoorSize < 2) {
      screenDoorSize = 2;
    }
    let screenDoorOpacity = options.screenDoorOpacity || 0.25;

    this.separationColor = options.separationColor || '#000000';
    this.separationDistance = options.separationDistance || 5;
    this.separationBlur = options.separationBlur || 1;
    this.separationOpacity = options.separationOpacity || 0.5;

    const style = $('<style />').attr('id', this.styleId).text(`
      #${this.wrapperId} {
        position: relative;
      }
      #${this.wrapperId} > #${this.containerId}::before {
        content: " ";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(
          rgba(${screenDoorRgb.toString()}, 0) 50%,
          rgba(${screenDoorRgb.toString()}, ${screenDoorOpacity}) 50%
        ), linear-gradient(
          90deg,
          rgba(255, 0, 0, 0.06),
          rgba(0, 255, 0, 0.02),
          rgba(0, 0, 255, 0.06)
        );
        z-index: 2;
        background-size: 100% ${screenDoorSize}px, 3px 100%;
        pointer-events: none;
      }
      ${this.makeFlickerFrames()}
      #${this.wrapperId} > #${this.containerId}::after {
        content: " ";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(18, 16, 16, 0.1);
        opacity: 0;
        z-index: 2;
        pointer-events: none;
        animation: flicker_${this.styleId} 0.15s infinite;
      }
      ${this.makeSeparationFrames()}
      #${this.wrapperId} > #${this.containerId} {
        animation: separation_${this.styleId} 1.6s infinite;
      }
    `).appendTo($('body'));
  }

  private makeFlickerFrames(): string {
    let css = `@keyframes flicker_${this.styleId} {`;
    for(let i = 0; i <= 20; i++) {
      css += ` ${i * 5}% { opacity: ${Math.random()}; }`;
    }
    css += ' }';
    return css;
  }

  private makeSeparationFrames(): string {
    const rgb = new rgbColor(this.separationColor);
    let css = `@keyframes separation_${this.styleId} {`;
    for(let i = 0; i <= 20; i++) {
      css += ` ${i * 5}% { text-shadow: ${Math.random() * this.separationDistance}px 0 ${this.separationBlur}px rgba(${rgb.toString()}, ${this.separationOpacity}), -${Math.random() * this.separationDistance}px 0 ${this.separationBlur}px rgba(${rgb.toString()}, ${this.separationOpacity * 0.5}), 0 0 3px; }`;
    }
    css += ' }';
    return css;
  }

  public execute(): void {
    if(!$(`#${this.wrapperId}`).length) {
      $(`#${this.containerId}`).wrap($('<div />').attr('id', this.wrapperId));
    }
  }

  public stop(): void {
    if($(`#${this.wrapperId}`).length) {
      $(`#${this.containerId}`).unwrap(`#${this.wrapperId}`);
    }
  }
}
