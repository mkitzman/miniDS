// import { within, userEvent, expect } from "@storybook/test";

import { Password } from "./Password";

export default {
  title: "Example/Password",
  component: Password,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    stringMap: { control: "object" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  ///  args: { onClick: fn() },
};

export const DefaultExample = {};

export const CustomStringMap = {
  args: {
    stringMap: {
      confirmPassword: "Confirmar Contraseña",
      password: "Contraseña",
      passwordFail: "Tus contraseñas no son válidas!",
      passwordSuccess: "Tus contraseñas son válidas!",
      requirements: "Requisitos",
      submit: "Entregar",
    },
  },
};

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
// export const LoggedIn = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const loginButton = canvas.getByRole("button", { name: /Log in/i });
//     await expect(loginButton).toBeInTheDocument();
//     await userEvent.click(loginButton);
//     await expect(loginButton).not.toBeInTheDocument();

//     const logoutButton = canvas.getByRole("button", { name: /Log out/i });
//     await expect(logoutButton).toBeInTheDocument();
//   },
// };
