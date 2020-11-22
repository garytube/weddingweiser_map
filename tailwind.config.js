module.exports = {
  purge: [
    './components/**/*.tsx',
    './pages/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      wedding: {
        DEFAULT: '#ffcc00',
        dark: '#f9c708'
      }
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}