<template>
  <div class="app-container">
    <avue-crud
      ref="data-source-settings-crud"
      v-model="dsForm"
      :page.sync="dsPage"
      :data="tableDsData"
      :option="tableDsOption"
      :before-open="handleOpenBefore"
      @row-update="handleUpdate"
      @row-save="handleSave"
      @row-del="rowDel"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="refreshDsChange"
      @on-load="getDsList"
    />
  </div>
</template>

<script>
import { addObj, delObj, fetchDsList, putObj } from '@/api/gen/gen'
import { formOption, tableDsOption, tableOption } from './option'

export default {
  name: 'GenDatasource',
  data() {
    return {
      dataSourceList: [],
      tableDsData: [],
      box: false,
      dsPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      dsForm: {},
      tableLoading: false,
      tableOption: tableOption,
      tableDsOption: tableDsOption,
      formOption: formOption
    }
  },
  created() {
  },
  methods: {
    rowDel: function(row, index) {
      this.$confirm('是否确认删除ID为' + row.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delObj(row.id)
      }).then(() => {
        this.$notify.success('删除成功')
        this.getDsList(this.dsPage)
      })
    },
    handleOpenBefore: function(show) {
      this.dsForm.password = undefined
      show()
    },
    handleUpdate: function(row, index, done, loading) {
      putObj(row).then(res => {
        if (res.data.data) {
          done()
          this.$notify.success('修改成功')
        } else {
          loading()
          this.$notify.error('修改失败，数据源不可访问')
        }
        this.getDsList(this.dsPage)
      })
    },
    handleSave: function(row, done, loading) {
      addObj(row).then(res => {
        if (res.data.data) {
          this.$notify.success('添加成功')
          done()
          this.getDsList(this.dsPage)
        } else {
          this.$notify.error('添加失败，数据源不可访问')
          loading()
        }
      }).catch(() => {
        loading()
      })
    },
    getDsList(page, params) {
      fetchDsList(Object.assign({
        current: page.currentPage,
        size: page.pageSize
      }, params)).then(response => {
        this.tableDsData = response.data.data.records
        this.dsPage.total = response.data.data.total
      })
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    refreshDsChange() {
      this.getDsList(this.dsPage)
    }
  }
}
</script>
