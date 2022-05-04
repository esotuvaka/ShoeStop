module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            hr: {
              borderColor: theme('colors.gray.200'),
              borderTopWidth: '1px',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'ol > li::before': {
              color: theme('colors.gray.900'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.900'),
            },
          },
        },
      }),
      colors: {
        burgundy: '#721121',
        rBlack: '#290F0F',
        rGray: '#3E0101',
      },
      backgroundImage: {
        hero: "url('/paul-volkmer-updW-QUccFE-unsplash.jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
