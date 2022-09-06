export default {
  notify: {
    success: 'Congratulations, the execution is successful'
  },
  error: {
    'default': 'System unknown error, please feedback to administrator',
    '000': 'The operation is too frequent, please do not repeat the request',
    '401': 'The current operation is not authorized',
    '403': 'The current operation is not authorized',
    '404': 'Resource does not exist',
    '417': 'The login account is not bound, please use the password to log in and bind it',
    '423': 'The demo environment cannot be operated, if you need to know more about it, please contact Leng Leng',
    '426': 'Username does not exist or password is incorrect',
    '428': 'Verification code error, please re-enter',
    '429': 'Request too frequently',
    '479': 'Demo environment, no permission to operate'
  },
  route: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    error_log: 'Error log',
    admin: 'Permission Management',
    admin_user_index: 'User Management',
    admin_menu_index: 'Menu Management',
    admin_role_index: 'role Management',
    admin_dept_index: 'Department Management',
    admin_post_index: 'Post Management',
    setting: 'System Settings',
    admin_client_index: 'Terminal Management',
    admin_file_index: 'File Management',
    admin_dict_index: 'Dictionary Management',
    admin_log_index: 'Log Management',
    admin_token_index: 'Token Management',
    admin_param_index: 'Parameter Management',
    gen: 'Development Platform',
    gen_list_index: 'Code Generation',
    gen_form_index: 'Form Management',
    gen_design_index: 'Form Design',
    gen_datasource_index: 'Datasource Management',
    link: 'Related Links',
    link_9001: 'Task Scheduler Panel',
    link_9002: 'Register Configuration Center',
    link_9003: 'Service Health Monitoring',
    link_9009: 'Pig System Official Website'
  },
  login: {
    title: 'System Login',
    logIn: 'Login',
    username: 'Account',
    password: 'Password',
    any: 'Just fill in',
    thirdparty: 'Third party login',
    thirdpartyTips: 'It cannot be simulated locally, please simulate it with your own business! ',
    nameNotNull: 'Username cannot be empty',
    passMessage: 'Password length cannot be less than 6 digits',
    codeNotNull: 'The verification code cannot be empty',
    reLoginTitle: 'System prompt',
    reLoginText: 'The token status has expired, please click to log in again',
    reLoginConfirm: 'Relogin',
    reLoginCancel: 'Cancel'
  },
  navbar: {
    dashboard: 'Home',
    github: 'Project Address',
    logOut: 'Logout',
    profile: 'Personal Center',
    theme: 'Skin',
    size: 'Layout Size',
    search: 'Search Menu',
    settings: 'Layout Settings'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Other',
    closeAll: 'close All'
  },
  settings: {
    title: 'System layout configuration',
    theme: 'Theme color',
    tagsView: 'Enable Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  profile: {
    baseInfoTitle: 'Basic information',
    updatePwdTitle: 'Change password',
    userCard: {
      aboutMe: 'About Me',
      uploadAvator: 'Upload Avatar',
      saveAvator: 'Save Avatar'
    },
    baseInfo: {
      submit: 'Update information',
      name: 'Login account',
      phone: 'Contact information',
      createTime: 'Create time',
      phoneNotNull: 'Contact information cannot be empty'
    },
    updatePwd: {
      submit: 'Update Password',
      oldPassword: 'Original password',
      newPassword: 'New password',
      confirmPassword: 'Confirm new password',
      passwordTip: 'The original password cannot be empty and not less than 6 digits',
      newPassword1Tip: 'Not less than 6 digits',
      newPassword2Tip: 'The passwords entered twice are inconsistent'
    }
  },
  avue: {
    crud: {
      btnAdd: 'Add',
      btnImport: 'Import',
      btnExport: 'Export',
      btnEdit: 'Edit',
      btnDel: 'Delete',
      btnSearch: 'Search',
      btnEmpty: 'Empty',
      btnConfirm: 'OK',
      btnCancel: 'Cancel'
    },
    notify: {
      n100: 'Created successfully',
      n101: 'Modification succeeded',
      n102: 'Delete successful',
      n103: 'Deletion failed',
      n104: 'hint'
    }
  },
  admin: {
    user: {
      t100: 'Please select the department you belong to',
      t101: 'Please select a role',
      t102: 'Please select a position',
      t103: 'User information import',
      t104: 'User information.xlsx',
      t105: 'This operation will permanently delete the user (username:',
      t106: '), continue?',
      t107: 'Please enter a user name',
      t108: 'Username supports lowercase English, numbers and Chinese',
      t109: 'Username already exists',
      t110: 'Please enter your password',
      t111: 'Please enter a password of more than 6 digits',
      t112: 'Please enter the contact information',
      t113: 'Please enter the correct phone number',
      t114: 'serial number',
      t115: 'username',
      t116: 'Length is between 3 and 20 characters',
      t117: 'password',
      t118: 'Department',
      t119: 'Please select a department',
      t120: 'Mobile number',
      t121: 'Mobile phone number cannot be empty',
      t122: 'role',
      t123: 'Please select a role',
      t124: 'Department',
      t125: 'post',
      t126: 'Please select a position',
      t127: 'Status',
      t128: 'Please select a state',
      t129: 'valid',
      t130: 'Locked',
      t131: 'creation time'
    }
  }
}
