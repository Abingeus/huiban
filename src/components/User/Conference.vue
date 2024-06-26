<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-main>
      <el-row>征稿</el-row>
      <el-row>
        <el-col :span="10"
        >CCF: Conference Rank (A, B, C) from China Computer Federation (2022)
        </el-col>

        <el-col :span="20"
        >CORE: Conference Rank (A*, A, B, C) from Computing Research and Education Association of Australasia (2020)
        </el-col>

        <el-col :span="30"
        >QUALIS: Conference Rank (A1, A2, B1, B2, B3, B4, B5) from Brazilian Classification System for Conferences and Journals (2016)
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
      <!-- 页面主体区域 -->




      <el-table
          :data="currentTableData1"
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

<!--        <el-table-column-->
<!--            prop="id"-->
<!--            label="#"-->
<!--            sortable-->
<!--        ></el-table-column>-->
        <el-table-column prop="ccf" label="CCF" min-width="25"></el-table-column>
        <el-table-column label="全称" min-width="200">
          <template v-slot="{ row }">
            <router-link :to="{ name: 'conference_information', query: {
      name: row.name,
      ccf: row.ccf,
      core: row.core,
      qualis: row.qualis,
      deadline: row.deadline,
      notifacation: row.notifation,
      meeting: row.meeting,
      address: row.address,
      session: row.session,
      viewCount: row.viewCount
    }}">
              {{ row.name }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="core" label="CORE" min-width="50"></el-table-column>
        <el-table-column prop="qualis" label="QULIS" min-width="50"></el-table-column>

        <el-table-column prop="deadline" label="截稿日期" min-width="50"></el-table-column>
        <el-table-column prop="notification" label="通知日期" min-width="50"></el-table-column>
        <el-table-column prop="meeting" label="会议日期" min-width="50"></el-table-column>
        <el-table-column prop="address" label="会议地址" min-width="150"></el-table-column>
        <el-table-column prop="session" label="届" min-width="30"></el-table-column>
        <el-table-column prop="viewCount" label="浏览量" min-width="30"></el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="queryInfo1.currentpage"
          :page-sizes="[3, 5, 7, 10]"
          :page-size="queryInfo1.pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryInfo1.total"
      >
      </el-pagination>
      <el-row>征稿结束</el-row>
      <el-table
          :data="currentTableData2"
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
<!--        <el-table-column-->
<!--            prop="id"-->
<!--            label="#"-->
<!--            sortable-->
<!--        ></el-table-column>-->
        <el-table-column prop="ccf" label="CCF" min-width="25"></el-table-column>
        <el-table-column prop="name" label="全称" min-width="200"></el-table-column>
        <el-table-column prop="core" label="CORE" min-width="50"></el-table-column>
        <el-table-column prop="qualis" label="QULIS" min-width="50"></el-table-column>
        <el-table-column prop="deadline" label="截稿日期" min-width="50"></el-table-column>
        <el-table-column prop="notification" label="通知日期" min-width="50"></el-table-column>
        <el-table-column prop="meeting" label="会议日期" min-width="50"></el-table-column>
        <el-table-column prop="address" label="会议地址" min-width="150"></el-table-column>
        <el-table-column prop="session" label="届" min-width="25"></el-table-column>
        <el-table-column prop="viewCount" label="浏览量" min-width="25"></el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"

          :current-page="queryInfo1.currentpage"
          :page-sizes="[3, 5, 7, 10]"
          :page-size="queryInfo1.pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryInfo2.total"
      >
      </el-pagination>

    <el-row> </el-row>
    </el-main>





  </el-container>
</template>



<script>
import axios from "axios";

export default {
  data() {
    return {

      tableData1: [],
      currentTableData1:[],
      tableData2: [],
      currentTableData2:[],
      queryInfo1: {
        pageNum: 7,
        currentpage: 1,
        total: 0,

      },
      queryInfo2: {
        pageNum: 7,
        currentpage: 1,
        total: 0,

      },


      title: "消息查询表格",
      loading: true,
    };
  },
  created() {
    this.searchUnfinishconference();
    this.searchFinishconference();
  },
  methods: {
    updateCurrentTableData1() {
      const start = (this.queryInfo1.currentpage-1)*this.queryInfo1.pageNum;
      const end = Math.min(start + this.queryInfo1.pageNum,this.tableData1.length);
      this.currentTableData1 = this.tableData1.slice(start, end);
      this.loading=false;
      console.log("当前1");
      console.log(this.currentTableData1);
      console.log(this.tableData1);
    },
    // 页码变化时触发
    handleCurrentChange1(val) {
      this.queryInfo1.currentpage = val;
      this.updateCurrentTableData1();
    },
    // 每页条数变化时触发
    handleSizeChange1(val) {
      this.queryInfo1.pageNum = val;
      this.updateCurrentTableData1();
    },
    updateCurrentTableData2() {
      const start = (this.queryInfo2.currentpage-1)*this.queryInfo2.pageNum;
      const end = Math.min(start + this.queryInfo2.pageNum,this.tableData2.length);
      this.currentTableData2 = this.tableData2.slice(start, end);
      this.loading=false;
      console.log("当前2");
      console.log(this.currentTableData2);
      console.log(this.tableData2);

    },
    // 页码变化时触发
    handleCurrentChange2(val) {
      this.queryInfo2.currentpage = val;
      this.updateCurrentTableData2();
    },
    // 每页条数变化时触发
    handleSizeChange2(val) {
      this.queryInfo2.pageNum = val;
      this.updateCurrentTableData2();
    },
    async searchUnfinishconference() {
      this.loading = true;
      const {data:res } = await axios.get("/api/conference/unfinish");
      this.tableData1 = res.data;
      this.queryInfo1.total=res.data.length;
      this.updateCurrentTableData1();




    },
    async searchFinishconference() {
      this.loading = true;
      const {data:res } = await axios.get("/api/conference/finish");
      console.log("结束");
      console.log(res);
      this.queryInfo2.total=res.data.length;
      this.tableData2 = res.data;
      this.updateCurrentTableData2();

      // if (res.status !== 200) {
      //   this.total = 0;
      //   this.loading = false;
      //   return this.$message.error(res.msg);
      // }
      // this.$message.success({
      //   message: res.msg,
      //   duration: 1000,
      // });

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