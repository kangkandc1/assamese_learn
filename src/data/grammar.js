const grammar = [
  { id: "Grammatik-1", title: "Grammatik-W Worter", file: () => import("./grammar/grammar1.json") },
  { id: "Grammatik-2", title: "Grammatik-Wer,Wen, Wem", file: () => import("./grammar/grammar2.json") },
  { id: "Grammatik-3", title: "Personalpronomen", file: () => import("./grammar/grammar3.json") },
{ id: "Grammatik-4", title: "Verb Konjugation", file: () => import("./grammar/grammar4.json") },
{ id: "Grammatik-5", title: "Dativ", file: () => import("./grammar/grammar5.json") }

];

export default grammar;