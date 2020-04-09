<template>
<div class="login">
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="账号">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
<el-form-item label="密码">
    <el-input v-model="form.password" type="password"></el-input>
  </el-form-item>
  <el-form-item class="sh">
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="reset">重置</el-button>
  </el-form-item>
</el-form>
<div>99999999</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      if (this.form.username === '') {
        this.$message.error('用户名不能为空')
        return
      } else if (this.form.password === '') {
        this.$message.error('密码不能为空')
        return
      }
      const res = await this.axios.post('/login', {
        username: this.form.username,
        password: this.form.password
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.$message.success('登录成功')
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        this.$router.push('/home')
      } else {
        this.$message.error('登录失败')
      }
    },
    reset () {
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
    .el-form {
    padding: 40px 20px;
    width: 400px;
    margin:  300px auto;
    border:  1px solid #cccccc;
    box-shadow : 1px 2px #ccc
}
.sh {
    .el-button:last-child {
      margin: 10px 50px;
    }
}
}
</style>
