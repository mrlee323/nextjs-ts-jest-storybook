import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Card", () => {
  it("렌더링한다.", () => {
    render(<Card title="Card" content="Card" />);
    expect(screen.getByRole("heading", { name: "Card" })).toBeInTheDocument();
  });

  it("title이 있으면 title이 보인다.", () => {
    render(<Card title="Card Title" content="Card content" />);
    expect(
      screen.getByRole("heading", { name: "Card Title" })
    ).toBeInTheDocument();
  });

  it("content가 있으면 content가 보인다.", () => {
    render(<Card title="Card Title" content="Card content" />);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("imageUrl이 있으면 imageUrl이 보인다.", () => {
    render(
      <Card
        title="Card Title"
        content="Card content"
        imageUrl="https://via.placeholder.com/150"
      />
    );
    expect(screen.getByRole("img", { name: "Card Title" })).toBeInTheDocument();
  });

  it("imageUrl이 없으면 image가 보이지 않는다.", () => {
    render(<Card title="Card Title" content="Card content" />);
    expect(
      screen.queryByRole("img", { name: "Card Title" })
    ).not.toBeInTheDocument();
  });

  it("onClick이 있으면 클릭하면 onClick이 호출된다.", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Card title="Card Title" content="Card content" onClick={onClick} />
    );
    await user.click(screen.getByRole("heading", { name: "Card Title" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
