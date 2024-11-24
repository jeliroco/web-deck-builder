import type { Config } from "tailwindcss";
import { PluginCreator } from "tailwindcss/types/config";

const backfaceVisibility: PluginCreator = ({ addUtilities }) => {
  addUtilities({
    ".backface-visible": {
      backfaceVisibility: "visible",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [backfaceVisibility],
} satisfies Config;
