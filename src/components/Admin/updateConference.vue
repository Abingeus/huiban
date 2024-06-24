<template>
  <div class="container">
    <h2>Submit Information</h2>
    <el-form ref="form" :model="form" label-width="120px" class="demo-form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="CCF" prop="ccf">
            <el-input v-model="form.ccf"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Core" prop="core">
            <el-input v-model="form.core"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Qualis" prop="qualis">
            <el-input v-model="form.qualis"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Abbreviation" prop="abbreviation">
            <el-input v-model="form.abbreviation"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Deadline" prop="deadline">
            <el-date-picker v-model="form.deadline" type="date" placeholder="Select date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Notification" prop="notification">
            <el-date-picker v-model="form.notification" type="date" placeholder="Select date"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Meeting" prop="meeting">
            <el-date-picker v-model="form.meeting" type="date" placeholder="Select date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Address" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Session" prop="session">
            <el-input v-model="form.session"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
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
        ccf: '',
        core: '',
        qualis: '',
        abbreviation: '',
        name: '',
        deadline: '',
        notification: '',
        meeting: '',
        address: '',
        session: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      const {data:res} =await axios.put("/api/admin/updateConference",this.form);
      console.log(res);
      if(res.code==0)
      {
        this.$message.success("修改成功");
      }
      else this.$message.error("失败，请检查表单");
    }
  }
};

</script>

<style scoped>

</style>