let canvas = document.getElementById('my-canvas');

let ctx = canvas.getContext('2d');

// Size of total grid (in pixels)
let canvasSize = 450;

canvas.width = canvasSize;
canvas.height = canvasSize;

// Size of each grid space (in pixels)
let gridSqSize = 30;

// Number of grid squares in the grid (along each dimension)
let gridSize = Math.floor(canvasSize / gridSqSize);

function generateBlankBoard() {
    let board = new Array(gridSize).fill(TREE);
    for (let i = 0; i < gridSize; i++) {
        board[i] = new Array(gridSize).fill(TREE);
    }
    return board;
}

let currentBoard = generateBlankBoard();
let robotLoc = [0, 0];
let leftHouseMap = [];
let rightHouseMap = [];

function drawGridLines() {
    ctx.lineWidth = 0.25;
    ctx.strokeStyle = 'rgb(100, 100, 100)';

    for (let x = gridSqSize; x < canvasSize; x += gridSqSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasSize);
        ctx.closePath();
        ctx.stroke();
    }

    for (let y = gridSqSize; y < canvasSize; y += gridSqSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasSize, y);
        ctx.closePath();
        ctx.stroke();
    }
}

// Maps from string values in `cell_options.js`
// to the render color
function getColor(cellValue) {
    if (cellValue == TREE) {
        return 'rgb(0,128,0)';
    }

    if (cellValue == STREET) {
        return 'rgb(128, 128, 128)';
    }

    if (cellValue == PIT) {
        return 'rgb(0,0,0)';
    }

    return '';
}

const robotImg = new Image();
robotImg.src = "images/robot.svg";
robotImg.onload = () => {
    redraw();
}

function drawRobot() {
    ctx.drawImage(robotImg, robotLoc[0] * gridSqSize, robotLoc[1] * gridSqSize, gridSqSize, gridSqSize);
}



function getImg(cellValue) {
    /*if (cellValue == WALL) {
        return brickImg;
    }

    if (cellValue == BOAT) {
        return boatImg;
    }*/

    return null;
}

function drawBoard() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {

            let color = getColor(currentBoard[i][j]);
            if (!!color) {    
                ctx.fillStyle = color;
                ctx.fillRect(i * gridSqSize, j * gridSqSize, gridSqSize, gridSqSize);
            }

            let img = getImg(currentBoard[i][j]);
            if (!!img) {
                ctx.drawImage(img, i * gridSqSize, j * gridSqSize, gridSqSize, gridSqSize);
            }

        }
    }

    // TODO: Draw the houses

    drawRobot();
}


// Method to redraw board
function redraw() {
    ctx.clearRect(0,0,canvasSize,canvasSize);

    drawBoard();

    drawGridLines();
}



// Called whenever we want to reset the challenge
function resetChallenge() {
    currentBoard = generateBlankBoard();
    robotLoc = [0, 0];
    leftHouseMap = [];
    rightHouseMap = [];

    currentChallenge.initBoard();
}

function countLinesOfCode(allCode) {
    let splitLines = allCode.trim().split('\n');

    let count = 0;
    for (let i = 0; i < splitLines.length; i++) {
        let trimmedLine = splitLines[i].trim();
        if (trimmedLine.length > 0 && !trimmedLine.startsWith('//')) {
            count++;
        }
    }
    return count;
}

function initNewChallenge(challengeName) {
    // Save the name of the challenge, so refreshes of the page
    // load the same thing next time.
    localStorage.setItem('challengeName', challengeName);

    currentChallenge = challengeMap[challengeName];

    document.getElementById('challenge-selector').value = challengeName;
    document.getElementById('desc').innerText = currentChallenge.desc;

    document.getElementById('code-view').innerText = currentChallenge.startSimulation.toString().trim();
    document.getElementById('code-stats').innerText = `${countLinesOfCode(currentChallenge.startSimulation.toString())} LOC`; // TODO: actually compute

    resetChallenge();
    redraw();
}


// Add all the options to the dropdown
for (const challenge of Object.keys(challengeMap)) {
    let optionEl = document.createElement('option');
    optionEl.innerText = challengeMap[challenge].title;
    optionEl.value = challenge;

    document.getElementById('challenge-selector').appendChild(optionEl);
}

let initialChallengeName = localStorage.getItem('challengeName') || Object.keys(challengeMap)[0];


initNewChallenge(initialChallengeName);

document.getElementById('challenge-selector').onchange = (ev) => {
    initNewChallenge(ev.target.value);
}

currentState = STATE_PAUSED;

function startSimulation() {
    currentState = STATE_RUNNING;
    robotLocQueue = [];

    currentChallenge.startSimulation();
    _updateState();


    // Do the animation
    animationStep();
}

function animationStep() {
    if (robotLocQueue.length > 0) {
        robotLoc = robotLocQueue.shift();
        
        redraw();

        setTimeout(animationStep, animationDelayMs);
    } else {
        setUpdatedState();
    }
}

document.getElementById('start-btn').onclick = () => {
    if (currentState == STATE_PAUSED) {
        document.getElementById('start-btn').style['display'] = 'none';
        document.getElementById('current-status').innerText = 'Running...';
        startSimulation();
    }
};
