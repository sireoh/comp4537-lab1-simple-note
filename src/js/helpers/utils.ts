import { Constants } from "../constants.js";

export class Utils {
  /**
   * UUID was found from stack overflow
   * @returns random UUID as a string
   */
  static createUUID(): string {
    return Constants.NoteRow.UUID_BASE.replace(/[xy]/g, function (c) {
      const r =
        (Math.random() * Constants.NoteRow.SIXTEEN) | Constants.NoteRow.ZERO;
      const v =
        c === Constants.NoteRow.X
          ? r
          : (r & Constants.NoteRow.THREE_BITS) | Constants.NoteRow.EIGHT_BITS;
      return v.toString(Constants.NoteRow.SIXTEEN);
    });
  }
}
