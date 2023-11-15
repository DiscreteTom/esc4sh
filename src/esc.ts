import { isWindows } from "./const";

export function esc4linux(s: string): string {
  // in linux, anything in single quotes is literal
  // except single quote itself.
  // if there is a single quote in the content, we need to escape it using `'\''`
  // e.g. `I'm` -> `'I'\''m'`
  return `'${s.replace(/'/g, "'\\''")}'`;
}

export function esc4win(s: string): string {
  // in windows cmd, anything in double quotes is literal
  // except double quote itself.
  // if there is a double quote in the content, we need to escape it using `\"`
  // e.g. `"I'm"` -> `"\"I'm\""`
  return `"${s.replace(/"/g, '\\"')}"`;
}

export function esc4sh(s: string): string {
  return isWindows ? esc4win(s) : esc4linux(s);
}
