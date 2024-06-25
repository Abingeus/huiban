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
      <el-col :span="30"
      >CCF: Journal Rank (A, B, C) from China Computer Federation (2022)
      </el-col>

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
        <el-table-column prop="ccf" label="CCF"  min-width="30"></el-table-column>
        <el-table-column label="全称"  min-width="200">
          <template v-slot="{ row }">
            <router-link :to="{ name: 'journal_information', query: { name: row.name } }">
              {{ row.name }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="issue" label="Special Issue"  min-width="300"></el-table-column>
        <el-table-column prop="deadline" label="截稿日期"  min-width="100"></el-table-column>
        <el-table-column prop="ifactor" label="影响因子"  min-width="100"></el-table-column>
        <el-table-column prop="publisher" label="出版商"  min-width="100"></el-table-column>

      </el-table>
      <el-pagination
          background
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          :page-sizes="[1 ,5, 10, 15, 20]"
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
      tableData: [],
      currentTableData: [], // 当前页数据
      total: 0, // 总条目数
      pageSize: 5, // 每页显示条目数
      currentPage: 1, // 当前页码
      loading: false,


    };
  },
  created() {
    this.searchjournaling();

  },
  methods: {
    updateCurrentTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      console.log(this.tableData);
      console.log(start);
      console.log(end);
      this.currentTableData = this.tableData.slice(start, end);
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
    async searchjournaling() {
      this.loading = true;
      const {data:res } = await axios.get("/api/journal/solicit");
      this.tableData = [];
      this.tableData = res.data;
      this.total = this.tableData.length;
      this.updateCurrentTableData();
      this.loading = false;

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

<style lang="css"></style>