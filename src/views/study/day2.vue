<template>
  <div>
    <div class="left">
      <echartsModule
        class="left1"
        ref="option"
        style="width: 100%"
        height="300px"
        :options="option"
      />
    </div>
  </div>
</template>
<script>
import { echartsModule } from "@/components";
export default {
  components: { echartsModule },
  data() {
    return {
        option:{
             xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
                }
            ]
        }
    };
  },
  mounted() {
      console.log('111')
  },
  methods: {
    handelData(){
        
    }
  },
};
</script>

<style lang='scss' scoped>
</style>