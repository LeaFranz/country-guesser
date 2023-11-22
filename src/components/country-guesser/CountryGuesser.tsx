import { useSelector } from "react-redux";
import { GameState } from "../../stores";
import { WinScreen } from "../";
import { Game } from "../game";

export function CountryGuesser() {
    const game = useSelector((state: GameState) => state);

    if (game.won) {
        return <WinScreen />;
    } else {
        return <Game />;
    }
}