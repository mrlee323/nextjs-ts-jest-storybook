import { describe, it, expect } from "vitest";
import sum from "./sum";

describe("sum", () => {
  it("정수를 더한다", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("음수도 처리한다", () => {
    expect(sum(-1, 2)).toBe(1);
  });

  it("소수도 처리한다", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3, 10);
  });

  it("잘못된 입력이면 예외를 던진다", () => {
    // @ts-expect-error 런타임 검증 테스트
    expect(() => sum("1", 2)).toThrow(TypeError);
    expect(() => sum(NaN as unknown as number, 2)).toThrow(
      "sum expects two numbers"
    );
  });
});
