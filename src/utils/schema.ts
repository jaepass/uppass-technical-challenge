import type { FormSchema, FormField } from '../types/form'

export function validateAndNormalizeSchema(schema: Record<string, any>): FormSchema {
  const normalized: FormSchema = {
    id: schema.id || `form-${Date.now()}`,
    name: schema.name || 'Imported Form',
    label: schema.label || schema.name || 'Imported Form',
    description: schema.description || '',
    items: schema.items || {}
  }

  // Validate and normalize items
  Object.entries(normalized.items).forEach(([id, item]) => {
    if (typeof item === 'object' && item !== null) {
      const normalizedItem: FormField = {
        id: item.id || id,
        name: item.name || id,
        type: item.type || 'Text',
        display: {
          label: item.display?.label || 'Untitled',
          placeholder: item.display?.placeholder
        },
        validation: item.validation || { required: false },
        options: item.type === 'Radio' ? 
          (item.options || item.enum || [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
          ]) : 
          undefined
      }
      
      normalized.items[id] = normalizedItem
    }
  })

  return normalized
}
