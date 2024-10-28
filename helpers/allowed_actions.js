// All the allowed actions the robot can take

// currentBoard is a 15x15 grid with the type of cell in string

// robotLoc is a 2x1 array with the row / col of the robot
// peopleLoc is an Nx2 array of the locations of all workers

// robotLocQueue is the queue of all the robot locations (for animation)
// currentState is an enum saying if we hit a terminal state or not

function _pushRobotLoc() {
    robotLocQueue.push([robotLoc[0], robotLoc[1]]);
}

// Show the final state (e.g. "Success!" or "Drowned :(")
function setUpdatedState() {

    let displayText = 'Incomplete!';

    switch (currentState) {
        case STATE_COLLISION:
            displayText = 'Fail: Hit a worker!';
            break;
        case STATE_DROWNED:
            displayText = 'Fail: Drowned!';
            break;
        case STATE_SUCCESS:
            displayText = 'Success!';
            break;
    }

    document.getElementById('current-status').innerText = displayText;
}

function _updateState() {
    let currentSquare = currentBoard[robotLoc[0]][robotLoc[1]];

    if (currentSquare == WATER) {
        currentState = STATE_DROWNED;
        return;
    }

    if (currentSquare == BOAT) {
        currentState = STATE_SUCCESS;
        return;
    }

    // Check to make sure we didn't squish a worker
    for (let i = 0; i < peopleLoc.length; i++) {
        if (peopleLoc[i][0] == robotLoc[0] && peopleLoc[i][1] == robotLoc[1]) {
            currentState = STATE_COLLISION;
            return;
        }
    }
}

function moveLeft() {
    if (currentState != STATE_RUNNING) {
        return;
    }

    if (robotLoc[0] > 0 && currentBoard[robotLoc[0] - 1][robotLoc[1]] != WALL) {
        robotLoc[0] -= 1;
        _pushRobotLoc();
        _updateState();
    }
}

function moveRight() {
    if (currentState != STATE_RUNNING) {
        return;
    }

    if (robotLoc[0] < 14 && currentBoard[robotLoc[0] + 1][robotLoc[1]] != WALL) {
        robotLoc[0] += 1;
        _pushRobotLoc();
        _updateState();
    }
}

function moveUp() {
    if (currentState != STATE_RUNNING) {
        return;
    }

    if (robotLoc[1] > 0 && currentBoard[robotLoc[0]][robotLoc[1] - 1] != WALL) {
        robotLoc[1] -= 1;
        _pushRobotLoc();
        _updateState();
    }
}

function moveDown() {
    if (currentState != STATE_RUNNING) {
        return;
    }

    if (robotLoc[1] < 14 && currentBoard[robotLoc[0]][robotLoc[1] + 1] != WALL) {
        robotLoc[1] += 1;
        _pushRobotLoc();
        _updateState();
    }
}

function _checkIfSafe(col, row) {
    if (col < 0 || col >= 15 || row < 0 || row >= 15) {
        return false;
    }

    if (currentBoard[col][row] == WATER || currentBoard[col][row] == WALL) {
        return false;
    }

    for (let i = 0; i < peopleLoc.length; i++) {
        if (peopleLoc[i][0] == col && peopleLoc[i][1] == row) {
            return false;
        }
    }

    return true;
}

function isUpSafe() {
    return _checkIfSafe(robotLoc[0], robotLoc[1] - 1); 
}

function isDownSafe() {
    return _checkIfSafe(robotLoc[0], robotLoc[1] + 1);
}

function isLeftSafe() {
    return _checkIfSafe(robotLoc[0] - 1, robotLoc[1]);
}

function isRightSafe() {
    return _checkIfSafe(robotLoc[0] + 1, robotLoc[1]);
}
