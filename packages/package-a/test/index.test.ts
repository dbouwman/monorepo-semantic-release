import { greet } from "../src/index";

describe("Greeter", () => {
  it("should greet by name", () => {
    expect(greet("dave")).toBe(
      "Hello dave, this is package-a",
      "should greet by name"
    );
  });
});
