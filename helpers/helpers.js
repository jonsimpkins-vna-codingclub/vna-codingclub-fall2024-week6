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
let isLeftSide = true;
let currentHouseIdx = 0;
let numCandy = 0;

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
    if (cellValue == TREE || cellValue == HOUSE) {
        return 'rgb(0,128,0)';
    }

    if (cellValue == STREET || cellValue == PIT) {
        return 'rgb(128, 128, 128)';
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

const treeImg = new Image();
treeImg.src = "images/tree.svg";
treeImg.onload = () => {
    redraw();
}

const candyImg = new Image();
candyImg.src = "images/candy.svg";
candyImg.onload = () => {
    redraw();
}

const ghostImg = new Image();
ghostImg.src = "images/ghost.svg";
ghostImg.onload = () => {
    redraw();
}

const houseImg = new Image();
houseImg.src = "images/normal_house.svg";
houseImg.onload = () => {
    redraw();
}

const ghostHouseImg = new Image();
ghostHouseImg.src = "images/ghost_house.svg";
ghostHouseImg.onload = () => {
    redraw();
}

const pitImg = new Image();
pitImg.src = "images/pit.svg";
pitImg.onload = () => {
    redraw();
}

function drawBoard() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {

            let color = getColor(currentBoard[i][j]);
            if (!!color) {    
                ctx.fillStyle = color;
                ctx.fillRect(i * gridSqSize, j * gridSqSize, gridSqSize, gridSqSize);
            }

            if (currentBoard[i][j] == TREE) {
                ctx.drawImage(treeImg, i * gridSqSize, j * gridSqSize, gridSqSize, gridSqSize);
            }

        }
    }

    for (let i = 0; i < leftHouseMap.length; i++) {
        let startX = 4 * gridSqSize;
        let startY = (2 + 3*i) * gridSqSize;
        if (leftHouseMap[i] == CANDY) {
            ctx.drawImage(candyImg, startX, startY, gridSqSize, gridSqSize);
            ctx.drawImage(houseImg, startX - (2*gridSqSize), startY - gridSqSize, 2*gridSqSize, 2*gridSqSize);
        }
        if (leftHouseMap[i] == GHOST) {
            ctx.drawImage(ghostImg, startX, startY, gridSqSize, gridSqSize);
            ctx.drawImage(ghostHouseImg, startX - (2*gridSqSize), startY - gridSqSize, 2*gridSqSize, 2*gridSqSize);
        }
        if (leftHouseMap[i] == PIT) {
            ctx.drawImage(pitImg, startX + gridSqSize, startY, gridSqSize, gridSqSize);
            ctx.drawImage(candyImg, startX, startY, gridSqSize, gridSqSize);
            ctx.drawImage(houseImg, startX - (2*gridSqSize), startY - gridSqSize, 2*gridSqSize, 2*gridSqSize);
        }
    }

    for (let i = 0; i < rightHouseMap.length; i++) {
        let startX = 10 * gridSqSize;
        let startY = (2 + 3*i) * gridSqSize;
        if (rightHouseMap[i] == CANDY) {
            ctx.drawImage(candyImg, startX, startY, gridSqSize, gridSqSize);
            ctx.drawImage(houseImg, startX + gridSqSize, startY - gridSqSize, 2*gridSqSize, 2*gridSqSize);
        }
        if (rightHouseMap[i] == GHOST) {
            ctx.drawImage(ghostImg, startX, startY, gridSqSize, gridSqSize);
            ctx.drawImage(ghostHouseImg, startX + gridSqSize, startY - gridSqSize, 2*gridSqSize, 2*gridSqSize);
        }
        if (rightHouseMap[i] == PIT) {
            ctx.drawImage(pitImg, startX - gridSqSize, startY, gridSqSize, gridSqSize);
            ctx.drawImage(candyImg, startX, startY, gridSqSize, gridSqSize);
            ctx.drawImage(houseImg, startX + gridSqSize, startY - gridSqSize, 2*gridSqSize, 2*gridSqSize);
        }
    }

    drawRobot();
}


// Method to redraw board
function redraw() {
    ctx.clearRect(0,0,canvasSize,canvasSize);

    drawBoard();

    drawGridLines();

    // TODO: update to draw count of candy
}



// Called whenever we want to reset the challenge
function resetChallenge() {
    currentBoard = generateBlankBoard();
    robotLoc = [0, 0];
    leftHouseMap = [];
    rightHouseMap = [];
    isLeftSide = true;
    currentHouseIdx = 0;
    numCandy = 0;

    currentChallenge.initBoard();

    let streetLength = 1 + 3*Math.max(leftHouseMap.length, rightHouseMap.length);

    for (let i = 5; i < 10; i++) {
        for (let j = 1; j < streetLength; j++) {
            currentBoard[i][j] = STREET;
        }
    }

    robotLoc = [5, 2];
    isLeftSide = true;

    // Apply the driveways to the houses
    for (let i = 0; i < leftHouseMap.length; i++) {
        if (leftHouseMap[i] == PIT) {
            currentBoard[5][2 + (3*i)] = PIT;
        }
        currentBoard[4][2 + (3*i)] = STREET;

        currentBoard[2][1 + (3*i)] = HOUSE;
        currentBoard[3][1 + (3*i)] = HOUSE;
        currentBoard[2][2 + (3*i)] = HOUSE;
        currentBoard[3][2 + (3*i)] = HOUSE;
    }

    for (let i = 0; i < rightHouseMap.length; i++) {
        if (rightHouseMap[i] == PIT) {
            currentBoard[9][2 + (3*i)] = PIT;
        }
        currentBoard[10][2 + (3*i)] = STREET;

        currentBoard[11][1 + (3*i)] = HOUSE;
        currentBoard[12][1 + (3*i)] = HOUSE;
        currentBoard[11][2 + (3*i)] = HOUSE;
        currentBoard[12][2 + (3*i)] = HOUSE;
    }
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
    localStorage.setItem('wk6challengeName', challengeName);

    currentChallenge = challengeMap[challengeName];

    document.getElementById('challenge-selector').value = challengeName;
    document.getElementById('desc').innerText = currentChallenge.desc;

    resetChallenge();

    let codeView = '';
    codeView += 'let leftHouseMap = ' + JSON.stringify(leftHouseMap) + ';\n';
    if (rightHouseMap.length) {
        codeView += 'let rightHouseMap = ' + JSON.stringify(rightHouseMap) + ';\n';
    }
    codeView += '\n';
    codeView += currentChallenge.startSimulation.toString().trim();

    document.getElementById('code-view').innerText = codeView;
    document.getElementById('code-stats').innerText = `${countLinesOfCode(currentChallenge.startSimulation.toString())} LOC`; // TODO: actually compute

    redraw();
}


// Add all the options to the dropdown
for (const challenge of Object.keys(challengeMap)) {
    let optionEl = document.createElement('option');
    optionEl.innerText = challengeMap[challenge].title;
    optionEl.value = challenge;

    document.getElementById('challenge-selector').appendChild(optionEl);
}

let initialChallengeName = localStorage.getItem('wk6challengeName') || Object.keys(challengeMap)[0];


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
