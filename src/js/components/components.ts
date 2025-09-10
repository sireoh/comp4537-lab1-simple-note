class NoteContainer {
  noteContainerDiv: HTMLDivElement;
  lastStoredSpan: HTMLSpanElement;

  // Notes Dictionary
  notes: Record<string, string>;

  constructor(
    noteContainerDiv: HTMLDivElement,
    lastStoredSpanDiv: HTMLSpanElement,
    readonly: boolean
  ) {
    // Links to the existing container on the DOM
    this.noteContainerDiv = noteContainerDiv;

    // Links to the existing span on the DOM
    this.lastStoredSpan = lastStoredSpanDiv;

    // Initialize the notes dictionary
    this.notes = {};

    // Hydrates the container immediately
    this.hydrateContainer(readonly);
  }

  hydrateContainer(readonly: boolean): void {
    // Hydrate the lastStored from the localStorage
    this.lastStoredSpan.textContent = localStorage.getItem("lastStored") || "";

    // Hydrates the container with notes from the local storage
    let data: { notes: Record<string, string> } = {
      notes: JSON.parse(localStorage.getItem("notes") || "{}"),
    };

    // Update the  local notes with the localStorage notes if exists
    this.notes = data.notes;

    // Clear existing rows to avoid duplicates on each hydrate
    this.noteContainerDiv.innerHTML = "";

    // Render rows from storage
    Object.entries(data.notes).forEach(([key, value]) => {
      this.noteContainerDiv.appendChild(
        new NoteRow(value, readonly, this.lastStoredSpan, this.notes, key)
          .noteRowDiv
      );
    });
  }

  addNoteRow(): void {
    this.noteContainerDiv.appendChild(
      new NoteRow("", false, this.lastStoredSpan, this.notes).noteRowDiv
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
    lastStoredSpan: HTMLSpanElement,
    notes?: Record<string, string>,
    id?: string
  ) {
    // Make Row main properties. Creates a new id, if an id doesn't exist
    this.id = id ? id : this.createUUID();

    // Creates the row div
    this.noteRowDiv = document.createElement("div");
    this.noteRowDiv.className = "noteRow";
    this.noteRowDiv.id = this.id;

    // Creates the NoteText and RemoveButton
    this.noteText = new NoteText(
      this.id,
      text,
      readOnly,
      lastStoredSpan,
      notes
    );
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

  // Last Stored Date Value
  lastStoredValue: string;

  constructor(
    id: string,
    text: string,
    readOnly: boolean,
    lastStoredSpanDiv: HTMLSpanElement,
    notes?: Record<string, string>
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

    // Last Stored Date Value
    this.lastStoredValue = "";

    // Writes to local storage onchange
    this.textarea.oninput = () => {
      this.writeToLocalStorage(notes);
    };
  }

  writeToLocalStorage(notes?: Record<string, string>) {
    // Date / Time Area
    this.updateAndStoreTime();

    // Writes to local storage

    // Update the dictionary
    notes![this.id] = this.textarea.value;
    localStorage.setItem("notes", JSON.stringify(notes));

    // Print client local dictionary
    console.log(notes);
  }

  updateAndStoreTime() {
    // Update the Value
    this.lastStoredValue = new Date().toLocaleString();

    // Update on the DOM using the value
    this.lastStoredSpan.innerHTML = this.lastStoredValue;

    // Store on localStorage
    localStorage.setItem("lastStored", this.lastStoredValue);
  }
}

class RemoveButton {
  btn: HTMLButtonElement;
  rowToRemove?: HTMLElement;

  constructor(noteId: string) {
    // Create button
    this.btn = document.createElement("button");

    // Add Properties
    this.btn.textContent = "Remove";
    this.btn.className = "removeButton";
    this.btn.onclick = () => {
      this.removeFromLocalStorage(noteId);
      this.removeFromDOM(noteId);
    };
  }

  removeFromDOM(id: string) {
    this.rowToRemove = document.getElementById(id)!;
    console.log("Removing row with id:", id);
    this.rowToRemove.remove();
  }

  removeFromLocalStorage(id: string) {
    // Get the notes from local storage
    const notes: Record<string, string> = JSON.parse(
      localStorage.getItem("notes") || "{}"
    );
    delete notes[id];

    // Remove from local storage
    console.log(`Removing from local storage. ID: ${id}`);

    // Update localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

export { NoteContainer, NoteRow, NoteText, RemoveButton };
