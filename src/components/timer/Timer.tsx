import { useEffect, useState } from "react";

export function Timer() {
    const [time, setTime] = useState(0);
    const minutes = Math.floor(time / 600);
    const seconds = Math.floor((time % 600) / 10);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((time) => time + 1);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <p>
            {minutes}:{seconds.toString().padStart(2, "0")}
        </p>
    );
}
