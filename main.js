'use strict';

// Import parts of electron to use
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const { ipcMain } = require('electron');

const Store = require('electron-store');

const store = new Store();

const webScrape = require('./puppeteer');

//Attempt at hot reloading
// if (process.env.NODE_ENV === "development") {
//   try {
//     require("electron-reloader")(module, {
//       debug: true,
//       watchRenderer: true,
//     });
//   } catch (_) {
//     console.log("Error");
//   }
// }

//local storage working

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
  dev = true;
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      //change back to "dist" and "index.html" after webpack rebuild or for production build
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    });
  }

  // setTimeout(() => mainWindow.loadURL(indexPath), 10000);
  mainWindow.loadURL(indexPath);

  // ipc testing

  // recieves an arg obj from OpenSelect.js, tests it for digits in the arg. If none then it's given the name theme, else it's named fontSize

  // if (!store.get("theme")) store.set('theme', light)

  ipcMain.on('asynchronous-message', (event, arg) => {

    // console.log(arg, arg.value); // prints var sent from front end
    if (typeof arg.value === 'number' && arg.value.toString().length === 1) {
      arg.name = 'historyLength'
    }
    else{
    const regex = /\d/g;

    if (regex.test(arg.value)) {
      arg.name = 'fontSize';
    } else {
      arg.name = 'theme';
    }
  }
    console.log(store.store)
    // console.log("102 ", arg);
    // console.log(parseInt(store.get("fontSize").slice(0, 2)))
    // console.log("what is store?: ", store.store)

    store.set(arg.name, arg.value);

    event.reply('asynchronous-reply', 'pong');
  });

  // console.log("109 ", store.store);

  // console.log(mainWindow.webContents.getURL());

  //themes
  if (!store.get('fontSize') || typeof store.get('fontSize') !== 'string') store.set('fontSize', '16px');
  console.log('line 123', store.get('fontSize'))
  const dark = {
    overrides: {
      MuiCssBaseline: {
        '@global': {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get('fontSize').slice(0, 2)),
          },
        },
      },
    },
    palette: {
      type: 'dark',
    },
  };

  const light = {
    overrides: {
      MuiCssBaseline: {
        '@global': {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get('fontSize').slice(0, 2)),
          },
        },
      },
    },
    palette: {
      type: 'light',
    },
  };

  const blue = {
    overrides: {
      MuiCssBaseline: {
        '@global': {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get('fontSize').slice(0, 2)),
          },
        },
      },
    },
    palette: {
      common: { black: 'rgba(0, 0, 0, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: {
        paper: 'rgba(25, 161, 200, 1)',
        default: 'rgba(42, 132, 157, 1)',
      },
      primary: {
        light: 'rgba(147, 159, 255, 1)',
        main: 'rgba(52, 72, 205, 1)',
        dark: 'rgba(1, 22, 155, 1)',
        contrastText: 'rgba(255, 255, 255, 1)',
      },
      secondary: {
        light: 'rgba(129, 182, 244, 1)',
        main: 'rgba(122, 178, 242, 1)',
        dark: 'rgba(0, 50, 110, 1)',
        contrastText: 'rgba(255, 255, 255, 1)',
      },
      error: {
        light: 'rgba(135, 188, 251, 1)',
        main: 'rgba(16, 64, 120, 1)',
        dark: 'rgba(22, 45, 73, 1)',
        contrastText: '#fff',
      },
      text: {
        primary: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(255, 255, 255, 1)',
        disabled: 'rgba(255, 255, 255, 1)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
    },
  };

  const purple = {
    overrides: {
      MuiCssBaseline: {
        '@global': {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get('fontSize').slice(0, 2)),
          },
        },
      },
    },
    palette: {
      common: { black: 'rgba(0, 0, 0, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: {
        paper: 'rgba(107, 12, 178, 1)',
        default: 'rgba(149, 115, 215, 1)',
      },
      primary: {
        light: 'rgba(156, 0, 220, 1)',
        main: 'rgba(112, 0, 193, 1)',
        dark: 'rgba(76, 1, 125, 1)',
        contrastText: 'rgba(255, 255, 255, 1)',
      },
      secondary: {
        light: 'rgba(181, 94, 222, 1)',
        main: 'rgba(72, 0, 150, 1)',
        dark: 'rgba(78, 0, 110, 1)',
        contrastText: 'rgba(255, 255, 255, 1)',
      },
      error: {
        light: 'rgba(135, 188, 251, 1)',
        main: 'rgba(174, 98, 244, 1)',
        dark: 'rgba(22, 45, 73, 1)',
        contrastText: '#fff',
      },
      text: {
        primary: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(255, 255, 255, 1)',
        disabled: 'rgba(255, 255, 255, 0.38)',
        hint: 'rgba(255, 255, 255, 0.38)',
      },
    },
  };

  const green = {
    overrides: {
      MuiCssBaseline: {
        '@global': {
          // MUI typography elements use REMs, so you can scale the global
          // font size by setting the font-size on the <html> element.
          html: {
            fontSize: parseInt(store.get('fontSize').slice(0, 2)),
          },
        },
      },
    },
    palette: {
      common: { black: 'rgba(0, 0, 0, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: {
        paper: 'rgba(0, 81, 51, 1)',
        default: 'rgba(35, 138, 112, 1)',
      },
      primary: {
        light: 'rgba(151, 254, 32, 1)',
        main: 'rgba(21, 87, 63, 1)',
        dark: 'rgba(44, 81, 4, 1)',
        contrastText: 'rgba(255, 255, 255, 1)',
      },
      secondary: {
        light: 'rgba(85, 255, 196, 1)',
        main: 'rgba(0, 97, 63, 1)',
        dark: 'rgba(0, 95, 63, 1)',
        contrastText: 'rgba(255, 255, 255, 1)',
      },
      error: {
        light: 'rgba(0, 255, 167, 1)',
        main: 'rgba(0, 203, 133, 1)',
        dark: 'rgba(0, 112, 73, 1)',
        contrastText: '#fff',
      },
      text: {
        primary: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(255, 255, 255, 1)',
        disabled: 'rgba(255, 255, 255, 0.38)',
        hint: 'rgba(255, 255, 255, 0.38)',
      },
    },
  };

  // recieves an arg obj from OpenSelect.js, tests it for digits in the arg. If none then it's given the name theme, else it's named fontSize
  if (!store.get("fontSize")) store.set("fontSize", "16px")


  ipcMain.on('load-data', function (event, arg) {
    // console.log('arg passed to load-data', arg.options[0])
    if (arg && typeof arg.options[0] === 'number') {
      mainWindow.webContents.send('data-reply', store.store);
      console.log('inside if statement')
    }
    else{
      console.log('inside else statement')
    if (store.get('fontSize') === null || store.get('fontSize') === undefined) {
      dark.overrides.MuiCssBaseline['@global'].html.fontSize = 16;
      light.overrides.MuiCssBaseline['@global'].html.fontSize = 16;
    }
    const dark = {
      overrides: {
        MuiCssBaseline: {
          '@global': {
            // MUI typography elements use REMs, so you can scale the global
            // font size by setting the font-size on the <html> element.
            html: {
              fontSize: parseInt(store.get('fontSize').slice(0, 2)),
            },
          },
        },
      },
      palette: {
        type: 'dark',
      },
    };

    const light = {
      overrides: {
        MuiCssBaseline: {
          '@global': {
            // MUI typography elements use REMs, so you can scale the global
            // font size by setting the font-size on the <html> element.
            html: {
              fontSize: parseInt(store.get('fontSize').slice(0, 2)),
            },
          },
        },
      },
      palette: {
        type: 'light',
      },
    };

    const blue = {
      overrides: {
        MuiCssBaseline: {
          '@global': {
            // MUI typography elements use REMs, so you can scale the global
            // font size by setting the font-size on the <html> element.
            html: {
              fontSize: parseInt(store.get('fontSize').slice(0, 2)),
            },
          },
        },
      },
      palette: {
        common: { black: 'rgba(0, 0, 0, 1)', white: 'rgba(255, 255, 255, 1)' },
        background: {
          paper: 'rgba(25, 161, 200, 1)',
          default: 'rgba(42, 132, 157, 1)',
        },
        primary: {
          light: 'rgba(147, 159, 255, 1)',
          main: 'rgba(52, 72, 205, 1)',
          dark: 'rgba(1, 22, 155, 1)',
          contrastText: 'rgba(255, 255, 255, 1)',
        },
        secondary: {
          light: 'rgba(129, 182, 244, 1)',
          main: 'rgba(122, 178, 242, 1)',
          dark: 'rgba(0, 50, 110, 1)',
          contrastText: 'rgba(255, 255, 255, 1)',
        },
        error: {
          light: 'rgba(135, 188, 251, 1)',
          main: 'rgba(16, 64, 120, 1)',
          dark: 'rgba(22, 45, 73, 1)',
          contrastText: '#fff',
        },
        text: {
          primary: 'rgba(255, 255, 255, 1)',
          secondary: 'rgba(255, 255, 255, 1)',
          disabled: 'rgba(255, 255, 255, 1)',
          hint: 'rgba(0, 0, 0, 0.38)',
        },
      },
    };

    const purple = {
      overrides: {
        MuiCssBaseline: {
          '@global': {
            // MUI typography elements use REMs, so you can scale the global
            // font size by setting the font-size on the <html> element.
            html: {
              fontSize: parseInt(store.get('fontSize').slice(0, 2)),
            },
          },
        },
      },
      palette: {
        common: { black: 'rgba(0, 0, 0, 1)', white: 'rgba(255, 255, 255, 1)' },
        background: {
          paper: 'rgba(107, 12, 178, 1)',
          default: 'rgba(149, 115, 215, 1)',
        },
        primary: {
          light: 'rgba(156, 0, 220, 1)',
          main: 'rgba(112, 0, 193, 1)',
          dark: 'rgba(76, 1, 125, 1)',
          contrastText: 'rgba(255, 255, 255, 1)',
        },
        secondary: {
          light: 'rgba(181, 94, 222, 1)',
          main: 'rgba(72, 0, 150, 1)',
          dark: 'rgba(78, 0, 110, 1)',
          contrastText: 'rgba(255, 255, 255, 1)',
        },
        error: {
          light: 'rgba(135, 188, 251, 1)',
          main: 'rgba(174, 98, 244, 1)',
          dark: 'rgba(22, 45, 73, 1)',
          contrastText: '#fff',
        },
        text: {
          primary: 'rgba(255, 255, 255, 1)',
          secondary: 'rgba(255, 255, 255, 1)',
          disabled: 'rgba(255, 255, 255, 0.38)',
          hint: 'rgba(255, 255, 255, 0.38)',
        },
      },
    };

    const green = {
      overrides: {
        MuiCssBaseline: {
          '@global': {
            // MUI typography elements use REMs, so you can scale the global
            // font size by setting the font-size on the <html> element.
            html: {
              fontSize: parseInt(store.get('fontSize').slice(0, 2)),
            },
          },
        },
      },
      palette: {
        common: { black: 'rgba(0, 0, 0, 1)', white: 'rgba(255, 255, 255, 1)' },
        background: {
          paper: 'rgba(35, 138, 112, 1)',
          default: 'rgba(35, 138, 112, 1)',
        },
        primary: {
          light: 'rgba(151, 254, 32, 1)',
          main: 'rgba(21, 87, 63, 1)',
          dark: 'rgba(44, 81, 4, 1)',
          contrastText: 'rgba(255, 255, 255, 1)',
        },
        secondary: {
          light: 'rgba(85, 255, 196, 1)',
          main: 'rgba(0, 97, 63, 1)',
          dark: 'rgba(0, 95, 63, 1)',
          contrastText: 'rgba(255, 255, 255, 1)',
        },
        error: {
          light: 'rgba(0, 255, 167, 1)',
          main: 'rgba(0, 203, 133, 1)',
          dark: 'rgba(0, 112, 73, 1)',
          contrastText: '#fff',
        },
        text: {
          primary: 'rgba(255, 255, 255, 1)',
          secondary: 'rgba(255, 255, 255, 1)',
          disabled: 'rgba(255, 255, 255, 0.38)',
          hint: 'rgba(255, 255, 255, 0.38)',
        },
      },
    };

    store.set('purple', purple);

    store.set('green', green);

    store.set('dark', dark);

    store.set('light', light);

    store.set('blue', blue);

    mainWindow.webContents.send('data-reply', store.store);
  }
  });

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (dev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require('electron-devtools-installer');

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log('Error loading React DevTools: ', err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('url', function (event, arg) {
  let test = {
    url: arg,
    cookieTest: false,
    JqueryTest: true
  }
  let history
  store.get('history') ? history = store.get('history') : history = []
  history.unshift(test)
  history.length >= 25 ? history.pop() : history
  // console.log(history)
  store.set('history', history)
  mainWindow.webContents.send('testOutput', test);
});

// ipcMain.on('history', function (event, arg) {
//   // console.log(store.get('history'))
//   mainWindow.webContents.send('historyOutput', store.get('history'))
// })

ipcMain.on('clearHistory', function (event, arg) {
  store.set('history', [])
  mainWindow.webContents.send('historyCleared', store.get('history'))
})

ipcMain.on('clearItem', function (event, arg) {
  let newHistory = store.get('history')
  newHistory.splice(arg, 1)
  store.set('history', newHistory)
  mainWindow.webContents.send('itemCleared', store.get('history'))
})

ipcMain.on('getHistoryLength', function (event, arg) {
  mainWindow.webContents.send('length', store.get('historyLength'))
})

// webScrape.jqueryXSS(
//   `https://xss-game.appspot.com/level1/frame?query=<script>+alert('')</script>`
// );

// webScrape.cookieTester(
//   `https://hack-yourself-first.com/Search?searchTerm=%27+%2B+alert%28%27yo%27%29+%2B+%27`
// );

// webScrape.cookieTester('https://juiceshopwolfpack.herokuapp.com/#/search?q=juice');

//https://hack-yourself-first.com/Search?searchTerm=%27+%2B+alert%28%27yo%27%29+%2B+%27

//`<img%20src%3D''%20onerror%3D'alert('dialogue')'>`
