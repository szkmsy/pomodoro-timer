import { useEffect, useState } from "react";

export type Time = { min: number; sec: number };

export const calcMs = ({ min, sec }: Time) => min * 60 * 1000 + sec * 1000;

export const getFormattedTime = (d: Date) => {
  const min = `${d.getMinutes()}`.padStart(2, "0");
  const sec = `${d.getSeconds()}`.padStart(2, "0");
  return `${min}:${sec}`;
};

export default function useTimer(initialTime: Time) {
  const initialMs = calcMs(initialTime);
  const [timeMs, setTimeMs] = useState(initialMs);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => setTimeMs(initialMs), [initialMs]);

  const date = new Date(timeMs);
  const timerValue = getFormattedTime(date);
  const isFinished = date.getMinutes() === 0 && date.getSeconds() === 0;
  const isWorking = intervalId !== 0;

  const decrease = () => setTimeMs((ms) => Math.max(ms - 1000, 0));
  const startTimer = () => {
    if (isWorking) return;
    setIntervalId(window.setInterval(decrease, 1000));
  };
  const stopTimer = () => {
    if (isWorking) {
      window.clearInterval(intervalId);
      setIntervalId(0);
    }
  };
  const resetTimer = () => {
    stopTimer();
    setTimeMs(initialMs);
  };

  return {
    timerValue,
    isWorking,
    isFinished,
    decrease,
    startTimer,
    stopTimer,
    resetTimer,
  };
}
