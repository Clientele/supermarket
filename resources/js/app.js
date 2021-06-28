import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import axios from "axios"

Vue.prototype.$axios = axios;
Vue.use(VueRouter)
Vue.use(Vuetify, {
    theme: {
        primary: '#FFA726',
        secondary: '#29B6F6',
        anyColor: '#0000'
    }
})

var BASE_URL = "http://" + window.location.host + "/api/v1/";

window.base_url = BASE_URL;


const routes = [
    //ROUTES FOR SYSTEM DASHBOARDS

    {
        path: '/',
        component: () =>
            import ("./components/Login.vue"),
        name: 'login'
    },
    {
        path: '/admin',
        component: () =>
            import ("./components/AdminLogin.vue"),
        name: 'admin'
    },
    {
        path: '/sales-panel',
        component: () =>
            import ("./components/main-panels/users/SalesPanel.vue"),
        name: 'sales-panel'
    },
    {
        path: '/sales-report-panel',
        component: () =>
            import ("./components/main-panels/users/SalesReportPanel.vue"),
        name: 'sales-report-panel'
    },
    {
        path: '/inventory-report-panel',
        component: () =>
            import ("./components/main-panels/users/InventoryReportPanel.vue"),
        name: 'inventory-report-panel'
    },
    {
        path: '/admin-dashboard',
        component: () =>
            import ("./components/main-panels/administrator/AdminPanel.vue"),
        name: 'admin-dashboard'
    },
    {
        path: '/add-new-user',
        component: () =>
            import ("./components/main-panels/administrator/AddNewUserPanel.vue"),
        name: 'add-new-user'
    },
    {
        path: '/update-user',
        component: () =>
            import ("./components/main-panels/administrator/UpdateUserPanel.vue"),
        name: 'update-user'
    },
    {
        path: '/add-new-product',
        component: () =>
            import ("./components/main-panels/administrator/AddNewProductPanel.vue"),
        name: 'add-new-product'
    },
    {
        path: '/update-product',
        component: () =>
            import ("./components/main-panels/administrator/UpdateProductPanel.vue"),
        name: 'update-product'
    },
    {
        path: '/product-category',
        component: () =>
            import ("./components/main-panels/administrator/AddNewCategoryPanel.vue"),
        name: 'product-category'
    },
    {
        path: '/branches',
        component: () =>
            import ("./components/main-panels/administrator/AddNewBranchPanel.vue"),
        name: 'branches'
    },
    {
        path: '/record-expenses',
        component: () =>
            import ("./components/main-panels/administrator/Expenses.vue"),
        name: 'record-expenses'
    },
    {
        path: '/user-record-expenses',
        component: () =>
            import ("./components/main-panels/users/Expenses.vue"),
        name: 'user-record-expenses'
    },
    {
        path: '/product-inventory',
        component: () =>
            import ("./components/main-panels/users/ProductInventoryPanel.vue"),
        name: 'product-inventory'
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})


const app = new Vue({
    el: '#app',
    router: router,
    vuetify: new Vuetify({
        theme: {
            primary: '#FFA726',
            secondary: '#29B6F6',
            anyColor: '#0000'
        }
    }),
});