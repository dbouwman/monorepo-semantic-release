import { greetProcessors, helloify } from "../src/index";

describe("Greeter", () => {
  it("should greet by name", () => {
    expect(greetProcessors("dave")).toBe(
      "Hello dave, this is package-b",
      "should greet by name"
    );
  });
  it('should call pkg-a fn', () => {
    // we should really be stubbing greetFromTom() for this test, but
    // the following should be resilient to at least some changes to that fn
    expect(helloify('jupe').indexOf("Hello jupe, this is Tom")).toBe(0)
  });
});
