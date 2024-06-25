<template>
  <div class="conference-information">
    <h1>{{ name }}</h1>
    <a :href="url" target="_blank" class="conference-link">{{ url }}</a>
    <p class="conference-detail">截稿日期: <span>{{ deadline }}</span></p>
    <p class="conference-detail">Issue: <span>{{ issue }}</span></p>
    <p class="conference-detail">影响因子: <span>{{ ifactor }}</span></p>
    <p class="conference-detail">出版社: <span>{{ publisher }}</span></p>
    <p class="conference-detail" v-if="viewCount !== null && viewCount !== undefined">浏览量: <span class="tag">{{ viewCount }}</span></p>
    <div class="conference-ccf">
      <span class="tag">CCF: {{ ccf }}</span>
    </div>
    <el-button type="primary" @click="handleFollow">我要关注</el-button>
    <!-- <el-button type="success" @click="participate">我要参加</el-button> -->
    <el-button type="warn" v-if="flag === 1" @click="update">我要修改</el-button>
  </div>
</template>

<style scoped>
.conference-information {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  max-width: 1200px; /* Increased width */
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.conference-link {
  display: block;
  font-size: 1rem;
  color: #1e90ff;
  text-decoration: none;
  margin-bottom: 20px;
  word-break: break-all;
}

.conference-link:hover {
  text-decoration: underline;
}

.conference-detail {
  font-size: 1.1rem;
  color: #555;
  margin: 5px 0;
}

.conference-detail span {
  font-weight: bold;
}

.conference-ccf {
  margin: 15px 0;
  font-size: 1.1rem;
  color: #333;
}

.tag {
  display: inline-block;
  background-color: #eef;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
}

.el-button {
  margin-top: 20px;
}

.el-button[type="primary"] {
  background-color: #409eff;
  border-color: #409eff;
  color: white;
}

.el-button[type="warn"] {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
}
</style>


<script>
import axios from "axios";

export default {
  data() {
    return {
      journalInfo:{
        journalName:"",
      },
      flag:0,
      name: this.$route.query.name,
      deadline: this.$route.query.deadline,
      issue: this.$route.query.issue,
      ccf: this.$route.query.ccf,
      ifactor: this.$route.query.ifactor,
      publisher: this.$route.query.publisher,
      viewCount: this.$route.query.viewCount,


    };
  },
  computed: {
    getname() {
      return this.$route.query.name;
    },},
  created() {
    this.view_journals();
    const Admin=localStorage.getItem('isAdmin');
    this.flag=parseInt(Admin)
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

    },
    async update() {
      this.$router.push(
          {
            path: "/top_menu/AdminManage/xiugaiJournal",
            query: {
              name: this.getname,
            },

          }
      );
    },
  },
};
</script>


