<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Form Templates</h1>
        <p class="mt-1 text-sm text-gray-500">Start with a pre-built template or create your own</p>
      </div>
      <button
        type="button"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create Template
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="template in templates"
        :key="template.id"
        class="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
      >
        <div class="p-6 flex flex-col flex-1">
          <div class="flex items-center space-x-3">
            <component :is="template.icon" class="h-6 w-6 text-gray-400" />
            <h3 class="text-sm font-medium text-gray-900">{{ template.name }}</h3>
          </div>
          <p class="mt-2 text-sm text-gray-500">{{ template.description }}</p>
          <div class="mt-6 flex items-center space-x-4">
            <button
              type="button"
              class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50"
              @click="previewTemplate(template)"
            >
              Preview
            </button>
            <button
              type="button"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="useTemplate(template)"
            >
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

interface Template {
  id: string
  name: string
  description: string
  icon: any
}

const templates = ref<Template[]>([
  {
    id: '1',
    name: 'Contact Form',
    description: 'Simple contact form with name, email, and message fields',
    icon: DocumentTextIcon
  },
  {
    id: '2',
    name: 'Survey Form',
    description: 'Comprehensive survey form with various question types',
    icon: ClipboardDocumentListIcon
  },
  {
    id: '3',
    name: 'Registration Form',
    description: 'User registration form with validation',
    icon: UserIcon
  }
])

const previewTemplate = (template: Template) => {
  // TODO: Implement preview functionality
  console.log('Preview template:', template.name)
}

const useTemplate = (template: Template) => {
  // TODO: Implement use template functionality
  console.log('Use template:', template.name)
}
</script>
