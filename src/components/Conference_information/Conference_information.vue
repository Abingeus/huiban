

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
    <p>截稿日期: {{ deadline }}</p>
    <p>通知日期: {{ notifation }}</p>
    <p>会议日期: {{ meeting }}</p>
    <p>会议地址: {{ address }}</p>
    <p>届数: {{ session }}</p>
    <p>浏览量: {{ viewCount }}</p>
    <div>
      <span>CCF: {{ ccf }}</span>
      <span>CORE: {{ core }}</span>
      <span>QULIS: {{ qualis }}</span>
    </div>
    <el-button type="primary" @click="handleFollow">我要关注</el-button>
    <el-button type="success" @click="participate">我要参加</el-button>
    <el-button type="warn" v-if="this.flag === 1" @click="update">我要修改</el-button>
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
            },

          }
      );
    }
  }
};
</script>

<style scoped>
.conference-information {
  text-align: center; /* 使所有文本居中对齐 */
  margin: 20px auto; /* 上下外边距 */
  padding: 20px; /* 内边距 */
  background-color: #fff; /* 背景颜色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  max-width: 1000px; /* 最大宽度 */
  min-width: 500px; /* 最大宽度 */
}

.conference-information a {
  display: block; /* 将链接显示为块级元素 */
  color: #3498db; /* 链接颜色 */
  margin-bottom: 10px; /* 底部外边距 */
  text-decoration: none; /* 去掉下划线 */
}

.conference-information a:hover {
  text-decoration: underline; /* 悬停时添加下划线 */
}

.conference-information p {
  margin: 5px 0; /* 上下外边距 */
}

.conference-information .el-button {
  margin: 10px 5px; /* 按钮间距 */
}
</style>





