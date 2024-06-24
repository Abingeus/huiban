<!--<template>-->
<!--  <div>-->
<!--    <h1>详细信息</h1>-->
<!--    <p>这里是 名字 为 {{ name }} 的项目的详细信息。</p>-->
<!--    &lt;!&ndash; 根据实际情况显示详细信息 &ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="conference-layout">

    <el-col :span="20">
      <el-card>
        <p>这里是 期刊名字 为 {{ this.getname }} 的项目的详细信息。</p>
        <el-table border>
          <el-table-column prop="label" label="Label" width="150"></el-table-column>
          <el-table-column prop="value" label="Information"></el-table-column>
        </el-table>
      </el-card>
    </el-col>


    <el-col :span="4">
      <div class="actions">
        <el-button type="primary" @click="handleFollow">我要关注</el-button>
        <el-button type="success" @click="participate">我要参加</el-button>
      </div>
    </el-col>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      journalInfo:{
        journalName:"",
      },



    };
  },
  computed: {
    getname() {
      return this.$route.query.name;
    },},
  created() {
    this.view_journals();
  },
  methods: {
    async handleFollow() {
      // Add your follow logic here
      const params = new URLSearchParams();
      params.append("journalName",  this.getname);
      console.log(params.toString());

      const  {data:responses} = await axios.post("/api/user/focusJournal",params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      );
      if (responses.code === 1)this.$message.success('期刊不存在');
      else if(responses.code === 0)this.$message.success('关注成功');
      console.log(responses);



    },
    async participate() {
      // Add your participate logic here
      this.$message.success('参加成功');
      const params = new URLSearchParams();
      params.append("journalName", name);

      const {code: responses} = await axios.post("/api/user/focusJournal", params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      );
      console.log(responses);
      console.log("test");
      this.$message.success('参加成功');
    },
    async view_journals(){
      const params = new URLSearchParams();
      params.append("journalName",  this.getname);
      const  {data:responses} = await axios.post("/api/user/viewJournal",params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      );

    }
  }
};
</script>





