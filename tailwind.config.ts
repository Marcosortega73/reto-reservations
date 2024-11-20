import type { Config } from "tailwindcss";

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
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        error: "var(--error)",
        success: "var(--success)",
        warning: "var(--warning)",
        info: "var(--info)",

        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "accent-text": "var(--accent-text)",
        "muted-text": "var(--muted-text)",
        "error-text": "var(--error-text)",
        "success-text": "var(--success-text)",
        "warning-text": "var(--warning-text)",
        "info-text": "var(--info-text)",
      },
    },
  },
  plugins: [],
} satisfies Config;
