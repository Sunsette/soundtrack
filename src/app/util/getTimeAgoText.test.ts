import { describe, it, expect } from "vitest";
import { getTimeAgoText } from "./getTimeAgoText.util";

describe("getTimeAgoText", () => {
  it('should return "just now" for the current date', () => {
    const now = new Date();
    expect(getTimeAgoText(now)).toBe("just now");
  });

  it('should return "X seconds ago" for a date a few seconds ago', () => {
    const pastDate = new Date(new Date().getTime() - 5000); // 5 seconds ago
    expect(getTimeAgoText(pastDate)).toBe("5 seconds ago");
  });

  it('should return "X minutes, Y seconds ago" for a date a few minutes and seconds ago', () => {
    const pastDate = new Date(new Date().getTime() - 65000); // 1 minute and 5 seconds ago
    expect(getTimeAgoText(pastDate)).toBe("1 minutes, 5 seconds ago");
  });

  it('should return "X hours, Y minutes, Z seconds ago" for a date a few hours, minutes, and seconds ago', () => {
    const pastDate = new Date(new Date().getTime() - 3665000); // 1 hour, 1 minute, and 5 seconds ago
    expect(getTimeAgoText(pastDate)).toBe("1 hours, 1 minutes, 5 seconds ago");
  });

  it('should return "X hours ago" for a date a few hours ago', () => {
    const pastDate = new Date(new Date().getTime() - 7200000); // 2 hours ago
    expect(getTimeAgoText(pastDate)).toBe("2 hours ago");
  });
});
