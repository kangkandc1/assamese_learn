import React from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import lessons from "../data/lessons";
import exercises from "../data/exercises";
import grammar from "../data/grammar"
import conjugationtables from "../data/conjugationtables";
import { FiBook, FiMenu, FiX, FiEdit3, FiGrid } from "react-icons/fi";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: "transparent",
    borderColor: state.isFocused ? "var(--accent)" : "var(--border)",
    boxShadow: state.isFocused ? `0 0 0 2px var(--accent-soft)` : "none",
    borderRadius: "8px",
    fontSize: "0.82rem",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    overflow: "hidden",
    zIndex: 100,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected
      ? "var(--accent)"
      : state.isFocused
      ? "var(--hover)"
      : "transparent",
    color: state.isSelected ? "#fff" : "var(--text)",
    fontSize: "0.82rem",
    cursor: "pointer",
    padding: "8px 12px",
  }),
  singleValue: (base) => ({ ...base, color: "var(--text-muted)" }),
  placeholder: (base) => ({ ...base, color: "var(--text-muted)" }),
  dropdownIndicator: (base) => ({ ...base, color: "var(--text-muted)" }),
  indicatorSeparator: () => ({ display: "none" }),
};

export default function Sidebar({ collapsed, onToggle, onNavigate }) {
  const options = lessons.map((l) => ({ value: l.id, label: l.title }));

  const handleSelect = (opt) => {
    if (opt) onNavigate(`/lesson/${opt.value}`);
  };

  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-brand">
            <FiBook size={18} />
            <span>Assamesisch</span>
          </div>
        )}
        <button className="sidebar-toggle" onClick={onToggle} title="Seitenleiste umschalten">
          {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="sidebar-search">
            <Select
              options={options}
              styles={selectStyles}
              placeholder="Lektion suchen…"
              onChange={handleSelect}
              isClearable
            />
          </div>

          <nav className="sidebar-nav">
            <p className="sidebar-nav-label">Lektionen</p>
            {lessons.map((lesson) => (
              <NavLink
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
                }
                onClick={() => onNavigate && onNavigate()}
              >
                {lesson.title}
              </NavLink>
            ))}

            <p className="sidebar-nav-label" style={{ marginTop: 12 }}>
              <FiEdit3 size={11} style={{ marginRight: 5, verticalAlign: "middle" }} />
              Grammatik
            </p>
            {grammar.map((g) => (
              <NavLink
                key={g.id}
                to={`/grammar/${g.id}`}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
                }
                onClick={() => onNavigate && onNavigate()}
              >
                {g.title}
              </NavLink>
            ))}

            <p className="sidebar-nav-label" style={{ marginTop: 12 }}>
              <FiGrid size={11} style={{ marginRight: 5, verticalAlign: "middle" }} />
              Konjugation
            </p>
            {conjugationtables.map((t) => (
              <NavLink
                key={t.id}
                to={`/conjugation/${t.id}`}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
                }
                onClick={() => onNavigate && onNavigate()}
              >
                {t.title}
              </NavLink>
            ))}

            <p className="sidebar-nav-label" style={{ marginTop: 12 }}>
              <FiEdit3 size={11} style={{ marginRight: 5, verticalAlign: "middle" }} />
              Übungen
            </p>
            {exercises.map((exercise) => (
              <NavLink
                key={exercise.id}
                to={`/exercise/${exercise.id}`}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
                }
                onClick={() => onNavigate && onNavigate()}
              >
                {exercise.title}
              </NavLink>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
}
