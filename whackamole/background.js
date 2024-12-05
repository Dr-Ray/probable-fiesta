class Background {
    constructor(game) {
        this.game = game;
        this.image = document.querySelector('#background');
        this.width = 1280;
        this.height = this.game.baseHeight;
        this.scaledWidth;
        this.scaledHeight;
    }

    draw(){
        this.game.ctx.drawImage(this.image, 0, 0, this.scaledWidth, this.scaledHeight);
    }
    update() {}
    resize() {
        this.scaledWidth = this.width * this.game.widthRatio;
        this.scaledHeight = this.height * this.game.heightRatio;
    }
}

export default Background;