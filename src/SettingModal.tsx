import React from "react";
import "./css/setting-modal.css";
import { PomodoroStatus } from "./hooks/usePomodoroStatus";
import useSetting from "./hooks/useSetting";

function TimeSetting({ status }: { status: PomodoroStatus }) {
  const { pomodoroTime, savePomodoroTime } = useSetting();
  const time = pomodoroTime.get(status) ?? { min: 0, sec: 0 };
  return (
    <span className="time-setting">
      <input
        id="working"
        type="number"
        min="0"
        max="59"
        value={time.min}
        onChange={({ target: { value } }) =>
          savePomodoroTime(status, { ...time, min: Number(value) })
        }
      />
      <input
        id="working"
        type="number"
        min="0"
        max="59"
        value={time.sec}
        onChange={({ target: { value } }) =>
          savePomodoroTime(status, { ...time, sec: Number(value) })
        }
      />
    </span>
  );
}

export default function SettingModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { darkMode, toggleDarkMode, interval, saveInterval } = useSetting();
  return (
    <div className="modal" onClick={closeModal} data-testid="setting-modal">
      <form className="setting-form" onClick={(e) => e.stopPropagation()}>
        <h2>Setting</h2>
        <fieldset>
          <label>Dark Mode</label>
          <span className="toggle-button">
            <input
              id="dark-mode"
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label htmlFor="dark-mode"></label>
          </span>
        </fieldset>
        <fieldset>
          <label>Working</label>
          <TimeSetting status="working" />
        </fieldset>
        <fieldset>
          <label>Short Break</label>
          <TimeSetting status="shortBreak" />
        </fieldset>
        <fieldset>
          <label>Long Break</label>
          <TimeSetting status="longBreak" />
        </fieldset>
        <fieldset>
          <label>Interval</label>
          <input
            id="interval"
            type="number"
            min="1"
            value={interval}
            onChange={({ target: { value } }) => saveInterval(Number(value))}
          />
        </fieldset>
        <button
          className="modal-close-button"
          onClick={closeModal}
          type="button"
        >
          Close
        </button>
      </form>
    </div>
  );
}
