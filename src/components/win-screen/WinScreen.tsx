import ConfettiExplosion from "react-confetti-explosion";
import { useDispatch, useSelector } from "react-redux";
import { GameState, resetGame } from "../../stores";
import { getTimeString } from "../../utils";

export function WinScreen() {
    const gameState = useSelector((state: GameState) => state);
    const dispatch = useDispatch();

    return (
        <>
            <ConfettiExplosion duration={5000} />
            <h1>You won!</h1>
            <p>Your time: {getTimeString(gameState.timer)}</p>
            <p>Misses: {gameState.misses}</p>
            <button className="my-3" onClick={() => dispatch(resetGame())}>
                Play again
            </button>
        </>
    );
}
