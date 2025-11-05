# React Component Generator

Extension VSCode để tạo React component nhanh chóng với TypeScript và custom templates.

## Tính năng

- ✅ Tạo React component với cấu trúc folder chuẩn
- ✅ Custom template cho component và index file
- ✅ Hỗ trợ tsx, jsx, ts, js
- ✅ Tự động generate TypeScript interface
- ✅ Validate tên component

## Cách sử dụng

1. Click chuột phải vào folder trong Explorer
2. Chọn "Create React Component"
3. Nhập tên component
4. Hoàn tất!

## Cấu hình (Settings)

### Qua GUI

1. Mở Settings (Ctrl+,)
2. Tìm "React Component Generator"
3. Chỉnh sửa các mục sau:
   - reactComponentGenerator.componentTemplate: Template cho file component (dùng `{ComponentName}`)
   - reactComponentGenerator.indexTemplate: Template cho `index.ts` (dùng `{ComponentName}`)
   - reactComponentGenerator.fileExtension: `tsx` | `ts` | `jsx` | `js`
   - reactComponentGenerator.createIndexFile: Bật/tắt tạo `index.ts`
   - reactComponentGenerator.componentTemplatePath: Đường dẫn file template component
   - reactComponentGenerator.indexTemplatePath: Đường dẫn file template index

### Qua settings.json

```json
{
  "reactComponentGenerator.componentTemplate": "interface {ComponentName}Props {}\n\nexport const {ComponentName}: React.FC<{ComponentName}Props> = () => {\n    return <div>{ComponentName}</div>;\n};",
  "reactComponentGenerator.indexTemplate": "export { {ComponentName} } from './{ComponentName}';",
  "reactComponentGenerator.fileExtension": "tsx",
  "reactComponentGenerator.createIndexFile": true
}
```

Hoặc chỉ định template qua file (dễ chỉnh sửa, highlight, format):

```json
{
  "reactComponentGenerator.componentTemplatePath": "./.templates/component.tsx",
  "reactComponentGenerator.indexTemplatePath": "./.templates/index.ts.tpl"
}
```

### Ghi chú

- Placeholder `{ComponentName}` sẽ được thay bằng tên component bạn nhập.
- `fileExtension` quyết định phần mở rộng file component được tạo.
- `createIndexFile = false` nếu không muốn tạo kèm `index.ts`.
- Nếu chỉ định `*TemplatePath`, extension sẽ ưu tiên đọc nội dung file, sau đó mới đến chuỗi trong settings.

### Ví dụ Templates

**Functional Component + props + memo:**

```tsx
"reactComponentGenerator.componentTemplate": "import React, { memo } from 'react';\n\ninterface {ComponentName}Props {\n  className?: string;\n}\n\nexport const {ComponentName}: React.FC<{ComponentName}Props> = memo(({ className }) => {\n  return (\n    <div className={className}>{ComponentName}</div>\n  );\n});\n\n{ComponentName}.displayName = '{ComponentName}';\n"
```

**Index file re-export:**

```ts
"reactComponentGenerator.indexTemplate": "export { {ComponentName} } from './{ComponentName}';\n"
```

**JS (không TypeScript):**

```json
{
  "reactComponentGenerator.fileExtension": "jsx",
  "reactComponentGenerator.componentTemplate": "import React from 'react';\n\nexport const {ComponentName} = () => {\n  return (\n    <div>{ComponentName}</div>\n  );\n};\n"
}
```
