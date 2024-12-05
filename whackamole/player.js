class Player {
    constructor(game) {
        this.game = game;
        this.x = 10;
        this.y = 10;
        this.width;
        this.height;
        this.spriteWidth = 152;
        this.spriteHeight = 180
        this.hammer = document.querySelector('#hammer');
        this.collisionX;
        this.collisionY;
        this.collisionRadius = 30;

        window.addEventListener('mousemove', (e) => {
            this.x = e.pageX - this.width * 0.5;
            this.y = e.pageY - this.width * 0.5;
        });
    }

    draw() {
        this.game.ctx.fillStyle = "blue";
        // this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.fillStyle = "blue";
        this.game.ctx.drawImage(this.hammer, this.x, this.y, this.width, this.height);
        // this.game.ctx.beginPath();
        // this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, 2 * Math.PI);
        // this.game.ctx.stroke();
    }
    update() {
        this.collisionX = this.x + this.width * 0.5;
        this.collisionY = this.y + this.height * 0.5;
    }

    resize() {
        this.width = this.spriteWidth * this.game.widthRatio;
        this.height = this.spriteHeight * this.game.heightRatio;
    }

    hitTarget() {
        // this.game.ctx.save();
        // this.game.ctx.rotate(20 * Math.PI / 180);
        // this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        // this.game.ctx.restore();
        
        // this.game.score++;
        
    }

}

export default Player;