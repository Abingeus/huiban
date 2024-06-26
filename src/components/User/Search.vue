<template>
  <div>
    <div class="search-box">
      <el-input
          v-model="searchQuery"
          placeholder="搜索..."
          prefix-icon="el-icon-search"
          clearable
          @keyup.enter.native="handleSearch"
      >
        <el-button slot="append" icon="el-icon-search" class="round-button" @click="handleSearch">搜索</el-button>
      </el-input>
    </div>

    <div class="outer-container">
    <div class="inner-container">
      会议名字含有 <span class="highlight">{{ this.keyword }}</span> 的会议列表
    </div>
    </div>
    <div class="table-hand">




    <el-table
        :data="currentTableData1"
        height="520"
        border
        style="width: 100%; font-size: 14px"
        :header-cell-style="{background:'#DEE1E7','font-size':'15px','font-weight':'400',color:'#252525',height:'60px'}"
        :default-sort="{ prop: 'message_date', order: 'ascending' }"
        stripe
    >

<!--      <el-table-column-->
<!--          prop="id"-->
<!--          label="#"-->
<!--          sortable-->
<!--      ></el-table-column>-->
      <el-table-column prop="ccf" label="CCF" min-width="25"></el-table-column>
      <el-table-column label="全称" min-width="200">
        <template v-slot="{ row }">
          <router-link :to="{ name: 'conference_information', query: { name: row.name } }">
            {{ row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="core" label="CORE" min-width="50"></el-table-column>
      <el-table-column prop="qualis" label="QULIS" min-width="50"></el-table-column>

      <el-table-column prop="deadline" label="截稿日期" min-width="50"></el-table-column>
      <el-table-column prop="notifation" label="通知日期" min-width="50"></el-table-column>
      <el-table-column prop="meeting" label="会议日期" min-width="50"></el-table-column>
      <el-table-column prop="address" label="会议地址" min-width="150"></el-table-column>
      <el-table-column prop="session" label="届" min-width="30"></el-table-column>
      <el-table-column prop="viewCount" label="浏览量" min-width="30"></el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange_TableData1"
        @current-change="handleCurrentTableData1"
        :current-page="queryInfo1.currentpage"
        :page-sizes="[3, 5, 7, 10]"
        :page-size="queryInfo1.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryInfo1.total"
    >
    </el-pagination>
    </div>


    <div class="outer-container">
      <div class="inner-container">
        期刊名字含有 <span class="highlight">{{ this.keyword }}</span> 的期刊列表
      </div>
    </div>
    <el-table
        :data="currentTableData2"
        height="520"
        border
        style="width: 100%; font-size: 14px"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :header-cell-style="{background:'#DEE1E7','font-size':'15px','font-weight':'400',color:'#252525',height:'60px'}"
        id="pdfDom"
        :default-sort="{ prop: 'message_date', order: 'ascending' }"
        stripe
    >
<!--      <el-table-column-->
<!--          prop="id"-->
<!--          label="#"-->
<!--          sortable-->
<!--      ></el-table-column>-->
      <el-table-column prop="ccf" label="CCF" min-width="20"></el-table-column>
      <el-table-column prop="abbreviation" label="简称" min-width="50"></el-table-column>
      <el-table-column prop="name" label="全称" min-width="250"></el-table-column>
      <el-table-column prop="ifactor" label="影响因子" min-width="50"></el-table-column>
      <el-table-column prop="publisher" label="出版商" min-width="80"></el-table-column>
      <el-table-column prop="issn" label="ISSN" min-width="50"></el-table-column>
      <el-table-column prop="viewCount" label="浏览" min-width="20"></el-table-column>
      <!--        <el-table-column prop="bookLibrary" label="分类"></el-table-column>-->

      <!-- 添加自定义列 -->
      <!--        <el-table-column label="详细信息">-->
      <!--          <template #default="scope">-->
      <!--            <a href="javascript:;" @click="viewDetails(scope.row)">详情</a>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
    </el-table>
    <el-pagination
        @size-change="handleSizeChange_TableData2"
        @current-change="handleCurrentTableData2"
        :current-page="queryInfo2.currentpage"
        :page-sizes="[3, 5, 7, 10]"
        :page-size="queryInfo2.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryInfo2.total"
    >
    </el-pagination>

  </div>


</template>

<script>
import axios from "axios";

export default{
  data(){
    return{
      keyword:"",
      tableData1:[],
      tableData2:[],
      currentTableData1:[],
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
      searchQuery:"",
    }


  },
  created() {
    this.keyword=this.$route.query.keyword;
    this.SearchconferenceByKeyword();
    this.SearchcjournalByKeyword();

  },
  methods:{
    handleSearch(){
      this.keyword=this.searchQuery;
      this.SearchconferenceByKeyword();
      this.SearchcjournalByKeyword();
      // this.$router.push({path:'/top_menu/search',query:{keyword:this.searchQuery}});
    },
    updateCurrentTableData1() {
      const start = (this.queryInfo1.currentpage - 1) * this.queryInfo1.pageNum;
      const end = Math.min(start + this.queryInfo1.pageNum, this.tableData1.length);
      this.currentTableData1 = this.tableData1.slice(start, end);
      this.loading1 = false;
      console.log("currentTableData1");
      console.log(this.currentTableData1);
      console.log(this.tableData1);
    },
    handleCurrentTableData1(val) {
      this.queryInfo1.currentpage = val;
      this.updateCurrentTableData1();
    },
    handleSizeChange_TableData1(val) {
      this.queryInfo1.pageNum = val;
      this.updateCurrentTableData1();
    },
    updateCurrentTableData2() {
      const start = (this.queryInfo2.currentpage - 1) * this.queryInfo2.pageNum;
      const end = Math.min(start + this.queryInfo2.pageNum, this.tableData2.length);
      this.currentTableData2 = this.tableData2.slice(start, end);
      this.loading1 = false;
      console.log("currentTableData1");
      console.log(this.currentTableData1);
      console.log(this.tableData1);
    },
    handleCurrentTableData2(val) {
      this.queryInfo2.currentpage = val;
      this.updateCurrentTableData2();
    },
    handleSizeChange_TableData2(val) {
      this.queryInfo2.pageNum = val;
      this.updateCurrentTableData2();
    },
    async SearchconferenceByKeyword() {
      const params = {
        keyword: this.keyword
      };
      console.log(params);
      const {data:res } = await axios.get('/api/conference/conferenceSearchByKeyword',{params},
      );
      console.log(res);
      this.tableData1 = [];

      this.loading = false;
      this.tableData1 = res.data;
      this.queryInfo1.total=this.tableData1.length;
      this.updateCurrentTableData1();
    },
    async SearchcjournalByKeyword(){
      const params = {
        keyword: this.keyword
      };
      console.log(params);
      const {data:res } = await axios.get('/api/journal/journalSearchByKeyword',{params},
      );
      console.log("期刊返回数据");
      console.log(res);
      console.log(this.tableData2);

      this.loading = false;
      this.tableData2 = res.data;
      this.queryInfo2.total=this.tableData2.length;
      this.updateCurrentTableData2();
    },
  }

}

</script>

<style lang="css">
.table-hand{



}
.outer-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 15vh;
  background-color: #f0f2f5; /* 背景颜色，可以根据需要调整 */
}

.inner-container {
  display: flex;
  justify-content: flex-start;
  align-items:flex-start;
  background-color: #fff; /* 内部容器背景颜色 */
  padding: 10px; /* 内部容器内边距 */
  border-radius: 8px; /* 内部容器圆角 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
.search-box {
  flex: 0 0 25%;
  position: relative;
}
.tishi {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: lightblue;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s; /* 添加过渡效果 */
  text-align: center; /* 水平居中 */

}

.tishi:hover {
  transform: translateY(-10px); /* 悬停时上移 */
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2); /* 悬停时阴影效果 */
}

.highlight {
  color: lightcoral; /* 关键词颜色设置为白色 */
  //background-color: #000; /* 添加背景色以确保白色文字可见，可以根据需要调整 */
  //padding: 2px 4px; /* 可选：添加一些内边距使关键词更加明显 */
}
</style>