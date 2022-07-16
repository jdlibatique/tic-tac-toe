let turn = `x`;
let gameDone = false;

let gameArray;

const setGameArray = () => {
    gameArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
}

const setBoard = () => {
    setGameArray();
    gameDone = false;
    turn = 'x';

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
        alert(`${turn} has won!`)
        for (let i = 0; i < 9; i++) {
            document.querySelector(`#btn-${i}`).disabled = true;
        }
    }
}

function setSymbol() {
    let x = parseInt(this.dataset.x);
    let y = parseInt(this.dataset.y);
    if (gameArray[x][y] !== ``) {
        alert(`There's already something there!`)
        return;
    }
    if (turn === `x`) {
        this.innerHTML = `X`;
        gameArray[x][y] = `x`;
        checkForWin(turn);
        turn = `o`;
    } else {
        this.innerHTML = `O`;
        gameArray[x][y] = `o`;
        checkForWin(turn);
        turn = `x`;
    }

    console.log(gameDone);
    console.log(gameArray);
}

const colorize = (start, direction) => {

    const setButtonStyle = (i) => {
        document.querySelector(`#btn-${i}`).style.color = `#b0ff65`;
        document.querySelector(`#btn-${i}`).style.transform = `scale(1.05)`;
        document.querySelector(`#btn-${i}`).style.border = `3px solid #b0ff65`;
        document.querySelector(`#btn-${i}`).style.borderBottom = `5px outset #b0ff65`;
        document.querySelector(`#btn-${i}`).style.boxShadow = `0 0 10px #b0ff65`;
    }
    if (direction === "horizontal") {
        for (let i = (start * 3); i < (start * 3) + 3; i++) {
            setButtonStyle(i)
        }
    }else if (direction === "vertical") {
        for (let i = start; i < 9; i += 3) {
            setButtonStyle(i)
        }
    }else if (direction === "diagonalLeft") {
        for (let i = start; i < 9; i += 4) {
            setButtonStyle(i)
        }
    }else if (direction === "diagonalRight") {
    for (let i = start; i < 8; i += 2) {
        setButtonStyle(i)
    }
}

}



const colorizeVertical = (start) => {
    console.log(start);

}

document.querySelector("#btn-restart").addEventListener("click", setBoard);