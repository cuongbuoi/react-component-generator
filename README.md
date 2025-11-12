# React Component Builder Toolkit

A VS Code extension to quickly create React components, hooks, and contexts with TypeScript and custom templates.

## Features

- Generate React components with a standard folder structure
- Generate React hooks with custom templates
- Generate React contexts with Provider and custom hook
- Custom templates for components, hooks, contexts, and index files
- Supports tsx, jsx, ts, js
- Automatically generates a TypeScript interface
- Validates component, hook, and context names

## How to Use

### Create React Component

1. Right-click a folder in Explorer
2. Select "Create React Component"
3. Enter the component name
4. Done!

### Create React Hook

1. Right-click a folder in Explorer
2. Select "Create React Hook"
3. Enter the hook name (must start with "use", e.g., `useCustomHook`)
4. Done!

### Create React Context

1. Right-click a folder in Explorer
2. Select "Create React Context"
3. Enter the context name (e.g., `AuthContext`)
4. Done!

## Configuration (Settings)

### Via GUI

1. Open Settings (Ctrl+,)
2. Search for "React Component Builder Toolkit"
3. Adjust the following options:

   **Component Settings:**
   - reactComponentBuilderToolkit.componentTemplate: Template for the component file (use `{ComponentName}`)
   - reactComponentBuilderToolkit.indexTemplate: Template for `index.ts` (use `{ComponentName}`)
   - reactComponentBuilderToolkit.fileExtension: `tsx` | `ts` | `jsx` | `js`
   - reactComponentBuilderToolkit.createIndexFile: Toggle creating `index.ts`
   - reactComponentBuilderToolkit.componentTemplatePath: File path to the component template
   - reactComponentBuilderToolkit.indexTemplatePath: File path to the index template

   **Hook Settings:**
   - reactComponentBuilderToolkit.hookTemplate: Template for the hook file (use `{HookName}`)
   - reactComponentBuilderToolkit.hookFileExtension: `tsx` | `ts` | `jsx` | `js` (default: `ts`)
   - reactComponentBuilderToolkit.hookTemplatePath: File path to the hook template

   **Context Settings:**
   - reactComponentBuilderToolkit.contextTemplate: Template for the context file (use `{ContextName}`)
   - reactComponentBuilderToolkit.contextFileExtension: `tsx` | `ts` | `jsx` | `js` (default: `tsx`)
   - reactComponentBuilderToolkit.contextTemplatePath: File path to the context template

### Via settings.json

```json
{
  "reactComponentBuilderToolkit.componentTemplate": "import { FC } from 'react';\n\nexport const {ComponentName}: FC<{ComponentName}Props> = () => {\n  return (\n    <div>{ComponentName}</div>\n  );\n};\n",
  "reactComponentBuilderToolkit.indexTemplate": "export { {ComponentName} } from './{ComponentName}';",
  "reactComponentBuilderToolkit.fileExtension": "tsx",
  "reactComponentBuilderToolkit.createIndexFile": true
}
```

Or specify templates via files (easier to edit, highlight, and format):

```json
{
  "reactComponentBuilderToolkit.componentTemplatePath": "./.templates/component.tsx",
  "reactComponentBuilderToolkit.indexTemplatePath": "./.templates/index.ts.tpl",
  "reactComponentBuilderToolkit.hookTemplatePath": "./.templates/hook.ts",
  "reactComponentBuilderToolkit.contextTemplatePath": "./.templates/context.tsx"
}
```

### Notes

- The `{ComponentName}` placeholder will be replaced with the component name you enter.
- The `{HookName}` placeholder will be replaced with the hook name you enter.
- The `{ContextName}` placeholder will be replaced with the context name you enter.
- `fileExtension` determines the extension of the generated component file.
- `hookFileExtension` determines the extension of the generated hook file (default: `ts`).
- `contextFileExtension` determines the extension of the generated context file (default: `tsx`).
- Set `createIndexFile = false` if you do not want to generate `index.ts`.
- Hook names must start with "use" followed by a capital letter (e.g., `useCustomHook`).
- Context names must start with a capital letter (e.g., `AuthContext`).
- If `*TemplatePath` is provided, the extension will prefer reading content from the file; otherwise, it falls back to the string in settings.

### Template Examples

**Functional Component + props + memo:**

```tsx
"reactComponentBuilderToolkit.componentTemplate": "import React, { memo } from 'react';\n\ninterface {ComponentName}Props {\n  className?: string;\n}\n\nexport const {ComponentName}: React.FC<{ComponentName}Props> = memo(({ className }) => {\n  return (\n    <div className={className}>{ComponentName}</div>\n  );\n});\n\n{ComponentName}.displayName = '{ComponentName}';\n"
```

**Index file re-export:**

```ts
"reactComponentBuilderToolkit.indexTemplate": "export { {ComponentName} } from './{ComponentName}';\n"
```

**JS (no TypeScript):**

```json
{
  "reactComponentBuilderToolkit.fileExtension": "jsx",
  "reactComponentBuilderToolkit.componentTemplate": "import React from 'react';\n\nexport const {ComponentName} = () => {\n  return (\n    <div>{ComponentName}</div>\n  );\n};\n"
}
```

**Custom Hook Template:**

```ts
"reactComponentBuilderToolkit.hookTemplate": "import { useState, useEffect } from 'react';\n\nexport const {HookName} = () => {\n  const [state, setState] = useState(null);\n\n  useEffect(() => {\n    // Your effect logic here\n  }, []);\n\n  return {\n    state,\n    setState\n  };\n};\n"
```

**Hook with TypeScript:**

```ts
"reactComponentBuilderToolkit.hookTemplate": "interface {HookName}Return {\n  value: string;\n  setValue: (value: string) => void;\n}\n\nexport const {HookName} = (): {HookName}Return => {\n  const [value, setValue] = useState<string>('');\n\n  return {\n    value,\n    setValue\n  };\n};\n"
```

**React Context Template (Default):**

The default context template includes:

- Context type interface
- Context creation with TypeScript
- Provider component with children prop
- Custom hook `use{ContextName}` with error handling

**Custom Context Template:**

```tsx
"reactComponentBuilderToolkit.contextTemplate": "import { createContext, useContext, ReactNode, useState } from 'react';\n\ninterface {ContextName}ContextType {\n  value: string;\n  setValue: (value: string) => void;\n}\n\nconst {ContextName}Context = createContext<{ContextName}ContextType | undefined>(undefined);\n\ninterface {ContextName}ProviderProps {\n  children: ReactNode;\n}\n\nexport const {ContextName}Provider = ({ children }: {ContextName}ProviderProps) => {\n  const [value, setValue] = useState<string>('');\n\n  const contextValue: {ContextName}ContextType = {\n    value,\n    setValue\n  };\n\n  return (\n    <{ContextName}Context.Provider value={contextValue}>\n      {children}\n    </{ContextName}Context.Provider>\n  );\n};\n\nexport const use{ContextName} = () => {\n  const context = useContext({ContextName}Context);\n  if (context === undefined) {\n    throw new Error('use{ContextName} must be used within a {ContextName}Provider');\n  }\n  return context;\n};\n"
```

## Known Issues

None at the moment. Please [report issues](https://github.com/cuongbuoi/react-component-builder-toolkit/issues) if you find any!

## Support

If you find this extension helpful and want to support its development:

<div align="center">

<a href="https://www.buymeacoffee.com/cuongbuoi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=cuongbuoi&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>

</div>

**Your support helps me:**

- Keep improving this extension
- Create new features
- Fix bugs faster
- Develop more useful tools

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Author

**Cường Buôi**

- GitHub: [@cuongbuoi](https://github.com/cuongbuoi)

## Acknowledgments

Thanks to all contributors and users who provided feedback!

---

<div align="center">

Made with ❤️ by [Cường Buôi](https://github.com/cuongbuoi)

If you like this extension, please ⭐ star the repo and leave a review!

</div>
