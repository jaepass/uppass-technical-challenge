<template>
  <BaseField :id="id" :label="label" :required="required" :error="error">
    <input
      :id="id"
      ref="input"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :required="required"
      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
      :class="{ 'ring-red-300 focus:ring-red-500': error }"
    />
  </BaseField>
</template>

<script setup lang="ts">
import BaseField from './BaseField.vue'

defineProps<{
  id: string
  label?: string
  modelValue: string
  placeholder?: string
  required?: boolean
  error?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

defineOptions({
  name: 'TextField'
})
</script>
