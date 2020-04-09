<template>
 <div class="post-publish">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单，用于收集新建文章的数据 -->
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入文章的标题"></el-input>
      </el-form-item>
      <el-form-item label="内容">
      <VueEditor v-model="form.content"></VueEditor>
      </el-form-item>
      <el-form-item label="栏目">
      <el-checkbox-group v-model="form.categories">
      <el-checkbox  v-for="item in hostlist" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
      </el-form-item>
     <el-form-item label="文件上传">
   <el-upload
  :action="axios.defaults.baseURL + '/upload'"
  list-type="picture-card"
  :headers="headers"
  :on-success="handleSuccess"
  :file-list="filelist"
 >
  <i class="el-icon-plus"></i>
</el-upload>
      </el-form-item>
 <el-form-item label="类型">
  <!-- 单选框 -->
  <el-radio-group v-model="form.type">
    <el-radio :label="1">文章</el-radio>
    <el-radio :label="2">视频</el-radio>
  </el-radio-group>
</el-form-item>
<el-form-item label="提交">
<el-button type="primary" @click="publish">发布</el-button>
</el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      pageId: '',
      filelist: [],
      headers: {
        Authorization: localStorage.getItem('token')
      },
      hostlist: []
    }
  },
  created () {
    this.pageId = this.$route.params.id
    if (this.pageId) {
      this.announce(this.pageId)
    }
    console.log(this.pageId)

    this.tagerlist()
  },
  methods: {
    async tagerlist () {
      const res = await this.axios.get(`/category`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.hostlist = data.filter(item => item.id !== 999)
        // this.hostlist = data
      }
      console.log(this.hostlist)
    },
    async publish () {
      console.log(this.form)
      const aa = {
        ...this.form
      }
      let url
      if (this.pageId) {
        url = `/post_update/${this.postId}`
      } else {
        url = '/post'
      }
      aa.categories = this.form.categories.map(item => {
        return {
          id: item
        }
      })
      const res = await this.axios.post(url, aa, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$message.success('发布成功')
        this.$router.push('/stair')
      }
    },
    handleSuccess (res) {
      const { statusCode, data } = res
      if (statusCode === 200) {
        console.log(data)
        this.form.cover.push({
          id: data.id,
          url: this.axios.defaults.baseURL + data.url
        })
        console.log(this.url)
        console.log(this.id)
      }
      console.log(res)
    },
    async announce (id) {
      const res = await this.axios.get(`/post/${id}`)
      console.log(res)
      // 这里的data是获取到的新数据
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 如果this.form是新增的那么就会没有如果是编辑后的那么this.form就有以前的值
        this.form = data
        data.categories = data.categories.map(item => {
          return item.id
        })
        data.cover.forEach(item => {
          this.filelist.push({
            url: this.revision(item.url),
            id: item.id
          })
          console.log(this.filelist)
          data.content = data.content.replace(/<div/g, '<p')
          data.content = data.content.replace(/<\/div>/g, '</p>')
          console.log(data)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-publish {
    .el-form {
        margin-top: 20px;
        text-align: left;
        .el-checkbox-group {
            text-align: left;
        }
    }
}
</style>
