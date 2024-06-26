<template>
  <el-container class="home-container">
    <el-main>
      <el-form :model="user" :rules="rules" ref="userForm" label-width="120px" class="user-form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="user.username" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="user.nickname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="科研机构" prop="organization">
              <el-input v-model="user.organization"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
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
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮件', trigger: 'blur' },
          { type: 'email', message: '请输入有效的电子邮件地址', trigger: ['blur', 'change'] }
        ],
        organization: [
          { required: true, message: '请输入科研机构', trigger: 'blur' }
        ]
      }
    };
  },
  async created() {
    await this.getUserInformation();
  },
  methods: {
    submitForm() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.updateinfo();
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    async getUserInformation() {
      const { data: information } = await axios.get("/api/user/userInfo");
      this.user = information.data;
    },
    async updateinfo() {
      const responses = await axios.put("/api/user/update", this.user);
      console.log("修改");
      console.log(this.user);
      console.log(responses);
      if (responses.data.code == 0) {
        this.$message.success('修改成功');
        this.$router.go(-1);
      }
      else {
        this.$message.error('修改失败');
      }
    }
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
