'use strict';

const {app, BrowserWindow} = require('electron'); /* eslint object-curly-spacing: 0 */
const store = require('./reducers/index.js');

const WIN_WIDTH = 800;
const WIN_HEIGHT = 600;
const OSX_QUIT_ON_WINDOW_CLOSE = true;

// keep a global reference of the window object, otherwise it will be closed as soon as the gc cleans it
let mainWindow;

const createWindow = () => {



  // ===== TEST redux store
  store.subscribe(() => {
    console.log(`>>> store changed: ${JSON.stringify(store.getState())}`);
  });
  store.dispatch({ type: 'SET_BACKGROUND_COLOR', payload: 0xFFFF00 });
  store.dispatch({ type: 'SET_BACKGROUND_COLOR', payload: 0x00FF00 });

  let nodeIdCounter = 0;
  store.dispatch({ type: 'NODE_CREATE', payload: { name: 'ONE', id: nodeIdCounter++ } });
  store.dispatch({ type: 'NODE_CREATE', payload: { name: 'TWO', id: nodeIdCounter++ } });
  store.dispatch({ type: 'NODE_CREATE', payload: { name: 'THREE', id: nodeIdCounter++ } });
  store.dispatch({ type: 'NODE_DELETE', payload: 1 });
  store.dispatch({ type: 'NODE_UPDATE', payload: { id: 0, size: [100, 100] } });
  // ===== /TEST



  mainWindow = new BrowserWindow({ width: WIN_WIDTH, height: WIN_HEIGHT });
  mainWindow.loadURL(`file://${__dirname}/../html/index.html`);

  // mainWindow.webContents.openDevTools();  // open the devtools

  mainWindow.on('closed', () => {
    // dereference the window object so it can be cleaned by gc
    mainWindow = null;
  });
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
