<template>
  <div class="search_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <!--      <el-breadcrumb-item>图书查询</el-breadcrumb-item>-->
    </el-breadcrumb>
    <el-card shadow="always">
      <!-- 搜索内容和导出区域 -->
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
      <!-- 表格区域 -->
      <el-table
          :data="conferences"
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
<!--            prop="message_number"-->
<!--            label="#"-->
<!--            sortable-->
<!--        ></el-table-column>-->
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="abbreviation" label="Abbreviation"></el-table-column>
        <el-table-column prop="ccf" label="CCF"></el-table-column>
        <el-table-column prop="core" label="Core"></el-table-column>
        <el-table-column prop="qualis" label="Qualis"></el-table-column>
        <el-table-column prop="deadline" label="Deadline"></el-table-column>
        <el-table-column prop="notification" label="Notification"></el-table-column>
        <el-table-column prop="meeting" label="Meeting"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
        <el-table-column prop="session" label="Session"></el-table-column>
        <el-table-column prop="viewCount" label="View Count"></el-table-column>
        <el-table-column prop="focusCount" label="Focus Count"></el-table-column>
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
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      conferences:[],
      conferences_view: [],
      conferences_focus: [],
      conferences_attend: [],
      jornals_view: [],
      jornals_focus: [],



      tableData: [],
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
    this.coferencebyfocus();
    this.coferencebyview();
    this.coferencebyattend();
  },
  methods: {
    async coferencebyfocus()
    {
      const {data:data} = await axios.get("/api/conference/conferenceRankedByFocus");
      this.conferences_focus=data.data;
      this.conferences=data.data;
      this.loading=false;
      console.log(data.data);

    },
    async coferencebyattend()
    {
      const {data:data} = await axios.get("/api/conference/conferenceRankedByAttend");
      this. conferences_attend=data.data;
      this.loading=false;
      console.log(data.data);

    },
    async coferencebyview()
    {
      const {data:data} = await axios.get("/api/conference/conferenceRankedByViewCount");
      this. conferences_view=data.data;
      this.loading=false;
      console.log(data.data);

    },





    handleSizeChange(val) {
      this.queryInfo.pageSize = val;

      this.searchMessageByPage();
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;

      // this.searchMessageByPage();
    },
    // async searchMessageByPage() {
    //   this.loading = true;
    //   const { data: res } = await this.$http.post(
    //       "user/search_message_page",
    //       this.queryInfo
    //   );
    //   this.tableData = [];
    //   if (res.status !== 200) {
    //     this.total = 0;
    //     this.loading = false;
    //     return this.$message.error(res.msg);
    //   }
    //   this.$message.success({
    //     message: res.msg,
    //     duration: 1000,
    //   });
    //   this.loading = false;
    //   this.tableData = res.data.records;
    //   this.total = parseInt(res.data.total);
    // },
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

<style lang="css"></style>