import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./components/Sidebar";
import LessonPage from "./components/LessonPage";
import ExercisePage from "./components/ExercisePage";
import GrammarPage from "./components/GrammarPage";
import ConjugationTable from "./components/ConjugationTable";
import Home from "./pages/Home";
import "./App.css";

function Layout() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  return (
    <div className={`app-layout ${collapsed ? "app-layout--collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        onNavigate={(path) => {
          if (path) navigate(path);
          setCollapsed(true);
        }}
      />
      <button
        className={`mobile-menu-btn ${collapsed ? "" : "mobile-menu-btn--hidden"}`}
        onClick={() => setCollapsed(false)}
        title="Menü öffnen"
      >
        <FiMenu size={20} />
      </button>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/exercise/:id" element={<ExercisePage />} />
          <Route path="/grammar/:id" element={<GrammarPage />} />
          <Route path="/conjugation/:id" element={<ConjugationTable />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/assamese">
      <Layout />
    </BrowserRouter>
  );
}
