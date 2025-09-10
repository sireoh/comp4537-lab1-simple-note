import { NoteContainer } from "./components/components.js";

export function init(readonly: boolean) {
  console.log("Loading mock data ...");

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
}
