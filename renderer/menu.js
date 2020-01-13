const {remote} = require('electron')

// Menu template
const template = [
  {
    lable: 'Items',
    submenu: []
  },
  {
    role: 'editMenu'
  },
  {
    role: 'windowMenu'
  },
  {
    role: 'help',
    submenu: [
      {
        lable: 'Learn more',
        click: () => {
          shell.openExternal('https://github.com/stackacademy/tv/master-electron')
        }
      }
    ]
  }
]

// Set Mac-specific first menu item
if (process.platform === 'darvin') {

  template.unshift({
    lable: remote.app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services'},
      {type: 'separator'},
      {role: 'hide'},
      {type: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })
}

// Build menu
const menu = remote.Menu.buildFromTemplate(template)

// Set as main app menu
remote.Menu.setApplicationMenu(menu)
