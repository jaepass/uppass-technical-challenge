<template>
  <BaseField :id="id" :label="label" :required="required" :error="error">
    <RadioGroup
      :value="modelValue"
      class="mt-2"
      @update:modelValue="(value) => emit('update:modelValue', value)"
    >
      <RadioGroupLabel class="sr-only">{{ label }}</RadioGroupLabel>
      <div class="space-y-1.5">
        <RadioGroupOption
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          v-slot="{ checked, active }"
          as="template"
        >
          <div class="relative flex cursor-pointer rounded-lg px-4 py-2 shadow-sm focus:outline-none">
            <div class="flex items-center">
              <div 
                class="flex h-4 w-4 items-center justify-center rounded-full border"
                :class="[
                  checked ? 'border-transparent bg-primary-500 ring-2 ring-primary-500 ring-offset-2' : 'border-gray-300',
                  active ? 'border-primary-500' : ''
                ]"
              >
                <div class="h-2 w-2 rounded-full bg-white" v-if="checked" />
              </div>
              <div class="ml-3">
                <RadioGroupLabel
                  as="span"
                  :class="[
                    checked ? 'text-primary-900' : 'text-gray-900',
                    'block text-sm font-medium leading-6'
                  ]"
                >
                  {{ option.label }}
                </RadioGroupLabel>
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </BaseField>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import BaseField from './BaseField.vue'

interface Option {
  label: string
  value: string | number
}

const props = defineProps<{
  id: string
  label?: string
  modelValue: string | number | null
  options: Option[]
  required?: boolean
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

defineOptions({
  name: 'RadioField'
})
</script>
