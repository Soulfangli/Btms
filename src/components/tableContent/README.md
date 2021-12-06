### 搜索项 
```
    searchForm：{  //整页配置
        show: true, //是否展示
        reset: true, //是否展示重置按钮
=============有以下2个参数：rowKey、TreeProps 时，为树状表格======================

        rowKey: 'id', //树状表格的row-key；由后端传值决定使用哪个字段；一般为id
        TreeProps: {
                    //树状表格的子集，由后端决定使用哪个字段；一般为children
                    children: 'children',
                },

================================================================================
        showFormItemNum: 3, //最多展示多个搜索条件，超出隐藏;不展示时写0或注释
        searchLabelwidth: '120px', //搜索栏宽度
        pageHide: true,  //为true时，不显示分页；默认是false，显示分页
        pageinfo: {  
                    currentPage: 1, //默认展示第一页
                    pageSize: 10, //默认一页有10条
                    total: 0,  //共多少页
                },
        searchFormItemArr: [ //搜索栏配置
                    {
                        elementType: 'input',   //必填，输入框类型
                        label: '员工姓名',  //必填，lable
                        key: 'name',    //必填 key
                        value: '',  //必填 值
                        placeholder: '请输入员工姓名',
                        span: 6,
                    },
                    {
                        elementType: 'select',  //必填，选择器
                        key: 'positionId',  //必填
                        value: '',  //必填  选中的值
                        multiple: false,    //必填 是否多选
                        label: '职位名称',  //必填
                        span: 6,
                        placeholder: '请选择',
                        options: [],    //必填 选择器的待选值
                    },
                    {
                        elementType: 'cascader',    //必填，级联选择器
                        key: 'departmentId',    //必填 key
                        value: '',  //选中的值
                        label: '所属部门',
                        span: 6,
                        placeholder: '请选择',
                        options: [],    //级联选择器的待选值
                        showallLevels: false, //级联选择器不显示路径
                        props: {
                            emitPath: false,  //在选中节点改变时，是否返回由该节点所在的各级菜单值所组成的数组，若设置 false，则只返回该节点的值
                            checkStrictly: true,    //是否严格的遵守父子节点不互相关联 往往与emitPath互斥
                            multiple: false,    //是否多选
                            value: 'id',
                            label: 'departmentName',
                            children: 'subDepartment',  //级联 子集待选值
                        },
                    },
                    {
                        elementType: 'date-picker', //必填，日期选择器
                        label: '上报时间',  //必填
                        key: 'receiveTimeFrom',//必填
                        value: [],  //必填
                        type: 'daterange',  //必填 日期选择器的类型参考element
                        valueformat: 'yyyy-MM-dd',  //日期格式
                        startplaceholder: '开始时间',
                        endplaceholder: '结束时间',
                        placeholder: '请选择',
                        span: 6
                    },
                    {
                        elementType: 'checkboxGroup', //必填，多选
                        label: '上报时间',  //必填
                        key: 'receiveTimeFrom',//必填
                        value: [],  //必填
                        options: [],    //多选的待选值
                    },
                    {
                        elementType: 'radioGroup', //必填，单选
                        label: '上报时间',  //必填
                        key: 'receiveTimeFrom',//必填
                        value: [],  //必填
                        options: [],    //单选的待选值
                    },
                ],
=====================↑↑↑↑↑↑↑↑↑至此搜索栏已经结束↑↑↑↑↑↑↑↑↑↑===========================================================   

=====================↓↓↓↓↓↓↓↓↓以下为表格全部内容↓↓↓↓↓↓↓↓↓↓===========================================================
        table：{    //表格
            head: [],   //表头
            body: [],   //表格主体，一般通过接口获取
            type: 'selection',  //类型判断，tableContent.index有个判断
            btns: [     //表格右上角按钮，一般是 新增，导出，导入等
                {
                    label: '新增',          //必填 label
                    func: 'add',            //必填 方法
                    type: 'primary',        //必填 类型
                    icon: 'el-icon-plus',   
                    inquiry: false,         //必填 判断是否弹出二级弹窗，一般用于---删除
                },
            ],
            options: {  //表格 行内操作按钮
                        hidden: false, //必填  是否隐藏
                        width: 180,
                        render(h, params) { //可手动添加一些样式
                            console.log(h, params)
                        }, 
                        btnList: [  //按钮组
                            {   
                                label: '查看', 
                                func: 'seeDetail',
                                type: 'text',
                                inquiry: false,
                            },
                            {
                                label: '修改', 
                                func: 'fix',
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
        }                             
    }

**********所有内容均在 searchForm：{}里编写**********

=====================↓↓↓↓↓↓↓↓↓以下为表格全部方法↓↓↓↓↓↓↓↓↓↓===========================================================
        // 选择器组件，选中节点变化时触发
        handleChange(item){
            this.$emit('handleChange',item)
        },
        // 展开收起事件  该方法无需写在具体的模块中，是公共组件控制搜索框展开收起
        extend() {
            this.isextend = !this.isextend
            if (this.isextend) {
                this.showFormItemNum = this.propData.searchFormItemArr.length
            } else {
                this.showFormItemNum = this.propData.showFormItemNum
            }
        },
        //序号
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
                //element使用table样式混乱问题解决方案(doLayout)
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
         * 单独按钮操作   //一般用于导出、新增等，在表格右上方，不在表格内的按钮逻辑
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
=====================================================================================================================
====================================||||||||||||||||         ||||||||||||||||========================================
====================================↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓模块内事例↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓========================================
        <content-table
            :prop-data="searchForm"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            @handleChange="handleChange"     
        />
        
        //peizhiManage为动态组件名称，可更改
        <peizhiManage ref="peizhiManage" @closedialog="closeComponent"/>

        // 获取搜索栏所有待选项数据
        searchOptions() {
            queryConfigGroups({ groupIds: this.groupIds })
                .then((res) => {
                    let options = res.data[this.groupIds[0]]
                    for (const it of options) {
                        it['label'] = it.name  //将后端传的label转成 name
                        it['value'] = it.id    //将后端传的value转成 id
                    }
                    //搜索项
                    this.searchForm.searchFormItemArr.filter((it) => it.key == '搜索字段1')[0].options = options
                })
                .catch((error) => {})
        },
        // 搜索栏选项改变事件
        handleChange(e) {
            switch (e.key) {    //e.key获取节点key值，然后根据key值判断，写逻辑
                case 'departmentId': 
                    this.searchForm.searchFormItemArr[2].value = ''   
                    this.searchForm.searchFormItemArr[2].options = []
                    this.handelPosition(e.value)    //这里是根据下拉值进行接口、方法调用
                    break
                default:
                    break
            }
        },
        //设置表头
        setTableHead(){
            const head = [  
                //表头
                {
                    prop: 'name',
                    label: '配置名称',
                    minWidth:'120px'  //表头可设置minWidth 长度不固定的可用
                },
                {
                    prop: 'id',
                    label: 'ID',
                    width:'100px'   //表头可设置width 短的项可用
                },
            ]
        },
        //搜索数据
        search() {
            this.searchForm.pageinfo.currentPage = 1
            this.setTableBody()
        },
        //重置搜索
        resetSearch() {
            for (const it of this.searchForm.searchFormItemArr) {
                it.value = ''
            }
            this.search()
        },
        //获取设置表格数据
        setTableBody(){
            ...从后端接口获取表格数据

             let params = {
                搜索条件参数1: this.searchForm.searchFormItemArr.filter(it => it.key=='搜索条件参数1')[0].value,
                搜索条件参数2: this.searchForm.searchFormItemArr.filter(it => it.key=='搜索条件参数2')[0].value,
                pageIndex: this.searchForm.pageinfo.currentPage, 
                pageSize: this.searchForm.pageinfo.pageSize
            }
            后端接口(params).then(res => {
                this.searchForm.table.tableloading = false; // loading...
                this.searchForm.table.body = res.data.data ? res.data.data : []
                this.searchForm.pageinfo.total = res.data.total
            }).catch(error => {
                this.searchForm.table.tableloading = false;
            })
        },

        /**
         * 列表单独操作按钮
         */
        tableBtnClick(btn) {
            switch (btn.func) {
                case 'add':     //新增
                    this.handleInfo('0',row,'list')
                    break
                default:
                    break
            }
        },
        /**
         * 列表操作
         */
        optionBtnClick(row, btn) {
            switch (btn.func) {
                case 'seeDetail':  //查看当前列
                    this.handleInfo('-1',row,'list')
                    break
                case 'delete': //删除当前列 delete：删除仅需传 row即可，无需跳转
                    this.deletefunc(row)
                    break
                case 'fix': //修改当前列
                    this.handleInfo('1',row,'list')
                    break
                default:
                    break
            }
        },
        //页面跳转方法，在列表操作内定义跳转方法（handleInfo），传参，由下面方法进行跳转
        /**
         * 看'-1'、增'0'、改'1' 等操作
         */
        handleInfo(type,row,where) {
            //peizhiManage为动态组件名称，可更改
            this.$refs.peizhiManage.open(type,row,where)
        },
         //删除
        deletefunc(row){
            写逻辑、接口...
            let params = {
                id: row.id,
            }
            deleteApi(params)
                .then((res) => {
                    this.$message.success('删除成功！')
                    if (this.searchForm.table.body.length == 1 && this.searchForm.pageinfo.currentPage > 1) {
                        this.searchForm.pageinfo.currentPage -= 1
                    }
                    this.search()
                })
                .catch((err) => {})
        },
        // 每页条数改变
        handleSizeChange(pageSize) {
            this.searchForm.pageinfo.pageSize = pageSize
            this.setTableBody()
        },
        // 翻页
        handleCurrentChange(currentPage) {
            this.searchForm.pageinfo.currentPage = currentPage
            this.setTableBody()
        },

         /**
         * 关闭动态组件，回到列表
         */
        closeComponent(index) {
            // 1.回到列表要刷新列表
            if (index == 1) {
                this.setTableBody()
            }
        },
====================================================================================================================

