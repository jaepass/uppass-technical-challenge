export interface FormComponent {
  id: string
  label: string
  type: FormComponentType
  icon?: any
}

export type FormComponentType = 'Text' | 'Number' | 'Radio'

export interface FormFieldBase {
  name: string
  type: FormComponentType
  display: {
    label: string
    placeholder?: string
  }
  validation?: {
    required?: boolean
    pattern?: string
    min?: number
    max?: number
  }
  visibility?: {
    [key: string]: string
  }
  props?: Record<string, any>
  options?: Array<{
    label: string
    value: string | number
  }>
  enum?: Array<{
    label: string
    value: string | number
  }>
}

export interface FormField extends FormFieldBase {
  id: string
}

export interface FormSchema {
  id: string
  name: string
  label: string
  description?: string
  items: Record<string, FormField>
}

export interface ConfigTab {
  id: string
  label: string
  component?: string
}

export type FormData = Record<string, any>

export interface DraggedComponent extends FormComponent {
  data?: Record<string, any>
}
