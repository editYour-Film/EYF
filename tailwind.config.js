import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"

import * as tokens from './theme.js';
import { themeColors } from './theme/colors.js';
import { themeGradients } from './theme/gradient.js';
import { themeTypography } from "./theme/typography.js";
import { themeGrids } from "./theme/grids.js";
import { themeEase } from "./theme/ease.js";

/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'checkmark': 'url(/icons/check-checkbox.svg)'
      },
      colors: themeColors,
      zIndex: {
        'header': 80,
        'panels': 81,
        'buttons': 85,
        'popup': 90,
        'cursor': 100,
        'transition': 200,
      },
      transformOrigin: {
        'top-left-90-90' : '90% 90%',
      },
      transitionTimingFunction: themeEase,
      screens: {
        'fullHd' : '1920px',
        'regularH': { 'raw': '(min-height: 750px))' }
      },
      spacing: {
        'dashboard-button-separation-spacing': tokens.dashboard_button_separation_spacing,
        'dashboard-mention-padding-right-left': tokens.dashboard_mention_padding_right_left,
        'dashboard-mention-padding-top-bottom': tokens.dashboard_mention_padding_top_bottom,
        'dashboard-spacing-element-medium': tokens.dashboard_spacing_element_medium,
        'DashboardPaddingNul': tokens.padding_DashboardPaddingNul,
        'dashboard-specific-radius' : tokens.dashboard_specific_radius,
        'padding-medium': tokens.padding_medium,
        'navbar-h': '50px'
      },
      borderWidth: {
        DEFAULT: tokens.dashboard_border_width_button_default,
        '03': '0.33px',
        '05': '0.5px',
        'dashboard-border-width-button-default': tokens.dashboard_border_width_button_default
      },
      borderRadius: {
        //v1
        'dashboard-mention-radius': tokens.dashboard_mention_radius,
        'dashboard-button-square-radius' : tokens.dashboard_button_square_radius,
        'dashboard-button-separation-spacing': tokens.dashboard_button_separation_spacing,
        'dashboard-specific-radius' : tokens.dashboard_specific_radius,
        'dashboard-medium-radius' : tokens.dashboard_medium_radius,
        'dashboard-large-radius' : tokens.dashboard_large_radius,
        '4xl' : '40px'
      },
      fontSize: {
        DEFAULT: [tokens.text_base, tokens.lh_default],
      },
      fontFamily: {
        DEFAULT: tokens.font_default,
        'text': tokens.font_text,
        'title': tokens.font_title
      },
      keyframes: {
        'toast-in': {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        'toast-out': {
          '0%': { transform: 'translateY(0px)', opacity: 1 },
          '100%': { transform: 'translateY(-20px)', opacity: 0 },
        }
      },
      borderColor: ({theme}) => ({
        DEFAULT: theme('colors.soyMilk')[200],

        // Strokes
        'dashboard-button-dark-border': tokens.dashboard_button_dark_border,
        'dashboard-button-focus-stroke': tokens.dashboard_button_focus_stroke,
        'dashboard-button-stroke-default': tokens.dashboard_button_stroke_default,
        'dashboard-button-stroke-disabled': tokens.dashboard_button_stroke_disabled,
        'dashboard-button-stroke-hover': tokens.dashboard_button_stroke_hover,
        'dashboard-separator-white-low-opacity': tokens.dashboard_separator_white_low_opacity,
      })
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.perspective': {
          'perspective': '1000px',
        },
        '.perspective-1': {
          'perspective': '1500px',
        },
        '.shadow-large' : {
          boxShadow: `0px 6px 24px 0px rgba(0, 0, 0, 0.65), 0px 4px 4px 0px rgba(0, 0, 0, 0.55), 0px 0px 44px 0px rgba(0, 0, 0, 0.32);`
        },
        '.shadow-1' : {
          boxShadow: `0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.12);`
        },
        '.shadow-text' : {
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.45);'
        }
      })
    }),
    plugin(function({ matchUtilities }){
      matchUtilities({
        'linear-orientation': (value) => ({
          '--linear-orientation': value,
        }),
      },
      { values: {
        0: '0deg',
        90: '90deg',
        180: '180deg',
        270: '270deg',
      }}),
      matchUtilities({
        'gradient-start': (value) => ({
          '--gradient-start': value,
        }),
      }),
      matchUtilities({
        'gradient-end': (value) => ({
          '--gradient-end': value,
        }),
      })
    }),
    plugin(function({matchComponents, theme}) {
      matchComponents({
          'svg-color': (value) => ({
            '*[fill]': {
              fill: value
            },
            '*[stroke]': {
              stroke: value
            },
          }),
        },
        { 
          values: flattenColorPalette(theme('colors'))
        },
      )
    }),
    plugin(function({addComponents, theme}) {
      addComponents({
        ...themeTypography,
        ...themeGradients,
        ...themeGrids,
        '.visually-hidden' : {
          opacity: 0,
          width: 0,
          height: 0
        },
        '.form-separator' : {
          display: 'none',
          '@media screen and (min-width: 640px)': {
            display: 'block',
            width: '100%',
            borderWidth: 0.5,
          }
        },
        '.no-widget': {
          '&::-webkit-calendar-picker-indicator': {
            display: 'none!important',
          }
        },
        '.toaster' : {
          '> div' : {
            justifyContent: 'center !important',
            '@media screen and (min-width: 768px)': {
              justifyContent: 'start !important',
            }
          }
        },
        '.bottom-inOutSpread' : {
          display: 'block',
          '&:after' : {
            content: '""',
            position: 'absolute',
            display: 'block',
            borderBottom : `1px solid ${theme('colors')['soyMilk']['DEFAULT']}`,
            bottom: '0',
            left: '0',
            width: '100%',
            transform: 'scaleX(0)',
            transformOrigin: 'center',
            transition: 'transform 0.5s 0s cubic-bezier(0, 0.98, 0.51, 0.93)'
          },
          '&:hover' : {
            '&:after' : {
              transform: 'scaleX(1)'
            }
          }
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
        '.bg-pattern': {
          backgroundImage: 'url("/img/pattern.png")'
        },
        '.bg-brightness-dark': {
          ':after' : {
            content: "",
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.4)',
          }
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
