import { languages } from "../languages"
import { getFarewellText } from "../util"
import clsx from "clsx"

export default function GameStatus({currentWord, guessedLetters, isGameOver,isGameWon, isGameLost, wrongGuessCount, numGuessesLeft}) {

    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    

    const gameStatusClass = clsx(
        "game-status flex-center flex-column-nowrap",
        isGameWon && "game-status--won",
        isGameLost && "game-status--lost",
        (!isGameOver && isLastGuessIncorrect) && "game-status--wrong-guess"
    )

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (<p className="game-status__text">{getFarewellText(languages[wrongGuessCount - 1].name)}</p>)
        }

        if (isGameWon) {
            return (
                <>
                    <h2 className="game-status__title">You win!</h2>
                    <p className="game-status__text">Well done! 🎉</p>
                </>
            )
        }

        if (isGameLost) {
            return (
                <>
                    <h2 className="game-status__title">Game over!</h2>
                    <p className="game-status__text">You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }

    return (
        <section className={gameStatusClass} aria-live="polite">
            {renderGameStatus()}

            <div className="sr-only">
                {(!isGameOver && guessedLetters.length > 0) &&
                    <p>
                        {currentWord.includes(lastGuessedLetter) ?
                            `Correct! The letter ${lastGuessedLetter} is in the word.` :
                            `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                        }
                        You have {numGuessesLeft} attempts left.

                        Current word: {currentWord.split("").map(letter =>
                            guessedLetters.includes(letter) ? letter + "," : "blank,").join(" ")}
                    </p>
                }

                {isGameOver && <p>Complete Word:{currentWord} </p>}
            </div>
        </section>
    )
}