import React from "react";

export const useScrollToBottom = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleScrollToBottom = () => {
    const node = ref.current;
    if (node) {
      node.scrollIntoView();
    }
  };

  return { ref, handleScrollToBottom };
};
