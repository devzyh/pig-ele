<template>
  <div class="app-container">
    <avue-crud ref="crud"
               :page.sync="page"
               :data="tableData"
               :table-loading="tableLoading"
               :option="tableOption"
               :permission="permissionList"
               @on-load="getList"
               @size-change="sizeChange"
               @current-change="currentChange"
               @refresh-change="refreshChange"
               @row-del="rowDel"
    >
      <template slot="id" slot-scope="scope">
        <span v-if="scope.row.user_info">{{ scope.row.user_info.id }}</span>
      </template>
      <template slot="username" slot-scope="scope">
        <span v-if="scope.row.user_info">{{ scope.row.user_info.username }}</span>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { delObj, fetchList } from '@/api/admin/token'
import { tableOption } from './option'
import { hasPermission } from '@/utils/permission'

export default {
  name: 'AdminToken',
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption
    }
  },
  computed: {
    permissionList() {
      return {
        delBtn: this.vaildData(this.hasPermission('sys_token_del'), false)
      }
    }
  },
  methods: {
    hasPermission,
    getList(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
        current: page.currentPage,
        size: page.pageSize
      }, params)).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      })
    },
    rowDel: function(row, index) {
      this.$confirm('是否强制' + row.username + '下线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delObj(row.access_token)
      }).then(data => {
        this.$notify.success('删除成功')
      })
    },
    refreshChange() {
      this.getList(this.page)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    }
  }
}
</script>
