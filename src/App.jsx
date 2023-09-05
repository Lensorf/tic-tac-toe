/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import './App.css';

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const initialBoard = Array(9).fill('');

function App() {
  const savedBoard = localStorage.getItem('ticTacToe');
  const initialPlayer = JSON.parse(localStorage.getItem('currentPlayer')) || 'X';
  const [board, setBoard] = useState(savedBoard ? JSON.parse(savedBoard) : initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
  }, [currentPlayer]);

  const handleClick = (index) => {
    if (board[index] === '' && !winner) {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
      checkWinner(updatedBoard, currentPlayer);
      setCurrentPlayer(currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X);
      localStorage.setItem('ticTacToe', JSON.stringify(updatedBoard));
    }
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтальные
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикальные
      [0, 4, 8], [2, 4, 6], // диагональные
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        break;
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setCurrentPlayer(PLAYER_X);
    localStorage.removeItem('ticTacToe');
    localStorage.removeItem('currentPlayer');
  };

  return (
    <div className="App">
      <h1>Крестики-нолики</h1>
      {winner && (
      <h2>
        Победитель:
        {winner}
      </h2>
      )}
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <button onClick={() => resetGame()}>Начать новую игру</button>
    </div>
  );
}

export default App;
