import { FC } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { Provider, DEFAULT_TIME, DEFAULT_INTERVAL } from "../../context";
import useSetting from "../useSetting";

describe("useSetting", () => {
  const wrapper: FC = ({ children }) => <Provider>{children}</Provider>;
  let result = renderHook(() => useSetting(), { wrapper }).result;
  beforeEach(() => {
    result = renderHook(() => useSetting(), { wrapper }).result;
  });

  test("darkMode", () => {
    expect(result.current.darkMode).toBe(false);
    act(result.current.toggleDarkMode);
    expect(result.current.darkMode).toBe(true);
  });

  test("pomodoroTime", () => {
    expect(result.current.pomodoroTime).toEqual(new Map(DEFAULT_TIME));
  });

  describe("savePomodoroTime", () => {
    test("working", () => {
      const time = { min: 1, sec: 2 };
      act(() => result.current.savePomodoroTime("working", time));
      expect(result.current.pomodoroTime.get("working")).toEqual(time);
    });
    test("shortBreak", () => {
      const time = { min: 3, sec: 4 };
      act(() => result.current.savePomodoroTime("shortBreak", time));
      expect(result.current.pomodoroTime.get("shortBreak")).toEqual(time);
    });
    test("longBreak", () => {
      const time = { min: 5, sec: 6 };
      act(() => result.current.savePomodoroTime("longBreak", time));
      expect(result.current.pomodoroTime.get("longBreak")).toEqual(time);
    });
  });

  describe("interval", () => {
    test("default value", () => {
      expect(result.current.interval).toBe(DEFAULT_INTERVAL);
    });
    test("saveInterval", () => {
      const newInterval = 1;
      act(() => result.current.saveInterval(newInterval));
      expect(result.current.interval).toBe(newInterval);
    });
  });
});
