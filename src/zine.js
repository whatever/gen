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
      if (i % 2 == 0) {
        this.maps[i] = Zine;
      } else {
        this.maps[i] = Skull;
      }
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

// Return context, scene, renderer
function basic3(el) {
  let ctx = el.getContext("webgl", {preserveDrawingBuffer: true});
  let renderer = new THREE.WebGLRenderer({
    canvas: el,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(2*el.width, 2*el.height);
  renderer.setClearColor("#FFFFFF");
  return [ctx, renderer];
}

// 
function basic2(el) {
}

export class Skull {
  constructor({el, page, font}) {
    this.el = el;
    this.font = font;
    this.page = page;
    [this.ctx, this.renderer] = basic3(el)
    this.renderer.setClearColor("#7799AA");
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      el.width/el.height,
      0.1,
      1000,
    );
  }

  setup() {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(3.0),
      new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true}),
    );
    this.scene.add(this.mesh);
  }

  update() {
    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
    this.camera.lookAt(0, 0, 0);
    this.mesh.position.y = this.page / 2.0;
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }
}

export class Zine {

  constructor({el, page, font}) {

    this.font = font;
    this.el = el;
    this.page = page;

    this.ctx = el.getContext("webgl", {preserveDrawingBuffer: true});
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: el,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setSize(2*el.width, 2*el.height);
    this.renderer.setClearColor("#FFFFFF");

    this.camera = new THREE.PerspectiveCamera(
      75,
      el.width/el.height,
      0.1,
      1000,
    );
  }

  setup() {
    let geo = new THREE.TextGeometry("page = " + this.page, {
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

    this.mesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(3.0),
      new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true}),
    );
    this.scene.add(this.mesh);
  }

  update() {

    // let t = +new Date() / 1000.0;
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
