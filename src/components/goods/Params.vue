<template>
  <div>
    <!-- 面包屑 导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 头部的警告区域 -->
      <div>
        <el-alert
          show-icon
          :closable="false"
          title="注意:只允许为三级分类设置相关参数"
          type="warning"
        ></el-alert>
      </div>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类:</span>
          <!-- 选择商品分类的级联选择框 -->
          <!-- options 用来指定数据源 -->
          <!-- props 配置级联选择框 -->
          <!-- v-model 保存选中的数据  id值 -->
          <el-cascader
            clearable
            v-model="selectedCateKeys"
            :options="catelist"
            :props="cateProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab 页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数的按钮 -->
          <el-button :disabled="isBtnDisabled" type="primary" size="mini"
            >添加参数</el-button
          >
          <!-- 动态参数表格展示 -->
          <el-table :data="manyTabData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edit"
                  >编辑</el-button
                ><el-button size="mini" type="danger" icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加属性的按钮 -->
          <el-button :disabled="isBtnDisabled" type="primary" size="mini"
            >添加属性</el-button
          >
          <!-- 静态属性表格 -->
          <el-table :data="onlyTabData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edit"
                  >编辑</el-button
                ><el-button size="mini" type="danger" icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类列表
      catelist: [],
      // 级联选择框的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定到的数组
      selectedCateKeys: [],
      // 被激活的页签的名称
      activeName: 'many',
      // 这是动态参数的数据
      manyTabData: [],
      // 这是静态属性的数据
      onlyTabData: []
    }
  },
  methods: {
    // 获取所有商品分类
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      console.log('获取成功')
      this.catelist = res.data
      console.log(this.catelist)
    },
    // 级联选择框选中项的变化,会触发这个函数
    handleChange() {
      this.getParamsData()
    },
    // Tab 页签点击事件的处理函数
    handleTabClick() {
      this.getParamsData()

      console.log(this.activeName)
    },
    // 获取参数的列表数据
    async getParamsData() {
      // 证明选中 的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        return
      }
      // 证明选的是三级分类
      console.log(this.selectedCateKeys)
      // 根据所选分类的Id 和当前所处的面板 获取对应的参数
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: {
            sel: this.activeName
          }
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('获取参数列表失败')
      }
      console.log(res.data)
      if (this.activeName === 'many') {
        this.manyTabData = res.data
      } else {
        this.onlyTabData = res.data
      }
    }
  },
  computed: {
    // 如果按钮需要被禁用 返回true  否则  false
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    // 这是当前选中的三级分类Id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    }
  },
  created() {
    this.getCateList()
  }
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
