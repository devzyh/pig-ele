<template>
  <div class="app-container">
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :permission="permissionList"
      :table-loading="tableLoading"
      :option="tableOption"
      :upload-after="uploadAfter"
      @on-load="getList"
      @search-change="searchChange"
      @refresh-change="refreshChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      @row-del="rowDel"
    >
      <template slot="menu" slot-scope="scope">
        <el-button
          type="text"
          icon="el-icon-download"
          @click="download(scope.row, scope.index)"
        >下载
        </el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { delObj, fetchList } from '@/api/admin/file'
import { tableOption } from './option'
import { hasPermission } from '@/utils/permission'
import { downBlobFile } from '@/utils'

export default {
  name: 'AdminFile',
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
        addBtn: this.vaildData(this.hasPermission('sys_file_add'), true),
        delBtn: this.vaildData(this.hasPermission('sys_file_del'), true),
        editBtn: this.vaildData(this.hasPermission('sys_file_edit'), false)
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
          params,
          this.searchForm
        )
      )
        .then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    rowDel: function(row, index) {
      let _this = this
      this.$confirm('是否确认删除ID为' + row.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delObj(row.id)
        })
        .then(data => {
          _this.$notify.success('删除成功')
          this.getList(this.page)
        })
    },
    searchChange(form, done) {
      this.searchForm = form
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
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
    download: function(row, index) {
      downBlobFile(
        '/admin/sys-file/' + row.bucketName + '/' + row.fileName,
        this.searchForm,
        row.fileName
      )
    },
    uploadAfter(res, done, loading) {
      if (!this.validatenull(res.fileName)) {
        this.$notify.success('上传成功')
        this.getList(this.page)
      }
      done()
    }
  }
}
</script>
