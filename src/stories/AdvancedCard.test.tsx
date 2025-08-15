import { render, screen } from "@testing-library/react";
import AdvancedCard from "./AdvancedCard";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

type Props = React.ComponentProps<typeof AdvancedCard>;

const defaultProps: Props = {
  title: "AdvancedCard",
  content: "AdvancedCard content",
  tags: ["tag1", "tag2"],
  author: {
    name: "miriml",
    avatar: "https://via.placeholder.com/150",
    date: "2025-01-01",
  },
  likes: 10,
  isLiked: false,
  isBookmarked: false,
  onLike: vi.fn(),
  onBookmark: vi.fn(),
  onShare: vi.fn(),
  isLoading: false,
  error: undefined,
};

const setup = (overrides: Partial<Props> = {}) => {
  // 각 테스트마다 새로운 spy로 교체
  const onLike = vi.fn();
  const onBookmark = vi.fn();
  const onShare = vi.fn();

  const props: Props = {
    ...defaultProps,
    onLike,
    onBookmark,
    onShare,
    ...overrides,
  };
  const user = userEvent.setup();
  const utils = render(<AdvancedCard {...props} />);
  return { user, props, ...utils };
};

describe("AdvancedCard", () => {
  it("작성자 정보가 보인다.", () => {
    setup();
    expect(screen.getByText("miriml")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "miriml" })).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
  });

  it("title, content, tags가 있으면 보인다.", () => {
    const { user, props } = setup({
      title: "AdvancedCard",
      content: "AdvancedCard content",
      tags: ["tag1", "tag2"],
    });
    expect(screen.getByText("AdvancedCard")).toBeInTheDocument();
    expect(screen.getByText("AdvancedCard content")).toBeInTheDocument();
    expect(screen.getByText("#tag1")).toBeInTheDocument();
    expect(screen.getByText("#tag2")).toBeInTheDocument();
  });

  it("imageUrl이 있으면 imageUrl이 보인다.", () => {
    const { user, props } = setup({
      imageUrl: "https://via.placeholder.com/150",
    });
    expect(
      screen.getByRole("img", { name: "AdvancedCard" })
    ).toBeInTheDocument();
  });

  it("imageUrl이 없으면 image가 보이지 않는다.", () => {
    const { user, props } = setup({
      imageUrl: undefined,
    });
    expect(
      screen.queryByRole("img", { name: "AdvancedCard" })
    ).not.toBeInTheDocument();
  });

  it("좋아요 버튼을 클릭하면 onLike가 호출된다.", async () => {
    const { user, props } = setup({
      isLiked: false,
    });

    await user.click(screen.getByRole("button", { name: "좋아요" }));
    expect(props.onLike).toHaveBeenCalledTimes(1);
  });

  it("공유 버튼을 클릭하면 onShare가 호출된다", async () => {
    const { user, props } = setup();
    await user.click(screen.getByRole("button", { name: "공유" }));
    expect(props.onShare).toHaveBeenCalledTimes(1);
  });

  it("북마크 버튼을 클릭하면 onBookmark가 호출된다", async () => {
    const { user, props } = setup({
      isBookmarked: false,
    });
    await user.click(screen.getByRole("button", { name: "북마크" }));
    expect(props.onBookmark).toHaveBeenCalledTimes(1);
  });

  it("isLoading이 true이면 로딩 중임을 알리는 메시지가 보인다.", () => {
    const { user, props } = setup({
      isLoading: true,
      error: undefined,
    });
    expect(screen.getByLabelText("로딩 중...")).toBeInTheDocument();
  });

  it("error가 있으면 에러 메시지가 보인다.", () => {
    const { user, props } = setup({
      error: "에러가 발생했습니다.",
    });
    expect(screen.getByText("에러가 발생했습니다.")).toBeInTheDocument();
  });

  it("좋아요 버튼을 클릭하면 isLiked가 토글되며, isLiked가 true이면 좋아요 버튼이 빨간색이다.", async () => {
    const { user, props } = setup({
      isLiked: true,
    });
    const likeBtn = screen.getByRole("button", { name: "좋아요" });
    const likeBtnIcon = likeBtn.querySelector("svg");

    await user.click(likeBtn);

    expect(props.onLike).toHaveBeenCalledTimes(1);
    expect(likeBtnIcon).toHaveClass("text-red-500", "fill-current");
  });

  it("북마크 버튼을 클릭하면 isBookmarked가 토글되며, isBookmarked가 true이면 북마크 버튼이 파란색이다.", async () => {
    const { user, props } = setup({
      isBookmarked: true,
    });
    const bookmarkBtn = screen.getByRole("button", { name: "북마크" });
    const bookmarkBtnIcon = bookmarkBtn.querySelector("svg");

    await user.click(bookmarkBtn);

    expect(props.onBookmark).toHaveBeenCalledTimes(1);
    expect(bookmarkBtnIcon).toHaveClass("text-blue-500", "fill-current");
  });
});
