<template>
  <el-container class="home-container">
    <!-- 头部区域 -->

    <!-- 页面主体区域 -->
    <el-container>
      <el-main>
        <div class="table-container">
          <el-row style="margin-bottom: 10px;">
            <el-col :span="16">
              <div>用户名: {{ user.username }} </div>
              <div>昵称:{{user.nickname}}</div>
              <div>电子邮件: {{user.email}}</div>
              <div>科研机构: {{user.organization}}</div>
              <div>注册时间: {{user.createTime}}</div>
              <div>活跃度: {{user.userPic}} </div>
            </el-col>
            <el-col :span="8">
              <el-button @click="edit_user()">修改用户信息</el-button>
            </el-col>
          </el-row>





          <h2>关注的会议</h2>
          <el-table :data="focusConference" border class="table-container">
            <el-table-column prop="ccf" label="CCF"></el-table-column>
            <el-table-column prop="core" label="CORE"></el-table-column>
            <el-table-column prop="qualis" label="QUALIS"></el-table-column>
            <el-table-column prop="abbreviation" label="简称"></el-table-column>
            <el-table-column prop="name" label="全称"></el-table-column>
            <el-table-column prop="deadline" label="截稿日期"></el-table-column>
            <el-table-column prop="notification" label="通知日期"></el-table-column>
            <el-table-column prop="meeting" label="会议日期"></el-table-column>
            <el-table-column prop="address" label="会议地点"></el-table-column>
            <el-table-column prop="session" label="届数"></el-table-column>
            <el-table-column prop="viewCount" label="浏览量"></el-table-column>
            <el-table-column label="取消关注">
              <template v-slot:="scope">
                <el-button @click="Deleteconference(scope.$index, scope.row.name)" type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="table-container">
            <h2 style="display: inline-block; margin-right: 10px;">关注的期刊</h2>
            <el-table :data="focusJournalInfo" border style="display: inline-block; vertical-align: top;">
              <el-table-column prop="ccf" label="CCF"></el-table-column>
              <el-table-column prop="abbreviation" label="简称"></el-table-column>
              <el-table-column prop="name" label="全称"></el-table-column>
              <el-table-column prop="ifactor" label="影响因子"></el-table-column>
              <el-table-column prop="publisher" label="出版商"></el-table-column>
              <el-table-column prop="viewCount" label="浏览量"></el-table-column>
              <el-table-column prop="issn" label="ISSN"></el-table-column>
              <el-table-column label="取消关注">
                <template v-slot:="scope">
                  <el-button @click="DeleteJournal(scope.$index, scope.row.name)" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>


          <h2>关注的科研人员</h2>
          <el-table :data="focusresearcher" border class="table-container">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="institution" label="科研机构"></el-table-column>
            <el-table-column prop="registrationDate" label="注册时间"></el-table-column>
            <el-table-column prop="activity" label="活跃度"></el-table-column>
          </el-table>

          <h2>关注的职位</h2>
          <el-table :data="positions" border class="table-container">
            <el-table-column prop="title" label="职位名称"></el-table-column>
            <el-table-column prop="employer" label="雇主"></el-table-column>
            <el-table-column prop="location" label="职位地点"></el-table-column>
          </el-table>

          <h2>浏览的会议</h2>
          <el-table :data="viewConference" border class="table-container">
            <el-table-column prop="ccf" label="CCF"></el-table-column>
            <el-table-column prop="core" label="CORE"></el-table-column>
            <el-table-column prop="qualis" label="QUALIS"></el-table-column>
            <el-table-column prop="abbreviation" label="简称"></el-table-column>
            <el-table-column prop="fullName" label="全称"></el-table-column>
            <el-table-column prop="deadline" label="截稿日期"></el-table-column>
            <el-table-column prop="notification" label="通知日期"></el-table-column>
            <el-table-column prop="conferenceDate" label="会议日期"></el-table-column>
          </el-table>

          <h2>浏览的期刊</h2>
          <el-table :data="viewJournal" border class="table-container">
            <el-table-column prop="ccf" label="CCF"></el-table-column>
            <el-table-column prop="name" label="全称"></el-table-column>
            <el-table-column prop="abbreviation" label="简称"></el-table-column>
            <el-table-column prop="ifactor" label="影响因子"></el-table-column>
            <el-table-column prop="publisher" label="出版商"></el-table-column>
            <el-table-column prop="issn" label="ISSN"></el-table-column>
          </el-table>
        </div>
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
//是否折叠
      isCollapse: false,
//被激活的链接地址
      activePath: "",
      activePath_top: "",
      user: {
        id: Number,
        username: "",
        nickname: "",
        email: "",
        userPic: "",
        organization: "",
        createTime: "",
        updateTime: "",
      },
      focusJournalInfo:{
        id: Number,
        ccf: "",
        abbreviation: "",
        name: "",
        ifactor: "",

        publisher: "",
        viewCount: "",
        issn: "",
      },
      focusConference:{

      },
      focusResearch:{
        id: Number,
        username: "",
        nickname: "",
        email: "",
        userPic: "",
        organization: "",
        createTime: "",
        updateTime: "",
      },
      viewConference:{
        id: Number,
        ccf: "",
        core:"",
        qualis:"",
        abbreviation: "",
        name: "",
        deadline:"",
        notification:"",
        meeting:"",
        address:"",
        seesion:"",
        viewCount:"",
      },
      viewJournal:{

      },



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
      console.log(focusJournalInfo);
    },
    async getfocusConference() {
      const {data:infomation} = await axios.get("/api/user/focusConferenceInfo");
      this.focusConference = infomation.data;
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

      this.viewConference = infomation.data;
      console.log(viewConference);
    },
    async getviewJournal() {
      const {data:infomation} = await axios.get("/api/user/viewConferenceInfo");

      this.viewJournal = infomation.data;
      console.log(viewConference);
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
    async DeleteJournal(ndex,name){
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