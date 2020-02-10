import Main from '@/components/main'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '首页',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/home')
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    component: Main,
    meta: {
      notCache: true,
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'setting',
        name: 'setting',
        meta: {
          icon: 'md-notifications',
          title: '个人设置'
        },
        component: () => import('@/view/module/account/setting.vue')
      }
    ]
  },
  {
    path: '/system',
    name: '权限管理系统',
    component: Main,
    meta: {
      notCache: true,
      hideInBread: true,
      hideInMenu: false
    },
    children: [
      {
        path: 'userManager',
        name: '用户管理',
        meta: {
          icon: 'md-person',
          title: '用户管理'
        },
        component: () => import('@/view/module/system/userManager')
      },
      {
        path: 'menuManager',
        name: '菜单管理',
        meta: {
          icon: 'navicon',
          title: '菜单管理'
        },
        component: () => import('@/view/module/system/menuManager')
      },
      {
        path: 'groupManager',
        name: '角色权限管理',
        meta: {
          icon: 'md-people',
          title: '角色权限管理'
        },
        component: () => import('@/view/module/system/groupManager')
      },
      {
        path: 'groupTypeManager',
        name: '角色类型管理',
        meta: {
          icon: 'ios-people',
          title: '角色类型管理'
        },
        component: () => import('@/view/module/system/groupTypeManager')
      },
      {
        path: 'user',
        name: '用户设置',
        meta: {
          icon: 'md-person',
          title: '用户设置',
          hideInMenu: true
        },
        component: () => import('@/view/module/system/user')
      },
      {
        path: 'role',
        name: '权限设置',
        meta: {
          icon: 'md-notifications',
          title: '权限设置'
        },
        component: () => import('@/view/module/system/role')
      },
      {
        path: 'menus',
        name: '菜单设置',
        meta: {
          icon: 'md-notifications',
          title: '菜单设置'
        },
        component: () => import('@/view/module/system/menus')
      },
      {
        path: 'generate',
        name: '数据设置',
        meta: {
          icon: 'md-notifications',
          title: '数据设置'
        },
        component: () => import('@/view/module/system/generate')
      },
      {
        path: 'developer',
        name: '开发者设置',
        meta: {
          icon: 'md-notifications',
          title: '开发者设置'
        },
        component: () => import('@/view/module/system/developer')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: false
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/error-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/login/success',
    name: 'loginSuccess',
    meta: {
      hideInMenu: false
    },
    component: () => import('@/view/login/login-success.vue')
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: false
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '/salesLead',
    name: '销售线索',
    meta: {
      hideInMenu: false,
      title: '销售线索'
    },
    component: Main,
    children: [
      {
        path: 'potentialClients',
        name: '意向客户',
        meta: {
          icon: 'ios-bug',
          title: '意向客户'
        },
        component: () => import('@/view/salesLead/potentialClients/potentialClients.vue'),
      },
      {
        path: 'placeOrder',
        name: '下订单',
        meta: {
          hideInMenu: true,
          title: '下订单'
        },
        component: () => import('@/view/salesLead/potentialClients/placeOrder.vue')
      },
      {
        path: 'resourcePool',
        name: '资源池',
        meta: {
          icon: 'ios-bug',
          title: '资源池'
        },
        component: () => import('@/view/salesLead/resourcePool/resourcePool.vue')
      },
      {
        path: 'highSeas',
        name: 'highSeas',
        meta: {
          icon: 'ios-bug',
          title: '公海'
        },
        component: () => import('@/view/salesLead/highSeas/highSeas.vue')
      },
      {
        path: 'visitingClients',
        name: 'visitingClients',
        meta: {
          icon: 'ios-bug',
          title: '拜访'
        },
        component: () => import('@/view/salesLead/visitingClients/visitingClients.vue')
      },
      {
        path: 'visitingClientsDetail',
        name: '拜访详情',
        meta: {
          hideInMenu: true,
          title: '拜访详情'
        },
        component: () => import('@/view/salesLead/visitingClients/visitingClientsDetail.vue')
      }
    ]
  }
]
