export class Canvas {
    constructor([w, h], zoom) {
        this.dims = [w, h];
        this.zoom = zoom;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width',  w);
        this.canvas.setAttribute('height', h);
        this.canvas.style.width  = `${zoom * w}px`;
        this.canvas.style.height = `${zoom * h}px`;
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);
    }

    clear() {
        this.ctx.clearRect(0, 0, ...this.dims);
    }

    setPixel([x, y]) {
        this.ctx.fillRect(x, y, 1, 1);
    }
}
