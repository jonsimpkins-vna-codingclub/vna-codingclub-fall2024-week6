let step0Challenge = new Challenge();
step0Challenge.title = 'Step 0';
step0Challenge.desc = 'Try to get the robot to move 5 steps down, without falling in the water. Can you solve it in 5 LOC?';
step0Challenge.startSimulation = step0;
step0Challenge.initBoard = () => {
    for (let i = 5; i < 10; i++) {
        for (let j = 5; j < 10; j++) {
            currentBoard[i][j] = DOCK;
        }
    }

    currentBoard[7][10] = BOAT;

    robotLoc = [7, 5];
}

let step1Challenge = new Challenge();
step1Challenge.title = 'Step 1';
step1Challenge.desc = 'Now, 4 steps to the right and 5 steps down. Don\'t drown!';
step1Challenge.startSimulation = step1;
step1Challenge.initBoard = () => {
    for (let i = 5; i < 10; i++) {
        for (let j = 5; j < 10; j++) {
            currentBoard[i][j] = DOCK;
        }
    }

    currentBoard[9][10] = BOAT;

    robotLoc = [5, 5];
}

let step2Challenge = new Challenge();
step2Challenge.title = 'Step 2';
step2Challenge.desc = 'Serpentine pattern! Don\'t get stuck driving into a brick wall!';
step2Challenge.startSimulation = step2;
step2Challenge.initBoard = () => {
    for (let i = 5; i < 10; i++) {
        for (let j = 5; j < 10; j++) {
            currentBoard[i][j] = DOCK;
        }
    }

    currentBoard[9][10] = BOAT;

    robotLoc = [5, 5];

    currentBoard[7][5] = WALL;
    currentBoard[8][6] = WALL;
    currentBoard[9][7] = WALL;

    
    currentBoard[5][6] = WALL;
    currentBoard[6][7] = WALL;
    currentBoard[7][8] = WALL;
    currentBoard[8][9] = WALL;
}

let step3Challenge = new Challenge();
step3Challenge.title = 'Step 3';
step3Challenge.desc = 'The island is a random height / width! But the boat is always in the bottom-right corner, just be careful to check to see if each step is safe.';
step3Challenge.startSimulation = step3;
step3Challenge.initBoard = () => {

    let maxWidth = Math.floor(Math.random() * 7) + 2;
    let maxHeight = Math.floor(Math.random() * 7) + 2;

    for (let i = 5; i < maxWidth + 5; i++) {
        for (let j = 5; j < maxHeight + 5; j++) {
            currentBoard[i][j] = DOCK;
        }
    }

    currentBoard[4 + maxWidth][4 + maxHeight] = BOAT;

    robotLoc = [5, 5];
}

let step4Challenge = new Challenge();
step4Challenge.title = 'Step 4';
step4Challenge.desc = 'Total chaos! The boat is in a random location on the edge of the island, and now there are sometimes workers you need to avoid running into.';
step4Challenge.startSimulation = step4;
step4Challenge.initBoard = () => {

    for (let i = 5; i < 10; i++) {
        for (let j = 5; j < 10; j++) {
            currentBoard[i][j] = DOCK;
        }
    }


    let boatIndex = Math.floor(Math.random() * 5) + 5;
    if (Math.random() > 0.5) {
        if (Math.random() > 0.5) {
            currentBoard[5][boatIndex] = BOAT;
        } else {
            currentBoard[9][boatIndex] = BOAT;
        }
    } else {
        if (Math.random() > 0.5) {
            currentBoard[boatIndex][5] = BOAT;
        } else {
            currentBoard[boatIndex][9] = BOAT;
        }
    }

    robotLoc = [7, 7];

    peopleLoc = [];
    for (let i = 0; i < 2; i++) {
        let randomRow = Math.floor(Math.random() * 3) + 6;
        let randomCol = Math.floor(Math.random() * 3) + 6;

        if (randomCol != 7 || randomRow != 7) {
            peopleLoc.push([randomCol, randomRow]);
        }
    }
}


let challengeMap = {
    'step0': step0Challenge,
    'step1': step1Challenge,
    'step2': step2Challenge,
    'step3': step3Challenge,
    'step4': step4Challenge,
};

let currentChallenge = null;