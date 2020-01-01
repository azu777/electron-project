const {app, BrowserWindow, Menu, MenuItem} = require('electron')

let mainWindow

let mainMenu = Menu.buildFromTemplate(require('./mainMenu'))

// Creating a new BrowserWindow when 'app' is ready
function createWindow() { // Renderer of Chromium window

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {nodeIntegration: true}
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  Menu.setApplicationMenu(mainMenu)

  // Listen for window being closed
  mainWindow.on('closed', () => mainWindow = null)
}

// Electron 'app' is ready
app.on('ready', () => createWindow())

// app.on('browser-window-focus', () => console.log('App focused'))

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
