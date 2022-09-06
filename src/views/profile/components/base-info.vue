<template>
  <el-form ref="userinfo" :model="userinfo" :rules="rules">
    <el-form-item :label="$t('profile.baseInfo.name')">
      <el-input v-model.trim="userinfo.username" disabled />
    </el-form-item>
    <el-form-item :label="$t('profile.baseInfo.phone')" prop="phone">
      <el-input v-model.trim="userinfo.phone" />
    </el-form-item>
    <el-form-item :label="$t('profile.baseInfo.createTime')">
      <el-input v-model.trim="userinfo.createTime" disabled />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{ $t('profile.baseInfo.submit') }}</el-button>
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
          phone: '',
          createTime: ''
        }
      }
    }
  },
  data() {
    return {
      rules: {
        phone: [{ required: true, trigger: 'blur', message: this.$t('profile.baseInfo.phoneNotNull') }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['userinfo'].validate(valid => {
        if (valid) {
          updateUserInfo(this.userinfo).then(response => {
            this.$notify.success(this.$t('notify.success'))
          })
        }
      })
    }
  }
}
</script>
