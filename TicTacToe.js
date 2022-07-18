let turn;
let gameDone = false;

let gameArray;
let history;
let turnCount;

const setGameArray = () => {
    gameArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    history = [];
}

const setBoard = () => {
    setGameArray();
    turnCount = 0;
    gameDone = false;
    turn = 'X';
    while (history.length) history.pop(); //Remove all elements from history

    document.querySelector("#turn-header").innerHTML = "IT'S THE TURN FOR PLAYER X"
    document.querySelector("#btn-previous").style.opacity = "0";
    document.querySelector("#btn-previous").disabled = true;
    document.querySelector("#btn-next").style.opacity = "0";
    document.querySelector("#btn-next").disabled = true;

    let gameBoard = document.querySelector("#game-board")

    while (gameBoard.firstElementChild) {
        console.log(`Removed`)
        gameBoard.removeChild(gameBoard.firstElementChild);
    }

    for (let i = 0; i < 9; i++) {
        let btnBoard = document.createElement('button');
        btnBoard.id = `btn-${i}`;
        btnBoard.dataset.y = `${i % 3}`;
        if (i < 3)
            btnBoard.dataset.x = `0`;
        else
            btnBoard.dataset.x = `${Math.floor(i / 3)}`;
        gameBoard.appendChild(btnBoard);
        btnBoard.addEventListener("click", setSymbol);
    }
    if (document.querySelector("#game-board").childElementCount !== 0 || gameDone === true) {
        document.querySelector("#btn-restart").innerHTML = "Restart";
    }
}

const checkForWin = (turn) => {
    let start;
    for (let i = 0; i < 3; i++) {
        if (gameArray[i][0] !== '' && gameArray[i][0] === gameArray[i][1] && gameArray[i][1] === gameArray[i][2]) {
            gameDone = true;
            start = i;
            colorize(start, "horizontal");
        } else if (gameArray[0][i] !== '' && gameArray[0][i] === gameArray[1][i] && gameArray[1][i] === gameArray[2][i]) {
            gameDone = true;
            start = i;
            colorize(start, "vertical");
        }
    }
    if (gameArray[0][0] !== '' && gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2]) {
        gameDone = true;
        colorize(0, "diagonalLeft");
    } else if (gameArray[0][2] !== '' && gameArray[0][2] === gameArray[1][1] && gameArray[1][1] === gameArray[2][0]) {
        gameDone = true;
        colorize(2, "diagonalRight");
    }

    if (gameDone) {
        document.querySelector("#btn-previous").style.opacity = "1";
        document.querySelector("#btn-previous").disabled = false;
        document.querySelector("#btn-next").style.opacity = "1";
        document.querySelector("#btn-next").disabled = false;
        if (turn === 'X'){
            document.querySelector("#turn-header").innerHTML = `O HAS WON!`;
        }else
            document.querySelector("#turn-header").innerHTML = `X HAS WON!`;
        for (let i = 0; i < 9; i++) {
            document.querySelector(`#btn-${i}`).disabled = true;
        }
    }else if (turnCount === 9) {
        document.querySelector("#turn-header").innerHTML = `NO MORE VALID MOVES`;
    }else
        document.querySelector("#turn-header").innerHTML = `IT'S THE TURN FOR PLAYER ${turn}`
}

function setSymbol() {
    let x = parseInt(this.dataset.x);
    let y = parseInt(this.dataset.y);
    if (gameArray[x][y] !== ``) {
        alert(`There's already something there!`)
        return;
    }
    if (turn === `X`) {
        this.innerHTML = `X`;
        gameArray[x][y] = `X`;
        history.push({x: x, y: y, symbol: turn});
        turnCount++;
        turn = `O`;
        checkForWin(turn);
    } else {
        this.innerHTML = `O`;
        gameArray[x][y] = `O`;
        history.push({x: x, y: y, symbol: turn});
        turnCount++;
        turn = `X`;
        checkForWin(turn)
    }
    console.log(`Turn = ${turnCount}`);
    console.log(gameDone);
    console.log(history);
    console.log(history[turnCount - 1].x);
    console.log(gameArray);
}

const colorize = (start, direction) => {

    const setButtonStyle = (buttonNumber) => {
        document.querySelector(`#btn-${buttonNumber}`).style.color = `#b0ff65`;
        document.querySelector(`#btn-${buttonNumber}`).style.transform = `scale(1.05)`;
        document.querySelector(`#btn-${buttonNumber}`).style.border = `3px solid #b0ff65`;
        document.querySelector(`#btn-${buttonNumber}`).style.borderBottom = `5px outset #b0ff65`;
        document.querySelector(`#btn-${buttonNumber}`).style.boxShadow = `0 0 10px #b0ff65`;
    }
    if (direction === "horizontal") {
        for (let i = (start * 3); i < (start * 3) + 3; i++) {
            setButtonStyle(i)
        }
    } else if (direction === "vertical") {
        for (let i = start; i < 9; i += 3) {
            setButtonStyle(i)
        }
    } else if (direction === "diagonalLeft") {
        for (let i = start; i < 9; i += 4) {
            setButtonStyle(i)
        }
    } else if (direction === "diagonalRight") {
        for (let i = start; i < 8; i += 2) {
            setButtonStyle(i)
        }
    }

}

const goBackHistory = () => {
    if (turnCount === 0){
        document.querySelector("#btn-previous").disabled = true;
        return;
    }
    document.querySelector("#btn-next").disabled = false;
    console.log(history[turnCount - 1])
    let x = history[turnCount - 1].x;
    let y = history[turnCount - 1].y;
    let symbol = history[turnCount - 1].symbol;
    gameArray[x].splice(y, 1)
    document.querySelector(`#btn-${((x * 3) + y)}`).innerHTML = ` `;
    turnCount--;
}

const goForwardHistory = () => {
    if (turnCount > history.length - 1){
        document.querySelector("#btn-next").disabled = true;
        return;
    }
    document.querySelector("#btn-previous").disabled = false;
    console.log(history[turnCount - 1])
    let x = history[turnCount].x;
    let y = history[turnCount].y;
    let symbol = history[turnCount].symbol;
    gameArray[x].unshift(y)
    document.querySelector(`#btn-${((x * 3) + y)}`).innerHTML = `${symbol}`;
    turnCount++;
}

document.querySelector("#btn-restart").addEventListener("click", setBoard);
document.querySelector("#btn-previous").addEventListener("click", goBackHistory);
document.querySelector("#btn-next").addEventListener("click", goForwardHistory);
