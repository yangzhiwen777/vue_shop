<template>
 <div class="login_container">
   <div class="login_box">
     <!-- 头像区域 -->
     <div class="avatar_box">
       <img src="../assets/logo.png" alt="">
     </div>
     <!-- 登陆表单区域 -->
     <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="biaodan">
       <!-- 用户名区域 -->
       <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" ></el-input>
      </el-form-item>
      <!-- 密码框区域 -->
       <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password" ></el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns">
         <el-button type="primary" @click="login">登录</el-button>
         <el-button type="success" @click="resetLoginForm">重置</el-button>
      </el-form-item>
     </el-form>
   </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      // 登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则对象
      rules: {
        // 验证用户名
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        // 验证密码
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮 重置表单
    resetLoginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 进行登陆前预校验表单验证结果
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        // 解构赋值 输出
        const { data: res } = await this.$http.post('login', this.loginForm)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        // console.log(res) // 携带将登录成功之后的token 信息
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')

        // 1.将登录成功之后的token,保存到客户端的sessionStorage 中
        // 1.1项目中出了登录之外的其他API接口，必须在登录之后才能访问
        // 1.2 token 只应在当前网站打开期间生效，所以将token 保存在sessionStorage 中
        // 2.通过编程式导航跳转到后台主页，路由地址是/home

        // 老方法输出data
        // const result = await this.$http.post('login', this.loginForm)
        // console.log(result.data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  position: relative;
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    // overflow: hidden;
    margin: 0 auto;
    padding: 10px;
    transform: translateY(-50%);
    box-shadow: 0px 0px 10px #ddd;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .biaodan {
    // position: absolute;
    transform: translateY(-50px);
    padding: 0 20px;
  }
  .btns {
    float: right;
    margin-right: 30px;
  }
}
</style>
