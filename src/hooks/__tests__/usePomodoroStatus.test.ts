import { renderHook, act } from "@testing-library/react-hooks";
import usePomodoroStatus from "../usePomodoroStatus";

describe("usePomodoroStatus", () => {
  let result = renderHook(() => usePomodoroStatus(2)).result;
  beforeEach(() => {
    result = renderHook(() => usePomodoroStatus(2)).result;
  });

  test("proceedStatus", () => {
    expect(result.current.status).toBe("working");
    act(result.current.proceedStatus);
    expect(result.current.status).toBe("shortBreak");
    act(result.current.proceedStatus);
    expect(result.current.status).toBe("working");
    act(result.current.proceedStatus);
    expect(result.current.status).toBe("longBreak");
    act(result.current.proceedStatus);
    expect(result.current.status).toBe("working");
  });

  test("resetStatus", () => {
    expect(result.current.status).toBe("working");
    act(result.current.proceedStatus);
    expect(result.current.status).toBe("shortBreak");
    act(result.current.resetStatus);
    expect(result.current.status).toBe("working");
  });

  describe("statusQueue", () => {
    const minStatusQueue = ["working", "longBreak"];
    const maxStatusQueue = [
      "working",
      "shortBreak",
      "working",
      "shortBreak",
      "working",
      "shortBreak",
      "working",
      "longBreak",
    ];
    test("interval = 0", () => {
      result = renderHook(() => usePomodoroStatus(0)).result;
      expect(result.current.statusQueue).toEqual(minStatusQueue);
    });
    test("interval = 1", () => {
      result = renderHook(() => usePomodoroStatus(1)).result;
      expect(result.current.statusQueue).toEqual(minStatusQueue);
    });
    test("interval = 2", () => {
      result = renderHook(() => usePomodoroStatus(2)).result;
      expect(result.current.statusQueue).toEqual([
        "working",
        "shortBreak",
        "working",
        "longBreak",
      ]);
    });
    test("interval = 4", () => {
      result = renderHook(() => usePomodoroStatus(4)).result;
      expect(result.current.statusQueue).toEqual(maxStatusQueue);
    });
    test("interval = 5", () => {
      result = renderHook(() => usePomodoroStatus(5)).result;
      expect(result.current.statusQueue).toEqual(maxStatusQueue);
    });
  });
});
