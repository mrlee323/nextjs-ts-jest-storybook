import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("라벨을 렌더링한다.", () => {
    render(<Button label="Click me" />);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("클릭시 onClick을 1회 호출한다.", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button label="Click" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Click" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("primary=true면 primary 클래스가 적용된다.", () => {
    render(<Button label="Primary" primary />);
    expect(screen.getByRole("button", { name: "Primary" })).toHaveClass(
      "storybook-button--primary"
    );
  });

  it("size=small면 small 클래스가 적용된다.", () => {
    render(<Button label="Small" size="small" />);
    expect(screen.getByRole("button", { name: "Small" })).toHaveClass(
      "storybook-button--small"
    );
  });

  it("size=large면 large 클래스가 적용된다.", () => {
    render(<Button label="Large" size="large" />);
    expect(screen.getByRole("button", { name: "Large" })).toHaveClass(
      "storybook-button--large"
    );
  });

  it("backgroundColor추가하면 배경색이 적용된다.", () => {
    render(<Button label="Background" backgroundColor="red" />);
    expect(screen.getByRole("button", { name: "Background" })).toHaveStyle(
      "background-color: rgb(255, 0, 0)"
    );
  });
});
