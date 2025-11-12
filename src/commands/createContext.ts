import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import { DEFAULT_CONTEXT_TEMPLATE } from '../constants/template'
import { readTemplateFile } from './utils'

/**
 * Command handler for creating a React context
 */
export async function createContext(uri: vscode.Uri): Promise<void> {
  // Get the path of the selected folder
  const folderPath = uri.fsPath

  // Show input box to enter context name
  const contextName = await vscode.window.showInputBox({
    prompt: 'Enter React Context name',
    placeHolder: 'Example: AuthContext',
    validateInput: (value) => {
      if (!value) {
        return 'Context name cannot be empty'
      }
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return 'Context name must start with a capital letter and contain only letters and numbers'
      }
      return null
    }
  })

  if (!contextName) {
    return
  }

  try {
    // Read configuration
    const config = vscode.workspace.getConfiguration('reactComponentBuilderToolkit')
    const contextFileExtension = (config.get<string>('contextFileExtension') || 'tsx').trim()
    const contextTemplatePath = (config.get<string>('contextTemplatePath') || '').trim()

    const contextTemplateFromFile = readTemplateFile(contextTemplatePath)

    const contextTemplate =
      contextTemplateFromFile ?? config.get<string>('contextTemplate') ?? DEFAULT_CONTEXT_TEMPLATE

    // Prepare contents by replacing placeholders
    const replaceName = (tpl: string) => tpl.replace(/\{ContextName\}/g, contextName)

    const contextContent = replaceName(contextTemplate)

    // Write context file with configured extension
    const contextFilePath = path.join(folderPath, `${contextName}.${contextFileExtension}`)

    // Check if file already exists
    if (fs.existsSync(contextFilePath)) {
      vscode.window.showErrorMessage(`File ${contextName}.${contextFileExtension} already exists!`)
      return
    }

    fs.writeFileSync(contextFilePath, contextContent)

    // Show success message
    vscode.window.showInformationMessage(`Context ${contextName} has been created successfully!`)

    // Open context file
    const document = await vscode.workspace.openTextDocument(contextFilePath)
    await vscode.window.showTextDocument(document)
  } catch (error) {
    vscode.window.showErrorMessage(`Error creating context: ${error}`)
  }
}

