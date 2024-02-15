import React from 'react';

const WordleContext = React.createContext([]);

export function useWordleContext() {
    return React.useContext(WordleContext);
}

export const CHECK_WORD = 'CHECK_WORD';
export const SET_GUESS = 'SET_GUESS';
export const BUTTON_VISIBILTY_NONE = 'BUTTON_VISIBILITY_NONE';
export const BUTTON_VISIBILTY_FULL = 'BUTTON_VISIBILITY_FULL';
export const BUTTON_VISIBILTY_GRAY = 'BUTTON_VISIBILITY_GRAY';

function useReducer(reducer, initState) {
    const [state, setState] = React.useState(initState);

    const dispatch = React.useCallback((action) => {
        Promise.resolve(reducer(state, action)).then((nextState) => {
            setState(nextState);
        });
    }, [state, setState, reducer]);

    return [state, dispatch];
}

async function reducer(state, action) {
    switch (action.type) {
        // fetch and update map so we can mark the state of each square with 1,0,x state
        case CHECK_WORD: {
            // if we are not at the end of the line (ie at column 4, 5th character) then just return
            if (state.rows[state.rowIndex].cols.includes(null) || state.gameOver) {
                return state;
            }

            const newState = { ...state };

            newState.rows = [...state.rows];
            let url = '/api/wordle?' + new URLSearchParams({
                guess: state.rows[state.rowIndex].guessString
            });
            //url = `/api/wordle?guess=${state.rows[state.rowIndex].guessString}`;
            console.log(url);
            newState.rows[state.rowIndex].guessMatch = await fetch(url).then((response) => response.json()).then((data) => {
                const guessMatch = data;
                // if guessed correctly or we are out of rows to play in then game over
                if (guessMatch === Array.from({ length: guessMatch.length }, () => 'Y').join('') || state.rowIndex === state.rows.length - 1) {
                    newState.gameOver = true;
                }
                else {
                    ++newState.rowIndex;
                }
                return guessMatch;
            });
            newState.buttonVisibility = BUTTON_VISIBILTY_NONE;
            return newState;
        }
        case SET_GUESS:
            {
                // validate input
                if (typeof action.payload !== 'string' || state.gameOver) {
                    return state;
                }

                const guessString = action.payload;
                const buttonVisibility = guessString.length === 5 ? BUTTON_VISIBILTY_FULL : BUTTON_VISIBILTY_GRAY;
                const cols = Array.from(guessString).concat(Array.from({ length: 5 - guessString.length }, () => null));
                return {
                    ...state,
                    rows: state.rows.map((row, index) => {
                        if (index === state.rowIndex) {
                            return {
                                ...row,
                                // convert string to array and concat an array of null values for placeholders
                                guessString,
                                cols,
                            }
                        }
                        else {
                            return row;
                        }
                    }),
                    buttonVisibility,
                }
            }
        default:
            return state;
    }
}

export function WordleStateProvider(props) {
    const [state, dispatch] = useReducer(reducer, {
        rowIndex: 0,
        /*
        box: {
            characterValue: [a-z]
            guessElement: ['0','1','x', undefined] // where undefined indicates no formatting
        }
        row: {
            guess: [a-z]{5} : Array
            guessString: ['0','1','x']{5} : string | undefined
        }
        rows: box[][] or row[]
        */
        rows: Array.from({ length: 6 }, () => ({ cols: Array.from({ length: 5 }, () => null), guessString: '', guessMatch: undefined })),
        gameOver: false,
        buttonVisibility: BUTTON_VISIBILTY_NONE,
    });

    return (
        <WordleContext.Provider {...props} value={[state, dispatch]} />
    );
}