/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: {
        light: "#fff",
        DEFAULT: "#fff",
        dark: "#fff",
        90 : "rgba(255, 255, 255, 0.90)",
        75 : "rgba(255, 255, 255, 0.75)",
        50: "rgba(255, 255, 255, 0.5)",
        25: "rgba(255, 255, 255, 0.2)",
        10: "rgba(255, 255, 255, 0.1)",
        5: "rgba(255, 255, 255, 0.03)",
        1: "rgba(255, 255, 255, 0.01)"
      },
      grey: {
        light: '#E5E7EB',
        DEFAULT: '#9CA3AF',
        dark: '#4B5563',
      },
      black: {
        light: '#111',
        DEFAULT: "#000",
        dark: '#000000',
        90 : "rgba(0, 0, 0, 0.90)",
        75 : "rgba(0, 0, 0, 0.75)",
        50: "rgba(0, 0, 0, 0.5)",
        25: "rgba(0, 0, 0, 0.2)",
        10: "rgba(0, 0, 0, 0.1)"
      },
    },
    fontFamily: {},

    extend: {
      screens:{
        '320px': '320px',
        '375px': '375px',
        '425px': '425px',
        '475px': '475px',
        '768px': '768px',
        '1024px': '1024px',
        '1200px': '1200px',
        '1440px': '1440px',
        '1600px': '1600px',
        '1920px': '1920px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
