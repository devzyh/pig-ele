import { constantRoutes } from '@/router'
import Layout from '@/layout'
import { getMenu } from '@/api/admin/menu'
import { isExternal } from '@/utils/validate'

const state = {
  allRoutes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.allRoutes = constantRoutes.concat(routes)
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param data asyncRoutesData
 */
export function filterAsyncRoutes(data) {
  const rs = []

  for (const i in data) {
    const item = data[i]
    if (!item) {
      continue
    }

    // 路由基础信息
    const r = {}
    r.name = `route_${item.id}`
    r.path = item.path
    r.hidden = item.visible === '1'

    // 路由组件处理
    const isRoot = item.parentId !== undefined && item.parentId === '-1'
    let hasChildren = item.children !== undefined && item.children.length > 0

    // 根菜单的处理
    if (isRoot && !hasChildren) {
      const child = { ...item }
      delete child.parentId
      item.children = [child]
      hasChildren = true
    }

    // 子级菜单处理
    if (hasChildren) {
      // 目录
      r.component = Layout
    } else if (isExternal(item.path)) {
      // 链接
      delete r.component
    } else {
      // 页面
      r.component = (resolve) => {
        require([`@/views${item.path}.vue`], resolve)
      }
    }

    // 路由附加信息
    const meta = {}
    if (isExternal(item.path)) {
      meta.title = `link_${item.id}`
    } else {
      meta.title = item.path.replaceAll('/', '_').substr(1)
    }
    if (item.icon) {
      meta.icon = item.icon
    }
    meta.noCache = item.keepAlive === '1'
    r.meta = meta

    // 路由子组件处理
    if (hasChildren) {
      r.children = filterAsyncRoutes(item.children)
    }

    rs.push(r)
  }

  return rs
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getMenu(-1).then(res => {
        const data = res.data.data
        const asyncRoutes = filterAsyncRoutes(data)
        // 404 page must be placed at the end !!!
        asyncRoutes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', asyncRoutes)
        resolve(asyncRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
