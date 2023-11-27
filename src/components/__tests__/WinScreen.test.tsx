import { render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { WinScreen } from "../win-screen/WinScreen";
import { getTimeString } from "../../utils";

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

describe("WinScreen", () => {
    const mockStore = configureStore();
    const initialState = {
        timer: 100,
        misses: 2,
    };

    it("renders win screen with correct game state", () => {
        (useSelector as jest.Mock).mockReturnValue(initialState);
        const store = mockStore({ game: initialState });

        render(
            <Provider store={store}>
                <WinScreen />
            </Provider>
        );

        expect(screen.getByText("You won!")).toBeInTheDocument();
        expect(
            screen.getByText(`Your time: ${getTimeString(initialState.timer)}`)
        ).toBeInTheDocument();
        expect(
            screen.getByText(`Misses: ${initialState.misses}`)
        ).toBeInTheDocument();
    });
});
