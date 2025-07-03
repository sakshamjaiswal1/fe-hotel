/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(15deg)" },
          "20%": { transform: "rotate(-10deg)" },
          "30%": { transform: "rotate(7deg)" },
          "40%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(3deg)" },
          "60%, 100%": { transform: "rotate(0deg)" },
        },
        starpop: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '30%': { transform: 'scale(1.4)', opacity: 0.9 },
          '60%': { transform: 'scale(0.9)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        ring: "ring 0.8s ease",
        starpop: 'starpop 0.5s ease-in-out',
      },

      colors: {
        "primary-main": {
          50: "var(--primary-main-50)",
          100: "var(--primary-main-100)",
          200: "var(--primary-main-200)",
          300: "var(--primary-main-300)",
          400: "var(--primary-main-400)",
          500: "var(--primary-main-500)",
          600: "var(--primary-main-600)",
          700: "var(--primary-main-700)",
          800: "var(--primary-main-800)",
          900: "var(--primary-main-900)",
          950: "var(--primary-main-950)",
        },
        "neutral-greys": {
          950: "var(--neutral-greys-950)",
          900: "var(--neutral-greys-900)",
          800: "var(--neutral-greys-800)",
          700: "var(--neutral-greys-700)",
          600: "var(--neutral-greys-600)",
          500: "var(--neutral-greys-500)",
          400: "var(--neutral-greys-400)",
          300: "var(--neutral-greys-300)",
          200: "var(--neutral-greys-200)",
          100: "var(--neutral-greys-100)",
          50: "var(--neutral-greys-50)",
          0: "var(--neutral-greys-0)",
          tooltip: "var(--neutral-greys-tooltip)",
        },
        "system-success": {
          50: "var(--system-success-50)",
          500: "var(--system-success-500)",
          950: "var(--system-success-950)",
        },
        "system-error": {
          50: "var(--system-error-50)",
          500: "var(--system-error-500)",
          950: "var(--system-error-950)",
          100: "var(--system-error-100)",
          200: "var(--system-error-200)",
          300: "var(--system-error-300)",
        },
        "system-warning": {
          50: "var(--system-warning-50)",
          500: "var(--system-warning-500)",
          550: "var(--system-warning-550)",
          950: "var(--system-warning-950)",
        },
      },

      screens: {
        "demeter-sm": "390px",
        "demeter-md": "688px",
        "demeter-lg": "1040px",
        "demeter-xl": "1120px",
      },
    },
  },
  plugins: [],
};
