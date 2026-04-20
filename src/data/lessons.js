// Registry of all lessons — add new entries here as lessons are created
const lessons = [
  { id: "lesson1", title: "Lektion 1 – Begrüßung", file: () => import("./lesson1.json") },
  { id: "lesson2", title: "Lektion 2 – ich bin", file: () => import("./lesson2.json") },
  { id: "lesson3", title: "Lektion 3 – wie gehts", file: () => import("./lesson3.json") },
  { id: "lesson4", title: "Lektion 4 – treffen", file: () => import("./lesson4.json") }
];

export default lessons;
