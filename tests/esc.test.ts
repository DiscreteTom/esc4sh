import { esc4sh, esc4cmd, esc, isWindows } from "../src";

describe("linux", () => {
  test("empty", () => {
    expect(esc4sh("")).toBe("''");
  });

  test("simple", () => {
    expect(esc4sh("123")).toBe("'123'");
  });

  test("single quotes", () => {
    expect(esc4sh("I'm")).toBe("'I'\\''m'");
  });

  test("existing quote", () => {
    expect(esc4sh("'123'")).toBe("\\''123'\\'");
  });
});

describe("windows", () => {
  test("empty", () => {
    expect(esc4cmd("")).toBe('""');
  });

  test("simple", () => {
    expect(esc4cmd("123")).toBe('"123"');
  });

  test("existing quote", () => {
    expect(esc4cmd('"123"')).toBe('"\\"123\\""');
  });
});

test("sh", () => {
  expect(esc("'123'")).toBe(isWindows ? "\"'123'\"" : "\\''123'\\'");
});
