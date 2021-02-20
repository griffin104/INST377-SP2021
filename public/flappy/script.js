const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.container')
const ground = document.querySelector('.ground')

let birdLeft = 220
let birdBottom = 100
let gravity = 2
let gameSpeed = 2
let isGameOver = false


function paint() {
    birdBottom -= gravity
    if (birdBottom < 0) {
        birdBottom = 0
    }
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'

    document.addEventListener('click', jump)
}

function generateObstacles() {
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    const gap = 450

    let obstacleLeft = 500
    let obstacleBottom = Math.ceil(Math.random() * 60)
    
    if (!isGameOver) {
        obstacle.classList.add('obstacle')
        topObstacle.classList.add('top-obstacle')
    }
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)
    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.bottom = obstacleBottom + gap + 'px'

    function moveObstacle() {
        obstacleLeft -= gameSpeed
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'

        if (obstacleLeft === -60) {
            clearInterval(timerId)
            gameDisplay.removeChild(obstacle)
            gameDisplay.removeChild(topObstacle)
        }
        if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220  && 
            (birdBottom < obstacleBottom + 152 || birdBottom > obstacleBottom + gap - 200) ||
            birdBottom <= 0) {
            gameOver()
            clearInterval(timerId)
        }
    }

    let timerId = setInterval(moveObstacle, 20)
    if (!isGameOver) setTimeout(generateObstacles, 3500)
}

function jump() {
    birdBottom += 50
    if (birdBottom > 535) {
        birdBottom = 535
    }
}



function gameOver() {
    clearInterval(gameLoop)
    isGameOver = true
}
let gameLoop = setInterval(paint, 20)
generateObstacles()
