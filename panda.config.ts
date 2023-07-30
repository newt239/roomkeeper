import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  a: {
    color: "blue.500",
    transition: "all 0.2s ease-in-out",
    _hover: {
      textDecoration: "underline",
      textDecorationStyle: "dashed",
      textUnderlineOffset: "0.2em",
    },
  },
  ul: {
    listStyle: "disc",
    paddingLeft: "1rem",
  },
  "th, td": {
    py: 2,
    px: 4,
    borderStyle: "solid",
    borderColor: "gray.100",
    borderWidth: "1px",
    _osDark: {
      borderColor: "gray.800",
    },
  },
  th: {
    backgroundColor: "gray.100",
    _osDark: {
      backgroundColor: "gray.800",
    },
  },
  select: {
    py: 2,
    px: 4,
    borderRadius: "md",
    borderStyle: "solid",
    borderColor: "gray.100",
    borderWidth: "1px",
    _osDark: {
      borderColor: "gray.800",
    },
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
  globalCss,
});
