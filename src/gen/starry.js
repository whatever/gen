import * as THREE from "three";

import {Basic3} from "../basics.js";

function text(ctx, lines) {
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    let size = 32;

    // ...
    ctx.fillStyle = "black";
    ctx.font = size + "px sans-serif";
    lines.forEach((line, i) => {
        ctx.fillText(line, 0, (size+10)*(i+1));
    });
}

function hitek(lines, width, height) {

    let w  = Math.pow(2, Math.ceil(Math.log2(width)));
    let h  = Math.pow(2, Math.ceil(Math.log2(height)));

    let canvas = document.createElement("canvas");
    let s = 8;
    canvas.width = s*w;
    canvas.height = s*h;


    let ctx = canvas.getContext("2d");
    ctx.scale(s, s);
    text(ctx, lines);

    return ctx;
}

export class Starry extends Basic3 {
    constructor({el}) {
        super(...arguments);
        this.el = el;
        this.renderer.setClearColor("#CCC");
    }

    setup() {
        let ratio = this.el.height/this.el.width;
        let w = 256;
        let h = w * ratio;

        this.texture = hitek([
            "all thug",
            "still tipsy",
            "anytime that we get here",
            "we don't have to rush when",
            "",
            "//",
            "",
            "you said,",
            "\"What have I got to lose?\"",
        ], w, h);

        const tex = new THREE.CanvasTexture(this.texture.canvas);

        const d = 5;
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(d, d*ratio, 16),
            new THREE.MeshBasicMaterial({map: tex}),
        );

        this.scene.add(this.mesh);
    }
    
    update() {
        this.camera.position.set(0, 0, 6);
        this.camera.lookAt(0, 0, 0);

        this.mesh.position.x = 0;
        this.mesh.position.y = 0;
        this.mesh.position.z = 0;
    }
}
