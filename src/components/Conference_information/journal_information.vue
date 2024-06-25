<!--<template>-->
<!--  <div>-->
<!--    <h1>详细信息</h1>-->
<!--    <p>这里是 名字 为 {{ name }} 的项目的详细信息。</p>-->
<!--    &lt;!&ndash; 根据实际情况显示详细信息 &ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="conference-information">
    <h1>{{ name }}</h1>
    <a :href="url" target="_blank">{{ url }}</a>
    <p>截稿日期: {{ deadline }}</p>
    <p>issue: {{ issue }}</p>
    <p>影响因子: {{ ifactor }}</p>
    <p>出版社: {{ publisher }}</p>
    <p>浏览量: {{ viewCount }}</p>
    <div>
      <span>CCF: {{ ccf }}</span>
    </div>
    <el-button type="primary" @click="handleFollow">我要关注</el-button>
    <el-button type="success" @click="participate">我要参加</el-button>
    <el-button type="warn" v-if="this.flag === 1" @click="update">我要修改</el-button>
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
