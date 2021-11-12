import Vue from 'vue'
import Router from 'vue-router'
const layout = () => import('@/components/layout')
// 登录页
const reload = () => import('@/components/reLoad')

const main = () => import('@/views/index')
const table = () => import('@/views/example/table/index')
const tree = () => import('@/views/example/tree')
const tableFirst = () => import('@/views/example/table/tableFirst')
const tableSecond = () => import('@/views/example/table/tableSecond')
const day1 =() =>import('@/views/study/day1')
const day2 =() =>import('@/views/study/day2')
const day3 =() =>import('@/views/study/day3')
const day4 =() =>import('@/views/study/day4')
const day5 =() =>import('@/views/study/day5')

Vue.use(Router)
// 固定的路由表
export const fixedRouter = [{
    path: '',
    component: reload,
    hidden: true
  },
  {
    path: '',
    component: layout, //整体页面的布局(包含左侧菜单跟主内容区域)
    children: [{
      path: 'main',
      component: main,
      meta: {
        title: '首页', //菜单名称
        roles: ['user', 'admin'], //当前菜单哪些角色可以看到
        icon: 'el-icon-info' //菜单左侧的icon图标
      }
    }]
  },
]
// 需要权限判断展示的路由
export const permissionRouter = [
  {
    path: "/example",
    component: layout,
    name: "Example",
    meta: {
      title: "案例",
      icon: "el-icon-success",
      roles: ['admin', 'user']
    },
    children: [{
        path: "/example/table",
        name: "Table",
        component: table,
        meta: {
          title: "table案例",
          icon: "el-icon-goods",
          roles: ['admin']
        },
        // 三级菜单写法，对应demotable案例下边的两个菜单
        children: [{
            path: "table1",
            name: "Table1",
            component: tableFirst,
            meta: {
              title: "table1",
              icon: "el-icon-mobile-phone",
              roles: ['admin']

            }
          },
          {
            path: "table2",
            name: "Table2",
            component: tableSecond,
            meta: {
              title: "table2",
              icon: "el-icon-service",
              roles: ['admin']
            }
          }
        ]
      },
      {
        path: "tree",
        name: "Tree",
        component: tree,
        meta: {
          title: "树形菜单",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      }
    ]
  },
  {
    path: "/study",
    component: layout,
    name: "Study",
    meta: {
      title: "学习",
      icon: "el-icon-success",
      roles: ['admin', 'user']
    },
    children: [{
        path: "day1",
        name: "day1",
        component: day1,
        meta: {
          title: "第一天",
          icon: "el-icon-goods",
          roles: ['admin']
        },
      },{
        path: "day2",
        name: "day2",
        component: day2,
        meta: {
          title: "第二天",
          icon: "el-icon-goods",
          roles: ['admin']
        },
      },{
        path: "day3",
        name: "day3",
        component: day3,
        meta: {
          title: "第三天",
          icon: "el-icon-goods",
          roles: ['admin']
        },
      },{
        path: "day4",
        name: "day4",
        component: day4,
        meta: {
          title: "第四天",
          icon: "el-icon-goods",
          roles: ['admin']
        },
      },{
        path: "day5",
        name: "day5",
        component: day5,
        meta: {
          title: "第五天",
          icon: "el-icon-goods",
          roles: ['admin']
        },
      }
      
    ]
  } 
]


export default new Router({
  routes: fixedRouter

})
