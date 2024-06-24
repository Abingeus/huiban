<template>
  <el-container class="home-container">
    <!-- 头部区域 -->

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu :default-active="activePath" class="el-menu-vertical-demo" background-color="#fff" text-color="black"
          active-text-color="#ffd04b" :router="true" :collapse="isCollapse" :collapse-transition="false">
          <el-menu-item index="index" @click="saveNavState('index')">
            <i class="iconfont icon-shouyefill"></i>
            <span slo="title">首页</span>
          </el-menu-item>
          <el-menu-item index="to_index" @click="saveNavState('to_index')">
            <i class="iconfont icon-sousuoxiao"></i>
            <span slot="title">最新消息</span>
          </el-menu-item>
          <el-menu-item index="Call_for_paper" @click="saveNavState('Call_for_paper')">
            <i class="iconfont icon-guizeshezhi"></i>
            <span slot="title">征稿</span>
          </el-menu-item>
          <el-menu-item index="notice" @click="saveNavState('notice')">
            <i class="iconfont icon-gonggao1"></i>
            <span slot="title">会议</span>
          </el-menu-item>
<!--          <el-menu-item index="information" @click="saveNavState('information')">-->
<!--            <i class="iconfont icon-gerenxinxi"></i>-->
<!--            <span slot="title">个人信息</span>-->
<!--          </el-menu-item>-->
          <el-menu-item index="borrow" @click="saveNavState('borrow')">
            <i class="iconfont icon-tushuqikan"></i>
            <span slot="title">榜单信息</span>
          </el-menu-item>
<!--          <el-menu-item index="violation" @click="saveNavState('violation')">-->
<!--            <i class="iconfont icon-weizhangchaxun"></i>-->
<!--            <span slot="title">违章信息</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="comment" @click="saveNavState('comment')">-->
<!--            <i class="iconfont icon-liuyan"></i>-->
<!--            <span slot="title">读者留言</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="intelligent" @click="saveNavState('intelligent')">-->
<!--            <i class="el-icon-monitor"></i>-->
<!--            <span slot="title">智能推荐</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="chat" @click="saveNavState('chat')">-->
<!--            <i class="el-icon-monitor"></i>-->
<!--            <span slot="title">图书反馈</span>-->
<!--          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>

        <div class="footer">

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
        userId: Number,
        cardNumber: Number,
        ruleNumber: Number,
        status: Number,
        cardName: "",
        username: "",
        password: "",
        createTime: "",
        updateTime: "",
      },
    };
  },
  async created() {
    // this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
    this.activePath_top = window.sessionStorage.getItem("activePath_top");
    // console.log(this.activePath)
    // 先获取sessionStorage中的id
    const stringId = window.sessionStorage.getItem("userId");
    const id = parseInt(stringId);
    this.user.userId = id;
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
      this.$router.push({ path: `/top_menu/home/${activePath}` });
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
