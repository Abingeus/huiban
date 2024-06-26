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
          :data="currentTableData"
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
<!--        <el-table-column prop="id" label="ID"  min-width="30"></el-table-column>-->
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
        <el-table-column prop="abbreviation" label="Abbreviation"  min-width="120"></el-table-column>
        <el-table-column prop="ccf" label="CCF"  min-width="50"></el-table-column>
        <el-table-column prop="core" label="Core" min-width="60"></el-table-column>
        <el-table-column prop="qualis" label="Qualis" min-width="100"></el-table-column>
        <el-table-column prop="deadline" label="Deadline" min-width="100"></el-table-column>
        <el-table-column prop="notification" label="Notification" min-width="110"></el-table-column>
        <el-tble-column prop="meeting" label="Meeting" min-width="105"></el-tble-column>
        <el-table-column prop="address" label="Address" min-width="300"></el-table-column>
        <el-table-column prop="session" label="Session" min-width="80"></el-table-column>
        <el-table-column prop="viewCount" label="View Count" min-width="60"></el-table-column>
        <el-table-column prop="focusCount" label="Focus Count" min-width="60"></el-table-column>
      </el-table>

      <!-- 分页查询区域 -->
      <el-pagination
          background
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
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
      currentTableData: [], // 当前页数据
      pageSize: 5, // 每页显示条目数
      currentPage: 1, // 当前页码
      conferences:[],
      total: 0,
      loading: true,
    };
  },
  created() {
    this.coferencebyfocus();
    // this.coferencebyview();
    // this.coferencebyattend();
  },
  methods: {
    updateCurrentTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;

      this.currentTableData = this.conferences.slice(start, end);
      this.loading=false;
      console.log("当前");
      console.log(this.currentTableData);
    },
    // 页码变化时触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.updateCurrentTableData();
    },
    // 每页条数变化时触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.updateCurrentTableData();
    },
    async coferencebyfocus()
    {
      const {data:data} = await axios.get("/api/conference/conferenceRankedByFocus");

      // this.conferences_focus=data.data;
      this.conferences=data.data;
      this.total = this.conferences.length;
      this.updateCurrentTableData();
      // this.loading=false;
      console.log(data.data);

    },
    // async coferencebyattend()
    // {
    //   const {data:data} = await axios.get("/api/conference/conferenceRankedByAttend");
    //   this. conferences_attend=data.data;
    //   this.loading=false;
    //   console.log(data.data);
    //
    // },
    // async coferencebyview()
    // {
    //   const {data:data} = await axios.get("/api/conference/conferenceRankedByViewCount");
    //   this. conferences_view=data.data;
    //   this.loading=false;
    //   console.log(data.data);
    //
    // },






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