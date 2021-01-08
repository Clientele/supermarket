/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [

  /** Products **/
  {
    header: 'Products',
    icon: 'PackageIcon',
     items: [
      {
        url: '/vendors',
        name: 'Vendors',
        slug: 'chat',
        icon: 'TruckIcon',
       },
      {
        url: '/products',
        name: 'Product Config',
        slug: 'email',
        icon: 'PackageIcon',
         submenu: [
          {
            url: '/products/categories',
            name: 'Manage Categories',
            slug: 'grid-vuesax',
           },
          {
            url: '/products/products',
            name: 'Tailwind',
            slug: 'grid-tailwind',
           }
        ]
      },
      {
        url: '/inventory',
        name: 'Inventory',
        slug: 'chat',
        icon: 'DatabaseIcon',
         submenu: [
          {
            url: '/inventory/status',
            name: 'Stock Status',
            slug: 'grid-vuesax'
           },
          {
            url: '/inventory/receive',
            name: 'Receive products',
            slug: 'grid-tailwind'
           },
          {
            url: '/inventory/dispatch',
            name: 'Tailwind',
            slug: 'grid-tailwind'
           }
        ]
      }
    ]
  },

  /** Sales **/
  {
    header: 'Sales',
    icon: 'PackageIcon',
     items: [
      {
        url: '/sales/customers',
        name: 'Customers',
        slug: 'chat',
        icon: 'UsersIcon',
       },
      {
        url: '/sales/orders',
        name: 'Orders',
        slug: 'chat',
        icon: 'MessageSquareIcon',
       },
      {
        url: '/sales/deliveries',
        name: 'Deliveries',
        slug: 'email',
        icon: 'ShoppingCartIcon',
        },
     ]
  },

  /** System Config **/
  {
    header: 'System Config',
    icon: 'LayersIcon',
     items: [

      {
        url: null,
        name: 'Users',
        icon: 'UserCheckIcon',
         submenu: [
          {
            url: '/config/access/users',
            name: 'Users',
            slug: 'config-access-users',
           },
          {
            url: '/config/access/permissions',
            name: 'Roles & Permissions',
            slug: 'config-access-permissions',
           }
        ]
      },
      {
        url: '/config/depots',
        name: 'Depots',
        slug: 'colors',
        icon: 'ArchiveIcon',
       },
      {
        url: null,
        name: 'Assets',
        icon: 'TruckIcon',
        submenu: [
          {
            url: '/config/assets/vehicles',
            name: 'Vehicles',
            icon: 'TruckIcon'
          }
        ]
       },
      {
        url: null,
        name: 'Addresses',
        icon: 'MapPinIcon',
        submenu: [
          {
            url: '/config/addresses',
            name: 'Places',
          }
        ]
       },

    ]
  }

]

