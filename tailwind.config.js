/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Обнови этот путь в зависимости от используемых файлов
  ],
  theme: {
    extend: {
      colors: {
        customGreen: {
          50: '#ffffff',
          100: '#dfecdf',
          200: '#bfd9bf',
          300: '#a0c79f',
          400: '#80b47f',
          500: '#60a15f', // Основной зелёный
          600: '#418f3f',
          700: '#217c1f',
          800: '#016a00',
          900: '#015c00',
          950: '#000d00',
        },
        customOrange: {
          50: '#ffffff',
          100: '#fff2df',
          200: '#ffe5bf',
          300: '#ffd89f',
          400: '#ffcc7f',
          500: '#ffbf5f', // Основной оранжевый
          600: '#ffb23f',
          700: '#ffa51f',
          800: '#ff9900',
          900: '#df8500',
          950: '#1f1300',
        },
      },
      fontFamily: {
        custom: ['Revuen', 'sans-serif'], // Добавьте кастомный шрифт
      },
      spacing: {
        'text-indent-1': '0.25rem',
        'text-indent-2': '0.5rem',
        'text-indent-3': '0.75rem',
        'text-indent-4': '1rem',
        'text-indent-5': '1.25rem',
        'text-indent-6': '1.5rem',
        'text-indent-8': '2rem',
      },
    },
  },
  plugins: [],
}

