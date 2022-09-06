const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  refreshToken: state => state.user.refreshToken,
  userinfo: state => state.user.userinfo,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  routes: state => state.routes.allRoutes,
  errorLogs: state => state.errorLog.logs
}
export default getters
