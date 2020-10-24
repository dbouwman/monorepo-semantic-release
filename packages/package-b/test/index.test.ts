import { idText, isExportDeclaration, isJSDocDeprecatedTag } from "typescript";

import { greetProcessors } from "../src/index";

describe("Greeter", () => {
  it("should greet by name", () => {
    expect(greetProcessors("dave")).toBe(
      "Hello dave, this is processor",
      "should greet by name"
    );
  });
});
