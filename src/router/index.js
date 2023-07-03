import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import MainLayout from '../components/layouts/MainLayout.vue'

// Todo
import TodoList from '../views/todo/TodoList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'HomeView',
          component: HomeView
        },
        {
          path: '/about',
          name: 'AboutView',
          component: AboutView
        },
        {
          path: '/todo',
          name: 'TodoList',
          component: TodoList
        }
      ]
    }
  ]
})

export default router
