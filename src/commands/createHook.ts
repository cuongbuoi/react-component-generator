import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import { DEFAULT_HOOK_TEMPLATE } from '../constants/template'
import { readTemplateFile } from './utils'

/**
 * Command handler for creating a React hook
 */
export async function createHook(uri: vscode.Uri): Promise<void> {
  // Get the path of the selected folder
  const folderPath = uri.fsPath

  // Show input box to enter hook name
  const hookName = await vscode.window.showInputBox({
    prompt: 'Enter React Hook name',
    placeHolder: 'Example: useCustomHook',
    validateInput: (value) => {
      if (!value) {
        return 'Hook name cannot be empty'
      }
      if (!/^use[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return 'Hook name must start with "use" followed by a capital letter and contain only letters and numbers'
      }
      return null
    }
  })

  if (!hookName) {
    return
  }

  try {
    // Read configuration
    const config = vscode.workspace.getConfiguration('reactComponentBuilderToolkit')
    const hookFileExtension = (config.get<string>('hookFileExtension') || 'ts').trim()
    const hookTemplatePath = (config.get<string>('hookTemplatePath') || '').trim()

    const hookTemplateFromFile = readTemplateFile(hookTemplatePath)

    const hookTemplate = hookTemplateFromFile ?? config.get<string>('hookTemplate') ?? DEFAULT_HOOK_TEMPLATE

    // Prepare contents by replacing placeholders
    const replaceName = (tpl: string) => tpl.replace(/\{HookName\}/g, hookName)

    const hookContent = replaceName(hookTemplate)

    // Write hook file with configured extension
    const hookFilePath = path.join(folderPath, `${hookName}.${hookFileExtension}`)

    // Check if file already exists
    if (fs.existsSync(hookFilePath)) {
      vscode.window.showErrorMessage(`File ${hookName}.${hookFileExtension} already exists!`)
      return
    }

    fs.writeFileSync(hookFilePath, hookContent)

    // Show success message
    vscode.window.showInformationMessage(`Hook ${hookName} has been created successfully!`)

    // Open hook file
    const document = await vscode.workspace.openTextDocument(hookFilePath)
    await vscode.window.showTextDocument(document)
  } catch (error) {
    vscode.window.showErrorMessage(`Error creating hook: ${error}`)
  }
}

