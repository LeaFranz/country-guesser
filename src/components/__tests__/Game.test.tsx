import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import { Game } from "../game/Game";
import { GameState } from "../../stores";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock("../../data/countries.json", () => {
    return jest.requireActual("./countriesDataMock.ts");
});

describe("Game", () => {
    const mockStore = configureStore();
    const initialState: GameState = {
        currentHighscore: 100,
        started: false,
        possibleCountries: ["AT", "BE"],
        currentAnswer: "AT",
        score: 0,
        timer: 0,
        won: false,
        misses: 0,
        incorrectLastGuess: null,
    };

    beforeEach(() => {
        (useSelector as jest.Mock).mockReturnValue(initialState);
        (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    });

    afterEach(() => {
        (useSelector as jest.Mock).mockClear();
        (useDispatch as jest.Mock).mockClear();
    });

    it("renders highscore when currentHighscore is greater than 0", () => {
        render(
            <Provider store={mockStore({ game: initialState })}>
                <Game />
            </Provider>
        );
        expect(screen.getByText("Highscore: 0:10")).toBeInTheDocument();
    });

    it("does not render highscore when currentHighscore is 0", async () => {
        const zeroHighscoreState: GameState = {
            currentHighscore: 0,
            started: false,
            possibleCountries: ["AT", "BE"],
            currentAnswer: "AT",
            score: 0,
            timer: 0,
            won: false,
            misses: 0,
            incorrectLastGuess: null,
        };

        (useSelector as jest.Mock).mockReturnValue(zeroHighscoreState);

        render(
            <Provider store={mockStore({ game: zeroHighscoreState })}>
                <Game />
            </Provider>
        );

        expect(screen.queryByText("Highscore: 0:00")).toBeNull();
    });

    it("shows params of running game correctly", async () => {
        const runningGameState: GameState = {
            currentHighscore: 100,
            started: true,
            possibleCountries: ["AT", "BE"],
            currentAnswer: "AT",
            score: 1,
            timer: 200,
            won: false,
            misses: 3,
            incorrectLastGuess: "BE",
        };

        (useSelector as jest.Mock).mockReturnValue(runningGameState);

        render(
            <Provider store={mockStore({ game: runningGameState })}>
                <Game />
            </Provider>
        );

        expect(screen.getByText("Highscore: 0:10")).toBeInTheDocument();
        expect(screen.getByText("Misses: 3")).toBeInTheDocument();
        expect(screen.getByTestId("find-country").textContent).toBe(
            "Find country: Austria 🇦🇹"
        );
        expect(screen.getByTestId("score").textContent).toBe("Score: 1 / 2");
    });

    it("calls function to update state on button click", async () => {
        render(
            <Provider store={mockStore({ game: initialState })}>
                <Game />
            </Provider>
        );

        const button = screen.getByTestId("start-game-button");
        expect(button.textContent).toBe("Start Game");

        await fireEvent.click(button);

        expect(useDispatch).toBeCalledTimes(1);
    });
});
