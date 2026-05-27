const grammar = [
  { id: "Grammatik-1", title: "Grammatik-W Worter", file: () => import("./grammar/grammar1.json") },
  { id: "Grammatik-2", title: "Grammatik-Wer,Wen, Wem", file: () => import("./grammar/grammar2.json") },
  { id: "Grammatik-3", title: "Personalpronomen", file: () => import("./grammar/grammar3.json") },
{ id: "Grammatik-4", title: "Verb Konjugation", file: () => import("./grammar/grammar4.json") },
{ id: "Grammatik-5", title: "Dativ", file: () => import("./grammar/grammar5.json") },
{ id: "Grammatik-6", title: "Possesiv", file: () => import("./grammar/grammar6.json") },
{ id: "Grammatik-7", title: "Akkusativ", file: () => import("./grammar/grammar7.json") },
{ id: "Grammatik-8", title: "Kopulaverben", file: () => import("./grammar/grammar8.json") },
{ id: "Grammatik-9", title: "Zahlwörter", file: () => import("./grammar/grammar9.json") }

];

export default grammar;