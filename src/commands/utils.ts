import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

/**
 * Resolves a path to an absolute path.
 * If the path is already absolute, returns it as is.
 * If the path is relative, resolves it relative to the workspace folder.
 */
export function resolvePath(p: string): string {
  if (!p) return ''
  if (path.isAbsolute(p)) return p
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
  return workspaceFolder ? path.join(workspaceFolder, p) : p
}

/**
 * Reads a template file from the given path.
 * Returns null if the file doesn't exist or cannot be read.
 */
export function readTemplateFile(maybePath: string): string | null {
  if (!maybePath) return null
  const abs = resolvePath(maybePath)
  try {
    if (abs && fs.existsSync(abs)) {
      return fs.readFileSync(abs, 'utf8')
    }
  } catch {
    // ignore and fallback to inline template
  }
  return null
}
