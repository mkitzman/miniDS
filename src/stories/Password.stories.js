// import { within, userEvent, expect } from "@storybook/test";

import { Password } from "../components/Password";

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
};

export const DefaultExample = {};

export const CustomStringMap = {
  args: {
    stringMap: {
      alertDefault: "Por favor ingrese una contraseña.",
      alertFail: "Tus contraseñas no son válidas!",
      alertMatchFail: "Las contraseñas no coinciden.",
      alertSuccess: "Tus contraseñas son válidas!",
      confirmPassword: "Confirmar Contraseña",
      fieldsetLegend: "Nuevos campos de contraseña",
      password: "Contraseña",
      requirements: "Requisitos",
      showConfirmPassword: "Alternar Confirmar visibilidad de contraseña",
      showPassword: "Alternar visibilidad de contraseña",
      submit: "Entregar",
    },
    requirements: [
      {
        name: "length",
        text: "6 caracteres mínimo.",
        isValid: (value) => value.length > 6,
      },
      {
        name: "upperCase",
        text: "1 carácter en mayúscula.",
        isValid: (value) => /[A-Z]/.test(value),
      },
      {
        name: "lowerCase",
        text: "1 carácter en minúscula.",
        isValid: (value) => /[a-z]/.test(value),
      },
      {
        name: "number",
        text: "1 número.",
        isValid: (value) => /\d/.test(value),
      },
      {
        name: "special",
        text: "1 carácter especial.",
        isValid: (value) => /[*@!#%&()^~{}]+/.test(value),
      },
    ],
  },
};
