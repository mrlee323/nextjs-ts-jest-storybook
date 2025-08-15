import type { Preview } from "@storybook/nextjs-vite";
import "./storybook.css"; // Storybook 전용 CSS import

// JavaScript로 직접 배경색 변경 (CSS가 작동하지 않을 때를 대비)
if (typeof window !== "undefined") {
  // DOM이 로드된 후 배경색 변경
  const changeBackground = () => {
    const previewWrapper = document.getElementById("storybook-preview-wrapper");
    const panelRoot = document.getElementById("storybook-panel-root");

    if (previewWrapper) {
      previewWrapper.style.background = "#f5f5f5";
    }
    if (panelRoot) {
      panelRoot.style.background = "#f5f5f5";
    }

    // body 배경색도 변경
    document.body.style.background = "#f5f5f5";
  };

  // DOM 로드 완료 후 실행
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", changeBackground);
  } else {
    changeBackground();
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },

    backgrounds: {
      default: "light-gray",
      values: [
        {
          name: "light-gray",
          value: "#f5f5f5",
        },
        {
          name: "white",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#333333",
        },
      ],
    },
  },
};

export default preview;
