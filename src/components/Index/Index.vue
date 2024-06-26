<template>
  <div class="indexs" style="position: relative; height: 100vh;">

    <!-- Vue Particles 背景 -->
    <vue-particles class="login-bg"
                   color="#39AFFD"
                   :particleOpacity="0.7"
                   :particlesNumber="100"
                   shapeType="circle"
                   :particleSize="4"
                   linesColor="#8DD1FE"
                   :linesWidth="1"
                   :lineLinked="true"
                   :lineOpacity="0.4"
                   :linesDistance="150"
                   :moveSpeed="3"
                   :hoverEffect="true"
                   hoverMode="grab"
                   :clickEffect="true"
                   clickMode="push"
                   style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </vue-particles>

    <!-- 搜索框和内容 -->
    <div style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); z-index: 10; ">
      <div class="avatar_box">
        <img src="../../assets/images/search.jpg" alt="" />
      </div>
      <div class="search-box" style="width: 700px;">
        <el-input v-model="searchQuery"
                  class="input-border-style"
                  placeholder="搜索..."
                  prefix-icon="el-icon-search"
                  clearable
                  @keyup.enter.native="handleSearch">
          <el-button slot="append"
                     icon="el-icon-search"
                     class="round-button"
                     @click="handleSearch">搜索
          </el-button>
        </el-input>
      </div>
    </div>

  </div>
</template>



<script>
import axios from "axios";
import Conference_attend from "@/components/User/conference_attend.vue";

export default {
  components: {Conference_attend},
  data() {
    return {

      userInfo: {
        id: Number,
        username: "",
        nickname: "",
        email: "",
        userPic: "",
        organization: "",
        createTime: "",
        updateTime: "",
      },
      searchQuery:"",

    };

  },
  async created() {
    this.fetchUserInfo();


  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await axios.get('/api/user/userInfo');
        const data = await response.data;
        console.log(data);
        this.userInfo = data.data;
        console.log(this.userInfo);
        console.log(response.headers);
        console.log(this.userInfo.id);
        console.log(data.data.id);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }

    },
    handleSearch(){
      this.$router.push({path:'/top_menu/search',query:{keyword:this.searchQuery}});
    },
  }
}




</script>

<style scoped>
.indexs {
  display: flex;
  flex-direction: column;
}
.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -130%);
  background-color: #fff;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.search-box{
  width: 80%;

}
.input-border-style{
  border:0px solid #47c9FF;
  border-radius:3px;
  padding-left: 10px;
}
.el-input__inner{
  color:#00ccff;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.dynamic-value {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.value {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}

.label {
  font-size: 16px;
}
</style>
