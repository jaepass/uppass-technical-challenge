import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/forms'
      },
      {
        path: '/forms',
        name: 'Forms',
        component: () => import('../views/BuilderView.vue')
      },
      {
        path: '/templates',
        name: 'Templates',
        component: () => import('../views/TemplatesView.vue')
      },
      {
        path: '/preview',
        name: 'FormPreview',
        component: () => import('../views/FormView.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
