/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        C_LightBlue: "#E3F6FC",
        C_DarkBlue: "#6588DE",
        C_Green: "#46D362",
        C_TextWhite: "#FDFDFE",
        C_TextWhiteDull: "#F2F6F7",
        C_WhiteBright: "#FDFDFD",
        C_TextBlack: "#52585D",
        C_Gold: "#F3BA4A",
        C_DarkBlueShadow: "rgba(0, 72, 251, 0.30)",
        C_BorderLightBlue: "#D0D9DF",
        C_UserDullBlack: "#AFBCC680",
        C_GreyBorder: "#96A9BAB2",
      },
      animation :{
        
      },
      theme: {
      }
    },
  },
  plugins: [],
}

