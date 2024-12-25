/** @type {import('tailwindcss').Config} */
module.exports = {
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
        chatbotBlue: "#1E3A8A", // Navy blue
        chatbotYellow: "#FACC15", // Warm yellow
        targaryen: '#FFD700',
        dark: '#1a1a1a',
        gold: '#FFD700',
      },
    },
  },
  plugins: [],
};
