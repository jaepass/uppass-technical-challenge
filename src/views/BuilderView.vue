<template>
  <div class="h-full flex flex-col overflow-hidden">
    <!-- Page Header -->
    <div class="flex-none pb-4 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-xl font-semibold text-gray-900">Form Builder</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4 flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary relative"
          @click="saveForm"
          :disabled="isSaving"
        >
          <span :class="{ 'opacity-0': isSaving }">Save Form</span>
          <div 
            v-if="isSaving" 
            class="absolute inset-0 flex items-center justify-center"
          >
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </button>
        <button
          type="button"
          class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          @click="previewForm"
        >
          <EyeIcon class="h-4 w-4 mr-1" />
          Preview
        </button>
        <Menu as="div" class="relative">
          <MenuButton
            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <EllipsisVerticalIcon class="h-4 w-4" />
          </MenuButton>
          <MenuItems class="absolute right-0 z-10 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <button
                  @click="showSchemaViewer = true"
                  :class="[
                    active ? 'bg-gray-50' : '',
                    'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                  ]"
                >
                  <CodeBracketIcon class="h-4 w-4 mr-2" />
                  View Schema
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  @click="showSchemaImporter = true"
                  :class="[
                    active ? 'bg-gray-50' : '',
                    'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                  ]"
                >
                  <ArrowUpOnSquareIcon class="h-4 w-4 mr-2" />
                  Import Schema
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex gap-4 min-h-0">
      <!-- Left Sidebar: Components -->
      <div class="w-64 flex-none overflow-hidden flex flex-col">
        <div class="flex-1 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div class="flex-none border-b border-gray-200 px-4 py-3">
            <h3 class="text-sm font-medium text-gray-900">Components</h3>
          </div>
          <div class="p-4">
            <draggable
              :list="components"
              :group="{ name: 'components', pull: 'clone', put: false }"
              item-key="id"
              :sort="false"
              :clone="cloneComponent"
              class="space-y-3"
            >
              <template #item="{ element }">
                <div
                  class="flex items-center p-3 rounded-md border border-gray-200 bg-white shadow-sm hover:border-primary hover:ring-1 hover:ring-primary cursor-move"
                >
                  <div class="w-5 h-5 flex items-center justify-center overflow-hidden mr-2">
                    <component :is="element.icon" class="w-full h-full text-gray-600" />
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ element.label }}</span>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>

      <!-- Center: Form Canvas -->
      <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div class="flex-1 rounded-lg border border-gray-200 bg-white shadow-sm flex flex-col">
          <div class="flex-none border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-900">Form Canvas</h3>
          </div>
          <div class="p-4 h-full overflow-y-auto">
            <draggable
              v-model="formItems"
              :group="{ name: 'components', put: true, pull: true }"
              animation="200"
              item-key="id"
              class="space-y-4"
              @start="dragStart"
              @end="dragEnd"
            >
              <template #item="{ element }">
                <div 
                  class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-primary"
                  :class="{ 'ring-2 ring-primary': selectedItemId === element.id }"
                  @click="selectItem(element.id)"
                >
                  <div class="flex justify-between items-start">
                    <div class="flex items-center">
                      <component :is="getComponentIcon(element.type)" class="h-5 w-5 text-gray-500 mr-2" />
                      <span class="text-sm font-medium text-gray-900">{{ element.display.label }}</span>
                    </div>
                    <button
                      class="text-gray-400 hover:text-gray-500"
                      @click.stop="removeItem(element.id)"
                    >
                      <TrashIcon class="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </template>

              <template #footer>
                <div 
                  v-show="!hasItems"
                  class="text-center py-12"
                >
                  <CursorArrowRaysIcon class="mx-auto h-8 w-8 text-gray-400" />
                  <h3 class="mt-2 text-sm font-medium text-gray-900">No components</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Drag and drop components from the left panel to start building your form
                  </p>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>

      <!-- Right Sidebar: Properties -->
      <div v-if="selectedItem" class="w-80 flex-none overflow-hidden flex flex-col">
        <div class="flex-1 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div class="flex-none border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-900">Properties</h3>
            <button
              class="text-gray-400 hover:text-gray-500"
              @click="selectItem(null)"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <div class="p-4">
            <div class="space-y-6">
              <!-- Display Settings -->
              <div>
                <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Display</h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      type="text"
                      v-model="selectedItem.display.label"
                      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                    <input
                      type="text"
                      v-model="selectedItem.display.placeholder"
                      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <!-- Radio Options -->
              <div v-if="selectedItem?.type === 'Radio'">
                <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Options</h4>
                <div class="space-y-4">
                  <div v-for="(option, index) in selectedItem.options || []" :key="index" class="flex items-center gap-2">
                    <div class="flex-1">
                      <input
                        type="text"
                        v-model="option.label"
                        placeholder="Option label"
                        class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        @change="updateRadioOptions"
                      />
                    </div>
                    <div class="flex-1">
                      <input
                        type="text"
                        v-model="option.value"
                        placeholder="Option value"
                        class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        @change="updateRadioOptions"
                      />
                    </div>
                    <button
                      class="text-gray-400 hover:text-gray-500"
                      @click="removeRadioOption(index)"
                    >
                      <XMarkIcon class="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    @click="addRadioOption"
                  >
                    Add Option
                  </button>
                </div>
              </div>

              <!-- Validation Settings -->
              <div>
                <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Validation</h4>
                <div class="space-y-4">
                  <!-- Number field specific settings -->
                  <template v-if="selectedItem.type === 'Number'">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Min Value</label>
                        <input
                          type="number"
                          v-model.number="selectedItem.validation.min"
                          class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Max Value</label>
                        <input
                          type="number"
                          v-model.number="selectedItem.validation.max"
                          class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="relative flex items-start">
                      <div class="flex h-6 items-center">
                        <input
                          type="checkbox"
                          :checked="selectedItem.props?.allowDecimal"
                          @change="toggleAllowDecimal"
                          class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                      <div class="ml-3 text-sm leading-6">
                        <label class="font-medium text-gray-900">Allow Decimal Values</label>
                      </div>
                    </div>
                  </template>
                  <div class="relative flex items-start">
                    <div class="flex h-6 items-center">
                      <input
                        type="checkbox"
                        :checked="selectedItem.validation?.required"
                        @change="toggleRequired"
                        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                      <label class="font-medium text-gray-900">Required</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SchemaViewer
      :is-open="showSchemaViewer"
      :schema="store.schema"
      @close="showSchemaViewer = false"
    />
    <SchemaImporter
      v-model="showSchemaImporter"
      @import="importSchema"
    />
    <!-- Notification Toast -->
    <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="notification.show"
        class="fixed bottom-0 right-0 mb-4 mr-4 pointer-events-none"
      >
        <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" />
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">
                  {{ notification.message }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { 
  EllipsisVerticalIcon, 
  CodeBracketIcon, 
  ArrowUpOnSquareIcon,
  EyeIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import SchemaViewer from '../components/schema/SchemaViewer.vue'
import SchemaImporter from '../components/schema/SchemaImporter.vue'
import { 
  CursorArrowRaysIcon, 
  XMarkIcon, 
  TrashIcon, 
  DocumentTextIcon, 
  HashtagIcon, 
  ListBulletIcon 
} from '@heroicons/vue/24/solid'
import { useFormBuilderStore } from '../stores/builder'
import type { FormField, FormFieldBase, FormComponent } from '../types/form'
import { validateAndNormalizeSchema } from '../utils/schema'

const store = useFormBuilderStore()
const router = useRouter()

// Initialize with a default schema if none exists
onMounted(() => {
  if (!store.schema) {
    store.setSchema({
      id: 'new-form',
      name: 'New Form',
      label: 'New Form',
      description: '',
      items: {}
    })
  }
})

// Components that can be dragged to the form
const components = ref<FormComponent[]>([
  {
    id: 'text',
    label: 'Text Input',
    type: 'Text',
    icon: DocumentTextIcon
  },
  {
    id: 'number',
    label: 'Number Input',
    type: 'Number',
    icon: HashtagIcon
  },
  {
    id: 'radio',
    label: 'Radio Group',
    type: 'Radio',
    icon: ListBulletIcon
  }
])

// Computed properties from store
const formItems = computed<FormField[]>({
  get: () => {
    if (!store.schema) return []
    return Object.entries(store.schema.items).map(([id, item]) => ({
      ...item,
      id
    }))
  },
  set: (items) => {
    if (!store.schema) return
    const newItems: Record<string, FormField> = {}
    items.forEach((item: FormField) => {
      newItems[item.id] = { ...item }
    })
    store.schema.items = newItems
  }
})

const selectedItemId = computed(() => store.selectedItemId)
const selectedItem = computed(() => store.selectedItem)
const hasItems = computed(() => store.hasItems)

// Methods
  const cloneComponent = (component: FormComponent): FormField => {
    const id = `${component.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const baseValidation = {
      required: false
    }

    // Add type-specific validation
    const validation = component.type === 'Number' 
      ? { ...baseValidation, min: undefined, max: undefined }
      : baseValidation

    const newComponent = {
      id,
      name: id,
      type: component.type,
      display: {
        label: component.label,
        placeholder: `Enter ${component.label.toLowerCase()}`
      },
      validation,
      props: component.type === 'Number' 
        ? { allowDecimal: false } 
        : {},
      options: component.type === 'Radio' 
        ? [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
          ] 
        : undefined
    }
    store.addItem(newComponent)
    return newComponent
}

const selectItem = (id: string | null) => {
  store.setSelectedItem(id)
}

const removeItem = (id: string) => {
  store.removeItem(id)
}

const isSaving = ref(false)
const notification = ref({ show: false, message: '' })

const saveForm = async () => {
  if (isSaving.value) return
  
  isSaving.value = true
  const schema = store.exportSchema()
  
  try {
    // Simulate API call to save schema
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simulate successful save
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${schema.name || 'form'}-schema.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    notification.value = { show: true, message: 'Form schema saved successfully!' }
    setTimeout(() => {
      notification.value.show = false
    }, 3000)
  } catch (error) {
    console.error('Error saving form:', error)
    notification.value = { show: true, message: 'Error saving form. Please try again.' }
    setTimeout(() => {
      notification.value.show = false
    }, 3000)
  } finally {
    isSaving.value = false
  }
}

const previewForm = () => {
  if (!hasItems.value) {
    // Could add a notification here that the form is empty
    return
  }
  router.push('/preview')
}

const dragStart = () => {
  // Handle drag start
}

const dragEnd = () => {
  // Handle drag end
}

const getComponentIcon = (type: string) => {
  const component = components.value.find(c => c.type === type)
  return component?.icon || DocumentTextIcon
}

// Validation methods
  const toggleRequired = (event: Event) => {
    if (!selectedItem.value || !store.schema) return
    const checked = (event.target as HTMLInputElement).checked
    const currentValidation = selectedItem.value.validation || {}
    store.updateItem(selectedItem.value.id, {
      ...selectedItem.value,
      validation: {
        ...currentValidation,
        required: checked
      }
    })
  }

  const toggleAllowDecimal = (event: Event) => {
    if (!selectedItem.value || selectedItem.value.type !== 'Number' || !store.schema) return
    const checked = (event.target as HTMLInputElement).checked
    const currentProps = selectedItem.value.props || {}
    store.updateItem(selectedItem.value.id, {
      ...selectedItem.value,
      props: {
        ...currentProps,
        allowDecimal: checked
      }
    })
  }// Radio field methods
const updateRadioOptions = () => {
  if (!selectedItem.value || selectedItem.value.type !== 'Radio' || !store.schema || !selectedItem.value.options) return
  
  // Ensure all options have both label and value
  const validOptions = selectedItem.value.options.map(option => ({
    label: option.label || '',
    value: option.value || ''
  }))

  store.updateItem(selectedItem.value.id, {
    ...selectedItem.value,
    options: validOptions
  })
}

const addRadioOption = () => {
  if (!selectedItem.value || selectedItem.value.type !== 'Radio' || !store.schema) return
  const options = [...(selectedItem.value.options || [])]
  const newIndex = options.length + 1
  
  // Add new option with unique value
  options.push({
    label: `Option ${newIndex}`,
    value: `option_${Date.now()}_${newIndex}`
  })
  
  store.updateItem(selectedItem.value.id, {
    ...selectedItem.value,
    options
  })
}

const removeRadioOption = (index: number) => {
  if (!selectedItem.value || selectedItem.value.type !== 'Radio' || !store.schema || !selectedItem.value.options) return
  
  // Ensure we have at least one option remaining
  if (selectedItem.value.options.length <= 1) {
    return
  }
  
  const options = [...selectedItem.value.options]
  options.splice(index, 1)
  
  store.updateItem(selectedItem.value.id, {
    ...selectedItem.value,
    options
  })
}

const showSchemaViewer = ref(false)
const showSchemaImporter = ref(false)

const importSchema = (schema: Record<string, any>) => {
  const normalizedSchema = validateAndNormalizeSchema(schema)
  store.setSchema(normalizedSchema)
}
</script>

<style scoped>
.w-3\.5 {
  width: 0.875rem !important;
}
.h-3\.5 {
  height: 0.875rem !important;
}
</style>
