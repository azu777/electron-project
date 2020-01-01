const {app, BrowserWindow, session} = require('electron')
let mainWindow

// Creating a new BrowserWindow when 'app' is ready
function createWindow() { // Renderer of Chromium window

  const ses = session.defaultSession

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {nodeIntegration: true}
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  // mainWindow.loadURL('https://github.com')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  ses.on('will-download', (e, downloadItem, webContents) => {

    let fileName = downloadItem.getFilename()
    let fileSize = downloadItem.getTotalBytes()

    // save to desktop
    downloadItem.setSavePath(app.getPath('desktop') + `/${fileName}`)

    downloadItem.on('updated', (e, state) => {

      let received = downloadItem.getReceivedBytes()

      if (state === 'progressing' && received) {
        let progress = Math.round((received / fileSize) * 100)
        webContents.executeJavaScript(`window.progress.value = ${progress}`)
      }
    })
  })

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
