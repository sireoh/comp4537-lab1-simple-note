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

  for (let i = 0; i < 5; i++) {
    noteContainer.addNoteRow();
  }
}

init();

document.getElementById("addButton")?.addEventListener("click", () => {
  window.location.href = "writer.html";
});
