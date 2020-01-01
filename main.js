const {app, BrowserWindow, dialog} = require('electron')

let mainWindow

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

  mainWindow.webContents.on('did-finish-load', async () => {

    // await dialog.showOpenDialog({
    //   buttonLabel: 'Select a photo',
    //   defaultPath: app.getPath('desktop'),
    //   properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
    // }).then(filepaths => console.log(filepaths))
    // await dialog.showSaveDialog({}).then(__filename => console.log(__filename))

    const answers = ['Yes', 'No', 'Maybe']
    await dialog.showMessageBox({
      title: 'Message Box',
      message: 'Please select an option',
      detail: 'Message details.',
      buttons: answers
    }).then(response => console.log(answers[response.response]))
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
