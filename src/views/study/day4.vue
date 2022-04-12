<template>
  <div>
    1111
    <!-- <button @click="addItem">Add</button>
    <ul ref="ul1">
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul> -->


    <!-- <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div> -->
    <!-- <el-form v-model="model">
      <el-form-item label="运费上调生效时间" prop="date">
      <el-date-picker
        v-model="model.date"
        type="datetimerange"
        value-format="yyyy-MM-dd HH"
        format="yyyy-MM-dd HH"
        popper-class="tpc"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-value="timeDefaultShow"
        :default-time="['00:00:00', '23:59:59']"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </el-form-item>
    </el-form> -->
     <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="search.date"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          :default-value="this.search.date"
          :picker-options="pickerOptions"
          range-separator="至">
        </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  components: {},
  data() {
    return {
      list: ["a", "b", "c"],
      model: { },
      search: {
        date:[],
        beginDate: '',
        endDate: '',
      },
      pickerOptions:{}
    };
  },
  created () {
      this.search.beginDate = '2012-12-1' //2012-12-1   handleTimeOld是我用来获取当月的第一天的
      this.search.endDate = '2012-12-2'
    },
    watch:{
			'search.beginDate'(val){
				console.log(val,'121');
			},
		},
  mounted() {
    // this.timeDefaultShow = '2021-01-10 12'
  },
  beforeMount(){
     this.search.date.push(this.search.beginDate) 
     this.search.date.push(this.search.endDate) 
  },
  methods: {

    hanleDate(){
      this.pickerOptions.unshift(this.startDate)
    },



    addItem() {
      this.list.push(Date.now());
      this.list.push(Date.now());
      this.list.push(Date.now());

      // 添加完想立刻获取长度, 不能及时拿到
      // 要用nextTick等渲染完了才能获取准确的dom个数
      this.$nextTick(() => {
        console.log(this.$refs.ul1.childNodes.length);
      });
    }
  },
};
</script>
<style scoped>
</style>
