import React, { createContext, FC, useState } from "react";
import { PomodoroStatus } from "./hooks/usePomodoroStatus";
import { Time } from "./hooks/useTimer";

export const DEFAULT_TIME = [
  [
    "working",
    {
      min: Number(localStorage.workingMin ?? 25),
      sec: Number(localStorage.workingSec ?? 0),
    },
  ],
  [
    "shortBreak",
    {
      min: Number(localStorage.shortBreakMin ?? 5),
      sec: Number(localStorage.shortBreakSec ?? 0),
    },
  ],
  [
    "longBreak",
    {
      min: Number(localStorage.longBreakMin ?? 15),
      sec: Number(localStorage.longBreakSec ?? 0),
    },
  ],
] as const;

export const DEFAULT_INTERVAL = 4;

export const DEFAULT_SETTING_VALUE = {
  darkMode: Boolean(localStorage.darkMode),
  pomodoroTime: new Map<PomodoroStatus, Time>(DEFAULT_TIME),
  interval: Number(localStorage.interval ?? DEFAULT_INTERVAL),
};

type SettingValue = typeof DEFAULT_SETTING_VALUE;

type SettingContextValue = SettingValue & {
  setValue: React.Dispatch<React.SetStateAction<SettingValue>>;
};

export const SettingContext = createContext<SettingContextValue | null>(null);

export const Provider: FC = ({ children }) => {
  const [value, setValue] = useState(DEFAULT_SETTING_VALUE);
  return (
    <SettingContext.Provider value={{ ...value, setValue }}>
      {children}
    </SettingContext.Provider>
  );
};
