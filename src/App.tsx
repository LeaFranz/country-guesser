import "./App.css";
import { Provider } from "react-redux";
import { gameStore } from "./stores";
import { CountryGuesser } from "./components";

function App() {
    return (
        <Provider store={gameStore}>
            <CountryGuesser />
        </Provider>
    );
}

export default App;
