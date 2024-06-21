<template>
  <el-container class="home-container">
    <!-- 头部区域 -->

    <!-- 页面主体区域 -->
    <el-container>
      <el-main>
        <div class="table-container">
          <el-row style="margin-bottom: 10px;">
            <el-col :span="24">
              <div>姓名1:{{ user.username }} </div>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 10px;">
            <el-col :span="24">
              <div>电子邮件:</div>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 10px;">
            <el-col :span="24">
              <div>科研机构:</div>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 10px;">
            <el-col :span="24">
              <div>注册时间:</div>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 10px;">
            <el-col :span="24">
              <div>活跃度: </div>
            </el-col>
          </el-row>



          <el-table :data="conferences" border class="table-container">
            <el-table-column prop="ccf" label="CCF"></el-table-column>
            <el-table-column prop="core" label="CORE"></el-table-column>
            <el-table-column prop="qualis" label="QUALIS"></el-table-column>
            <el-table-column prop="shortName" label="简称"></el-table-column>
            <el-table-column prop="fullName" label="全称"></el-table-column>
            <el-table-column prop="deadline" label="截稿日期"></el-table-column>
            <el-table-column prop="notification" label="通知日期"></el-table-column>
            <el-table-column prop="conferenceDate" label="会议日期"></el-table-column>
          </el-table>

          <div class="table-container">
            <h2 style="display: inline-block; margin-right: 10px;">关注的期刊</h2>
            <el-table :data="focusJournalInfo" border style="display: inline-block; vertical-align: top;">
              <el-table-column prop="ccf" label="CCF"></el-table-column>
              <el-table-column prop="fullName" label="全称"></el-table-column>
              <el-table-column prop="impactFactor" label="影响因子"></el-table-column>
              <el-table-column prop="publisher" label="出版商"></el-table-column>
              <el-table-column prop="issn" label="ISSN"></el-table-column>
            </el-table>
          </div>


          <h2>关注的科研人员</h2>
          <el-table :data="researchers" border class="table-container">
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
          <el-table :data="browsedConferences" border class="table-container">
            <el-table-column prop="ccf" label="CCF"></el-table-column>
            <el-table-column prop="core" label="CORE"></el-table-column>
            <el-table-column prop="qualis" label="QUALIS"></el-table-column>
            <el-table-column prop="shortName" label="简称"></el-table-column>
            <el-table-column prop="fullName" label="全称"></el-table-column>
            <el-table-column prop="deadline" label="截稿日期"></el-table-column>
            <el-table-column prop="notification" label="通知日期"></el-table-column>
            <el-table-column prop="conferenceDate" label="会议日期"></el-table-column>
          </el-table>

          <h2>浏览的期刊</h2>
          <el-table :data="browsedJournals" border class="table-container">
            <el-table-column prop="ccf" label="CCF"></el-table-column>
            <el-table-column prop="fullName" label="全称"></el-table-column>
            <el-table-column prop="impactFactor" label="影响因子"></el-table-column>
            <el-table-column prop="publisher" label="出版商"></el-table-column>
            <el-table-column prop="issn" label="ISSN"></el-table-column>
          </el-table>
        </div>
        <!-- 路由占位符 -->
        <!--        <router-view></router-view>-->
        <div style="text-align: center;" class="table-container">
          <el-popover placement="top-start" :width="150" trigger="hover">
            <p slot="reference"> Copyright © 2011-2024 myhuiban.com. All Rights Reserved<br /> </p>
            <img
                src="https://pic.yupi.icu/5563/202312061315664.png"
                style="height: 100px; width: 100px"
            />
          </el-popover>
          <a href="https://beian.miit.gov.cn">project |</a>
          <a href="https://beian.mps.gov.cn/#/query/webSearch">
            <img
                src="https://xxx.xiaobaitiao.icu/img/icu/202312211243636.png"
                style="height: 16px; width: 16px; margin: 5px 0px 0px 5px"
            />
            浙公网安备33028202001002号
          </a>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>


export default {
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
      }
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
    const abc=await this.$http.get("/api/user/userInfo");
    console.log(res_jo);

    const { data: res } = await this.$http.get("/api/user/userInfo");

    console.log(res);
    console.log(abc);

    this.user = res.data;
    this.focusJournalInfo=res_jo;
  },
  async mounted() { },
  methods: {
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