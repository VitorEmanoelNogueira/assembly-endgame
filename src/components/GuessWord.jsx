import clsx from "clsx"

export default function GuessWord({currentWord, isGameLost, guessedLetters, currentWordLettersRef, numGuessesLeft}) {

    const currentWordElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const className = clsx("guess-word__letter",
            !guessedLetters.includes(letter) && "guess-word__letter--unguessed"
        )

        return (
            <span key={index} className={className}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )

    })

    return (
        <section className="guess-word flex-center">
            <p className="guess-word__description" ref={currentWordLettersRef} tabIndex="-1">Current Word · {currentWord.length} letters</p>
            <div className="flex-center flex-row-wrap">
                {currentWordElements}
            </div>
            <p className="assembly__word-description"> Remaining Attempts: {numGuessesLeft}</p>
        </section>
    )
}