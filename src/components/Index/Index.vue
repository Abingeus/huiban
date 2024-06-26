<template>
  <div class="indexs">
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
    <vue-particles class="login-bg" color="#39AFFD" :particleOpacity="0.7" :particlesNumber="100" shapeType="circle"
                   :particleSize="4" linesColor="#8DD1FE" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
                   :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <router-view></router-view>
  </div>

</template>


<script>
import axios from "axios";

export default {
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
