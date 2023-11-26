/**
 * Escape a string for shell/bash on linux.
 */
export function esc4sh(s: string): string {
  // for empty string, quoted empty string is the only way to represent it.
  if (s.length === 0) return "''";

  // in linux, anything in single quotes is literal
  // except single quote itself.
  // if there is a single quote in the content, we need to escape it using `'\''`
  // e.g. `I'm` -> `'I'\''m'`
  return `'${s.replace(/'/g, "'\\''")}'`
    .replace(/^(?:'')+/g, "") // deduplicate single-quote at the beginning
    .replace(/\\'''/g, "\\'"); // remove non-escaped single-quote if there are enclosed between 2 escaped
}

/**
 * Escape a string for cmd.exe on windows.
 */
export function esc4cmd(s: string): string {
  // for empty string, quoted empty string is the only way to represent it.
  if (s.length === 0) return '""';

  // in windows cmd, anything in double quotes is literal
  // except double quote itself.
  // if there is a double quote in the content, we need to escape it using `\"`
  // e.g. `"I'm"` -> `"\"I'm\""`
  return `"${s.replace(/"/g, '\\"')}"`;
}

/**
 * Escape a string for powershell.exe on windows.
 */
export function esc4ps(s: string): string {
  // for empty string, quoted empty string is the only way to represent it.
  if (s.length === 0) return '""';

  // in windows powershell, anything in single quotes is literal
  // except single quote itself.
  // if there is a single quote in the content, we need to escape it using `''`
  // e.g. `I'm` -> `'I''m'`
  // e.g. `'I'm'` -> `'''I''m'''`
  return `'${s.replace(/'/g, "''")}'`
    .replace(/^'(?:'')+/g, "'") // deduplicate single-quote at the beginning
    .replace(/(?:'')+'$/g, "'"); // deduplicate single-quote at the end
}

/**
 * Escape a string by the options.
 * @example
 * esc(""); // for linux sh/bash
 * esc("", { windows: true }); // for windows cmd
 * esc("", { windows: true, powershell: true }); // for windows powershell
 */
export function esc(
  s: string,
  options?: {
    /**
     * @default false
     */
    windows?: boolean;
    /**
     * Only effective when `windows` is `true`.
     * @default false
     */
    powershell?: boolean;
    /**
     * Only effective when `windows` is `true` and `powershell` is `false`.
     * @default true
     */
    cmd?: boolean;
  },
) {
  if (options?.windows ?? false) {
    if (options?.powershell ?? false) return esc4ps(s);
    if (options?.cmd ?? true) return esc4cmd(s);
    return esc4sh(s); // treat unknown shell as bash
  } else {
    // treat non-windows as bash
    return esc4sh(s);
  }
}
