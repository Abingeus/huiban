<template>
  <div>
    <p>这里是 会议名字 为 {{ this.keyword }} 的项目的详细信息。</p>
    <p>提示：{{this.$route.query.keyword}}</p>
    <el-table
        :data="tableData1"
        height="520"
        border
        style="width: 100%; font-size: 14px"
        :default-sort="{ prop: 'message_date', order: 'ascending' }"
        stripe
    >

      <el-table-column
          prop="id"
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
      <el-table-column prop="core" label="CORE"></el-table-column>
      <el-table-column prop="qualis" label="QULIS"></el-table-column>

      <el-table-column prop="deadline" label="截稿日期"></el-table-column>
      <el-table-column prop="notifation" label="通知日期"></el-table-column>
      <el-table-column prop="meeting" label="会议日期"></el-table-column>
      <el-table-column prop="address" label="会议地址"></el-table-column>
      <el-table-column prop="session" label="届"></el-table-column>
      <el-table-column prop="viewCount" label="浏览量"></el-table-column>




      <!--        <el-table-column prop="Browse" label="浏览"></el-table-column>-->
      <!--        <el-table-column prop="bookLibrary" label="分类"></el-table-column>-->
      <!-- 添加自定义列 -->
      <!--        <el-table-column label="详细信息">-->
      <!--          <template #default="scope">-->
      <!--            <a href="javascript:;" @click="viewDetails(scope.row)">详情</a>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
    </el-table>




    <p>这里是 期刊名字 为 {{ this.keyword }} 的项目的详细信息。</p>
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
    }


  },
  created() {
    this.keyword=this.$route.query.keyword;
    this.SearchconferenceByKeyword();
    this.SearchcjournalByKeyword();

  },
  methods:{
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
    },
  }

}

</script>

<style lang="css"></style>