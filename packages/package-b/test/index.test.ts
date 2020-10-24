import { greetProcessors } from "../src/index";

describe("Greeter", () => {
  it("should greet by name", () => {
    expect(greetProcessors("dave")).toBe(
      "Hello dave, this is package-b",
      "should greet by name"
    );
  });
});
