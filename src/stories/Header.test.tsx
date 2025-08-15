import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Header", () => {
  it("브랜드 텍스트 Acme가 보인다", () => {
    render(<Header />);
    expect(screen.getByRole("heading", { name: "Acme" })).toBeInTheDocument();
  });

  it("header 태그가 있다.", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("user가 있으면 Welcome, John Doe. 텍스트가 보인다.", () => {
    render(<Header user={{ name: "John Doe" }} />);
    const el = screen.getByText(/Welcome,/i);
    expect(el).toHaveTextContent("Welcome, John Doe!");
  });

  it("user가 있으면 Log out 버튼이 보이고, Log in, Sign up 버튼이 보이지 않는다.", () => {
    render(<Header user={{ name: "John Doe" }} />);
    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Log in" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Sign up" })
    ).not.toBeInTheDocument();
  });

  it("user가 있고 Log out 버튼을 클릭하면 onLogout이 호출된다.", async () => {
    const onLogout = vi.fn();
    const user = userEvent.setup();
    render(<Header user={{ name: "John Doe" }} onLogout={onLogout} />);
    await user.click(screen.getByRole("button", { name: "Log out" }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it("user가 없으면 Log in, Sign up 버튼이 보이고, Log out 버튼이 보이지 않는다.", () => {
    render(<Header />);
    expect(
      screen.queryByRole("button", { name: "Log out" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("user가 없고 Welcome, John Doe 텍스트가 보이지 않는다.", () => {
    render(<Header />);
    expect(screen.queryByText(/Welcome,/i)).not.toBeInTheDocument();
  });

  it("user가 없고 Log in 버튼을 클릭하면 onLogin이 호출된다.", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    render(<Header onLogin={onLogin} />);
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it("user가 없고 Sign up 버튼을 클릭하면 onCreateAccount이 호출된다.", async () => {
    const user = userEvent.setup();
    const onCreateAccount = vi.fn();
    render(<Header onCreateAccount={onCreateAccount} />);
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    expect(onCreateAccount).toHaveBeenCalledTimes(1);
  });
});
