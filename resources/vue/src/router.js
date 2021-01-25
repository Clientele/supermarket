/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Structure:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth/authService'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/DashboardAnalytics.vue'),
          meta: {
            rule: 'admin'
          }
        },

        // =============================================================================
        // 1.0 PRODUCTS ROUTES
        // =============================================================================
        {
          path: '/products/vendors',
          name: 'products-vendors',
          component: () => import('@/views/products/vendors/Vendors'),
          meta: { rule: 'admin' }
        },
        {
          path: '/products/products/categories',
          name: 'products-products-categories',
          component: () => import('@/views/products/products/ProductCategories'),
          meta: { rule: 'admin' }
        },
        {
          path: '/products/products',
          name: 'products-products',
          component: () => import('@/views/products/products/Products'),
          meta: { rule: 'admin' }
        },
        {
          path: '/products/inventory/stock',
          name: 'products-inventory-stock',
          component: () => import('@/views/products/inventory/Stock'),
          meta: { rule: 'admin' }
        },
        {
          path: '/products/inventory/stock/moving',
          name: 'products-inventory-stock-moving',
          component: () => import('@/views/products/inventory/Stock'),
          meta: { rule: 'admin' }
        },

        {
          path: '/products/inventory/stock/requests',
          name: 'products-inventory-stock-requests',
          component: () => import('@/views/products/inventory/requests/StockRequests'),
          meta: { rule: 'admin' }
        },
        {
          path: '/products/inventory/stock/request/details',
          name: 'products-inventory-stock-request-details',
          component: () => import('@/views/products/inventory/requests/RequestDetails'),
          meta: { rule: 'admin' }
        },



        // =============================================================================
        // 2.0 SALES ROUTES
        // =============================================================================
        {
          path: '/sales/customers',
          name: 'sales-customers',
          component: () => import('@/views/sales/customers/Customers'),
          meta: { rule: 'admin' }
        },
        {
          path: '/sales/customer/details',
          name: 'sales-customer-details',
          component: () => import('@/views/sales/customers/CustomerDetails'),
          meta: { rule: 'admin' },
          props: true
        },
        {
          path: '/sales/orders',
          name: 'sales-orders',
          component: () => import('@/views/sales/orders/Orders'),
          meta: { rule: 'admin' }
        },

        // =============================================================================
        // 3.0 CONFIG ROUTES
        // =============================================================================
        //Users
        {
          path: '/config/access/users',
          name: 'config-access-user',
          component: () => import('@/views/config/access/Users'),
          meta: { rule: 'admin' }
        },
        {
          path: '/config/access/user',
          name: 'config-access-user-details',
          component: () => import('@/views/config/access/UserDetails'),
          meta: { rule: 'admin' },
          props: true
         // props: { default: true,  sidebar: route => ({ userId: route.query.userId })}
        },

        //Roles
        {
          path: '/config/access/permissions',
          name: 'page-register',
          component: () => import('@/views/config/access/Roles'),
          meta: { rule: 'admin'}
        },

        /*** ASSETS ***/
        //Depots
        {
          path: '/config/depots',
          name: 'config-depots',
          component: () => import('@/views/config/depots/Depots'),
          meta: { rule: 'admin'}
        },

        //Vehicles
        {
          path: '/config/assets/vehicles',
          name: 'config-assets/vehicles',
          component: () => import('@/views/config/vehicles/Vehicles'),
          meta: { rule: 'admin'}
        },

        /*** ADDRESSES ***/
        {
          path: '/config/addresses',
          name: 'config-addresses',
          component: () => import('@/views/config/addresses/Addresses'),
          meta: {
            rule: 'admin',
            pageTitle: 'Addresses'
          }
        },
        {
          path: '/config/addresses/zones',
          name: 'config-addresses-zones',
          component: () => import('@/views/config/addresses/SalesZones'),
          meta: {
            rule: 'admin'
           }
        },


      ]
    },


    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/vendors',
          name: 'page-register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  return next()
})

export default router
