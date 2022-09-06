<template>
  <div class="app-container">
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      :permission="permissionList"
      @on-load="getList"
      @search-change="searchChange"
      @refresh-change="refreshChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      @row-del="rowDel"
    >
      <template slot="menuLeft">
        <el-button
          v-if="hasPermission('sys_user_import_export')"
          class="filter-item"
          plain
          type="primary"
          icon="el-icon-download"
          @click="exportExcel"
        >导出
        </el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { delObj, fetchList } from '@/api/admin/log'
import { tableOption } from './option'
import { hasPermission } from '@/utils/permission'

export default {
  name: 'AdminLog',
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      query: {},
      tableLoading: false,
      tableOption: tableOption
    }
  },
  computed: {
    permissionList() {
      return {
        delBtn: this.vaildData(this.hasPermission('sys_log_del'), false)
      }
    }
  },
  methods: {
    hasPermission,
    getList(page, params) {
      this.tableLoading = true
      fetchList(
        Object.assign(
          {
            descs: 'create_time',
            current: page.currentPage,
            size: page.pageSize
          },
          params
        )
      ).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      })
    },
    rowDel: function(row, index) {
      this.$confirm('是否确认删除ID为"' + row.id + '"的日志?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delObj(row.id)
        })
        .then(data => {
          this.getList(this.page)
          this.$notify.success('删除成功')
        })
    },
    searchChange(form, done) {
      this.query = form
      this.getList(this.page, form)
      done()
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    refreshChange() {
      this.getList(this.page)
    },
    exportExcel() {
      this.downBlobFile('/admin/log/export', this.query, 'log.xlsx')
    }
  }
}
</script>
