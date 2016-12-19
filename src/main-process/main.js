'use strict';

const { app, BrowserWindow } = require('electron');

const rootRequire = require('app-root-path').require;
const config = rootRequire('/config');
const { version } = rootRequire('/package.json');
const { store, actions } = require('../reducers/');

const WIN_WIDTH = 800;
const WIN_HEIGHT = 600;
const OSX_QUIT_ON_WINDOW_CLOSE = true;

// keep a global reference of the window object, otherwise it will be closed as soon as the gc cleans it
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: WIN_WIDTH, height: WIN_HEIGHT });
  mainWindow.loadURL(`file://${__dirname}/../html/index.html`);

  mainWindow.webContents.openDevTools();  // open the devtools

  mainWindow.on('closed', () => {
    // dereference the window object so it can be cleaned by gc
    mainWindow = null;
  });
};


console.info(`***** Stories ${version} (env mode: ${config.environment}) *****`);

// Called when electron is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd+Q.
  if (process.platform !== 'darwin' || OSX_QUIT_ON_WINDOW_CLOSE) {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
