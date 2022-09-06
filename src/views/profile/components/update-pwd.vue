<template>
  <el-form ref="userinfo" :model="userinfo" :rules="rules">
    <el-form-item :label="$t('profile.updatePwd.oldPassword')" prop="password">
      <el-input v-model.trim="userinfo.password" type="password" auto-complete="off" />
    </el-form-item>
    <el-form-item :label="$t('profile.updatePwd.newPassword')" prop="newpassword1">
      <el-input v-model.trim="userinfo.newpassword1" type="password" auto-complete="off" />
    </el-form-item>
    <el-form-item :label="$t('profile.updatePwd.confirmPassword')" prop="newpassword2">
      <el-input v-model.trim="userinfo.newpassword2" type="password" auto-complete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{ $t('profile.updatePwd.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserInfo } from '@/api/admin/user'

export default {
  props: {
    userinfo: {
      type: Object,
      default: () => {
        return {
          username: '',
          newpassword1: '',
          newpassword2: ''
        }
      }
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.userinfo.password !== '') {
        if (value !== this.userinfo.newpassword1) {
          callback(new Error(this.$t('profile.updatePwd.newPassword2Tip')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      rules: {
        password: [{ required: true, min: 6, message: this.$t('profile.updatePwd.passwordTip'), trigger: 'change' }],
        newpassword1: [{
          required: true,
          min: 6,
          message: this.$t('profile.updatePwd.newPassword1Tip'),
          trigger: 'change'
        }],
        newpassword2: [{ required: false, validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['userinfo'].validate(valid => {
        if (valid) {
          updateUserInfo(this.userinfo).then(response => {
            this.$notify.success(this.$t('notify.success'))
            document.getElementById('sysLogout').click()
          })
        }
      })
    }
  }
}
</script>
