export const DEFAULT_COMPONENT_TEMPLATE = `import { FC } from 'react';

interface {ComponentName}Props {}

export const {ComponentName}: FC<{ComponentName}Props> = () => {
  return (
    <div>{ComponentName}</div>
  );
};\n`

export const DEFAULT_INDEX_TEMPLATE = `export { {ComponentName} } from './{ComponentName}';\n`
