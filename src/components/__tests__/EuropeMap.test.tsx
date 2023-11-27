import { render, fireEvent } from "@testing-library/react";
import { EuropeMap } from "../europe-map/EuropeMap";

describe("EuropeMap", () => {
    const mockOnClick = jest.fn();

    it("calls the onClick prop when a country is clicked", () => {
        const { getByTestId } = render(
            <EuropeMap onClick={mockOnClick} incorrectLastGuess={null} />
        );
        const countryElement = getByTestId("AT");
        fireEvent.click(countryElement);
        expect(mockOnClick).toHaveBeenCalledWith("AT");
    });

    it('adds the "wrong-guess" class to the incorrect last guess', () => {
        const { getByTestId } = render(
            <EuropeMap onClick={mockOnClick} incorrectLastGuess="BE" />
        );
        const countryElement = getByTestId("BE");
        const countryElementCorrect = getByTestId("AT");
        expect(countryElement.classList.contains("wrong-guess")).toBe(true);
        expect(countryElementCorrect.classList.contains("wrong-guess")).toBe(
            false
        );
    });
});
