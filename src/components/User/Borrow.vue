<!--<template>-->
<!--  <div class="search_container">-->
<!--    &lt;!&ndash; 面包屑导航区域 &ndash;&gt;-->
<!--    <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--      <el-breadcrumb-item>首页</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>榜单信息</el-breadcrumb-item>-->
<!--    </el-breadcrumb>-->
<!--    <el-card shadow="always">-->
<!--      &lt;!&ndash; 搜索内容和导出区域 &ndash;&gt;-->
<!--      <el-row>-->


<!--            <el-button-->
<!--              slot="append"-->
<!--              icon="el-icon-search"-->
<!--              @click="searchBookBorrowByPage"-->
<!--            ></el-button>-->
<!--        <el-col :span="2" style="float: right">-->
<!--          <download-excel-->
<!--            class="export-excel-wrapper"-->
<!--            :data="tableData"-->
<!--            :fields="json_fields"-->
<!--            :header="title"-->
<!--            name="图书借阅表格.xls"-->
<!--          >-->
<!--            &lt;!&ndash; 上面可以自定义自己的样式，还可以引用其他组件button &ndash;&gt;-->
<!--            <el-button type="primary" class="el-icon-printer" size="mini"-->
<!--              >导出Excel</el-button-->
<!--            >-->
<!--          </download-excel>-->
<!--        </el-col>-->
<!--&lt;!&ndash;        <el-col :span="2" style="float: right">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button&ndash;&gt;-->
<!--&lt;!&ndash;            type="primary"&ndash;&gt;-->
<!--&lt;!&ndash;            class="el-icon-printer"&ndash;&gt;-->
<!--&lt;!&ndash;            size="mini"&ndash;&gt;-->
<!--&lt;!&ndash;            @click="downLoad"&ndash;&gt;-->
<!--&lt;!&ndash;            >导出PDF</el-button&ndash;&gt;-->
<!--&lt;!&ndash;          >&ndash;&gt;-->
<!--&lt;!&ndash;        </el-col>&ndash;&gt;-->
<!--        <el-col :span="2" style="float: right">-->
<!--         -->
<!--         <el-button type="success" class="el-icon-full-screen" size="mini" @click="fullScreen"-->
<!--           >全屏</el-button-->
<!--         >-->
<!--       </el-col>-->
<!--      </el-row>-->
<!--      &lt;!&ndash; 表格区域 &ndash;&gt;-->

<!--        <div>-->
<!--          <el-row :gutter="20" style="margin-top: 20px;"> &lt;!&ndash; 创建一个带有20像素间距的行容器 &ndash;&gt;-->
<!--            &lt;!&ndash; 第一个表格 &ndash;&gt;-->
<!--            <el-col :span="8"> &lt;!&ndash; 每列占据24栅格中的8个栅格 &ndash;&gt;-->
<!--              <el-card class="fixed-height-card">-->
<!--                <h3>最多浏览</h3>-->
<!--                <el-table :data="conferences_view"-->

<!--                          style="flex-grow: 1;"v-loading="loading"-->
<!--                          element-loading-text="拼命加载中"-->
<!--                          element-loading-spinner="el-icon-loading"-->
<!--                          element-loading-background="rgba(0, 0, 0, 0.8)">-->
<!--&lt;!&ndash;                  <el-table-column prop="id" label="#" min-width="5"></el-table-column>&ndash;&gt;-->
<!--                  <el-table-column label="全称" min-width="200">-->
<!--                    <template v-slot="{ row }">-->
<!--                      <router-link :to="{ name: 'conference_information', query: {-->
<!--      name: row.name,-->
<!--      ccf: row.ccf,-->
<!--      core: row.core,-->
<!--      qualis: row.qualis,-->
<!--      deadline: row.deadline,-->
<!--      notifacation: row.notifation,-->
<!--      meeting: row.meeting,-->
<!--      address: row.address,-->
<!--      session: row.session,-->
<!--      viewCount: row.viewCount-->
<!--    }}">-->
<!--                        {{ row.name }}-->
<!--                      </router-link>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                  <el-table-column prop="viewCount" label="浏览" min-width="40"></el-table-column>-->
<!--                </el-table>-->
<!--                <el-col :span="24"> &lt;!&ndash; 每列占据24栅格中的12个栅格 &ndash;&gt;-->
<!--                  <h3 class="card-title">-->
<!--                    <router-link to="/top_menu/conference/viewed" class="card-link">-->
<!--                      更多-->
<!--                    </router-link>-->
<!--                  </h3>-->
<!--                </el-col>-->
<!--              </el-card>-->
<!--            </el-col>-->

<!--            &lt;!&ndash; 第二个表格 &ndash;&gt;-->
<!--            <el-col :span="8"> &lt;!&ndash; 每列占据24栅格中的8个栅格 &ndash;&gt;-->
<!--              <el-card class="fixed-height-card">-->
<!--                <h3>最多关注</h3>-->
<!--                <el-table :data="conferences_focus" style="flex-grow: 1;"v-loading="loading"-->
<!--                          element-loading-text="拼命加载中"-->
<!--                          element-loading-spinner="el-icon-loading"-->
<!--                          element-loading-background="rgba(0, 0, 0, 0.8)">-->
<!--&lt;!&ndash;                  <el-table-column prop="id" label="#" min-width="10"></el-table-column>&ndash;&gt;-->
<!--                  <el-table-column label="全称" min-width="200">-->
<!--                    <template v-slot="{ row }">-->
<!--                      <router-link :to="{ name: 'conference_information', query: {-->
<!--      name: row.name,-->
<!--      ccf: row.ccf,-->
<!--      core: row.core,-->
<!--      qualis: row.qualis,-->
<!--      deadline: row.deadline,-->
<!--      notifacation: row.notifation,-->
<!--      meeting: row.meeting,-->
<!--      address: row.address,-->
<!--      session: row.session,-->
<!--      viewCount: row.viewCount-->
<!--    }}">-->
<!--                        {{ row.name }}-->
<!--                      </router-link>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                  <el-table-column prop="focusCount" label="关注" min-width="40"></el-table-column>-->
<!--                </el-table>-->
<!--                <el-col :span="24"> &lt;!&ndash; 每列占据24栅格中的12个栅格 &ndash;&gt;-->
<!--                  <h3 class="card-title">-->

<!--                    <router-link to="/top_menu/conference/tracked" class="card-link">-->
<!--                      更多-->
<!--                    </router-link>-->
<!--                  </h3>-->
<!--                </el-col>-->
<!--              </el-card>-->
<!--            </el-col>-->

<!--            &lt;!&ndash; 第三个表格 &ndash;&gt;-->
<!--            <el-col :span="8"> &lt;!&ndash; 每列占据24栅格中的8个栅格 &ndash;&gt;-->
<!--              <el-card class="fixed-height-card">-->
<!--                <h3>最多参加</h3>-->
<!--                <el-table :data="conferences_attend" style="flex-grow: 1;"v-loading="loading"-->
<!--                          element-loading-text="拼命加载中"-->
<!--                          element-loading-spinner="el-icon-loading"-->
<!--                          element-loading-background="rgba(0, 0, 0, 0.8)">-->
<!--                  <el-table-column prop="id" label="#" min-width="10"></el-table-column>-->
<!--                  <el-table-column label="全称" min-width="200">-->
<!--                    <template v-slot="{ row }">-->
<!--                      <router-link :to="{ name: 'conference_information', query: {-->
<!--      name: row.name,-->
<!--      ccf: row.ccf,-->
<!--      core: row.core,-->
<!--      qualis: row.qualis,-->
<!--      deadline: row.deadline,-->
<!--      notifacation: row.notifation,-->
<!--      meeting: row.meeting,-->
<!--      address: row.address,-->
<!--      session: row.session,-->
<!--      viewCount: row.viewCount-->
<!--    }}">-->
<!--                        {{ row.name }}-->
<!--                      </router-link>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                  <el-table-column prop="attendCount" label="参加" min-width="40"></el-table-column>-->
<!--                </el-table>-->
<!--                <el-col :span="24"> &lt;!&ndash; 每列占据24栅格中的12个栅格 &ndash;&gt;-->
<!--                  <h3 class="card-title">-->
<!--                    <router-link to="/top_menu/conference/attend" class="card-link">-->
<!--                      更多-->
<!--                    </router-link>-->
<!--                  </h3>-->
<!--                </el-col>-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->


<!--      <div>-->
<!--        <el-row :gutter="100" style="margin-top: 20px;"> &lt;!&ndash; 创建一个带有20像素间距的行容器 &ndash;&gt;-->
<!--          &lt;!&ndash; 第一个表格 &ndash;&gt;-->
<!--          <el-col :span="12"> &lt;!&ndash; 每列占据24栅格中的8个栅格 &ndash;&gt;-->
<!--            <el-card class="fixed-height-card">-->
<!--              <h3>最多浏览</h3>-->
<!--              <el-table :data="journals_view" style="flex-grow: 1;"v-loading="loading"-->
<!--                        element-loading-text="拼命加载中"-->
<!--                        element-loading-spinner="el-icon-loading"-->
<!--                        element-loading-background="rgba(0, 0, 0, 0.8)">-->
<!--&lt;!&ndash;                <el-table-column prop="id" label="#" min-width="10"></el-table-column>&ndash;&gt;-->
<!--                <el-table-column label="全称" min-width="250">-->
<!--                  <template v-slot="{ row }">-->
<!--                    <router-link :to="{-->
<!--        name: 'journal_information',-->
<!--        query: {-->
<!--          name: row.name,-->
<!--          ccf: row.ccf,-->
<!--          issue: row.issue,-->
<!--          deadline: row.deadline,-->
<!--          ifactor: row.ifactor,-->
<!--          publisher: row.publisher,-->
<!--          viewCount: row.viewCount,-->
<!--        }-->
<!--      }">-->
<!--                      {{ row.name }}-->
<!--                    </router-link>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="viewCount" label="浏览" min-width="40"></el-table-column>-->

<!--              </el-table>-->
<!--              <el-col :span="24"> &lt;!&ndash; 每列占据24栅格中的12个栅格 &ndash;&gt;-->
<!--                <h3 class="card-title">-->
<!--                  <router-link to="/top_menu/journals/viewed" class="card-link">-->
<!--                    更多-->
<!--                  </router-link>-->
<!--                </h3>-->
<!--              </el-col>-->
<!--            </el-card>-->
<!--          </el-col>-->

<!--          &lt;!&ndash; 第二个表格 &ndash;&gt;-->
<!--          <el-col :span="12"> &lt;!&ndash; 每列占据24栅格中的8个栅格 &ndash;&gt;-->
<!--            <el-card class="fixed-height-card" style="flex-grow: 1;"v-loading="loading"-->
<!--                     element-loading-text="拼命加载中"-->
<!--                     element-loading-spinner="el-icon-loading"-->
<!--                     element-loading-background="rgba(0, 0, 0, 0.8)">-->
<!--              <h3>最多关注</h3>-->
<!--              <el-table :data="journals_focus">-->
<!--&lt;!&ndash;                <el-table-column prop="id" label="#" min-width="10"></el-table-column>&ndash;&gt;-->
<!--                <el-table-column label="全称" min-width="250">-->
<!--                  <template v-slot="{ row }">-->
<!--                    <router-link :to="{-->
<!--        name: 'journal_information',-->
<!--        query: {-->
<!--          name: row.name,-->
<!--          ccf: row.ccf,-->
<!--          issue: row.issue,-->
<!--          deadline: row.deadline,-->
<!--          ifactor: row.ifactor,-->
<!--          publisher: row.publisher,-->
<!--          viewCount: row.viewCount,-->
<!--        }-->
<!--      }">-->
<!--                      {{ row.name }}-->
<!--                    </router-link>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="focusCount" label="关注" min-width="40"></el-table-column>-->

<!--              </el-table>-->
<!--              <el-col :span="24"> &lt;!&ndash; 每列占据24栅格中的12个栅格 &ndash;&gt;-->
<!--                <h3 class="card-title">-->
<!--                  <router-link to="/top_menu/journals/tracked" class="card-link">-->
<!--                    更多-->
<!--                  </router-link>-->
<!--                </h3>-->
<!--              </el-col>-->
<!--            </el-card>-->


<!--          </el-col>-->
<!--        </el-row>-->
<!--      </div>-->
<!--      &lt;!&ndash; 分页查询区域 &ndash;&gt;-->
<!--&lt;!&ndash;      <el-pagination&ndash;&gt;-->
<!--&lt;!&ndash;        @size-change="handleSizeChange"&ndash;&gt;-->
<!--&lt;!&ndash;        @current-change="handleCurrentChange"&ndash;&gt;-->
<!--&lt;!&ndash;        :current-page="this.queryInfo.pageNum"&ndash;&gt;-->
<!--&lt;!&ndash;        :page-sizes="[1, 2, 3, 4, 5]"&ndash;&gt;-->
<!--&lt;!&ndash;        :page-size="this.queryInfo.pageSize"&ndash;&gt;-->
<!--&lt;!&ndash;        layout="total, sizes, prev, pager, next, jumper"&ndash;&gt;-->
<!--&lt;!&ndash;        :total="this.total"&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;      </el-pagination>&ndash;&gt;-->
<!--    </el-card>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->

<!--      conferences_view: [],-->
<!--      conferences_focus: [],-->
<!--      conferences_attend: [],-->
<!--      journals_view: [],-->
<!--      journals_focus: [],-->


<!--      queryInfo: {-->
<!--        pageNum: 1,-->
<!--        pageSize: 5,-->
<!--        condition: "",-->
<!--        query: "",-->
<!--        cardNumber: window.sessionStorage.getItem("cardNumber"),-->
<!--      },-->
<!--      total: 0,-->
<!--      title: "图书借阅表格",-->
<!--      json_fields: {-->
<!--        借阅编号: "cardNumber",-->
<!--        图书编号: "bookNumber",-->
<!--        借阅日期: "borrowDate",-->
<!--        截止日期: "closeDate",-->
<!--        归还日期: "returnDate",-->
<!--      },-->
<!--      loading: true,-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.coferencebyfocus();-->
<!--    this.coferencebyview();-->
<!--    this.coferencebyattend();-->
<!--    this.journalbyview();-->
<!--    this.journalbyfocus();-->
<!--  },-->
<!--  downLoad() {-->
<!--    this.getPdf(this.title); //参数是下载的pdf文件名-->
<!--  },-->



<!--    methods: {-->


<!--      async coferencebyfocus()-->
<!--      {-->
<!--        const {data:data} = await axios.get("/api/conference/conferenceRankedByFocus");-->
<!--        this.conferences_focus=data.data.slice(0, 4);-->
<!--        this.conferences=data.data.slice(0, 4);-->
<!--        this.loading=false;-->
<!--        console.log(data.data);-->

<!--      },-->
<!--      async coferencebyattend()-->
<!--      {-->
<!--        const {data:data} = await axios.get("/api/conference/conferenceRankedByAttend");-->
<!--        this.conferences_attend=data.data.slice(0, 4);-->
<!--        this.loading=false;-->
<!--        console.log(data.data);-->

<!--      },-->
<!--      async coferencebyview()-->
<!--      {-->
<!--        const {data:data} = await axios.get("/api/conference/conferenceRankedByViewCount");-->
<!--        this. conferences_view=data.data.slice(0, 4);-->
<!--        this.loading=false;-->
<!--        console.log(data.data);-->

<!--      },-->
<!--      async journalbyview()-->
<!--      {-->
<!--        const {data:data} = await axios.get("/api/journal/journalRankedByViewCount");-->
<!--        this.journals_view=data.data.slice(0, 4);-->
<!--        this.loading=false;-->
<!--        console.log(data.data);-->

<!--      },-->
<!--      async journalbyfocus()-->
<!--      {-->
<!--        const {data:data} = await axios.get("/api/journal/journalRankedByFocus");-->
<!--        this.journals_focus=data.data.slice(0, 4);-->
<!--        this.loading=false;-->
<!--        console.log(data.data);-->

<!--      },-->

<!--    handleSizeChange(val) {-->
<!--      this.queryInfo.pageSize = val;-->

<!--      this.searchBookBorrowByPage();-->
<!--    },-->
<!--    handleCurrentChange(val) {-->
<!--      this.queryInfo.pageNum = val;-->

<!--      this.searchBookBorrowByPage();-->
<!--    },-->
<!--    async searchBookBorrowByPage() {-->
<!--      this.loading = true;-->
<!--      const { data: res } = await this.$http.post(-->
<!--        "user/get_bookborrow",-->
<!--        this.queryInfo-->
<!--      );-->

<!--      this.tableData = [];-->
<!--      // console.log(res);-->
<!--      if (res.status !== 200) {-->
<!--        this.total = 0;-->
<!--        this.loading = false;-->
<!--        return this.$message.error(res.msg);-->
<!--      }-->
<!--      this.$message.success({-->
<!--        message: res.msg,-->
<!--        duration: 1000,-->
<!--      });-->
<!--      this.tableData = res.data.records;-->
<!--       this.total = parseInt(res.data.total);-->
<!--      this.loading = false;-->
<!--    },-->
<!--    downLoad() {-->
<!--      this.getPdf(this.title); //参数是下载的pdf文件名-->
<!--    },-->
<!--    fullScreen(){-->
<!--          // Dom对象的一个属性: 可以用来判断当前是否为全屏模式(trueORfalse)-->
<!--    let full = document.fullscreenElement;-->
<!--    // 切换为全屏模式-->
<!--    if(!full){-->
<!--        // 文档根节点的方法requestFullscreen实现全屏模式-->
<!--        document.documentElement.requestFullscreen();-->
<!--    }else{-->
<!--        // 退出全屏模式-->
<!--        document.exitFullscreen();-->
<!--    }-->
<!--    }-->
<!--  }-->
<!--  }-->


<!--</script>-->


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
<!--        <el-col :span="2" style="float: right">-->
<!--          <download-excel-->
<!--              class="export-excel-wrapper"-->
<!--              :data="tableData"-->
<!--              :fields="json_fields"-->
<!--              :header="title"-->
<!--              name="图书借阅表格.xls"-->
<!--          >-->
<!--            <el-button type="primary" class="el-icon-printer" size="mini"-->
<!--            >导出Excel</el-button-->
<!--            >-->
<!--          </download-excel>-->
<!--        </el-col>-->
        <el-col :span="2" style="float: right">
          <el-button
              type="success"
              class="el-icon-full-screen"
              size="mini"
              @click="fullScreen"
          >全屏</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <div>
        <el-row :gutter="20" style="margin-top: 20px;">
          <!-- 第一个表格 -->
          <el-col :span="8">
            <el-card class="fixed-height-card">
              <h3>最多浏览</h3>
              <el-table :data="conferences_view.slice((conferences_viewPage - 1) * conferences_viewPageSize, conferences_viewPage * conferences_viewPageSize)"
                        style="flex-grow: 1;"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column label="全称" min-width="200">
                  <template v-slot="{ row }">
                    <router-link :to="{ name: 'conference_information', query: row }">
                      {{ row.name }}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="viewCount" label="浏览" min-width="40"></el-table-column>
              </el-table>
              <el-pagination
                  background
                  :current-page="conferences_viewPage"
                  :page-size="conferences_viewPageSize"
                  layout="total, prev, pager, next"
                  :total="conferences_view.length"
                  @current-change="conferences_viewPageChange">
              </el-pagination>
<!--              <el-col :span="24">-->
<!--                <h3 class="card-title">-->
<!--                  <router-link to="/top_menu/conference/viewed" class="card-link">-->
<!--                    更多-->
<!--                  </router-link>-->
<!--                </h3>-->
<!--              </el-col>-->
            </el-card>
          </el-col>

          <!-- 第二个表格 -->
          <el-col :span="8">
            <el-card class="fixed-height-card">
              <h3>最多关注</h3>
              <el-table :data="conferences_focus.slice((conferences_focusPage - 1) * conferences_focusPageSize, conferences_focusPage * conferences_focusPageSize)"
                        style="flex-grow: 1;"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column label="全称" min-width="200">
                  <template v-slot="{ row }">
                    <router-link :to="{ name: 'conference_information', query: row }">
                      {{ row.name }}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="focusCount" label="关注" min-width="40"></el-table-column>
              </el-table>
              <el-pagination
                  background
                  :current-page="conferences_focusPage"
                  :page-size="conferences_focusPageSize"
                  layout="total, prev, pager, next"
                  :total="conferences_focus.length"
                  @current-change="conferences_focusPageChange">
              </el-pagination>
<!--              <el-col :span="24">-->
<!--                <h3 class="card-title">-->
<!--                  <router-link to="/top_menu/conference/tracked" class="card-link">-->
<!--                    更多-->
<!--                  </router-link>-->
<!--                </h3>-->
<!--              </el-col>-->
            </el-card>
          </el-col>

          <!-- 第三个表格 -->
          <el-col :span="8">
            <el-card class="fixed-height-card">
              <h3>最多参加</h3>
              <el-table :data="conferences_attend.slice((conferences_attendPage - 1) * conferences_attendPageSize, conferences_attendPage * conferences_attendPageSize)"
                        style="flex-grow: 1;"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column label="全称" min-width="200">
                  <template v-slot="{ row }">
                    <router-link :to="{ name: 'conference_information', query: row }">
                      {{ row.name }}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="attendCount" label="参加" min-width="40"></el-table-column>
              </el-table>
              <el-pagination
                  background
                  :current-page="conferences_attendPage"
                  :page-size="conferences_attendPageSize"
                  layout="total, prev, pager, next"
                  :total="conferences_attend.length"
                  @current-change="conferences_attendPageChange">
              </el-pagination>
<!--              <el-col :span="24">-->
<!--                <h3 class="card-title">-->
<!--                  <router-link to="/top_menu/conference/attend" class="card-link">-->
<!--                    更多-->
<!--                  </router-link>-->
<!--                </h3>-->
<!--              </el-col>-->
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div>
        <el-row :gutter="100" style="margin-top: 20px;">
          <!-- 第一个表格 -->
          <el-col :span="12">
            <el-card class="fixed-height-card">
              <h3>最多浏览</h3>
              <el-table :data="journals_view.slice((journals_viewPage - 1) * journals_viewPageSize, journals_viewPage * journals_viewPageSize)"
                        style="flex-grow: 1;"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column label="全称" min-width="250">
                  <template v-slot="{ row }">
                    <router-link :to="{ name: 'journal_information', query: row }">
                      {{ row.name }}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="viewCount" label="浏览" min-width="40"></el-table-column>
              </el-table>
              <el-pagination
                  background
                  :current-page="journals_viewPage"
                  :page-size="journals_viewPageSize"
                  layout="total, prev, pager, next"
                  :total="journals_view.length"
                  @current-change="journals_viewPageChange">
              </el-pagination>
<!--              <el-col :span="24">-->
<!--                <h3 class="card-title">-->
<!--                  <router-link to="/top_menu/journals/viewed" class="card-link">-->
<!--                    更多-->
<!--                  </router-link>-->
<!--                </h3>-->
<!--              </el-col>-->
            </el-card>
          </el-col>

          <!-- 第二个表格 -->
          <el-col :span="12">
            <el-card class="fixed-height-card">
              <h3>最多关注</h3>
              <el-table :data="journals_focus.slice((journals_focusPage - 1) * journals_focusPageSize, journals_focusPage * journals_focusPageSize)"
                        style="flex-grow: 1;"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column label="全称" min-width="250">
                  <template v-slot="{ row }">
                    <router-link :to="{ name: 'journal_information', query: row }">
                      {{ row.name }}
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="focusCount" label="关注" min-width="40"></el-table-column>
              </el-table>
              <el-pagination
                  background
                  :current-page="journals_focusPage"
                  :page-size="journals_focusPageSize"
                  layout="total, prev, pager, next"
                  :total="journals_focus.length"
                  @current-change="journals_focusPageChange">
              </el-pagination>
<!--              <el-col :span="24">-->
<!--                <h3 class="card-title">-->
<!--                  <router-link to="/top_menu/journals/tracked" class="card-link">-->
<!--                    更多-->
<!--                  </router-link>-->
<!--                </h3>-->
<!--              </el-col>-->
            </el-card>
          </el-col>
        </el-row>
      </div>
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
      // 分页状态
      conferences_viewPage: 1,
      conferences_viewPageSize: 5,
      conferences_focusPage: 1,
      conferences_focusPageSize: 5,
      conferences_attendPage: 1,
      conferences_attendPageSize: 5,
      journals_viewPage: 1,
      journals_viewPageSize: 5,
      journals_focusPage: 1,
      journals_focusPageSize: 5,
    };
  },
  created() {
    this.coferencebyfocus();
    this.coferencebyview();
    this.coferencebyattend();
    this.journalbyview();
    this.journalbyfocus();
  },
  methods: {
    async coferencebyfocus() {
      const { data } = await axios.get("/api/conference/conferenceRankedByFocus");
      this.conferences_focus = data.data;
      this.loading = false;
    },
    async coferencebyattend() {
      const { data } = await axios.get("/api/conference/conferenceRankedByAttend");
      this.conferences_attend = data.data;
      this.loading = false;
    },
    async coferencebyview() {
      const { data } = await axios.get("/api/conference/conferenceRankedByViewCount");
      this.conferences_view = data.data;
      this.loading = false;
    },
    async journalbyview() {
      const { data } = await axios.get("/api/journal/journalRankedByViewCount");
      this.journals_view = data.data;
      this.loading = false;
    },
    async journalbyfocus() {
      const { data } = await axios.get("/api/journal/journalRankedByFocus");
      this.journals_focus = data.data;
      this.loading = false;
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
      this.getPdf(this.title);
    },
    fullScreen() {
      let full = document.fullscreenElement;
      if (!full) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
    conferences_viewPageChange(val) {
      this.conferences_viewPage = val;
    },
    conferences_focusPageChange(val) {
      this.conferences_focusPage = val;
    },
    conferences_attendPageChange(val) {
      this.conferences_attendPage = val;
    },
    journals_viewPageChange(val) {
      this.journals_viewPage = val;
    },
    journals_focusPageChange(val) {
      this.journals_focusPage = val;
    }
  }
}
</script>








<style>
.fixed-height-card {
  height: 500px;
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