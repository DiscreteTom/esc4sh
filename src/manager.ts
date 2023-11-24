import { isCmd, isPowershell, isWindows } from "./env";
import { esc4cmd, esc4ps, esc4sh } from "./esc";

/**
 * Auto detect the current shell and platform when instantiated.
 * This is not working in the browser.
 */
export class Manager {
  readonly isWindows: boolean;
  readonly isPowershell: boolean;
  readonly isCmd: boolean;

  constructor() {
    this.isWindows = isWindows();
    this.isPowershell = this.isWindows ? isPowershell() : false;
    this.isCmd = this.isWindows ? isCmd() : false;
  }

  /**
   * Escape a string for the current shell.
   */
  escape(s: string): string {
    if (this.isWindows) {
      if (this.isPowershell) return esc4ps(s);
      if (this.isCmd) return esc4cmd(s);
      return esc4sh(s); // treat unknown shell as bash
    } else {
      // treat non-windows as bash
      return esc4sh(s);
    }
  }
}
