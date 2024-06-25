<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="CCF">
        <el-input v-model="form.ccf"></el-input>
      </el-form-item>
      <el-form-item label="全称">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="Special Issue">
        <el-input v-model="form.issue"></el-input>
      </el-form-item>
      <el-form-item label="截稿日期">
        <el-date-picker v-model="form.deadline" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="影响因子">
        <el-input v-model="form.ifactor"></el-input>
      </el-form-item>
      <el-form-item label="出版商">
        <el-input v-model="form.publisher"></el-input>
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
        issue: this.$route.query.issue || '',
        deadline: this.$route.query.deadline || '',
        ifactor: this.$route.query.ifactor || '',
        publisher: this.$route.query.publisher || '',
      },
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
      // 在这里处理提交表单逻辑
      console.log("传入数据");
      console.log(this.form);
      // 在这里处理提交表单逻辑
      const response=axios.put("/api/admin/updateJournal",this.form);
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
