<template>
  <div>
    <div>我是主页面</div>
    <echarts
      class="left1"
      ref="option"
      style="width: 100%"
      height="300px"
      :options="option"
    ></echarts>
  </div>
</template>
<script>
import { echarts } from "@/components";
export default {
  components: { echarts },

  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
