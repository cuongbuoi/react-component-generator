import * as vscode from 'vscode'
import { createComponent } from './commands/createComponent'
import { createContext } from './commands/createContext'
import { createHook } from './commands/createHook'

export function activate(context: vscode.ExtensionContext) {
  console.log('React Component Builder Toolkit is now active!')

  // Register createComponent command
  const componentDisposable = vscode.commands.registerCommand(
    'react-component-builder-toolkit.createComponent',
    createComponent
  )

  // Register createHook command
  const hookDisposable = vscode.commands.registerCommand('react-component-builder-toolkit.createHook', createHook)

  // Register createContext command
  const contextDisposable = vscode.commands.registerCommand(
    'react-component-builder-toolkit.createContext',
    createContext
  )

  context.subscriptions.push(componentDisposable, hookDisposable, contextDisposable)
}

export function deactivate() {}
