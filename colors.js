const Store = require("electron-store");

const store = new Store();

// const store = require("./main")

const dark = {
    overrides: {
      MuiCssBaseline: {
        "@global": {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get("fontSize").slice(0, 2)),
          }
        }}},
    palette: {
      type: 'dark',
    },
  }

  const light = {
    overrides: {
      MuiCssBaseline: {
        "@global": {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get("fontSize").slice(0, 2)),
          }
        }}},
    palette: {
      type: 'light',
    },
  }

  const blue = {
    overrides: {
      MuiCssBaseline: {
        "@global": {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get("fontSize").slice(0, 2)),
          }
        }}},
        palette:{"common":{"black":"rgba(0, 0, 0, 1)","white":"rgba(255, 255, 255, 1)"},"background":{"paper":"rgba(25, 161, 200, 1)","default":"rgba(42, 132, 157, 1)"},"primary":{"light":"rgba(147, 159, 255, 1)","main":"rgba(52, 72, 205, 1)","dark":"rgba(1, 22, 155, 1)","contrastText":"rgba(255, 255, 255, 1)"},"secondary":{"light":"rgba(129, 182, 244, 1)","main":"rgba(122, 178, 242, 1)","dark":"rgba(0, 50, 110, 1)","contrastText":"rgba(255, 255, 255, 1)"},"error":{"light":"rgba(135, 188, 251, 1)","main":"rgba(16, 64, 120, 1)","dark":"rgba(22, 45, 73, 1)","contrastText":"#fff"},"text":{"primary":"rgba(255, 255, 255, 1)","secondary":"rgba(255, 255, 255, 1)","disabled":"rgba(255, 255, 255, 1)","hint":"rgba(0, 0, 0, 0.38)"}}
  }

  const purple = {
    overrides: {
      MuiCssBaseline: {
        "@global": {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get("fontSize").slice(0, 2)),
          }
        }}},
        palette:{"common":{"black":"rgba(0, 0, 0, 1)","white":"rgba(255, 255, 255, 1)"},"background":{"paper":"rgba(107, 12, 178, 1)","default":"rgba(149, 115, 215, 1)"},"primary":{"light":"rgba(156, 0, 220, 1)","main":"rgba(112, 0, 193, 1)","dark":"rgba(76, 1, 125, 1)","contrastText":"rgba(255, 255, 255, 1)"},"secondary":{"light":"rgba(181, 94, 222, 1)","main":"rgba(72, 0, 150, 1)","dark":"rgba(78, 0, 110, 1)","contrastText":"rgba(255, 255, 255, 1)"},"error":{"light":"rgba(135, 188, 251, 1)","main":"rgba(174, 98, 244, 1)","dark":"rgba(22, 45, 73, 1)","contrastText":"#fff"},"text":{"primary":"rgba(255, 255, 255, 1)","secondary":"rgba(255, 255, 255, 1)","disabled":"rgba(255, 255, 255, 0.38)","hint":"rgba(255, 255, 255, 0.38)"}}
      }  

  const green = {
    overrides: {
      MuiCssBaseline: {
        "@global": {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get("fontSize").slice(0, 2)),
          }
        }}},
        palette:{"common":{"black":"rgba(0, 0, 0, 1)","white":"rgba(255, 255, 255, 1)"},"background":{"paper":"rgba(35, 138, 112, 1)","default":"rgba(35, 138, 112, 1)"},"primary":{"light":"rgba(151, 254, 32, 1)","main":"rgba(21, 87, 63, 1)","dark":"rgba(44, 81, 4, 1)","contrastText":"rgba(255, 255, 255, 1)"},"secondary":{"light":"rgba(85, 255, 196, 1)","main":"rgba(0, 97, 63, 1)","dark":"rgba(0, 95, 63, 1)","contrastText":"rgba(255, 255, 255, 1)"},"error":{"light":"rgba(0, 255, 167, 1)","main":"rgba(0, 203, 133, 1)","dark":"rgba(0, 112, 73, 1)","contrastText":"#fff"},"text":{"primary":"rgba(255, 255, 255, 1)","secondary":"rgba(255, 255, 255, 1)","disabled":"rgba(255, 255, 255, 0.38)","hint":"rgba(255, 255, 255, 0.38)"}}
      }

module.exports = { light, dark, blue, green, purple }