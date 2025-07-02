const { addNote, resetNotes } = require('../notes');

describe('addNote', () => {
  beforeEach(() => {
    resetNotes();
    // Limpiar mocks de localStorage
    if (global.localStorage) {
      global.localStorage.clear();
      jest.clearAllMocks();
    }
  });

  it('debe agregar una nota y devolver el array actualizado', () => {
    const nuevaNota = { id: 1, title: 'Nota 1', content: 'Contenido de la nota' };
    const notasActualizadas = addNote(nuevaNota);
    expect(notasActualizadas.length).toBe(1);
    expect(notasActualizadas[0]).toEqual(nuevaNota);
  });

  it('debe agregar dos notas y devolver un array con ambas', () => {
    const nota1 = { id: 2, title: 'Nota 2', content: 'Contenido 2' };
    const nota2 = { id: 3, title: 'Nota 3', content: 'Contenido 3' };
    addNote(nota1);
    const notasActualizadas = addNote(nota2);
    expect(notasActualizadas.length).toBe(2);
    expect(notasActualizadas).toEqual([nota1, nota2]);
  });

  it('debe guardar el array de notas en localStorage tras agregar una nota', () => {
    // Mock de localStorage
    const setItemMock = jest.fn();
    global.localStorage = { setItem: setItemMock, getItem: jest.fn(), clear: jest.fn() };
    resetNotes();
    const nuevaNota = { id: 4, title: 'Nota persistente', content: 'Contenido persistente' };
    const notasActualizadas = addNote(nuevaNota);
    expect(setItemMock).toHaveBeenCalledWith('notes', JSON.stringify(notasActualizadas));
  });
}); 