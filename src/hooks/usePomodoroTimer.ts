import { useEffect } from "react";
import useTimer from "./useTimer";
import useSetting from "./useSetting";
import usePomodoroStatus from "./usePomodoroStatus";

export default function usePomodoroTimer() {
  const { darkMode, interval, pomodoroTime } = useSetting();
  const { status, resetStatus, proceedStatus } = usePomodoroStatus(interval);

  const baseTime = pomodoroTime.get(status);
  if (baseTime === undefined) {
    throw new Error("Failed to get pomodoro time");
  }

  const {
    timerValue,
    startTimer,
    stopTimer,
    resetTimer,
    isFinished,
    isWorking,
  } = useTimer(baseTime);

  useEffect(() => {
    if (isFinished) {
      proceedStatus();
    }
  }, [isFinished, proceedStatus]);

  const start = startTimer;
  const stop = stopTimer;
  const reset = () => {
    resetTimer();
    resetStatus();
  };

  return { darkMode, timerValue, status, start, stop, reset, isWorking };
}
