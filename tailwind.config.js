import * as tokens from './theme.js'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // v1
        appleRed: {
          DEFAULT: tokens.base_Edy_appleRed,
          200: tokens.base_Edy_appleRed_200,
        },
        blackBerry: tokens.base_Edy_blackBerry,
        blueBerry: tokens.base_Edy_blueBerry,
        soyMilk: {
          DEFAULT: tokens.base_Edy_soyMilk,
          40: tokens.base_Edy_soyMilk_40,
          100: tokens.base_Edy_soyMilk_100,
          200: tokens.base_Edy_soyMilk_200,
          500: tokens.base_Edy_soyMilk_500,
        },

        neutral: {
          '01': '#B2B2B2',
          '02': '#777777',
        },

        'dashboard-success-dark': tokens.dashboard_success_dark,
        'dashboard-success': tokens.dashboard_success,
        'dashboard-warning': tokens.dashboard_warning,

        // Backgrounds
        'dashboard-button-island-BlueBerry-default':
          tokens.dashboard_button_island_BlueBerry_default,
        'dashboard-button-island-disabled':
          tokens.dashboard_button_island_disabled,
        'dashboard-button-island-hover': tokens.dashboard_button_island_hover,
        'dashboard-button-white-default': tokens.dashboard_button_white_default,
        'dashboard-button-white-default-solid':
          tokens.dashboard_button_white_default_solid,
        'dashboard-button-white-hover': tokens.dashboard_button_white_hover,

        'dashboard-background-content-area':
          tokens.dashboard_background_content_area,
        'dashboard-button-alert': tokens.dashboard_button_alert,
        'dashboard-button-dark': tokens.dashboard_button_dark,

        // Texts
        'dashboard-text-button-white-contrast-low':
          tokens.dashboard_text_button_white_contrast_low,
        'dashboard-text-description-base':
          tokens.dashboard_text_description_base,
        'dashboard-text-description-base-low':
          tokens.dashboard_text_description_base_low,
        'dashboard-text-disabled': tokens.dashboard_text_disabled,
        'dashboard-text-title-white-high':
          tokens.dashboard_text_title_white_high,

        // Icons
        'dashboard-icon-color-default': tokens.dashboard_icon_color_default,

        //Article Category
        edit: {
          DEFAULT: '#E3E178',
          dark: '#323325',
        },
        partnership: {
          DEFAULT: '#A878E3',
          dark: tokens.dashboard_button_island_disabled,
        },
        filming: {
          DEFAULT: '#7B8E8B',
          dark: '#202726',
        },
        'social-networks': {
          DEFAULT: '#E39778',
          dark: '#372621',
        },
        television: {
          DEFAULT: '#78E3D2',
          dark: '#273F3C',
        },

        // v0
        alphaWhite: {
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
          900: 'rgba(252, 252, 252, 0.9)',
        },
        borderWhite: 'rgba(252, 252, 252, 0.2)',
        darkpurple: 'rgba(55, 11, 78, 1)',
        lightpurple: 'rgba(90, 84, 119, 0.50)',
        violet: '#7977ff',
        'violet-light': '#7977ff',
        darkgrey: 'rgb(26, 28, 29)',
        ebebeb: '#ebebeb',
        'primary-high': '#7977ff',
        'primary-middle': '#787296',
        'primary-light': '#81859F',
        'background-card': '#0e0e0f',
        transparent: 'transparent',
        'base-text': 'rgba(155, 159, 186, 1)',
        '010304': '#010304',
        cursor: '#010304',
        black: '#010304',
        white: '#fcfcfc',
        error: 'rgba(239, 68, 68, 1)',
        'error-bg': 'rgba(127, 29, 29, 0.4)',
      },
      zIndex: {
        header: 80,
        panels: 81,
        buttons: 85,
        popup: 90,
        cursor: 100,
        transition: 200,
      },
      transformOrigin: {
        'top-left-90-90': '90% 90%',
      },
      screens: {
        fullHd: '1920px',
        regularH: { raw: '(min-height: 750px))' },
      },
      spacing: {
        'dashboard-button-separation-spacing':
          tokens.dashboard_button_separation_spacing,
        'dashboard-mention-padding-right-left':
          tokens.dashboard_mention_padding_right_left,
        'dashboard-mention-padding-top-bottom':
          tokens.dashboard_mention_padding_top_bottom,
        'dashboard-spacing-element-medium':
          tokens.dashboard_spacing_element_medium,
        DashboardPaddingNul: tokens.padding_DashboardPaddingNul,
        'dashboard-specific-radius': tokens.dashboard_specific_radius,
        'padding-medium': tokens.padding_medium,
        'navbar-h': '50px',
      },
      borderWidth: {
        DEFAULT: tokens.dashboard_border_width_button_default,
        '03': '0.33px',
        '05': '0.5px',
        'dashboard-border-width-button-default':
          tokens.dashboard_border_width_button_default,
      },
      borderRadius: {
        //v1
        'dashboard-mention-radius': tokens.dashboard_mention_radius,
        'dashboard-button-square-radius': tokens.dashboard_button_square_radius,
        'dashboard-button-separation-spacing':
          tokens.dashboard_button_separation_spacing,
        'dashboard-specific-radius': tokens.dashboard_specific_radius,
        'dashboard-medium-radius': tokens.dashboard_medium_radius,
        'dashboard-large-radius': tokens.dashboard_large_radius,
        //v0
        '4xl': '40px',
      },
      fontSize: {
        //v1
        DEFAULT: [tokens.text_base, tokens.lh_default],
        small: [tokens.text_small, tokens.lh_default],
        base: [tokens.text_base, tokens.lh_default],
        medium: [tokens.text_medium, tokens.lh_default],
        large: [tokens.text_large, tokens.lh_default],
        'small-light': [tokens.text_small_light, tokens.lh_default],
        'base-light': [tokens.text_base_ligth, tokens.lh_default],
        'base-bold': [tokens.text_base_bold, tokens.lh_default],

        'title-small': [tokens.title_small, tokens.lineheight_title_small],
        'title-m': [tokens.title_m, '1.27'],
        // 'title-medium': [tokens.title_medium, tokens.lineheight_title_medium],
        'title-large': [tokens.title_large, tokens.lh_title_large],

        //v0
        title: '40px',
        // 'title-large': '60px',
        'base-lg': '22px',
      },
      fontFamily: {
        DEFAULT: tokens.font_default,
        text: tokens.font_text,
        title: tokens.font_title,
      },
      keyframes: {
        'toast-in': {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        'toast-out': {
          '0%': { transform: 'translateY(0px)', opacity: 1 },
          '100%': { transform: 'translateY(-20px)', opacity: 0 },
        },
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme('colors.borderWhite'),

        // Strokes
        'dashboard-button-dark-border': tokens.dashboard_button_dark_border,
        'dashboard-button-focus-stroke': tokens.dashboard_button_focus_stroke,
        'dashboard-button-stroke-default':
          tokens.dashboard_button_stroke_default,
        'dashboard-button-stroke-disabled':
          tokens.dashboard_button_stroke_disabled,
        'dashboard-button-stroke-hover': tokens.dashboard_button_stroke_hover,
        'dashboard-separator-white-low-opacity':
          tokens.dashboard_separator_white_low_opacity,
      }),
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.perspective': {
          perspective: '1000px',
        },
        '.bg-rose-sunset': {
          background: `linear-gradient(var(--linear-direction, 180deg), ${tokens.base_rose_sunset_blue} 38.45%, ${tokens.base_rose_sunset_violet} 93.75%);`,
        },
        '.bg-border-component': {
          background: `linear-gradient(var(--linear-direction, 180deg), ${tokens.base_Edy_soyMilk} 38.45%, ${tokens.base_Edy_soyMilk_250} 93.75%);`,
        },
        '.shadow-large': {
          boxShadow: `0px 6px 24px 0px rgba(0, 0, 0, 0.65), 0px 4px 4px 0px rgba(0, 0, 0, 0.55), 0px 0px 44px 0px rgba(0, 0, 0, 0.32);`,
        },
        '.shadow-1': {
          boxShadow: `0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.12);`,
        },
        '.shadow-text': {
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.45);',
        },
      })
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'linear-orientation': (value) => ({
            '--linear-orientation': value,
          }),
        },
        {
          values: {
            0: '0deg',
            90: '90deg',
            180: '180deg',
            270: '270deg',
          },
        }
      )
    }),
    plugin(function ({ matchComponents, theme }) {
      matchComponents(
        {
          'svg-color': (value) => ({
            '*[fill]': {
              fill: value,
            },
            '*[stroke]': {
              stroke: value,
            },
          }),
        },
        {
          values: flattenColorPalette(theme('colors')),
        }
      )
    }),

    plugin(function ({ addComponents, theme }) {
      addComponents({
        //v1
        '.text-linear-sunset': {
          background: `linear-gradient(var(--linear-orientation, 180deg), ${tokens.base_rose_sunset_blue} 38.45%, ${tokens.base_rose_sunset_violet} 93.75%);`,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
          transform: 'translateZ(0)',
        },
        '.text-base': {
          fontFamily: tokens.font_default.join(', '),
          fontSize: tokens.text_base,
          fontWeight: 400,
          letterSpacing: '-0.208px',
        },
        '.text-base-light': {
          fontFamily: tokens.font_default.join(', '),
          fontSize: tokens.text_base,
          fontWeight: 400,
          letterSpacing: '-0.208px',
        },
        '.text-base-bold': {
          fontFamily: tokens.font_default.join(', '),
          fontSize: tokens.text_small,
          fontWeight: 700,
          letterSpacing: '-0.208px',
        },
        '.text-small': {
          fontFamily: tokens.font_default.join(', '),
          fontSize: tokens.text_small,
          fontWeight: 400,
          letterSpacing: '-0.084px',
          lineHeight: 1.35,
        },
        '.text-large': {
          fontFamily: tokens.font_default.join(', '),
          fontSize: tokens.text_large,
          fontWeight: 500,
          letterSpacing: '-0.456px',
        },
        '.text-title-M': {
          fontFamily: tokens.font_title.join(', '),
          fontSize: tokens.title_m,
          fontWeight: 400,
          lineHeight: '27.398px',
          textTransform: 'uppercase',
        },
        '.text-title-large': {
          fontFamily: tokens.font_title.join(', '),
          fontSize: tokens.title_large,
          fontWeight: 400,
          lineHeight: tokens.title_large_lineHeight,
          textTransform: 'uppercase',
          letterSpacing: '-0.48px',
        },
        '.text-title-medium': {
          fontFamily: tokens.font_title.join(', '),
          fontSize: tokens.title_medium,
          fontWeight: 400,
          lineHeight: '97.85%',
          textTransform: 'uppercase',
        },
        '.text-title-small': {
          fontFamily: tokens.font_title.join(', '),
          fontSize: tokens.title_small,
          fontWeight: 400,
          lineHeight: '200%',
          textTransform: 'uppercase',
        },
        '.visually-hidden': {
          opacity: 0,
          width: 0,
          height: 0,
        },
        '.form-separator': {
          display: 'none',
          '@media screen and (min-width: 640px)': {
            display: 'block',
            width: '100%',
            borderWidth: 0.5,
          },
        },
        '.bg-radial-gradient': {
          background: `radial-gradient(50% 50% at 50% 50%, #7E5EFF 0%, rgba(205, 3, 255, 0.60) 100%);`,
          mixBlendMode: 'lighten',
          filter: 'blur(47px)',
          opacity: 0.4,
        },
        '.bg-radial-gradient-violet': {
          background: `radial-gradient(50% 50% at 50% 50%, #999DFF 18%, #BF8BFF 61%);`,
          mixBlendMode: 'lighten',
          filter: 'blur(47px)',
          opacity: 0.4,
        },
        '.bg-radial-gradient-blue': {
          background: `radial-gradient(50% 50% at 50% 50%, #7977FF 0%, #78E3D2 90%);`,
          mixBlendMode: 'lighten',
          filter: 'blur(47px)',
          opacity: 0.4,
        },
        '.bg-radial-custom': {
          background: `radial-gradient(50% 50% at 50% 50%, #7E5EFF 0%, rgba(126, 94, 255, 0.61) 100%)`,
          mixBlendMode: 'lighten',
          filter: 'blur(100px)',
          opacity: 0.4,
        },
        '.bg-radial-gradient-blueLight': {
          background: `radial-gradient(50% 50% at 50% 50%, #4B68FF 0%, rgba(75, 93, 255, 0.00) 100%);`,
          mixBlendMode: 'plus-lighter',
          filter: 'blur(100px)',
          opacity: 0.6,
        },
        '.bg-radial-gradient-violetLight': {
          background: `radial-gradient(65.91% 42.61% at 41.2% 58.31%, #4B7EFF 0%, #7E5EFF 100%);`,
          mixBlendMode: 'plus-lighter',
          filter: 'blur(100px)',
          opacity: 0.5,
        },
        '.bg-radial-gradient-pink': {
          background: `radial-gradient(65.91% 42.61% at 41.2% 58.31%, #7E5EFF 0%, rgba(205, 3, 255, 0.60) 100%);`,
          mixBlendMode: 'plus-lighter',
          filter: 'blur(100px)',
          opacity: 0.5,
        },
        '.player-bg-gradient': {
          background: `linear-gradient(to top, ${
            theme('colors')['dashboard-button-dark']
          } 0%, transparent 50%)`,
        },
        '.grid-dashboard': {
          gridTemplateColumns: '1fr',
          gridTemplateRows: '100px 1fr',
          '@media screen and (min-width: 768px)': {
            columnGap: '35px',
            rowGap: '12px',
            gridTemplateColumns:
              '[sidebar-start] 200px [sidebar-end content-start] 1fr [content-end]',
            gridTemplateRows: 'auto',
          },
          '@media screen and (min-width: 1024px)': {
            columnGap: '55px',
            gridTemplateColumns:
              '[sidebar-start] 258px [sidebar-end content-start] 1fr [content-end]',
          },
        },
        '.grid-modify-video': {
          gridTemplateColumns: '1fr',
          gap: '40px',
          '@media screen and (min-width: 768px)': {
            gap: '55px',
            gridTemplateColumns:
              '[main-start] 50px [inner-start sidebar-start] 190px [sidebar-end content-start] 1fr [content-end inner-end] 50px [main-end]',
            gridAutoRows: 'max-content',
            gap: 0,
          },
        },
        '.grid-month': {
          gridTemplateColumns: 'repeat(7, max-content)',
          rowGap: '12px',
          columnGap: '0',
        },
        '.grid-quote-files': {
          gridTemplateColumns: '1.3fr 1fr',
          gridAutoRows: '100px',
          gap: '2px',
        },
        '.no-widget': {
          '&::-webkit-calendar-picker-indicator': {
            display: 'none!important',
          },
        },
        '.toaster': {
          '> div': {
            justifyContent: 'center !important',
            '@media screen and (min-width: 768px)': {
              justifyContent: 'start !important',
            },
          },
        },

        //v0
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
          },
        },
        '.gradient-menu-mobile': {
          background: `
            radial-gradient(100% 30% at 0 0, rgba(55, 11, 78, 0.8) 0%, rgba(205, 3, 255, 0.0) 100%),
            radial-gradient(50% 40% at 20%, rgba(75, 93, 255, .2) 0%, rgba(75, 93, 255, .1) 60%, rgba(75, 93, 255, 0.00) 100%)
          `,
          opacity: '1',
        },
        '.gradient-dark-transparent': {
          background: `linear-gradient(-90deg, rgba(1, 3, 4, 0.00) 0%, ${theme(
            'colors.black'
          )} 50%)`,
        },
        '.gradient-to-top-black-transparent': {
          background:
            'linear-gradient(180deg, rgba(1, 3, 4, 0.00) 0%, #010304 100%)',
        },
        '.gradient-white-transparent': {
          background: `linear-gradient(var(--linear-orientation, 0deg), ${theme(
            'colors.borderWhite'
          )} 0%, rgba(252, 252, 252, 0.00) 100%)`,
        },
        '.gradient-faq': {
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.35) 100%), url("/img/pattern.png")',
        },
        '.gradient-pastel': {
          background: `linear-gradient(270deg, #c985fe 6.21%, #999dff 103.42%);`,
        },
        '.gradient-about-1': {
          background: `radial-gradient(closest-side at 0 0, #4B68FF 0%, rgba(75, 93, 255, 0.00) 100%)`,
        },
        '.gradient-about-2': {
          background: `radial-gradient(closest-side at 0 0, #4B68FF 0%, rgba(255, 183, 75, 0.00) 100%)`,
        },
        '.gradient-chart': {
          background: `linear-gradient(183deg, #C985FE 1.57%, #999DFF 76.22%)`,
        },
        '.gradient-text': {
          background: 'linear-gradient(270deg, #c985fe 6.21%, #999dff 103.42%)',
        },
        '.gradient-svg-linear': {
          '*[fill]': {
            fill: 'url(/icons/gradients.svg#linear-gradient)',
          },
          '*[stroke]': {
            stroke: 'url(/icons/gradients.svg#linear-gradient)',
          },
        },
        '.bg-signin': {
          background: `radial-gradient(50.00% 50.00% at 50.00% 50.00%, #7E5EFF 0%, rgba(126, 94, 255, 0.61) 100%)`,
          mixBlendMode: 'lighten',
          filter: 'blur(107px)',
          opacity: 0.15,
        },
        '.bg-pattern-linear-top': {
          backgroundImage:
            'linear-gradient(to bottom,rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 100%), url("/img/pattern.png")',
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
            backgroundImage: `linear-gradient(120deg, ${theme(
              'colors.alphaWhite.200'
            )} 0%, ${theme('colors.alphaWhite.50')} 100%);`,
          },
        },
        '.no-scroll-bar': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.input-text': {
          transition: 'border-color 0.3s',
          '&:hover, &:focus': {
            borderColor: theme('colors')['primary-middle'],
          },
        },
        '.simple-link': {
          '--tw-text-opacity': 0.4,
          '&:hover': {
            '--tw-text-opacity': 1,
          },
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
          },
        },
        '.hide-search-input-reset': {
          /* clears the ‘X’ from Internet Explorer */
          '&::-ms-clear': {
            display: 'none',
            width: 0,
            height: 0,
          },
          '&::-ms-reveal': {
            display: 'none',
            width: 0,
            height: 0,
          },
          /* clears the ‘X’ from Chrome */
          '&::-webkit-search-decoration': { display: 'none' },
          '&::-webkit-search-cancel-button': { display: 'none' },
          '&::-webkit-search-results-button': { display: 'none' },
          '&::-webkit-search-results-decoration': { display: 'none' },
        },
      })
    }),
  ],
}
