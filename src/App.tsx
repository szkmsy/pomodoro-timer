import React, { useState } from "react";
import "./css/app.css";
import "./css/setting-modal.css";
import SettingModal from "./SettingModal";
import PomodoroTimer from "./PomodoroTimer";

export default function App() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <main data-testid="app">
      {open && <SettingModal closeModal={closeModal} />}
      <PomodoroTimer openModal={openModal} />
    </main>
  );
}
