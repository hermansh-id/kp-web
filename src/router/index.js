import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/dashboard/Dashboard.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/pengguna',
      name: 'pengguna',
      component: () => import('@/views/pengguna/PenggunaAll.vue'),
      meta: {
        pageTitle: 'Pengguna',
        breadcrumb: [
          {
            text: 'Pengguna',
            active: true,
          },
        ],
      },
    },
    {
      path: '/pengguna/edit/:id',
      name: 'editpengguna',
      component: () => import('@/views/pengguna/PenggunaEdit.vue'),
      meta: {
        pageTitle: 'Pengguna',
        breadcrumb: [
          {
            text: 'Pengguna',
            to: '/pengguna',
          },
          {
            text: 'Edit Pengguna',
            active: true,
          },
        ],
      },
    },
    {
      path: '/pengguna/tambah',
      name: 'addpengguna',
      component: () => import('@/views/pengguna/PenggunaAdd.vue'),
      meta: {
        pageTitle: 'Tambah Pengguna',
        breadcrumb: [
          {
            text: 'Pengguna',
            to: '/pengguna',
          },
          {
            text: 'Tambah Pengguna',
            active: true,
          },
        ],
      },
    },
    {
      path: '/ajuan/kp',
      name: 'kp',
      component: () => import('@/views/kp/KPAll.vue'),
      meta: {
        pageTitle: 'Kerja Praktek',
        breadcrumb: [
          {
            text: 'Kerja Praktek',
            active: true,
          },
        ],
      },
    },
    {
      path: '/ajuan/kak',
      name: 'kak',
      component: () => import('@/views/kak/KAKAll.vue'),
      meta: {
        pageTitle: 'Keterangan Aktif Kuliah',
        breadcrumb: [
          {
            text: 'Keterangan Aktif Kuliah',
            active: true,
          },
        ],
      },
    },
    {
      path: '/ajuan/kp/detail/:id',
      name: 'kpdetail',
      component: () => import('@/views/kp/KPDetail.vue'),
      meta: {
        pageTitle: 'Kerja Praktek',
        breadcrumb: [
          {
            text: 'Kerja Praktek',
            to: '/ajuan/kp',
          },
          {
            text: 'Ajuan',
            active: true,
          },
        ],
      },
    },
    {
      path: '/ajuan/kak/detail/:id',
      name: 'kakdetail',
      component: () => import('@/views/kak/KAKDetail.vue'),
      meta: {
        pageTitle: 'Keterangan Aktif Kuliah',
        breadcrumb: [
          {
            text: 'Keterangan Aktif Kuliah',
            to: '/ajuan/kak',
          },
          {
            text: 'Ajuan',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/authentication/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
