// dao.ts

import { Constants } from "../constants.js";

export class Dao {
  // Load all notes
  static getNotes(): Record<string, string> {
    return JSON.parse(localStorage.getItem(Constants.NOTES_KEY) || "{}");
  }

  // Save the whole notes dictionary
  static saveNotes(notes: Record<string, string>): void {
    localStorage.setItem(Constants.NOTES_KEY, JSON.stringify(notes));
    Dao.updateLastStored();
  }

  // Add or update a single note
  static saveNote(id: string, value: string): void {
    const notes = Dao.getNotes();
    notes[id] = value;
    Dao.saveNotes(notes);
  }

  // Remove a single note
  static removeNote(id: string): void {
    const notes = Dao.getNotes();
    delete notes[id];
    Dao.saveNotes(notes);
  }

  // Get last stored timestamp
  static getLastStored(): string {
    return localStorage.getItem(Constants.LAST_STORED_KEY) || "";
  }

  // Update last stored timestamp
  private static updateLastStored(): void {
    const timestamp = new Date().toLocaleString();
    localStorage.setItem(Constants.LAST_STORED_KEY, timestamp);
  }
}
