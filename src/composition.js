import * as THREE from "three";

import {Zine} from "./gen/zine.js";
import {Skull} from "./gen/skull.js";
import {Waves} from "./gen/waves.js";
import {Eyes} from "./gen/eyes.js";
import {Text} from "./gen/text.js";
import {Starry} from "./gen/starry.js";
import {Merces} from "./gen/merces.js";
import {JohnnyCash} from "./gen/johnnycash.js";
import {Graveyard} from "./gen/grave.js";

const PageComposition = new Map([
  [1, Skull],
  [2, Text],
  [3, Waves],
  [4, Eyes],
  [5, JohnnyCash],
  [6, Starry],
  [7, Merces],
  [8, Graveyard],
]);

/**
 * ZineComposition
 *
 * Given 16 elements from a page, will treat them as pages 1-16 of a zine. 
 * This is a helper class just to do some shared setup, and tie together
 * potentially disparate pieces.
 */
export class ZineComposition {
  constructor({elements, font}) {
    if (elements.length != 16) {
      console.error("Incorrect number of pages!");
    }
    this.font = font;
    this.els = Array.from(elements);
    this.ctxs = [];
    Array.from(this.els).forEach((el) => {
      this.ctxs.push(el.ctx);
    });

    this.maps = [];

    for (var i=0; i < 16; i++) {
      this.maps[i] = PageComposition.has(i) ? PageComposition.get(i) : Zine;
    }

    this.apps = [];
    this.els.forEach((el, i) => {
      this.apps.push(new this.maps[i]({
        el: el,
        page: 16-i,
        font: this.font,
      }));
    });
  }

  setup() {
    this.apps.forEach((app) => {
      app.setup();
    });
  }

  update() {
    this.apps.forEach((app) => {
      app.update();
    });
  }

  draw() {
    this.apps.forEach((app) => {
      app.draw();
    });
  }
}
