export class Eyes {
    constructor({el}) {
        this.el = el;
        this.ctx = this.el.getContext("2d");
        this.ctx.width = el.width;
        this.ctx.height = el.height;
    }

    setup() {
        this.ctx.drawEye = (x, y, size) => {

            let x_offset = size/4.0;
            let y_offset = size/1.5;

            // Whole eye
            this.ctx.beginPath();
            this.ctx.moveTo(x-size, y);
            this.ctx.bezierCurveTo(
                x-x_offset, y-y_offset,
                x+x_offset, y-y_offset,
                x+size, y,
            );
            this.ctx.bezierCurveTo(
                x+x_offset, y+y_offset,
                x-x_offset, y+y_offset,
                x-size, y,
            );
            this.ctx.fillStyle = "white";
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
            
            // Iris
            this.ctx.beginPath();
            let radius = size/2.0-1.0;
            this.ctx.moveTo(x+radius, y);
            this.ctx.arc(x, y, radius, 0, 2*Math.PI);
            this.ctx.fillStyle = "black";
            this.ctx.fill();
            this.ctx.closePath();
        };
    }

    update() {
    }

    draw() {
        this.ctx.clearRect(0, 0, this.el.width, this.el.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.el.width, this.el.height);

        this.ctx.save();
            // this.ctx.beginPath();
            // this.ctx.rect(10, 10, 100, 100);
            // this.ctx.stroke();

            for (let i=0; i < 100; i++) {
                let x = Math.random()*this.el.width;
                let y = Math.random()*this.el.height;
                let s = Math.random()*100+25;
                this.ctx.drawEye(x, y, s);
            }

        this.ctx.restore();
    }

    toDataURL() {
        return this.el.toDataURL("image/png");
    }
}