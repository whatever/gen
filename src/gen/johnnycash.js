import * as THREE from "three";

import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";

import {Basic3} from "../basics.js";

export class JohnnyCash extends Basic3 {
  constructor({el}) {
    super(...arguments);
    this.mesh = null;
    this.renderer.setClearColor(0xFFFFFF);
  }

  setup() {

    let mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    let loader = new OBJLoader();

    let self = this;

    /*

    loader.load("skull.obj", (mesh) => {

      // Acquire and scale mesh
      // TODO: Do this dynamically
      this.mesh = mesh;
      const s = 0.005;
      this.mesh.scale.set(s, s, s);
      this.mesh.position.set(0, 0, 0);

      function convex(t, start, end) {
        return start * (1-t) + end * t;
      }

      let ROW_COUNT = 20;
      let COL_COUNT = 20;

      for (let i=0; i < ROW_COUNT; i++) {
        for (let j = 0; j < COL_COUNT; j++) {
          let y = convex(i/ROW_COUNT, -100, 10);
          let x = convex(j/COL_COUNT, -40, 10);
          let m = mesh.clone();
          m.position.set(x, y, 0);
          self.scene.add(m);
        }
      }

      // Since we have some async
      self.update();
      self.draw();
    });

    const ambient = new THREE.AmbientLight(0x404040);
    this.scene.add(ambient);

    const point = new THREE.PointLight(0xcccccc, 1, 100);
    point.position.set(5, 5, 5);
    point.lookAt(0, 0, 0);
    this.scene.add(point);
    */
  }

  update() {
    let d = 5;
    this.camera.position.set(d, d, d);
    this.camera.lookAt(0, 0, 0);
  }
}
