<template>
  <div class="h-full flex flex-col">
    <!-- Preview Toolbar -->
    <div class="flex-none border-b border-gray-200 bg-white p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="handleBackToEditor"
          >
            <ArrowLeftIcon class="h-4 w-4 mr-1" />
            Back to Editor
          </button>
          <div>
            <h2 class="text-lg font-medium text-gray-900">Form Preview</h2>
            <p class="mt-1 text-sm text-gray-500">Preview and test your form</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Device Selector -->
          <div class="flex items-center space-x-2 bg-white rounded-lg p-1">
            <button 
              v-for="device in devices" 
              :key="device.id"
              class="p-2 rounded-md"
              :class="[
                selectedDevice === device.id 
                  ? 'bg-white shadow text-gray-900' 
                  : 'text-gray-500 hover:text-gray-900'
              ]"
              @click="selectedDevice = device.id"
            >
              <component :is="device.icon" class="h-5 w-5" />
            </button>
          </div>
          <!-- Theme Selector -->
          <select 
            v-model="selectedTheme"
            class="form-select rounded-md border-gray-300 text-sm"
          >
            <option value="default">Default Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="custom">Custom Theme</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Preview Content -->
    <div class="flex-1 overflow-y-auto bg-gray-100 p-6">
      <div 
        class="mx-auto bg-white rounded-lg shadow-sm transition-all duration-300"
        :class="previewContainerClass"
      >
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Form components will be rendered here dynamically -->
            <div v-if="!hasItems" class="text-center py-12">
              <DocumentPlusIcon class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No components</h3>
              <p class="mt-1 text-sm text-gray-500">
                Add form components in the builder panel to preview them here
              </p>
            </div>

            <template v-else>
              <div v-for="item in formItems" :key="item.id" class="space-y-4">
                <component 
                  :is="getComponentForType(item.type)"
                  v-bind="getPropsForField(item)"
                  v-model="formData[item.name]"
                />
              </div>
            </template>

            <div class="flex justify-end pt-6" v-if="hasItems">
              <button 
                type="submit" 
                class="btn btn-primary relative"
                :disabled="isSubmitting"
              >
                <span :class="{ 'opacity-0': isSubmitting }">Submit</span>
                <div 
                  v-if="isSubmitting" 
                  class="absolute inset-0 flex items-center justify-center"
                >
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFormBuilderStore } from '../stores/builder'
import { 
  ComputerDesktopIcon, 
  DeviceTabletIcon, 
  DevicePhoneMobileIcon,
  DocumentPlusIcon,
  ArrowLeftIcon
} from '@heroicons/vue/24/outline'
import { TextField, NumberField, RadioField } from '../components/fields'
import type { FormField } from '../types/form'

const store = useFormBuilderStore()
const router = useRouter()
const formData = ref<Record<string, any>>({})
const selectedDevice = ref('desktop')
const selectedTheme = ref('default')

onMounted(() => {
  // Initialize form data with appropriate empty values based on field type
  formItems.value.forEach(item => {
    if (item.type === 'Radio') {
      formData.value[item.name] = null
    } else {
      formData.value[item.name] = ''
    }
  })
  console.log('FormView mounted')
  console.log('Current store schema:', store.schema)
  console.log('Form items:', formItems.value)
  console.log('Initial form data:', formData.value)
})

// Watch for changes in formData and update store
watch(formData, (newValue) => {
  store.updateFormData(newValue)
}, { deep: true })

const devices = [
  { id: 'desktop', icon: ComputerDesktopIcon },
  { id: 'tablet', icon: DeviceTabletIcon },
  { id: 'mobile', icon: DevicePhoneMobileIcon }
]

const hasItems = computed(() => {
  console.log('Store schema:', store.schema)
  return store.schema && Object.keys(store.schema.items).length > 0
})

const formItems = computed<FormField[]>(() => {
  console.log('Form Items computed - store schema:', store.schema)
  if (!store.schema) {
    console.log('No schema available')
    return []
  }
  const items = Object.entries(store.schema.items).map(([id, item]) => ({
    ...item as FormField,
    id
  }))
  console.log('Mapped form items:', items)
  return items
})

const previewContainerClass = computed(() => {
  switch (selectedDevice.value) {
    case 'mobile':
      return 'max-w-sm'
    case 'tablet':
      return 'max-w-2xl'
    default:
      return 'max-w-4xl'
  }
})

const getComponentForType = (type: string) => {
  console.log('Getting component for type:', type)
  const component = (() => {
    switch (type) {
      case 'Text':
        return TextField
      case 'Number':
        return NumberField
      case 'Radio':
        return RadioField
      default:
        console.warn(`Unknown field type: ${type}`)
        return 'div'
    }
  })()
  console.log('Resolved component:', component)
  return component
}

const getPropsForField = (item: FormField) => {
  console.log('Getting props for field:', item)
  const baseProps = {
    id: item.id,
    label: item.display.label,
    placeholder: item.display.placeholder,
    required: item.validation?.required,
    modelValue: formData.value[item.name] ?? null,
    error: errors.value[item.id]
  }

  if (item.type === 'Radio') {
    console.log('Preparing Radio field props with options:', item.options)
    const props = {
      ...baseProps,
      options: item.options || []
    }
    console.log('Final Radio field props:', props)
    return props
  }

  switch (item.type) {
    case 'Number':
      return {
        ...baseProps,
        min: item.validation?.min,
        max: item.validation?.max,
        allowDecimal: item.props?.allowDecimal
      }
    default:
      return baseProps
  }
}

const handleBackToEditor = () => {
  store.updateFormData(formData.value)
  router.push('/')
}

// Create refs outside the function
const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const submitSuccess = ref(false)

const handleSubmit = async () => {
  // Clear previous errors
  errors.value = {}
  
  // Log form items for debugging
  console.log('Form items to validate:', formItems.value.map(field => ({
    id: field.id,
    name: field.name,
    label: field.display.label,
    required: field.validation?.required,
    value: formData.value[field.name]
  })))
  
  // Validate required fields
  formItems.value.forEach((field) => {
    const value = formData.value[field.name]
    console.log(`Validating field ${field.display.label}:`, {
      value,
      fieldName: field.name,
      isRequired: field.validation?.required
    })
    
    // Check for empty strings, null, or undefined
    const isEmpty = field.type === 'Radio' 
      ? value === null || value === undefined
      : value === '' || value === null || value === undefined || value === 0
      
    if (field.validation?.required && isEmpty) {
      errors.value[field.id] = `${field.display.label} is required`
      console.log(`Validation failed for ${field.display.label}:`, { value, isEmpty, type: field.type })
    } else {
      console.log(`Validation passed for ${field.display.label}:`, { value, isEmpty, type: field.type })
    }
  })

  console.log('Final validation state:', {
    formData: formData.value,
    errors: errors.value,
    hasErrors: Object.keys(errors.value).length > 0
  })

  if (Object.keys(errors.value).length > 0) {
    alert('Please fill in all required fields')
    return
  }

  // Show loading state
  isSubmitting.value = true
  submitSuccess.value = false

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', formData.value)
    submitSuccess.value = true
    alert('Form submitted successfully!')
    
    // Reset form after successful submission
    formData.value = {}
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Error submitting form. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
