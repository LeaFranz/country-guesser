import { useDispatch, useSelector } from "react-redux";
import { EuropeMap, Timer } from "../";
import countriesData from "../../data/countries.json";
import { GameState, guessCountry, startGame } from "../../stores";

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

    return (
        <div className="flex-col">
            <h1>Guess the country</h1>
            {!game.started ? (
                <button className="my-3" onClick={() => dispatch(startGame())}>
                    Start Game
                </button>
            ) : (
                <div className="my-3">
                    <span>
                        Find country:{" "}
                        <strong>{getCountryName(game.currentAnswer)}</strong>
                    </span>
                    <p>
                        Score: {game.score} / {countryCodes.length}
                    </p>
                    <Timer />
                </div>
            )}
            <EuropeMap onClick={(code) => dispatch(guessCountry(code))} />
        </div>
    );
}
