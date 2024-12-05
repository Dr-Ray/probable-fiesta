import Mole from './mole.js';
import Background from './background.js';
import Player from './player.js';

class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.score;
        this.timer;
        this.gameOver;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 768;
        this.baseWidth = 1280;
        this.heightRatio = this.height / this.baseHeight;
        this.widthRatio = this.width / this.baseWidth;
        this.ratio = this.widthRatio * this.heightRatio;

        this.background = new Background(this);
        this.player = new Player(this);
        this.mole = [];
        this.numberOfMoleRow = 3;
        this.numberOfMoleColumn = 3;
        this.scoreBoard = document.querySelector('#item_timer');
        this.timerBoard = document.querySelector('#item_pop');
        this.gameOverBoard = document.querySelector('#gameOverBoard');

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', (e) => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        });

        window.addEventListener('click', (e) => {
            // this.x = e.pageX - this.spriteWidth * 0.5;
            // this.y = e.pageY - this.spriteHeight * 0.5;
            // this.player.draw(e.pageX - this.player.spriteWidth * 0.5, e.pageY - this.player.spriteHeight * 0.5);
            this.player.hitTarget();
        });

    }
    createMole() {
        this.mole = [];
        const firstX = (this.canvas.width * 0.5)-152 * this.widthRatio;
        const firstY = 100 * this.heightRatio;
        const moleSpacingX = 160 * this.widthRatio;
        const moleSpacingY = 190 * this.heightRatio;
        for(let i=0;i<this.numberOfMoleRow;i++) {
            for(let j=0;j<this.numberOfMoleColumn;j++) {
                this.mole.push(new Mole(this, (firstX + j * moleSpacingX), ( firstY + i * moleSpacingY) ))
            }
        }
    }
    createSingleMole() {
        
    }
    checkCollision(a, b) {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;

        const dist = Math.hypot(dx, dy);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        // console.log(sumOfRadii, dist);
        return dist <= sumOfRadii;
    }
    render(deltaTime) {
        if(!this.gameOver) this.timer += deltaTime;
        
        this.background.draw();
        this.background.update();
        this.mole.forEach(mole => {
            mole.draw();
            mole.update();
        });

        this.player.draw();
        this.player.update();
        this.drawStatusText();

        // this.mole = this.mole.filter(mole => !mole.markedForDeletion);
    }
    formatTimer() {
        return this.timer * 0.001;
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'black';
        this.ctx.font = '15px Arial';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.heightRatio = this.height / this.baseHeight;
        this.widthRatio = this.width / this.baseWidth;

        this.background.resize();
        this.createMole();
        this.mole.forEach(mole => {
            mole.resize();
        });
        this.player.resize();
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;
    }
    drawStatusText() {
        const timed = 120 - this.formatTimer().toFixed(0);
        this.ctx.drawImage(this.scoreBoard, 10, 30, 167 * this.widthRatio, 70 * this.heightRatio);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText(timed, (167* this.widthRatio ) * 0.5, (70 * this.heightRatio)+(70 * this.heightRatio)*0.5);
        if(this.formatTimer().toFixed(0) > 10) {
            this.gameOver = true;
        }
    }

    drawGameOver() {
        this.ctx.drawImage(this.gameOverBoard, 0, 0, this.baseWidth* this.widthRatio, this.baseHeight* this.heightRatio);
        this.ctx.font = '30px sans-serif';
        this.ctx.fillStyle = '#000';
        this.ctx.fillText(`Your Score: ${this.score}`, ((this.baseWidth * 0.5)* this.widthRatio)-85, (this.baseHeight * 0.5)* this.heightRatio);
    }
}

window.addEventListener('load', (e) => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;
    const game = new Game(canvas, ctx);

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(deltaTime);
        if(!game.gameOver) {
            requestAnimationFrame(animate);
            // setInterval(() => {
            //     animate()
            // }, 10000);
        }else{
            game.timer = 100;
            game.render();
            game.drawGameOver();
        }

    }
    animate(0);
});