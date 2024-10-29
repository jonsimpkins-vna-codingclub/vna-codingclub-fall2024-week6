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

function prevHouse() {
    // Move to previous house
}

function nextHouse() {
    // Move to next house
}

function crossStreet() {
    // Swap to other side of street
}

function knockAtDoor() {
    // Knock for candy
}


