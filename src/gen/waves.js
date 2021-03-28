import {Basic3, basic3} from "../basics.js";

import vert from "../shaders/pass.vert";
import frag from "../shaders/pass.frag";

/**
 * Waves
 *
 * XXX: There will obviously be some kinda wave/refraction thing at some point.
 */
export class Waves extends Basic3 {
  constructor({el}) {
    super(...arguments);

    [this.ctx, this.renderer] = basic3(el);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      el.width/el.height,
      0.1,
      1000,
    );

    this.material = new THREE.RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
    });

    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      this.material,
    )

    this.scene.add(this.mesh);
  }

  setup() {
  }

  update() {
    this.camera.position.x = 5;
    this.camera.position.y = 5;
    this.camera.position.z = 5;
    this.camera.lookAt(0, 0, 0);
    this.mesh.position.set(0, 0, 0);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }
}
