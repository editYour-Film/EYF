import * as tokens from '../theme.js';

const themeColors = {
  // v1
  'appleRed' : {
    DEFAULT: tokens.base_Edy_appleRed,
    200: tokens.base_Edy_appleRed_200
  },
  'blackBerry' : {
    DEFAULT: tokens.base_Edy_blackBerry,
    300: tokens.base_Edy_blackBerry_300,
    500: tokens.base_Edy_blackBerry_500,
    900: tokens.base_Edy_blackBerry_900,
  },
  'blueBerry' : tokens.base_Edy_blueBerry,
  'soyMilk' : {
    DEFAULT: tokens.base_Edy_soyMilk,
    40: tokens.base_Edy_soyMilk_40,
    100: tokens.base_Edy_soyMilk_100,
    200: tokens.base_Edy_soyMilk_200,
    500: tokens.base_Edy_soyMilk_500
  },
  'neutral': {
    '01': '#B2B2B2',
    '02': '#777777'
  },
  'dashboard-success-dark': tokens.dashboard_success_dark,
  'dashboard-success': tokens.dashboard_success,
  'dashboard-warning': tokens.dashboard_warning,

  // Backgrounds
  'dashboard-button-island-BlueBerry-default' : tokens.dashboard_button_island_BlueBerry_default,
  'dashboard-button-island-disabled' : tokens.dashboard_button_island_disabled,
  'dashboard-button-island-hover' : tokens.dashboard_button_island_hover,
  'dashboard-button-white-default' : tokens.dashboard_button_white_default,
  'dashboard-button-white-default-solid' : tokens.dashboard_button_white_default_solid,
  'dashboard-button-white-hover' : tokens.dashboard_button_white_hover,

  'dashboard-background-content-area' : tokens.dashboard_background_content_area,
  'dashboard-button-alert' : tokens.dashboard_button_alert,
  'dashboard-button-dark' : tokens.dashboard_button_dark,

  // Texts
  'dashboard-text-button-white-contrast-low': tokens.dashboard_text_button_white_contrast_low,
  'dashboard-text-description-base': tokens.dashboard_text_description_base,
  'dashboard-text-description-base-low': tokens.dashboard_text_description_base_low,
  'dashboard-text-disabled': tokens.dashboard_text_disabled,
  'dashboard-text-title-white-high': tokens.dashboard_text_title_white_high,

  // Icons
  'dashboard-icon-color-default': tokens.dashboard_icon_color_default,
  
  //Article Category
  'edit': {
    DEFAULT: '#E3E178',
    dark:'#323325'
  },
  'partnership': {
    DEFAULT: '#A878E3',
    dark: tokens.dashboard_button_island_disabled
  },
  'filming': {
    DEFAULT: '#7B8E8B',
    dark:'#202726'
  },
  'social-networks': {
    DEFAULT: '#E39778',
    dark:'#372621'
  },
  'television': {
    DEFAULT: '#78E3D2',
    dark:'#273F3C'
  },

  // v0
  'darkgrey': 'rgb(26, 28, 29)',
  'primary-middle': '#787296',
  'background-card': '#0e0e0f',
  'base-text': 'rgba(155, 159, 186, 1)',
  'error': 'rgba(239, 68, 68, 1)',
  'error-bg': 'rgba(127, 29, 29, 0.4)'
}

export {themeColors}