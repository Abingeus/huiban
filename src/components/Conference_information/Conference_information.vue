

<!--<template>-->
<!--  <div class="conference-layout">-->

<!--      <el-col :span="20">-->
<!--        <el-card>-->
<!--          <p>这里是 会议名字 为 {{ this.getname }} 的项目的详细信息。</p>-->
<!--          <el-table border>-->
<!--            <el-table-column prop="label" label="Label" width="150"></el-table-column>-->
<!--            <el-table-column prop="value" label="Information"></el-table-column>-->
<!--          </el-table>-->
<!--        </el-card>-->
<!--      </el-col>-->


<!--      <el-col :span="4">-->
<!--        <div class="actions">-->
<!--          <el-button type="primary" @click="handleFollow">我要关注</el-button>-->
<!--          <el-button type="success" @click="participate">我要参加</el-button>-->
<!--          <el-button type="warn" v-if="this.flag===1" @click="update">我要修改</el-button>-->
<!--        </div>-->
<!--      </el-col>-->

<!--  </div>-->
<!--</template>-->
<template>
  <div class="conference-information">
    <h1>{{ name }}</h1>
    <a :href="url" target="_blank">{{ url }}</a>
    <p class="conference-detail"> 截稿日期: {{ deadline }}</p>
    <p class="conference-detail">通知日期: {{ notifation }}</p>
    <p class="conference-detail"> 会议日期: {{ meeting }}</p>
    <p class="conference-detail">会议地址: {{ address }}</p>
    <p class="conference-detail">届数: {{ session }}</p>
    <p class="conference-detail">浏览量: {{ viewCount }}</p>
    <div class="conference-ccf">
      <span class="tag">CCF: {{ ccf }}</span>
      <span class="tag">CORE: {{ core }}</span>
      <span class="tag">QULIS: {{ qualis }}</span>
    </div>
    <el-button type="primary" @click="handleFollow">我要关注</el-button>
    <el-button type="success" @click="participate">我要参加</el-button>
    <el-button type="warn" v-if="this.flag === 1" @click="update">我要修改</el-button>
    <el-button type="danger" v-if="this.flag === 1" @click="delete_conference">我要删除</el-button>
  </div>
</template>
<!--<template>-->
<!--  <el-container class="conference-information">-->
<!--    <el-row>-->
<!--      <el-col >-->
<!--        <h1>{{ name }}</h1>-->
<!--        <a :href="url" target="_blank">{{ url }}</a>-->
<!--        <p>截稿日期: {{ deadline }}</p>-->
<!--        <p>通知日期: {{ notifation }}</p>-->
<!--        <p>会议日期: {{ meeting }}</p>-->
<!--        <p>会议地址: {{ address }}</p>-->
<!--        <p>届: {{ session }}</p>-->
<!--        <p>浏览量: {{ viewCount }}</p>-->
<!--        <div>-->
<!--          <span>CCF: {{ ccf }}</span>-->
<!--          <span>CORE: {{ core }}</span>-->
<!--          <span>QULIS: {{ qualis }}</span>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row class="actions" >-->
<!--      <el-button type="primary" @click="handleFollow">我要关注</el-button>-->
<!--      <el-button type="success" @click="participate">我要参加</el-button>-->
<!--      <el-button type="warn" v-if="this.flag===1" @click="update">我要修改</el-button>-->
<!--    </el-row>-->
<!--  </el-container>-->
<!--</template>-->

<script>
import axios from "axios";

export default {
  data() {
    return {
      conferenceInfo:{
        conferenceName:"",
      },
      user: {
        userId: Number,
        cardNumber: Number,
        ruleNumber: Number,
        status: Number,
        cardName: "",
        username: "",
        password: "",
        createTime: "",
        updateTime: "",
        isAdmin:Number,
      },
      flag:0,
      name: this.$route.query.name,
      url: this.$route.query.url,
      deadline: this.$route.query.deadline,
      notifation: this.$route.query.notifation,
      meeting: this.$route.query.meeting,
      address: this.$route.query.address,
      session: this.$route.query.session,
      viewCount: this.$route.query.viewCount,
      ccf: this.$route.query.ccf,
      core: this.$route.query.core,
      qualis: this.$route.query.qualis,


    };
  },
  computed: {
    getname() {
      return this.$route.query.name;
    },},
  created() {
    this.view_conference();
    const Admin=localStorage.getItem('isAdmin');
    this.flag=parseInt(Admin)

  },
  methods: {
    async handleFollow() {
      // Add your follow logic here
      const params = new URLSearchParams();

      params.append("conferenceName",  this.getname);
      console.log(params.toString());

      const  {data:responses} = await axios.post("/api/user/focusConference",params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      );
      if (responses.code === 1)this.$message.success('会议不存在');
      else if(responses.code === 0)this.$message.success('关注成功');
      console.log(responses);



    },
    async participate() {
      // Add your participate logic here
      const params = new URLSearchParams();
      params.append("conferenceName", this.getname);

      const responses = await axios.post("/api/user/attendConference", params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      );
      console.log(responses.data);
      console.log("test");
      this.$message.success('参加成功');
    },
    async view_conference(){
      const params = new URLSearchParams();
      params.append("conferenceName",  this.getname);
      const  {data:responses} = await axios.post("/api/user/viewConference",params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      );

    },
    async update()
    {
      this.$router.push(
          {
            path:"/top_menu/AdminManage/ChangeConference",
            query:{
              name:this.getname,
              ccf: this.$route.query.ccf || '',
              core: this.$route.query.core || '',
              qualis: this.$route.query.qualis || '',
              deadline: this.$route.query.deadline || '',
              notifacation: this.$route.query.notifation || '',
              meeting: this.$route.query.meeting || '',
              address: this.$route.query.address || '',
              session: this.$route.query.session || '',

            },

          }
      );
    },
    async delete_conference()
    {
      const params = new URLSearchParams();
      params.append("name",  this.getname);
      const  {data:responses} = await axios.post("/api/admin/deleteConference",params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
      if(responses.code==0)
      {
        this.$message.success("删除成功");
        this.$router.go(-1);

      }
      else this.$message.error("删除失败");
    },
  }
};
</script>

<style scoped>
.conference-information {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  max-width: 1200px; /* Increased width */
  min-width: 500px;
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





