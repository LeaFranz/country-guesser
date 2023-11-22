import ConfettiExplosion from "react-confetti-explosion";
import { useDispatch, useSelector } from "react-redux";
import { GameState, resetGame } from "../../stores";
import { getTimeString } from "../../utils";

export function WinScreen() {
    const timer = useSelector((state: GameState) => state.timer);
    const dispatch = useDispatch();

    return (
        <>
            <ConfettiExplosion duration={5000}  />
            <h1>You won!</h1>
            <p>Your time: {getTimeString(timer)}</p>
            <button className="my-3" onClick={() => dispatch(resetGame())}>Play again</button>
        </>
    );
}
