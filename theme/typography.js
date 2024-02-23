import * as tokens from '../theme.js';

const themeTypography = {
  //v1
  '.text-base' : {
    fontFamily: tokens.font_default.join(', '),
    fontSize: tokens.text_base,
    fontWeight: 400,
    letterSpacing: '-0.208px',
  },
  '.text-base-light' : {
    fontFamily: tokens.font_default.join(', '),
    fontSize: tokens.text_base,
    fontWeight: 400,
    letterSpacing: '-0.208px',
  },
  '.text-base-bold' : {
    fontFamily: tokens.font_default.join(', '),
    fontSize: tokens.text_small,
    fontWeight: 700,
    letterSpacing: '-0.208px',
  },
  '.text-small' : {
    fontFamily: tokens.font_default.join(', '),
    fontSize: tokens.text_small,
    fontWeight: 400,
    letterSpacing: '-0.084px',
    lineHeight: 1.35
  },
  '.text-medium' : {
    fontSize: tokens.text_medium,
    lineHeight: tokens.lh_default
  },
  '.text-large' : {
    fontFamily: tokens.font_default.join(', '),
    fontSize: tokens.text_large,
    fontWeight: 500,
    letterSpacing: '-0.456px',
  },
  '.text-title-M' : {
    fontFamily: tokens.font_title.join(', '),
    fontSize: tokens.title_m,
    fontWeight: 400,
    lineHeight: '27.398px',
    textTransform: 'uppercase',
  },
  '.text-title-large' : {
    fontFamily: tokens.font_title.join(', '),
    fontSize: tokens.title_large,
    fontWeight: 400,
    lineHeight: tokens.title_large_lineHeight,
    textTransform: 'uppercase',
    letterSpacing: '-0.48px',
  },
  '.text-title-medium' : {
    fontFamily: tokens.font_title.join(', '),
    fontSize: tokens.title_medium,
    fontWeight: 400,
    lineHeight: '97.85%',
    textTransform: 'uppercase',
  },
  '.text-title-small' : {
    fontFamily: tokens.font_title.join(', '),
    fontSize: tokens.title_small,
    fontWeight: 400,
    lineHeight: '200%',
    textTransform: 'uppercase',
  },
  '.dashboard-title': {
    fontFamily: 'n27',
    fontSize: '28px',
    textTransform: 'uppercase',
  },
  '.text-poster' : {
    fontSize: tokens.text_poster,
    fontWeight: 400,
    lineHeight: 1.1
  },
  '.n27': {
    fontFamily: '"N27", sans-serif',
  },
}

export {themeTypography}
