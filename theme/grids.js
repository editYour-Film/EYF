const themeGrids = {
  '.grid-dashboard' : {
    gridTemplateColumns: '1fr',
    gridTemplateRows: '100px 1fr',
    '@media screen and (min-width: 768px)': {
      columnGap: '35px',
      rowGap: '12px',
      gridTemplateColumns: '[sidebar-start] 200px [sidebar-end content-start] 1fr [content-end]',
      gridTemplateRows: 'auto',
    },
    '@media screen and (min-width: 1024px)': {
      columnGap: '55px',
      gridTemplateColumns: '[sidebar-start] 258px [sidebar-end content-start] 1fr [content-end]',
    }
  },
  '.grid-modify-video' : {
    gridTemplateColumns: '1fr',
    gap: '40px',
    '@media screen and (min-width: 768px)': {
      gap: '55px',
      gridTemplateColumns: '[main-start] 50px [inner-start sidebar-start] 190px [sidebar-end content-start] 1fr [content-end inner-end] 50px [main-end]',
      gridAutoRows: 'max-content',
      gap: 0
    }
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
}

export {themeGrids}