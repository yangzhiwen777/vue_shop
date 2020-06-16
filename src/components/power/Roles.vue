<template>
  <div>
    <!-- <h1>角色列表区域</h1> -->
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRolesForm"
            >添加角色</el-button
          ></el-col
        >
      </el-row>
      <!-- <div>
    <el-button type="primary">添加角色</el-button>
    </div> -->
      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- //栅格 -->
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <!-- span 一共分了24 份 -->
              <el-col :span="5"
                ><el-tag
                  @close="removeRightById(scope.row, item1.id)"
                  closable
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i
              ></el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过 for循环嵌套 渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      @close="removeRightById(scope.row, item2.id)"
                      closable
                      type="success"
                      >{{ item2.authName }}</el-tag
                    ><i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- //格式化本例的数据 标签 -->
            <!-- <pre>
              {{ scope.row }}
           </pre
            > -->
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRolesDialog(scope.row.id)"
              >编辑</el-button
            ><el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="open(scope.row.id)"
              >删除</el-button
            ><el-button
              @click="showSetRightDialog(scope.row)"
              type="warning"
              icon="el-icon-setting"
              size="mini"
              >分配权限</el-button
            >
            <!-- <span>{{ scope.row.id }}</span> -->
          </template>
        </el-table-column>
      </el-table></el-card
    >
    <!-- 添加角色的对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRolesDialogVisible"
      width="50%"
      @close="addRolesDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addRolesFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 内容主体区域 -->
        <el-form-item label="角色名称" prop="rolesName">
          <el-input v-model="addForm.rolesName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="rolesDescribe">
          <el-input v-model="addForm.rolesDescribe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- //修改角色的对话框-->
    <el-dialog
      title="修改角色"
      :visible.sync="editRolesdialogVisible"
      width="50%"
      @close="editRolesDialogClosed"
    >
      <!-- 修改角色表单内容 -->
      <el-form
        :rules="editRolesRules"
        ref="editRolesFormRef"
        :model="editRolesForm"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRolesdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <el-tree
        :default-checked-keys="defKeys"
        default-expand-all
        node-key="id"
        show-checkbox
        ref="treeRef"
        :data="rightslist"
        :props="treeProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表数据
      rolesList: [],
      // 添加角色 对话框  的显示与隐藏
      addRolesDialogVisible: false,
      // 添加角色的表单数据
      addForm: {
        rolesName: '',
        rolesDescribe: ''
      },
      // 添加角色表单的验证规则
      addFormRules: {
        rolesName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入1-15个字节', trigger: 'blur' }
        ],
        rolesDescribe: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入1-15个字节', trigger: 'blur' }
        ]
      },
      // 编辑 角色对话框显示
      editRolesdialogVisible: false,
      // 编辑角色表单
      editRolesForm: {},
      // 编辑角色表单验证规则
      editRolesRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 8, message: '请输入2-8个字节', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 8, message: '请输入2-8个字节', trigger: 'blur' }
        ]
      },
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 所有的权限列表
      rightslist: [],
      // 树形控件的属性绑定对象
      treeProps: {
        // 父子嵌套所用的属性
        children: 'children',
        // 展示的权限名属性
        label: 'authName'
      },
      // 默认选中的节点id值数组
      defKeys: [],
      // 当前即将分配角色权限的ID
      roleId: ''
    }
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesList = res.data
    },
    // 显示 添加角色对话框
    addRolesForm() {
      this.addRolesDialogVisible = true
    },
    // 监听添加角色对话框关闭事件  清空
    addRolesDialogClosed() {
      this.$refs.addRolesFormRef.resetFields()
    },
    // 点击确定按钮 添加新角色
    addRoles() {
      // 先进行预校验
      this.$refs.addRolesFormRef.validate(async volid => {
        // console.log(volid)
        if (!volid) return
        // console.log(this)

        const { data: res } = await this.$http.post('roles', {
          roleName: this.addForm.rolesName,
          roleDesc: this.addForm.rolesDescribe
        })
        // console.log(res)
        if (res.meta.status !== 200) {
          this.$message.error('添加角色失败')
        }
        this.$message.success('添加角色成功')
        this.addRolesDialogVisible = false
        this.getRolesList()
      })
    },
    // 编辑角色对话框按钮
    async editRolesDialog(id) {
      const { data: res } = await this.$http.get('roles/' + id)
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('编辑角色失败')
      this.editRolesForm = res.data
      // console.log(this.editRolesForm)
      this.editRolesdialogVisible = true

      // console.log(id)
    },
    // 编辑角色 对话框 关闭 之后清空
    editRolesDialogClosed() {
      this.$refs.editRolesFormRef.resetFields()
    },
    // 点击确定按钮 编辑新角色 先进行预校验
    editRoles() {
      // 先进性预校验
      this.$refs.editRolesFormRef.validate(async volid => {
        // console.log(volid)
        if (!volid) {
          return this.$message.error('编辑角色失败')
        }
        const { data: res } = await this.$http.put(
          'roles/' + Number(this.editRolesForm.roleId),
          {
            roleName: this.editRolesForm.roleName,
            roleDesc: this.editRolesForm.roleDesc
          }
        )
        console.log(res)
        this.getRolesList()
        this.editRolesdialogVisible = false
      })
    },
    // 点击删除按钮弹出提示框
    async open(id) {
      console.log(id)
      // 先弹框询问  是否直接删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该角色, 是否继续?',
        '确认删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 确认删除  输出  'confirm'
      // 取消删除 输出 'cancel'
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除角色')
      }
      console.log('确认删除')
      // 进行接口调用 删除角色
      const { data: res } = await this.$http.delete('roles/' + id)
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('删除角色失败')
      }
      this.$message.success('删除角色成功')
      this.getRolesList()
    },
    // 根据Id删除权限id
    async removeRightById(role, rightId) {
      console.log(rightId)
      // 弹框 询问是否要删除  权限
      const confirmResult = await this.$confirm(
        '此操作将永久删除该角色, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.error('取消删除权限')
      }
      console.log('确认删除')
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      }
      // 返回值 就是 最新的权限
      role.children = res.data
      //  调用此方法 重新渲染 列表  关闭展开栏 不建议
      // this.getRolesList()
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('rights/tree')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      // 获取到的权限数据 保存到data
      this.rightslist = res.data
      console.log(this.rightslist)
      // 递归获取三级节点的递归
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
    },
    // 通过递归的形式的，获取角色下所有的三级权限的id 保存到数组中
    //  defKeys
    getLeafKeys(node, arr) {
      // 如果当前 node 节点 不包括
      // children属性 则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    // 监听分配权限 对话框的 关闭事件 重置defKeys  Id数组
    setRightDialogClosed() {
      this.defKeys = []
    },
    // 点击为角色 分配权限
    async   allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      console.log(keys)
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      this.getRolesList()
      this.setRightDialogVisible = false
    }
  },
  created() {
    // 获取角色列表
    this.getRolesList()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-top: 15px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
// 纵向上的居中对齐
.vcenter {
  display: flex;
  align-items: center;
}
</style>
