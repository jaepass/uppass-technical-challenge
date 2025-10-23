<script setup lang="ts">
defineProps<{
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
}>();

defineOptions({
  name: 'BaseField'
})
</script>

<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-900"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <slot></slot>
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script lang="ts">
export default {}
</script>
