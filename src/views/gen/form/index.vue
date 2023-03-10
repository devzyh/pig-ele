<template>
  <div class="app-container">
    <avue-crud ref="crud"
               :page.sync="page"
               :data="tableData"
               :permission="permissionList"
               :table-loading="tableLoading"
               :option="tableOption"
               @on-load="getList"
               @search-change="searchChange"
               @refresh-change="refreshChange"
               @size-change="sizeChange"
               @current-change="currentChange"
               @row-update="handleUpdate"
               @row-save="handleSave"
               @row-del="rowDel"
    >
    </avue-crud>
  </div>
</template>

<script>
import { addObj, delObj, fetchList, putObj } from '@/api/gen/form'
import { tableOption } from './option'
import { hasPermission } from '@/utils/permission'

export default {
  name: 'GenForm',
  data() {
    return {
      searchForm: {},
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
        addBtn: this.vaildData(this.hasPermission('gen_form_add'), false),
        delBtn: this.vaildData(this.hasPermission('gen_form_del'), false),
        editBtn: this.vaildData(this.hasPermission('gen_form_edit'), false)
      }
    }
  },
  methods: {
    hasPermission,
    getList(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
        descs: 'create_time',
        current: page.currentPage,
        size: page.pageSize
      }, params, this.searchForm)).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    rowDel: function(row, index) {
      var _this = this
      this.$confirm('是否确认删除ID为' + row.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delObj(row.id)
      }).then(data => {
        this.$notify.success('删除成功')
        this.getList(this.page)
      })
    },
    handleUpdate: function(row, index, done, loading) {
      putObj(row).then(data => {
        this.$notify.success('修改成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    handleSave: function(row, done, loading) {
      addObj(row).then(data => {
        this.$notify.success('添加成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    searchChange(form, done) {
      this.searchForm = index
      this.getList(this.page, index)
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
    }
  }
}
</script>
