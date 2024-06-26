<template>
  <div class="search_container">
    <div class="breadcrumb-search-container">
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>图书查询</el-breadcrumb-item> -->
      </el-breadcrumb>

      <!-- 搜索框区域 -->
      <div class="search-box">
        <el-input
            v-model="searchQuery"
            placeholder="搜索..."
            prefix-icon="el-icon-search"
            clearable
            @keyup.enter.native="handleSearch"
        >
          <el-button slot="append" icon="el-icon-search" class="round-button" @click="handleSearch">搜索</el-button>
        </el-input>
      </div>
    </div>
    <el-card shadow="always">
      <!-- 搜索内容和导出区域 -->
      <el-row>
<!--        <el-col :span="6"-->
<!--          >条件搜索:-->
<!--          <el-select-->
<!--            v-model="queryInfo.condition"-->
<!--            filterable-->
<!--            placeholder="请选择"-->
<!--            style="margin-left: 15px"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-col>-->
<!--        <el-col :span="4">-->
<!--          <el-input-->
<!--            placeholder="请输入内容"-->
<!--            v-model="queryInfo.query"-->
<!--            class="input-with-select"-->
<!--            @keyup.enter.native="searchMessageByPage"-->
<!--          >-->
<!--            <el-button-->
<!--              slot="append"-->
<!--              icon="el-icon-search"-->
<!--              @click="searchMessageByPage"-->
<!--            ></el-button>-->
<!--          </el-input>-->
<!--        </el-col>-->
        <el-col :span="2" style="float: right">
          <download-excel
            class="export-excel-wrapper"
            :data="tableData"
            :fields="json_fields"
            :header="title"
            name="test.xls"
          >
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary" class="el-icon-printer" size="mini"
              >导出Excel
            </el-button>
          </download-excel>
        </el-col>
<!--        <el-col :span="2" style="float: right">-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            class="el-icon-printer"-->
<!--            size="mini"-->
<!--            @click="downLoad"-->
<!--            >导出PDF-->
<!--          </el-button>-->
<!--        </el-col>-->
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
      <!-- 表格区域 -->
      <el-table
        :data="currentTable"
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
        <el-table-column prop="time" label="消息日期"></el-table-column>
        <el-table-column prop="type" label="消息类型"></el-table-column>
<!--        <el-table-column prop="bookLibrary" label="分类"></el-table-column>-->
        <el-table-column prop="content" label="内容"></el-table-column>
        <!-- 添加自定义列 -->
        <el-table-column label="详细信息">
          <template #default="scope">
            <a href="javascript:;" @click="viewDetails(scope.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页查询区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryInfo.currentpage"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="this.queryInfo.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.queryInfo.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      currentTable:[],
      queryInfo: {
        pageNum: 7,
        currentpage: 1,
      },
      total: 0,
      searchQuery:"",

      loading: true,
    };
  },
  created() {
    this.getMessageByPage();
  },
  methods: {
    updateCurrentTableData_message() {
      const start = (this.queryInfo.currentpage - 1) * this.queryInfo.pageNum;
      const end = Math.min(start + this.queryInfo.pageNum, this.tableData.length);
      this.currentTable = this.tableData.slice(start, end);
      this.loading = false;
      console.log("longding1");
      console.log(this.loading1);
    },
    handleSizeChange(val) {
      this.queryInfo.pageNum = val;
      this.updateCurrentTableData_message();
    },
    handleCurrentChange(val) {
      this.queryInfo.currentpage = val;
      this.updateCurrentTableData_message();

    },
    async getMessageByPage() {
      this.loading = true;
      const { data: res } = await axios.get(
        "/api/message/getAllMessage",);
      this.tableData = [];
      if (res.code === 0) {
        this.tableData = res.data;
        this.queryInfo.total = this.tableData.length;
        this.updateCurrentTableData_message();
      }


    },
    downLoad() {
      this.getPdf(this.title); //参数是下载的pdf文件名
    },
    fullScreen() {
      // Dom对象的一个属性: 可以用来判断当前是否为全屏模式(trueORfalse)
      let full = document.fullscreenElement;
      // 切换为全屏模式
      if (!full) {
        // 文档根节点的方法requestFullscreen实现全屏模式
        document.documentElement.requestFullscreen();
      } else {
        // 退出全屏模式
        document.exitFullscreen();
      }
    },
  },
};
</script>

<style lang="css">
.breadcrumb-search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -17px; /* 根据需要调整 */
}

.breadcrumb-search-container .search-box {
  flex: 0 0 25%;
  position: relative;
}

.el-input {
  transition: box-shadow 0.3s ease;
}
.round-button {
  border-radius: 100px; /* 圆角半径，调整为你需要的大小 */
}

.el-input__inner {
  border-radius: 25px; /* 圆角边框 */
  border: 1px solid #ccc;
  padding: 5px 15px;
}

.el-input__inner:focus {
  border-color: #409EFF; /* 边框颜色 */
  box-shadow: 0 0 5px rgba(64, 158, 255, 0.5); /* 聚焦时的阴影效果 */
}

</style>