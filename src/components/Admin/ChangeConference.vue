<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="CCF">
        <el-input v-model="form.ccf"></el-input>
      </el-form-item>
      <el-form-item label="全称">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="CORE">
        <el-input v-model="form.core"></el-input>
      </el-form-item>
      <el-form-item label="Qualis">
        <el-input v-model="form.qualis"></el-input>
      </el-form-item>
      <el-form-item label="截稿日期">
        <el-date-picker v-model="form.deadline" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="通知日期">
        <el-date-picker v-model="form.notifacation" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="会议日期">
        <el-date-picker v-model="form.meeting" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="会议地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="届">
        <el-input v-model="form.session"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        ccf: this.$route.query.ccf || '',
        name: this.$route.query.name || '',
        core: this.$route.query.core || '',
        qualis: this.$route.query.qualis || '',
        deadline: this.$route.query.deadline || '',
        notifacation: this.$route.query.notifation || '',
        meeting: this.$route.query.meeting || '',
        address: this.$route.query.address || '',
        session: this.$route.query.session || '',
      },
    };
  },
  methods: {
    submitForm() {
      console.log("传入数据");
      console.log(this.form);
      // 在这里处理提交表单逻辑
      const response=axios.put("/api/admin/updateConference",this.form);
      console.log("response");
      console.log(response);
      this.$message.success('修改成功');
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
