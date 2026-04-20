// Registry of all lessons — add new entries here as lessons are created
const lessons = [
  { id: "lesson1", title: "Lektion 1 – Begrüßung", file: () => import("./lesson1.json") },
  { id: "lesson2", title: "Lektion 2 – ich bin", file: () => import("./lesson2.json") },
];

export default lessons;
