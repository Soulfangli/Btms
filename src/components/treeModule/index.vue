<template>
    <div class="main">
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
                            :placeholder="item.placeholder || '请输入'"
                            :style="{ width: item.formContentWidth || '230px' }"
                        />
                        <!-- 选择器 -->
                        <el-select
                            v-if="item.elementType == 'select'"
                            v-model="item.value"
                            class="search-select"
                            :size="item.size || size"
                            :multiple="item.multiple"
                            :placeholder="item.placeholder || '请选择'"
                            :clearable="item.clearable"
                            :style="{ width: item.formContentWidth || '230px' }"
                        >
                            <el-option
                                v-for="(tip, i) in item.options"
                                :key="'search-select-' + i"
                                :value="tip.value"
                                :label="tip.label || tip.text"
                            />
                        </el-select>
                        <!-- 级联选择器 -->
                        <el-cascader
                            v-if="item.elementType == 'cascader'"
                            v-model="item.value"
                            class="search-select"
                            :size="item.size || size"
                            :options="item.options"
                            :props="{
                                emitPath: item.props.emitPath,
                                checkStrictly: item.props.checkStrictly,
                                multiple: item.props.multiple,
                                value: item.props.value,
                                label: item.props.label,
                                children: item.props.children
                            }"
                            :clearable="item.clearable"
                            :placeholder="item.placeholder || '请选择'"
                            :style="{ width: item.formContentWidth || '230px' }"
                        >
                        </el-cascader>
                        <!-- 日期选择器 -->
                        <el-date-picker
                            v-if="item.elementType == 'date-picker'"
                            v-model="item.value"
                            :value-format="item.valueformat || 'yyyy-MM-dd'"
                            class="search-picker"
                            :type="item.type"
                            :size="item.size || size"
                            :placeholder="item.placeholder"
                            :start-placeholder="item.startplaceholder || '开始日期'"
                            :end-placeholder="item.endplaceholder || '结束日期'"
                            :editable="false"
                            :style="{ width: item.formContentWidth || '230px' }"
                        >
                        </el-date-picker>
                        <!-- 多选 -->
                        <el-checkbox-group v-model="item.value" v-if="item.elementType == 'checkbox-group'">
                            <el-checkbox
                                v-for="(item, i) in item.options"
                                :key="'checkboxer-group-' + i"
                                :label="item.label"
                            >
                                {{ item.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                        <!-- 单选框 -->
                        <el-radio-group v-model="item.value" v-if="item.elementType == 'radio-group'">
                            <el-radio v-for="item in item.options" :key="item.value" :label="item.label">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </template>
            </el-form>
            <div>
                <el-button type="primary" :size="size" @click="search">查询</el-button>
                <el-button plain v-if="propData.reset" :size="size" @click="resetSearch('formsearch')">重置</el-button>
                <el-button
                    v-if="showFormItemNum && propData.searchFormItemArr.length >= showFormItemNum"
                    type="text"
                    :size="size"
                    @click="extend"
                    >{{ isextend ? '收起' : '展开'
                    }}<i :class="[isextend ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i
                ></el-button>
            </div>
        </div>
        <div class="component-container-table">
            <el-row type="flex" align="middle" justify="end" v-if="propData.showOpenBtn">
                <el-button type="primary" plain class="btn-plain" :size="size" @click="isOpenTreeFn(true)" >全部展开</el-button>
                <el-button type="primary" plain class="btn-plain" :size="size" @click="isOpenTreeFn(false)">全部收起</el-button>
            </el-row>
            <div class="treeHead custom-tree-node" >
                <span>{{propData.titleArray[0].title}}</span>
                <span class="tree-right-content">
                    <span class="text-box">
                        <span 
                            style="flex:1;" 
                            v-for="(item,index) in propData.titleArray.slice(1)" 
                            :key="'titleArray' + index">
                            {{item.title}}
                        </span>
                    </span>
                    <i class="el-icon-s-unfold" style="visibility: hidden;" v-if="propData.isdrag"></i>
                </span>
            </div>
            <el-form class="tree-form" ref="tree-form" :model="treeForm" :rules="rules" :disabled="propData.disabled" >
                <el-form-item prop="defaultChecked">
                    <el-tree
                        :key="isOpenTree"
                        ref="selectTree"
                        accordion
                        :data="propData.treeData"
                        :node-key="propData.nodeKey || 'id'"
                        :show-checkbox="propData.showCheckbox"
                        :expand-on-click-node="false"
                        :draggable="propData.isdrag ? true: false"
                        :check-strictly="propData.checkStrictly ? true: false"
                        :default-checked-keys="propData.defaultChecked"
                        :props="propData.defaultProps"
                        :default-expand-all="isOpenTree"
                        :allow-drop="allowDrop"
                        :filter-node-method="filterNode"
                        @check="check"
                        @node-drop="handleDrop"
                    >
                        <span class="custom-tree-node" slot-scope="{ data }" @dblclick="treeClick(data)">
                            <!-- <span>{{node[propData.defaultProps.label]}}</span> -->
                            <span>{{data[propData.defaultProps.label]}}</span>
                            <span class="tree-right-content">
                                <span class="text-box">
                                    <span 
                                        style="flex:1;" 
                                        v-for="(it,i) in propData.titleArray.slice(1)" 
                                        :key="i">
                                        {{data[it.prop]}}
                                    </span>
                                </span>
                                <i class="el-icon-s-unfold" v-if="propData.isdrag"></i>
                            </span>
                        </span>
                    </el-tree>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * propData: {
         *  nodeKey：树节点的唯一标识
         *  show: true 是否展示搜索
         *  reset: true 是否展示重置
         *  defaultChecked:[] 默认勾选的选项 
         *  showCheckbox: true, 是否显示复选框
         *  showOpenBtn: true, // 是否需要 展开收起按钮
         *  treeSearchType // 搜索类型：'localFilter'本地过滤  'newData'查询接口用于更新数据
         *  isdrag: true, //是否可拖拽
         *  checkStrictly: false // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
         *  titleArray: [{title: '模块及菜单', prop: 'shuoming1'}], // 树状的标题
         *  treeData:[], //树状的内容
         *  defaultProps: { 
         *      children: "children", 指定子树为节点对象的某个属性值
         *      label: "label"  指定节点标签为节点对象的某个属性值
         *  },
         * disabled: false 禁止
         * }
         */
        propData: {
            type: Object,
            default: () => {}
        },
    },
    watch: {
        'propData.defaultChecked': {
            handler(newVal, oldVal) {
                if(newVal && newVal.length>0){
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$emit(
                                'getdefaultCheckedKeys',
                                {
                                    checkedKeys: this.$refs.selectTree.getCheckedKeys(), // 所有勾选的keys
                                    checkedKeysLast: this.$refs.selectTree.getCheckedKeys(true), // 勾选的最后叶子节点的keys
                                    halfCheckedKeys: this.$refs.selectTree.getHalfCheckedKeys() // 半选节点的keys
                                }
                            )
                        }, 500);
                    })
                }
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            treeForm: {
                defaultChecked: []
            },
            rules: {
                defaultChecked: [{required: false}]
            },
            size: 'small',
            showFormItemNum: this.propData.showFormItemNum || 0, // 收起或展开时，显示几个表单项【不需要伸展操作时，props不传该属性 或 传0】
            isextend: false, // 搜索条件的展开收起
            isOpenTree: false // 是否展开树形组件
        }
    },
    computed: {},
    methods: {
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
         * 过滤树
         */
        filterNode(value, data) {
            if (!value) return true
            return data[this.propData.defaultProps.label].indexOf(value) !== -1
        },
        /**
         * 查询数据
         */
        search() {
            if(this.propData.treeSearchType == 'localFilter'){
                this.$refs.selectTree.filter(this.propData.searchFormItemArr[0].value)
            }else if(this.propData.treeSearchType == 'newData') {
                this.$parent.search()
            }
        },
        /**
         * 重置查询
         */
        resetSearch(formName) {
            this.$refs[formName].resetFields()
            this.$parent.resetSearch()
        },
        // 树组件展开收起
        isOpenTreeFn(e) {
            // let self = this;
            // // 将没有转换成树的原数据
            // let treeList = this.propData.treeData;
            // for (let i = 0; i < treeList.length; i++) {
            //     // 将没有转换成树的原数据设置key为... 的展开
            //     self.$refs.selectTree.store.nodesMap[treeList[i].id].expanded = true;
            // }
            this.isOpenTree = e
        },
        // 双击点击树
        treeClick(data) {
            if (this.$parent.treeClick) {
                this.$parent.treeClick(data)
            } else {
                this.$emit('treeClick', data)
            }
        },
        // 当复选框被点击的时候触发
        check(data, checkedObj) {
            let lastCheckedKeys = this.$refs.selectTree.getCheckedKeys(true) //true 仅返回被选中的最后叶子节点的keys
            this.$emit('lastCheckedKeys',lastCheckedKeys)
            this.$emit('checkedObj',checkedObj)
        },
        //自定义选中方法
        setCheckedKeys() {
            // 确保数据渲染到tree之后再做checked
            // setTimeout(() => {
            this.$refs.selectTree.setCheckedKeys(this.propData.defaultChecked);
            // }, 30);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            // console.log(draggingNode, dropNode, dropType, ev)
            // let obj = {
            //     aboveId: "",
            //     arr: [],
            // };
            // obj.aboveId = dropNode.data.aboveId;
            // for (let item of dropNode.parent.childNodes) {
            //     obj.arr.push(item.data.id);
            // }
            //拖拽后可获取树状数据；后续可能会调用接口；由后端重新返回树状数据，从而渲染页面
            this.$parent.handleDrop(draggingNode, dropNode)
            //拖拽完成后勾选状态
            // this.setCheckedKeys()
        },
        // 限制只能同级进行拖拽
        allowDrop(draggingNode, dropNode, type) {
            if (draggingNode.data.level === dropNode.data.level) {
                //parentId 是父节点id
                if (draggingNode.data.parentId === dropNode.data.parentId) {
                    return type === "prev" || type === "next";
                } else {
                    return false;
                }
            } else {
                // 不同级进行处理
                return false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.header-search-box {
    padding: 15px 15px 0;
    
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
    .treeHead{
        height: 48px;
        background:#FAF8F5;
        margin-top: 20px;
        line-height: 1.5;
        padding: 0 20px;
        display: flex;
        align-items: center;
        color: #262626;
        font-weight: bold;
        font-size: 14px;
        position: relative;
    }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
::v-deep .el-tree-node__content{
    position: relative;
    height: 40px !important;
  /* padding-left: 30px; */
    &:hover {
        background: #FAF8F5;
    }
}
::v-deep .el-tree-node:focus > .el-tree-node__content{
    // background-color: transparent;
    background-color: #FAF8F5;
}
.tree-right-content{
    position: absolute;
    left: 40%;
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text-box{
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
    }
}
 .el-icon-s-unfold{
//    position: absolute;
//    right: 0;
   visibility: hidden;
   color: #D5D8DE;
   font-size: 20px;
   padding-right: 10px;
 }
.el-tree-node__content:hover .el-icon-s-unfold{
    visibility: visible;
}
.el-tree-node__content:active .el-icon-s-unfold{
    visibility: visible;
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
    top: -22px;
    left: -9px;
    height: auto;
}
</style>
