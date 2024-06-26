<template>
  <el-container class="home-container">
    <!-- 头部区域 -->

    <!-- 页面主体区域 -->
    <el-container>
      <el-main>
        <div class="table-container">
          <el-row style="padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin-bottom: 10px; display: flex; flex-direction: column; align-items: center;">
            <el-col :span="24" style="width: 100%; max-width: 600px;">
              <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px; text-align: left;">用户信息</div>
              <div style="margin-bottom: 5px; text-align: left;"><strong>用户名:</strong> {{ user.username }}</div>
              <div style="margin-bottom: 5px; text-align: left;"><strong>昵称:</strong> {{ user.nickname }}</div>
              <div style="margin-bottom: 5px; text-align: left;"><strong>电子邮件:</strong> {{ user.email }}</div>
              <div style="margin-bottom: 5px; text-align: left;"><strong>科研机构:</strong> {{ user.organization }}</div>
              <div style="margin-bottom: 5px; text-align: left;"><strong>注册时间:</strong> {{ user.createTime }}</div>
              <div style="margin-bottom: 5px; text-align: left;"><strong>活跃度:</strong> {{ user.userPic }}</div>
            </el-col>
            <el-col :span="24" style="display: flex; justify-content: center; margin-top: 20px;">
              <el-button type="primary" @click="edit_user()" style="font-size: 14px; padding: 10px 20px;">修改用户信息</el-button>
            </el-col>
          </el-row>








          <h2>关注的会议</h2>
          <el-table :data="currentTableData_foucus_conference"
                    height="500"
                    border
                    style="width: 100%; font-size: 14px"
                    v-loading="loading1"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :default-sort="{ prop: 'message_date', order: 'ascending' }"
                    stripe>
            <el-table-column prop="ccf" label="CCF" min-width="30"></el-table-column>
            <el-table-column prop="core" label="CORE" min-width="35"></el-table-column>
            <el-table-column prop="qualis" label="QUALIS" min-width="100"></el-table-column>
            <el-table-column prop="abbreviation" label="简称" min-width="50"></el-table-column>
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
            <el-table-column prop="deadline" label="截稿日期" min-width="50"></el-table-column>
            <el-table-column prop="notification" label="通知日期" min-width="50"></el-table-column>
            <el-table-column prop="meeting" label="会议日期" min-width="50"></el-table-column>
            <el-table-column prop="address" label="会议地点" min-width="100"></el-table-column>
            <el-table-column prop="session" label="届数" min-width="30"></el-table-column>
            <el-table-column prop="viewCount" label="浏览量" min-width="30"></el-table-column>
            <el-table-column label="取消关注" min-width="30">
              <template v-slot:="scope">
                <el-button @click="Deleteconference(scope.$index, scope.row.name)" type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              @size-change="handleSizeChange_foucus_conference"
              @current-change="handleCurrentChange_foucus_conference"
              :current-page="queryInfo_foucus_conference.currentpage"
              :page-sizes="[3, 5, 7, 10]"
              :page-size="queryInfo_foucus_conference.pageNum"
              layout="total, sizes, prev, pager, next, jumper"
              :total="queryInfo_foucus_conference.total"
          >
          </el-pagination>



          <div class="table-container">
            <h2 style="display: inline-block; margin-right: 10px;">关注的期刊</h2>
            <el-table :data="currentTableData_foucus_journal"
                      height="500"
                      border
                      style="width: 100%; font-size: 14px"
                      v-loading="loading2"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
                      :default-sort="{ prop: 'message_date', order: 'ascending' }"
                      stripe>
              <el-table-column prop="ccf" label="CCF" min-width="20"></el-table-column>
              <el-table-column prop="abbreviation" label="简称" min-width="30"></el-table-column>
              <el-table-column label="全称" min-width="250">
                <template v-slot="{ row }">
                  <router-link :to="{
        name: 'journal_information',
        query: {
          name: row.name,
          ccf: row.ccf,
          issue: row.issue,
          deadline: row.deadline,
          ifactor: row.ifactor,
          publisher: row.publisher,
          viewCount: row.viewCount,
        }
      }">
                    {{ row.name }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="ifactor" label="影响因子" min-width="30"></el-table-column>
              <el-table-column prop="publisher" label="出版商" min-width="30"></el-table-column>
              <el-table-column prop="viewCount" label="浏览量" min-width="20"></el-table-column>
              <el-table-column prop="issn" label="ISSN" min-width="50"></el-table-column>
              <el-table-column label="取消关注" min-width="20">
                <template v-slot:="scope">
                  <el-button @click="DeleteJournal(scope.$index, scope.row.name)" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>

            </el-table>
            <el-pagination
                @size-change="handleSizeChange_foucus_journal"
                @current-change="handleCurrentChange_foucus_journal"
                :current-page="queryInfo_foucus_journal.currentpage"
                :page-sizes="[3, 5, 7, 10]"
                :page-size="queryInfo_foucus_journal.pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryInfo_foucus_journal.total"
            >
            </el-pagination>
          </div>


<!--          <h2>关注的科研人员</h2>-->
<!--          <el-table :data="focusresearcher"-->
<!--                    border class="table-container">-->
<!--            <el-table-column prop="name" label="姓名"></el-table-column>-->
<!--            <el-table-column prop="institution" label="科研机构"></el-table-column>-->
<!--            <el-table-column prop="registrationDate" label="注册时间"></el-table-column>-->
<!--            <el-table-column prop="activity" label="活跃度"></el-table-column>-->
<!--          </el-table>-->

<!--          <h2>关注的职位</h2>-->
<!--          <el-table :data="positions" border class="table-container">-->
<!--            <el-table-column prop="title" label="职位名称"></el-table-column>-->
<!--            <el-table-column prop="employer" label="雇主"></el-table-column>-->
<!--            <el-table-column prop="location" label="职位地点"></el-table-column>-->
<!--          </el-table>-->

          <h2>浏览的会议</h2>
          <el-table :data="currentTableData_view_conference"
                    height="500"
                    border
                    style="width: 100%; font-size: 14px"
                    v-loading="loading3"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :default-sort="{ prop: 'message_date', order: 'ascending' }"
                    stripe>
            <el-table-column prop="ccf" label="CCF" min-width="25"></el-table-column>
            <el-table-column prop="core" label="CORE" min-width="35"></el-table-column>
            <el-table-column prop="qualis" label="QUALIS"min-width="40"></el-table-column>
            <el-table-column prop="abbreviation" label="简称" min-width="40"></el-table-column>
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
            <el-table-column prop="deadline" label="截稿日期" min-width="70"></el-table-column>
            <el-table-column prop="notification" label="通知日期" min-width="70"></el-table-column>
            <el-table-column prop="meeting" label="会议日期" min-width="70"></el-table-column>
            <el-table-column prop="session" label="届数" min-width="70"></el-table-column>
          </el-table>
          <el-pagination
              @size-change="handleSizeChange_view_conference"
              @current-change="handleCurrentChange_view_conference"
              :current-page="queryInfo_view_conference.currentpage"
              :page-sizes="[3, 5, 7, 10]"
              :page-size="queryInfo_view_conference.pageNum"
              layout="total, sizes, prev, pager, next, jumper"
              :total="queryInfo_view_conference.total"
          >
          </el-pagination>
        </div>

          <h2>浏览的期刊</h2>
          <el-table :data="currentTableData_view_journal"
                    height="500"
                    border
                    style="width: 100%; font-size: 14px"
                    v-loading="loading4"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :default-sort="{ prop: 'message_date', order: 'ascending' }"
                    stripe>
            <el-table-column prop="ccf" label="CCF" min-width="25"></el-table-column>
            <el-table-column label="全称" min-width="250">
              <template v-slot="{ row }">
                <router-link :to="{
        name: 'journal_information',
        query: {
          name: row.name,
          ccf: row.ccf,
          issue: row.issue,

          ifactor: row.ifactor,
          publisher: row.publisher,

        }
      }">
                  {{ row.name }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="abbreviation" label="简称" min-width="80"></el-table-column>
            <el-table-column prop="ifactor" label="影响因子" min-width="30"></el-table-column>
            <el-table-column prop="publisher" label="出版商" min-width="50"></el-table-column>
            <el-table-column prop="issn" label="ISSN" min-width="70"></el-table-column>
          </el-table>
        <el-pagination
            @size-change="handleSizeChange_view_journal"
            @current-change="handleCurrentChange_view_journal"
            :current-page="queryInfo_view_journal.currentpage"
            :page-sizes="[3, 5, 7, 10]"
            :page-size="queryInfo_view_journal.pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo_view_journal.total"
        >
        </el-pagination>
          <h2>参加的会议</h2>
          <el-table :data="currentTableData_attend_journal"
                    height="500"
                    border
                    style="width: 100%; font-size: 14px"
                    v-loading="loading4"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :default-sort="{ prop: 'message_date', order: 'ascending' }"
                    stripe>
            <el-table-column prop="ccf" label="CCF" min-width="25"></el-table-column>
            <el-table-column prop="core" label="CORE" min-width="35"></el-table-column>
            <el-table-column prop="qualis" label="QUALIS"min-width="40"></el-table-column>
            <el-table-column prop="abbreviation" label="简称" min-width="40"></el-table-column>
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
            <el-table-column prop="deadline" label="截稿日期" min-width="70"></el-table-column>
            <el-table-column prop="notification" label="通知日期" min-width="70"></el-table-column>
            <el-table-column prop="conferenceDate" label="会议日期" min-width="70"></el-table-column>
            <el-table-column label="取消参加" min-width="40">
              <template v-slot:="scope">
                <el-button @click="DeleteAttend(scope.$index, scope.row.name)" type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        <el-pagination
            @size-change="handleSizeChange_attend_journal"
            @current-change="handleCurrentChange_attend_journal"
            :current-page="queryInfo_attend_journal.currentpage"
            :page-sizes="[3, 5, 7, 10]"
            :page-size="queryInfo_attend_journal.pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo_attend_journal.total"
        ></el-pagination>



        <!-- 路由占位符 -->
        <!--        <router-view></router-view>-->
        <div style="text-align: center;" class="table-container">

        </div>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>


import axios from "axios";
import router from "@/router";
import {MessageBox} from "element-ui";

export default {
  inject:['reload'],
  data() {
    return {
//左侧菜单数据
      menulist: [],

      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },

      queryInfo_foucus_conference: {
        pageNum: 7,
        currentpage: 1,
        total: 0,

      },
      queryInfo_foucus_journal: {
        pageNum: 7,
        currentpage: 1,
        total: 0,
      },
      queryInfo_view_conference: {
        pageNum: 7,
        currentpage: 1,
        total: 0,

      },
      queryInfo_view_journal: {
        pageNum: 7,
        currentpage: 1,
        total: 0,

      },
      queryInfo_attend_journal: {
        pageNum: 7,
        currentpage: 1,
        total: 0,

      },

//是否折叠
      isCollapse: false,
//被激活的链接地址
      activePath: "",
      activePath_top: "",
      // user: {
      //   id: Number,
      //   username: "",
      //   nickname: "",
      //   email: "",
      //   userPic: "",
      //   organization: "",
      //   createTime: "",
      //   updateTime: "",
      // },
      // focusJournalInfo:{
      //   id: Number,
      //   ccf: "",
      //   abbreviation: "",
      //   name: "",
      //   ifactor: "",
      //
      //   publisher: "",
      //   viewCount: "",
      //   issn: "",
      // },
      user:[],
      focusJournalInfo:[],
      focusConference:[],
      focusResearch:[],
      loading1:true,
      loading2:true,
      loading3:true,
      loading4:true,
      loading5:true,
      // focusResearch:{
      //   id: Number,
      //   username: "",
      //   nickname: "",
      //   email: "",
      //   userPic: "",
      //   organization: "",
      //   createTime: "",
      //   updateTime: "",
      // },
      // viewConference:{
      //   id: Number,
      //   ccf: "",
      //   core:"",
      //   qualis:"",
      //   abbreviation: "",
      //   name: "",
      //   deadline:"",
      //   notification:"",
      //   meeting:"",
      //   address:"",
      //   seesion:"",
      //   viewCount:"",
      // },
      viewConference:[],
      viewJournal:[],
      attendConference:[],
      currentTableData_foucus_conference: [],
      currentTableData_foucus_journal: [],
      currentTableData_view_conference: [],
      currentTableData_view_journal: [],
      currentTableData_attend_journal: [],

    };
  },
  async created() {
// this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
    this.activePath_top = window.sessionStorage.getItem("activePath_top");
// console.log(this.activePath)
// 先获取sessionStorage中的id
//     const stringId = window.sessionStorage.getItem("userId");
//     const id = parseInt(stringId);
//     this.user.userId = id;
    const {data:res_jo}=await this.$http.get("/api/user/focusJournalInfo");

    console.log(res_jo);
    this.getUserInformatonrmaton();
    this.getfocusJournalInfo();
    this.getfocusConference();
    this.getUsername();
    this.getviewconference();
    this.getviewJournal();
    this.getUserAttendConference();

  },
  async mounted() { },
  methods: {
    async getUserInformatonrmaton() {
      const {data:infomation} = await axios.get("/api/user/userInfo");
      this.user=infomation.data;
    },
    async getfocusJournalInfo() {

      const {data:infomation} = await axios.get("/api/user/focusJournalInfo");
      this.focusJournalInfo = infomation.data;
      this.queryInfo_foucus_journal.total=infomation.data.length;
      this.updateCurrentTableData_foucus_journal();
      this.loading1=false;
      console.log(focusJournalInfo);
    },
    async getfocusConference() {
      const {data:infomation} = await axios.get("/api/user/focusConferenceInfo");
      this.focusConference = infomation.data;
      this.queryInfo_foucus_conference.total=infomation.data.length;
      console.log("关注表格qian");
      console.log(this.focusConference);
      this.updateCurrentTableData_foucus_conference();
    },
    edit_user()
    {
      this.$router.push(
          {
            path:"/top_menu/edituser_information",

          }
      );
    },
    async getUsername() {
      const {data:infomation} = await axios.get("/api/user/focusUserInfo");
      this.focusResearch = infomation.data;
      console.log(focusResearch);
    },
    async getviewconference() {
      const {data:infomation} = await axios.get("/api/user/viewConferenceInfo");
      this.queryInfo_view_conference.total=infomation.data.length;
      this.viewConference=infomation.data;
      console.log("viewConference");
      console.log(this.viewConference);
      this.updateCurrentTableData_view_conference();




    },
    async getviewJournal() {
      const {data:infomation} = await axios.get("/api/user/viewJournalInfo");

      this.viewJournal = infomation.data;
      this.queryInfo_view_journal.total=infomation.data.length;
      console.log("浏览的会议i");
      console.log(infomation);
      this.updateCurrentTableData_view_journal();
      this.loading4=false;

    },
    async getUserAttendConference() {
      const {data:infomation} = await axios.get("/api/user/attendConferenceInfo");

      this.attendConference = infomation.data;
      this.queryInfo_attend_journal.total=infomation.data.length;
      this.updateCurrentTableData_attend_journal();
      this.loading5=false;
      console.log(attendConference);
    },
    async Deleteconference(index,name) {
      MessageBox.confirm(`确定删除会议 ${name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = new URLSearchParams();
        params.append("conferenceName", name);

        const {data: information} = await axios.post("/api/user/stopFocusConference",params,{
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // },
        });
        this.reload();
      }).catch(() => {
        // 点击取消，什么也不做
      });
    },
    async DeleteJournal(index,name){
      MessageBox.confirm(`确定删除期刊 ${name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = new URLSearchParams();
        params.append("journalName", name);

        const {data: information} = await axios.post("/api/user/stopFocusJournal",params,{
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // },
        });
        console.log(information);
        this.reload();
        this.getviewconference();
      }).catch(() => {
        // 点击取消，什么也不做
      });


    },
    async DeleteAttend(index,name){
      MessageBox.confirm(`确定取消参加 ${name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = new URLSearchParams();
        params.append("conferenceName", name);

        const {data: information} = await axios.post("/api/user/stopAttendConference",params,{
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // },
        });
        console.log(information);
        this.reload();
        this.getviewconference();
      }).catch(() => {
        // 点击取消，什么也不做
      });


    },
    updateCurrentTableData_foucus_conference() {
      console.log("关注表格");
      console.log(this.focusConference);
      console.log(this.currentTableData_foucus_conference);
      const start = (this.queryInfo_foucus_conference.currentpage - 1) * this.queryInfo_foucus_conference.pageNum;
      const end = Math.min(start + this.queryInfo_foucus_conference.pageNum, this.focusConference.length);
      this.currentTableData_foucus_conference = this.focusConference.slice(start, end);
      this.loading1 = false;
      console.log("longding1");
      console.log(this.loading1);
    },

    updateCurrentTableData_foucus_journal() {
      const start = (this.queryInfo_foucus_journal.currentpage - 1) * this.queryInfo_foucus_journal.pageNum;
      const end = Math.min(start + this.queryInfo_foucus_journal.pageNum, this.focusJournalInfo.length);
      this.currentTableData_foucus_journal = this.focusJournalInfo.slice(start, end);
      this.loading2 = false;
    },

    updateCurrentTableData_view_conference() {
      const start = (this.queryInfo_view_conference.currentpage - 1) * this.queryInfo_view_conference.pageNum;
      const end = Math.min(start + this.queryInfo_view_conference.pageNum, this.viewConference.length);
      this.currentTableData_view_conference = this.viewConference.slice(start, end);
      this.loading3 = false;
      console.log("currentTableData_view_conference");
      console.log(currentTableData_view_conference);


    },

    updateCurrentTableData_view_journal() {
      const start = (this.queryInfo_view_journal.currentpage - 1) * this.queryInfo_view_journal.pageNum;
      const end = Math.min(start + this.queryInfo_view_journal.pageNum, this.viewJournal.length);
      this.currentTableData_view_journal = this.viewJournal.slice(start, end);
      this.loading4 = false;
    },

    updateCurrentTableData_attend_journal() {
      const start = (this.queryInfo_attend_journal.currentpage - 1) * this.queryInfo_attend_journal.pageNum;
      const end = Math.min(start + this.queryInfo_attend_journal.pageNum, this.attendConference.length);
      this.currentTableData_attend_journal = this.attendConference.slice(start, end);
      this.loading5 = false;
    },
    handleCurrentChange_foucus_conference(val) {
      this.queryInfo_foucus_conference.currentpage = val;
      this.updateCurrentTableData_foucus_conference();
    },

    handleCurrentChange_foucus_journal(val) {
      this.queryInfo_foucus_journal.currentpage = val;
      this.updateCurrentTableData_foucus_journal();
    },

    handleCurrentChange_view_conference(val) {
      this.queryInfo_view_conference.currentpage = val;
      this.updateCurrentTableData_view_conference();
    },

    handleCurrentChange_view_journal(val) {
      this.queryInfo_view_journal.currentpage = val;
      this.updateCurrentTableData_view_journal();
    },

    handleCurrentChange_attend_journal(val) {
      this.queryInfo_attend_journal.currentpage = val;
      this.updateCurrentTableData_attend_journal();
    },
    handleSizeChange_foucus_conference(val) {
      this.queryInfo_foucus_conference.pageNum = val;
      this.updateCurrentTableData_foucus_conference();
    },

    handleSizeChange_foucus_journal(val) {
      this.queryInfo_foucus_journal.pageNum = val;
      this.updateCurrentTableData_foucus_journal();
    },

    handleSizeChange_view_conference(val) {
      this.queryInfo_view_conference.pageNum = val;
      this.updateCurrentTableData_view_conference();
    },

    handleSizeChange_view_journal(val) {
      this.queryInfo_view_journal.pageNum = val;
      this.updateCurrentTableData_view_journal();
    },

    handleSizeChange_attend_journal(val) {
      this.queryInfo_attend_journal.pageNum = val;
      this.updateCurrentTableData_attend_journal();
    },







    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },


//点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
//保存链接的激活状态
    saveNavState(activePath) {
// console.log("first")
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
// console.log(this.activePath);
    },
    saveNavState_top(activePath_top) {
// console.log("first")
      window.sessionStorage.setItem("activePath_top", activePath_top);
      this.activePath_top = activePath_top;
      this.$router.push({path: `/${activePath_top}`});
// console.log(this.activePath);
    },
    toGitee() {
      console.log(1123);
    }
  },
};
</script>

<style lang="less" scoped>
.table-container {
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

  > div {
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

<script setup>
</script>