function text(ctx, lines) {

    // Clear
    ctx.clearRect(0, 0, this.el.width, this.el.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, this.el.width, this.el.height);

    // ...
    ctx.fillStyle = "black";
    ctx.font = "50px sans-serif";
    lines.forEach((line, i) => {
        ctx.fillText(line, 0, (50+10)*(i+1));
    });
}
export class Text {
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

    clear() {
        this.ctx.clearRect(0, 0, this.el.width, this.el.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.el.width, this.el.height);
    }

    draw() {
        this.clear();
        this.ctx.fillStyle = "black";
        this.ctx.font = "30px sans-serif";
        this.ctx.fillText("for </3", 0+20, this.el.height-20);
        return;

        let lines = ["for eames"];
        lines.forEach((line, i) => {
        });
    }

    toDataURL() {
        return this.el.toDataURL("image/jpg");
    }
}
