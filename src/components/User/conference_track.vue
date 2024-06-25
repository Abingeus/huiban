<script setup>

</script>

<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-main>

      <el-row>
        <el-col :span="10"
        >CCF1111111111111: Conference Rank (A, B, C) from China Computer Federation (2022)
        </el-col>

        <el-col :span="20"
        >CORE: Conference Rank (A*, A, B, C) from Computing Research and Education Association of Australasia (2020)
        </el-col>

        <el-col :span="30"
        >QUALIS: Conference Rank (A1, A2, B1, B2, B3, B4, B5) from Brazilian Classification System for Conferences and Journals (2016)
        </el-col>





        <el-col :span="2" style="float: right">
          <el-button
              type="success"
              class="el-icon-full-screen"
              size="mini"
              @click="fullScreen"
          >全屏
          </el-button>
        </el-col>
      </el-row>
      <!-- 页面主体区域 -->
      <el-table
          :data="tableData"
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
            prop="message_number"
            label="#"
            sortable
        ></el-table-column>
        <el-table-column prop="CCF" label="CCF"></el-table-column>
        <el-table-column prop="CORE" label="CORE"></el-table-column>
        <el-table-column prop="QUALIS" label="QUALIS"></el-table-column>
        <el-table-column prop="Abbreviation" label="简称"></el-table-column>
        <el-table-column prop="full_name" label="全称"></el-table-column>
        <el-table-column prop="conference_date" label="会议日期"></el-table-column>
        <el-table-column prop="conference_location" label="会议地点"></el-table-column>
        <el-table-column prop="sessions" label="届数"></el-table-column>
        <el-table-column prop="Browse" label="浏览"></el-table-column>
      </el-table>
    </el-main>

  </el-container>
</template>

<style scoped>

</style>