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
      <template slot="menuLeft">
        <el-button
          v-if="hasPermission('sys_post_add')"
          class="filter-item"
          type="primary"
          icon="el-icon-edit"
          @click="$refs.crud.rowAdd()"
        >添加
        </el-button>
        <el-button
          v-if="hasPermission('sys_post_import_export')"
          class="filter-item"
          plain
          type="primary"
          icon="el-icon-upload"
          @click="$refs.excelUpload.show()"
        >导入
        </el-button>
        <el-button
          v-if="hasPermission('sys_post_import_export')"
          class="filter-item"
          plain
          type="primary"
          icon="el-icon-download"
          @click="exportExcel"
        >导出
        </el-button>
      </template>
    </avue-crud>

    <!--excel 模板导入 -->
    <upload-excel
      ref="excelUpload"
      title="岗位信息导入"
      url="/admin/post/import"
      temp-name="岗位信息.xlsx"
      temp-url="/admin/sys-file/local/post.xlsx"
      @refreshDataList="handleRefreshChange"
    ></upload-excel>
  </div>
</template>

<script>
import { hasPermission } from '@/utils/permission'
import { tableOption } from './option'
import { addObj, delObj, fetchList, putObj } from '@/api/admin/post'
import UploadExcel from '@/components/upload/excel'

export default {
  name: 'AdminPost',
  components: { UploadExcel },
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
        addBtn: this.vaildData(this.hasPermission('sys_post_add'), false),
        delBtn: this.vaildData(this.hasPermission('sys_post_del'), false),
        editBtn: this.vaildData(this.hasPermission('sys_post_edit'), false)
      }
    }
  },
  methods: {
    hasPermission,
    exportExcel() {
      this.downBlobFile('/admin/post/export', {}, 'post.xlsx')
    },
    handleRefreshChange() {
      this.getList(this.page)
    },
    getList(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
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
      this.$confirm('是否确认删除' + row.postName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delObj(row.postId)
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
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    searchChange(form, done) {
      this.searchForm = form
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
    },
    refreshChange() {
      this.getList(this.page)
    }
  }
}
</script>
