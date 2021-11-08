<template>
    <el-dialog
        destroy-on-close
        id="dialogForm"
        :visible.sync="dialogVisible"
        :title="dialogModel.title"
        :width="dialogModel.width"
        custom-class="dialog-body"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        append-to-body
        :top="dialogModel.top"
        :before-close="dialogClose"
        :key="dialogKey"
        :show-close="dialogModel.showClose !== false"
    >
        
        <div class="fromBox">
            <el-form
                :model="formData"
                ref="formData"
                :label-width="dialogModel.labelWidth"
                :key="keyIndex"
                :disabled="disabled"
            > 
                <template v-for="(model, index) in dialogModel.formModel">
                    <!-- text标题 -->
                    <template
                        v-if="
                        model.elemType === 'text' &&
                        (typeof model.show === 'undefined' ? true : model.show)
                        "
                    >
                        <el-form-item
                        :label="model.name"
                        :key="model.key"
                        :prop="model.key"
                        :rules="model.rules"
                        v-if="!model.isShow"
                        >
                        {{ formData[model.key] || model.title }}
                        </el-form-item>
                    </template>
                    <!-- input输入框 -->
                    <template
                        v-if="model.elemType ==='input' && (typeof model.show === 'undefined' ? true : model.show )"
                    >
                        <el-form-item
                            :label="model.name"
                            :key="model.key"
                            :prop="model.key"
                            :rules="model.rules"
                            v-if="!model.isShow"
                        >
                            <el-input
                                v-if="model.elemType === 'input'"
                                size="small"
                                :type="model.type"
                                :rows="model.rows"
                                v-model="model.input"
                                :placeholder="model.placeholder ? model.placeholder : '请输入' + model.name"
                                :disabled="dialogModel.disabled || model.disabled"
                                :maxlength="model.maxlength"
                                @change="(event) => model.changeMethod && model.changeMethod( event, model, index, formData, dialogModel.formModel) "
                                v-model.trim="formData[model.key]"
                                :clearable="!dialogModel.disabled"
                            >
                                <slot :slot="model.slot">
                                    {{ model.slotContent }}
                                </slot>
                            </el-input>
                            <span
                                    v-if="model.tips"
                                    :style="model.tipsStyle"
                                    >{{ model.tips }}</span 
                                >
                            <span
                                v-if="model.type === 'textarea' && model.maxlength > 0"
                                style="position: absolute; bottom: -35px; right: 0"
                                >{{ formData[model.key] ? formData[model.key].length : 0 }}/{{
                                model.maxlength
                                }}</span
                            >
                            <span v-if="model.help" class="help" @click="helpFun(model)">{{
                                model.helpName || "?"
                            }}</span>
                        </el-form-item>                
                    </template>
                    <!--时间选择器 -->
                    <template
                        v-else-if="
                        model.elemType === 'datePicker' &&
                        (typeof model.show === 'undefined' ? true : model.show)
                        "
                    >
                        <el-form-item
                        :label="model.name"
                        :key="model.key"
                        :prop="model.key"
                        :rules="model.rules"
                        >
                            <el-date-picker
                                v-model="formData[model.key]"
                                :disabled="dialogModel.disabled || model.disabled"
                                :type="model.type"
                                :size="model.size || 'small'"
                                :value-format="model.valueFormat ? model.valueFormat : 'yyyy-MM-dd'"
                                :clearable="model.clearable || true"
                                :start-placeholder="model.startplaceholder || '开始日期'"
                                :end-placeholder="model.endplaceholder || '结束日期'"
                                :default-time="model.defaultTime"
                                :placeholder="model.placeholder || '选择日期' "
                            >
                            </el-date-picker>
                        </el-form-item>
                    </template>
                    <!-- 选择器 -->
                    <template
                        v-else-if="
                        model.elemType === 'select' &&
                        (typeof model.show === 'undefined' ? true : model.show)
                        "
                    >
                        <el-form-item
                        :label="model.name"
                        :key="model.key"
                        :prop="model.key"
                        :rules="model.rules"
                        >
                        <el-select
                            :clearable="!dialogModel.disabled"
                            size="small"
                            :multiple="model.multiple && model.multiple"
                            :filterable="model.filterable && model.filterable"
                            :popper-append-to-body="false"
                            v-model="formData[model.key]"
                            @change="
                            (event) =>
                                onChange(
                                event,
                                model,
                                index,
                                formData,
                                dialogModel.formModel
                                )
                            "
                            :placeholder="'请选择' + model.name"
                            :disabled="dialogModel.disabled || model.disabled"
                            :prop="model.key"
                        >
                            <el-option
                            v-for="(opt, index) in model.child"
                            :value="opt[model.colValue]"
                            :label="opt[model.colName]"
                            :disabled="opt.disabled"
                            :key="index"
                            >
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </template>
                    <!-- 单选框 -->
                    <template
                        v-else-if="
                        model.elemType === 'radioOnly' &&
                        (typeof model.show === 'undefined' ? true : model.show)
                        "
                    >
                        <el-form-item
                            :label="model.name"
                            :key="model.key"
                            :prop="model.key"
                            :rules="model.rules"
                        >
                        <div class="radioGroup">
                            <el-radio-group
                                v-model="formData[model.key]"
                                :style="{ width: model.width }"
                                :disabled="dialogModel.disabled || model.disabled"
                            >
                            <el-radio
                                v-for="(item, index) in model.radioArr"
                                :label="item.label"
                                :key="index"
                                :disabled="item.disabled"
                                >{{ item.label }}</el-radio
                            >
                            </el-radio-group>
                        </div>
                        </el-form-item>
                    </template>
                    <!-- 多选框 -->
                    <template
                        v-else-if="
                        model.elemType === 'checkbox' &&
                        (typeof model.show === 'undefined' ? true : model.show)
                        "
                    >
                        <el-form-item
                            :label="model.name"
                            :key="model.key"
                            :prop="model.key"
                            :rules="model.rules"
                        >
                            <!-- 兼容老写法 ps：可忽略-->
                            <div v-if="model.jrOld">
                                <el-checkbox
                                    v-if="model.isCheckAll"
                                    :indeterminate="model.isIndeterminate"
                                    v-model="model.checkAll"
                                    @change="(val) => handleCheckAllChange(val, model, formData)"
                                >全选</el-checkbox>
                                <el-checkbox-group
                                    v-model="formData[model.key]"
                                    @change="(val) => handleCheckedCitiesChange(val, model)"
                                    :max="model.max ? model.max : 100"
                                    :disabled="dialogModel.disabled || model.disabled"
                                >
                                <el-checkbox
                                    v-for="item in model.child"
                                    :label="item[model.id]"
                                    :key="item[model.id]"
                                    >{{ item[model.shortName] }}</el-checkbox
                                >
                                </el-checkbox-group>
                            </div>
                            <!-- 正常用法-->
                            <div v-else>
                                <el-checkbox
                                v-if="model.isCheckAll"
                                :indeterminate="model.isIndeterminate"
                                v-model="model.checkAll"
                                @change="(val) => handleCheckAllChange(val, model)"
                                >全选</el-checkbox
                                >
                                <el-checkbox-group
                                v-model="formData[model.key]"
                                @change="(val) => handleCheckedCitiesChange(val, model)"
                                :max="model.max ? model.max : 100"
                                :disabled="dialogModel.disabled || model.disabled"
                                >
                                <el-checkbox
                                    v-for="item in model.child"
                                    :label="item"
                                    :key="item"
                                    >{{ item }}</el-checkbox
                                >
                                </el-checkbox-group>
                            </div>
                            <!--特殊用法，+input-->
                            <div v-if="model.showSpecialInput">
                                <el-form-item
                                label-width="100px"
                                :label="model.specialInputName"
                                :key="model.specialInput"
                                :prop="model.specialInput"
                                >
                                <el-input
                                    v-model="formData[model.specialInput]"
                                    :placeholder="model.specialPlaceholder"
                                    size="small"
                                    style="display: inline-block; width: 200px"
                                ></el-input>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </template>
                    <!-- 上传组件 ps:需求配合 FileUpload组件和ImgUpload组件 -->
                    <!-- <template
                        v-else-if="
                        model.elemType === 'upload' &&
                        (typeof model.show === 'undefined' ? true : model.show)
                        "
                    >
                        <el-form-item
                            :label="model.name"
                            :key="model.key"
                            :prop="model.key"
                        >
                            <div style="position: relative" v-if="model.type==='fileUpload'">
                                <FileUpload
                                    :prompt="model.prompt"
                                    :limit="5"
                                    :limitSize="5"
                                    :fileEnum="3"
                                    :uploadType="3"
                                    v-model="model.filesList"
                                ></FileUpload>
                                <p class="prompts">
                                    支持PDF格式，最多上传五个，单个附件大小不超过5M
                                </p> 
                            </div>
                            <div style="position: relative" v-if="model.type==='imgUpload'">
                                <ImgUpload
                                    :prompt="model.imgUplad1"
                                    :limit="1"
                                    :fileEnum="20"
                                    :cropImgWidth="model.cropImgWidth || 500"
                                    :cropImgHeight="model.cropImgHeight || 500"
                                    v-model="model.headImageUrlList"
                                ></ImgUpload>
                            </div>
                        </el-form-item>
                    </template> -->
                    <!-- 级联选择器 -->
                    <template
                        v-else-if="
                        model.elemType === 'cascader' &&
                        (typeof model.show === 'undefined' ? true : model.show)
                        "
                    >
                     <el-form-item
                    :label="model.name"
                    :key="model.key"
                    :prop="model.key"
                    :rules="model.rules"
                    >
                    <el-cascader 
                        v-model="formData[model.key]" 
                        :options="model.child"
                        :show-all-levels="model.showAllLevels"
                        :props="model.props || {}"
                    >
                    </el-cascader>
                    </el-form-item>
                    </template>
                    <!--计数器-->
                    <template
                        v-if="
                            model.elemType === 'inputNumber' &&
                            (typeof model.show === 'undefined' ? true : model.show)
                        "
                    >
                    <el-form-item
                            :label="model.name"
                            :key="model.key"
                            :prop="model.key"
                            :rules="model.rules"
                        
                        >
                            <el-input-number
                                v-model="formData[model.key]"
                                :min="model.mininputNumber || 1"
                                :max="model.maxinputNumber || 10"
                            ></el-input-number>
                        </el-form-item>
                    </template>
                    <!-- 分割线 -->
                    <template
                        v-if="
                            model.elemType === 'divider' &&
                            (typeof model.show === 'undefined' ? true : model.show)
                        "
                    >
                        <div class="divider" :key="index">
                        <el-divider :content-position="model.location">{{
                            model.dividerTitle
                        }}</el-divider>
                        </div>
                    </template>
                   
                </template>
            </el-form>
            <!--弹窗footer-->
            <div class="dialog-footer" v-if="!disabled && !dialogModel.disabled">
            <template v-for="(btn, index) in dialogModel.bottomBtn">
                <el-button
                    :key="index"
                    :type="btn.type"
                    :size="btn.size"
                    @click.native="btn.method(thisPint, 'formData', btn, formData, createFormModel)"
                    :class="btn.className"
                    :loading="btn.loading"
                >
                    {{ btn.value }}
                </el-button>
            </template>
        </div>
            
        </div>    
    </el-dialog>
</template>

<script>
import { FileUpload, ImgUpload } from '@/components'

export default {
    name:'dialogForm',
    components: {
        FileUpload,
        ImgUpload,
    },
    props: {
        disabled: {
            type: [Boolean],
            default: () => false,
        },
        dialogFormData: {
            type: [Object],
        },
        dialogModel: {
            type: [Object],
        },
        dialogVisible: {
            type: [Boolean],
            default() {
                return false;
            },
        },
    },
    data() {
        return {
            formData: {},
            createFormModel: {},
            thisPint: this,
            dialogKey: 0,
            keyIndex: 0,
        }
    },
      watch: {
        dialogFormData: {
            handler(curVal) {
                if(curVal.upDate == null){
                    curVal.upDate = ''
                }
                this.formData = curVal;
                console.log('curVal:',curVal.upDate)
                console.log(this.dialogModel.formModel,'111')
                this.$emit("update:dialogFormData", this.formData);
                let ddd =  () => {
                    this.dialogModel.formModel.filter(it => it.key == 'date')[0].value
                    return console.log(ddd,'ddd')
                }
                
            },
            deep: true,
        },
        dialogVisible: {
            handler(curVal) {
                if (curVal) {
                this._createdData();
                } else {
                this.dialogKey++;
                this.$emit("update:dialogFormData", {});
                this.$refs.formData.resetFields();
                }
            },
            deep: true,
        },
    },
    created() {
        this._createdData();
    },
     methods: {
        changeMethod (event, model, index, formData) {
            if (model.changeMethod && typeof model.changeMethod === 'function') {
                model.changeMethod(event, model, index, formData)
            }
        },
        
        
        /**
         * 多选框-全选-方法
         * */
        handleCheckAllChange(val, model, formData) {
            console.log('model:',model)
            if (!model.jrOld) {
                this.formData[model.key] = val ? model.child : [];
                model.isIndeterminate = false;
            } else {
                if (val) {
                model.handleCheckAllChange(val, model, formData);
                model.isIndeterminate = false;
                } else {
                this.formData[model.key] = [];
                model.isIndeterminate = false;
                }
            }
        },
        handleCheckedCitiesChange(value, model) {
            let checkedCount = value.length;
            model.checkAll = checkedCount === model.child.length;
            model.isIndeterminate =
                checkedCount > 0 && checkedCount < model.child.length;

            if (model.method) {
                model.method(value, model);
            }
        },
        // 选择器组件，选中节点变化时触发
        handleChange(model){
            this.$emit('handleChange',model)
        },
        /**
         * 初始化
         * */
        _createdData() {
            let dialogFormModel = this.dialogModel.formModel;
            let formModel = {};
            for (let i in dialogFormModel) {
                if (!dialogFormModel.hasOwnProperty(i)) continue;
                let item = dialogFormModel[i];
                if (item.defaultValue !== undefined) {
                //如果formData有值，就不赋值
                if (!formModel[item.key]) {
                    formModel[item.key] = item.defaultValue;
                }
                } else {
                if (item.key) {
                    /**
                     * 类型判断
                     * */
                    if (item.keyType === "Array") {
                    formModel[item.key] = [];
                    } else if (item.keyType === "Object") {
                    formModel[item.key] = {};
                    } else {
                    formModel[item.key] = "";
                    }
                }
                }
            }
            let formData = Object.assign(formModel, this.dialogFormData);
            // this.createFormModel = this.deepCopy(formData); // 初始的formdata值
            this.createFormModel = JSON.parse(JSON.stringify(formData))
            this.formData = formData;
            this.$emit("update:dialogFormData", formData);
        },
        onChange(event, model, index, formData, formModel) {
            if (model.handleChange && typeof model.handleChange === "function") {
                model.handleChange(event, model, index, formData, formModel);
            }
        },

        dialogClose() {
            this.$refs.formData.resetFields();
            this.$emit("update:dialogVisible", false);
            this.$emit("update:disabled", false);
            this.$emit("dialogClose");
        },
        
    },
    mounted() {},
}
</script>
<style lang="scss" scoped>
#dialogForm{
    .fromBox{
        .el-input {
            width: 300px;
        }
        .el-date-editor {
            width: 300px;
        }
        .el-select{
            width: 300px;
        }
        .radioGroup{
            width: 300px;
        }
        .el-cascader{
            width: 300px;
        }
    }
    .dialog-footer{
        text-align : center;
    }
}
</style>

