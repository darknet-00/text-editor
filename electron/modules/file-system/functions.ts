import { app, BrowserWindow, dialog } from 'electron'
import { getAllFilesRecursively, getSingleFile } from './utils'
import { readFileSync } from 'fs'

export const handleFileOpen = async (
  mainWindow: BrowserWindow,
  isDirectory?: boolean
) => {
  const responseEventName = isDirectory ? 'fs:directory-open' : 'fs:file-open'

  const {
    canceled,
    filePaths: [filePath],
  } = await dialog.showOpenDialog(mainWindow, {
    defaultPath: app.getAppPath(),
    properties: [isDirectory ? 'openDirectory' : 'openFile', 'createDirectory'],
  })

  if (canceled) {
    return
  }

  const allFilesInDirectory = isDirectory
    ? await getAllFilesRecursively(filePath)
    : await getSingleFile(filePath)

  mainWindow.webContents.send(responseEventName, allFilesInDirectory)
  return filePath
}

export const readFileFromPath = (
  mainWindow: BrowserWindow,
  filePath: string
) => {
  const file = readFileSync(filePath, { encoding: 'utf-8' })

  mainWindow.webContents.send('fs:read-file', file)

  return file
}
