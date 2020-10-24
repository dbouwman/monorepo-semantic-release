import { idText, isExportDeclaration, isJSDocDeprecatedTag } from "typescript";

import { greet } from "../src/index";

describe("Greeter", () => {
  it("should greet by name", () => {
    expect(greet("dave")).toBe(
      "Hello dave, this is common",
      "should greet by name"
    );
  });
});
