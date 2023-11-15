import { esc4sh, esc4cmd, esc4ps } from "../src";

describe("sh", () => {
  test("readme", () => {
    expect(esc4sh("I'm OK")).toBe(String.raw`'I'\''m OK'`);
  });

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

describe("cmd", () => {
  test("readme", () => {
    expect(esc4cmd("I'm OK")).toBe(String.raw`"I'm OK"`);
  });

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

describe("ps", () => {
  test("readme", () => {
    expect(esc4ps("I'm OK")).toBe(String.raw`'I''m OK'`);
  });

  test("empty", () => {
    expect(esc4ps("")).toBe('""');
  });

  test("simple", () => {
    expect(esc4ps("123")).toBe("'123'");
  });

  test("single quotes", () => {
    expect(esc4ps("I'm")).toBe("'I''m'");
  });

  test("existing quote", () => {
    expect(esc4ps("'123'")).toBe("'123'");
  });
});
