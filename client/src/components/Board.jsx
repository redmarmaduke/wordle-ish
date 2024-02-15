import BoardCell from "./BoardCell";

import { useWordleContext } from "../util/WordleStateProvider";

export default function WordleBoard({ rows }) {   
    const [ state ] = useWordleContext();

    return (
        <div>
            {
                state.rows.map((row, rowIndex) => {
                    return (
                        <div key={`row-${rowIndex}`} style={{ display: 'block'}}>
                            {
                                row.cols.map((col, colIndex) => {         
                                    const className = state.rowIndex === rowIndex && state.rows[state.rowIndex].guessString.length-1 === colIndex ? 'glow' : '';
                                    return (
                                        <div key={`row-${rowIndex}-col-${colIndex}`} 
                                            className={className}
                                            style={{ display: 'inline-block', verticalAlign: 'top'}}>
                                            <BoardCell letter={col} guessState={row.guessMatch?.[colIndex] ?? ''} focused={false} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}