<template>
  <div class="app-container">
    <avue-crud
      ref="crud"
      v-model="form"
      :option="option"
      :page.sync="page"
      :table-loading="listLoading"
      :before-open="handleOpenBefore"
      :data="list"
      @on-load="getList"
      @size-change="sizeChange"
      @current-change="currentChange"
      @search-change="handleFilter"
      @refresh-change="handleRefreshChange"
      @row-update="update"
      @row-save="create"
    >
      <template slot="menuLeft">
        <el-button
          v-if="hasPermission('sys_user_add')"
          class="filter-item"
          type="primary"
          icon="el-icon-edit"
          @click="$refs.crud.rowAdd()"
        >{{ $t('avue.crud.btnAdd') }}
        </el-button>
        <el-button
          v-if="hasPermission('sys_user_import_export')"
          class="filter-item"
          plain
          type="primary"
          icon="el-icon-upload"
          @click="$refs.excelUpload.show()"
        >{{ $t('avue.crud.btnImport') }}
        </el-button>
        <el-button
          v-if="hasPermission('sys_user_import_export')"
          class="filter-item"
          plain
          type="primary"
          icon="el-icon-download"
          @click="exportExcel"
        >{{ $t('avue.crud.btnExport') }}
        </el-button>
      </template>
      <template slot="username" slot-scope="scope">
        <span>{{ scope.row.username }}</span>
      </template>
      <template slot="role" slot-scope="scope">
        <span v-for="(role, index) in scope.row.roleList" :key="index">
          <el-tag class="el-tag-span">{{ role.roleName }} </el-tag>
        </span>
      </template>
      <template slot="post" slot-scope="scope">
        <span v-for="(role, index) in scope.row.postList" :key="index">
          <el-tag class="el-tag-span">{{ role.postName }} </el-tag>
        </span>
      </template>
      <template slot="deptId" slot-scope="scope">
        {{ scope.row.deptName }}
      </template>
      <template slot="lockFlag" slot-scope="scope">
        <el-tag>{{ scope.label }}</el-tag>
      </template>
      <template slot="menu" slot-scope="scope">
        <el-button
          v-if="hasPermission('sys_user_edit')"
          type="text"
          icon="el-icon-edit"
          @click="handleUpdate(scope.row, scope.index)"
        >{{ $t('avue.crud.btnEdit') }}
        </el-button>
        <el-button
          v-if="hasPermission('sys_user_del')"
          type="text"
          icon="el-icon-delete"
          @click="deletes(scope.row, scope.index)"
        >{{ $t('avue.crud.btnDel') }}
        </el-button>
      </template>
      <template slot="deptIdForm">
        <avue-input-tree
          v-model="form.deptId"
          :placeholder="$t('admin.user.t100')"
          :node-click="getNodeData"
          :dic="treeDeptData"
          :props="defaultProps"
        />
      </template>
      <template slot="roleForm">
        <avue-select
          v-model="role"
          multiple
          :placeholder="$t('admin.user.t101')"
          :dic="rolesOptions"
          :props="roleProps"
        />
      </template>
      <template slot="postForm">
        <avue-select
          v-model="post"
          multiple
          :placeholder="$t('admin.user.t102')"
          :dic="postOptions"
          :props="postProps"
        />
      </template>
    </avue-crud>

    <!--excel 模板导入 -->
    <upload-excel
      ref="excelUpload"
      :title="$t('admin.user.t103')"
      url="/admin/user/import"
      :temp-name="$t('admin.user.t104')"
      temp-url="/admin/sys-file/local/user.xlsx"
      @refreshDataList="handleRefreshChange"
    ></upload-excel>
  </div>
</template>

<script>
import { option } from './option'
import { addObj, delObj, fetchList, putObj } from '@/api/admin/user'
import { deptRoleList } from '@/api/admin/role'
import { listPosts } from '@/api/admin/post'
import { fetchTree } from '@/api/admin/dept'
import { hasPermission } from '@/utils/permission'
import UploadExcel from '@/components/upload/excel'
import { downBlobFile } from '@/utils'

export default {
  name: 'AdminUser',
  data() {
    return {
      option: option,
      treeDeptData: [],
      checkedKeys: [],
      postProps: {
        label: 'postName',
        value: 'postId'
      },
      roleProps: {
        label: 'roleName',
        value: 'roleId'
      },
      defaultProps: {
        label: 'name',
        value: 'id'
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false // 是否倒序
      },
      query: {},
      list: [],
      listLoading: true,
      post: [],
      role: [],
      form: {},
      postOptions: [],
      rolesOptions: []
    }
  },
  components: { UploadExcel },
  watch: {
    role() {
      this.form.role = this.role
    },
    post() {
      this.form.post = this.post
    }
  },
  methods: {
    hasPermission,
    getList(page, params) {
      this.listLoading = true
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize
          },
          params
        )
      ).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    getNodeData(data) {
      deptRoleList().then(response => {
        this.rolesOptions = response.data.data
      })
      listPosts().then(response => {
        this.postOptions = response.data.data
      })
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    handleFilter(param, done) {
      this.query = param
      this.page.currentPage = 1
      this.getList(this.page, param)
      done()
    },
    handleRefreshChange() {
      this.getList(this.page)
    },
    handleOpenBefore(show, type) {
      window.boxType = type
      // 查询部门树
      fetchTree().then(response => {
        this.treeDeptData = response.data.data
      })
      // 查询角色列表
      deptRoleList().then(response => {
        this.rolesOptions = response.data.data
      })
      // 查询岗位列表
      listPosts().then(response => {
        this.postOptions = response.data.data
      })
      // 若是编辑、查看回显角色名称
      if (['edit', 'views'].includes(type)) {
        this.role = []
        for (let i = 0; i < this.form.roleList.length; i++) {
          this.role[i] = this.form.roleList[i].roleId
        }
        this.post = []
        for (let i = 0; i < this.form.postList.length; i++) {
          this.post[i] = this.form.postList[i].postId
        }
      } else if (type === 'add') {
        // 若是添加角色列表设置为空
        this.role = []
        this.post = []
      }
      show()
    },
    handleUpdate(row, index) {
      this.$refs.crud.rowEdit(row, index)
      this.form.password = undefined
    },
    create(row, done, loading) {
      addObj(this.form)
        .then(() => {
          this.getList(this.page)
          done()
          this.$notify.success(this.$t('avue.notify.n100'))
        })
        .catch(() => {
          loading()
        })
    },
    update(row, index, done, loading) {
      putObj(this.form)
        .then(() => {
          this.getList(this.page)
          done()
          this.$notify.success(this.$t('avue.notify.n101'))
        })
        .catch(() => {
          loading()
        })
    },
    deletes(row) {
      this.$confirm(
        this.$t('admin.user.t105') + row.username + this.$t('admin.user.t106'),
        this.$t('avue.notify.n104'),
        {
          confirmButtonText: this.$t('avue.crud.btnConfirm'),
          cancelButtonText: this.$t('avue.crud.btnCancel'),
          type: 'warning'
        }
      ).then(() => {
        delObj(row.userId)
          .then(() => {
            this.getList(this.page)
            this.$notify.success(this.$t('avue.notify.n102'))
          })
          .catch(() => {
            this.$notify.error(this.$t('avue.notify.n103'))
          })
      })
    },
    exportExcel() {
      downBlobFile('/admin/user/export', this.query, 'user.xlsx')
    }
  }
}
</script>

<style scoped="scoped">
.el-tag-span {
  margin: 0px 5px;
}
</style>
