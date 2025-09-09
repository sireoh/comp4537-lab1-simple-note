import { NoteRow } from "./components/components.js";

function loadMockData() {
  console.log("Loading mock data ...");

  const noteContainer = document.getElementById(
    "noteContainer"
  ) as HTMLDivElement;
  let currentRow: NoteRow;
  for (let i = 0; i < 5; i++) {
    currentRow = new NoteRow(
      "is simply dummy text of the printing and typesetting industry",
      true
    );
    noteContainer.appendChild(currentRow.noteRowDiv);
  }
}

loadMockData();

document.getElementById("addButton")?.addEventListener("click", () => {
  window.location.href = "writer.html";
});
