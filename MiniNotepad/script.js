// eslint-disable-next-line no-undef
const { listNotes, addNote, deleteNote } = require('./notes');

function renderNotes() {
  const $notesList = $('.notes-list');
  $notesList.empty();
  const notas = listNotes();
  if (notas.length === 0) {
    $notesList.append('<div style="color:#888; text-align:center;">No hay notas aún.</div>');
  } else {
    notas.forEach(nota => {
      const $block = $('<div class="note-block"></div>');
      // Botón de papelera SVG
      const $deleteBtn = $(`
        <button class="note-delete-btn" title="Eliminar nota">
          <svg viewBox="0 0 24 24"><path d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/></svg>
        </button>
      `);
      $deleteBtn.on('click', function (e) {
        e.preventDefault();
        deleteNote(nota.id);
        renderNotes();
      });
      $block.append($deleteBtn);
      $block.append(`<div class="note-title">${nota.title}</div>`);
      $block.append(`<div class="note-content">${nota.content}</div>`);
      $notesList.append($block);
    });
  }
}

$(document).ready(function () {
  renderNotes();

  $('.note-form').on('submit', function (e) {
    e.preventDefault();
    const title = $('.note-input-title').val().trim();
    const content = $('.note-input-content').val().trim();
    if (!title || !content) return;
    const nuevaNota = {
      id: Date.now(),
      title,
      content
    };
    addNote(nuevaNota);
    this.reset();
    renderNotes();
  });
}); 