import { NoteContainer } from "./components/components.js";

function init() {
  console.log("Loading mock data ...");

  const noteContainerDiv = document.getElementById(
    "noteContainer"
  ) as HTMLDivElement;
  const lastStoredSpan = document.getElementById(
    "lastStored"
  ) as HTMLSpanElement;
  const noteContainer = new NoteContainer(noteContainerDiv, lastStoredSpan);

  document.getElementById("addButton")?.addEventListener("click", () => {
    noteContainer.addNoteRow();
  });
}

init();
