import { useDispatch, useSelector } from "react-redux";
import { EuropeMap, Timer } from "../";
import countriesData from "../../data/countries.json";
import { GameState, guessCountry, startGame } from "../../stores";
import { getTimeString } from "../../utils";

export type CountryCode = keyof typeof countriesData;
const countries = countriesData as Record<CountryCode, string>;
const countryCodes = Object.keys(countriesData) as CountryCode[];

export function Game() {
    const game = useSelector((state: GameState) => state);
    const dispatch = useDispatch();

    function getCountryName(code: CountryCode | null) {
        if (code === null) {
            return "Loading...";
        }
        return countries[code];
    }

    function getFlagEmoji(countryCode: CountryCode | null) {
        if (countryCode === null) {
            return "";
        }

        const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt());

        return String.fromCodePoint(...codePoints);
    }

    return (
        <div className="flex-col">
            {game.currentHighscore > 0 && (
                <div className="flex justify-end">
                    <p>Highscore: {getTimeString(game.currentHighscore)}</p>
                </div>
            )}
            <h1>Guess the country</h1>
            {!game.started ? (
                <button className="my-5" onClick={() => dispatch(startGame())}>
                    Start Game
                </button>
            ) : (
                <div className="my-3">
                    <span>
                        Find country:{" "}
                        <strong>{getCountryName(game.currentAnswer)}</strong>{" "}
                        {getFlagEmoji(game.currentAnswer)}
                    </span>
                    <p>
                        Score: {game.score} / {countryCodes.length}
                    </p>
                    <p>Misses: {game.misses}</p>
                    <Timer />
                </div>
            )}
            <EuropeMap
                onClick={(code) => dispatch(guessCountry(code))}
                incorrectLastGuess={game.incorrectLastGuess}
            />
        </div>
    );
}
