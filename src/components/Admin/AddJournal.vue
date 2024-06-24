
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
          <el-form-item label="简称" prop="abbreviation">
            <el-input v-model="form.abbreviation"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="全称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="影响因子" prop="ifactor">
            <el-input v-model="form.ifactor"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="issn" prop="issn">
            <el-input v-model="form.issn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出版社" prop="publisher">
            <el-input v-model="form.publisher"></el-input>
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
        abbreviation: '',
        name: '',
        ifactor: '',
        publisher: '',
        issn: '',
      }
    };
  },
  methods: {
    async handleSubmit() {
      const {data:res} =await axios.put("/api/admin/addJournal",this.form);
      console.log(res);
      if(res.code==0)
      {
        this.$message.success("提交成功");
      }
      else this.$message.error("失败，请检查表单");
    }
  }
};

</script>
<style>




</style>

