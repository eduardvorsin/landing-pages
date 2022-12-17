import { useScreenWidth } from "./useScreenWidth";
import { renderHook } from "@testing-library/react";

describe('useScreenWidth tests', () => {
  test('returns the correct screen width', () => {
    const { result } = renderHook(() => useScreenWidth());

    expect(result.current).toBe(window.innerWidth);
  });
});
