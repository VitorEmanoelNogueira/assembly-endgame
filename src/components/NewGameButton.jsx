export default function NewGameButton({newGameButtonRef, startNewGame}) {
    return (
        <button type="button" className="new-game-button" ref={newGameButtonRef} onClick={startNewGame} aria-label="Start a New Game">New game</button>
    )
}