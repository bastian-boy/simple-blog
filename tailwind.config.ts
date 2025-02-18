import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2.25rem", // text-4xl
              fontWeight: "700", // font-bold
              marginBottom: "2rem", // mb-8
              color: "inherit", // Use the same color as regular headings
            },
            h2: {
              fontSize: "1.875rem", // text-3xl
              fontWeight: "600", // font-semibold
              marginTop: "1.5rem",
              marginBottom: "1rem",
              color: "inherit",
            },
            p: {
              marginBottom: "1rem",
              color: "inherit",
            },
            a: {
              color: "#2563eb", // text-blue-600
              "&:hover": {
                color: "#1d4ed8", // text-blue-700
              },
              textDecoration: "none",
            },
            // Add more element styles as needed
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
