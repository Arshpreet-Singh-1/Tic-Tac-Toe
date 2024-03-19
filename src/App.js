import './App.css';  // Importing the CSS file for styling

import { useState } from 'react';  // Importing the useState hook from React

// Square component representing each square in the tic-tac-toe board
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board component representing the tic-tac-toe board
function Board({ xIsNext, squares, onPlay }) {
  // Function to handle click on a square
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;  // If there's a winner or square is already filled, do nothing
    }
    const nextSquares = squares.slice();  // Create a copy of the squares array
    // Fill the square with 'X' or 'O' based on whose turn it is
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);  // Call the onPlay function passed as prop with updated squares
  }

  // Determine the winner of the game
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Rendering the board
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* Render each square */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Game component representing the overall game
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);  // State to maintain game history
  const [currentMove, setCurrentMove] = useState(0);  // State to maintain current move
  const xIsNext = currentMove % 2 === 0;  // Check whose turn it is
  const currentSquares = history[currentMove];  // Get current squares configuration

  // Function to handle a player's move
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];  // Create new history with updated move
    setHistory(nextHistory);  // Update history state
    setCurrentMove(nextHistory.length - 1);  // Update current move
  }

  // Function to jump to a specific move in history
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Render the list of moves
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render the game board and move history
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate the winner of the game
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];  // Return the winner if there is one
    }
  }
  return null;  // Return null if there is no winner
}
