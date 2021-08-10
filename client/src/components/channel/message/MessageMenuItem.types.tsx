import React from "react";

export interface Props {
  item: {
    label: string;
    icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  };
}
