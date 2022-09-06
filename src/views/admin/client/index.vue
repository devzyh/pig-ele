<template>
  <div class="app-container">
    <avue-crud ref="crud"
               :page.sync="page"
               :data="tableData"
               :table-loading="tableLoading"
               :option="tableOption"
               :permission="permissionList"
               @on-load="getList"
               :before-open="beforeOpen"
               @size-change="sizeChange"
               @current-change="currentChange"
               @refresh-change="refreshChange"
               @row-update="handleUpdate"
               @row-save="handleSave"
               @row-del="rowDel"
    >
      <template slot="menuLeft">
        <el-button
          v-if="hasPermission('sys_client_del')"
          class="filter-item"
          type="primary"
          icon="el-icon-refresh-left"
          @click="handleClearClientCache"
        >缓存
        </el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { addObj, clearClientCache, delObj, fetchList, putObj } from '@/api/admin/client'
import { clearDictCache } from '@/api/admin/dict'
import { tableOption } from './option'
import { hasPermission } from '@/utils/permission'

export default {
  name: 'AdminClient',
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
  created() {
  },
  mounted: function() {
  },
  computed: {
    permissionList() {
      return {
        addBtn: this.vaildData(this.hasPermission('sys_client_add'), false),
        delBtn: this.vaildData(this.hasPermission('sys_client_del'), false),
        editBtn: this.vaildData(this.hasPermission('sys_client_edit'), false)
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
      this.$confirm('是否确认删除ID为' + row.clientId, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delObj(row.clientId)
      }).then(data => {
        this.$notify.success('删除成功')
        this.refreshChange()
      })
    },
    handleUpdate: function(row, index, done) {
      putObj(row).then(() => {
        this.$notify.success('修改成功')
        this.refreshChange()
        done()
      }).catch(() => {
        done()
      })
    },
    handleSave: function(row, done) {
      addObj(row).then(() => {
        this.$notify.success('添加成功')
        this.refreshChange()
        done()
      }).catch(() => {
        done()
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
    },
    beforeOpen(show, type) {
      window.boxType = type
      show()
    },
    handleClearClientCache: function() {
      clearClientCache().then(() => {
        this.$notify.success('清除缓存成功')
      }).catch(function() {
      })
    }
  }
}
</script>
