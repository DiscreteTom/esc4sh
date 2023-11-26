import { isWindows, isCmd, isPowershell } from "../src";

test("is windows", () => {
  expect(isWindows()).toBe(process.platform.startsWith("win"));
});

test("is cmd", () => {
  process.env.ComSpec = "cmd.exe";
  expect(isCmd()).toBe(true);
  process.env.ComSpec = "powershell.exe";
  expect(isCmd()).toBe(false);
  process.env.ComSpec = undefined;
  expect(isCmd()).toBe(false);
});

test("is powershell", () => {
  process.env.ComSpec = "cmd.exe";
  expect(isPowershell()).toBe(false);
  process.env.ComSpec = "powershell.exe";
  expect(isPowershell()).toBe(true);
  process.env.ComSpec = undefined;
  expect(isPowershell()).toBe(false);
});
