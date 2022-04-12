<!--公共组件-table-->

<template>
    <div class="main">
        <!--搜索项-->
        <div v-if="propData.show" class="header-search-box">
            <el-form ref="formsearch" inline :label-width="propData.searchLabelwidth" size="small" class="flex1">
                <template v-for="(item, index) in propData.searchFormItemArr">
                    <el-form-item
                        :key="item.elementType + index"
                        :label="item.label"
                        :size="item.size || size"
                         v-show="index < showFormItemNum || !showFormItemNum"
                    >
                        <!-- 输入框 -->
                        <el-input
                            v-if="item.elementType == 'input'"
                            v-model="item.value"
                            class="search-input"
                            :size="item.size || size"
                            :placeholder="item.placeholder || '请输入'+ item.value"
                            :style="{ width: item.formContentWidth || '230px' }"
                            :clearable="item.clearable || true"
                        />
                        <!--选择器-->
                        <el-select 
                            v-if="item.elementType == 'select'"
                            v-model="item.value" 
                            class="search-select"
                            :size="item.size || size"
                            :placeholder="item.placeholder || '请输入'+ item.value"
                            :style="{ width: item.formContentWidth || '230px' }"
                            :multiple="item.multiple"
                            :clearable="item.clearable || true"
                             @change="handleChange(item)"
                        >
                            <el-option
                                v-for="opts in item.options"
                                :key="opts.value"
                                :label="opts.label || opts.text"
                                :value="opts.value"
                            >
                            </el-option>
                        </el-select>
                         <!-- 级联选择器 -->
                        <el-cascader
                            v-if="item.elementType == 'cascader'"
                            v-model="item.value"
                            :options="item.options"
                            class="search-cascader"
                            :size="item.size || size"
                            :placeholder="item.placeholder || '请输入'+ item.value"
                            :style="{ width: item.formContentWidth || '230px' }"
                            :show-all-levels="item.showallLevels"
                            :clearable="item.clearable || true"
                            :props="{ 
                                emitPath: item.props.emitPath,
                                checkStrictly: item.props.checkStrictly,
                                multiple: item.props.multiple,
                                value: item.props.value,
                                label: item.props.label,
                                children: item.props.children
                            }"
                            @change="handleChange(item)"
                        />
                        <!-- 日期选择器 -->
                        <el-date-picker
                            v-if="item.elementType == 'datePicker'"
                            v-model="item.value"
                            class="search-datePicker"
                            :size="item.size || size"
                            :placeholder="item.placeholder || '请输入'+ item.value"
                            :style="{ width: item.formContentWidth || '230px' }"
                            :type="item.type"
                            :editable="false"
                            :value-format="item.valueformat || 'yyyy-MM-dd'"
                            :start-placeholder="item.startplaceholder || '开始日期'"
                            :end-placeholder="item.endplaceholder || '结束日期'"
                        />
                        <!-- 多选 -->
                        <el-checkbox-group 
                            v-if="item.elementType == 'checkboxGroup'"
                            v-model="item.value"
                            class="search-checkboxGroup"
                            >
                            <el-checkbox 
                                v-for="item in item.options"
                                :key="item.value"
                                :label="item.label || item.text"
                                :value="item.value"
                            >
                                {{item.label}}
                            </el-checkbox>
                        </el-checkbox-group>
                        <!-- 单选框 -->
                        <el-radio-group 
                            v-if="item.elementType == 'radioGroup'"
                            v-model="item.value"
                            class="search-radioGroup"
                        >
                            <el-radio 
                                 v-for="item in item.options"
                                :key="item.value"
                                :label="item.label || item.text"
                                :value="item.value"
                            >
                            {{item.label}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </template>
            </el-form>
            <div>
                <el-button type="primary" :size="size" @click="search">查询</el-button>
                <el-button plain v-if="propData.reset" :size="size" @click="resetSearch('formsearch')">重置</el-button>
                <el-button 
                    v-if="showFormItemNum && propData.searchFormItemArr.length>=showFormItemNum" 
                    type="text" 
                    :size="size" 
                    @click="extend"
                >
                    {{isextend ? '收起' : '展开'}}
                    <i :class="[isextend ? 'el-icon-arrow-up' : 'el-icon-arrow-down']">
                    </i>
                </el-button>
            </div>
        </div>
        <div class="component-container-table" :style="{height: mainHeight}">
            <!--table上方按钮（一般位于右上方，例如：新增，导出，导入）-->
            <el-row :gutter="20" v-if="propData.table.btns && propData.table.btns.length">
                <el-col :span="24" :offset="0">
                    <div class="floar-right">
                        <el-button
                            v-for="(item, index) in propData.table.btns"
                            :key="'table-btn-' + index"
                            :type="item.type"
                            :plain="item.type ? false : true"
                            :size="item.size || size"
                            :icon="item.icon"
                            :disabled="item.disabled"
                            @click="tableBtnClick(item)"
                            >{{ item.label }}</el-button
                        >
                    </div>
                </el-col>
            </el-row>
            <!--table上面tab栏-->
            <el-row v-if="propData.tabs" class="tabStyle">
                <el-radio-group v-model="propData.tabs.activeName" type="card" @change="handleTabClick">
                    <el-radio-button
                        v-for="item in propData.tabs.editableTabs"
                        :key="item.key"
                        :label="item.label"
                        :name="item.name"
                    ></el-radio-button>
                </el-radio-group>
            </el-row>
            <!--table-->
            <el-table 
                ref="table" 
                :data="propData.table.body"
                :row-key="propData.rowKey"
                :tree-props="propData.TreeProps"
                @selection-change="handleSelectionChange"
                stripe
                :border="propData.border || false"
                :cell-style="{padding: '2px', height: '40px'}"
                :header-cell-style="{background:'#FAF8F5', height: '48px'}"
                :height="propData.table.tableHeight"
            >
                <!--序号，公共部分-->
                <template v-if="!propData.table.isHiddenIndex">
                    <el-table-column
                        align="center"
                        label="序号"
                        type="index"
                        width="80"
                        :index="indexMethod"
                        fixed="left"
                    ></el-table-column>
                </template>
                <el-table-column
                    v-if="propData.table.selection"
                    align="center"
                    type="selection"
                    fixed="left"
                    width="55"
                >
                </el-table-column>
                <!--序号和操作中间部分-->
                <table-column v-bind:propDatas="propData.table.head" @tablecolumnClick="tablecolumnClick" />
                <!--操作-->
                <el-table-column
                    v-if="propData.table.options && !propData.table.options.hidden"
                    :label="propData.table.options.operationText || '操作'"
                    :width="propData.table.options.width"
                    fixed="right"
                >
                    <!--插槽-->
                    <template slot-scope="scope">
                         <!--操作按钮  -->
                         <template v-for="(item, index) in propData.table.options.btnList">
                            <el-button
                                :key="'options-btn-' + index"
                                :type="item.type"
                                :size="item.size || size"
                                :style="
                                    `color: ${item.color};visibility: ${
                                        (item.isexists && item.isexists.value.includes(scope.row[item.isexists.key])) ||
                                        !item.isexists
                                            ? 'visible'
                                            : 'hidden'
                                    };`
                                "
                                @click="optionBtnClick(scope.row, item, index)"
                                >{{ item.labelIO ? item.labelIO.value[scope.row[item.labelIO.key]] : item.label }}
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table >
        </div>
         <!--分页-->
        <el-footer v-if="!propData.pageHide" class="footer-pagination">
            <el-pagination
                background
                :current-page="propData.pageinfo.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="propData.pageinfo.pageSize"
                :layout="propData.pageinfo.layout ? propData.pageinfo.layout : 'total, prev, pager, next, sizes, jumper'" 
                :total="propData.pageinfo.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </el-footer>
    </div>
</template>
<script>
import helper from '@/utils/helper'
import TableColumn from './TableColumn'
export default {
    props: {
        propData: {
            type: Object,
            default: () => {}
        }
    },
    filters: {
        fromatDate(date) {
            return helper.fromatDate_y_m_d(date)
        }
    },
    data() {
        return {
            size: 'small',
            // currentPage: 1,
            // pageSize: 10,
            // total: 0 //总条数
            showFormItemNum: this.propData.showFormItemNum || 0, // 收起或展开时，显示几个表单项【不需要伸展操作时，props不传该属性 或 传0】
            isextend: false, // 是否展开
            mainHeight: 0  //自适应table高度
        }
    },
    components: {
        expandDom: {
            functional: true,
            props: {
                row: Object,
                render: Function,
                index: Number,
                column: {
                    type: Object,
                    default: null
                }
            },
            render: (h, ctx) => {
                const params = {
                    row: ctx.props.row,
                    index: ctx.props.index
                }
                if (ctx.props.column) params.column = ctx.props.column
                return ctx.props.render(h, params)
            }
        },
        TableColumn
    },
    mounted(){
        //页脚固定底部
        this.andeMainHeight()
    },
    methods: {
        //table高度自适应，页脚固定底部
        andeMainHeight(){
            this.mainHeight = `calc(100vh - 285px)`
        },
        // 选择器组件，选中节点变化时触发
        handleChange(item){
            this.$emit('handleChange',item)
        },
        // 展开收起事件
        extend() {
            this.isextend = !this.isextend
            if (this.isextend) {
                this.showFormItemNum = this.propData.searchFormItemArr.length
            } else {
                this.showFormItemNum = this.propData.showFormItemNum
            }
        },
        indexMethod(index) {
            return this.propData.pageinfo.pageSize * (this.propData.pageinfo.currentPage - 1) + index + 1
        },
        /**
         * 查询数据
         */
        search() {
            //查询时，仅提供currentPage页为1
            this.$parent.searchForm.pageinfo.currentPage = 1
            this.$parent.search()
        },
        /**
         * 重置查询
         */
        resetSearch(formName) {
            //重置时，仅提供currentPage页为1
            this.$parent.searchForm.pageinfo.currentPage = 1  
            //清空form数据
            this.$refs[formName].resetFields()
            this.$parent.resetSearch()
        },
        /**
         * 选项卡切换
         */
        handleTabClick(tab) {
            this.$emit('handleTabClick', tab)
        },
        /**
         * 表格中行内的操作table-column
         */
        tablecolumnClick(row, btn, index) {
            row.index = index
            // 不要用下标临时删除等操作了，不安全！传数据的时候统一手动给一个属性 mykey: xxx
            this.$parent.tablecolumnClick(row, btn)
            this.$nextTick(() => {
                //对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
                this.$refs.table.doLayout()
            })
        },
        /**
         * 表格中多选全选操作
         */
        handleSelectionChange(val) {
            if (this.propData.table.selection) {
                this.$parent.handleSelectionChange(val)
            } else {
                return
            }
        },
        /**
         * 列表操作
         */
        optionBtnClick(row, btn, index) {
            if (btn.inquiry) {
                this.$confirm(btn.msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.optionBtnClickFunc(row, btn, index)
                    })
                    .catch(() => {})
            } else {
                this.optionBtnClickFunc(row, btn, index)
            }
        },
        optionBtnClickFunc(row, btn, index) {
            row.index = index
            // 不要用下标临时删除等操作了，不安全！传数据的时候统一手动给一个属性 mykey: xxx
            if (this.$parent.optionBtnClick) {
                this.$parent.optionBtnClick(row, btn)
            } else {
                this.$emit('optionBtnClick', row, btn)
            }
        },
        /**
         * 单独按钮操作
         */
        tableBtnClick(item) {
            this.$parent.tableBtnClick(item)
        },
        /**
         * 每页条数改变
         */
        handleSizeChange(val) {
            this.$emit('handleSizeChange', val)
        },
        /**
         * 当前页,翻页
         */
        handleCurrentChange(val) {
            this.$emit('handleCurrentChange', val)
        }
    }
}
</script>

<style lang='scss' scoped>
.header-search-box {
    padding: 15px 15px 0;
    border-bottom: 10px solid #f9f9f9;
    .el-form-item {
        margin-bottom: 15px;
    }
    display: flex;
    justify-content: space-between;
    .flex1{
        flex: 1;
    }
}
.component-container-table {
    display: block;
    padding: 15px;
}
.footer-pagination {
    // height: auto !important;
    // margin: 15px;
    padding: 0 15px;
    text-align: right;
}
.tabStyle {
    margin-bottom: 16px;
}
// .search-input,
// .search-select {
//     width: 230px;
// }
// .search-picker {
//     width: 355px;
// }
.floar-right {
    float: right;
    margin-bottom: 10px;
}
::v-deep .el-radio__label {
    color: #333;
    font-weight: 300;
}
::v-deep .el-checkbox__label {
    color: #333;
}
::v-deep .el-image-viewer__close {
    color: #fff;
}
::v-deep .el-table td,
::v-deep .el-table th {
    padding: 8px 0;
}
::v-deep .el-badge__content {
    position: absolute;
    top: -15px;
    left: -8px;
    height: auto;
    line-height: 16px;
    padding: 0 5px;
}
::v-deep .el-table__fixed,
::v-deep .el-table__fixed-right {
    height: 100% !important;
}
</style>
