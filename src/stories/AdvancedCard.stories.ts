import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AdvancedCard from "./AdvancedCard";
import { expect, userEvent, within } from "storybook/internal/test";

const meta = {
  title: "Example/AdvancedCard",
  component: AdvancedCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdvancedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    title: "자연의 아름다움",
    content: "자연은 우리에게 평화와 영감을 줍니다...",
    tags: ["자연", "풍경", "여행"],
    author: {
      name: "김자연",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      date: "2024-01-15",
    },
    likes: 100,
    isLiked: false,
    isBookmarked: false,
    onLike: () => {},
    onBookmark: () => {},
    onShare: () => {},
  },
};

const WithImage: Story = {
  args: {
    title: "자연의 아름다움",
    content: "자연은 우리에게 평화와 영감을 줍니다...",
    imageUrl:
      "https://media.istockphoto.com/id/1317323736/ko/%EC%82%AC%EC%A7%84/%EB%82%98%EB%AC%B4-%EB%B0%A9%ED%96%A5%EC%9C%BC%EB%A1%9C-%ED%95%98%EB%8A%98%EB%A1%9C-%EB%B0%94%EB%9D%BC%EB%B3%B4%EB%8A%94-%EA%B2%BD%EC%B9%98.jpg?s=612x612&w=0&k=20&c=0xTghmMTXJ5ITCZ-LKTABbaPIK_1kWNf0FSFl_GL_7I=",
    tags: ["자연", "풍경", "여행"],
    author: {
      name: "김자연",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHPnXc_k2NHWamAjxLlvTPldhdzmIkw4oQ&s",
      date: "2024-01-15",
    },
    likes: 100,
    isLiked: false,
    isBookmarked: false,
    onLike: () => {},
    onBookmark: () => {},
    onShare: () => {},
  },
  parameters: {
    backgrounds: {
      default: "light-gray",
    },
  },
};

const WithBookmark: Story = {
  args: {
    title: "유용한 팁! 저장하고 참고하세요",
    content: "실생활에 유용한 팁들을 알려드릴게요. 오늘 하루도 행복하세요!",
    imageUrl:
      "https://cdn.crowdpic.net/detail-thumb/thumb_d_2F583E5543F7E19139C6FCFFBF9607A6.jpg",
    tags: ["생활", "공감", "소통"],
    author: {
      name: "이미림",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmwTdrSUKeZbcK5F4b_ne7mXYqiZ1izBg6w&s",
      date: "2024-01-15",
    },
    likes: 100,
    isLiked: false,
    isBookmarked: true,
    onLike: () => {},
    onBookmark: () => {},
    onShare: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bookmarkButton = canvas.getByRole("button", { name: /북마크/i });
    await expect(bookmarkButton).toBeInTheDocument();
    await userEvent.click(bookmarkButton);
    await expect(bookmarkButton).toHaveClass("text-blue-500 fill-current");
  },
};

const WithLikes: Story = {
  args: {
    title: "라이크가 많은 콘텐츠",
    content: "콘텐츠 내용이 유용하고, 좋은 콘텐츠는 라이크가 많습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    tags: ["생활", "공감", "소통"],
    author: {
      name: "이미림",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmwTdrSUKeZbcK5F4b_ne7mXYqiZ1izBg6w&s",
      date: "2024-01-15",
    },
    likes: 10000,
    isLiked: true,
    isBookmarked: false,
    onLike: () => {},
    onBookmark: () => {},
    onShare: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const likeButton = canvas.getByRole("button", { name: /좋아요/i });
    await expect(likeButton).toBeInTheDocument();
    await userEvent.click(likeButton);
    await expect(likeButton).toHaveClass("text-red-500 fill-current");
  },
};

const WithLoading: Story = {
  args: {
    title: "라이크가 많은 콘텐츠",
    content: "콘텐츠 내용이 유용하고, 좋은 콘텐츠는 라이크가 많습니다.",
    imageUrl:
      "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg",
    tags: ["생활", "공감", "소통"],
    author: {
      name: "이미림",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      date: "2024-01-15",
    },
    likes: 10000,
    isLiked: true,
    isBookmarked: false,
    onLike: () => {},
    onBookmark: () => {},
    onShare: () => {},
    isLoading: true,
  },
};

const WithError: Story = {
  args: {
    title: "라이크가 많은 콘텐츠",
    content: "콘텐츠 내용이 유용하고, 좋은 콘텐츠는 라이크가 많습니다.",
    imageUrl: "https://picsum.photos/400/300?random=1",
    tags: ["생활", "공감", "소통"],
    author: {
      name: "이미림",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      date: "2024-01-15",
    },
    likes: 10000,
    isLiked: true,
    isBookmarked: false,
    onLike: () => {},
    onBookmark: () => {},
    onShare: () => {},
    error: "콘텐츠 로딩 중 오류가 발생했습니다.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const retryButton = canvas.getByRole("button", { name: /다시 시도/i });
    await expect(retryButton).toBeInTheDocument();
    await expect(retryButton).toHaveTextContent("다시 시도");
  },
};

export { Default, WithImage, WithBookmark, WithLikes, WithLoading, WithError };
