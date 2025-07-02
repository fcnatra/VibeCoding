let notas = [];

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

function resetNotes() {
  notas = [];
}

module.exports = { addNote, resetNotes }; 