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
<!--      <el-table-->
<!--          :data="tableData"-->
<!--          height="520"-->
<!--          border-->
<!--          style="width: 100%; font-size: 14px"-->
<!--          v-loading="loading"-->
<!--          element-loading-text="拼命加载中"-->
<!--          element-loading-spinner="el-icon-loading"-->
<!--          element-loading-background="rgba(0, 0, 0, 0.8)"-->
<!--          id="pdfDom"-->
<!--          :default-sort="{ prop: 'message_date', order: 'ascending' }"-->
<!--          stripe-->
<!--      >-->
<!--        <el-table-column-->
<!--            prop="message_number"-->
<!--            label="#"-->
<!--            sortable-->
<!--        ></el-table-column>-->
<!--        <el-table-column prop="ccf" label="CCF"></el-table-column>-->
<!--        <el-table-column prop="CORE" label="CORE"></el-table-column>-->
<!--        <el-table-column prop="QUALIS" label="QUALIS"></el-table-column>-->
<!--        <el-table-column prop="Abbreviation" label="简称"></el-table-column>-->
<!--        <el-table-column prop="name" label="全称"></el-table-column>-->
<!--        <el-table-column prop="postpone" label="延期"></el-table-column>-->
<!--        <el-table-column prop="deadline_date" label="截稿日期"></el-table-column>-->
<!--        <el-table-column prop="notification_date" label="通知日期"></el-table-column>-->
<!--        <el-table-column prop="conference_date" label="会议日期"></el-table-column>-->
<!--        <el-table-column prop="conference_location" label="会议地点"></el-table-column>-->
<!--        <el-table-column prop="sessions" label="届数"></el-table-column>-->
<!--        <el-table-column prop="Browse" label="浏览"></el-table-column>-->
<!--        &lt;!&ndash;        <el-table-column prop="bookLibrary" label="分类"></el-table-column>&ndash;&gt;-->

<!--        &lt;!&ndash; 添加自定义列 &ndash;&gt;-->
<!--&lt;!&ndash;        <el-table-column label="详细信息">&ndash;&gt;-->
<!--&lt;!&ndash;          <template #default="scope">&ndash;&gt;-->
<!--&lt;!&ndash;            <a href="javascript:;" @click="viewDetails(scope.row)">详情</a>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-table-column>&ndash;&gt;-->
<!--      </el-table>-->
<!--      &lt;!&ndash; 分页查询区域 &ndash;&gt;-->
<!--      <el-pagination-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="this.queryInfo.pageNum"-->
<!--          :page-sizes="[1, 2, 3, 4, 5]"-->
<!--          :page-size="this.queryInfo.pageSize"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="this.total"-->
<!--      >-->
<!--      </el-pagination>-->
      <el-col :span="30"
      >CCF: Journal Rank (A, B, C) from China Computer Federation (2022)
      </el-col>

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
      tableData: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        condition: "",
        query: "",
      },
      total: 0,

      title: "消息查询表格",
      loading: true,
    };
  },
  created() {
    this.searchjournaling();

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

      this.tableData = [];
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
      this.tableData = res.data;
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

<style lang="css"></style>