<template>
  <div>
    <p>这里是 会议名字 为 {{ this.keyword }} 的项目的详细信息。</p>
    <p>提示：{{this.$route.query.keyword}}</p>
    <el-table
        :data="currentTableData1"
        height="520"
        border
        style="width: 100%; font-size: 14px"
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




    <p>这里是 期刊名字 为 {{ this.keyword }} 的项目的详细信息。</p>
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
    }


  },
  created() {
    this.keyword=this.$route.query.keyword;
    this.SearchconferenceByKeyword();
    this.SearchcjournalByKeyword();

  },
  methods:{
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
      const end = Math.min(start + this.queryInfo2.pageNum, this.tableData1.length);
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
      // this.loading = true;
      const params = {
        keyword: this.keyword
      };
      // params.append("keyword",this.keyword);
      // const paramsString = params.toString();
      // console.log(paramsString);
      // const  params= {keyword:this.keyword};
      console.log(params);
      const {data:res } = await axios.get('/api/conference/conferenceSearchByKeyword',{params},
        // {
        //   // headers: {
        //   //   'Content-Type': 'application/json',
        //   // },
        //
        // }
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
      // params.append("keyword",this.keyword);
      // const paramsString = params.toString();
      // console.log(paramsString);
      // const  params= {keyword:this.keyword};
      console.log(params);
      const {data:res } = await axios.get('/api/journal/journalSearchByKeyword',{params},
          // {
          //   // headers: {
          //   //   'Content-Type': 'application/json',
          //   // },
          //
          // }
      );
      console.log(res);

      this.loading = false;
      this.tableData2 = res.data;
      this.queryInfo2.total=this.tableData2.length;
      this.updateCurrentTableData2();
    },
  }

}

</script>

<style lang="css"></style>