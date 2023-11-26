import { esc4sh, esc4cmd, esc4ps, esc } from "../src";

describe("sh", () => {
  test("readme", () => {
    expect(esc4sh("I'm OK")).toBe(String.raw`'I'\''m OK'`);
    expect(esc4sh("$PATH")).toBe(String.raw`'$PATH'`);
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
    expect(esc4cmd("%PATH%")).toBe(String.raw`"%PATH%"`);
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
    expect(esc4ps("$env:PATH")).toBe(String.raw`'$env:PATH'`);
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

describe("esc", () => {
  test("readme", () => {
    expect(esc("")).toBe(esc4sh(""));
    expect(esc("", { windows: true })).toBe(esc4cmd(""));
    expect(esc("", { windows: true, powershell: true })).toBe(esc4ps(""));
  });

  test("defaults to sh", () => {
    expect(esc("'")).toBe(esc4sh("'"));
  });

  test("sh", () => {
    expect(esc("'", { windows: false })).toBe(esc4sh("'"));
    expect(esc("'", { windows: false, powershell: true })).toBe(esc4sh("'"));
    expect(esc("'", { windows: false, powershell: false })).toBe(esc4sh("'"));
    expect(esc("'", { windows: false, powershell: true, cmd: true })).toBe(
      esc4sh("'"),
    );
    expect(esc("'", { windows: false, powershell: true, cmd: false })).toBe(
      esc4sh("'"),
    );
    expect(esc("'", { windows: false, powershell: false, cmd: true })).toBe(
      esc4sh("'"),
    );
    expect(esc("'", { windows: false, powershell: false, cmd: false })).toBe(
      esc4sh("'"),
    );
  });

  describe("windows", () => {
    test("defaults to cmd", () => {
      expect(esc("'", { windows: true })).toBe(esc4cmd("'"));
      expect(esc("'", { windows: true, powershell: false })).toBe(esc4cmd("'"));
    });

    test("explicit powershell", () => {
      expect(esc("'", { windows: true, powershell: true })).toBe(esc4ps("'"));
      expect(esc("'", { windows: true, powershell: true, cmd: true })).toBe(
        esc4ps("'"),
      );
      expect(esc("'", { windows: true, powershell: true, cmd: false })).toBe(
        esc4ps("'"),
      );
    });

    test("explicit cmd", () => {
      expect(esc("'", { windows: true, powershell: false, cmd: true })).toBe(
        esc4cmd("'"),
      );
    });

    test("unknown shell", () => {
      expect(esc("'", { windows: true, powershell: false, cmd: false })).toBe(
        esc4sh("'"),
      );
    });
  });
});
