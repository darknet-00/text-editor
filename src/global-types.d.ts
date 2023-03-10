import { IFile, IFileStructure } from './domains/file-system'

declare global {
  interface Window {
    electronFs: {
      onOpenDirectory: (
        callback: (event: any, files: IFileStructure) => void
      ) => void
      onOpenFile: (callback: (event: any, files: IFile) => void) => void
      readFile: (path: string) => Promise<string>
    }
    electronWs: {
      onConnect: (callback: (data) => void) => void
      onDisconnect: (callback: (data) => void) => void
      emit: (event: string, payload: any) => void
    }
  }
}
