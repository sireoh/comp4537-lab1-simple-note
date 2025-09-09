class NoteRow {
  id: string;
  noteRowDiv: HTMLDivElement;

  // Note Row Child Elements
  noteText: NoteText;
  removeButton?: RemoveButton;

  // Magic numbers
  static SIXTEEN: number = 16;
  static ZERO: number = 0;
  static THREE_BITS: number = 0x3;
  static EIGHT_BITS: number = 0x8;

  constructor(text: string, readOnly: boolean) {
    // Make Row main properties
    this.id = this.createUUID();

    // Creates the row div
    this.noteRowDiv = document.createElement("div");
    this.noteRowDiv.className = "noteRow";

    // Creates the NoteText and RemoveButton
    this.noteText = new NoteText(text);
    if (!readOnly) this.removeButton = new RemoveButton(this.id);

    // Appends both children
    this.noteRowDiv.appendChild(this.noteText.textarea);
    if (!readOnly) this.noteRowDiv.appendChild(this.removeButton!.btn);
  }

  /**
   * UUID was found from stack overflow
   * @returns random UUID as a string
   */
  createUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * NoteRow.SIXTEEN) | NoteRow.ZERO; // random number 0–15
        const v = c === "x" ? r : (r & NoteRow.THREE_BITS) | NoteRow.EIGHT_BITS; // force correct bits
        return v.toString(NoteRow.SIXTEEN);
      }
    );
  }
}

class NoteText {
  textarea: HTMLTextAreaElement;

  // Magic Numbers
  static MAX_HEIGHT = 3;

  constructor(text: string) {
    // Create textarea
    this.textarea = document.createElement("textarea");

    // Add properties
    this.textarea.textContent = text;
    this.textarea.className = "noteText";
    this.textarea.rows = NoteText.MAX_HEIGHT;
    this.textarea.disabled = true;
  }
}

class RemoveButton {
  btn: HTMLButtonElement;

  constructor(noteId: string) {
    // Create button
    this.btn = document.createElement("button");

    // Add Properties
    this.btn.textContent = "Remove";
    this.btn.className = "removeButton";
    this.btn.onclick = () => {
      this.remove(noteId);
    };
  }

  remove(id: string) {
    console.log("Removing:", id);
  }
}

export { NoteRow, NoteText, RemoveButton };
