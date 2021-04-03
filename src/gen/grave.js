import {Basic3} from '../basics.js';

import {GrassyField} from '@pool-water/objs';
import {Land} from  '@pool-water/objs';

import SimplexNoise from 'simplex-noise';

import {getElapsedTime} from "@pool-water/objs";

/**
 * Return the norm of the vector
 */
function norm(v) {
  return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
}

/**
 * ...
 */
export class Graveyard extends Basic3 {
  constructor({el}) {
    super(...arguments);
    this.el = el;
    this.app = {};
    this.width = this.el.offsetWidth;
    this.height = this.el.offsetHeight;
  }

  setup() {
    this.app.width      = this.width;
    this.app.height     = this.height;
    this.app.view_angle = 15;
    this.app.aspect     = this.width/this.height;
    this.app.near       = 0.1;
    this.app.far        = 1000;
    this.app.iterations = 0;
    this.app.time       = 0;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias : true,
      canvas: this.el,
    });

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      this.app.view_angle,
      this.app.aspect,
      this.app.near,
      this.app.far,
    );

    // Lights
    this.ambientLight = new THREE.AmbientLight(0xCCCCCC);
    this.directionalLight = new THREE.DirectionalLight(0x333333, 0.5);
    this.pointLight1 = new THREE.PointLight(0x333333, 2, 800);
    this.pointLight2 = new THREE.PointLight(0x333333, 2, 800);

    this.directionalLight.position.set(0, 0, -1);
    this.pointLight1.position.set(0, 10, -10);
    this.pointLight2.position.set(0, 10, -10);

    this.directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
    this.pointLight1.lookAt(new THREE.Vector3(0, 0, 0));
    this.pointLight2.lookAt(new THREE.Vector3(0, 0, 0));

    this.scene.add(this.directionalLight);
    this.scene.add(this.pointLight1);
    this.scene.add(this.pointLight2);
    this.scene.add(this.ambientLight);

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(1.5);
    this.renderer.setClearColor(0xFFFFFF);

    // Helper setup functions
    this.setupTrack();

    // Add visible components
    this.addFloor();

    // ...
    let start = getElapsedTime();
    this.addGrassyField();
    console.log("Create grassy field time:", getElapsedTime()-start);

    this.force = new THREE.Vector3(0, 0, 1);
    this.dest = this.force.clone();
    this.dest.multiplyScalar(-1);
  }

  // Setup a camera track... but in this case actually do nothing
  setupTrack() {
    this.camera.position.set(0, 30, 80);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  // ...
  addGrassyField() {

    this.field = new GrassyField(
        30,
        30,
        61.0,
        30,
        this.floor.f,
    );

    this.grassMaterial = new THREE.MeshPhongMaterial({
      color: 0x84a349,
      specular: 0x37a4b3,
    });

    this.fieldMesh = new THREE.Mesh(
      this.field.geometry(),
      this.grassMaterial,
    );

    this.scene.add(this.fieldMesh);
  }

  // ...
  addTombstone(x, z) {
    let geometry = new THREE.BoxGeometry(4, 8, 1);
    let material =  new THREE.MeshPhongMaterial({
      color: 0x333333,
      emissive: 0x777777,
      specular: 0x000000,
      reflectivity: 0,
      shininess: 0,
      shading: THREE.SmoothShading,
      side: THREE.DoubleSide,
    });

    let cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;
    cube.position.y = 4;;
    cube.position.z = z;
    this.scene.add(cube);
  }

  // ...
  setWind(wind) {
    this.wind = wind;
    this.fieldMesh.material.uniforms.wind.value = wind;
  }
  setPhong(params) {
    this.grassMaterial = this.field.material(params);
    this.fieldMesh.material = this.grassMaterial;
  }

  // Just draw a simple floor
  addFloor() {
    let mat = new THREE.MeshBasicMaterial({
      color: 0xCCCCC,
      wireframe: true,
    });

    let _abc = (function () {
      let s = 16.0;
      let simplex = new SimplexNoise("whatever");
      return (x, y) => {
        return 2.0*simplex.noise2D(x/s, y/s);
      };
    }());

    this.floor = new Land({
      height: 20,
      width: 20,
      floor: _abc,
    });

    let geo = this.floor.getMesh();

    this.scene.add(new THREE.Mesh(geo, mat));
  }

  update(params) {
    let t = +new Date()/300000.0;
    let r = 70;
    let x = r*Math.cos(t);
    let z = r*Math.sin(t);

    let [a, b, c] = [r*Math.cos(t), r/2, r*Math.sin(t)];

    // ...
    this.camera.position.set(a, b, c);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.app.view_angle,
      this.app.aspect,
      this.app.near,
      this.app.far
    );
  }

  setSize(width, height) {
    this.app.width = width;
    this.app.height = height;
    this.app.aspect = width/height;
    this.setupCamera();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.app.width, this.app.height);
  }

  resize(width, height) {
    this.setSize(width, height);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }
}
