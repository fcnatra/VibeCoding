import { jest } from '@jest/globals';
import { addNote, resetNotes, listNotes, deleteNote, filterNotes, exportNotes, importNotes } from '../notes.js';

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

  it('debe devolver el array actual de notas con listNotes', () => {
    const nuevaNota = { id: 5, title: 'Nota para listar', content: 'Contenido para listar' };
    addNote(nuevaNota);
    const notas = listNotes();
    expect(notas.length).toBe(1);
    expect(notas[0]).toEqual(nuevaNota);
  });

  it('debe eliminar una nota por id con deleteNote', () => {
    const nota1 = { id: 10, title: 'Nota 10', content: 'Contenido 10' };
    const nota2 = { id: 20, title: 'Nota 20', content: 'Contenido 20' };
    addNote(nota1);
    addNote(nota2);
    const notasTrasBorrar = deleteNote(10);
    expect(notasTrasBorrar.length).toBe(1);
    expect(notasTrasBorrar[0]).toEqual(nota2);
  });

  it('debe filtrar notas por coincidencia parcial y case-insensitive en título o contenido', () => {
    addNote({ id: 1, title: 'Comprar pan', content: 'Ir a la tienda' });
    addNote({ id: 2, title: 'Estudiar', content: 'Repasar JavaScript' });
    addNote({ id: 3, title: 'Panadería', content: 'Comprar croissants' });
    // Buscar "pan" debe devolver la 1 y la 3
    let resultado = filterNotes('pan');
    expect(resultado.length).toBe(2);
    expect(resultado.map(n => n.id).sort()).toEqual([1, 3]);
    // Buscar "JAVASCRIPT" debe devolver la 2 (case-insensitive)
    resultado = filterNotes('JAVASCRIPT');
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe(2);
  });

  it('debe borrar todas las notas con resetNotes y vaciar localStorage', () => {
    // Mock de localStorage
    const setItemMock = jest.fn();
    global.localStorage = { setItem: setItemMock, getItem: jest.fn(), clear: jest.fn() };
    addNote({ id: 200, title: 'Nota persistente', content: 'Contenido' });
    expect(setItemMock).toHaveBeenCalledWith('notes', JSON.stringify([{ id: 200, title: 'Nota persistente', content: 'Contenido' }]));
    resetNotes();
    expect(setItemMock).toHaveBeenCalledWith('notes', JSON.stringify([]));
  });

  it('debe exportar todas las notas como JSON', () => {
    resetNotes();
    addNote({ id: 1, title: 'Exportar', content: 'Contenido exportar' });
    addNote({ id: 2, title: 'Otra', content: 'Más contenido' });
    const json = exportNotes();
    const arr = JSON.parse(json);
    expect(arr.length).toBe(2);
    expect(arr[0].title).toBe('Exportar');
    expect(arr[1].content).toBe('Más contenido');
  });

  it('debe importar notas fusionando y sin duplicados por título y contenido', () => {
    resetNotes();
    addNote({ id: 1, title: 'A', content: 'Uno' });
    addNote({ id: 2, title: 'B', content: 'Dos' });
    const nuevas = [
      { title: 'A', content: 'Uno' }, // duplicada
      { title: 'C', content: 'Tres' }, // nueva
      { title: 'B', content: 'Dos' }, // duplicada
      { title: 'D', content: 'Cuatro' } // nueva
    ];
    const count = importNotes(JSON.stringify(nuevas));
    const notas = listNotes();
    expect(count).toBe(2);
    expect(notas.length).toBe(4);
    expect(notas.some(n => n.title === 'C' && n.content === 'Tres')).toBe(true);
    expect(notas.some(n => n.title === 'D' && n.content === 'Cuatro')).toBe(true);
  });

  it('debe manejar errores de formato al importar', () => {
    resetNotes();
    expect(importNotes('no es json')).toBe(0);
    expect(importNotes('{}')).toBe(0);
    expect(importNotes('[]')).toBe(0);
  });
}); 