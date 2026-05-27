const exercises = [
  { id: "exercise1", title: "Übung1 – Lektion 1 bis 4", file: () => import("./exercises/exercise1.json") },
  { id: "exercise2", title: "Übung2 – Lektion 1 bis 4", file: () => import("./exercises/exercise2.json") },
  { id: "exercise3", title: "Übung3 – Dativ, Akkusativ", file: () => import("./exercises/exercise3.json") }
];

export default exercises;
