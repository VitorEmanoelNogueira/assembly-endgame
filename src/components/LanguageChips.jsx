import { languages } from "../languages"
import clsx from "clsx"

export default function LanguageChip({ wrongGuessCount }) {
    const languageElements = languages.map((language, index) => {
        const style = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }

        const isLanguageLost = index < wrongGuessCount
        const className = clsx("language-chip", isLanguageLost && "language-chip--lost")

        return (
            <span
                key={language.name}
                className={className}
                style={style}>
                {language.name}
            </span>
        )
    })

    return (
        <section className="language-chip-container flex-row-wrap" aria-label="Reamining Programming Languages">
            {languageElements}
        </section>
    )
}