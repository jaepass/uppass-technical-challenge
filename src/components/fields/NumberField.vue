<template>
  <BaseField :id="id" :label="label" :required="required" :error="error">
    <input
      :id="id"
      ref="input"
      type="number"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :required="required"
      :min="min"
      :max="max"
      :step="allowDecimal ? '0.01' : '1'"
      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
      :class="{ 'ring-red-300 focus:ring-red-500': error }"
    />
  </BaseField>
</template>

<script setup lang="ts">
import BaseField from './BaseField.vue'

const props = defineProps<{
  id: string
  label?: string
  modelValue: number | null
  placeholder?: string
  required?: boolean
  error?: string
  min?: number
  max?: number
  allowDecimal?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

defineOptions({
  name: 'NumberField'
})

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value === '' ? null : Number(value))
}
</script>
