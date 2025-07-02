// eslint-disable-next-line no-undef
const { listNotes } = require('./notes');

$(document).ready(function () {
  const $notesList = $('.notes-list');
  $notesList.empty();
  const notas = listNotes();
  if (notas.length === 0) {
    $notesList.append('<div style="color:#888; text-align:center;">No hay notas aún.</div>');
  } else {
    notas.forEach(nota => {
      const $block = $('<div class="note-block"></div>');
      $block.append(`<div class="note-title">${nota.title}</div>`);
      $block.append(`<div class="note-content">${nota.content}</div>`);
      $notesList.append($block);
    });
  }
}); 