import { esc4linux, esc4win, esc4sh, isWindows } from "../src";

describe("linux", () => {
  test("simple", () => {
    expect(esc4linux("123")).toBe("'123'");
  });

  test("single quotes", () => {
    expect(esc4linux("I'm")).toBe("'I'\\''m'");
  });

  test("existing quote", () => {
    expect(esc4linux("'123'")).toBe("''\\''123'\\'''");
  });
});

describe("windows", () => {
  test("simple", () => {
    expect(esc4win("123")).toBe('"123"');
  });

  test("existing quote", () => {
    expect(esc4win('"123"')).toBe('"\\"123\\""');
  });
});

test("sh", () => {
  expect(esc4sh("'123'")).toBe(isWindows ? "\"'123'\"" : "''\\''123'\\'''");
});
