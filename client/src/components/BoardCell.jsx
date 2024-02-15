export default function WordleBoardCell({ letter, guessState, focused }) {
    let style = {
        width: '32px',
        height: '32px',
        margin: '2px',
        lineHeight: '32px',
    };

    switch (guessState) {
        case 'N':
            style.backgroundColor = "var(--mustard)";
            break;
        case 'Y':
            style.backgroundColor = "var(--green)";
            break;
        case '?':
            style.backgroundColor = "var(--black)";
            style.border = "1px solid var(--red)";
            style.background = "linear-gradient(to bottom right, var(--black) calc(50% - 2px), var(--red) , var(--black) calc(50% + 2px))"
            style.width = '30px';
            style.height = '30px';
            break;
        default:
            if (focused) {
                style.border = "1px solid var(--light-gray)"
                style.width = '30px';
                style.height = '30px';
            }
            else {
                style.border = "1px solid var(--dark-gray)"
                style.width = '30px';
                style.height = '30px';
            }
            break;
    }
    return (        
        <div className="cell libre-franklin-bold" style={style}>
            {letter}
        </div>
    )
}