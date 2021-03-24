import {basic3} from "../basics.js";

/**
 * Skull
 *
 * Renders some skulls on the screen.
 */
export class Skull {
  constructor({el, page, font}) {
    this.el = el;
    this.font = font;
    this.page = page;
    [this.ctx, this.renderer] = basic3(el)
    this.renderer.setClearColor("#FFFFFF");
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      el.width/el.height,
      0.1,
      3000,
    );
  }

  setup() {
    lattice(0).forEach(([x, y, z]) => {
      const size = 1;
      let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({color: 0x000000}),
      );
      mesh.position.set(x, y, z);
      this.scene.add(mesh);
    });
  }

  update() {
    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
    this.camera.lookAt(0, 0, 0);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }
}


function lattice(num) {
  let points = [];

  for (let i=-10; i < 20; i++) {
    for (let j=-60; j < 25; j++) {
      let x = 6.0*(i-10.0);
      let y = 3.0*(j-17.0);
      points.push([
        x,
        y,
        wave(x, y),
      ]);
    }
  }

  return points;
}


// Return a depth coordinate for a position
function wave(x, y) {
  return 3.0*Math.sin(y/2);
}