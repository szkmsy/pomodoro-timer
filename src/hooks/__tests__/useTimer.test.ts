import { renderHook, act } from "@testing-library/react-hooks";
import useTimer, { calcMs, getFormattedTime } from "../useTimer";

jest.useFakeTimers();

describe("helper functions", () => {
  test("calcMs", () => {
    expect(calcMs({ min: 1, sec: 2 })).toBe(62000);
  });
  test("getFormattedTime", () => {
    expect(getFormattedTime(new Date(0, 0, 0, 0, 1, 2))).toBe("01:02");
  });
});

describe("useTimer", () => {
  const time = { min: 1, sec: 0 };
  let { result } = renderHook(() => useTimer(time));

  beforeEach(() => {
    result = renderHook(() => useTimer(time)).result;
  });

  test("isFinished", () => {
    expect(result.current.isFinished).toBe(false);
    result = renderHook(() => useTimer({ min: 0, sec: 0 })).result;
    expect(result.current.isFinished).toBe(true);
  });

  test("decrease", () => {
    const initialValue = result.current.timerValue;
    act(result.current.decrease);
    expect(result.current.timerValue).not.toBe(initialValue);
  });

  test("startTimer", async () => {
    expect(result.current.isWorking).toBe(false);
    act(result.current.startTimer);
    expect(result.current.isWorking).toBe(true);
    expect(window.setInterval).toHaveBeenCalledTimes(1);
  });

  test("stopTimer", async () => {
    act(result.current.startTimer);
    act(result.current.stopTimer);
    expect(result.current.isWorking).toBe(false);
    expect(window.clearInterval).toHaveBeenCalledTimes(1);
  });

  test("resetTimer", () => {
    const initialValue = result.current.timerValue;
    act(result.current.startTimer);
    act(result.current.resetTimer);
    expect(result.current.timerValue).toBe(initialValue);
    expect(result.current.isWorking).toBe(false);
    expect(window.clearInterval).toHaveBeenCalledTimes(1);
  });
});
