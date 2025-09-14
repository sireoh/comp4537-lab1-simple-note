import { NoteContainer } from "./components/components.js";
import { Constants } from "./constants.js";

export class Main {
  static init(readonly: boolean) {
    const noteContainerDiv = document.getElementById(
      "noteContainer"
    ) as HTMLDivElement;
    const lastStoredSpan = document.getElementById(
      "lastStored"
    ) as HTMLSpanElement;
    const noteContainer = new NoteContainer(
      noteContainerDiv,
      lastStoredSpan,
      readonly
    );

    document.getElementById("addButton")?.addEventListener("click", () => {
      noteContainer.addNoteRow();
    });

    if (readonly) {
      setInterval(() => {
        noteContainer.hydrateContainer(readonly);
        console.log("Fetching and loading data from localStorage ...");
      }, Constants.TWO_SECONDS);
    }
  }

  static initIndex() {
    document.getElementById("goBackButton")?.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }
}
