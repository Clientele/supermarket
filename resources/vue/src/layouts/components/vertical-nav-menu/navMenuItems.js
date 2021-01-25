/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Structure:
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

==========================================================================================*/


export default [

  /** Products **/
  {
    header: 'Products',
    icon: 'PackageIcon',
     items: [
      {
        url: '/products/vendors',
        name: 'Vendors',
        slug: 'chat',
        icon: 'BriefcaseIcon',
       },
      {
        url: '/products/products',
        name: 'Product Config',
        slug: 'email',
        icon: 'PackageIcon',
         submenu: [
          {
            url: '/products/products/categories',
            name: 'Manage Categories',
            slug: 'grid-vuesax',
           },
          {
            url: '/products/products',
            name: 'Products',
            slug: 'grid-tailwind',
           }
        ]
      },
      {
        url: '/products/inventory',
        name: 'Inventory',
        slug: 'chat',
        icon: 'DatabaseIcon',
         submenu: [
          {
            url: '/products/inventory/stock',
            name: 'Depot Stock',
            slug: 'moving-stock'
           },
          {
            url: '/products/inventory/stock/mobile',
            name: 'Mobile Stock',
            slug: 'mobile-stock'
           },
          {
            url: '/products/inventory/stock/requests',
            name: 'Stock Requests',
            slug: 'moving-stock'
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
        url: "/config/depots",
        name: 'Assets',
        icon: 'TruckIcon',
        submenu: [
          {
            url: '/config/depots',
            name: 'Depots',
            slug: 'colors',
            icon: 'ArchiveIcon',
          },
          {
            url: '/config/assets/vehicles',
            name: 'Vehicles',
            icon: 'TruckIcon'
          }
        ]
       },

      {
        url: "/config/addresses",
        name: 'Addresses',
        icon: 'MapPinIcon',
        submenu: [
          {
            url: '/config/addresses',
            name: 'Places',
          },
          {
            url: '/config/addresses/zones',
            name: 'Sales Zones',
          },
        ]
       },

    ]
  }

]

