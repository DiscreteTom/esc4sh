import { Manager } from "../src";

test("manager", () => {
  const manager = new Manager();

  expect(manager.escape("I'm OK")).toBe(
    manager.isWindows
      ? manager.isCmd
        ? String.raw`"I'm OK"`
        : manager.isPowershell
          ? String.raw`'I''m OK'`
          : String.raw`'I'\''m OK'`
      : String.raw`'I'\''m OK'`,
  );
});
