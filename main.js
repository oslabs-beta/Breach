"use strict";

// Import parts of electron to use
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

const { ipcMain } = require("electron");

const Store = require("electron-store");

const store = new Store();

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

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  dev = true;
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
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

  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      //change back to "dist" and "index.html" after webpack rebuild or for production build
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  // setTimeout(() => mainWindow.loadURL(indexPath), 10000);
  mainWindow.loadURL(indexPath);

  // ipc testing

  // recieves an arg obj from OpenSelect.js, tests it for digits in the arg. If none then it's given the name theme, else it's named fontSize

  ipcMain.on("asynchronous-message", (event, arg) => {
    //console.log(arg, arg.value); // prints var sent from front end

    const regex = /\d/g;

    if (regex.test(arg.value)) {
      arg.name = "fontSize";
    } else {
      arg.name = "theme";
    }
    console.log("102 ", arg);

    store.set(arg.name, arg.value);

    event.reply("asynchronous-reply", "pong");
  });

  console.log("109 ", store.store);

  // console.log(mainWindow.webContents.getURL());

  //themes 


  const dark = {
    palette: {
      type: 'dark',
    },
  }

  const light = {
    palette: {
      type: 'light',
    },
  }

  store.set('dark', dark);

  store.set('light', light);

  console.log("light and dark ", store.store)



  ipcMain.on("load-data", function (event, arg) {
    mainWindow.webContents.send("data-reply", store.store);
  });

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (dev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
