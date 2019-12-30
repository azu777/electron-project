const {app, BrowserWindow, session, webContents} = require('electron')
let mainWindow

// Creating a new BrowserWindow when 'app' is ready
function createWindow() { // Renderer of Chromium window

  const ses = session.defaultSession
  console.log(ses)

  const getCookies = async () => {
    const cookies = await ses.cookies.get({name: 'cookie1'})
    console.log(cookies)
    return cookies
  }

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {nodeIntegration: true}
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  // mainWindow.loadURL('https://github.com')

  async function removeCookies() {
    await ses.cookies.remove('https://myappdomain.com', 'cookie1')
    await getCookies()
  }
  removeCookies()

  // const cookie = {url: 'https://myappdomain.com', name: 'cookie1', value: 'electron', expirationDate: 2408847516}

  // const setCookie = async () => {
  //   await ses.cookies.set(cookie)
  //   console.log('cookie1 set')
  //   await getCookies()
  // }
  // setCookie()

  // mainWindow.webContents.on('did-finish-load', async e => {
  //   console.log('LOADED')
  //   await getCookies()
  // })

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

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
