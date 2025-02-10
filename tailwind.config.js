import daisyui from "daisyui"
import typography from "@tailwindcss/typography";


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        
      },

      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
        'fade-out': 'fade-out 0.5s ease-in-out forwards',
        'rotate' : 'spin 5s linear infinite'
      },

      fontFamily: {
        "oswald" : ['Oswald', 'serif']
      }

    },
  },
  plugins: [

    typography,
    daisyui   
  ],
}

