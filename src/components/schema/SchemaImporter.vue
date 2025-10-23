```vue
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close" class="relative z-50">
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Import Schema
              </DialogTitle>

              <div class="mt-4">
                <TabGroup as="div" v-model="activeTab" defaultIndex={0}>
                  <TabList class="flex space-x-1 rounded-xl bg-gray-100 p-1">
                    <Tab
                      v-for="tab in tabs"
                      :key="tab.key"
                      v-slot="{ selected }"
                      as="div"
                      class="w-full"
                    >
                      <button
                        type="button"
                        :class="[
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                          'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                          selected
                            ? 'bg-white text-gray-900 shadow'
                            : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'
                        ]"
                      >
                        <div class="flex items-center justify-center">
                          <component :is="tab.icon" class="h-4 w-4 mr-2" />
                          {{ tab.name }}
                        </div>
                      </button>
                    </Tab>
                  </TabList>
                  <TabPanels class="mt-4">
                    <!-- File Upload Panel -->
                    <TabPanel>
                      <div
                        :class="[
                          'flex justify-center rounded-lg border border-dashed px-6 py-10 transition-colors duration-200',
                          uploadedFile ? 'border-green-500/50 bg-green-50' : 'border-gray-900/25'
                        ]"
                        @dragover.prevent
                        @drop.prevent="handleFileDrop"
                      >
                        <div class="text-center">
                          <div v-if="!uploadedFile">
                            <DocumentArrowUpIcon class="mx-auto h-12 w-12 text-gray-300" />
                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                for="file-upload"
                                class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  class="sr-only"
                                  accept=".json"
                                  @change="handleFileSelect"
                                />
                              </label>
                              <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">JSON files up to 10MB</p>
                          </div>

                          <div v-else class="space-y-3">
                            <CheckCircleIcon class="mx-auto h-12 w-12 text-green-500" />
                            <div class="flex items-center justify-center gap-2">
                              <span class="text-sm font-medium text-gray-900">{{ uploadedFile.name }}</span>
                              <button
                                type="button"
                                class="rounded-full p-1 hover:bg-gray-100"
                                @click="removeFile"
                              >
                                <XMarkIcon class="h-5 w-5 text-gray-500" />
                              </button>
                            </div>
                            <p class="text-xs text-gray-500">File ready to import</p>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <!-- JSON Paste Panel -->
                    <TabPanel>
                      <div class="space-y-4">
                        <textarea
                          v-model="pastedJson"
                          rows="10"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-mono"
                          placeholder="Paste your JSON schema here..."
                          @paste="() => { if (pastedJson) processImport(pastedJson) }"
                        />
                        <div v-if="jsonError" class="text-sm text-red-600">
                          {{ jsonError }}
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              <div class="mt-6 flex justify-end gap-3">
                <button
                  @click="close"
                  class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  @click="submitSchema"
                  class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-indigo-600 hover:bg-indigo-500"
                >
                  Import
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import { DocumentArrowUpIcon, DocumentTextIcon, FolderIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

defineOptions({
  name: 'SchemaImporter'
})

const props = defineProps<{
  modelValue: boolean  // v-model support for dialog open state
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void  // v-model support
  (e: 'import', schema: Record<string, any>): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const tabs = [
  { key: 'file', name: 'Upload File', icon: FolderIcon },
  { key: 'paste', name: 'Paste JSON', icon: DocumentTextIcon }
]

const pastedJson = ref('')
const jsonError = ref('')
const uploadedFile = ref<File | null>(null)
const activeTab = ref<string | number>(0)

// Watch for tab changes
watch(activeTab, () => {
  // Clear errors and state when switching tabs
  jsonError.value = ''
  if (activeTab.value === 0) {  // First tab (file upload)
    pastedJson.value = ''
  } else {  // Second tab (JSON paste)
    uploadedFile.value = null
  }
})

// Add automatic validation when JSON is pasted
const validatePastedJson = () => {
  if (pastedJson.value) {
    validateJson(pastedJson.value)
  } else {
    jsonError.value = ''
  }
}

// Watch for changes in pasted JSON
watch(pastedJson, validatePastedJson)

const removeFile = () => {
  uploadedFile.value = null
  jsonError.value = ''
  // Clear the file input
  const fileInput = document.getElementById('file-upload') as HTMLInputElement
  if (fileInput) fileInput.value = ''
}

const close = () => {
  isOpen.value = false
  // Reset state
  pastedJson.value = ''
  jsonError.value = ''
  uploadedFile.value = null
}

const validateJson = (jsonString: string): boolean => {
  jsonError.value = '' // Clear error before validation
  try {
    if (!jsonString.trim()) {
      return false
    }
    const parsed = JSON.parse(jsonString)
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Schema must be a valid JSON object')
    }
    return true
  } catch (err) {
    jsonError.value = err instanceof Error ? err.message : 'Invalid JSON'
    console.error('JSON validation error:', err)
    return false
  }
}

const handleFileDrop = async (e: DragEvent) => {
  const file = e.dataTransfer?.files[0]
  if (!file) return

  if (!file.name.endsWith('.json')) {
    jsonError.value = 'Please upload a JSON file'
    uploadedFile.value = null
    return
  }

  try {
    const text = await file.text()
    if (validateJson(text)) {
      uploadedFile.value = file
      jsonError.value = ''
    } else {
      uploadedFile.value = null
    }
  } catch (err) {
    uploadedFile.value = null
    jsonError.value = 'Failed to read file'
    console.error('File read error:', err)
  }
}

const handleFileSelect = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (!file.name.endsWith('.json')) {
    jsonError.value = 'Please upload a JSON file'
    uploadedFile.value = null
    return
  }

  try {
    const text = await file.text()
    if (validateJson(text)) {
      uploadedFile.value = file
      jsonError.value = ''
    } else {
      uploadedFile.value = null
    }
  } catch (err) {
    uploadedFile.value = null
    jsonError.value = 'Failed to read file'
    console.error('File read error:', err)
  }
}

const processImport = async (schemaText: string) => {
  try {
    const parsed = JSON.parse(schemaText)
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Schema must be a valid JSON object')
    }
    emit('import', parsed)
    close()
  } catch (err) {
    jsonError.value = err instanceof Error ? err.message : 'Failed to import schema'
    console.error('Import error:', err)
  }
}

const submitSchema = async () => {
  if (activeTab.value === 0) {  // File upload tab
    if (!uploadedFile.value) {
      // If no file selected, open file picker
      document.getElementById('file-upload')?.click()
      return
    }
    // If file is already selected, process it
    const text = await uploadedFile.value.text()
    processImport(text)
  } else if (activeTab.value === 1 && pastedJson.value) {  // JSON paste tab
    processImport(pastedJson.value)
  }
}
</script>
```
