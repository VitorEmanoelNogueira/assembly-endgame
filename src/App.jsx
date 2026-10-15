import { useState, useRef, useEffect } from "react"
import Confetti from 'react-confetti'

import { languages } from "./languages"
import { getRandomWord } from "./util";

import Header from "./components/Header";
import GameStatus from "./components/GameStatus";
import LanguageChips from "./components/LanguageChips";
import GuessWord from "./components/GuessWord";
import Keyboard from "./components/Keyboard";
import NewGameButton from "./components/NewGameButton";

function AssemblyEndgame() {
  // State Values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  // Derived Values
  const wrongGuessCount = guessedLetters.filter(guessedLetter => !currentWord.includes(guessedLetter)).length;
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = (isGameWon || isGameLost)
  const numGuessesLeft = (languages.length - 1) - wrongGuessCount

  // Refs
  const currentWordLettersRef = useRef(null)
  const newGameButtonRef = useRef(null)

  // Effects
  useEffect(() => {
    if (isGameOver) {
      newGameButtonRef.current.focus()
    }
  }, [isGameOver])

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]
    )
  }

  function startNewGame() {
    setCurrentWord(getRandomWord)
    setGuessedLetters([])
    currentWordLettersRef.current.focus()
  }

  return (
    <>
      {isGameWon && <Confetti
        className="confetti"
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={1000}
      />}
      <main className="assembly flex-center flex-column-nowrap">
        <div className="assembly__intro ">
          <Header />

          <GameStatus
            currentWord={currentWord}
            guessedLetters={guessedLetters}
            isGameOver={isGameOver}
            isGameWon={isGameWon}
            isGameLost={isGameLost}
            wrongGuessCount={wrongGuessCount}
            numGuessesLeft={numGuessesLeft}
          />
        </div>

        <LanguageChips wrongGuessCount={wrongGuessCount} />

        <GuessWord
          currentWord={currentWord}
          isGameLost={isGameLost}
          guessedLetters={guessedLetters}
          currentWordLettersRef={currentWordLettersRef}
          numGuessesLeft={numGuessesLeft}
        />

        <Keyboard
          currentWord={currentWord}
          guessedLetters={guessedLetters}
          isGameOver={isGameOver}
          addGuessedLetter={addGuessedLetter}
        />

        {isGameOver &&
          <NewGameButton
            newGameButtonRef={newGameButtonRef}
            startNewGame={startNewGame}
          />}
      </main>
    </>
  )
}

export default AssemblyEndgame
