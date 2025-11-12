import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import { DEFAULT_COMPONENT_TEMPLATE, DEFAULT_INDEX_TEMPLATE } from '../constants/template'
import { readTemplateFile } from './utils'

/**
 * Command handler for creating a React component
 */
export async function createComponent(uri: vscode.Uri): Promise<void> {
  // Get the path of the selected folder
  const folderPath = uri.fsPath

  // Show input box to enter component name
  const componentName = await vscode.window.showInputBox({
    prompt: 'Enter React Component name',
    placeHolder: 'Example: MyComponent',
    validateInput: (value) => {
      if (!value) {
        return 'Component name cannot be empty'
      }
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return 'Component name must start with a capital letter and contain only letters and numbers'
      }
      return null
    }
  })

  if (!componentName) {
    return
  }

  // Create new folder path
  const componentFolderPath = path.join(folderPath, componentName)

  // Check if folder already exists
  if (fs.existsSync(componentFolderPath)) {
    vscode.window.showErrorMessage(`Folder ${componentName} already exists!`)
    return
  }

  try {
    // Create folder
    fs.mkdirSync(componentFolderPath)

    // Read configuration
    const config = vscode.workspace.getConfiguration('reactComponentBuilderToolkit')
    const fileExtension = (config.get<string>('fileExtension') || 'tsx').trim()
    const createIndexFile = config.get<boolean>('createIndexFile') ?? true
    const componentTemplatePath = (config.get<string>('componentTemplatePath') || '').trim()
    const indexTemplatePath = (config.get<string>('indexTemplatePath') || '').trim()

    const componentTemplateFromFile = readTemplateFile(componentTemplatePath)
    const indexTemplateFromFile = readTemplateFile(indexTemplatePath)

    const componentTemplate =
      componentTemplateFromFile ?? config.get<string>('componentTemplate') ?? DEFAULT_COMPONENT_TEMPLATE

    const indexTemplate = indexTemplateFromFile ?? config.get<string>('indexTemplate') ?? DEFAULT_INDEX_TEMPLATE

    // Prepare contents by replacing placeholders
    const replaceName = (tpl: string) => tpl.replace(/\{ComponentName\}/g, componentName)

    const componentContent = replaceName(componentTemplate)
    const indexContent = replaceName(indexTemplate)

    // Write component file with configured extension
    const componentFilePath = path.join(componentFolderPath, `${componentName}.${fileExtension}`)
    fs.writeFileSync(componentFilePath, componentContent)

    // Optionally write index file
    if (createIndexFile) {
      const indexFilePath = path.join(componentFolderPath, 'index.ts')
      fs.writeFileSync(indexFilePath, indexContent)
    }

    // Show success message
    vscode.window.showInformationMessage(`Component ${componentName} has been created successfully!`)

    // Open component file
    const document = await vscode.workspace.openTextDocument(componentFilePath)
    await vscode.window.showTextDocument(document)
  } catch (error) {
    vscode.window.showErrorMessage(`Error creating component: ${error}`)
  }
}
