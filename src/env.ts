/**
 * Whether the current platform is Windows.
 * This function is not working in the browser.
 */
export function isWindows() {
  return /^win/.test(process.platform);
}

/**
 * Whether the current shell is cmd.exe.
 * This function is not working in the browser.
 */
export function isCmd() {
  return process.env.ComSpec?.endsWith("cmd.exe") ?? false;
}

/**
 * Whether the current shell is powershell.exe.
 * This function is not working in the browser.
 */
export function isPowershell() {
  return process.env.ComSpec?.endsWith("powershell.exe") ?? false;
}
