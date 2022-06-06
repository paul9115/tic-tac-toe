import React, { useState } from "react";
import {calculateWinner} from "../helpers";
import Board from "./Board";
import '../styles/style.css'

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);

    const handleClick = (i) => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [...current]
        if(winner || squares[i]) return null;
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...timeInHistory, squares]);
        setXIsNext(!xIsNext);
        setStepNumber(timeInHistory.length);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }

    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? `Go to move#${move}` : 'Go to Start';
            return (
                <li key={move}>
                    <button className='steps' onClick={() => jumpTo(move)}>
                        {destination}
                    </button>
                </li>
            )
        })
    )

    return (
        <>
        <Board squares={history[stepNumber]} onClick={handleClick} />
        <div className='moves'>
            <p>{winner ? `Winner: ${winner}` : `Next Player ${xIsNext ? 'X' : 'O'}`}</p>
            {renderMoves()}
        </div>
        </>
    );
}

export default Game;