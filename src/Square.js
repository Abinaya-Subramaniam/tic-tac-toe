import React from 'react';
import './Square.css';

const Square = ({ value, onClick }) => {
    return (
        <button className="square" onClick={onClick}>
            {value === 'X' ? (
                <span className="x">{value}</span>
            ) : value === 'O' ? (
                <span className="o">{value}</span>
            ) : null}
        </button>
    );
};

export default Square;
