class NoteRow {
  id: string;
  noteRowDiv: HTMLDivElement;

  // Note Row Child Elements
  noteText: NoteText;
  removeButton: RemoveButton;

  // Magic numbers
  static SIXTEEN: number = 16;
  static ZERO: number = 0;
  static THREE_BITS: number = 0x3;
  static EIGHT_BITS: number = 0x8;

  constructor(text: string) {
    // Make Row main properties
    this.id = this.createUUID();

    // Creates the row div
    this.noteRowDiv = document.createElement("div");

    // Creates the NoteText and RemoveButton
    this.noteText = new NoteText(this.id, text);
    this.removeButton = new RemoveButton(this.id);

    // Appends both children
    this.noteRowDiv.appendChild(this.noteText.div);
    this.noteRowDiv.appendChild(this.removeButton.btn);
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
  div: HTMLDivElement;

  constructor(id: string, text: string) {
    // Create div
    this.div = document.createElement("div");

    // Add properties
    this.div.textContent = text;
    this.div.className = "noteText";
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
