<template>
  <div class="app-container">
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :permission="permissionList"
      :table-loading="tableLoading"
      :before-open="beforeOpen"
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
          v-if="hasPermission('sys_publicparam_del')"
          class="filter-item"
          type="primary"
          icon="el-icon-refresh-left"
          @click="handleRefreshCache"
        >缓存
        </el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { addObj, delObj, fetchList, putObj, refreshCache } from '@/api/admin/sys-public-param'
import { tableOption } from './option'
import { hasPermission } from '@/utils/permission'

export default {
  name: 'AdminParam',
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
        addBtn: this.vaildData(this.hasPermission('sys_publicparam_add'), false),
        delBtn: this.vaildData(this.hasPermission('sys_publicparam_del'), false),
        editBtn: this.vaildData(this.hasPermission('sys_publicparam_edit'), false)
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
      })
    },
    rowDel: function(row, index) {
      this.$confirm('是否确认删除ID为' + row.publicId, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delObj(row.publicId)
      }).then(data => {
        this.getList(this.page)
        this.$notify.success('删除成功')
        this.getList(this.page)
      })
    },
    beforeOpen(show, type) {
      window.boxType = type
      show()
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function(row, index, done, loading) {
      putObj(row).then(data => {
        this.$notify.success('修改成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
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
    handleRefreshCache: function() {
      refreshCache().then(() => {
        this.$notify.success('清除缓存成功')
      }).catch(function() {
      })
    }
  }
}
</script>
