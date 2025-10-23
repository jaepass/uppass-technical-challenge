<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <!-- Top Navigation -->
    <header class="flex-none bg-white border-b border-gray-200">
      <div class="mx-auto">
        <NavigationBar />
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden">
      <div class="h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <!-- Main content area -->
        <div class="h-full">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '../components/navigation/NavigationBar.vue'
</script>
