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
            <DialogPanel class="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
              <DialogTitle as="div" class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Form Schema</h3>
                <div class="flex items-center gap-2">
                  <button
                    @click="toggleFormat"
                    class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    :class="{ 'bg-gray-50': !isPrettyFormat }"
                  >
                    <Bars3BottomLeftIcon v-if="isPrettyFormat" class="h-4 w-4 mr-1" />
                    <Bars3Icon v-else class="h-4 w-4 mr-1" />
                    {{ isPrettyFormat ? 'Pretty' : 'Compact' }}
                  </button>
                  <button
                    @click="copyToClipboard"
                    class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <DocumentDuplicateIcon class="h-4 w-4 mr-1" />
                    Copy
                  </button>
                </div>
              </DialogTitle>

              <div class="mt-4">
                <pre class="bg-gray-50 rounded-lg p-4 overflow-auto max-h-[60vh] text-sm"><code class="text-left">{{ formattedSchema }}</code></pre>
              </div>

              <div class="mt-6 flex justify-end gap-3">
                <button
                  @click="downloadSchema"
                  class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <ArrowDownTrayIcon class="h-4 w-4 mr-1" />
                  Download JSON
                </button>
                <button
                  @click="close"
                  class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Success Toast -->
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showToast"
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
                Copied to clipboard!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { 
  DocumentDuplicateIcon, 
  ArrowDownTrayIcon, 
  Bars3BottomLeftIcon, 
  Bars3Icon,
  CheckCircleIcon 
} from '@heroicons/vue/24/outline'

defineOptions({
  name: 'SchemaViewer'
})

const props = defineProps<{
  isOpen: boolean
  schema: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isPrettyFormat = ref(true)
const showToast = ref(false)

const formattedSchema = computed(() => {
  return JSON.stringify(props.schema, null, isPrettyFormat.value ? 2 : 0)
})

const close = () => {
  emit('close')
}

const toggleFormat = () => {
  isPrettyFormat.value = !isPrettyFormat.value
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedSchema.value)
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy schema:', err)
  }
}

const downloadSchema = () => {
  const blob = new Blob([formattedSchema.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `form-schema-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
