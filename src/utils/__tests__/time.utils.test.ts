import { getTimeString } from "..";

describe("Time Utils", () => {
    it("should return the time string (minutes)", () => {
        const time = getTimeString(700);
        expect(time).toBe("1:10");
    });

    it("should return the time string (seconds)", () => {
        const time = getTimeString(150);
        expect(time).toBe("0:15");
    });
});
