document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".box-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      updateFretboard();
    });
  });
  updateFretboard();
});

function updateFretboard() {
  const selected = [...document.querySelectorAll(".box-toggle.active")]
    .map(b => "box" + b.dataset.box);

  document.querySelectorAll(".fretboard .note").forEach(note => {
    if (selected.some(box => note.classList.contains(box))) {
      note.classList.add("highlight");
    } else {
      note.classList.remove("highlight");
    }
  });
}
