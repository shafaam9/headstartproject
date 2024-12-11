//hello world

const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'cute.png'),
  });

  win.loadFile('index.html');

  
  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  
  const trayIconPath = path.join(__dirname, 'cute.png');
  const tray = new Tray(trayIconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open ToDo List', click: () => createWindow() },
    { label: 'Quit', click: () => app.quit() }
  ]);
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    createWindow();
  });
});


ipcMain.on('close-app', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
