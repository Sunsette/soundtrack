import { describe, it, expect } from "vitest";
import { displayImageUrl } from "./displayImageUrl.util";

describe("displayImageUrl", () => {
  it("should return the placeholder URL with width and height replaced", () => {
    const display = { image: { placeholder: "http://example.com/%w/%h" } };
    const result = displayImageUrl(display, 100, 200);
    expect(result).toBe("http://example.com/100/200");
  });

  it("should return the placeholder URL with width replaced and height equal to width", () => {
    const display = { image: { placeholder: "http://example.com/%w/%h" } };
    const result = displayImageUrl(display, 100);
    expect(result).toBe("http://example.com/100/100");
  });

  it("should return undefined if display is null", () => {
    const result = displayImageUrl(null, 100, 200);
    expect(result).toBeUndefined();
  });

  it("should return undefined if display.image is null", () => {
    const display = { image: null };
    const result = displayImageUrl(display, 100, 200);
    expect(result).toBeUndefined();
  });

  it("should return undefined if display.image.placeholder is null", () => {
    const display = { image: { placeholder: null } };
    const result = displayImageUrl(display, 100, 200);
    expect(result).toBeUndefined();
  });

  it("should return undefined if display.image.placeholder is undefined", () => {
    const display = { image: { placeholder: undefined } };
    const result = displayImageUrl(display, 100, 200);
    expect(result).toBeUndefined();
  });

  it("should return undefined if display is undefined", () => {
    const result = displayImageUrl(undefined, 100, 200);
    expect(result).toBeUndefined();
  });
});
