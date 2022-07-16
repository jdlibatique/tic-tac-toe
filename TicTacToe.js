// import React, {useState} from "react";
// import './TicTacToe.css'
//
// const TicTacToe = () => {
//
//     const [turn, setTurn] = useState(`x`);
//     const [cells, setCells] = useState(Array(9).fill(``));
//     const [winner, setWinner] = useState();
//
//     const checkForWin = (squares) => {
//         const combinations = {
//             vertical: [
//                 [0, 1, 2],
//                 [3, 4, 5],
//                 [6, 7, 8],
//             ],
//             horizontal: [
//                 [0, 3, 6],
//                 [1, 4, 7],
//                 [2, 5, 8],
//             ],
//             diagonal: [
//                 [0, 4, 8],
//                 [2, 4, 6],
//             ]
//         }
//
//         for (const combination in combinations) {
//             combinations[combination].forEach((pattern) => {
//                 if (squares[pattern[0]] === '' ||
//                     squares[pattern[1]] === '' ||
//                     squares[pattern[2]] === ''
//                 ) {
//
//                 }else if (squares[pattern[0]] === squares[pattern[1]] &&
//                     squares[pattern[1]] === squares[pattern[2]]) {
//                     setWinner(squares[pattern[0]]);
//                 }
//             });
//         }
//     }
//
//     const handleClick = (num) => {
//         if (cells[num] !== ``){
//             alert(`There's already something there!`)
//             return;
//         }
//         let squares = [...cells];
//         // alert(`test ${num}`);
//         if (turn === `x`) {
//             setTurn(`o`)
//             squares[num] = `x`;
//         }else {
//             setTurn(`x`);
//             squares[num] = `o`;
//         }
//         setCells(squares);
//         checkForWin();
//         // console.log(squares);
//     }
//
//     const Cell = ({num}) => {
//         return <td onClick={() => handleClick(num)}>{cells[num]}</td>
//     };
//
//     return (
//         <div className={"container"}>
//             <table>
//                 Turn {turn}
//                 <tbody>
//                 <tr>
//                     <Cell num={0} />
//                     <Cell num={1} />
//                     <Cell num={2} />
//                 </tr>
//                 <tr>
//                     <Cell num={3} />
//                     <Cell num={4} />
//                     <Cell num={5} />
//                 </tr>
//                 <tr>
//                     <Cell num={6} />
//                     <Cell num={7} />
//                     <Cell num={8} />
//                 </tr>
//                 </tbody>
//             </table>
//             {winner && (
//                 <>
//                     <p>{winner} is the winner!</p>
//                     <button>Play Again</button>
//                 </>
//             )}
//         </div>
//     )
// }
//
// export default TicTacToe;

// const ticTacToe = () => {
//     const gameArray = [
//         ['', '', ''],
//         ['', '', ''],
//         ['', '', '']
//     ];
//     const winningCombinations = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
// }

let turn = `x`;
let gameDone = false;
let gameArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

console.log(gameArray[0][0]);

const setBoard = () => {
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

function setSymbol () {
    let x = parseInt(this.dataset.x);
    let y = parseInt(this.dataset.y);
    if (gameArray[x][y] !== ``) {
        alert(`There's already something there!`)
        return;
    }
    if (turn === `x`) {
        turn = `o`;
        gameArray[x][y] = `x`;
        this.innerHTML = `X`;
    } else {
        turn = `x`;
        gameArray[x][y] = `o`;
        this.innerHTML = `O`;
    }
    // checkForWin();
    console.log(gameArray);
}

document.querySelector("#btn-restart").addEventListener("click", setBoard);