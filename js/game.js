'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '🍔';
const CHERRY = '🍒';

var gFoodCount;
var gFoodOnBoard;
var gCherryInterval;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gFoodCount = 0;
    gGame.isOn = true
    gCherryInterval = setInterval(addCherry, 10000);
    gFoodOnBoard = foodCount(gBoard);
    console.log(gFoodOnBoard);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < 17; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === 16 ||
                (j === 3 && i > 4 && i < SIZE - 2) || (j === 13 && i > 4 && i < SIZE - 2) || (j >= 7 && j <= 9 && i === 4) || (j === 7 && i >= 4 && i <= 5) || (j === 9 && i >= 4 && i <= 5)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = SUPERFOOD;
    board[8][1] = SUPERFOOD;
    board[8][15] = SUPERFOOD;
    board[1][15] = SUPERFOOD;
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    openModal('lose');
    clearIntervals();
}
function clearIntervals() {
    clearInterval(gCherryInterval);
    clearInterval(gIntervalGhosts)
}
function openModal(winOrLose) {
    var elModal = document.querySelector('.modal');
    var elSpan = document.querySelector('.modal span')
    elModal.style.display = "block";
    if (winOrLose === 'win') {
        elSpan.innerText = 'GG Youve Won 😎';
    } else {
        elSpan.innerText = 'You Have Lost 😫';

    }

}
function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = "none";
}

function restartGame() {
    init();
    gGame.score = 0;
    closeModal();
    var elH2Span = document.querySelector('h2 span');
    elH2Span.innerText = '0';
}

function checkVictory() {
    if (gFoodCount === gFoodOnBoard) {
        openModal('win');
        gGame.isOn = false;
        clearIntervals();

    }
}
function foodCount(board) {
    var foodCount = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === FOOD) {
                foodCount++;

            }

        }
    }
    return foodCount;
}

function addCherry() {
    var emptyCells = getEmptyCells(gBoard);
    var idx = getRandomIntInt(0, emptyCells.length);
    var emptyCell = emptyCells[idx];
    gBoard[emptyCell.i][emptyCell.j] = CHERRY;
    renderCell({ i: emptyCell.i, j: emptyCell.j }, CHERRY);

}

function getEmptyCells(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (currCell === EMPTY) {
                emptyCells.push({ i, j });
            }
        }
    }
    return emptyCells;
}