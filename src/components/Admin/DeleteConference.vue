<template>
  <el-container class="home-container">
    <el-table
        :data="conferences_focus"
        height="520"
        border
        style="width: 100%; font-size: 14px"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        id="pdfDom"
        :default-sort="{ prop: 'message_date', order: 'ascending' }"
        stripe
    >

      <el-table-column
          prop="id"
          label="#"
          sortable
      ></el-table-column>
      <el-table-column prop="ccf" label="CCF"></el-table-column>
      <el-table-column label="全称">
        <template v-slot="{ row }">
          <router-link :to="{ name: 'conference_information', query: { name: row.name } }">
            {{ row.name }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column prop="core" label="CORE"></el-table-column>
      <el-table-column prop="qualis" label="QULIS"></el-table-column>

      <el-table-column prop="deadline" label="截稿日期"></el-table-column>
      <el-table-column prop="notifation" label="通知日期"></el-table-column>
      <el-table-column prop="meeting" label="会议日期"></el-table-column>
      <el-table-column prop="address" label="会议地址"></el-table-column>
      <el-table-column prop="session" label="届"></el-table-column>
      <el-table-column prop="viewCount" label="浏览量"></el-table-column>
      <el-table-column label="取消关注">
        <template v-slot:="scope">
          <el-button @click="DeleteConference(scope.$index, scope.row.name)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-container>

</template>

<script>
import axios from "axios";
import {MessageBox} from "element-ui";

export default {
  inject:['reload'],
  data() {
    return {
      conferences_focus: [],
    };
  },
  created() {
    this.coferencebyfocus();
  },
  methods: {
    async coferencebyfocus()
    {
      const {data:data} = await axios.get("/api/conference/conferenceRankedByFocus");
      this.conferences_focus=data.data;
      this.conferences=data.data;
      this.loading=false;
      console.log(data.data);

    },
    async DeleteConference(index,name){
      MessageBox.confirm(`确定删除会议 ${name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = new URLSearchParams();
        params.append("name", name);

        const {data: information} = await axios.post("/api/admin/deleteConference",params,{
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // },
        });
        console.log(information);
        this.reload();
        this.$message.success("删除成功");
        this.getviewconference();
      }).catch(() => {
        // 点击取消，什么也不做
      });

    },

    fullScreen(){
      // Dom对象的一个属性: 可以用来判断当前是否为全屏模式(trueORfalse)
      let full = document.fullscreenElement;
      // 切换为全屏模式
      if(!full){
        // 文档根节点的方法requestFullscreen实现全屏模式
        document.documentElement.requestFullscreen();
      }else{
        // 退出全屏模式
        document.exitFullscreen();
      }
    }
  }
}

</script>