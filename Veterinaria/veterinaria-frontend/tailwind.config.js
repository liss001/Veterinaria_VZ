 /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gris: {
          oscuro: '#1f1f1f', // Gris muy oscuro (puedes ajustar)
        },
        verde: {
          lechuga: '#8BC34A', // Verde lechuga (ajustable)
          pastel:  '#C5E1A5'
        },
        blanco: '#ffffff'
      }
    },
  },
  plugins: [],
}
