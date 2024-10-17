import { fn } from "@storybook/test";
import { Button } from "../components/Button";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    variant: "Primary",
    children: "Button",
  },
};
