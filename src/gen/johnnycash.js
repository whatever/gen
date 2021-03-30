import {Basic3} from "../basics.js";

export class JohnnyCash extends Basic3 {
    constructor({el}) {
        super(...arguments);

        this.mesh = null;
        this.renderer.setClearColor(0xFFFFFF);
    }

    setup() {
        /*
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xFFFFFF }),
        );
        this.mesh.position.set(0, 0, 0);
        this.scene.add(this.mesh);
        */
        let mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

        let loader = new THREE.OBJLoader();

        loader.load("skull.obj", (mesh) => {
            mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    // child.material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
                    // child.geometry.computeFaceNormals();
                    // child.geometry.computeVertexNormals();
                    // child.material.shading = THREE.SmoothShading;
                }
            });

            this.mesh = mesh;
            const s = 0.005;
            this.mesh.scale.set(s, s, s);
            // this.mesh.scale.set(new THREE.Vector3(0.001, 0.001, 0.001));
            this.scene.add(this.mesh);
            this.mesh.position.set(0, 0, 0);
        });
        // */

        const ambient = new THREE.AmbientLight(0x404040);

        this.scene.add(ambient);

        const point = new THREE.PointLight(0xffffff, 1, 100);
        point.position.set(50, 50, 50);
        point.lookAt(0, 0, 0);
        this.scene.add(point);
    }

    update() {
        let d = 5;
        this.camera.position.set(d, d, d);
        this.camera.lookAt(0, 0, 0);
    }
}