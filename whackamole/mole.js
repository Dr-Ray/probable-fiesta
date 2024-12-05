class Mole {
    constructor(game, x, y) {
        this.game = game;
        this.width = 152;
        this.height = 180
        this.mole = document.querySelector('#mole');
        this.dirt = document.querySelector('#dirt');
        this.scaledWidth = this.width * this.game.widthRatio;
        this.scaledHeight = this.height * this.game.heightRatio;
        this.x = x;
        this.y = y;
        this.markedForDeletion = false;
        this.collisionX;
        this.collisionY;
        this.collisionRadius = this.scaledWidth;
    }
    draw(){
        this.game.ctx.fillStyle = "yellow";
        // this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
        
        this.game.ctx.drawImage(this.mole, this.x, this.y, this.scaledWidth, this.scaledHeight);
        // this.game.ctx.drawImage(this.dirt, 0, this.y + 49, 185, 49, this.x, this.y, this.scaledWidth, this.scaledHeight);
        // this.game.ctx.beginPath();
        // this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, 2 * Math.PI);
        // this.game.ctx.stroke();
    }
    update() {
        this.collisionX = this.x + this.scaledWidth * 0.5;
        this.collisionY = this.y + this.scaledHeight * 0.5;
        // console.log(this.collisionX, this.collisionY, 'mole->>');
        if(!this.markedForDeletion) {
            if(this.game.checkCollision(this, this.game.player)) {
                this.markedForDeletion = true;
                this.game.score +=1;
            }
        }
       
        // console.log(this.game.checkCollision(this, this.game.player));
        
        // if(this.isHit()) {
            // this.game.mole = this.game.mole.filter(mole => !mole.markedForDeletion)
        // }
    }
    resize() {
        this.scaledWidth = this.width * this.game.widthRatio;
        this.scaledHeight = this.height * this.game.heightRatio;
        this.collisionRadius = (this.width * this.game.widthRatio) * 0.5 - 25;
    }
    // isHit() {
    //     return true;
    // }
}

export default Mole;