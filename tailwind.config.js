/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        bounceThrice: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-20px)' },
          '60%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'bounce-thrice': 'bounceThrice 3s cubic-bezier(0.4, 0, 0.2, 1) 1'
      }
    },
  },
  plugins: [],
};