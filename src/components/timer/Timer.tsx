import { GameState, incrementTimer } from "../../stores";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeString } from "../../utils";

export function Timer() {
    const timer = useSelector((state: GameState) => state.timer);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(incrementTimer());
        }, 100);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run once
    }, []);

    return (
        <p>{getTimeString(timer)}</p>
    );
}
