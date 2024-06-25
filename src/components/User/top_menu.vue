<template>
  <el-container class="home-container">
  <el-header>
    <div>
      <!-- <img src="../assets/heima.png" alt="" /> -->
      <span>Conference Partner</span>
      <span style="color: #ccc; font-size: 16px">会伴</span>
    </div>
    <div>

        <el-menu :default-actibe="activePath_top" class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="home" @click="saveNavState_top('home')"> 首页</el-menu-item>
        <el-menu-item index="AdminManage" v-if="this.flag===1" @click="saveNavState_top('AdminManage')"> 管理页面</el-menu-item>
        <el-menu-item index="conference" @click="saveNavState_top('conference')"> 会议</el-menu-item>

        <el-menu-item index="journals" @click="saveNavState_top('journals')"> 期刊</el-menu-item>
        <el-menu-item index="user_information" @click="saveNavState_top('user_information')"> 个人信息</el-menu-item>

        <el-menu-item index="Login" @click="saveNavState('Login')"> 登出</el-menu-item>
      </el-menu>



      <!--        <div class="user">用户:{{ this.user.cardName }}</div>-->
      <!--        <el-button type="info" @click="logout">退出</el-button>-->
    </div>
  </el-header>

  <router-view></router-view>

    <div class="footer">

    </div>
  </el-container>
</template>

<style lang="less" scoped>
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
<script>


import axios from "axios";

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
        userId: Number,
        cardNumber: Number,
        ruleNumber: Number,
        status: Number,
        cardName: "",
        username: "",
        password: "",
        createTime: "",
        updateTime: "",
        isAdmin:Number,
      },
      flag:0,
    };
  },
  async created() {
    // this.getMenuList();
    await this.getUserInformatonrmaton();
    const Admin=localStorage.getItem('isAdmin');
    this.flag=parseInt(Admin);
    this.activePath = window.sessionStorage.getItem("activePath");
    this.activePath_top = window.sessionStorage.getItem("activePath_top");
    // console.log(this.activePath)
    // 先获取sessionStorage中的id
    const stringId = window.sessionStorage.getItem("userId");
    const id = parseInt(stringId);
    this.user.userId = id;
    console.log("检测isAdmin");
    console.log(this.user.isAdmin);



  },
  async mounted() { },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getUserInformatonrmaton() {
      const {data:infomation} = await axios.get("/api/user/userInfo");
      this.user=infomation.data;
    },


    //点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      // console.log("first")
      window.sessionStorage.setItem("activePath", activePath);
      if(activePath=="Login")
      {
        localStorage.removeItem('jwtToken');
      };

      this.$router.push({ path: `/${activePath}` });
      this.activePath = activePath;
      // console.log(this.activePath);
    },
    saveNavState_top(activePath_top) {
      // console.log("first")
      window.sessionStorage.setItem("activePath_top", activePath_top);
      this.activePath_top = activePath_top;
      this.$router.push({ path: `/top_menu/${activePath_top}` });
      // console.log(this.activePath);
    },
    toGitee() {
      console.log(1123);
    }
  },
};
</script>