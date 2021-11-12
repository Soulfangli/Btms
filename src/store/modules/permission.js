import { asyncRoutes, constantRoutes, erjirouter } from '@/router'
// import { objDeepCopy } from "@/utils/index"

/**
 * Use meta.role to determine if the current user has permission
 * @param rolesType
 * @param route
 */
function hasPermission(rolesType, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(rolesType)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param rolesType
 */
export function filterAsyncRoutes(routes, rolesType) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(rolesType, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, rolesType)
      }
      res.push(tmp)
    }
  })
  return res
}

/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
*/
function routerMatch(permission, asyncRouter) {
  const routers = [];
  // 创建路由
  function createRouter(permission,asyncRouter) {
    // 根据路径匹配到的router对象添加到routers中即可
    permission.forEach((ps) => {
      let path = ps.url;
      // 循环异步路由，将符合权限列表的路由加入到routers中
      // 为每个路由页面增加meta字段。在routerMatch函数中将匹配到的详细权限字段赋值到这里。这样在每个页面的route对象中就会得到这个字段
      asyncRouter.find((item) => {
        if (item.path == path) {
          // let itrouter = objDeepCopy(item);
          let itrouter = {...item}
          itrouter.children = [];
          itrouter["meta"] = itrouter.meta ? itrouter.meta : {}
          itrouter.meta["title"] = ps.aliasName
          itrouter.meta["permission"] = []; // 
          if(ps.permissionSubmenu && ps.permissionSubmenu.length){
            ps.permissionSubmenu.forEach((pschild) => {
              let path2 = pschild.url;
              // 如果没有path，就是最后一级按钮操作权限
              if(path2){
                item.children.find((item2) => {
                  if (path2 == item2.path) {
                    // let itrouterchildren = objDeepCopy(item2);
                    let itrouterchildren = {...item2}
                    itrouterchildren["meta"] = itrouterchildren.meta ? itrouterchildren.meta : {}
                    itrouterchildren.meta["title"] = pschild.aliasName
                    itrouterchildren.meta["permission"] = []; // 
                    if(pschild.permissionSubmenu && pschild.permissionSubmenu.length){
                      pschild.permissionSubmenu.forEach((pschild2) => {
                        let path3 = pschild2.url;
                        if(!path3){
                          itrouterchildren.meta["permission"].push({...pschild2, operatorCodeValue: pschild.operatorCodeValue}) 
                        }
                      })
                    }
                    itrouter.children.push(itrouterchildren);
                  }
                })
              }else{
                // 二级数据加meta，与运算参数取父级operatorCodeValue字段
                itrouter.meta["permission"].push({...pschild, operatorCodeValue: ps.operatorCodeValue}) 
              }
            })
          }
          routers.push(itrouter);
        }
      })
    })
  }

  createRouter(permission,asyncRouter)
  return routers
}

const state = {
  routes: [],
  addRoutes: [],
  refresh: true
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_REFRESH: (state, data) => {
    state.refresh = data
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      commit('SET_REFRESH', true)
      // if(roles.phone === '13660283470'){ // if部分注释，time：12.28
      //   accessedRoutes = asyncRoutes
      //   commit('SET_REFRESH', false)
      // }else{
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles.companyType)
        // 【权限匹配】动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组
        if(roles.permissionDtoList && roles.permissionDtoList.length>0){
          accessedRoutes = routerMatch(roles.permissionDtoList, accessedRoutes) 
        }else{
          accessedRoutes = []
        }
        commit('SET_REFRESH', false)
      // }
      // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles.companyType)
      // commit('SET_REFRESH', false)
      // // 非生产，加上二级目录
      // if(process.env.VUE_APP_TITLE != 'prod'){
      //   accessedRoutes = [...accessedRoutes, ...filterAsyncRoutes(erjirouter, roles.companyType)]
      // }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
