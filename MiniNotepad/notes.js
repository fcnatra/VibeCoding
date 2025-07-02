let notas = [];

// Inicializar desde localStorage si hay datos guardados
if (typeof localStorage !== 'undefined' && localStorage.getItem) {
  const guardadas = localStorage.getItem('notes');
  if (guardadas) {
    try {
      notas = JSON.parse(guardadas);
    } catch (e) {
      notas = [];
    }
  }
}

function saveNotes(notasArray) {
  if (typeof localStorage !== 'undefined' && localStorage.setItem) {
    localStorage.setItem('notes', JSON.stringify(notasArray));
  }
}

function addNote(nuevaNota) {
  notas.push(nuevaNota);
  saveNotes(notas);
  return notas;
}

function listNotes() {
  return notas;
}

function deleteNote(id) {
  notas = notas.filter(nota => nota.id !== id);
  saveNotes(notas);
  return notas;
}

function filterNotes(query) {
  const q = query.toLowerCase();
  return notas.filter(nota =>
    nota.title.toLowerCase().includes(q) ||
    nota.content.toLowerCase().includes(q)
  );
}

function resetNotes() {
  notas = [];
}

module.exports = { addNote, resetNotes, listNotes, deleteNote, filterNotes }; 