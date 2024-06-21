<template>
  <div>
    <h1>详细信息</h1>
    <p>这里是 名字 为 {{ name }} 的项目的详细信息。</p>
    <!-- 根据实际情况显示详细信息 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$route.params.name
    };
  },
  created() {
    // 这里可以通过 id 请求后端获取详细信息
    // axios.get(`/api/details/${this.id}`).then(response => {
    //   this.details = response.data;
    // });
  }
};
</script>
