(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_main-panels_administrator_AdminPanel_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      drawer: null,
      component: null,
      profile_photo: 'assets/images/profiles/profile.png',
      user_name: null
    };
  },
  methods: {
    signOut: function signOut() {
      this.$router.push("/")["catch"](function (e) {});
    }
  },
  created: function created() {
    if (localStorage.getItem("loged_in") == "true") {
      this.user_name = localStorage.getItem("loged_name");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _horizontal_menu_bar_HorizontalNavMenu_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../horizontal-menu-bar/HorizontalNavMenu.vue */ "./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue");
/* harmony import */ var _vertical_nav_menu_VerticalNavBarAdmin_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../vertical-nav-menu/VerticalNavBarAdmin.vue */ "./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var gradients = [["#222"], ["#42b3f4"], ["red", "orange", "yellow"], ["red", "#FFA726", "green"], ["#00c6ff", "#F0F", "#FF0"], ["#f72047", "#ffd200", "#1feaea"]];


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      show: true,
      fill: true,
      totalCash: 0,
      totalExpenses: 0,
      total_item_sold: 2300,
      selectedGradient: gradients[4],
      selectedGradient2: gradients[2],
      gradients: gradients,
      padding: 8,
      radius: 5,
      value: [200000, 250000, 500000, 900000, 500000, 1000000, 100000],
      expenses_value: [50000, 25000, 100000, 80000, 20000, 0, 30000],
      width: 1,
      best_selling_products: [{
        name: "Best Product 1",
        sales: 1000000,
        sales_count: 10,
        color: "#8CBF1C"
      }, {
        name: "Best Product 2",
        sales: 800000,
        sales_count: 8,
        color: "#ADCF1A"
      }, {
        name: "Best Product 3",
        sales: 600000,
        sales_count: 30,
        color: "#CCE00E"
      }, {
        name: "Best Product 4",
        sales: 400000,
        sales_count: 20,
        color: "#F4EA3D"
      }, {
        name: "Best Product 5",
        sales: 300000,
        sales_count: 10,
        color: "#FFF700"
      }],
      branch_sales_headers: [{
        text: "Branch name",
        value: "branch_name",
        align: "start"
      }, {
        text: "Branch Sales",
        value: "sales"
      }],
      branch_sales: [{
        branch_name: "Mbezi",
        sales: 1000000
      }, {
        branch_name: "Oysterbay",
        sales: 2000000
      }, {
        branch_name: "Karia koo",
        sales: 500000
      }]
    };
  },
  components: {
    VerticalNavBarAdminVue: _vertical_nav_menu_VerticalNavBarAdmin_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    HorizontalNavMenuVue: _horizontal_menu_bar_HorizontalNavMenu_vue__WEBPACK_IMPORTED_MODULE_0__.default
  },
  created: function created() {
    var _this = this;

    this.value.forEach(function (element) {
      _this.totalCash += element;
    });
    this.expenses_value.forEach(function (value) {
      _this.totalExpenses += value;
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      drawer: true,
      usermanage: false,
      productmanage: false,
      branchmanage: false,
      expensemanage: false
    };
  },
  props: {
    active_button: String
  },
  methods: {
    users: function users() {
      this.usermanage = !this.usermanage; //this.$router.push("users-panel").catch((e) => {});
    },
    product: function product() {
      this.productmanage = !this.productmanage;
    },
    branch: function branch() {
      this.branchmanage = !this.branchmanage;
    },
    dashboard: function dashboard() {
      this.$router.push("admin-dashboard")["catch"](function (e) {});
    },
    registerNewUser: function registerNewUser() {
      this.$router.push("add-new-user")["catch"](function (e) {});
    },
    updateUser: function updateUser() {
      this.$router.push("update-user")["catch"](function (e) {});
    },
    addNewProduct: function addNewProduct() {
      this.$router.push("add-new-product")["catch"](function (e) {});
    },
    updateProduct: function updateProduct() {
      this.$router.push("update-product")["catch"](function (e) {});
    },
    productCategory: function productCategory() {
      this.$router.push("product-category")["catch"](function (e) {});
    },
    branches: function branches() {
      this.$router.push("branches")["catch"](function (e) {});
    },
    createExpense: function createExpense() {
      this.$router.push("record-expenses")["catch"](function (e) {});
    },
    expensesReport: function expensesReport() {},
    expences: function expences() {
      this.expensemanage = !this.expensemanage;
    }
  },
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.menu[data-v-b187f63c] {\n  text-transform: none !important;\n}\n.bounce-enter-active[data-v-b187f63c] {\n  -webkit-animation: bounce-in-data-v-b187f63c 0.5s;\n          animation: bounce-in-data-v-b187f63c 0.5s;\n}\n.bounce-leave-active[data-v-b187f63c] {\n  animation: bounce-in-data-v-b187f63c 0.5s reverse;\n}\n@-webkit-keyframes bounce-in-data-v-b187f63c {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n@keyframes bounce-in-data-v-b187f63c {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.menu[data-v-075d6e24] {\n  text-transform: none !important;\n}\n.components[data-v-075d6e24] {\n  height: 90vh;\n  overflow: scroll;\n  overflow-x: hidden;\n}\n.bounce-enter-active[data-v-075d6e24] {\n  -webkit-animation: bounce-in-data-v-075d6e24 0.8s;\n          animation: bounce-in-data-v-075d6e24 0.8s;\n}\n.bounce-leave-active[data-v-075d6e24] {\n  animation: bounce-in-data-v-075d6e24 0.8s reverse;\n}\n@-webkit-keyframes bounce-in-data-v-075d6e24 {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n@keyframes bounce-in-data-v-075d6e24 {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.menu[data-v-52f7f182] {\n  text-transform: none !important;\n}\n.bounce-enter-active[data-v-52f7f182] {\n  -webkit-animation: bounce-in-data-v-52f7f182 0.5s;\n          animation: bounce-in-data-v-52f7f182 0.5s;\n}\n.bounce-leave-active[data-v-52f7f182] {\n  animation: bounce-in-data-v-52f7f182 0.5s reverse;\n}\n.slide-fade-enter-active[data-v-52f7f182] {\n  transition: all 0.3s ease;\n}\n.slide-fade-leave-active[data-v-52f7f182] {\n  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);\n}\n.slide-fade-enter[data-v-52f7f182], .slide-fade-leave-to[data-v-52f7f182]\n/* .slide-fade-leave-active below version 2.1.8 */ {\n  transform: translateX(10px);\n  opacity: 0;\n}\n@-webkit-keyframes bounce-in-data-v-52f7f182 {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n@keyframes bounce-in-data-v-52f7f182 {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HorizontalNavMenu_vue_vue_type_style_index_0_id_b187f63c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HorizontalNavMenu_vue_vue_type_style_index_0_id_b187f63c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HorizontalNavMenu_vue_vue_type_style_index_0_id_b187f63c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminPanel_vue_vue_type_style_index_0_id_075d6e24_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminPanel_vue_vue_type_style_index_0_id_075d6e24_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminPanel_vue_vue_type_style_index_0_id_075d6e24_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavBarAdmin_vue_vue_type_style_index_0_id_52f7f182_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavBarAdmin_vue_vue_type_style_index_0_id_52f7f182_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavBarAdmin_vue_vue_type_style_index_0_id_52f7f182_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HorizontalNavMenu_vue_vue_type_template_id_b187f63c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HorizontalNavMenu.vue?vue&type=template&id=b187f63c&scoped=true& */ "./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=template&id=b187f63c&scoped=true&");
/* harmony import */ var _HorizontalNavMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HorizontalNavMenu.vue?vue&type=script&lang=js& */ "./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=script&lang=js&");
/* harmony import */ var _HorizontalNavMenu_vue_vue_type_style_index_0_id_b187f63c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css& */ "./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _HorizontalNavMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _HorizontalNavMenu_vue_vue_type_template_id_b187f63c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _HorizontalNavMenu_vue_vue_type_template_id_b187f63c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "b187f63c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/main-panels/administrator/AdminPanel.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/components/main-panels/administrator/AdminPanel.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AdminPanel_vue_vue_type_template_id_075d6e24_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdminPanel.vue?vue&type=template&id=075d6e24&scoped=true& */ "./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=template&id=075d6e24&scoped=true&");
/* harmony import */ var _AdminPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminPanel.vue?vue&type=script&lang=js& */ "./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=script&lang=js&");
/* harmony import */ var _AdminPanel_vue_vue_type_style_index_0_id_075d6e24_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css& */ "./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _AdminPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _AdminPanel_vue_vue_type_template_id_075d6e24_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _AdminPanel_vue_vue_type_template_id_075d6e24_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "075d6e24",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/main-panels/administrator/AdminPanel.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VerticalNavBarAdmin_vue_vue_type_template_id_52f7f182_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VerticalNavBarAdmin.vue?vue&type=template&id=52f7f182&scoped=true& */ "./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=template&id=52f7f182&scoped=true&");
/* harmony import */ var _VerticalNavBarAdmin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VerticalNavBarAdmin.vue?vue&type=script&lang=js& */ "./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=script&lang=js&");
/* harmony import */ var _VerticalNavBarAdmin_vue_vue_type_style_index_0_id_52f7f182_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css& */ "./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _VerticalNavBarAdmin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _VerticalNavBarAdmin_vue_vue_type_template_id_52f7f182_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _VerticalNavBarAdmin_vue_vue_type_template_id_52f7f182_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "52f7f182",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HorizontalNavMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HorizontalNavMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HorizontalNavMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AdminPanel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavBarAdmin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalNavBarAdmin.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavBarAdmin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css&":
/*!************************************************************************************************************************************!*\
  !*** ./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css& ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HorizontalNavMenu_vue_vue_type_style_index_0_id_b187f63c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=style&index=0&id=b187f63c&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css&":
/*!***********************************************************************************************************************************!*\
  !*** ./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminPanel_vue_vue_type_style_index_0_id_075d6e24_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=style&index=0&id=075d6e24&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css&":
/*!************************************************************************************************************************************!*\
  !*** ./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css& ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavBarAdmin_vue_vue_type_style_index_0_id_52f7f182_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=style&index=0&id=52f7f182&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=template&id=b187f63c&scoped=true&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=template&id=b187f63c&scoped=true& ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HorizontalNavMenu_vue_vue_type_template_id_b187f63c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HorizontalNavMenu_vue_vue_type_template_id_b187f63c_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HorizontalNavMenu_vue_vue_type_template_id_b187f63c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HorizontalNavMenu.vue?vue&type=template&id=b187f63c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=template&id=b187f63c&scoped=true&");


/***/ }),

/***/ "./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=template&id=075d6e24&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=template&id=075d6e24&scoped=true& ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminPanel_vue_vue_type_template_id_075d6e24_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminPanel_vue_vue_type_template_id_075d6e24_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminPanel_vue_vue_type_template_id_075d6e24_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AdminPanel.vue?vue&type=template&id=075d6e24&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=template&id=075d6e24&scoped=true&");


/***/ }),

/***/ "./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=template&id=52f7f182&scoped=true&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=template&id=52f7f182&scoped=true& ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavBarAdmin_vue_vue_type_template_id_52f7f182_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavBarAdmin_vue_vue_type_template_id_52f7f182_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavBarAdmin_vue_vue_type_template_id_52f7f182_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalNavBarAdmin.vue?vue&type=template&id=52f7f182&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=template&id=52f7f182&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=template&id=b187f63c&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue?vue&type=template&id=b187f63c&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app-bar",
    {
      attrs: {
        light: "",
        elevation: "1",
        color: "white",
        "clipped-right": "",
        app: ""
      }
    },
    [
      _c("v-spacer"),
      _vm._v(" "),
      _c(
        "v-menu",
        {
          attrs: { "open-on-hover": "", "offset-y": "" },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on
                var attrs = ref.attrs
                return [
                  _c(
                    "v-avatar",
                    _vm._g(
                      _vm._b(
                        {
                          staticStyle: {
                            margin: "10px",
                            "background-color": "white"
                          },
                          attrs: { size: "35" }
                        },
                        "v-avatar",
                        attrs,
                        false
                      ),
                      on
                    ),
                    [_c("img", { attrs: { src: _vm.profile_photo } })]
                  )
                ]
              }
            }
          ])
        },
        [
          _vm._v(" "),
          _c(
            "v-list",
            { attrs: { dense: "", nav: "" } },
            [
              _c(
                "p",
                {
                  staticClass: "pt-2",
                  staticStyle: { color: "#ffa726", "text-align": "center" }
                },
                [_vm._v(_vm._s(_vm.user_name))]
              ),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-list-item",
                { attrs: { link: "" } },
                [
                  _c(
                    "v-list-item-icon",
                    [
                      _c("v-icon", { attrs: { color: "#FFA726" } }, [
                        _vm._v("mdi-saw-blade")
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c(
                        "v-list-item-title",
                        { staticStyle: { color: "#ffa726" } },
                        [_vm._v("Account Settings")]
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                { attrs: { link: "" }, on: { click: _vm.signOut } },
                [
                  _c(
                    "v-list-item-icon",
                    [
                      _c("v-icon", { attrs: { color: "#FFA726" } }, [
                        _vm._v("mdi-logout")
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c(
                        "v-list-item-title",
                        { staticStyle: { color: "#ffa726" } },
                        [_vm._v("Sign out")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=template&id=075d6e24&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/administrator/AdminPanel.vue?vue&type=template&id=075d6e24&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    [
      _c("HorizontalNavMenuVue"),
      _vm._v(" "),
      _c("VerticalNavBarAdminVue", { attrs: { active_button: "dashboard" } }),
      _vm._v(" "),
      _c(
        "v-main",
        [
          _c(
            "v-container",
            { staticClass: "components" },
            [
              _c(
                "transition",
                { attrs: { name: "bounce" } },
                [
                  !_vm.show
                    ? _c(
                        "v-row",
                        {
                          staticClass: "components",
                          attrs: { justify: "center", align: "center" }
                        },
                        [
                          _c("v-progress-circular", {
                            attrs: { indeterminate: "", color: "#FFA726" }
                          })
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.show
                    ? _c("v-row", [
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 col-lg-6 col-sm-6" },
                          [
                            _c(
                              "v-card",
                              { attrs: { elevation: "1" } },
                              [
                                _c(
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-row",
                                      [
                                        _c("v-card-title", [
                                          _vm._v(" Sales per week")
                                        ]),
                                        _c("v-spacer"),
                                        _vm._v(" "),
                                        _c(
                                          "v-card-title",
                                          {
                                            staticStyle: {
                                              color: "#ffa726",
                                              "font-weight": "bold"
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n                    Tsh:\n                    " +
                                                _vm._s(
                                                  String(
                                                    _vm.totalCash
                                                  ).substring(1).length >= 3 &&
                                                    String(
                                                      _vm.totalCash
                                                    ).substring(1).length < 6
                                                    ? String(
                                                        _vm.totalCash / 1000
                                                      ) + "K"
                                                    : String(
                                                        _vm.totalCash
                                                      ).substring(1).length >= 6
                                                    ? String(
                                                        _vm.totalCash / 1000000
                                                      ) + "M"
                                                    : _vm.totalCash
                                                ) +
                                                "\n                  "
                                            )
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-card-text",
                                  [
                                    _c("v-sparkline", {
                                      attrs: {
                                        fill: _vm.fill,
                                        gradient: _vm.selectedGradient,
                                        "line-width": _vm.width,
                                        padding: _vm.padding,
                                        smooth: _vm.radius || false,
                                        value: _vm.value,
                                        color: "#FFA726",
                                        "auto-draw": ""
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "label",
                                            fn: function(item) {
                                              return [
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(
                                                      String(
                                                        item.value
                                                      ).substring(1).length >=
                                                        3 &&
                                                        String(
                                                          item.value
                                                        ).substring(1).length <
                                                          6
                                                        ? String(
                                                            item.value / 1000
                                                          ) + "K"
                                                        : String(
                                                            item.value
                                                          ).substring(1)
                                                            .length >= 6
                                                        ? String(
                                                            item.value / 1000000
                                                          ) + "M"
                                                        : item.value
                                                    ) +
                                                    "\n                  "
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        false,
                                        946760661
                                      )
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("v-card-text"),
                            _vm._v(" "),
                            _c("v-row", [
                              _c(
                                "div",
                                { staticClass: "col-6" },
                                [
                                  _c(
                                    "v-card",
                                    { attrs: { elevation: "1" } },
                                    [
                                      _c("v-card-text", [
                                        _c("h4", [_vm._v("Total sales (Tsh)")]),
                                        _vm._v(" "),
                                        _c("strong", [
                                          _c("h1", [
                                            _vm._v(
                                              "\n                        " +
                                                _vm._s(
                                                  String(
                                                    _vm.totalCash
                                                  ).substring(1).length >= 3 &&
                                                    String(
                                                      _vm.totalCash
                                                    ).substring(1).length < 6
                                                    ? String(
                                                        _vm.totalCash / 1000
                                                      ) + "K"
                                                    : String(
                                                        _vm.totalCash
                                                      ).substring(1).length >= 6
                                                    ? String(
                                                        _vm.totalCash / 1000000
                                                      ) + "M"
                                                    : _vm.totalCash
                                                ) +
                                                "\n                      "
                                            )
                                          ])
                                        ])
                                      ])
                                    ],
                                    1
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "col-6" },
                                [
                                  _c(
                                    "v-card",
                                    { attrs: { elevation: "1" } },
                                    [
                                      _c("v-card-text", [
                                        _c("h4", [_vm._v("Total Item sold")]),
                                        _vm._v(" "),
                                        _c("strong", [
                                          _c("h1", [
                                            _vm._v(
                                              "\n                        " +
                                                _vm._s(
                                                  String(
                                                    _vm.total_item_sold
                                                  ).substring(1).length >= 3 &&
                                                    String(
                                                      _vm.total_item_sold
                                                    ).substring(1).length < 6
                                                    ? String(
                                                        _vm.total_item_sold /
                                                          1000
                                                      ) + "K"
                                                    : String(
                                                        _vm.total_item_sold
                                                      ).substring(1).length >= 6
                                                    ? String(
                                                        _vm.total_item_sold /
                                                          1000000
                                                      ) + "M"
                                                    : _vm.total_item_sold
                                                ) +
                                                "\n                      "
                                            )
                                          ])
                                        ])
                                      ])
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 col-lg-6 col-sm-6" },
                          [
                            _c(
                              "v-card",
                              { attrs: { elevation: "1" } },
                              [
                                _c(
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-row",
                                      [
                                        _c("v-card-title", [
                                          _vm._v(
                                            "\n                    Best selling products of the week\n                  "
                                          )
                                        ])
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-row",
                                      [
                                        _vm._l(
                                          _vm.best_selling_products,
                                          function(product, index) {
                                            return [
                                              _c(
                                                "div",
                                                {
                                                  key: index,
                                                  staticClass: "col-6"
                                                },
                                                [
                                                  _c("v-row", [
                                                    _c(
                                                      "div",
                                                      { staticClass: "col-1" },
                                                      [
                                                        _c("v-avatar", {
                                                          attrs: {
                                                            color:
                                                              product.color,
                                                            size: "10"
                                                          }
                                                        })
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      { staticClass: "col-10" },
                                                      [
                                                        _c("label", [
                                                          _vm._v(
                                                            _vm._s(product.name)
                                                          )
                                                        ]),
                                                        _c("br"),
                                                        _vm._v(" "),
                                                        _c("label", [
                                                          _vm._v(
                                                            "Sales:\n                            " +
                                                              _vm._s(
                                                                String(
                                                                  product.sales
                                                                ).substring(1)
                                                                  .length >=
                                                                  3 &&
                                                                  String(
                                                                    product.sales
                                                                  ).substring(1)
                                                                    .length < 6
                                                                  ? String(
                                                                      product.sales /
                                                                        1000
                                                                    ) + "K"
                                                                  : String(
                                                                      product.sales
                                                                    ).substring(
                                                                      1
                                                                    ).length >=
                                                                    6
                                                                  ? String(
                                                                      product.sales /
                                                                        1000000
                                                                    ) + "M"
                                                                  : product.sales
                                                              )
                                                          )
                                                        ]),
                                                        _c("br"),
                                                        _vm._v(" "),
                                                        _c("label", [
                                                          _vm._v(
                                                            "Counts: " +
                                                              _vm._s(
                                                                product.sales_count
                                                              )
                                                          )
                                                        ])
                                                      ]
                                                    )
                                                  ])
                                                ],
                                                1
                                              )
                                            ]
                                          }
                                        )
                                      ],
                                      2
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 col-lg-6 col-sm-6" },
                          [
                            _c(
                              "v-card",
                              { attrs: { elevation: "1" } },
                              [
                                _c(
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-row",
                                      [
                                        _c("v-card-title", [
                                          _vm._v(
                                            "\n                    Today Branches sales (Tsh)\n                  "
                                          )
                                        ])
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-card-text",
                                  [
                                    _c("v-data-table", {
                                      attrs: {
                                        headers: _vm.branch_sales_headers,
                                        items: _vm.branch_sales
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "item.sales",
                                            fn: function(ref) {
                                              var item = ref.item
                                              return [
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(
                                                      String(
                                                        item.sales
                                                      ).substring(1).length >=
                                                        3 &&
                                                        String(
                                                          item.sales
                                                        ).substring(1).length <
                                                          6
                                                        ? String(
                                                            item.sales / 1000
                                                          ) + "K"
                                                        : String(
                                                            item.sales
                                                          ).substring(1)
                                                            .length >= 6
                                                        ? String(
                                                            item.sales / 1000000
                                                          ) + "M"
                                                        : item.sales
                                                    ) +
                                                    "\n                  "
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 col-lg-6 col-sm-6" },
                          [
                            _c(
                              "v-card",
                              { attrs: { elevation: "1" } },
                              [
                                _c(
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-row",
                                      [
                                        _c("v-card-title", [
                                          _vm._v(" Expenses per week")
                                        ]),
                                        _c("v-spacer"),
                                        _vm._v(" "),
                                        _c(
                                          "v-card-title",
                                          {
                                            staticStyle: {
                                              color: "#ffa726",
                                              "font-weight": "bold"
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n                    Tsh:\n                    " +
                                                _vm._s(
                                                  String(
                                                    _vm.totalExpenses
                                                  ).substring(1).length >= 3 &&
                                                    String(
                                                      _vm.totalExpenses
                                                    ).substring(1).length < 6
                                                    ? String(
                                                        _vm.totalExpenses / 1000
                                                      ) + "K"
                                                    : String(
                                                        _vm.totalExpenses
                                                      ).substring(1).length >= 6
                                                    ? String(
                                                        _vm.totalExpenses /
                                                          1000000
                                                      ) + "M"
                                                    : _vm.totalExpenses
                                                ) +
                                                "\n                  "
                                            )
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-card-text",
                                  [
                                    _c("v-sparkline", {
                                      attrs: {
                                        fill: true,
                                        gradient: _vm.selectedGradient2,
                                        "line-width": 2,
                                        padding: 8,
                                        smooth: 5 || 0,
                                        value: _vm.expenses_value,
                                        color: "#FFA726",
                                        "auto-draw": ""
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "label",
                                            fn: function(item) {
                                              return [
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(
                                                      String(
                                                        item.value
                                                      ).substring(1).length >=
                                                        3 &&
                                                        String(
                                                          item.value
                                                        ).substring(1).length <
                                                          6
                                                        ? String(
                                                            item.value / 1000
                                                          ) + "K"
                                                        : String(
                                                            item.value
                                                          ).substring(1)
                                                            .length >= 6
                                                        ? String(
                                                            item.value / 1000000
                                                          ) + "M"
                                                        : item.value
                                                    ) +
                                                    "\n                  "
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        false,
                                        946760661
                                      )
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ])
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=template&id=52f7f182&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavBarAdmin.vue?vue&type=template&id=52f7f182&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-navigation-drawer",
    {
      attrs: { app: "", light: "" },
      model: {
        value: _vm.drawer,
        callback: function($$v) {
          _vm.drawer = $$v
        },
        expression: "drawer"
      }
    },
    [
      _c(
        "v-row",
        { staticClass: "mt-10" },
        [
          _c("v-card-text", [
            _c(
              "h2",
              { staticStyle: { "text-align": "center", color: "#ffa726" } },
              [_vm._v("Adminstrator")]
            )
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c(
        "v-col",
        [
          _c("v-hover", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var hover = ref.hover
                  return [
                    _c(
                      "v-btn",
                      {
                        staticClass: "menu",
                        style: {
                          boxShadow: hover
                            ? "0px 0px 8px #778899"
                            : "0px 0px 8px #FFA726"
                        },
                        attrs: {
                          rounded: "",
                          block: "",
                          color: hover
                            ? "#FFA726"
                            : _vm.active_button == "dashboard"
                            ? "#FFA726"
                            : "white"
                        },
                        on: {
                          click: function($event) {
                            return _vm.dashboard()
                          }
                        }
                      },
                      [
                        _c(
                          "span",
                          {
                            style: {
                              color: hover
                                ? "white"
                                : _vm.active_button == "dashboard"
                                ? "white"
                                : "#FFA726"
                            }
                          },
                          [_vm._v("\n          Dashboard")]
                        ),
                        _c("v-spacer")
                      ],
                      1
                    )
                  ]
                }
              }
            ])
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c(
        "v-col",
        [
          _c("v-hover", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var hover = ref.hover
                  return [
                    _c(
                      "v-btn",
                      {
                        staticClass: "menu mb-5",
                        style: {
                          boxShadow: hover
                            ? "0px 0px 8px #778899"
                            : "0px 0px 8px #FFA726"
                        },
                        attrs: {
                          rounded: "",
                          block: "",
                          color: hover
                            ? "#FFA726"
                            : _vm.active_button == "users"
                            ? "#FFA726"
                            : "white"
                        },
                        on: {
                          click: function($event) {
                            return _vm.users()
                          }
                        }
                      },
                      [
                        _c(
                          "span",
                          {
                            style: {
                              color: hover
                                ? "white"
                                : _vm.active_button == "users"
                                ? "white"
                                : "#FFA726"
                            }
                          },
                          [_vm._v("\n          User Management")]
                        ),
                        _c("v-spacer"),
                        _vm.usermanage
                          ? _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: hover
                                    ? "white"
                                    : _vm.active_button == "users"
                                    ? "white"
                                    : "#FFA726"
                                }
                              },
                              [_vm._v("mdi-chevron-up")]
                            )
                          : _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: hover
                                    ? "white"
                                    : _vm.active_button == "users"
                                    ? "white"
                                    : "#FFA726"
                                }
                              },
                              [_vm._v("mdi-chevron-down")]
                            )
                      ],
                      1
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "transition",
            { attrs: { name: "slide-fade" } },
            [
              _vm.usermanage
                ? _c(
                    "v-row",
                    { staticClass: "mb-4", attrs: { justify: "center" } },
                    [
                      _c(
                        "v-card",
                        { attrs: { width: "90%", elevation: "0", tile: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "menu",
                              attrs: {
                                tile: "",
                                block: "",
                                elevation: "0",
                                light: "",
                                color: "#FFA726",
                                text: ""
                              },
                              on: {
                                click: function($event) {
                                  return _vm.registerNewUser()
                                }
                              }
                            },
                            [_vm._v("Register User "), _c("v-spacer")],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "menu",
                              attrs: {
                                tile: "",
                                block: "",
                                elevation: "0",
                                light: "",
                                color: "#FFA726",
                                text: ""
                              },
                              on: {
                                click: function($event) {
                                  return _vm.updateUser()
                                }
                              }
                            },
                            [_vm._v("Update User "), _c("v-spacer")],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("v-hover", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var hover = ref.hover
                  return [
                    _c(
                      "v-btn",
                      {
                        staticClass: "menu mb-5",
                        style: {
                          boxShadow: hover
                            ? "0px 0px 8px #778899"
                            : "0px 0px 8px #FFA726"
                        },
                        attrs: {
                          rounded: "",
                          block: "",
                          color: hover
                            ? "#FFA726"
                            : _vm.active_button == "product"
                            ? "#FFA726"
                            : "white"
                        },
                        on: {
                          click: function($event) {
                            return _vm.product()
                          }
                        }
                      },
                      [
                        _c(
                          "span",
                          {
                            style: {
                              color: hover
                                ? "white"
                                : _vm.active_button == "product"
                                ? "white"
                                : "#FFA726"
                            }
                          },
                          [_vm._v("\n          Product Management")]
                        ),
                        _c("v-spacer"),
                        _vm.productmanage
                          ? _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: hover
                                    ? "white"
                                    : _vm.active_button == "product"
                                    ? "white"
                                    : "#FFA726"
                                }
                              },
                              [_vm._v("mdi-chevron-up")]
                            )
                          : _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: hover
                                    ? "white"
                                    : _vm.active_button == "product"
                                    ? "white"
                                    : "#FFA726"
                                }
                              },
                              [_vm._v("mdi-chevron-down")]
                            )
                      ],
                      1
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "transition",
            { attrs: { name: "slide-fade" } },
            [
              _vm.productmanage
                ? _c(
                    "v-row",
                    { staticClass: "mb-4", attrs: { justify: "center" } },
                    [
                      _c(
                        "v-card",
                        { attrs: { width: "90%", elevation: "0", tile: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "menu",
                              attrs: {
                                tile: "",
                                block: "",
                                elevation: "0",
                                light: "",
                                color: "#FFA726",
                                text: ""
                              },
                              on: { click: _vm.addNewProduct }
                            },
                            [_vm._v("Add New Product"), _c("v-spacer")],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "menu",
                              attrs: {
                                tile: "",
                                block: "",
                                elevation: "0",
                                light: "",
                                color: "#FFA726",
                                text: ""
                              },
                              on: { click: _vm.updateProduct }
                            },
                            [_vm._v("Update Product "), _c("v-spacer")],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "menu",
                              attrs: {
                                tile: "",
                                block: "",
                                elevation: "0",
                                light: "",
                                color: "#FFA726",
                                text: ""
                              },
                              on: { click: _vm.productCategory }
                            },
                            [_vm._v("Product Categories "), _c("v-spacer")],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("v-hover", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var hover = ref.hover
                  return [
                    _c(
                      "v-btn",
                      {
                        staticClass: "menu mb-5",
                        style: {
                          boxShadow: hover
                            ? "0px 0px 8px #778899"
                            : "0px 0px 8px #FFA726"
                        },
                        attrs: {
                          rounded: "",
                          block: "",
                          color: hover
                            ? "#FFA726"
                            : _vm.active_button == "branch"
                            ? "#FFA726"
                            : "white"
                        },
                        on: {
                          click: function($event) {
                            return _vm.branch()
                          }
                        }
                      },
                      [
                        _c(
                          "span",
                          {
                            style: {
                              color: hover
                                ? "white"
                                : _vm.active_button == "branch"
                                ? "white"
                                : "#FFA726"
                            }
                          },
                          [_vm._v("\n          Branch Management")]
                        ),
                        _c("v-spacer"),
                        _vm.branchmanage
                          ? _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: hover
                                    ? "white"
                                    : _vm.active_button == "branch"
                                    ? "white"
                                    : "#FFA726"
                                }
                              },
                              [_vm._v("mdi-chevron-up")]
                            )
                          : _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: hover
                                    ? "white"
                                    : _vm.active_button == "branch"
                                    ? "white"
                                    : "#FFA726"
                                }
                              },
                              [_vm._v("mdi-chevron-down")]
                            )
                      ],
                      1
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "transition",
            { attrs: { name: "slide-fade" } },
            [
              _vm.branchmanage
                ? _c(
                    "v-row",
                    { staticClass: "mb-4", attrs: { justify: "center" } },
                    [
                      _c(
                        "v-card",
                        { attrs: { width: "90%", elevation: "0", tile: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "menu",
                              attrs: {
                                tile: "",
                                block: "",
                                elevation: "0",
                                light: "",
                                color: "#FFA726",
                                text: ""
                              },
                              on: { click: _vm.branches }
                            },
                            [_vm._v("Add New Branch"), _c("v-spacer")],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "menu",
                              attrs: {
                                tile: "",
                                block: "",
                                elevation: "0",
                                light: "",
                                color: "#FFA726",
                                text: ""
                              }
                            },
                            [_vm._v("Update Branch "), _c("v-spacer")],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("v-hover", {
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var hover = ref.hover
                  return [
                    _c(
                      "v-btn",
                      {
                        staticClass: "menu mb-5",
                        style: {
                          boxShadow: hover
                            ? "0px 0px 8px #778899"
                            : "0px 0px 8px #FFA726"
                        },
                        attrs: {
                          rounded: "",
                          block: "",
                          color: hover
                            ? "#FFA726"
                            : _vm.active_button == "expenses"
                            ? "#FFA726"
                            : "white"
                        },
                        on: {
                          click: function($event) {
                            return _vm.expences()
                          }
                        }
                      },
                      [
                        _c(
                          "span",
                          {
                            style: {
                              color: hover
                                ? "white"
                                : _vm.active_button == "expenses"
                                ? "white"
                                : "#FFA726"
                            }
                          },
                          [_vm._v(" Expenses")]
                        ),
                        _c("v-spacer"),
                        _vm.expensemanage
                          ? _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: hover
                                    ? "white"
                                    : _vm.active_button == "expenses"
                                    ? "white"
                                    : "#FFA726"
                                }
                              },
                              [_vm._v("mdi-chevron-up")]
                            )
                          : _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: hover
                                    ? "white"
                                    : _vm.active_button == "expenses"
                                    ? "white"
                                    : "#FFA726"
                                }
                              },
                              [_vm._v("mdi-chevron-down")]
                            )
                      ],
                      1
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "transition",
            { attrs: { name: "slide-fade" } },
            [
              _vm.expensemanage
                ? _c(
                    "v-row",
                    { staticClass: "mb-4", attrs: { justify: "center" } },
                    [
                      _c(
                        "v-card",
                        { attrs: { width: "90%", elevation: "0", tile: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "menu",
                              attrs: {
                                tile: "",
                                block: "",
                                elevation: "0",
                                light: "",
                                color: "#FFA726",
                                text: ""
                              },
                              on: { click: _vm.createExpense }
                            },
                            [_vm._v("Record Expense"), _c("v-spacer")],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "menu",
                              attrs: {
                                tile: "",
                                block: "",
                                elevation: "0",
                                light: "",
                                color: "#FFA726",
                                text: ""
                              },
                              on: { click: _vm.expensesReport }
                            },
                            [_vm._v("Expenses Report "), _c("v-spacer")],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);