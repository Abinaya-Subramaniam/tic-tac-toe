import React, { useState } from 'react';
import Board from './Board';
import './Game.css'; 

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const xIsNext = stepNumber % 2 === 0;

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        if (squares[i] || calculateWinner(squares)) return;

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(newHistory.concat([{ squares }]));
        setStepNumber(newHistory.length);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    
    
    const isDraw = current.squares.every(square => square !== null) && !winner;

    const status = winner ? `Winner: ${winner}` : isDraw ? 'Draw!' : `Next player: ${xIsNext ? 'X' : 'O'}`;

 
    if ((winner || isDraw) && !showPopup) {
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
        resetGame(); 
    };

    const resetGame = () => {
        setHistory([{ squares: Array(9).fill(null) }]);
        setStepNumber(0);
    };

    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>
            <h2>Two Player Game</h2>
            <div className="game-status">{status}</div>
            <Board squares={current.squares} onClick={handleClick} />
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>{winner ? `Winner: ${winner}` : 'It\'s a Draw!'}</h2>
                        <button onClick={handleClosePopup}>Play Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default Game;
