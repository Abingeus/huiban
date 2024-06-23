<template>
  <el-container class="home-container">
    <!-- 头部区域 -->

<el-main>
    <el-row>
      <el-col :span="10"
      >CCF: Journal Rank (A, B, C) from China Computer Federation (2022).
      </el-col>

      <el-col :span="2" style="float: right">
        <el-button
            type="success"
            class="el-icon-full-screen"
            size="mini"
            @click="fullScreen"
        >全屏
        </el-button>
      </el-col>
    </el-row>
  <el-col :span="10"
  >征稿
  </el-col>

    <!-- 页面主体区域 -->
  <!-- 表格区域 -->
  <el-table
      :data="tableData1"
      height="520"
      border
      style="width: 100%; font-size: 14px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      id="pdfDom"
      :default-sort="{ prop: 'message_date', order: 'ascending' }"
      stripe
  >
    <el-table-column
        prop="message_number"
        label="#"
        sortable
    ></el-table-column>
    <el-table-column prop="ccf" label="CCF"></el-table-column>
    <el-table-column label="全称">
      <template v-slot="{ row }">
        <router-link :to="{ name: 'conference_information', params: { name: row.name } }">
          {{ row.name }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="issue" label="Special Issue"></el-table-column>
    <el-table-column prop="deadline" label="截稿日期"></el-table-column>
    <el-table-column prop="ifactor" label="影响因子"></el-table-column>
    <el-table-column prop="publisher" label="出版商"></el-table-column>
    <!--        <el-table-column prop="Browse" label="浏览"></el-table-column>-->
    <!--        <el-table-column prop="bookLibrary" label="分类"></el-table-column>-->
    <!-- 添加自定义列 -->
    <!--        <el-table-column label="详细信息">-->
    <!--          <template #default="scope">-->
    <!--            <a href="javascript:;" @click="viewDetails(scope.row)">详情</a>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
  </el-table>
  <!-- 分页查询区域 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.queryInfo.pageNum"
      :page-sizes="[1, 2, 3, 4, 5]"
      :page-size="this.queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
  >
  </el-pagination>



  <!-- 表格区域 -->
  <el-col :span="10"
  >期刊
  </el-col>
  <el-table
      :data="tableData2"
      height="520"
      border
      style="width: 100%; font-size: 14px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      id="pdfDom"
      :default-sort="{ prop: 'message_date', order: 'ascending' }"
      stripe
  >
    <el-table-column
        prop="id"
        label="#"
        sortable
    ></el-table-column>
    <el-table-column prop="ccf" label="CCF"></el-table-column>
    <el-table-column prop="abbreviation" label="简称"></el-table-column>
    <el-table-column prop="name" label="全称"></el-table-column>
    <el-table-column prop="ifactor" label="影响因子"></el-table-column>
    <el-table-column prop="publisher" label="出版商"></el-table-column>
    <el-table-column prop="issn" label="ISSN"></el-table-column>
    <el-table-column prop="viewCount" label="浏览"></el-table-column>
    <!--        <el-table-column prop="bookLibrary" label="分类"></el-table-column>-->

    <!-- 添加自定义列 -->
    <!--        <el-table-column label="详细信息">-->
    <!--          <template #default="scope">-->
    <!--            <a href="javascript:;" @click="viewDetails(scope.row)">详情</a>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
  </el-table>
  <!-- 分页查询区域 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.queryInfo.pageNum"
      :page-sizes="[1, 2, 3, 4, 5]"
      :page-size="this.queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
  >
  </el-pagination>
</el-main>
  </el-container>
</template>



<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData1: [],
      tableData2: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        condition: "",
        query: "",
      },
      total: 0,

      loading: true,
    };
  },
  created() {
    this.searchjournaling();
    this.searchjournal_all();

  },
  methods: {
    handleSizeChange(val) {
      this.queryInfo.pageSize = val;

      this.searchMessageByPage();
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;

      this.searchMessageByPage();
    },
    async searchjournaling() {
      this.loading = true;
      const {data:res } = await axios.get("/api/journal/solicit");

      this.tableData1 = [];
      // if (res.status !== 200) {
      //   this.total = 0;
      //   this.loading = false;
      //   return this.$message.error(res.msg);
      // }
      // this.$message.success({
      //   message: res.msg,
      //   duration: 1000,
      // });
      this.loading = false;
      this.tableData1 = res.data;
      // this.total = parseInt(res.data.total);
    },
    async searchjournal_all() {
      this.loading = true;
      const {data:res } = await axios.get("/api/journal/all");

      this.tableData2 = [];
      // if (res.status !== 200) {
      //   this.total = 0;
      //   this.loading = false;
      //   return this.$message.error(res.msg);
      // }
      // this.$message.success({
      //   message: res.msg,
      //   duration: 1000,
      // });
      this.loading = false;
      this.tableData2 = res.data;
      // this.total = parseInt(res.data.total);
    },
    downLoad() {
      this.getPdf(this.title); //参数是下载的pdf文件名
    },
    fullScreen() {
      // Dom对象的一个属性: 可以用来判断当前是否为全屏模式(trueORfalse)
      let full = document.fullscreenElement;
      // 切换为全屏模式
      if (!full) {
        // 文档根节点的方法requestFullscreen实现全屏模式
        document.documentElement.requestFullscreen();
      } else {
        // 退出全屏模式
        document.exitFullscreen();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.table-container{
  margin-bottom: 1.5%;
}
.footer {
  position: fixed;
  bottom: 0px;
  left: 40%;
  color: #ccc;

  a {
    color: #ccc;
  }
}

.home-container {
  height: 100%;
}

.el-header {
  background-color: rgb(34, 34, 34);
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  border-radius: 10px;

  >div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #fff;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
  padding: 20px;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  //设置文字之间的间距
  letter-spacing: 0.2em;
  cursor: pointer;
}

.user {
  margin-right: 15px;
  color: #ccc;
  font-size: 16px;
}

.el-menu-item:hover {
  background-color: rgb(51, 122, 183) !important;
}

// .el-menu-item{
//   color:rgb(135, 206, 235) !important;
// }</style>

<script setup>
</script>