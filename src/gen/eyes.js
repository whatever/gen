export class Eyes {
    constructor({el}) {
        this.el = el;
        this.ctx = this.el.getContext("2d");
        this.ctx.width = el.width;
        this.ctx.height = el.height;
    }

    setup() {
    }

    update() {
    }

    draw() {
        this.ctx.clearRect(0, 0, this.el.width, this.el.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.el.width, this.el.height);

        this.ctx.save();
            this.ctx.beginPath();
            this.ctx.rect(10, 10, 100, 100);
            this.ctx.stroke();
        this.ctx.restore();
    }
}