'use strict'
const PACMAN = '😷';


var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    switch (nextCell) {
        case WALL:
            return;
        case FOOD:
            updateScore(1);
            gFoodCount++;
            break;
        case CHERRY:
            updateScore(10);
            break;
    }
    console.log(gFoodCount);
    if (gPacman.isSuper && nextCell === SUPERFOOD) return;
    if (nextCell === SUPERFOOD) {
        updateScore(1)
        gPacman.isSuper = true;
        console.log(gPacman.isSuper);
        setTimeout(function () {
            gPacman.isSuper = false
            gGhosts.push(...gGraveyard);
            gGraveyard = [];
        }, 5000);

    }


    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            console.log(gPacman.location.i, gPacman.location.j);
            for (var i = 0; i < gGhosts.length; i++) {
                var currGhost = gGhosts[i];
                if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
                    gGraveyard.push(currGhost);
                    gGhosts.splice(i, 1);
                }
            }
        } else {
            gameOver();
            renderCell(gPacman.location, EMPTY);
            return;
        }

    }



    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);

    checkVictory();

}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}