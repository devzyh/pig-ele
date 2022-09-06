<template>
  <div class="app-container">
    <div v-if="userinfo">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :userinfo="userinfo" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane :label="$t('profile.baseInfoTitle')" name="baseInfo">
                <base-info :userinfo="userinfo" />
              </el-tab-pane>
              <el-tab-pane :label="$t('profile.updatePwdTitle')" name="password">
                <update-pwd :userinfo="userinfo" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/user-card'
import BaseInfo from './components/base-info'
import UpdatePwd from './components/update-pwd'

export default {
  name: 'Profile',
  components: { UserCard, BaseInfo, UpdatePwd },
  data() {
    return {
      activeTab: 'baseInfo'
    }
  },
  computed: {
    ...mapGetters([
      'userinfo',
      'roles'
    ])
  }
}
</script>
