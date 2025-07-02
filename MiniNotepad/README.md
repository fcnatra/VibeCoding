# Kata: Mini Notepad

## Problema
Muchas personas quieren una forma sencilla de tomar, buscar y gestionar notas en su navegador, sin herramientas complejas ni cuentas.

## Contexto
Esta kata consiste en construir una SPA (Single-Page Application) mínima para tomar notas, enfocándose en la separación clara entre lógica y UI, y practicando manipulación del DOM, eventos y persistencia con localStorage.

## Entrega Esperada
Un microproducto que permita a los usuarios:
- Crear, ver y eliminar notas (título + contenido)
- Buscar notas por título o contenido (insensible a mayúsculas/minúsculas, en tiempo real)
- Persistir notas en localStorage
- Ver actualizaciones en la UI sin recargar la página

## Resumen de la Solución
- Funciones puras para la gestión de notas:
  - `listNotes()`: devuelve un array de notas
  - `addNote({ id, title, content })`: añade una nota
  - `deleteNote(id)`: elimina una nota
  - `filterNotes(query)`: filtra notas por título/contenido
- UI: Formulario para añadir notas, lista dinámica con botón eliminar, input de búsqueda
- Persistencia: Actualizar localStorage tras añadir/eliminar; hidratar estado al cargar
- Tests: Pruebas unitarias para la lógica (añadir, eliminar, filtrar)
- Lógica separada de la UI (por ejemplo, en `notes.js`)

## Cómo Ejecutar
1. Abre `index.html` en tu navegador (no requiere servidor)
2. Usa el formulario para añadir notas
3. Busca y elimina notas según sea necesario

## Cómo Probar
- Pruebas unitarias para la lógica de notas (añadir, eliminar, filtrar) usando Jest, Mocha u otro
- Ejemplo: `addNote` incrementa el array y persiste, `deleteNote` elimina solo la nota indicada, `filterNotes` encuentra coincidencias parciales y es insensible a mayúsculas/minúsculas

## Estructura de Archivos
- `index.html` – Página principal de la app
- `styles.css` – Estilos de la app
- `script.js` o `notes.js` – Lógica de notas y UI
- `tests/` – Pruebas unitarias para la lógica de notas

## Autor
VibeCoding Team