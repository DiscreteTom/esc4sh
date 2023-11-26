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
      windows: this.isWindows,
      powershell: this.isPowershell,
      cmd: this.isCmd,
    });
  }
}
