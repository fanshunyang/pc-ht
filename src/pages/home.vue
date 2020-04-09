<template>
 <div class="home">
    <!-- 布局 -->
    <el-container>
      <el-aside width="200px">
          <div class="logo">乐宝头条</div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
       router
       :default-active='$route.path'
       >

      <el-menu-item index="/stair">
        <i class="el-icon-menu"></i>
        <span slot="title">文章列表</span>
      </el-menu-item>
      <el-menu-item index="/second">
        <i class="el-icon-setting"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
    </el-menu>
      </el-aside>
      <el-container>

        <el-header>
          <img :src="axios.defaults.baseURL+ user.head_img" alt="">
          <div class="nickname">{{user.nickname}}</div>
          <a href="javascript:;" class="logout" @click="logout">退出</a>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async logout () {
      try {
        await this.$confirm('您确定要退出本次系统吗？', '提示', { type: 'warning' })
        this.$message.success('退出成功')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push('/login')
      } catch {
        this.$message.info('取消退出')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.home {
  position: absolute;
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content:flex-end;

    img {
    width: 48px;
    height: 48px;
    // margin-top: 10px;
    padding: 0;
    border-radius: 50%;
    }
    .nickname {
        padding: 0 10px;
    }
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;

     .logo {
    height: 60px;
    line-height: 60px;
    background-color: #333;
    color: #fff;
    font-weight: 700;
  }
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>
