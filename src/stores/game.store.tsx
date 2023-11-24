import { configureStore, createSlice } from "@reduxjs/toolkit";
import countriesData from "../data/countries.json";

export type CountryCode = keyof typeof countriesData;

const countryCodes = Object.keys(countriesData) as CountryCode[];

export type GameState = {
    started: boolean;
    possibleCountries: CountryCode[];
    currentAnswer: CountryCode;
    score: number;
    timer: number;
    won: boolean;
    misses: number;
    incorrectLastGuess: CountryCode | null;
    currentHighscore: number;
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
    timer: 0,
    won: false,
    misses: 0,
    incorrectLastGuess: null,
    currentHighscore: 0,
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

                        if (
                            state.timer < state.currentHighscore ||
                            state.currentHighscore === 0
                        ) {
                            state.currentHighscore = state.timer;
                        }
                    }
                    state.possibleCountries = state.possibleCountries.filter(
                        (c) => c !== action.payload
                    );
                    state.currentAnswer = getRandomCountry(
                        state.possibleCountries
                    );
                } else {
                    state.incorrectLastGuess = action.payload;
                    state.misses++;
                }
            }
        },
        resetGame: (state) => {
            state.started = false;
            state.possibleCountries = [...countryCodes];
            state.currentAnswer = getRandomCountry(countryCodes);
            state.score = 0;
            state.won = false;
            state.misses = 0;
            state.timer = 0;
        },
        incrementTimer: (state) => {
            state.timer = state.timer + 1;
        },
    },
});

export const { startGame, guessCountry, resetGame, incrementTimer } =
    gameSlice.actions;
export const gameStore = configureStore({
    reducer: gameSlice.reducer,
});
