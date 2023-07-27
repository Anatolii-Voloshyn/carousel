import {createRouter, createWebHistory} from 'vue-router';
import DefaultLayout from '../components/DefaultLayout.vue';
import Carousel from '../components/Carousel.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/carousel',
        name: 'carousel',
        component: Carousel
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;