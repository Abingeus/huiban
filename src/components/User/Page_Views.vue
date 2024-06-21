
<template>
  <el-container>
    <el-main>
      <div class="table-container">
        <el-row style="margin-bottom: 10px;">
          <el-col :span="24">
            <div>姓名: </div>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px;">
          <el-col :span="24">
            <div>电子邮件:</div>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px;">
          <el-col :span="24">
            <div>科研机构:</div>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px;">
          <el-col :span="24">
            <div>注册时间:</div>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px;">
          <el-col :span="24">
            <div>活跃度: </div>
          </el-col>
        </el-row>



        <el-table :data="conferences" border class="table-container">
          <el-table-column prop="ccf" label="CCF"></el-table-column>
          <el-table-column prop="core" label="CORE"></el-table-column>
          <el-table-column prop="qualis" label="QUALIS"></el-table-column>
          <el-table-column prop="shortName" label="简称"></el-table-column>
          <el-table-column prop="fullName" label="全称"></el-table-column>
          <el-table-column prop="deadline" label="截稿日期"></el-table-column>
          <el-table-column prop="notification" label="通知日期"></el-table-column>
          <el-table-column prop="conferenceDate" label="会议日期"></el-table-column>
        </el-table>

        <div class="table-container">
          <h2 style="display: inline-block; margin-right: 10px;">关注的期刊</h2>
          <el-table :data="journals" border style="display: inline-block; vertical-align: top;">
            <el-table-column prop="ccf" label="CCF"></el-table-column>
            <el-table-column prop="fullName" label="全称"></el-table-column>
            <el-table-column prop="impactFactor" label="影响因子"></el-table-column>
            <el-table-column prop="publisher" label="出版商"></el-table-column>
            <el-table-column prop="issn" label="ISSN"></el-table-column>
          </el-table>
        </div>


        <h2>关注的科研人员</h2>
        <el-table :data="researchers" border class="table-container">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="institution" label="科研机构"></el-table-column>
          <el-table-column prop="registrationDate" label="注册时间"></el-table-column>
          <el-table-column prop="activity" label="活跃度"></el-table-column>
        </el-table>

        <h2>关注的职位</h2>
        <el-table :data="positions" border class="table-container">
          <el-table-column prop="title" label="职位名称"></el-table-column>
          <el-table-column prop="employer" label="雇主"></el-table-column>
          <el-table-column prop="location" label="职位地点"></el-table-column>
        </el-table>

        <h2>浏览的会议</h2>
        <el-table :data="browsedConferences" border class="table-container">
          <el-table-column prop="ccf" label="CCF"></el-table-column>
          <el-table-column prop="core" label="CORE"></el-table-column>
          <el-table-column prop="qualis" label="QUALIS"></el-table-column>
          <el-table-column prop="shortName" label="简称"></el-table-column>
          <el-table-column prop="fullName" label="全称"></el-table-column>
          <el-table-column prop="deadline" label="截稿日期"></el-table-column>
          <el-table-column prop="notification" label="通知日期"></el-table-column>
          <el-table-column prop="conferenceDate" label="会议日期"></el-table-column>
        </el-table>

        <h2>浏览的期刊</h2>
        <el-table :data="browsedJournals" border class="table-container">
          <el-table-column prop="ccf" label="CCF"></el-table-column>
          <el-table-column prop="fullName" label="全称"></el-table-column>
          <el-table-column prop="impactFactor" label="影响因子"></el-table-column>
          <el-table-column prop="publisher" label="出版商"></el-table-column>
          <el-table-column prop="issn" label="ISSN"></el-table-column>
        </el-table>
      </div>
      <!-- 路由占位符 -->
      <!--        <router-view></router-view>-->
      <div style="text-align: center;" class="table-container">
        <el-popover placement="top-start" :width="150" trigger="hover">
          <p slot="reference"> Copyright © 2011-2024 myhuiban.com. All Rights Reserved<br /> </p>
          <img
              src="https://pic.yupi.icu/5563/202312061315664.png"
              style="height: 100px; width: 100px"
          />
        </el-popover>
        <a href="https://beian.miit.gov.cn">project |</a>
        <a href="https://beian.mps.gov.cn/#/query/webSearch">
          <img
              src="https://xxx.xiaobaitiao.icu/img/icu/202312211243636.png"
              style="height: 16px; width: 16px; margin: 5px 0px 0px 5px"
          />
          浙公网安备33028202001002号
        </a>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>