import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  function handleClick(i) {
    console.log(i);
    if (board[i] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < winningCombination.length; i++) {
      const [a, b, c] = winningCombination[i];
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        return;
      }
    }

    setIsXNext(!isXNext);
  }

  function rederSquare(i) {
    return (
      <button onClick={() => handleClick(i)} className="square">
        {board[i]}
      </button>
    );
  }

  function startNewGame() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  }

  const result = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="board">
      <div className={`status ${winner ? 'winner' : ''}`}>{result}</div>
      <div className="board-row">
        {rederSquare(0)}
        {rederSquare(1)}
        {rederSquare(2)}
      </div>
      <div className="board-row">
        {rederSquare(3)}
        {rederSquare(4)}
        {rederSquare(5)}
      </div>
      <div className="board-row">
        {rederSquare(6)}
        {rederSquare(7)}
        {rederSquare(8)}
      </div>
      <button onClick={startNewGame} className="new-game">Start New Game</button>
    </div>
  );
}

export default App;
