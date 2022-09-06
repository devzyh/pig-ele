<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>{{ $t('profile.userCard.aboutMe') }}</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="imageUrl" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>{{ userinfo.username }}</div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ userinfo.username }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header" />
        <div class="user-bio-section-body">
          <el-button type="primary" icon="el-icon-upload" @click="imageCropperShow=true">
            {{ $t('profile.userCard.uploadAvator') }}
          </el-button>
          <el-button type="primary" icon="el-icon-finished" @click="saveAvatar">
            {{ $t('profile.userCard.saveAvator') }}
          </el-button>
        </div>
      </div>
    </div>

    <image-cropper
      v-show="imageCropperShow"
      :key="imageCropperKey"
      :width="300"
      :height="300"
      :lang-type="this.$store.getters.language"
      :headers="imageCropperHeader"
      :url="imageCropperUrl"
      field="file"
      @close="close"
      @crop-upload-success="cropSuccess"
    />

  </el-card>
</template>

<script>
import PanThumb from '@/components/pan-thumb'
import ImageCropper from '@/components/image-cropper'
import { getTokenHeader } from '@/utils/auth'
import { updateUserInfo } from '@/api/admin/user'

export default {
  components: { ImageCropper, PanThumb },
  props: {
    userinfo: {
      type: Object,
      default: () => {
        return {
          username: '',
          email: '',
          avatar: '',
          phone: ''
        }
      }
    }
  },
  data() {
    return {
      imageUrl: '',
      imageCropperShow: false,
      imageCropperKey: 0,
      imageCropperUrl: '/admin/sys-file/upload',
      imageCropperHeader: getTokenHeader()
    }
  },
  created() {
    this.imageUrl = this.userinfo.avatar
  },
  methods: {
    cropSuccess(response) {
      this.imageCropperShow = false
      this.imageUrl = response.data.url
    },
    close() {
      this.imageCropperShow = false
    },
    saveAvatar() {
      const info = { username: this.userinfo.username, avatar: this.imageUrl }
      updateUserInfo(info).then(response => {
        this.userinfo.avatar = this.imageUrl
        this.$notify.success(this.$t('notify.success'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }

    .user-bio-section-body {
      text-align: center;
    }
  }
}
</style>
