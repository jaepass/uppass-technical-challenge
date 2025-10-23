<template>
  <nav class="bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span class="text-xl font-bold text-primary-500">UpPass</span>
          </div>
          
          <!-- Navigation Items -->
          <div class="hidden md:ml-8 md:flex md:space-x-4">
            <RouterLink
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md"
              :class="[
                currentRoute === item.path
                  ? 'bg-primary-50 text-primary-500'
                  : 'text-gray-700 hover:bg-gray-50'
              ]"
            >
              {{ item.name }}
            </RouterLink>
          </div>
        </div>

        <!-- Right side buttons -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            title="Documentation"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <DocumentTextIcon class="w-full h-full" />
            </div>
          </button>
          <button
            type="button"
            class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            title="Settings"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <Cog6ToothIcon class="w-full h-full" />
            </div>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <div class="w-3.5 h-3.5 flex items-center justify-center overflow-hidden">
              <Bars3Icon v-if="!isMobileMenuOpen" class="w-full h-full" style="transform: scale(0.75);" />
              <XMarkIcon v-else class="w-full h-full" style="transform: scale(0.75);" />
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden" v-show="isMobileMenuOpen">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="block rounded-md px-3 py-2 text-base font-medium"
          :class="[
            currentRoute === item.path
              ? 'bg-primary-50 text-primary-500'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          {{ item.name }}
        </RouterLink>
        
        <div class="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            title="Documentation"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <DocumentTextIcon class="w-full h-full" />
            </div>
          </button>
          <button
            type="button"
            class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            title="Settings"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <Cog6ToothIcon class="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Bars3Icon, XMarkIcon, DocumentTextIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const currentRoute = computed(() => route.path)

const navigationItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Forms', path: '/forms' },
  { name: 'Templates', path: '/templates' }
]
</script>

<style scoped>
.w-3\.5 {
  width: 0.875rem !important;
}
.h-3\.5 {
  height: 0.875rem !important;
}
</style>
