import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
    return (
        <button className={"square " + props.className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
/*
//class component
class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={() => {
                    this.props.onClick();
                }}
            >
                {this.props.value}
            </button>
        );
    }
}
*/

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    renderSquare(i, squaresThatWon) {
        let className;
        if (squaresThatWon) {
            console.log(squaresThatWon);
            if (squaresThatWon.includes(i)) className = "select";
            else className = "";
        }
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                className={className}
                key={i}
            />
        );
    }

    render() {
        const squaresThatWon = this.props.squaresThatWon;
        console.log(squaresThatWon);

        const grid = [];
        let count = 0;
        for (let i = 0; i < 3; ++i) {
            const row = [];
            for (let j = 0; j < 3; ++j) {
                row.push(this.renderSquare(count, squaresThatWon));
                count++;
            }
            grid.push(
                <div className="board-row" key={i}>
                    {row}
                </div>
            );
        }

        return <div>{grid}</div>;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null), lastMove: [-1, -1] }],
            stepNumber: 0,
            xIsNext: true,
            sortedAscending: true,
        };
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (squares[i] || calculateWinner(squares)) return;
        squares[i] = this.state.xIsNext ? "X" : "O";
        //Square components re-render auto and Game has full control
        // over square components known as controlled com=ponenets.
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    lastMove: [(i % 3) + 1, parseInt(i / 3) + 1],
                },
            ]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length, //history here is local variable referrin to old unconcatenated history, another advantage of immutability approach
        });
    }
    sortSteps(moves, isAscending) {
        const sortMoves = moves.slice();
        if (isAscending) sortMoves.sort((a, b) => a.key - b.key);
        else sortMoves.sort((a, b) => b.key - a.key);

        return sortMoves;
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        console.log(calculateWinner(current.squares));
        const winners = calculateWinner(current.squares);
        let isDraw = false;
        if (!current.squares.includes(null) && !winners) isDraw = true;

        let moves = history.map((step, move) => {
            let desc = move
                ? `Go to game #${move} col: ${step.lastMove[0]} row: ${step.lastMove[1]}`
                : "Go to game start";
            const stepNumber = this.state.stepNumber;
            desc = move === stepNumber ? <b> {desc} </b> : desc;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}> {desc} </button>
                </li>
            );
        });
        if (this.state.sortedAscending) {
            moves = this.sortSteps(moves, true);
        } else moves = this.sortSteps(moves, false);

        let status;
        if (isDraw) status = "DRAW";
        else if (winners) status = "WINNER: " + winners[0];
        else status = "Next player: " + (this.state.xIsNext ? "X" : "O");

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        squaresThatWon={winners ? winners[1] : null}
                        onClick={(i) => {
                            this.handleClick(i);
                        }}
                    />
                </div>
                <div className="game-info">
                    <div>
                        <button
                            onClick={() => {
                                this.setState({
                                    sortedAscending:
                                        !this.state.sortedAscending,
                                });
                            }}
                        >
                            {`Sort moves ${
                                this.state.sortedAscending
                                    ? "descending"
                                    : "ascending"
                            }`}
                        </button>
                    </div>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
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
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}
