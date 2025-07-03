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
  saveNotes(notas);
}

function exportNotes() {
  return JSON.stringify(notas, null, 2);
}

function importNotes(json) {
  let nuevasNotas;
  try {
    nuevasNotas = JSON.parse(json);
    if (!Array.isArray(nuevasNotas)) return 0;
  } catch (e) {
    return 0;
  }
  let count = 0;
  nuevasNotas.forEach(nota => {
    if (!notas.some(n => n.title === nota.title && n.content === nota.content)) {
      notas.push({
        id: Date.now() + Math.floor(Math.random() * 100000),
        title: nota.title,
        content: nota.content
      });
      count++;
    }
  });
  saveNotes(notas);
  return count;
}

export { addNote, resetNotes, listNotes, deleteNote, filterNotes, exportNotes, importNotes }; 