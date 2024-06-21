<template>
  <el-container class="home-container">
    <el-main>
      <el-form :model="user" label-width="120px" class="user-form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input v-model="user.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="昵称">
              <el-input v-model="user.nickname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮件">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="科研机构">
              <el-input v-model="user.organization"></el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="8">-->
<!--            <el-form-item label="注册时间">-->
<!--              <el-input v-model="user.createTime"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="活跃度">-->
<!--              <el-input v-model="user.userPic"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="updateinfo">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        id: Number,
        username: "",
        nickname: "",
        email: "",
        organization: ""

      },
    };
  },
  async created() {

    await this.getUserInformatonrmaton();


  },
  methods: {
    submitForm() {
      // 提交逻辑
      console.log('Form submitted', this.user);
    },
    async getUserInformatonrmaton() {
      const {data:infomation} = await axios.get("/api/user/userInfo");
      this.user=infomation.data;
      console.log("ceshi");
      console.log(data);
      console.log(user);
    },
    async updateinfo()
    {
      const {code: responses} = await axios.put("/api/user/update",this.user);

      console.log("修改");
      console.log(this.user);
      console.log(responses);
      this.$message.success('修改成功');
    },
    showUserInformatonrmaton() {
      this.user=infomation.data;
    },
  }
};
</script>

<style>
.home-container {
  background-color: #f9f9f9;
  padding: 20px;
}

.user-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
}
</style>
