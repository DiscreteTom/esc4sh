import { isCmd, isPowershell, isWindows } from "./env";
import { esc } from "./esc";

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
    return esc(s, {
      isWindows: this.isWindows,
      isPowershell: this.isPowershell,
      isCmd: this.isCmd,
    });
  }
}
