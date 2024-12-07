const cursor = document.querySelector('.cursor');
const startPage = document.querySelector('#startPage');
const gameOverPage = document.querySelector('#gameOver');
const holes = [...document.querySelectorAll('.hole')];
const dispTime = document.querySelector('#time');
const scoreEl = document.querySelector('#score');
const startBtn = document.querySelector('#start');
const reStartBtn = document.querySelector('#reStart');
let score = 0;
let increaseSpeed = 0;
// Timer counter
let myTimer = 0;

const sound = new Audio("assets/smash.mp3");
const explode = new Audio('assets/sound_explode.ogg');
const gameOverSound = new Audio('assets/sound_result.ogg');

function run() {
    const i = Math.floor(Math.random() * holes.length);
    let j = Math.floor(Math.random() * holes.length);
    if (i === j) {
        j = Math.floor(Math.random() * holes.length);
    }

    const hole = holes[i];
    const hole2 = holes[j];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'assets/mole_01.png';

    const img2 = document.createElement('img');
    img2.classList.add('mole');
    img2.src = 'assets/mole_06.png';

    img.addEventListener('click', () => {
        score += 10;
        sound.play();
        img.src = 'assets/mole_hurt.png';

        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            hole2.removeChild(img2);
            run();
        }, 500);
    });

    img2.addEventListener('click', () => {
        explode.play();
        img2.src = 'assets/bomb_explode.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            hole2.removeChild(img2);
            gameOver(timer);
        }, 500);
    });

    hole.appendChild(img);
    hole2.appendChild(img2);

    timer = setTimeout(() => {
        hole.removeChild(img);
        hole2.removeChild(img2);
        run();
    }, increaseSpeed);
}
let timerCounter = null;

function startGame() {
    score = 0;
    myTimer = 0;
    increaseSpeed = 1500;
    dispTime.innerHTML = myTimer;
    run();
    timerCounter = setInterval(() => {
        dispTime.innerHTML = myTimer;
        if((myTimer % 100) == 0) {
            increaseSpeed -=100;
        }
        myTimer += 1;
    }, 1000);
}

function gameOver(timer) {
    clearTimeout(timer);
    clearTimeout(timerCounter);
    gameOverSound.play();
    gameOverPage.style.display = 'block';
    scoreEl.textContent = score;
}

reStartBtn.onclick = () => {
    startPage.style.display = 'flex';
    gameOverPage.style.display = 'none';
}

window.addEventListener('load', () => {
    startBtn.onclick = () => {
        startPage.style.display = 'none';
        startGame();
    }
});

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});
window.addEventListener('mousedown', (e) => {
    cursor.classList.add('active');
});
window.addEventListener('mouseup', (e) => {
    cursor.classList.remove('active')
});
window.addEventListener('touchstart', (e) => {
    cursor.classList.add('active');
});
window.addEventListener('touchend', (e) => {
    cursor.classList.remove('active');
});