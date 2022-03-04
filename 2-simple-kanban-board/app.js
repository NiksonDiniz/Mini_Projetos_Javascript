/** app */
const cards = document.querySelectorAll(".card");
const dropzones = document.querySelectorAll(".dropzone");

/** our cards */
cards.forEach((card) => {
  card.addEventListener("dragstart", dragstart);
  card.addEventListener("dragend", dragend);
});

function dragstart() {
  dropzones.forEach((dropzone) => dropzone.classList.add("highlight"));

  // this = card
  this.classList.add("is-dragging");
}

function dragend() {
  dropzones.forEach((dropzone) => dropzone.classList.remove("highlight"));

  // this = card
  this.classList.remove("is-dragging");
}

/** place where we will drop cards */
dropzones.forEach((dropzone) => {
  dropzone.addEventListener("dragover", dragover);
  dropzone.addEventListener("dragleave", dragleave);
  dropzone.addEventListener("drop", drop);
});

function dragover() {
  // this = dropzone
  this.classList.add("over");

  // get dragging card
  const cardBeingDragged = document.querySelector(".is-dragging");

  // this = dropzone
  this.appendChild(cardBeingDragged);
}

function dragleave() {
  // this = dropzone
  this.classList.remove("over");
}

function drop() {
  this.classList.remove("over");
}
