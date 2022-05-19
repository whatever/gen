import * as THREE from "three";

import {Basic3, basic3} from "../basics.js";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";

class BackDrop extends THREE.Object3D {
  constructor(w, h) {
    super();

    let pos = [
      -w, +h, +0.0, // A     A--C--E
      -w, -h, +0.0, // B     | /| /|
      +0, +h, +0.0, // C     |/ |/ |
      +0, -h, +0.0, // D     B--D--F
      +w, +h, +0.0, // E
      +w, -h, +0.0, // F
    ];

    let uvs = [
      0.0, 0.0,
      0.0, 1.0,
      0.5, 0.0,
      0.5, 1.0,
      1.0, 0.0,
      1.0, 1.0,
    ];


    let col = [
      0xC2/0xFF, 0x4F/0xFF, 0x74/0xFF, // 0xC24F74
      0xC2/0xFF, 0x4F/0xFF, 0x74/0xFF, // 0xC24F74
      0x6B/0xFF, 0xC1/0xFF, 0xFF/0xFF, // 0x6BC1FF
      0x6B/0xFF, 0xC1/0xFF, 0xFF/0xFF, // 0x6BC1FF
      0xC2/0xFF, 0x4F/0xFF, 0x74/0xFF, // 0xC24F74
      0xC2/0xFF, 0x4F/0xFF, 0x74/0xFF, // 0xC24F74
    ];


    let geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    geo.setIndex([
      0, 1, 2,
      3, 2, 1,
      2, 3, 4,
      5, 4, 3,
    ]);
    const mat = new THREE.MeshBasicMaterial({vertexColors: true, side: THREE.DoubleSide});
    const mes = new THREE.Mesh(geo, mat);
    this.add(mes);
  }
}

class HelvetikerMesh extends THREE.Object3D {
  constructor(text, size) {
    super();
    const loader = new FontLoader();
    loader.load('helvetiker_regular.typeface.json', (font) => {
      const geo = new TextGeometry(text, {
        font: font,
        size: 1.0,
        height: 0.01,
        curveSegments: 15,
        bevelEnabled: false,
        bevelThickness: 0.0001,
        bevelSize: 0.0001,
        bevelOffset: 0,
        bevelSegments: 10,
      });

      let mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color: 0x000000}));

      mesh.geometry.computeBoundingBox();

      const box = mesh.geometry.boundingBox;

      let center = new THREE.Vector3(
        (box.max.x - box.min.x)/2.0,
        (box.max.y - box.min.y)/2.0,
        (box.max.z - box.min.z)/2.0,
      );

      mesh.geometry.center(center);

      this.add(mesh);
    },
    () => {},
    (err) => {
      console.log(err);
    });

  }
}

export class Boredom extends Basic3 {
  constructor({el: el}) {
    super(...arguments);


    this.mesh = new BackDrop(60, 40);

    this.renderer.setClearColor(0x000000);
    this.objects = [];


    const start = -60;
    const end = 60;

    const COUNT = 10;
    for (let i=0; i < COUNT; i++) {

      let u = i/(COUNT-1);

      let pos = [(1-u)*start + (u)*end, 0, 0];

      let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 0.00001),
        new THREE.MeshBasicMaterial({color: 0xFFFFFF}),
      );

      mesh.position.set((1-u)*start + (u)*end, 5, 0);

      this.scene.add(mesh);

    }
    this.text = new HelvetikerMesh("everything was completely beautiful and nothing ever hurt // if that's your girl, why is she tearing me asunder?")
    this.text.position.set(0, 5, 0);
    this.scene.add(this.mesh);
    this.scene.add(this.text);
  }

  update(t) {
    t /=  1000.0;
    t *= 3.0;

    const LENGTH = 40.0;

    let x = (t % LENGTH) - LENGTH/2.0;
    let y = 5.0;
    let z = 15.0;

    this.camera.position.set(x, y, z);
    this.camera.lookAt(new THREE.Vector3(x, y, 0));
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }
}
