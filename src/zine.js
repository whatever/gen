export class Zine {
    constructor({el, page}) {

        this.el = el;
        this.page = page;

        this.ctx = el.getContext("webgl");
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            canvas: el,
            antialias: true,
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

    eventHandlers() {
        return {};
    }
}