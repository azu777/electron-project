const {app, BrowserWindow, ipcMain} = require('electron')
const windowStateKeeper = require('electron-window-state')
const readItem = require('./readItem.js')

let mainWindow

// Listen for new item request
ipcMain.on('new-item', (e, itemUrl) => {

  // Get new item and send to renderer
  readItem(itemUrl, item => {
    e.sender.send('new-item-success', item)
  })
})

// Creating a new BrowserWindow when 'app' is ready
function createWindow() { // Renderer of Chromium window

  // Win state keeper
  let state = windowStateKeeper({
    defaultWidth: 500, defaultHeight: 650
  })

  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.width, height: state.height,
    minWidth: 350, maxWidth: 650, minHeight: 300,
    webPreferences: {nodeIntegration: true}
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('./renderer/main.html')

  // Manage new window state
  state.manage(mainWindow)

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  // Listen for window being closed
  mainWindow.on('closed', () => mainWindow = null)
}

// Electron 'app' is ready
app.on('ready', () => createWindow())

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== "darwin")
    app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null)
    createWindow()
})
