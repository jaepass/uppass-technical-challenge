<template>
  <ErrorBoundary>
    <router-view />
  </ErrorBoundary>
</template>

<script setup lang="ts">
import ErrorBoundary from './components/base/ErrorBoundary.vue'
</script>

<style>
:root {
  --primary-50: #f0f9ff;
  --primary-100: #e0f2fe;
  --primary-200: #bae6fd;
  --primary-300: #7dd3fc;
  --primary-400: #38bdf8;
  --primary-500: #0ea5e9;
  --primary-600: #0284c7;
  --primary-700: #0369a1;
  --primary-800: #075985;
  --primary-900: #0c4a6e;
}

.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 inline-flex items-center;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}

.btn-secondary {
  @apply bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 
         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}
</style>
