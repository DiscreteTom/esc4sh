import { isWindows } from "./const";

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

export function esc4cmd(s: string): string {
  // for empty string, quoted empty string is the only way to represent it.
  if (s.length === 0) return '""';

  // in windows cmd, anything in double quotes is literal
  // except double quote itself.
  // if there is a double quote in the content, we need to escape it using `\"`
  // e.g. `"I'm"` -> `"\"I'm\""`
  return `"${s.replace(/"/g, '\\"')}"`;
}

export function esc(s: string): string {
  return isWindows ? esc4cmd(s) : esc4sh(s);
}
