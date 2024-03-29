import * as THREE from "three";

import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";

import {basic3} from "../basics.js";
export class Zine {

  constructor({el, page, font}) {

    this.font = font;
    this.el = el;
    this.page = page;
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
    /*
    let geo = new TextGeometry("page = " + this.page, {
      font: this.font,
      size: 1,
      height: 0.001,
      bevelThickness: 0.1,
      bevelSize: 0.1,
    });
    let mat = new THREE.MeshBasicMaterial({color: 0x000000});
    this.meshage = new THREE.Mesh(geo, mat);
    this.meshage.position.set(0, -4, 0);
    this.scene.add(this.meshage);
    */

    this.mesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(3.0),
      new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true}),
    );
    this.scene.add(this.mesh);
  }

  update() {

    let t = this.page;

    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
    this.camera.lookAt(0, 0, 0);

    this.mesh.rotation.x = +0.3*t;
    this.mesh.rotation.y = -0.5*t;
    this.mesh.rotation.z = +0.1*t;
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  toDataURL() {
    return this.el.toDataURL('image/png');
  }

  getImageData() {
    let gl = this.ctx;
    let pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    console.log(pixels);
  }

  eventHandlers() {
    return {};
  }
}
