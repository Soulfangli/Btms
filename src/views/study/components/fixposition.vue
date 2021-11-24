<template>
  <div class="container">
    <el-container class="container_top">
      <el-main>
        <el-col :span="24">
          <el-button type="text" class="back" @click="close()"
            ><i class="iconfont">&#xe698;</i> 返回</el-button
          >
          <span
            class="title"
            style="margin-left: 40%; font-weight: 700; font-size: 18.72px"
            >{{ this.datalist.title }}职位</span
          >
        </el-col>
        <div style="margin: 24px">
          <el-form
            ref="form"
            :model="dialogData"
            :rules="rules"
            label-width="80px"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="职位名称"
                  label-width="80px"
                  prop="positionName"
                >
                  <el-input
                    v-model="dialogData.positionName"
                    placeholder="请输入职位名称"
                    size="medium"
                    maxlength="10"
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="所属部门"
                  size="normal"
                  prop="departmentId"
                >
                  <el-cascader
                    v-model="dialogData.departmentId"
                    :options="departmentlist"
                    :props="departmentProps"
                    :show-all-levels="false"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="说明：" label-width="80px">
                  <el-input
                    v-model="dialogData.remark"
                    type="textarea"
                    class="flex1"
                    maxlength="200"
                    placeholder="请输入"
                  ></el-input>
                  <span
                    class="xianzhi"
                    v-if="dialogData.remark && dialogData.remark.length > 0"
                    >{{ dialogData.remark.length }}/200</span
                  >
                  <span class="xianzhi" v-else>0/200</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-main>
    </el-container>
    <el-container class="container_bottom">
      <el-main>
        <treeModule
          :prop-data="searchForm"
          @checkedObj="checkedObj"
          @getdefaultCheckedKeys="getdefaultCheckedKeys"
        ></treeModule>
        <el-row type="flex" justify="center" class="hcenter">
          <el-button class="btn-close" plain @click="close()">关 闭</el-button>
          <el-button class="btn-save" type="primary" @click="onSubmit('form')"
            >提交</el-button
          >
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import treeModule from "@/components/treeModule";
export default {
  props: ["datalist"],
  components: {
    treeModule
  },
  data() {
    return {
      dialogData: {
        position: "", // 姓名
        education: "", // 学历
        other: "", // 其他荣誉称号
        headImageUrl: "", // 头像url
        headImageUrlList: []
      },
      departmentlist: [],
      departmentProps: {
        value: "id",
        label: "departmentName",
        emitPath: false,
        children: "subDepartment",
        checkStrictly: true
      },
      optionObj: {},

      rules: {
        name: { required: true, message: "请输入姓名", trigger: "blur" }
      },
      treeData: [],
      inputDisabled: false,
      searchForm: {
        show: false, //查询按钮不展示
        reset: false, //重置按钮不展示
        disabled: false, // 复选框可多选--选中
        showCheckbox: true, // 是否展示复选框
        showOpenBtn: true, // 是否需要 展开收起按钮
        isdrag: false, //可拖拽
        treeSearchType: "localFilter",
        searchFormItemArr: [], // 搜索条件
        titleArray: [{ title: "模块及菜单" }], // 树状的标题
        treeData: [], //树状的内容
        defaultProps: {
          children: "permissionSubmenu",
          label: "aliasName"
        },
        defaultChecked: [] //当前选中的
      },
      rules: {
        positionName: [{ required: true, message: "请输入", trigger: "blur" }],
        departmentId: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  created() {
    this.init();
  },
  mounted() {
    //获取树状数据
    this.setTreeData();
  },
  methods: {
    init() {
      if (this.datalist.title == "修改") {
        //查询接口id，返回数据
        let mocklist = [
          {
            aliasName: "通知管理",
            code: 0,
            groupCode: 73000,
            iconUrl: "",
            id: 407,
            operationId: 0,
            operationSort: 0,
            operatorCodeValue: 0,
            parentId: 0,
            permissionSubmenu: [
              {
                aliasName: "我的发布",
                code: 0,
                groupCode: 73002,
                iconUrl: "",
                id: 410,
                operationId: 0,
                operationSort: 0,
                operatorCodeValue: 31,
                parentId: 206
              }
            ]
          }
        ];

        let datalist = {
          departmentId: 44,
          departmentName: "前端开发部",
          id: 34,
          positionName: "www",
          remark: "打打",
          roleId: 142,
          permissions: [
            410 //根节点id
            // 411,
            // 412
          ]
        };
        this.dialogData = datalist;
        this.searchForm.defaultChecked = datalist.permissions;
        // let params = { id: this.datalist.id }
        // getPositionById(params)
        //     .then((res) => {
        //         if (res.code === 0) {
        //             this.dialogData = res.data
        //             this.searchForm.defaultChecked = res.data.permissions
        //         }
        //     })
        //     .finally(() => {})
      }
      //   //所属部门的下拉接口
      //   queryCurDepartmentAndSub()
      //     .then(res => {
      //       let datalist = [];
      //       datalist.push(res.data);
      //       this.isdeletefn(datalist);
      //       this.departmentlist = datalist ? datalist : [];
      //     })
      //     .finally(() => {});
    },
    //去除空余数组
    isdeletefn(arr) {
      if (arr) {
        arr.forEach(item => {
          if (item.subDepartment == "") {
            delete item.subDepartment;
          }
          this.isdeletefn(item.subDepartment);
        });
      }
    },
    // 消除空值
    wipeNovalue(data, key) {
      for (const it of data) {
        if (it[key] && it[key].length == 0) {
          it[key] = undefined;
        } else if (it[key] && it[key].length > 0) {
          this.wipeNovalue(it[key], key);
        }
      }
      return data;
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let params = this.dialogData;
          console.log("params:", params);
          //   const tips = this.dialogData.id ? "修改成功！" : "新增成功！";
          //   const fn = this.dialogData.id ? updatePosition : addPosition;
          //   fn(params)
          //     .then(res => {
          //       if (res.code === 0) {
          //         this.$message.success(tips);
          //         this.$emit("update");
          //         this.close(1);
          //       }
          //     })
          //     .finally(() => {
          //       this.submitLoading = false;
          //     });
        }
      });
    },
    //获取树状数据
    setTreeData() {
      //mock树状数据
      let datalist = [
        {
          aliasName: "通知管理",
          code: 0,
          groupCode: 73000,
          iconUrl: "",
          id: 407,
          operationId: 0,
          operationSort: 0,
          operatorCodeValue: 0,
          parentId: 0,
          permissionSubmenu: [
            {
              aliasName: "我的发布",
              code: 0,
              groupCode: 73002,
              iconUrl: "",
              id: 410,
              operationId: 0,
              operationSort: 0,
              operatorCodeValue: 31,
              parentId: 206,
              permissionSubmenu: [
                {
                  aliasName: "我的发布:查询，查看",
                  code: 1,
                  groupCode: 73002,
                  id: 411,
                  operationId: 366,
                  operationSort: 0,
                  parentId: 208,
                  permissionType: 4,
                  platform: 1,
                  resourceId: 208
                },
                {
                  aliasName: "我的发布:新增",
                  code: 2,
                  groupCode: 73002,
                  id: 412,
                  operationId: 367,
                  operationSort: 0,
                  parentId: 208,
                  permissionType: 4,
                  platform: 1,
                  resourceId: 208
                },
                {
                  aliasName: "我的发布:编辑",
                  code: 4,
                  groupCode: 73002,
                  id: 413,
                  operationId: 368,
                  operationSort: 0,
                  parentId: 208,
                  permissionType: 4,
                  platform: 1,
                  resourceId: 208
                }
              ]
            }
          ]
        },
        {
          aliasName: "斑斑运营",
          code: 0,
          groupCode: 80000,
          iconUrl: "",
          id: 438,
          operationId: 0,
          operationSort: 0,
          operatorCodeValue: 0,
          parentId: 0,
          permissionSubmenu: [
            {
              aliasName: "订单管理",
              code: 0,
              groupCode: 80001,
              iconUrl: "coins",
              id: 440,
              operationId: 0,
              operationSort: 0,
              operatorCodeValue: 0,
              parentId: 217,
              permissionSubmenu: [
                {
                  aliasName: "订单管理",
                  code: 0,
                  groupCode: 80002,
                  iconUrl: "coins",
                  id: 441,
                  operationId: 0,
                  operationSort: 0,
                  operatorCodeValue: 0,
                  parentId: 219,
                  permissionSubmenu: [
                    {
                      aliasName: "学费缴费订单",
                      code: 0,
                      groupCode: 80003,
                      iconUrl: "",
                      id: 442,
                      operationId: 0,
                      operationSort: 0,
                      operatorCodeValue: 0,
                      parentId: 220,
                      permissionSubmenu: [
                        {
                          aliasName: "全部",
                          code: 0,
                          groupCode: 80005,
                          iconUrl: "file-powerpoint",
                          id: 446,
                          operationId: 0,
                          operationSort: 0,
                          operatorCodeValue: 2,
                          parentId: 221,
                          permissionSubmenu: [
                            {
                              aliasName: "详情",
                              code: 2,
                              groupCode: 80005,
                              id: 448,
                              operationId: 387,
                              operationSort: 0,
                              operationUrl: "allOrder-detail",
                              parentId: 223,
                              permissionType: 4,
                              platform: 3,
                              resourceId: 223
                            }
                          ]
                        },
                        {
                          aliasName: "待签合同",
                          code: 0,
                          groupCode: 80004,
                          iconUrl: "file-powerpoint",
                          id: 443,
                          operationId: 0,
                          operationSort: 0,
                          operatorCodeValue: 3,
                          parentId: 221
                        }
                      ]
                    },
                    {
                      aliasName: "学时缴费订单",
                      code: 0,
                      groupCode: 80007,
                      iconUrl: "file-powerpoint",
                      id: 452,
                      operationId: 0,
                      operationSort: 0,
                      operatorCodeValue: 31,
                      parentId: 220,
                      permissionSubmenu: [
                        {
                          aliasName: "激活",
                          code: 1,
                          groupCode: 80007,
                          id: 453,
                          operationId: 390,
                          operationSort: 0,
                          operationUrl: "timePay-active",
                          parentId: 225,
                          permissionType: 4,
                          platform: 3,
                          resourceId: 225
                        },
                        {
                          aliasName: "激活(已支付/未激活)订单",
                          code: 2,
                          groupCode: 80007,
                          id: 454,
                          operationId: 391,
                          operationSort: 0,
                          operationUrl: "timePay-other",
                          parentId: 225,
                          permissionType: 4,
                          platform: 3,
                          resourceId: 225
                        },
                        {
                          aliasName: "列表查询",
                          code: 4,
                          groupCode: 80007,
                          id: 455,
                          operationId: 392,
                          operationSort: 0,
                          operationUrl: "timePay-list",
                          parentId: 225,
                          permissionType: 4,
                          platform: 3,
                          resourceId: 225
                        }
                      ]
                    }
                  ]
                },
                {
                  aliasName: "内容管理",
                  code: 0,
                  groupCode: 80008,
                  iconUrl: "book",
                  id: 458,
                  operationId: 0,
                  operationSort: 0,
                  operatorCodeValue: 0,
                  parentId: 217,
                  permissionSubmenu: [
                    {
                      aliasName: "题库管理",
                      code: 0,
                      groupCode: 80009,
                      iconUrl: "book",
                      id: 459,
                      operationId: 0,
                      operationSort: 0,
                      operatorCodeValue: 0,
                      parentId: 226,
                      permissionSubmenu: [
                        {
                          aliasName: "语音",
                          code: 0,
                          groupCode: 80011,
                          iconUrl: "microphone-alt",
                          id: 466,
                          operationId: 0,
                          operationSort: 0,
                          operatorCodeValue: 0,
                          parentId: 227
                        }
                      ]
                    }
                  ]
                },
                {
                  aliasName: "系统设置",
                  code: 0,
                  groupCode: 80034,
                  iconUrl: "cog",
                  id: 561,
                  operationId: 0,
                  operationSort: 0,
                  operatorCodeValue: 0,
                  parentId: 217,
                  permissionSubmenu: [
                    {
                      aliasName: "系统设置",
                      code: 0,
                      groupCode: 80035,
                      iconUrl: "cog",
                      id: 562,
                      operationId: 0,
                      operationSort: 0,
                      operatorCodeValue: 0,
                      parentId: 252
                    }
                  ]
                },
                {
                  aliasName: "用户管理",
                  code: 0,
                  groupCode: 80051,
                  iconUrl: "user-cog",
                  id: 646,
                  operationId: 0,
                  operationSort: 0,
                  operatorCodeValue: 0,
                  parentId: 217,
                  permissionSubmenu: [
                    {
                      aliasName: "用户管理",
                      code: 0,
                      groupCode: 80052,
                      iconUrl: "user-cog",
                      id: 647,
                      operationId: 0,
                      operationSort: 0,
                      operatorCodeValue: 0,
                      parentId: 269,
                      permissionSubmenu:[
                        {}
                      ]
                    }
                  ]
                },
                {
                  aliasName: "统计",
                  code: 0,
                  groupCode: 80056,
                  iconUrl: "table",
                  id: 659,
                  operationId: 0,
                  operationSort: 0,
                  operatorCodeValue: 0,
                  parentId: 217,
                  permissionSubmenu: [
                    {
                      aliasName: "计时统计",
                      code: 0,
                      groupCode: 80057,
                      iconUrl: "table",
                      id: 660,
                      operationId: 0,
                      operationSort: 0,
                      operatorCodeValue: 0,
                      parentId: 274
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];
      this.searchForm.treeData = datalist;
      //   queryMemberPermission()
      //     .then(res => {
      //       if (res.code === 0) {
      //         this.searchForm.treeData = res.data;
      //       }
      //     })
      //     .finally(() => {});
    },
    /**
     * 初始赋值 默认勾选的keys后，获取树组件中相关的勾选值、最后叶子节点勾选的值、半选的值
     */
    getdefaultCheckedKeys(defaultCheckedKeys) {
      // console.log(defaultCheckedKeys)
      this.dialogData.permissions = [
        ...defaultCheckedKeys.checkedKeys,
        ...defaultCheckedKeys.halfCheckedKeys
      ];
    },
    //修改树状数据时，调用
    checkedObj(checkedObj) {
      this.dialogData.permissions = [
        ...checkedObj.checkedKeys,
        ...checkedObj.halfCheckedKeys
      ];
    },
    //关闭
    close(index = null) {
      this.$emit("close", index);
    }
  }
};
</script>
<style lang="scss" scoped>
.container_top {
  padding: 20px 20px 0;
  border-bottom: 10px solid #f9f9f9;
}
.container_bottom {
  border-bottom: 10px solid #f9f9f9;
}
.title {
  text-align: center;
}
.container {
  margin: 0;
}
.el-main {
  padding: 25px;
  .el-col-24 {
    height: 60px;
  }
}
.flex1 {
  width: 95% !important;
  height: 140px !important;
}
::v-deep .el-textarea__inner {
  height: 140px !important;
  min-height: 140px !important;
}
.xianzhi {
  position: absolute;
  bottom: 0;
  right: 70px;
}
</style>
