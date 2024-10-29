let step0Challenge = new Challenge();
step0Challenge.title = 'Step 0';
step0Challenge.desc = 'step 0 stuff';
step0Challenge.startSimulation = step0;
step0Challenge.initBoard = () => {
    /*for (let i = 5; i < 10; i++) {
        for (let j = 5; j < 10; j++) {
            currentBoard[i][j] = DOCK;
        }
    }

    currentBoard[7][10] = BOAT;

    robotLoc = [7, 5];*/
}

let step1Challenge = new Challenge();
step1Challenge.title = 'Step 1';
step1Challenge.desc = 'step 1 stuff';
step1Challenge.startSimulation = step1;
step1Challenge.initBoard = () => {
    /*for (let i = 5; i < 10; i++) {
        for (let j = 5; j < 10; j++) {
            currentBoard[i][j] = DOCK;
        }
    }

    currentBoard[9][10] = BOAT;

    robotLoc = [5, 5];*/
}

let step2Challenge = new Challenge();
step2Challenge.title = 'Step 2';
step2Challenge.desc = 'step 2 stuff';
step2Challenge.startSimulation = step2;
step2Challenge.initBoard = () => {
    /*for (let i = 5; i < 10; i++) {
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
    currentBoard[8][9] = WALL;*/
}

let step3Challenge = new Challenge();
step3Challenge.title = 'Step 3';
step3Challenge.desc = 'step 3 stuff';
step3Challenge.startSimulation = step3;
step3Challenge.initBoard = () => {

    /*let maxWidth = Math.floor(Math.random() * 7) + 2;
    let maxHeight = Math.floor(Math.random() * 7) + 2;

    for (let i = 5; i < maxWidth + 5; i++) {
        for (let j = 5; j < maxHeight + 5; j++) {
            currentBoard[i][j] = DOCK;
        }
    }

    currentBoard[4 + maxWidth][4 + maxHeight] = BOAT;

    robotLoc = [5, 5];*/
}

let step4Challenge = new Challenge();
step4Challenge.title = 'Step 4';
step4Challenge.desc = 'step 4 stuff';
step4Challenge.startSimulation = step4;
step4Challenge.initBoard = () => {

}


let challengeMap = {
    'step0': step0Challenge,
    'step1': step1Challenge,
    'step2': step2Challenge,
    'step3': step3Challenge,
    'step4': step4Challenge,
};

let currentChallenge = null;