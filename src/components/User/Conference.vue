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
          :data="tableData"
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
        <el-table-column prop="CCF" label="CCF"></el-table-column>
        <el-table-column prop="CORE" label="CORE"></el-table-column>
        <el-table-column prop="QUALIS" label="QUALIS"></el-table-column>
        <el-table-column prop="Abbreviation" label="简称"></el-table-column>
        <el-table-column prop="full_name" label="全称"></el-table-column>
        <el-table-column prop="conference_date" label="会议日期"></el-table-column>
        <el-table-column prop="conference_location" label="会议地点"></el-table-column>
        <el-table-column prop="sessions" label="届数"></el-table-column>
        <el-table-column prop="Browse" label="浏览"></el-table-column>
      </el-table>
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
      <el-row>征稿结束</el-row>
      <el-table
          :data="tableData"
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
        <el-table-column prop="CCF" label="CCF"></el-table-column>
        <el-table-column prop="CORE" label="CORE"></el-table-column>
        <el-table-column prop="QUALIS" label="QUALIS"></el-table-column>
        <el-table-column prop="Abbreviation" label="简称"></el-table-column>
        <el-table-column prop="full_name" label="全称"></el-table-column>
        <el-table-column prop="conference_date" label="会议日期"></el-table-column>
        <el-table-column prop="conference_location" label="会议地点"></el-table-column>
        <el-table-column prop="sessions" label="届数"></el-table-column>
        <el-table-column prop="Browse" label="浏览"></el-table-column>
      </el-table>
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
    <el-row> </el-row>
    </el-main>





  </el-container>
</template>



<script>
export default {
  data() {
    return {
      options: [
        {
          value: "message_number",
          label: "信息编号",
        },
        {
          value: "message_date",
          label: "消息日期",
        },
        {
          value: "message_category",
          label: "消息类型",
        },
        {
          value: "detail",
          label: "内容",
        },
      ],
      tableData: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        condition: "",
        query: "",
      },
      total: 0,

      title: "消息查询表格",
      json_fields: {
        信息编号: "message_number",
        消息日期: "message_date",
        消息类型: "message_category",
        内容: "detail",
      },
      loading: true,
    };
  },
  created() {
    this.searchMessageByPage();
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
    async searchMessageByPage() {
      this.loading = true;
      const { data: res } = await this.$http.post(
          "user/search_message_page",
          this.queryInfo
      );
      this.tableData = [];
      if (res.status !== 200) {
        this.total = 0;
        this.loading = false;
        return this.$message.error(res.msg);
      }
      this.$message.success({
        message: res.msg,
        duration: 1000,
      });
      this.loading = false;
      this.tableData = res.data.records;
      this.total = parseInt(res.data.total);
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