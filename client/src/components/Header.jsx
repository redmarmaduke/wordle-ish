export default function WordleHeader() {
    return (
        <>
        <header style={{
            textAlign: 'center',
            fontSize: '1em',
            padding: '12px',
        }}
        className="wordle-header">
            Wordle
        </header>
        <hr style={{
            backgroundColor: 'var(--dark-gray)',
            border: 'none',
            height: '1px',
            margin: '0px',
        }}/>
        </>
    );
}