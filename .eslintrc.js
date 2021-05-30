module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/typescript/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-extra-semi": "off",
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "no-undef": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "arrow-parens": ["error", "as-needed"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
};
