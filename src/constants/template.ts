export const DEFAULT_COMPONENT_TEMPLATE = `import { FC } from 'react';

interface {ComponentName}Props {}

export const {ComponentName}: FC<{ComponentName}Props> = () => {
  return (
    <div>{ComponentName}</div>
  );
};
`

export const DEFAULT_INDEX_TEMPLATE = `export { {ComponentName} } from './{ComponentName}';
`

export const DEFAULT_HOOK_TEMPLATE = `export const {HookName} = () => {
  return {}
};
`

export const DEFAULT_CONTEXT_TEMPLATE = `import { createContext, useContext, ReactNode } from 'react';

interface {ContextName}ContextType {
  // Add your context properties here
}

const {ContextName}Context = createContext<{ContextName}ContextType | undefined>(undefined);

interface {ContextName}ProviderProps {
  children: ReactNode;
}

export const {ContextName}Provider = ({ children }: {ContextName}ProviderProps) => {
  const value: {ContextName}ContextType = {
    // Add your context values here
  };

  return (
    <{ContextName}Context.Provider value={value}>
      {children}
    </{ContextName}Context.Provider>
  );
};

export const use{ContextName} = () => {
  const context = useContext({ContextName}Context);
  if (context === undefined) {
    throw new Error('use{ContextName} must be used within a {ContextName}Provider');
  }
  return context;
};
`
