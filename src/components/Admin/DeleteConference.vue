<template>

<!--    <div class="search-box">-->
<!--      <el-input-->
<!--          v-model="searchQuery"-->
<!--          placeholder="搜索..."-->
<!--          prefix-icon="el-icon-search"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleSearch"-->
<!--      >-->
<!--        <el-button slot="append" icon="el-icon-search" class="round-button" @click="handleSearch">搜索</el-button>-->
<!--      </el-input>-->
<!--    </div>-->
    <el-main>
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
    <el-container class="home-container">
      <el-table
          :data="paginatedData"
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
        <el-table-column prop="ccf" label="CCF" min-width="25"></el-table-column>
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
        <el-table-column prop="core" label="CORE" min-width="50"></el-table-column>
        <el-table-column prop="qualis" label="QULIS" min-width="50"></el-table-column>
        <el-table-column prop="deadline" label="截稿日期" min-width="50"></el-table-column>
        <el-table-column prop="notifation" label="通知日期" min-width="50"></el-table-column>
        <el-table-column prop="meeting" label="会议日期" min-width="50"></el-table-column>
        <el-table-column prop="address" label="会议地址" min-width="150"></el-table-column>
        <el-table-column prop="session" label="届" min-width="30"></el-table-column>
        <el-table-column prop="viewCount" label="浏览量" min-width="30"></el-table-column>
        <el-table-column label="删除会议">
          <template v-slot:="scope">
            <el-button @click="DeleteConference(scope.$index, scope.row.name)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>


    </el-container>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 7, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="conferences_focus.length"
      ></el-pagination>
    </el-main>

</template>

<script>
import axios from "axios";
import { MessageBox } from "element-ui";

export default {
  inject: ['reload'],
  data() {
    return {
      conferences_focus: [],
      searchQuery: "",
      loading: true,
      currentPage: 1,
      pageSize: 5
    };
  },
  created() {
    this.coferencebyfocus();
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.conferences_focus.slice(start, end);
    }
  },
  methods: {
    handleSearch() {
      this.$router.push({ path: '/top_menu/search', query: { keyword: this.searchQuery } });
    },
    async coferencebyfocus() {
      const { data: data } = await axios.get("/api/conference/conferenceRankedByFocus");
      this.conferences_focus = data.data;
      this.loading = false;
      console.log(data.data);
    },
    async DeleteConference(index, name) {
      MessageBox.confirm(`确定删除会议 ${name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = new URLSearchParams();
        params.append("name", name);

        const { data: information } = await axios.post("/api/admin/deleteConference", params);
        console.log(information);
        this.reload();
        this.$message.success("删除成功");
        this.getviewconference();
      }).catch(() => {
        // 点击取消，什么也不做
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    fullScreen() {
      let full = document.fullscreenElement;
      if (!full) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }
}
</script>



<style lang="less" scoped>
.table-container{
  margin-bottom: 1.5%;
}
.footer {
  position: fixed;
  bottom: 0px;
  left: 40%;
  color: #ccc;

  a {
    color: #ccc;
  }
}

.home-container {
  height: 100%;
}

.el-header {
  background-color: rgb(34, 34, 34);
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  border-radius: 10px;

  >div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #fff;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
  padding: 20px;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  //设置文字之间的间距
  letter-spacing: 0.2em;
  cursor: pointer;
}

.user {
  margin-right: 15px;
  color: #ccc;
  font-size: 16px;
}

.el-menu-item:hover {
  background-color: rgb(51, 122, 183) !important;
}

// .el-menu-item{
//   color:rgb(135, 206, 235) !important;
// }</style>


<!--<template>-->
<!--  <div>-->

<!--    <div class="search-box">-->
<!--      <el-input-->
<!--          v-model="searchQuery"-->
<!--          placeholder="搜索..."-->
<!--          prefix-icon="el-icon-search"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleSearch"-->
<!--      >-->
<!--        <el-button slot="append" icon="el-icon-search" class="round-button" @click="handleSearch">搜索</el-button>-->
<!--      </el-input>-->
<!--    </div>-->

<!--  <el-container class="home-container">-->

<!--    <el-table-->
<!--        :data="conferences_focus"-->
<!--        height="520"-->
<!--        border-->
<!--        style="width: 100%; font-size: 14px"-->
<!--        v-loading="loading"-->
<!--        element-loading-text="拼命加载中"-->
<!--        element-loading-spinner="el-icon-loading"-->
<!--        element-loading-background="rgba(0, 0, 0, 0.8)"-->
<!--        id="pdfDom"-->
<!--        :default-sort="{ prop: 'message_date', order: 'ascending' }"-->
<!--        stripe-->
<!--    >-->

<!--&lt;!&ndash;      <el-table-column&ndash;&gt;-->
<!--&lt;!&ndash;          prop="id"&ndash;&gt;-->
<!--&lt;!&ndash;          label="#"&ndash;&gt;-->
<!--&lt;!&ndash;          sortable&ndash;&gt;-->
<!--&lt;!&ndash;      ></el-table-column>&ndash;&gt;-->
<!--      <el-table-column prop="ccf" label="CCF" min-width="25"></el-table-column>-->
<!--      <el-table-column label="全称" min-width="200">-->
<!--        <template v-slot="{ row }">-->
<!--          <router-link :to="{ name: 'conference_information', query: {-->
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
<!--            {{ row.name }}-->
<!--          </router-link>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="core" label="CORE" min-width="50"></el-table-column>-->
<!--      <el-table-column prop="qualis" label="QULIS" min-width="50"></el-table-column>-->

<!--      <el-table-column prop="deadline" label="截稿日期" min-width="50"></el-table-column>-->
<!--      <el-table-column prop="notifation" label="通知日期" min-width="50"></el-table-column>-->
<!--      <el-table-column prop="meeting" label="会议日期" min-width="50"></el-table-column>-->
<!--      <el-table-column prop="address" label="会议地址" min-width="150"></el-table-column>-->
<!--      <el-table-column prop="session" label="届" min-width="30"></el-table-column>-->
<!--      <el-table-column prop="viewCount" label="浏览量" min-width="30"></el-table-column>-->
<!--      <el-table-column label="删除会议">-->
<!--        <template v-slot:="scope">-->
<!--          <el-button @click="DeleteConference(scope.$index, scope.row.name)" type="danger" icon="el-icon-delete" circle></el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--   -->
<!--  </el-container>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->
<!--import {MessageBox} from "element-ui";-->

<!--export default {-->
<!--  inject:['reload'],-->
<!--  data() {-->
<!--    return {-->
<!--      conferences_focus: [],-->
<!--      searchQuery:"",-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.coferencebyfocus();-->
<!--  },-->
<!--  methods: {-->
<!--    handleSearch(){-->
<!--      this.$router.push({path:'/top_menu/search',query:{keyword:this.searchQuery}});-->
<!--    },-->
<!--    async coferencebyfocus()-->
<!--    {-->
<!--      const {data:data} = await axios.get("/api/conference/conferenceRankedByFocus");-->
<!--      this.conferences_focus=data.data;-->
<!--      this.conferences=data.data;-->
<!--      this.loading=false;-->
<!--      console.log(data.data);-->

<!--    },-->
<!--    async DeleteConference(index,name){-->
<!--      MessageBox.confirm(`确定删除会议 ${name} 吗？`, '提示', {-->
<!--        confirmButtonText: '确定',-->
<!--        cancelButtonText: '取消',-->
<!--        type: 'warning'-->
<!--      }).then(async () => {-->
<!--        const params = new URLSearchParams();-->
<!--        params.append("name", name);-->

<!--        const {data: information} = await axios.post("/api/admin/deleteConference",params,{-->
<!--          // headers: {-->
<!--          //   'Content-Type': 'application/x-www-form-urlencoded'-->
<!--          // },-->
<!--        });-->
<!--        console.log(information);-->
<!--        this.reload();-->
<!--        this.$message.success("删除成功");-->
<!--        this.getviewconference();-->
<!--      }).catch(() => {-->
<!--        // 点击取消，什么也不做-->
<!--      });-->

<!--    },-->

<!--    fullScreen(){-->
<!--      // Dom对象的一个属性: 可以用来判断当前是否为全屏模式(trueORfalse)-->
<!--      let full = document.fullscreenElement;-->
<!--      // 切换为全屏模式-->
<!--      if(!full){-->
<!--        // 文档根节点的方法requestFullscreen实现全屏模式-->
<!--        document.documentElement.requestFullscreen();-->
<!--      }else{-->
<!--        // 退出全屏模式-->
<!--        document.exitFullscreen();-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--</script>-->