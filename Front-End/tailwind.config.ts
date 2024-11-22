import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./assets/fonts/ttcommonspro/**/*.{css,woff,woff2,tff}",
    "./assets/fonts/reckless/**/*.{css,woff,woff2,tff}"
  ],
  theme: {
    extend: {
      colors:{
        'primaryBlue': '#0017EE', //highlights
        'SCGreen': '#C4D1CE',
        'SBGreen': '#DCE5E4',
        'SCBlue': '#BDCAD1',
        'SBBlue': '#DCE1E5',
        'SCBeige': '#E1CFBF',
        'SBBeige': '#EBE8E3',
        'SCPink': '#DCC8C2',
        'SBPink': '#EBE5E3',
        'black': '#000000',
        'grey90': '#242424',
        'grey70': '#747474',
        'grey30': '#C4C4C4',
        'grey10': '#F4F4F4',
        'white': '#FFFFFF',

        //Own colors added
        'BTBlue': '#007BFF',
        'BTBlue-dark': '#3B71CA',
        'BTSecondary': '#9FA6B2',
        'BTSuccess': '#14A44D',
        'BTSuccess-dark': '#007E33',
        'BTDanger': '#CC0000',
        'BTDanger-dark': '#DC4C64',
        'BTWarning': '#E4A11B',
        'BTWarning-dark': '#FF8800',
        'BTInfo': '#54B4D3',
        'BTInfo-dark': '#0099CC',
        'BTLight': '#FBFBFB',
        'BTDark': '#332D2D',
      },
      fontFamily: {
        'tt-commons-medium': ['TT Commons Pro Medium', 'sans-serif'],
        'tt-commons-regular': ['TT Commons Pro Regular', 'sans-serif'],
        'tt-commons-italic': ['TT Commons Pro Italic', 'sans-serif'],
        'tt-commons-demi-bold': ['TT Commons Pro DemiBold', 'sans-serif']
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
