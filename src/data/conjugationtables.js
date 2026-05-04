const conjugationtables = [
  { id: "table-1", title: "Basis Verben", file: () => import("./cojnugationtables/table1.json") },
  { id: "table-2", title: "Modal Verben", file: () => import("./cojnugationtables/table2.json") },
  { id: "table-3", title: "Futur 1", file: () => import("./cojnugationtables/table3.json") },

];

export default conjugationtables;