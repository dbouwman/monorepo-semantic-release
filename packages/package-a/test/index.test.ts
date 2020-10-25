import { greet, greetFromDave } from "../src/index";

describe("Greeter", () => {
  it("should greet by name", () => {
    expect(greet("dave")).toBe(
      "Hello dave, this is package-a",
      "should greet by name"
    );
  });
  it("should greet by name from dave", () => {
    expect(greetFromDave("rob")).toBe(
      "Hello rob, this is Dave",
      "should greet by name from Dave"
    );
  });
});
