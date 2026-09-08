/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#2C2C2E',
        primary: '#007AFF',
        text: '#FFFFFF',
        textSecondary: '#A0A0A0',
      }
    },
  },
  plugins: [],
}
