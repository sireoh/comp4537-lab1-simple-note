class NoteContainer {
  noteContainerDiv: HTMLDivElement;
  lastStoredSpan: HTMLSpanElement;

  constructor(
    noteContainerDiv: HTMLDivElement,
    lastStoredSpanDiv: HTMLSpanElement
  ) {
    // Links to the existing container on the DOM
    this.noteContainerDiv = noteContainerDiv;

    // Links to the existing span on the DOM
    this.lastStoredSpan = lastStoredSpanDiv;
  }

  addNoteRow(): void {
    this.noteContainerDiv.appendChild(
      new NoteRow("", false, this.lastStoredSpan).noteRowDiv
    );
  }

  removeRow(id: string): void {
    const rowToRemove = document.getElementById(id) as HTMLDivElement;
    rowToRemove.remove();
  }
}

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
  static UUID_BASE: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  static X: string = "x";

  constructor(
    text: string,
    readOnly: boolean,
    lastStoredSpan: HTMLSpanElement
  ) {
    // Make Row main properties
    this.id = this.createUUID();

    // Creates the row div
    this.noteRowDiv = document.createElement("div");
    this.noteRowDiv.className = "noteRow";
    this.noteRowDiv.id = this.id;

    // Creates the NoteText and RemoveButton
    this.noteText = new NoteText(this.id, text, readOnly, lastStoredSpan);
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
    return NoteRow.UUID_BASE.replace(/[xy]/g, function (c) {
      const r = (Math.random() * NoteRow.SIXTEEN) | NoteRow.ZERO; // random number 0–15
      const v =
        c === NoteRow.X ? r : (r & NoteRow.THREE_BITS) | NoteRow.EIGHT_BITS; // force correct bits
      return v.toString(NoteRow.SIXTEEN);
    });
  }
}

class NoteText {
  // Set id
  id: string;

  textarea: HTMLTextAreaElement;
  lastStoredSpan: HTMLSpanElement;

  // Magic Numbers
  static MAX_HEIGHT = 3;

  constructor(
    id: string,
    text: string,
    readOnly: boolean,
    lastStoredSpanDiv: HTMLSpanElement
  ) {
    // Stores the id into the class
    this.id = id;

    // Link last stored span
    this.lastStoredSpan = lastStoredSpanDiv;

    // Create textarea
    this.textarea = document.createElement("textarea");

    // Add properties
    this.textarea.textContent = text;
    this.textarea.className = "noteText";
    this.textarea.rows = NoteText.MAX_HEIGHT;
    this.textarea.disabled = readOnly;

    // Writes to local storage onchange
    this.textarea.oninput = () => {
      this.writeToLocalStorage();
    };
  }

  writeToLocalStorage() {
    console.log(
      `Writing to local storage. ID: ${this.id}, Value: ${this.textarea.value}`
    );
    this.lastStoredSpan.innerHTML = new Date().toLocaleString();
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

export { NoteContainer, NoteRow, NoteText, RemoveButton };
