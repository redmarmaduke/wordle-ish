import React from 'react';
import { 
    useWordleContext,
    CHECK_WORD,
    BUTTON_VISIBILTY_FULL,
    BUTTON_VISIBILTY_NONE,
    BUTTON_VISIBILTY_GRAY
} from "../util/WordleStateProvider"

export default function GuessWordButton() {
    const [state, dispatch] = useWordleContext();

    let style = {};
    let onClick = () => null;
    switch(state.buttonVisibility) {
        case BUTTON_VISIBILTY_FULL:
            style = {
                backgroundColor: 'var(--light-gray)',
                color: 'var(--white)',
            };
            onClick = () => dispatch({ type: CHECK_WORD })
            break;
        case BUTTON_VISIBILTY_GRAY:            
            style = {
                backgroundColor: 'var(--dark-gray)',
                color: 'var(--light-gray)',
            };        
            onClick = () => null;
            break;
        case BUTTON_VISIBILTY_NONE:
        default:
            style = {
                visibility: 'hidden',
            };        
            onClick = () => null;
            break;
        
    }
    return (
        <button
            className="guess-word-button libre-franklin-bold"
            style={style} 
            onClick={onClick}>
            GUESS WORD
        </button>
    );
}