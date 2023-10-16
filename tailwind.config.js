/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'alphaWhite': {
          DEFAULT: 'rgba(252, 252, 252)',
          50: 'rgba(252, 252, 252, 0.05)',
          100: 'rgba(252, 252, 252, 0.1)',
          200: 'rgba(252, 252, 252, 0.2)',
          300: 'rgba(252, 252, 252, 0.3)',
          400: 'rgba(252, 252, 252, 0.4)',
          500: 'rgba(252, 252, 252, 0.5)',
          600: 'rgba(252, 252, 252, 0.6)',
          700: 'rgba(252, 252, 252, 0.7)',
          800: 'rgba(252, 252, 252, 0.8)',
          900: 'rgba(252, 252, 252, 0.9)'
        },
        'borderWhite': 'rgba(252, 252, 252, 0.2)',
        'darkpurple': 'rgba(55, 11, 78, 1)',
        'lightpurple': 'rgba(90, 84, 119, 0.50)',
        'violet': '#7977ff',
        'violet-light': '#7977ff',
        'darkgrey': 'rgb(26, 28, 29)',
        'ebebeb': '#ebebeb',
        'primary-high': '#7977ff',
        'primary-middle': '#787296',
        'primary-light': '#81859F',
        'background-card': '#0e0e0f',
        'transparent': 'transparent',
        'base-text': 'rgba(155, 159, 186, 1)',
        '010304': '#010304',
        'cursor': '#010304',
        'black' : '#010304',
        'white' : '#fcfcfc',
        'error': 'rgba(239, 68, 68, 1)',
        'error-bg': 'rgba(127, 29, 29, 0.4)'
      },
      zIndex: {
        'header': '80',
        'popup': '90',
        'cursor': '100',
        'transition': '200',
      },
      transformOrigin: {
        'top-left-90-90' : '90% 90%',
      },
      screens: {
        'fullHd' : '1920px',
        'regularH': { 'raw': '(min-height: 750px))' }
      },
      borderRadius: {
        '4xl' : '40px'
      },
      fontSize: {
        'title': '40px',
        'title-large': '60px',
        'base-lg': '22px',
      },
      borderColor: ({theme}) => ({
        DEFAULT: theme('colors.borderWhite')
      })
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.perspective': {
          'perspective': '1000px',
        },
        // 'gradient-violet-left': {
        //   background: "radial-gradient()"
        // }
      })
    }),
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.dashboard-title': {
          fontFamily: 'n27',
          fontSize: '28px',
          textTransform: 'uppercase',
        },
        '.tag': {
          padding: '1rem',
          backgroundColor: '#1a1c1d',
          width: 'max-content',
          borderRadius: '10px',
          '&.active': {
            backgroundColor: theme('colors')['primary-middle'],
          }
        },
        '.gradient-menu-mobile': {
          background: `
            radial-gradient(100% 30%, rgba(55, 11, 78, 0.8) 0%, rgba(205, 3, 255, 0.0) 100%),
            radial-gradient(50% 40% at 20%, rgba(75, 93, 255, .2) 0%, rgba(75, 93, 255, .1) 60%, rgba(75, 93, 255, 0.00) 100%)
          `,
          opacity: '1'
        },
        '.gradient-dark-transparent': {
          background: `linear-gradient(-90deg, rgba(1, 3, 4, 0.00) 0%, ${theme('colors.black')} 50%)`,
        },
        '.gradient-to-top-black-transparent': {
          background: 'linear-gradient(180deg, rgba(1, 3, 4, 0.00) 0%, #010304 100%)',
        },
        '.gradient-white-transparent' : {
          background: `linear-gradient(0deg, ${theme('colors.borderWhite')} 0%, rgba(252, 252, 252, 0.00) 100%)`,
        },
        '.gradient-faq': {
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.65) 100%), url("/img/pattern.png")'
        },
        '.gradient-pastel': {
          background: `linear-gradient(270deg, #c985fe 6.21%, #999dff 103.42%);`
        },
        '.gradient-about-1': {
          background: `radial-gradient(closest-side, #4B68FF 0%, rgba(75, 93, 255, 0.00) 100%)`,
        },
        '.gradient-about-2': {
          background: `radial-gradient(closest-side, #4B68FF 0%, rgba(255, 183, 75, 0.00) 100%)`,
        },
        '.gradient-chart': {
          background: `linear-gradient(183deg, #C985FE 1.57%, #999DFF 76.22%)`,
        },
        '.gradient-text': {
          background: 'linear-gradient(270deg, #c985fe 6.21%, #999dff 103.42%)',
        },
        '.gradient-svg-linear': {
          'path[fill]': {
            'fill' : 'url(/icons/gradients.svg#linear)',
          },
          'path[stroke]': {
            'stroke' : 'url(/icons/gradients.svg#linear)',
          }
        },
        '.bg-signin': {
          background: `radial-gradient(50.00% 50.00% at 50.00% 50.00%, #7E5EFF 0%, rgba(205, 3, 255, 0.60) 100%)`,
          mixBlendMode: 'lighten',
          filter: 'blur(107px)',
          opacity: 0.15
        },
        '.bg-pattern-linear-top': {
          backgroundImage: 'linear-gradient(to bottom,rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 100%), url("/img/pattern.png")'
        },
        '.border-linear': {
          position: 'relative',
          zIndex: 0,
          overflow: 'hidden',

          '&::before': {
            position: 'absolute',
            zIndex: -1,
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(120deg, ${theme('colors.alphaWhite.200')} 0%, ${theme('colors.alphaWhite.50')} 100%);`
          }
        },
        '.no-scroll-bar': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar' : { 
            display: 'none',
          }
        },
        '.input-text': {
          transition: 'border-color 0.3s',
          '&:hover, &:focus': {
            borderColor: theme('colors')['primary-middle'],
          }
        },
        '.simple-link': {
          '--tw-text-opacity': 0.4,
          '&:hover': {
            '--tw-text-opacity': 1,
          }
        },
        '.input-chkbx': {
          position: 'relative',
          flexShrink: '0',
          appearance: 'none',
          /* For iOS < 15 to remove gradient background */
          backgroundColor: '#fff',
          /* Not removed via appearance */
          margin: 0,
          flexBasis: '20px',
          width: '20px',
          height: '20px',
          border: '1px solid',
          overflow: 'hidden',

          '&::before': {
            content: 'url(/icons/checkbox-check.svg)',
            textAlign: 'center',
            verticalAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            backgroundColor: theme('colors')['violet'],
            zIndex: 1,
            transform: 'translate(-50%, 100%)',
            transition: 'transform 0.5s ease-in-out',
          },
          '&:checked::before': {
            transform: 'translate(-50%, -50%)',
          }
        },
        '.hide-search-input-reset': {
          /* clears the ‘X’ from Internet Explorer */
          '&::-ms-clear': { 
            display: 'none',
            width : 0,
            height: 0,
          },
          '&::-ms-reveal': { 
            display: 'none',
            width : 0,
            height: 0, 
          },
          /* clears the ‘X’ from Chrome */
          '&::-webkit-search-decoration': { display: 'none' },
          '&::-webkit-search-cancel-button': { display: 'none' },
          '&::-webkit-search-results-button': { display: 'none' },
          '&::-webkit-search-results-decoration': { display: 'none'}
        }
      })
    })
  ],
};
