import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FormSchema, FormField, FormData } from '../types/form'

interface FormBuilderState {
  schema: FormSchema | null
  selectedItemId: string | null
  history: FormSchema[]
  currentHistoryIndex: number
  formData: FormData
}

export const useFormBuilderStore = defineStore(
  'formBuilder',
  () => {
    console.log('Initializing store')
    const storedSchema = localStorage.getItem('form-builder-schema')
    const initialSchema = storedSchema ? JSON.parse(storedSchema) : null
    const schema = ref<FormSchema | null>(initialSchema)
    const selectedItemId = ref<string | null>(null)
    const history = ref<FormSchema[]>(initialSchema ? [initialSchema] : [])
    const currentHistoryIndex = ref(initialSchema ? 0 : -1)
    const formData = ref<FormData>({})

    const hasItems = computed((): boolean => {
      return schema.value !== null && Object.keys(schema.value.items).length > 0
    })
    
    const selectedItem = computed((): FormField | null => {
      if (!schema.value || !selectedItemId.value) return null
      return schema.value.items[selectedItemId.value] || null
    })

    const canUndo = computed((): boolean => {
      return currentHistoryIndex.value > 0
    })

    const canRedo = computed((): boolean => {
      return currentHistoryIndex.value < history.value.length - 1
    })
    function setSchema(newSchema: FormSchema) {
      console.log('Setting schema:', newSchema)
      schema.value = newSchema
      addToHistory(newSchema)
      localStorage.setItem('form-builder-schema', JSON.stringify(newSchema))
    }
    
    function addItem(field: FormField) {
      if (!schema.value) return
      schema.value.items[field.id] = field
      addToHistory(schema.value)
      localStorage.setItem('form-builder-schema', JSON.stringify(schema.value))
    }
    
    function removeItem(itemId: string) {
      if (!schema.value) return
      delete schema.value.items[itemId]
      addToHistory(schema.value)
      localStorage.setItem('form-builder-schema', JSON.stringify(schema.value))
    }
    
    function updateItem(itemId: string, updates: Partial<FormField>) {
      if (!schema.value || !schema.value.items[itemId]) return
      // Ensure options array is properly handled for radio fields
      const currentItem = schema.value.items[itemId]
      const updatedItem = {
        ...currentItem,
        ...updates,
        options: updates.type === 'Radio' ? 
          (updates.options || currentItem.options || []) : 
          updates.options
      }
      schema.value.items[itemId] = updatedItem
      addToHistory(schema.value)
      localStorage.setItem('form-builder-schema', JSON.stringify(schema.value))
      console.log('Updated item:', updatedItem)
    }
    
    function setSelectedItem(itemId: string | null) {
      selectedItemId.value = itemId
    }
    
    function exportSchema(): FormSchema | null {
      return schema.value
    }

    function addToHistory(newSchema: FormSchema) {
      // Remove all states after current index
      history.value = history.value.slice(0, currentHistoryIndex.value + 1)
      // Add new state
      history.value.push(JSON.parse(JSON.stringify(newSchema)))
      currentHistoryIndex.value++
    }

    function undo() {
      if (!canUndo.value) return
      currentHistoryIndex.value--
      schema.value = JSON.parse(JSON.stringify(history.value[currentHistoryIndex.value]))
    }

    function redo() {
      if (!canRedo.value) return
      currentHistoryIndex.value++
      schema.value = JSON.parse(JSON.stringify(history.value[currentHistoryIndex.value]))
    }

    function updateFormData(newFormData: FormData) {
      formData.value = newFormData
    }

    return {
      schema,
      selectedItemId,
      history,
      currentHistoryIndex,
      formData,
      hasItems,
      selectedItem,
      canUndo,
      canRedo,
      setSchema,
      addItem,
      removeItem,
      updateItem,
      setSelectedItem,
      exportSchema,
      undo,
      redo,
      updateFormData
    }
  },
  {
    persist: true
  }
)
