import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Card from "./Card";

const meta = {
  title: "Example/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    title: "콘텐츠란 무엇인가",
    content:
      "콘텐츠는 어떤 매체를 통해 소비자에게 제공되는 내용이나 정보를 의미합니다. 주로 인터넷, 방송, 출판 등 다양한 분야에서 사용되며, 영상, 음악, 텍스트, 이미지 등 다양한 형태로 존재할 수 있습니다. 컨텐츠라는 표현도 자주 사용되지만, 외래어 표기법에 따르면 콘텐츠가 올바른 표기입니다. ",
  },
};

const WithImage: Story = {
  args: {
    title: "웰시코기 너무 사랑스러워",
    content:
      "영국 웨일스 지역의 목양견 계통의 개 품종 중 하나. 웨일스어로 웨일스(welsh)의 난쟁이(cor) 개(gi)라는 뜻이다.원래 웰시 코기는 웨일스 지역의 농가에서 경비견이나 목양견 등으로 사육되었다.",
    imageUrl: "https://cdn.pet-news.or.kr/news/photo/202304/2903_4444_3536.jpg",
  },
  parameters: {
    docs: {
      description: {
        story: "이미지가 포함된 카드 컴포넌트입니다.",
      },
    },
  },
};

const Clickable: Story = {
  args: {
    title: " ⭐️⭐️⭐️⭐️⭐️ 메르드로브 호텔 부산 후기 ",
    content:
      "두번째 방문입니다. 생긴지 얼마되지 않아서도 있지만 깔끔하고 넓고 쾌적하고, 다음에 또 방문 할 계획입니다. 위치도 좋아서 근처에 먹을대도 많고, 배달도 잘되서 밖에 나가지 않아도 안에서 모두 즐길 수 있습니다.",
    imageUrl:
      "https://asset.tripbtoz.com/user/triptalk/hotel/30086079/5459/d2f730b113c63aed57ece380bc9e3d.jpeg",
    onClick: () =>
      window.open(
        "https://www.tripbtoz.com/hotels/30086079?utm_source=TCELEB_10229&searchId=30086079&searchType=hotel&id=30086079&check-in=2025-08-20&check-out=2025-08-21"
      ),
  },
};

export { Default, WithImage, Clickable };
