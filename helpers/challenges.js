let step0Challenge = new Challenge();
step0Challenge.title = 'Step 0';
step0Challenge.desc = '2nd house is haunted, but the other 3 have candy.';
step0Challenge.startSimulation = step0;
step0Challenge.initBoard = () => {
    leftHouseMap = [CANDY, GHOST, CANDY, CANDY];
    rightHouseMap = [];
}

let step1Challenge = new Challenge();
step1Challenge.title = 'Step 1';
step1Challenge.desc = 'Still 4 houses, but now a random one is haunted.';
step1Challenge.startSimulation = step1;
step1Challenge.initBoard = () => {
    leftHouseMap = [CANDY, CANDY, CANDY, CANDY];

    leftHouseMap[Math.floor(Math.random() * 4)] = GHOST;

    rightHouseMap = [];
}

let step2Challenge = new Challenge();
step2Challenge.title = 'Step 2';
step2Challenge.desc = 'Between 2 and 4 houses, unknown amount of haunting.';
step2Challenge.startSimulation = step2;
step2Challenge.initBoard = () => {
    let houseLength = Math.floor(Math.random() * 3) + 2;

    let anyCandy = false;
    leftHouseMap = [];
    for (let i = 0; i < houseLength; i++) {
        
        let value = GHOST;
        if (Math.random() > 0.5) {
            value = CANDY;
            anyCandy = true;
        }
        
        leftHouseMap.push(value);
    }

    if (!anyCandy) {
        leftHouseMap[0] = CANDY;
    }
}

let step3Challenge = new Challenge();
step3Challenge.title = 'Step 3';
step3Challenge.desc = 'Between 2 and 4 houses on each side of the street';
step3Challenge.startSimulation = step3;
step3Challenge.initBoard = () => {
    let houseLength = Math.floor(Math.random() * 3) + 2;

    let anyCandy = false;
    leftHouseMap = [];
    for (let i = 0; i < houseLength; i++) {
        
        let value = GHOST;
        if (Math.random() > 0.5) {
            value = CANDY;
            anyCandy = true;
        }
        
        leftHouseMap.push(value);
    }

    houseLength = Math.floor(Math.random() * 3) + 2;
    rightHouseMap = [];
    for (let i = 0; i < houseLength; i++) {
        
        let value = GHOST;
        if (Math.random() > 0.5) {
            value = CANDY;
            anyCandy = true;
        }
        
        rightHouseMap.push(value);
    }

    if (!anyCandy) {
        leftHouseMap[0] = CANDY;
    }
}

let step4Challenge = new Challenge();
step4Challenge.title = 'Step 4';
step4Challenge.desc = 'Between 2 and 4 houses on each side, but now there is also a trap pit in front of one of the houses!';
step4Challenge.startSimulation = step4;
step4Challenge.initBoard = () => {
    let houseLength = Math.floor(Math.random() * 3) + 2;

    let anyCandy = false;
    leftHouseMap = [];
    for (let i = 0; i < houseLength; i++) {
        
        let value = GHOST;
        if (Math.random() > 0.5) {
            value = CANDY;
            anyCandy = true;
        }
        
        leftHouseMap.push(value);
    }

    houseLength = Math.floor(Math.random() * 3) + 2;
    rightHouseMap = [];
    for (let i = 0; i < houseLength; i++) {
        
        let value = GHOST;
        if (Math.random() > 0.5) {
            value = CANDY;
            anyCandy = true;
        }
        
        rightHouseMap.push(value);
    }

    if (!anyCandy) {
        leftHouseMap[0] = CANDY;
    }

    if (Math.random() > 0.5) {
        // Left pit
        leftHouseMap[1 + Math.floor(Math.random() * (leftHouseMap.length - 1))] = PIT;
    } else {
        // Right pit
        rightHouseMap[Math.floor(Math.random() * (rightHouseMap.length))] = PIT;
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