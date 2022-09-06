export default {
  notify: {
    success: '恭喜你，执行成功'
  },
  error: {
    'default': '系统未知错误,请反馈给管理员',
    '000': '操作太频繁，请勿重复请求',
    '401': '当前操作没有权限',
    '403': '当前操作没有权限',
    '404': '资源不存在',
    '417': '未绑定登录账号，请使用密码登录后绑定',
    '423': '演示环境不能操作，如需了解联系冷冷',
    '426': '用户名不存在或密码错误',
    '428': '验证码错误,请重新输入',
    '429': '请求过频繁',
    '479': '演示环境，没有权限操作'
  },
  route: {
    dashboard: '首页',
    profile: '个人中心',
    error_log: '错误日志',
    admin: '权限管理',
    admin_user_index: '用户管理',
    admin_menu_index: '菜单管理',
    admin_role_index: '角色管理',
    admin_dept_index: '部门管理',
    admin_post_index: '岗位管理',
    setting: '系统设置',
    admin_client_index: '终端管理',
    admin_file_index: '文件管理',
    admin_dict_index: '字典管理',
    admin_log_index: '日志管理',
    admin_token_index: '令牌管理',
    admin_param_index: '参数管理',
    gen: '开发平台',
    gen_list_index: '代码生成',
    gen_form_index: '表单管理',
    gen_design_index: '表单设计',
    gen_datasource_index: '数据源管理',
    link: '相关链接',
    link_9001: '任务调度面板',
    link_9002: '注册配置中心',
    link_9003: '服务健康监控',
    link_9009: 'OMS系统官网'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！',
    nameNotNull: '用户名不能为空',
    passMessage: '密码长度不能低于6位',
    codeNotNull: '验证码不能为空',
    reLoginTitle: '系统提示',
    reLoginText: '令牌状态已过期，请点击重新登录',
    reLoginConfirm: '重新登录',
    reLoginCancel: '取消'
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小',
    search: '搜索菜单',
    settings: '布局设置'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  profile: {
    baseInfoTitle: '基本信息',
    updatePwdTitle: '修改密码',
    userCard: {
      aboutMe: '关于我',
      uploadAvator: '上传头像',
      saveAvator: '保存头像'
    },
    baseInfo: {
      submit: '更新信息',
      name: '登录账号',
      phone: '联系方式',
      createTime: '创建时间',
      phoneNotNull: '联系方式不能为空'
    },
    updatePwd: {
      submit: '更新密码',
      oldPassword: '原密码',
      newPassword: '新密码',
      confirmPassword: '确认新密码',
      passwordTip: '原密码不能为空且不少于6位',
      newPassword1Tip: '不少于6位',
      newPassword2Tip: '两次输入密码不一致'
    }
  },
  avue: {
    crud: {
      btnAdd: '添加',
      btnImport: '导入',
      btnExport: '导出',
      btnEdit: '编辑',
      btnDel: '删除',
      btnSearch: '搜索',
      btnEmpty: '清空',
      btnConfirm: '确定',
      btnCancel: '取消'
    },
    notify: {
      n100: '创建成功',
      n101: '修改成功',
      n102: '删除成功',
      n103: '删除失败',
      n104: '提示'
    }
  },
  admin: {
    user: {
      t100: '请选择所属部门',
      t101: '请选择角色',
      t102: '请选择岗位',
      t103: '用户信息导入',
      t104: '用户信息.xlsx',
      t105: '此操作将永久删除该用户(用户名:',
      t106: '), 是否继续?',
      t107: '请输入用户名',
      t108: '用户名支持小写英文、数字、中文',
      t109: '用户名已经存在',
      t110: '请输入密码',
      t111: '请输入6位以上密码',
      t112: '请输入联系方式',
      t113: '请输入正确的电话',
      t114: '序号',
      t115: '用户名',
      t116: '长度在 3 到 20 个字符',
      t117: '密码',
      t118: '所属部门',
      t119: '请选择部门',
      t120: '手机号',
      t121: '手机号不能为空',
      t122: '角色',
      t123: '请选择角色',
      t124: '部门',
      t125: '岗位',
      t126: '请选择岗位',
      t127: '状态',
      t128: '请选择状态',
      t129: '有效',
      t130: '锁定',
      t131: '创建时间'
    }
  }
}
