<template>
  <div class="post-publish">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item @click="issue">发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      :data="newlist"
      style="width: 100%">
     <el-table-column
        type="index"
        label="序号"
        width="100"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="400">
     </el-table-column>
      <el-table-column
        prop="user.nickname"
        label="作者"
        width="180">
      </el-table-column>
      <el-table-column
        label="创建时间"
        >
        <template v-slot="{row}">
         {{row.create_date|item('YYYY-MM-DD  HH:mm:ss')}}
        </template>
      </el-table-column>
        <el-table-column
        label="封面">
       <template v-slot="{row}">
            <img :src="revision(row.cover[0].url)" alt="" class="avater">
       </template>
      </el-table-column>
        <el-table-column
        prop="address"
        label="操作"
        width="180"
        >
       <template v-slot="{row}">
           <el-button @click="issue(row.id)">编辑</el-button>
        <el-button type="danger">删除</el-button>
       </template>
      </el-table-column>
    </el-table>

      <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[ 1,3, 6, 10, 11, 15]"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newlist: [],
      pageIndex: 1,
      pageSize: 3,
      total: 0
    }
  },
  created () {
    this.poslist()
  },
  methods: {
    async poslist () {
      const res = await this.axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data, total } = res.data
      if (statusCode === 200) {
        this.newlist = data
        this.total = total
      }
      console.log(this.newlist)
    },

    handleCurrentChange (val) {
      this.pageIndex = val
      this.poslist()
    },
    handleSizeChange (val) {
      // 如果每页显示的条数变了，应该从第一页开始重新展示
      // console.log(val)
      this.pageIndex = 1
      this.pageSize = val
      this.poslist()
    },
    indexMethod (index) {
      return (this.pageIndex - 1) * this.pageSize + index + 1
    },
    issue (id) {
      // console.log(id)
      this.$router.push({
        name: 'second',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.post-publish {
.el-table {
    margin-top: 20px;
    .avater {
      width: 200px;
      height: 150px;
      justify-content: flex-end;
    }
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
