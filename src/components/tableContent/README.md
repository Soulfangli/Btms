### 搜索项 
```
    searchForm：{  //整页配置
        show: true, //是否展示
        reset: true, //是否展示重置按钮
        showFormItemNum: 3, //最多展示多个搜索条件，超出隐藏
        searchLabelwidth: '120px', //搜索栏宽度
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
                        value: '',  //必填
                        multiple: false,    //必填 是否多选
                        label: '职位名称',  //必填
                        span: 6,
                        placeholder: '请选择',
                        options: [],    //必填 选择器的待选值
                    },
                    {
                        elementType: 'cascader',    //必填，级联选择器
                        key: 'departmentId',    //必填 key
                        value: '',
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
        }                             
    }

**********所有内容均在 searchForm：{}里编写**********



















