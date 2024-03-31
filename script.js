// Constants & Variables
let inputDir = {x: 0, y: 0}; 

const foodSound = new Audio('images/food.mp3');
const gameOverSound = new Audio('images/gameover.mp3');
const moveSound = new Audio('images/move.mp3');

let speed = 8;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [
    {x: 12, y: 12}
];

food = {x: 6, y: 6};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // bump into himself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // bump into the wall
    if(snake[0].x >= 28 || snake[0].x <=0 || snake[0].y >= 24 || snake[0].y <=0){
        return true; 
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir =  {x: 0, y: 0}; 
        alert(`Game Over ! your score is ${score}`);
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }

    // If eaten food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("high score", `${hiscoreval}`);
            hiscoreBox.innerHTML = "High Score : " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 17;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

// Main logic 
let hiscore = localStorage.getItem("high score");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("high score", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    document.getElementById('up').addEventListener('click', () => {
        inputDir = {x: 0, y: -1};
    });
    
    document.getElementById('down').addEventListener('click', () => {
        inputDir = {x: 0, y: 1};
    });
    
    document.getElementById('left').addEventListener('click', () => {
        inputDir = {x: -1, y: 0};
    });
    
    document.getElementById('right').addEventListener('click', () => {
        inputDir = {x: 1, y: 0};
    });
    switch (e.key) {
        case "ArrowUp" :
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown" :
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft" :
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "e":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "s": 
           inputDir.x = -1;
           inputDir.y = 0;
           break;  
        case "f":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "d":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        default:
            break;
    }
});


document.getElementById('up').addEventListener('click', () => {
    inputDir = {x: 0, y: -1};
    moveSound.play();
});

document.getElementById('down').addEventListener('click', () => {
    inputDir = {x: 0, y: 1};
    moveSound.play();
});

document.getElementById('left').addEventListener('click', () => {
    inputDir = {x: -1, y: 0};
    moveSound.play();
});

document.getElementById('right').addEventListener('click', () => {
    inputDir = {x: 1, y: 0};
    moveSound.play();
});


// exit and restart 
document.addEventListener("DOMContentLoaded", function() {
    const restartBtn = document.getElementById("restart");
    function restart() {
        setTimeout(function() {
            score=0;
            window.location.reload();
        }, 1000);
    }
    
    restartBtn.addEventListener("click", restart);

    let exitBtn = document.getElementById("exit");
    exitBtn.addEventListener("click", function(){
        window.close(); 
    });
});