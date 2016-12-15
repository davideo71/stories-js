'use strict';

const { app, BrowserWindow } = require('electron');
const config = require('../config');
const { store, actions } = require('../reducers/index');

const WIN_WIDTH = 800;
const WIN_HEIGHT = 600;
const OSX_QUIT_ON_WINDOW_CLOSE = true;

// keep a global reference of the window object, otherwise it will be closed as soon as the gc cleans it
let mainWindow;


console.info(`***** Stories (env mode: ${config.environment}) *****`);

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: WIN_WIDTH, height: WIN_HEIGHT });
  mainWindow.loadURL(`file://${__dirname}/../html/index.html`);

  mainWindow.webContents.openDevTools();  // open the devtools

  mainWindow.on('closed', () => {
    // dereference the window object so it can be cleaned by gc
    mainWindow = null;
  });



  // ===== TEST redux store
  const unsubscribe = store.subscribe(() => {
    console.log(`>>>M store changed: ${JSON.stringify(store.getState())}`);
  });

  // delay these dispatches a bit, so the renderer can catch them too
  setTimeout(() => {
    store.dispatch(actions.setBackgroundColor(0xFFFF00));
    store.dispatch(actions.setBackgroundColor(0x00FF00));
    store.dispatch(actions.createNode({ name: 'ONE' }));
    store.dispatch(actions.createNode({ name: 'TWO' }));
    store.dispatch(actions.createNode({ name: 'THREE' }));
    store.dispatch(actions.deleteNode(1));
    store.dispatch(actions.updateNode(0, { size: [100, 100] }));

    store.dispatch(actions.setBackgroundColor(9876543210));
  }, 3000);

  unsubscribe();
  // ===== /TEST



};

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
