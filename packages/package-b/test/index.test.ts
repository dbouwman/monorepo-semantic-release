import { greetProcessors, helloify } from "../src/index";

describe("Greeter", () => {
  it("should greet by name", () => {
    expect(greetProcessors("dave")).toBe(
      "Hello dave, this is package-b",
      "should greet by name"
    );
  });
  it('should call pkg-a fn', () => { 
    expect(helloify('jupe')).toBe("Hello jupe, this is Tom, and I welcome our robot overlords")
  });
});
