import React from "react";
import "./css/pomodoro-timer.css";
import usePomodoroTimer from "./hooks/usePomodoroTimer";

export default function PomodoroTimer({
  openModal,
}: {
  openModal: () => void;
}) {
  const {
    timerValue,
    status,
    isWorking,
    start,
    stop,
    reset,
  } = usePomodoroTimer();

  const playerIcon = isWorking ? "𝄥" : "▷";
  const onPlayerClick = isWorking ? stop : start;

  return (
    <section className="pomodoro-timer">
      <section className="display" data-testid="open-modal" onClick={openModal}>
        {timerValue}
        <p className="pomodoro-status">{status}</p>
      </section>
      <section className="player">
        <button className="player-button" onClick={onPlayerClick}>
          {playerIcon}
        </button>
        <button className="player-button" onClick={reset}>
          ↺
        </button>
      </section>
    </section>
  );
}
