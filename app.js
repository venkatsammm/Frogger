const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

let currentIndex = 76 // starting position
const width = 9
let timerId
let outcomeTimerId
let currentTime = 20

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')

    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex -= 1
            break
        case 'ArrowRight':
            if (currentIndex % width < width - 1) currentIndex += 1
            break
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width
            break
        case 'ArrowDown':
            if (currentIndex + width < width * width) currentIndex += width
            break
    }
    squares[currentIndex].classList.add('frog')
}

function autoMoveElements() {
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsLeft.forEach(moveLogLeft)
    logsRight.forEach(moveLogRight)
    carsLeft.forEach(moveCarLeft)
    carsRight.forEach(moveCarRight)
}

function checkOutComes() {
    lose()
    win()
}

function moveLogLeft(logLeft) {
    if (logLeft.classList.contains('l1')) {
        logLeft.classList.replace('l1', 'l2')
    } else if (logLeft.classList.contains('l2')) {
        logLeft.classList.replace('l2', 'l3')
    } else if (logLeft.classList.contains('l3')) {
        logLeft.classList.replace('l3', 'l4')
    } else if (logLeft.classList.contains('l4')) {
        logLeft.classList.replace('l4', 'l5')
    } else if (logLeft.classList.contains('l5')) {
        logLeft.classList.replace('l5', 'l1')
    }
}

function moveLogRight(logRight) {
    if (logRight.classList.contains('l1')) {
        logRight.classList.replace('l1', 'l5')
    } else if (logRight.classList.contains('l2')) {
        logRight.classList.replace('l2', 'l1')
    } else if (logRight.classList.contains('l3')) {
        logRight.classList.replace('l3', 'l2')
    } else if (logRight.classList.contains('l4')) {
        logRight.classList.replace('l4', 'l3')
    } else if (logRight.classList.contains('l5')) {
        logRight.classList.replace('l5', 'l4')
    }
}

function moveCarLeft(carLeft) {
    if (carLeft.classList.contains('c1')) {
        carLeft.classList.replace('c1', 'c2')
    } else if (carLeft.classList.contains('c2')) {
        carLeft.classList.replace('c2', 'c3')
    } else if (carLeft.classList.contains('c3')) {
        carLeft.classList.replace('c3', 'c1')
    }
}

function moveCarRight(carRight) {
    if (carRight.classList.contains('c1')) {
        carRight.classList.replace('c1', 'c3')
    } else if (carRight.classList.contains('c2')) {
        carRight.classList.replace('c2', 'c1')
    } else if (carRight.classList.contains('c3')) {
        carRight.classList.replace('c3', 'c2')
    }
}

function lose() {
    if (
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = 'You lose!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
        squares[currentIndex].classList.remove('frog')
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You Win!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
        timerId = null
        outcomeTimerId = null
    } else {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutComes, 50)
        document.addEventListener('keyup', moveFrog)
    }
})
