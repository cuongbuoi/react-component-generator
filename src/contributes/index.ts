import { DEFAULT_COMPONENT_TEMPLATE, DEFAULT_INDEX_TEMPLATE, DEFAULT_HOOK_TEMPLATE, DEFAULT_CONTEXT_TEMPLATE } from '../constants/template'

export const contributes = {
  configuration: {
    title: 'React Component Builder Toolkit',
    properties: {
      'reactComponentBuilderToolkit.componentTemplate': {
        type: 'string',
        default: DEFAULT_COMPONENT_TEMPLATE,
        markdownDescription: 'Template for the component file. Use `{ComponentName}` placeholder.'
      },
      'reactComponentBuilderToolkit.indexTemplate': {
        type: 'string',
        default: DEFAULT_INDEX_TEMPLATE,
        markdownDescription: 'Template for index file. Use `{ComponentName}` placeholder.'
      },
      'reactComponentBuilderToolkit.fileExtension': {
        type: 'string',
        enum: ['tsx', 'jsx', 'ts', 'js'],
        default: 'tsx',
        markdownDescription: 'File extension for the generated component file.'
      },
      'reactComponentBuilderToolkit.createIndexFile': {
        type: 'boolean',
        default: true,
        markdownDescription: 'Whether to create an index file alongside the component.'
      },
      'reactComponentBuilderToolkit.componentTemplatePath': {
        type: 'string',
        default: '',
        markdownDescription:
          'Absolute or workspace-relative path to a file whose contents will be used as the component template. If provided, this takes precedence over `componentTemplate`.'
      },
      'reactComponentBuilderToolkit.indexTemplatePath': {
        type: 'string',
        default: '',
        markdownDescription:
          'Absolute or workspace-relative path to a file whose contents will be used as the index template. If provided, this takes precedence over `indexTemplate`.'
      },
      'reactComponentBuilderToolkit.hookTemplate': {
        type: 'string',
        default: DEFAULT_HOOK_TEMPLATE,
        markdownDescription: 'Template for the hook file. Use `{HookName}` placeholder.'
      },
      'reactComponentBuilderToolkit.hookFileExtension': {
        type: 'string',
        enum: ['tsx', 'jsx', 'ts', 'js'],
        default: 'ts',
        markdownDescription: 'File extension for the generated hook file.'
      },
      'reactComponentBuilderToolkit.hookTemplatePath': {
        type: 'string',
        default: '',
        markdownDescription:
          'Absolute or workspace-relative path to a file whose contents will be used as the hook template. If provided, this takes precedence over `hookTemplate`.'
      },
      'reactComponentBuilderToolkit.contextTemplate': {
        type: 'string',
        default: DEFAULT_CONTEXT_TEMPLATE,
        markdownDescription: 'Template for the context file. Use `{ContextName}` placeholder.'
      },
      'reactComponentBuilderToolkit.contextFileExtension': {
        type: 'string',
        enum: ['tsx', 'jsx', 'ts', 'js'],
        default: 'tsx',
        markdownDescription: 'File extension for the generated context file.'
      },
      'reactComponentBuilderToolkit.contextTemplatePath': {
        type: 'string',
        default: '',
        markdownDescription:
          'Absolute or workspace-relative path to a file whose contents will be used as the context template. If provided, this takes precedence over `contextTemplate`.'
      }
    }
  },
  commands: [
    {
      command: 'react-component-builder-toolkit.createComponent',
      title: 'Create React Component'
    },
    {
      command: 'react-component-builder-toolkit.createHook',
      title: 'Create React Hook'
    },
    {
      command: 'react-component-builder-toolkit.createContext',
      title: 'Create React Context'
    }
  ],
  menus: {
    'explorer/context': [
      {
        command: 'react-component-builder-toolkit.createComponent',
        when: 'explorerResourceIsFolder',
        group: '1_modification'
      },
      {
        command: 'react-component-builder-toolkit.createHook',
        when: 'explorerResourceIsFolder',
        group: '1_modification'
      },
      {
        command: 'react-component-builder-toolkit.createContext',
        when: 'explorerResourceIsFolder',
        group: '1_modification'
      }
    ]
  }
}
