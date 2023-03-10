import { IFile, IFileStructure, useFileSystemStore } from '../store'

export const useLoadFilesystemIpcListeners = () => {
  const { setDirectory: setFiles, setSingleFile } = useFileSystemStore()
  window.electronFs.onOpenDirectory((_, files: IFileStructure) => {
    setFiles(files)
  })

  window.electronFs.onOpenFile((_, file: IFile) => {
    setSingleFile(file)
  })
}
