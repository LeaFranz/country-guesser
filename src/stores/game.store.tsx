import { configureStore, createSlice } from "@reduxjs/toolkit";
import countriesData from "@data/countries.json";

export type CountryCode = keyof typeof countriesData;

const countryCodes = Object.keys(countriesData) as CountryCode[];

export type GameState = {
    started: boolean;
    possibleCountries: CountryCode[];
    currentAnswer: CountryCode;
    score: number;
    won: boolean;
};

function getRandomCountry(possibleCountries: CountryCode[]) {
    const randomIndex = Math.floor(Math.random() * possibleCountries.length);
    return possibleCountries[randomIndex];
}

const initialState: GameState = {
    started: false,
    possibleCountries: [...countryCodes],
    currentAnswer: getRandomCountry(countryCodes),
    score: 0,
    won: false,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        startGame: (state) => {
            state.started = true;
        },
        guessCountry: (state, action) => {
            if (state.started) {
                if (action.payload === state.currentAnswer) {
                    state.score++;
                    if (state.score === countryCodes.length) {
                        state.won = true;
                    }
                    state.possibleCountries = state.possibleCountries.filter(
                        (c) => c !== action.payload
                    );
                    state.currentAnswer = getRandomCountry(
                        state.possibleCountries
                    );
                }
            }
        },
        resetGame: (state) => {
            state.started = false;
            state.possibleCountries = [...countryCodes];
            state.currentAnswer = getRandomCountry(countryCodes);
            state.score = 0;
            state.won = false;
        },
    },
});

export const { startGame, guessCountry, resetGame } = gameSlice.actions;
export const gameStore = configureStore({
    reducer: gameSlice.reducer,
});

