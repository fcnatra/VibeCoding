import { listNotes, addNote, deleteNote, filterNotes, resetNotes, exportNotes, importNotes } from './notes.js';

let currentQuery = '';

function renderNotes(query = '') {
  const $notesList = $('.notes-list');
  $notesList.empty();
  let notas = query ? filterNotes(query) : listNotes();
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
        renderNotes(currentQuery);
      });
      $block.append($deleteBtn);
      $block.append(`<div class="note-title">${nota.title}</div>`);
      $block.append(`<div class="note-content">${nota.content}</div>`);
      $notesList.append($block);
    });
  }
}

function showAlert(message) {
  const alertModal = document.getElementById('alert-modal');
  const alertText = document.getElementById('alert-modal-text');
  const closeBtn = document.getElementById('close-alert-modal');
  if (alertModal && alertText && closeBtn) {
    alertText.textContent = message;
    alertModal.style.display = 'flex';
    closeBtn.onclick = () => {
      alertModal.style.display = 'none';
    };
  }
}

$(document).ready(function () {
  renderNotes();

  $('.note-form').on('submit', function (e) {
    e.preventDefault();
    const titleInput = $('.note-input-title');
    const contentInput = $('.note-input-content');
    const title = titleInput.val().trim();
    const content = contentInput.val().trim();
    if (!title || !content) return;
    const nuevaNota = {
      id: Date.now(),
      title,
      content
    };
    addNote(nuevaNota);
    this.reset();
    currentQuery = $('.note-search-input').val().trim();
    renderNotes(currentQuery);
    titleInput.focus();
  });

  $('.note-search-input').on('input', function () {
    currentQuery = $(this).val().trim();
    renderNotes(currentQuery);
  });

  // Exportar notas
  const exportBtn = document.getElementById('export-notes-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = exportNotes();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'notas.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Importar notas
  const importBtn = document.getElementById('import-notes-btn');
  const importFile = document.getElementById('import-notes-file');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', () => {
      importFile.value = '';
      importFile.click();
    });
    importFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (evt) {
        try {
          const count = importNotes(evt.target.result);
          if (count > 0) {
            showAlert(`Se importaron ${count} nota(s) nuevas.`);
            renderNotes();
          } else {
            showAlert('No se importaron notas nuevas.');
          }
        } catch (err) {
          showAlert('Error al importar las notas.');
        }
      };
      reader.readAsText(file);
    });
  }

  // Confirmación de borrado masivo
  const deleteAllBtn = document.getElementById('delete-all-btn');
  const confirmModal = document.getElementById('confirm-modal');
  const confirmDeleteAll = document.getElementById('confirm-delete-all');
  const cancelDeleteAll = document.getElementById('cancel-delete-all');

  if (deleteAllBtn && confirmModal && confirmDeleteAll && cancelDeleteAll) {
    deleteAllBtn.addEventListener('click', () => {
      confirmModal.style.display = 'flex';
    });
    confirmDeleteAll.addEventListener('click', () => {
      resetNotes();
      renderNotes();
      confirmModal.style.display = 'none';
    });
    cancelDeleteAll.addEventListener('click', () => {
      confirmModal.style.display = 'none';
    });
  }
}); 