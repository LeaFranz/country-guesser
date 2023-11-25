import { test, expect } from "@playwright/test";

test("show start screen correctly", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const button = page.getByTestId("start-game-button");
    const map = page.getByTestId("europe-map");
    const title = page.getByText("Guess the country 🌍");
    expect(button).toBeVisible();
    expect(map).toBeVisible();
    expect(title).toBeVisible();
});

test("start game correctly", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const button = page.getByTestId("start-game-button");
    expect(button).toBeVisible();

    await button.click();

    // game mode showing
    const score = page.getByTestId("score");
    const misses = page.getByText("Misses: 0");
    const findCountry = page.getByTestId("find-country");

    expect(score).toContainText("Score: 0 / 44");
    expect(misses).toBeVisible();
    expect(findCountry).toContainText("Find country: "); // random country name
});

test("play game correctly", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const button = page.getByTestId("start-game-button");
    expect(button).toBeVisible();

    await button.click();

    // get correct country name
    const countryName = await page.textContent("#country-name");
    const map = page.getByTestId("europe-map");
    const countryPath = map.locator(`[name=${countryName}]`);

    await countryPath.click();

    const score = page.getByTestId("score");
    expect(score).toContainText("Score: 1 / 44");
});

test("play game incorrectly", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const button = page.getByTestId("start-game-button");
    expect(button).toBeVisible();

    await button.click();

    // get incorrect country name
    const correctCountryName = await page.textContent("#country-name");
    const incorrectCountryName =
        correctCountryName === "Austria" ? "Belgium" : "Austria";

    const map = page.getByTestId("europe-map");
    const countryPath = map.locator(`[name=${incorrectCountryName}]`);

    await countryPath.click();

    const score = page.getByTestId("score");
    expect(score).toContainText("Score: 0 / 44");
    const misses = page.getByText("Misses: 1");
    expect(misses).toBeVisible();
    const incorrectColoredCountry = map.locator(`[class="wrong-guess"]`); // red-color class
    expect(incorrectColoredCountry).toBeVisible();
});
