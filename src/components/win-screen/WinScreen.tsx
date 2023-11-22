import ConfettiExplosion from "react-confetti-explosion";
import { useDispatch } from "react-redux";
import { resetGame } from "@stores";

export function WinScreen() {
    const dispatch = useDispatch();

    return (
        <>
            <ConfettiExplosion duration={5000}  />
            <h1>You won!</h1>
            <button className="my-3" onClick={() => dispatch(resetGame())}>Play again</button>
        </>
    );
}
