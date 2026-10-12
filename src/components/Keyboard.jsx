import clsx from "clsx"

export default function Keyboard({currentWord, guessedLetters, isGameOver, addGuessedLetter}) {

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const keyboardLettersElements = alphabet.toUpperCase().split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isRight = isGuessed && currentWord.includes(letter)
        const className = clsx(
            "keyboard__letter",
            {
                "keyboard__letter--correct": isGuessed && isRight,
                "keyboard__letter--incorrect": isGuessed && !isRight,
            },
        )

        return (
            <button
                key={letter}
                type="button"
                className={className}
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-pressed={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuessedLetter(letter)}
            >{letter}</button>
        )
    })

    return (
        < section className="keyboard flex-center flex-row-wrap" >
            {keyboardLettersElements}
        </section >
    )
}