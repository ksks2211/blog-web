
import { expect, test } from 'vitest';
import { toTitleCase } from "./stringUtils";



test("toTitleCase", () => {
  expect(toTitleCase("hello_world")).toBe("Hello World")
})



