// All the allowed actions the robot can take

function _pushRobotLoc() {
    robotLocQueue.push([robotLoc[0], robotLoc[1]]);
}

// Show the final state (e.g. "Success!" or "Ghosted :(")
function setUpdatedState() {

    let displayText = '' + numCandy + ' candy collected!';

    switch (currentState) {
        case STATE_GHOSTED:
            displayText = 'Ghosted :(';
            break;
        case STATE_LOST:
            displayText = 'Lost in the woods!';
            break;
        case STATE_PIT:
            displayText = 'Fell in a pit!';
            break;
    }

    document.getElementById('current-status').innerText = displayText;
}

function _updateState() {
    let currentSquare = currentBoard[robotLoc[0]][robotLoc[1]];

    if (currentSquare == PIT) {
        currentState = STATE_PIT;
        return;
    }

    if (currentSquare == TREE) {
        currentState = STATE_LOST;
        return;
    }
}


function _move(change) {
    if (currentState != STATE_RUNNING) {
        return;
    }

    robotLoc[0] += change[0];
    robotLoc[1] += change[1];
    _pushRobotLoc();
    _updateState();
}


function prevHouse() {
    _move([0, -1]);
    _move([0, -1]);
    _move([0, -1]);
    currentHouseIdx--;
}

function nextHouse() {
    _move([0, 1]);
    _move([0, 1]);
    _move([0, 1]);
    currentHouseIdx++;
}

function crossStreet() {
    if (currentState != STATE_RUNNING) {
        return;
    }
    if (isLeftSide) {
        _move([1,0]);
        _move([1,0]);
        _move([1,0]);
        _move([1,0]);
    } else {
        _move([-1,0]);
        _move([-1,0]);
        _move([-1,0]);
        _move([-1,0]);
    }   
    
    isLeftSide = !isLeftSide;
}

function knockAtDoor() {
    // Knock for candy
    if (currentState != STATE_RUNNING) {
        return;
    }

    if (isLeftSide) {
        _move([-1, 0]);
        // Check to see if house is candy or not
        if (currentHouseIdx >= 0 && currentHouseIdx < leftHouseMap.length) {
            if (leftHouseMap[currentHouseIdx] == CANDY) {
                numCandy++;
                _move([1, 0]);
            } else {
                currentState = STATE_GHOSTED;
            }
        } 
    } else {
        _move([1,0]);
        if (currentHouseIdx >= 0 && currentHouseIdx < rightHouseMap.length) {
            if (rightHouseMap[currentHouseIdx] == CANDY) {
                numCandy++;
                _move([-1, 0]);
            } else {
                currentState = STATE_GHOSTED;
            }
        } 
    }
}


