/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this path is correct
  ],
  theme: {
    extend: {
      container:{
         center:true,
         padding:{
          DEFAULT:"1rem",
            sm:"2rem",
            lg:"4rem",
            xl:"5rem",
            "2xl":"6rem"
          
        }
      }
    },
  },
  plugins: [],
};
