<!--
    动态组件 通过 
        is=“组件模块” 绑定组件模块
        :prop-data="searchForm" 绑定数据，传参数据
-->

<template>
  <div>
    <tableContent
      v-show="showModule=='list'"
      :prop-data="searchForm"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
    <component 
        :is="componentName" 
        :propData="propData" 
        @close="closeComponent"
    />
  </div>
</template>
<script>
import { tableContent} from "@/components";
import AuditLog from '../study/components/AuditLog.vue'

export default {
  name: "day1",
  components: { tableContent , AuditLog},
  data() {
    return {
      time: Date.now(),
      dialogVisible: false,
      showModule: "list", // 控制显示隐藏列表
      componentName: '',  // 控制渲染那个子组件
      propData:{
            title: '信息查看',
            type: 'see', // 操作类型
            from: 'list', // 从哪里过去的，传组件名
      },
      formData: {},
      //主页表格数据展示
      searchForm: {
        show: true,
        reset: true,
        showFormItemNum: 3,
        searchLabelwidth: "120px",
        pageinfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        searchFormItemArr: [
          {
            elementType: "input",
            label: "员工姓名",
            key: "name",
            value: "",
            placeholder: "请输入员工姓名",
            span: 6,
          },
          {
            elementType: "input",
            label: "手机号",
            key: "phone",
            value: "",
            placeholder: "请输入手机号",
            span: 6,
          },
        ],
        table: {
          head: [],
          body: [],
          type: "selection",
          btns: [],
          options: {
            hidden: false,
            width: 180,
            render(h, params) {},
            btnList: [
              {
                label: "修改",
                func: "update",
                type: "text",
                inquiry: false,
              },
              {
                label: "删除",
                func: "delete",
                type: "text",
                color: "#F4333C",
                inquiry: true,
                msg: "确定删除此员工？",
              },
            ],
          },
        },
      },
     
      tableData: [],
    };
  },
  mounted() {
    this.setTableHead();
    this.search();
    this.searchOptions();
  },
  methods: {
    /**
     * 设置表头
     */
    setTableHead() {
      const head = [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "phone",
          label: "手机",
        },
        {
          prop: "positionName",
          label: "职位",
        },
        {
          prop: "departmentName",
          label: "部门",
        },
        {
          prop: "statusText",
          label: "账号状态",
        },
        {
          prop: "lastLoginTime",
          label: "最新登录时间",
        },
        {
          prop: "createdName",
          label: "创建人",
        },
        {
          prop: "createdTime",
          label: "创建时间",
        },
      ];
      this.searchForm.table.head = head;
    },
    search() {
      this.setTableBody();
    },
    setTableBody() {
      let data = [
        {
          createdName: "马丁的企业端",
          createdTime: "2021-09-26 18:06:44",
          departmentName: "监管端部门根节点",
          isAdmin: 1,
          isAdminText: "是",
          isPosition: 1,
          lastLoginTime: "2021-10-12",
          name: "系统管理员",
          phone: "13911111111",
          positionId: 2,
          positionName: "管理员",
          sex: 0,
          statusText: "启用",
          id: 0
        },
        {
          createdName: "马丁的企业端",
          createdTime: "2021-09-23",
          departmentName: "监管端部门根节点",
          isAdmin: 1,
          isAdminText: "是",
          isPosition: 1,
          isPositionText: "是",
          lastLoginTime: null,
          name: "系统管理员",
          phone: "13922222222",
          positionId: 2,
          positionName: "管理员",
          sex: 0,
          statusText: "启用",
          id: 1
        },
      ];
      let total = 2;
      this.searchForm.table.body = data;
      this.searchForm.pageinfo.total = total;
      //手动添加字段和属性值
      if (this.searchForm.table.body != "") {
        this.searchForm.table.body.forEach((items) => {
          items.isPosition == 1
            ? this.$set(items, "isPositionText", "是")
            : this.$set(items, "isPositionText", "否");
        });
      }
    },
    searchOptions() {},
    /**
         重置搜索
         */
    resetSearch() {
      for (const it of this.searchForm.searchFormItemArr) {
        it.value = "";
      }
      this.search();
    },
    // 切换table
    handleCurrentChange(currentPage) {
      this.searchForm.pageinfo.currentPage = currentPage;
      this.setTableBody();
    },
    // 切换每个页面的数量
    handleSizeChange(pageSize) {
      this.searchForm.pageinfo.pageSize = pageSize;
      this.setTableBody();
    },
    /**
     * 列表操作
     */
    optionBtnClick(row, btn) {
      switch (btn.func) {
        case "update":
          this.updateStaff(btn.label, row)
          break;
        case "delete":
          this.deleteStaff(row)
          break;
        default:
          break;
      }
    },
    deleteStaff(row){
        //过滤删除
        this.searchForm.table.body = this.searchForm.table.body.filter(item => item.id===row.id )
    },
    //动态组件，编辑时调用
    updateStaff(row){
       this.propData = {
                title: '审核历史',
                type: 'see', // 操作类型
                from: 'list', // 从哪里过去的，传组件名
                bizType: [1,3],
                id: row.id,
                companyId: row.companyId,
                driverSchoolId: row.driverSchoolId
            }
            this.showModule = ''
            this.componentName = 'AuditLog'
    },
    // 关闭组件，回到列表 或 上级组件
    closeComponent(index, emitData) {
        if(emitData.from == 'list'){
            // 1 回到列表要刷新列表
            if (index==1) {
                this.setTableBody()
            }
            this.componentName = ''
            this.showModule = 'list'
        }else{
            emitData.title = {'AuditLog':'审核历史'}[emitData.from]
            this.propData = emitData
            this.showModule = ''
            this.componentName = emitData.from
        }
    },
     /**
     * 查看审核历史明细
     */
    // auditDetail(row) {
    //     this.propData = {
    //         title: '历史查看',
    //         type: 'see', // 操作类型
    //         from: 'AuditLog', // 从哪里过去的，传组件名
    //         bizType: [row.bizType],
    //         id: row.id, // 审核历史id
    //         companyId: this.propData.companyId, // 用原来进入审核历史时候的传参，返回历史列表要用
    //         driverSchoolId: this.propData.driverSchoolId // 用原来进入审核历史时候的传参，返回历史列表要用
    //     }
    //     this.showModule = ''
    //     this.componentName = 'InfoHandle'
    // },
    //关闭弹窗
    bindClosed() {
      this.time = Date.now();
      this.search();
    },
  },
};
</script>




<style lang='scss' scoped>
</style>