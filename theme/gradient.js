import * as tokens from '../theme.js';
import {themeColors} from './colors'

const themeGradients = { 
  '.text-linear-sunset' : {
    background: `linear-gradient(var(--linear-orientation, 180deg), ${tokens.base_rose_sunset_blue} 38.45%, ${tokens.base_rose_sunset_violet} 93.75%);`,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    'background-clip': 'text',
    'text-fill-color': 'transparent',
    'transform': 'translateZ(0)',
  },
  '.bg-rose-sunset': {
    background: `linear-gradient(var(--linear-direction, 180deg), ${tokens.base_rose_sunset_blue} 38.45%, ${tokens.base_rose_sunset_violet} 93.75%);`
  },
  '.bg-radial-gradient': {
    background: `radial-gradient(50% 50% at 50% 50%, #7E5EFF 0%, rgba(205, 3, 255, 0.60) 100%);`,
    mixBlendMode: 'lighten',
    filter: 'blur(47px)',
    opacity: 0.4
  },
  '.bg-radial-gradient-violet': {
    background: `radial-gradient(50% 50% at 50% 50%, #999DFF 18%, #BF8BFF 61%);`,
    mixBlendMode: 'lighten',
    filter: 'blur(47px)',
    opacity: 0.4
  },
  '.bg-radial-gradient-blue': {
    background: `radial-gradient(50% 50% at 50% 50%, #7977FF 0%, #78E3D2 90%);`,
    mixBlendMode: 'lighten',
    filter: 'blur(47px)',
    opacity: 0.4
  },
  '.bg-radial-custom':{
    background: `radial-gradient(50% 50% at 50% 50%, #7E5EFF 0%, rgba(126, 94, 255, 0.61) 100%)`,
    mixBlendMode: 'lighten',
    filter: 'blur(100px)',
    opacity: 0.4
  },
  '.bg-radial-gradient-blueLight': {
    background: `radial-gradient(50% 50% at 50% 50%, #4B68FF 0%, rgba(75, 93, 255, 0.00) 100%);`,
    mixBlendMode: 'plus-lighter',
    filter: 'blur(100px)',
    opacity: 0.6
  },
  '.bg-radial-gradient-violetLight': {
    background: `radial-gradient(65.91% 42.61% at 41.2% 58.31%, #4B7EFF 0%, #7E5EFF 100%);`,
    mixBlendMode: 'plus-lighter',
    filter: 'blur(100px)',
    opacity: 0.5
  },
  '.bg-radial-gradient-pink': {
    background: `radial-gradient(65.91% 42.61% at 41.2% 58.31%, #7E5EFF 0%, rgba(205, 3, 255, 0.60) 100%);`,
    mixBlendMode: 'plus-lighter',
    filter: 'blur(100px)',
    opacity: 0.5
  },
  '.bg-radial-filter': {
    background: `radial-gradient(rgba(47, 35, 80, 0.66) 70%, rgba(47, 35, 80, 0) 150%)`
  },
  '.bg-editor-section' : {
    background: `radial-gradient(closest-side, rgba(47, 35, 80, 0.66) 0%, rgba(47, 35, 80, 0.66) 30%, rgba(205, 3, 255, 0) 100%)`,
    mixBlendMode: 'lighten'
  },
  '.player-bg-gradient': {
    background: `linear-gradient(to top, ${themeColors['dashboard-button-dark']} 0%, transparent 50%)`
  },
  '.bg-top-section' : {
    background: `radial-gradient(closest-side, rgba(126, 94, 255, 0.5) 0%, rgba(205, 3, 255, 0.5) 30%, rgba(205, 3, 255, 0) 100%)`,
    mixBlendMode: 'lighten',
  },
  '.bg-top-section-2' : {
    background: `radial-gradient(closest-side, rgba(75, 126, 255, 0.5) 0%,rgba(208, 75, 255, 0) 100%)`,
    mixBlendMode: 'lighten'
  },
  '.bg-step' : {
    background: `radial-gradient( 66.05% 64.79% at 42.29% 34.09%, #babbc0 0%, rgba(255, 183, 75, 0) 100% )`,
    filter: 'blur(69.547px)',
  },
  '.gradient-dark-transparent': {
    background: `linear-gradient(var(--linear-orientation, -90deg), rgba(1, 3, 4, 0.00) 0%, ${themeColors['blackBerry']['DEFAULT']} 50%)`,
  },
  '.gradient-black-transparent': {
    background: `linear-gradient(var(--linear-orientation, 180deg), rgba(1, 3, 4, 0.00) var(--gradient-start, 0%), ${themeColors['blackBerry']['DEFAULT']} var(--gradient-end, 100%))`,
  },
  '.gradient-to-top-black-transparent': {
    background: `linear-gradient(180deg, rgba(1, 3, 4, 0.00) 0%, ${themeColors['blackBerry']['DEFAULT']} 100%)`,
  },
  '.gradient-white-transparent' : {
    background: `linear-gradient(var(--linear-orientation, 0deg), ${themeColors['soyMilk'][200]} 0%, ${themeColors['soyMilk']} 100%)`,
  },
  '.gradient-faq': {
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.35) 100%), url("/img/pattern.png")'
  },
  '.gradient-about-1': {
    background: `radial-gradient(closest-side at 0 0, #4B68FF 0%, rgba(75, 93, 255, 0.00) 100%)`,
  },
  '.gradient-chart': {
    background: `linear-gradient(183deg, #C985FE 1.57%, #999DFF 76.22%)`,
  },
  '.bg-signin': {
    background: `radial-gradient(50.00% 50.00% at 50.00% 50.00%, #7E5EFF 0%, rgba(126, 94, 255, 0.61) 100%)`,
    mixBlendMode: 'lighten',
    filter: 'blur(107px)',
    opacity: 0.15
  },
}

export {themeGradients}