module.exports = {
  title: 'PMS',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',

  /**
   * 登录身份验证信息
   */
  authUsername: 'oms',
  authPassword: 'oms',
  authScope: 'server',

  /**
   * 刷新Token相关信息
   */
  checkTokenInterval: 60000, // 检测token有效期的间隔毫秒
  tokenRemainingTime: 1800000 // token剩余多少毫秒执行刷新
}
