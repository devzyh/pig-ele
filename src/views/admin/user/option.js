import i18n from '@/lang'
import { getDetails } from '@/api/admin/user'

export const validateUsername = (rule, value, callback) => {
  if (!value) {
    return callback(new Error(i18n.t('admin.user.t107')))
  }
  const flag = new RegExp(/^([a-z\u4e00-\u9fa5\d]+?)$/).test(value)
  if (!flag) {
    callback(new Error(i18n.t('admin.user.t108')))
  }
  getDetails(value).then(response => {
    if (window.boxType === 'edit') callback()
    const result = response.data.data
    if (result !== null) {
      callback(new Error(i18n.t('admin.user.t109')))
    } else {
      callback()
    }
  })
}

// 设置密码校验规则
export const checkPassword = (rule, value, callback) => {
  if (window.boxType === 'edit') {
    return callback()
  }
  if (!value) {
    callback(new Error(i18n.t('admin.user.t110')))
  } else if (value.length <= 6) {
    callback(new Error(i18n.t('admin.user.t111')))
  } else {
    callback()
  }
}

// 设置手机号的验证规则
export const checkPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error(i18n.t('admin.user.t112')))
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error(i18n.t('admin.user.t113')))
    }
  }
}

export const option = {
  border: true,
  index: true,
  indexLabel: i18n.t('admin.user.t114'),
  stripe: true,
  menuAlign: 'center',
  searchBtnText: i18n.t('avue.crud.btnSearch'),
  emptyBtnText: i18n.t('avue.crud.btnEmpty'),
  searchMenuSpan: 4,
  dialogWidth: '50%',
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  column: [
    {
      fixed: true,
      label: 'id',
      prop: 'userId',
      span: 24,
      hide: true,
      editDisplay: false,
      addDisplay: false
    },
    {
      fixed: true,
      label: i18n.t('admin.user.t115'),
      prop: 'username',
      editDisabled: true,
      slot: true,
      search: true,
      span: 24,
      rules: [
        {
          required: true,
          message: i18n.t('admin.user.t107')
        },
        {
          min: 3,
          max: 20,
          message: i18n.t('admin.user.t116'),
          trigger: 'blur'
        },
        { validator: validateUsername, trigger: 'blur' }
      ]
    },
    {
      label: i18n.t('admin.user.t117'),
      prop: 'password',
      type: 'password',
      value: '',
      hide: true,
      span: 24,
      rules: [{ validator: checkPassword, trigger: 'blur' }]
    },
    {
      label: i18n.t('admin.user.t118'),
      prop: 'deptId',
      formslot: true,
      slot: true,
      span: 24,
      hide: true,
      rules: [
        {
          required: true,
          message: i18n.t('admin.user.t119'),
          trigger: 'change'
        }
      ]
    },
    {
      label: i18n.t('admin.user.t120'),
      prop: 'phone',
      value: '',
      span: 24,
      rules: [
        {
          required: true,
          message: i18n.t('admin.user.t121'),
          trigger: 'blur'
        },
        {
          validator: checkPhone,
          trigger: 'blur'
        }
      ]
    },
    {
      label: i18n.t('admin.user.t122'),
      prop: 'role',
      formslot: true,
      slot: true,
      overHidden: true,
      span: 24,
      rules: [
        {
          required: true,
          message: i18n.t('admin.user.t123'),
          trigger: 'blur'
        }
      ]
    },
    {
      label: i18n.t('admin.user.t124'),
      prop: 'deptName',
      overHidden: true,
      addDisplay: false,
      editDisplay: false,
      span: 24
    },
    {
      label: i18n.t('admin.user.t125'),
      prop: 'post',
      width: 168,
      overHidden: true,
      formslot: true,
      slot: true,
      span: 24,
      rules: [
        {
          required: true,
          message: i18n.t('admin.user.t126'),
          trigger: 'blur'
        }
      ]
    },
    {
      label: i18n.t('admin.user.t127'),
      prop: 'lockFlag',
      type: 'radio',
      slot: true,
      border: true,
      span: 24,
      rules: [
        {
          required: true,
          message: i18n.t('admin.user.t128'),
          trigger: 'blur'
        }
      ],
      dicData: [
        {
          label: i18n.t('admin.user.t129'),
          value: '0'
        },
        {
          label: i18n.t('admin.user.t130'),
          value: '9'
        }
      ]
    },
    {
      width: 120,
      label: i18n.t('admin.user.t131'),
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd',
      editDisabled: true,
      addDisplay: false,
      span: 24
    }
  ]
}
