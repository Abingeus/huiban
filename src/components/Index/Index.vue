<template>
  <div class="indexs">
    <div>shiyong</div>

    <div>用户id：{{userInfo.id}}</div>
    <div>shiyong</div>
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

    }
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
