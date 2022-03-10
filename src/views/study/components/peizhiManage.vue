<template>
  <div>
    <el-dialog
      :title="{'-1':'查看','0':'新增','1':'修改','2':'删除'}[handleType]"
      center
      width="800px"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      @close="close"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :rules="rules" ref="form" :model="form" v-if="dialogVisible" :label-width="formLabelWidth">
        <el-row :gutter="20" class="fz14 color-333">
          <el-col :span="12">
            <el-form-item label="配置名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入配置名称" :style="{width: formContentWidth}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="值类型" prop="dataType">
              <el-select v-model="form.dataType" placeholder="请选择值类型" :style="{width: formContentWidth}">
                <el-option
                  v-for="item in valuetype"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="fz14 color-333">
          <el-col :span="12">
            <el-form-item label="是否可扩展" prop="isExpand">
              <el-radio-group v-model="form.isExpand" size="medium">
                  <el-radio :label="0" >不可扩展</el-radio>
                  <el-radio :label="1" >可扩展</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item class="form-item-footer">
              <el-button class="close" @click="dialogVisible = false">关 闭</el-button>
              <el-button class="submit" type="primary" v-if="['0','1'].includes(handleType)" @click="onSubmit('form')">提 交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import validateRule from '@/utils/validateRule'
// import { queryConfigByGroups } from '@/api/common'
// import { getConfigGroupById, addConfigGroupInfo, updateConfigGroup } from '@/api/selfSetting'
export default {
    name: "manage",
    props: {
      
    },
    components:{},
    data() {
      return {
        handleType: '-1', // 操作类型，看'-1'、增'0'、改'1'、删'2' 等操作
        propdata: {},
        where: '',
        dialogVisible: false,
        valuetype: [], //值类型选项
        form: {
          name: "",
          dataType: "",
          isExpand: 0
        },
        rules: {
          dataType: [{ required: true, message: "请选择", trigger: ['blur', 'change'] }],
          isExpand: [{ required: true, message: "请选择", trigger: ['blur', 'change'] }],
          name: [{required: true, validator: (rule, value, callback) => validateRule.Str(rule, value, callback, '请输入'), trigger: "blur"}]
        },
        formLabelWidth: "110px",
        formContentWidth: "250px",
      }
    },
    methods: {
      /**
       * 关闭弹窗前
       */
      handleClose(done) {
        done();
      },
      // dialog关闭后的回调
      close(){
        // Object.assign(this.$data, this.$options.data())
        // this.$nextTick(()=>{
          this.$refs['form'].clearValidate()
          this.$refs['form'].resetFields()
        // })
      },
      // 获取搜索栏所有待选项数据
      searchOptions() {
        // queryConfigByGroups({ groupIds: this.groupIds }).then(res => {
        //   let options = res.data[this.paramsList['groupIds']['ONE_VALUE_TYPE']];
        //   for (const it of options) {
        //       it['label'] = it.text;
        //       it['value'] = Number(it.value);
        //   }
        //   this.valuetype = options;
        // })
        this.valuetype =  [
              {
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
             }
            ]
      },
      /**
       * 弹窗打开
       */
      open(type,row,where) {
        this.dialogVisible = true;
        this.handleType = type;
        this.propdata = row;
        this.where = where;
        // 请求选项
        this.searchOptions()
        if(['-1','1'].includes(this.handleType)){
          this.getDetails()
        }
      },
      getDetails() {
        // getConfigGroupById({id: this.propdata.id})
        //     .then(res => {
        //         if (res.code === 0) {
        //             this.form = res.data ? res.data : {}
        //         }
        //     })
      },
      /**
       * 提交表单
       */
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = JSON.parse(JSON.stringify(this.form));
            let apithis;
            // 新增
            if(this.handleType == '0'){
              apithis = addConfigGroupInfo
            }
            // 修改
            if(this.handleType == '1'){
              params['id'] = this.propdata.id
              apithis = updateConfigGroup
            }
            apithis(params).then(res => {
              if(res.code == 0){
                this.$message({
                  type: "success",
                  message: `${{'0':'新增','1':'修改'}[this.handleType]}成功`
                })
                // 关闭弹窗 返回 更新列表
                this.dialogVisible = false;
                if(['0','1','2'].includes(this.handleType)){
                  this.$emit('closedialog', 1)
                }
              }
            }).catch(error => {
              this.dialogVisible = false;
            })
            
          } else {
            this.$message({
              message: '请确认信息填写完整',
              type: 'warning'
            })
            return false;
          }
        });
      },

    },
}
</script>

<style scoped lang="scss">
.dialog-classify{
  height: 40px;
  color: rgba(48, 49, 51, 100);
  font-size: 18px;
}
.el-textarea{
  ::v-deep textarea{
    height: 130px;
  }
}
.form-item-footer{
  text-align: center;
  margin-bottom: 0;
  ::v-deep .el-form-item__content{
    margin-left: 0 !important;
  }
}
</style>
