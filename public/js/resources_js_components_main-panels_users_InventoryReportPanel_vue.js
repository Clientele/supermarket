(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_main-panels_users_InventoryReportPanel_vue"],{

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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _horizontal_menu_bar_HorizontalNavMenu_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../horizontal-menu-bar/HorizontalNavMenu.vue */ "./resources/js/components/horizontal-menu-bar/HorizontalNavMenu.vue");
/* harmony import */ var _vertical_nav_menu_VerticalNavMenu_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../vertical-nav-menu/VerticalNavMenu.vue */ "./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      show: false,
      isLoading: false,
      search: null,
      inventory: [],
      inventory_headers: [{
        text: "Product name",
        value: "product_name"
      }, {
        text: "Remaining Quantity",
        value: "remaining_quantity"
      }]
    };
  },
  components: {
    VerticalNavBarMenu: _vertical_nav_menu_VerticalNavMenu_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    HorizontalNavMenuVue: _horizontal_menu_bar_HorizontalNavMenu_vue__WEBPACK_IMPORTED_MODULE_0__.default
  },
  methods: {
    getInventory: function getInventory() {
      var _this = this;

      this.show = false;
      var url = window.base_url + "reports/stock/available?branch_id=" + localStorage.getItem("branch_id");
      var access_token = localStorage.getItem("token");
      this.$axios.get(url, {
        headers: {
          Authorization: "Bearer " + access_token
        }
      }).then(function (response) {
        _this.inventory = response.data.payload["products"]["data"];
        _this.show = true;
      })["catch"](function (error) {
        console.log(error);
      });
    }
  },
  created: function created() {
    this.getInventory();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      drawer: true,
      reportmanage: false,
      expensemanage: false
    };
  },
  props: {
    active_button: String
  },
  methods: {
    sales: function sales() {
      this.$router.push("sales-panel")["catch"](function (e) {});
    },
    inventory: function inventory() {
      this.$router.push("product-inventory")["catch"](function (e) {});
    },
    createExpense: function createExpense() {
      this.$router.push("user-record-expenses")["catch"](function (e) {});
    },
    expensesReport: function expensesReport() {},
    expences: function expences() {
      this.expensemanage = !this.expensemanage;
    },
    report: function report() {
      this.reportmanage = !this.reportmanage;
    },
    salesReport: function salesReport() {
      this.$router.push("sales-report-panel")["catch"](function (e) {});
    },
    inventoryReport: function inventoryReport() {
      this.$router.push("inventory-report-panel")["catch"](function (e) {});
    }
  }
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.menu[data-v-0a5c4a92] {\n  text-transform: none !important;\n}\n.components[data-v-0a5c4a92] {\n  height: 90vh;\n  overflow: scroll;\n  overflow-x: hidden;\n}\n.bounce-enter-active[data-v-0a5c4a92] {\n  -webkit-animation: bounce-in-data-v-0a5c4a92 0.8s;\n          animation: bounce-in-data-v-0a5c4a92 0.8s;\n}\n.bounce-leave-active[data-v-0a5c4a92] {\n  animation: bounce-in-data-v-0a5c4a92 0.8s reverse;\n}\n@-webkit-keyframes bounce-in-data-v-0a5c4a92 {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n@keyframes bounce-in-data-v-0a5c4a92 {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.menu[data-v-1742d4bc] {\n  text-transform: none !important;\n}\n.slide-fade-enter-active[data-v-1742d4bc] {\n  transition: all 0.3s ease;\n}\n.slide-fade-leave-active[data-v-1742d4bc] {\n  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);\n}\n.slide-fade-enter[data-v-1742d4bc], .slide-fade-leave-to[data-v-1742d4bc]\n/* .slide-fade-leave-active below version 2.1.8 */ {\n  transform: translateX(10px);\n  opacity: 0;\n}\n.bounce-enter-active[data-v-1742d4bc] {\n  -webkit-animation: bounce-in-data-v-1742d4bc 0.5s;\n          animation: bounce-in-data-v-1742d4bc 0.5s;\n}\n.bounce-leave-active[data-v-1742d4bc] {\n  animation: bounce-in-data-v-1742d4bc 0.5s reverse;\n}\n@-webkit-keyframes bounce-in-data-v-1742d4bc {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n@keyframes bounce-in-data-v-1742d4bc {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.5);\n}\n100% {\n    transform: scale(1);\n}\n}\n", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InventoryReportPanel_vue_vue_type_style_index_0_id_0a5c4a92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InventoryReportPanel_vue_vue_type_style_index_0_id_0a5c4a92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InventoryReportPanel_vue_vue_type_style_index_0_id_0a5c4a92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavMenu_vue_vue_type_style_index_0_id_1742d4bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavMenu_vue_vue_type_style_index_0_id_1742d4bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavMenu_vue_vue_type_style_index_0_id_1742d4bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

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

/***/ "./resources/js/components/main-panels/users/InventoryReportPanel.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/components/main-panels/users/InventoryReportPanel.vue ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _InventoryReportPanel_vue_vue_type_template_id_0a5c4a92_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InventoryReportPanel.vue?vue&type=template&id=0a5c4a92&scoped=true& */ "./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=template&id=0a5c4a92&scoped=true&");
/* harmony import */ var _InventoryReportPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InventoryReportPanel.vue?vue&type=script&lang=js& */ "./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=script&lang=js&");
/* harmony import */ var _InventoryReportPanel_vue_vue_type_style_index_0_id_0a5c4a92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css& */ "./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _InventoryReportPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _InventoryReportPanel_vue_vue_type_template_id_0a5c4a92_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _InventoryReportPanel_vue_vue_type_template_id_0a5c4a92_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0a5c4a92",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/main-panels/users/InventoryReportPanel.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VerticalNavMenu_vue_vue_type_template_id_1742d4bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VerticalNavMenu.vue?vue&type=template&id=1742d4bc&scoped=true& */ "./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=template&id=1742d4bc&scoped=true&");
/* harmony import */ var _VerticalNavMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VerticalNavMenu.vue?vue&type=script&lang=js& */ "./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=script&lang=js&");
/* harmony import */ var _VerticalNavMenu_vue_vue_type_style_index_0_id_1742d4bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css& */ "./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _VerticalNavMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _VerticalNavMenu_vue_vue_type_template_id_1742d4bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _VerticalNavMenu_vue_vue_type_template_id_1742d4bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "1742d4bc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/vertical-nav-menu/VerticalNavMenu.vue"
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

/***/ "./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InventoryReportPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InventoryReportPanel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InventoryReportPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalNavMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css&":
/*!*************************************************************************************************************************************!*\
  !*** ./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InventoryReportPanel_vue_vue_type_style_index_0_id_0a5c4a92_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=style&index=0&id=0a5c4a92&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css&":
/*!********************************************************************************************************************************!*\
  !*** ./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css& ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavMenu_vue_vue_type_style_index_0_id_1742d4bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=style&index=0&id=1742d4bc&scoped=true&lang=css&");


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

/***/ "./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=template&id=0a5c4a92&scoped=true&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=template&id=0a5c4a92&scoped=true& ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InventoryReportPanel_vue_vue_type_template_id_0a5c4a92_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InventoryReportPanel_vue_vue_type_template_id_0a5c4a92_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InventoryReportPanel_vue_vue_type_template_id_0a5c4a92_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InventoryReportPanel.vue?vue&type=template&id=0a5c4a92&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=template&id=0a5c4a92&scoped=true&");


/***/ }),

/***/ "./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=template&id=1742d4bc&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=template&id=1742d4bc&scoped=true& ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavMenu_vue_vue_type_template_id_1742d4bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavMenu_vue_vue_type_template_id_1742d4bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalNavMenu_vue_vue_type_template_id_1742d4bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalNavMenu.vue?vue&type=template&id=1742d4bc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=template&id=1742d4bc&scoped=true&");


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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=template&id=0a5c4a92&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/main-panels/users/InventoryReportPanel.vue?vue&type=template&id=0a5c4a92&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
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
      _c("VerticalNavBarMenu", { attrs: { active_button: "report" } }),
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
                    ? _c(
                        "v-row",
                        { attrs: { justify: "center" } },
                        [
                          _c(
                            "v-col",
                            { attrs: { cols: "12", align: "center" } },
                            [_c("h2", [_vm._v("Inventory Report")])]
                          ),
                          _vm._v(" "),
                          _c("v-card-text", [_c("v-divider")], 1),
                          _vm._v(" "),
                          _c(
                            "v-card-text",
                            [
                              _c("v-row", [
                                _c("div", {
                                  staticClass:
                                    "col-12 col-md-6 col-lg-6 col-sm-4"
                                }),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "col-12 col-md-6 col-lg-6 col-sm-8"
                                  },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        dense: "",
                                        outlined: "",
                                        placeholder: "Search",
                                        color: "#FFA726"
                                      },
                                      model: {
                                        value: _vm.search,
                                        callback: function($$v) {
                                          _vm.search = $$v
                                        },
                                        expression: "search"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]),
                              _vm._v(" "),
                              _c("v-data-table", {
                                attrs: {
                                  headers: _vm.inventory_headers,
                                  items: _vm.inventory,
                                  search: _vm.search
                                }
                              })
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=template&id=1742d4bc&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/vertical-nav-menu/VerticalNavMenu.vue?vue&type=template&id=1742d4bc&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
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
              [_vm._v("Sales")]
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
                            : _vm.active_button == "sales"
                            ? "#FFA726"
                            : "white"
                        },
                        on: {
                          click: function($event) {
                            return _vm.sales()
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
                                : _vm.active_button == "sales"
                                ? "white"
                                : "#FFA726"
                            }
                          },
                          [_vm._v(" Sale")]
                        ),
                        _c("v-spacer")
                      ],
                      1
                    )
                  ]
                }
              }
            ])
          }),
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
                            : _vm.active_button == "inventory"
                            ? "#FFA726"
                            : "white"
                        },
                        on: {
                          click: function($event) {
                            return _vm.inventory()
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
                                : _vm.active_button == "inventory"
                                ? "white"
                                : "#FFA726"
                            }
                          },
                          [_vm._v(" Products Inventory")]
                        ),
                        _c("v-spacer")
                      ],
                      1
                    )
                  ]
                }
              }
            ])
          }),
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
                            : _vm.active_button == "report"
                            ? "#FFA726"
                            : "white"
                        },
                        on: {
                          click: function($event) {
                            return _vm.report()
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
                                : _vm.active_button == "report"
                                ? "white"
                                : "#FFA726"
                            }
                          },
                          [_vm._v(" Reports")]
                        ),
                        _c("v-spacer"),
                        _vm.reportmanage
                          ? _c(
                              "v-icon",
                              {
                                attrs: {
                                  color: hover
                                    ? "white"
                                    : _vm.active_button == "report"
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
                                    : _vm.active_button == "report"
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
              _vm.reportmanage
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
                              on: { click: _vm.salesReport }
                            },
                            [_vm._v("Sales Report"), _c("v-spacer")],
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
                              on: { click: _vm.inventoryReport }
                            },
                            [_vm._v("Inventory Report "), _c("v-spacer")],
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