import { render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { CountryGuesser } from "../country-guesser/CountryGuesser";

jest.mock("react-confetti-explosion", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => null),
    };
});

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
}));

jest.mock("../../data/countries.json", () => {
    return jest.requireActual("./countriesDataMock.ts");
});

describe("CountryGuesser", () => {
    it("renders WinScreen when game is won", () => {
        const mockStore = configureStore();
        const initialState = {
            won: true,
        };

        (useSelector as jest.Mock).mockReturnValue(initialState);
        const store = mockStore({ game: initialState });

        render(
            <Provider store={store}>
                <CountryGuesser />
            </Provider>
        );

        expect(screen.getByText("You won!")).toBeInTheDocument();
    });

    it("renders Game when game is not yet one", () => {
        const mockStore = configureStore();
        const initialState = {
            won: false,
        };

        (useSelector as jest.Mock).mockReturnValue(initialState);
        const store = mockStore({ game: initialState });

        render(
            <Provider store={store}>
                <CountryGuesser />
            </Provider>
        );

        expect(screen.getByText("Guess the country 🌍")).toBeInTheDocument();
    });
});
