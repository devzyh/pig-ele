<template>
  <div class="app-container">
    <avue-form-design :options="options" @submit="handleSubmit">
    </avue-form-design>
  </div>
</template>

<script>
import { getForm, postForm } from '@/api/gen/gen'
import { validateNull } from '@/utils/validate'

export default {
  name: 'GenDesign',
  data() {
    return {
      box: true,
      options: {
        column: []
      }
    }
  },
  created() {
    this.getFormInfo()
  },
  methods: {
    handleSubmit(json) {
      let params = this.$route.query
      if (validateNull(params)) {
        return false
      }
      let result = JSON.stringify(json)
      postForm(result, params.tableName, params.dsName).then(response => {
        this.$notify.success('生成并保存成功')
      })
    },
    getFormInfo() {
      let params = this.$route.query
      if (validateNull(params)) {
        return false
      }
      getForm(params.tableName, params.dsName).then(response => {
        if (!validateNull(response.data.data)) {
          this.options = JSON.parse(response.data.data)
        }
      })
    }
  }
}
</script>

<style>
.form-designer .el-container {
  height: auto;
}

.el-header iframe {
  display: none;
}
</style>
