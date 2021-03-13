import { useState, useMemo, useCallback } from "react";

export type PomodoroStatus = "working" | "shortBreak" | "longBreak";

const validate = (interval: number, min = 1, max = 4) =>
  Math.min(Math.max(min, interval), max);

export default function usePomodoroStatus(intervalArg: number) {
  const interval = validate(intervalArg);
  const statusQueue = useMemo<PomodoroStatus[]>(
    () =>
      Array.from<PomodoroStatus, PomodoroStatus[]>(Array(interval), (_, i) => [
        "working",
        "shortBreak",
      ])
        .flat()
        .map((s, i) => (i === interval * 2 - 1 ? "longBreak" : s)),
    [interval]
  );
  const [statusIndex, setStatusIndex] = useState(0);
  const status = statusQueue[statusIndex];
  const proceedStatus = useCallback(
    () =>
      setStatusIndex((statusIndex) => {
        const next = statusIndex + 1;
        const max = statusQueue.length - 1;
        return next > max ? 0 : next;
      }),
    [statusQueue.length]
  );
  const resetStatus = () => setStatusIndex(0);
  return { status, statusQueue, proceedStatus, resetStatus };
}
