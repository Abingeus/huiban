<template>
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