<template>
    <div>
            <tableContent
                :prop-data="searchForm"
                @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange"
            />
            <dialogForm 
                :key="time"
                ref="fixdepartment"
                @update="search(1)"
                @dialog-close="bindClosed"
                v-if="dialogVisible"
                :dialogVisible.sync="dialogVisible"
                :dialogModel="dialogModel"
                :dialogFormData.sync="dialogFormData"
            ></dialogForm>
    </div>
</template>
<script>

import { tableContent,dialogForm} from '@/components'

export default {
    name:'day1',
    components: { tableContent,dialogForm },
    data() {
        return {
            time: Date.now(),
            dialogVisible: false,
            dialogFormData: {},
            formData: {},
            //主页表格数据展示
            searchForm: {
                show: true,
                reset: true,
                showFormItemNum: 3,
                searchLabelwidth: '120px',
                pageinfo: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                searchFormItemArr: [
                    {
                        elementType: 'input',
                        label: '员工姓名',
                        key: 'name',
                        value: '',
                        placeholder: '请输入员工姓名',
                        span: 6,
                    },
                    {
                        elementType: 'input',
                        label: '手机号',
                        key: 'phone',
                        value: '',
                        placeholder: '请输入手机号',
                        span: 6,
                    },
                ],
                table: {
                    head: [],
                    body: [],
                    type: 'selection',
                    btns: [
                        {
                            label: '新增',
                            func: 'add',
                            type: 'primary',
                            icon: 'el-icon-plus',
                            inquiry: false,
                        },
                    ],
                    options: {
                        hidden: false,
                        width: 180,
                        render(h, params) {},
                        btnList: [
                            {
                                label: '修改',
                                func: 'update',
                                type: 'text',
                                inquiry: false,
                            },
                            {
                                label: '删除',
                                func: 'delete',
                                type: 'text',
                                color: '#F4333C',
                                inquiry: true,
                                msg: '确定删除此员工？',
                            },
                        ],
                    },
                },
            },
            //弹窗数据展示
            dialogModel: {
                labelWidth: '25%',
                width: '600px',
                formModel: {
                    departmentName: {
                        key: 'departmentName',
                        elemType: 'input',
                        name: '部门名称',
                        maxlength: 50,
                    },
                    // departmentId:{
                    //     key: 'departmentId',
                    //     elemType: "select",
                    //     name: '上级部门',
                    //     colValue: 'parentId', //候选值的value值-key
                    //     colName: 'departmentName', //候选值的label值-key
                    //     child: []
                    // },
                    
                    posterStatus: {
                        key: 'posterStatus', //key值(必填)
                        elemType: 'select', //类型(必填)
                        name: '状态', //组件label名字(必填)
                        colValue: 'value', //候选值的value值-key
                        colName: 'label', //候选值的label值-key
                        defaultValue: true, //默认选项
                        child: [
                            { value: true, label: '启用' },
                            { value: false, label: '禁用' },
                        ], //候选值数据源
                        // rules: this.check_rules({ required: true }), //检验
                        handleChange(val, model, index, formData, formModel) {},
                        /*
                         * 组件的change方法->(val, model, index,formData,formModel)
                         * @param val 当前选中值
                         * @param model 当前整个对象
                         * @param index 当前整个对象的位置
                         * @param formData 当前表单的所有值
                         * @param formModel 当前整个配置项值
                         */
                    },
                    title: {
                        elemType: 'divider', //类型(必填)
                        location: 'left',
                        dividerTitle: '海报主图配置', //组件label名字(必填)
                    },
                    sort:{
                        elemType: 'inputNumber',
                        key: 'sort',
                        name: '排序',
                        mininputNumber: 0,
                        defaultValue: 0
                    },
                   
                    reproduction: {
                        key: 'reproduction',
                        elemType: 'input',
                        name: '底图大小（像素）',
                        maxlength: 200,
                        disabled: true
                    },
                    schoolNameFontSize: {
                        key: 'schoolNameFontSize', //key值(必填)
                        elemType: 'select', //类型(必填)
                        name: '字号', //组件label名字(必填)
                        colValue: 'id', //候选值的value值-key
                        colName: 'label', //候选值的label值-key
                        child: [
                            { id: 8, label: '8' },
                            { id: 9, label: '9' },
                            { id: 10, label: '1' },
                            { id: 11, label: '11' },
                            { id: 12, label: '12' },
                            { id: 13, label: '13' },
                            { id: 14, label: '14' },
                            { id: 15, label: '15' },
                            { id: 16, label: '16' },
                            { id: 17, label: '17' },
                            { id: 18, label: '18' },
                            { id: 19, label: '19' },
                            { id: 20, label: '20' },
                            { id: 21, label: '21' },
                            { id: 22, label: '22' },
                            { id: 23, label: '23' },
                            { id: 24, label: '24' },
                            { id: 25, label: '25' },
                            { id: 26, label: '26' },
                            { id: 27, label: '27' },
                            { id: 28, label: '28' },
                            { id: 29, label: '29' },
                            { id: 30, label: '30' },
                            { id: 31, label: '31' },
                            { id: 32, label: '32' },
                            { id: 33, label: '33' },
                            { id: 34, label: '34' },
                            { id: 35, label: '35' },
                            { id: 36, label: '36' },
                            { id: 37, label: '37' },
                            { id: 38, label: '38' },
                        ], //候选值数据源
                        // rules: this.check_rules({ required: true }), //检验
                        /*
                         * 组件的change方法->(val, model, index,formData,formModel)
                         * @param val 当前选中值
                         * @param model 当前整个对象
                         * @param index 当前整个对象的位置
                         * @param formData 当前表单的所有值
                         * @param formModel 当前整个配置项值
                         */
                        handleChange(val, model, index, formData, formModel) {},
                    },
                    upDate:{
                        key: 'upDate', //key值(必填)
                        elemType: 'datePicker', //类型(必填)
                        name: '日期范围', //组件label名字(必填)
                        value: [],
                        type: 'daterange',//双个日期范围
                        startplaceholder: '开始日期',
                        endplaceholder: '结束日期',
                        valueFormat: 'yyyy-MM-dd',
                    },
                    remark: {
                        key: 'remark',
                        elemType: 'input',
                        name: '用途说明',
                        type: "textarea",
                        maxlength: 200,
                    },
                    areaCodes:{
                        key: 'areaCodes',
                        elemType: 'cascader',
                        name: '管理区域',
                        showAllLevels: false, //是否展示完整路径
                        child: [],
                        props:{
                            value: 'areaCode',
                            label: 'areaName',
                            children: 'children',
                            emitPath: true,
                            checkStrictly: false, //可选择任意一级选项
                            multiple: true, //展示多选
                        },
                    },
                    // 上传
                    // url: {
                    //     key: 'url',
                    //     elemType: 'upload',
                    //     name: '上传海报底图',
                    //     type: 'imgUpload',
                    //     limit: 1,
                    //     config: this.$config,
                    //     path: 'drivingPoster', //传参前缀地址
                    //     // rules: this.check_rules({ required: true }),
                    //     fileName: '',
                    //     // handlerImgUrl(val, model, formData) {
                    //     //     if (val != '') {
                    //     //         var img = new Image()
                    //     //         img.src = val
                    //     //         img.onload = function (e) {
                    //     //             formData.reproduction = `${this.width} × ${this.height}`
                    //     //         }
                    //     //     } else {
                    //     //         formData.reproduction = ''
                    //     //     }
                    //     // },
                    // },

                },
                //底部按钮配置
                bottomBtn: [
                    {
                        value: '保存',
                        loading: false,
                        className: 'btn-active',
                        type: 'primary',
                        size: 'small',
                        method: (_this, formName, btn) => {
                            _this.$refs[formName].validate((valid) => {
                                if (valid) {
                                    // btn.loading = true
                                    let dialogFormData = Object.assign({}, this.dialogFormData)
                                    // dialogFormData.schoolQrCodeWidth = dialogFormData.schoolQrCodeHeight
                                    console.log('dialogFormData:',dialogFormData)
                                    //新增接口
                                    // api.drivingPoster.add(dialogFormData).then((res) => {
                                    //     if (res.status) {
                                    //         //新增成功后回调后端传参
                                    //         this.$message({ message: res.message, type: 'success' })
                                    //         this.getList()
                                    //         //新增成功后关闭弹窗并清空校验
                                    //         this.dialogVisible = false
                                    //         _this.$refs[formName].resetFields()
                                    //     }
                                    //     //关闭loading
                                    //     btn.loading = false
                                    // })
                                } else {
                                    return false
                                }
                            })
                        },
                    },
                    {
                        value: '取消',
                        type: 'primary',
                        size: 'small',
                        method: (_this, formName, btn, formData, createFormModel) => {
                            console.log('dialogFormData:',_this.$refs[formName])
                            // const noChange = this.deepDiffObject(formData, createFormModel)
                            const noChange = true
                            const needTips = Object.keys(formData).some((key) => formData[key])
                            if (noChange) {
                                //取消时 关闭dialog弹窗
                                this.dialogVisible = false
                                //取消时 清空所有校验
                                _this.$refs[formName].resetFields()
                            } else if (needTips) {
                                this.$confirm('所填写内容将不被保存，是否取消', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning',
                                }).then(() => {
                                    this.dialogVisible = false
                                    _this.$refs[formName].resetFields()
                                })
                            } else {
                                this.dialogVisible = false
                                _this.$refs[formName].resetFields()
                            }
                        },
                    },
                ],
            },
            tableData: [],
        }
    },
    mounted() {
        this.setTableHead()
        this.search()
        this.searchOptions()
    },
    methods: {
        /**
         * 设置表头
         */
        setTableHead() {
            const head = [
                {
                    prop: 'name',
                    label: '姓名',
                },
                {
                    prop: 'phone',
                    label: '手机',
                },
                {
                    prop: 'positionName',
                    label: '职位',
                },
                {
                    prop: 'departmentName',
                    label: '部门',
                },
                {
                    prop: 'statusText',
                    label: '账号状态',
                },
                {
                    prop: 'lastLoginTime',
                    label: '最新登录时间',
                },
                {
                    prop: 'createdName',
                    label: '创建人',
                },
                {
                    prop: 'createdTime',
                    label: '创建时间',
                },
            ]
            this.searchForm.table.head = head
        },
        search(){
            this.setTableBody()
        },
        setTableBody(){
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
                    phone: "15921046393",
                    positionId: 2,
                    positionName: "管理员",
                    sex: 0,
                    statusText: "启用"
                },{
                    createdName: "马丁的企业端",
                    createdTime: "2021-09-23",
                    departmentName: "监管端部门根节点",
                    isAdmin: 1,
                    isAdminText: "是",
                    isPosition: 1,
                    isPositionText: "是",
                    lastLoginTime: null,
                    name: "系统管理员",
                    phone: "18321906902",
                    positionId: 2,
                    positionName: "管理员",
                    sex: 0,
                    statusText: "启用"
                }
            ]
            let total= 2
            this.searchForm.table.body = data
            this.searchForm.pageinfo.total = total
            //手动添加字段和属性值
            if (this.searchForm.table.body != '') {
                this.searchForm.table.body.forEach((items) => {
                    items.isPosition == 1
                        ? this.$set(items, 'isPositionText', '是')
                        : this.$set(items, 'isPositionText', '否')
                })
            }
        },
        searchOptions (){

        },
        /**
         重置搜索
         */
        resetSearch() {
            for (const it of this.searchForm.searchFormItemArr) {
                it.value = ''
            }
            this.search()
        },
        // 切换table
        handleCurrentChange(currentPage) {
            this.searchForm.pageinfo.currentPage = currentPage
            this.setTableBody()
        },
        // 切换每个页面的数量
        handleSizeChange(pageSize) {
            this.searchForm.pageinfo.pageSize = pageSize
            this.setTableBody()
        },
        /**
         * 列表操作
         */
        optionBtnClick(row, btn) {
            switch (btn.func) {
                // case 'query':
                //     this.toDetail(btn.label, row)
                //     break
                case 'update':
                    console.log('update:')
                    // this.updateStaff(btn.label, row)
                    break
                case 'delete':
                    console.log('delete:')
                    // this.deleteStaff(row)
                    break
                default:
                    break
            }
        },
        /**
         * 列表单独操作按钮 (导出，新增，下载)
         */
        tableBtnClick(btn) {
            switch (btn.func) {
                case 'add':
                    console.log('add:')
                    this.addAccount(btn.label)
                    // this.$refs.AddClerk.init(btn.label)
                    break
                case 'import':
                    console.log('import:')
                    // this.$refs.DialogImportStaff.init()
                    break
                case 'downloadModel':
                    console.log('downloadModel:')
                    // this.getImportFile()
                    break
                default:
                    break
            }
        },
        addAccount(label, row){
            this.dialogModel.title = '新增子部门';
            this.dialogVisible = true
        },
        //关闭弹窗
        bindClosed() {
            this.time = Date.now()
            this.search()
        },
    }
}
</script>




<style lang='scss' scoped>
    .h1{
        .h2{

        }
    }
</style>