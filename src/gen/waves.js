import {basic3} from "../basics.js";

/**
 * Waves
 *
 * XXX: There will obviously be some kinda wave/refraction thing at some point.
 */
export class Waves {
  constructor({el}) {
    [this.ctx, this.renderer] = basic3(el);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      el.width/el.height,
      0.1,
      1000,
    );
  }

  setup() {
  }

  update() {
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }
}
