import { useContext, useEffect } from "react";
import { PomodoroStatus } from "./usePomodoroStatus";
import { SettingContext } from "../context";
import { Time } from "./useTimer";

export default function useSetting() {
  const settingContextValue = useContext(SettingContext);
  if (settingContextValue === null) {
    throw new Error("Expect SettingContext value to be set");
  }
  const { darkMode, pomodoroTime, interval, setValue } = settingContextValue;

  useEffect(() => {
    const { dataset } = document.documentElement;
    dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const toggleDarkMode = () => {
    setValue((v) => ({ ...v, darkMode: !darkMode }));
    localStorage.darkMode = darkMode ? "" : undefined;
  };

  const savePomodoroTime = (status: PomodoroStatus, time: Time) => {
    setValue((v) => ({
      ...v,
      pomodoroTime: new Map(v.pomodoroTime).set(status, time),
    }));
    localStorage[`${status}Min`] = time.min;
    localStorage[`${status}Sec`] = time.sec;
  };

  const saveInterval = (interval: number) => {
    setValue((v) => ({ ...v, interval }));
    localStorage.interval = interval;
  };

  return {
    darkMode,
    toggleDarkMode,
    pomodoroTime,
    savePomodoroTime,
    interval,
    saveInterval,
  };
}
