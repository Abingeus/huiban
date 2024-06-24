<template>
  <div class="search_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>榜单信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <!-- 搜索内容和导出区域 -->
      <el-row>


            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchBookBorrowByPage"
            ></el-button>
        <el-col :span="2" style="float: right">
          <download-excel
            class="export-excel-wrapper"
            :data="tableData"
            :fields="json_fields"
            :header="title"
            name="图书借阅表格.xls"
          >
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary" class="el-icon-printer" size="mini"
              >导出Excel</el-button
            >
          </download-excel>
        </el-col>
        <el-col :span="2" style="float: right">
          <el-button
            type="primary"
            class="el-icon-printer"
            size="mini"
            @click="downLoad"
            >导出PDF</el-button
          >
        </el-col>
        <el-col :span="2" style="float: right">
         
         <el-button type="success" class="el-icon-full-screen" size="mini" @click="fullScreen"
           >全屏</el-button
         >
       </el-col>
      </el-row>
      <!-- 表格区域 -->

        <div>
          <el-row :gutter="20" style="margin-top: 20px;"> <!-- 创建一个带有20像素间距的行容器 -->
            <!-- 第一个表格 -->
            <el-col :span="8"> <!-- 每列占据24栅格中的8个栅格 -->
              <el-card class="fixed-height-card">
                <h3>最多浏览</h3>
                <el-table :data="conferences_view" style="flex-grow: 1;"v-loading="loading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          element-loading-background="rgba(0, 0, 0, 0.8)">
                  <el-table-column prop="id" label="#" width="50"></el-table-column>
                  <el-table-column prop="name" label="会议"></el-table-column>
                  <el-table-column prop="viewCount" label="浏览"></el-table-column>
                </el-table>
                <el-col :span="24"> <!-- 每列占据24栅格中的12个栅格 -->
                  <h3 class="card-title">
                    <router-link to="/top_menu/conference/viewed" class="card-link">
                      更多97
                    </router-link>
                  </h3>
                </el-col>
              </el-card>
            </el-col>

            <!-- 第二个表格 -->
            <el-col :span="8"> <!-- 每列占据24栅格中的8个栅格 -->
              <el-card class="fixed-height-card">
                <h3>最多关注</h3>
                <el-table :data="conferences_focus" style="flex-grow: 1;"v-loading="loading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          element-loading-background="rgba(0, 0, 0, 0.8)">
                  <el-table-column prop="id" label="#" width="50"></el-table-column>
                  <el-table-column prop="name" label="会议"></el-table-column>
                  <el-table-column prop="focusCount" label="关注"></el-table-column>
                </el-table>
                <el-col :span="24"> <!-- 每列占据24栅格中的12个栅格 -->
                  <h3 class="card-title">

                    <router-link to="/top_menu/conference/tracked" class="card-link">
                      更多1
                    </router-link>
                  </h3>
                </el-col>
              </el-card>
            </el-col>

            <!-- 第三个表格 -->
            <el-col :span="8"> <!-- 每列占据24栅格中的8个栅格 -->
              <el-card class="fixed-height-card">
                <h3>最多参加</h3>
                <el-table :data="conferences_attend" style="flex-grow: 1;"v-loading="loading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          element-loading-background="rgba(0, 0, 0, 0.8)">
                  <el-table-column prop="id" label="#" width="50"></el-table-column>
                  <el-table-column prop="name" label="会议"></el-table-column>
                  <el-table-column prop="attendCount" label="参加"></el-table-column>
                </el-table>
                <el-col :span="24"> <!-- 每列占据24栅格中的12个栅格 -->
                  <h3 class="card-title">
                    <router-link to="/top_menu/conference/attend" class="card-link">
                      更多1
                    </router-link>
                  </h3>
                </el-col>
              </el-card>
            </el-col>
          </el-row>
        </div>


      <div>
        <el-row :gutter="100" style="margin-top: 20px;"> <!-- 创建一个带有20像素间距的行容器 -->
          <!-- 第一个表格 -->
          <el-col :span="12"> <!-- 每列占据24栅格中的8个栅格 -->
            <el-card class="fixed-height-card">
              <h3>最多浏览</h3>
              <el-table :data="journals_view" style="flex-grow: 1;"v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column prop="id" label="#" width="50"></el-table-column>
                <el-table-column prop="name" label="期刊"></el-table-column>
                <el-table-column prop="viewCount" label="浏览"></el-table-column>

              </el-table>
              <el-col :span="24"> <!-- 每列占据24栅格中的12个栅格 -->
                <h3 class="card-title">
                  <router-link to="/top_menu/journals/viewed" class="card-link">
                    更多1
                  </router-link>
                </h3>
              </el-col>
            </el-card>
          </el-col>

          <!-- 第二个表格 -->
          <el-col :span="12"> <!-- 每列占据24栅格中的8个栅格 -->
            <el-card class="fixed-height-card" style="flex-grow: 1;"v-loading="loading"
                     element-loading-text="拼命加载中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)">
              <h3>最多关注</h3>
              <el-table :data="journals_focus">
                <el-table-column prop="id" label="#" width="50"></el-table-column>
                <el-table-column prop="name" label="期刊"></el-table-column>
                <el-table-column prop="focusCount" label="关注"></el-table-column>

              </el-table>
              <el-col :span="24"> <!-- 每列占据24栅格中的12个栅格 -->
                <h3 class="card-title">
                  <router-link to="/top_menu/journals/tracked" class="card-link">
                    更多13
                  </router-link>
                </h3>
              </el-col>
            </el-card>


          </el-col>
        </el-row>
      </div>
      <!-- 分页查询区域 -->
<!--      <el-pagination-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page="this.queryInfo.pageNum"-->
<!--        :page-sizes="[1, 2, 3, 4, 5]"-->
<!--        :page-size="this.queryInfo.pageSize"-->
<!--        layout="total, sizes, prev, pager, next, jumper"-->
<!--        :total="this.total"-->
<!--      >-->
<!--      </el-pagination>-->
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {

      conferences_view: [],
      conferences_focus: [],
      conferences_attend: [],
      journals_view: [],
      journals_focus: [],


      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        condition: "",
        query: "",
        cardNumber: window.sessionStorage.getItem("cardNumber"),
      },
      total: 0,
      title: "图书借阅表格",
      json_fields: {
        借阅编号: "cardNumber",
        图书编号: "bookNumber",
        借阅日期: "borrowDate",
        截止日期: "closeDate",
        归还日期: "returnDate",
      },
      loading: true,
    };
  },
  created() {
    this.coferencebyfocus();
    this.coferencebyview();
    this.coferencebyattend();
    this.journalbyview();
    this.journalbyfocus();
  },
  downLoad() {
    this.getPdf(this.title); //参数是下载的pdf文件名
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
      async journalbyview()
      {
        const {data:data} = await axios.get("/api/journal/journalRankedByViewCount");
        this.journals_view=data.data;
        this.loading=false;
        console.log(data.data);

      },
      async journalbyfocus()
      {
        const {data:data} = await axios.get("/api/journal/journalRankedByFocus");
        this.journals_focus=data.data;
        this.loading=false;
        console.log(data.data);

      },

    handleSizeChange(val) {
      this.queryInfo.pageSize = val;

      this.searchBookBorrowByPage();
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;

      this.searchBookBorrowByPage();
    },
    async searchBookBorrowByPage() {
      this.loading = true;
      const { data: res } = await this.$http.post(
        "user/get_bookborrow",
        this.queryInfo
      );

      this.tableData = [];
      // console.log(res);
      if (res.status !== 200) {
        this.total = 0;
        this.loading = false;
        return this.$message.error(res.msg);
      }
      this.$message.success({
        message: res.msg,
        duration: 1000,
      });
      this.tableData = res.data.records;
       this.total = parseInt(res.data.total);
      this.loading = false;
    },
    downLoad() {
      this.getPdf(this.title); //参数是下载的pdf文件名
    },
    fullScreen(){
          // Dom对象的一个属性: 可以用来判断当前是否为全屏模式(trueORfalse)
    let full = document.fullscreenElement;
    // 切换为全屏模式
    if(!full){
        // 文档根节点的方法requestFullscreen实现全屏模式
        document.documentElement.requestFullscreen();
    }else{
        // 退出全屏模式
        document.exitFullscreen();
    }
    }
  }
  }


</script>

<style>
.fixed-height-card {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-title {
  text-align: center;
  font-size: 15px;
  font-weight: bold;

}
.card-link {
  color: lightblue;
  text-decoration: none;
}

</style>