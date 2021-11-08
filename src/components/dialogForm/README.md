### 搜索表单

=========公司的弹出窗组件，需做更改，请按需查看=============
```
- @directive formVisible 弹窗显隐
- @directive dialogModel 弹窗组件配置
- @function dialogFormData 弹窗数据
```
### 例子:
```
dialogData:{}, //弹窗表单输出值
dialogVisible:false, //弹窗显隐
dialogFormData:{  //弹窗配置数据
    title:'新增商品单元', //弹窗title
    width:'30%',  //弹窗宽度
    labelWidth:'20%', //表单组件文字宽度
    top:'10%', //弹窗高度

    //弹窗表单基础配置
    formModel:[
         //input组件配置
        {
            key:'name',  //key值(必填)
            elemType:"input",  //类型(必填)
            name:'单元名称',  //组件label名字(必填)
            maxlength:'30',  //输入框最长输入值
            rules:this.filter_rules({d:true,trigger:'blur'})  //检验
        },
        //下拉框组件配置
        {
            key:'school_id',  //key值(必填)
            elemType:"select",   //类型(必填)
            name:'驾校',  //组件label名字(必填)
            colValue:'id',   //候选值的value值-key
            colName:'companyname',  //候选值的label值-key
            child:[],   //候选值数据源
            rules:this.check_rules({required:true}),    //检验
            /*
             * 组件的change方法->(val, model, index,formData,formModel)
             * @param val 当前选中值
             * @param model 当前整个对象
             * @param index 当前整个对象的位置
             * @param formData 当前表单的所有值
             * @param formModel 当前整个配置项值
             */
            handleChange(val, model, index,formData,formModel){
            }
        },
        //上传组件配置
        {
            key:'cover_img_pc', //key值(必填)
            elemType:"upload",  //类型(必填)
            name:'PC封面图',   //组件label名字(必填)
            type:'singlePic',  //type: 单图singlePic，多图: pictureCard .（其他类型没写）
        },
        //富文本组件配置
        {
            key:'details',  //key值(必填)
            elemType:"quill",   //类型(必填)
            name:'详情内容',    //组件label名字(必填)
        },
         //单选框
        {
            key:'radioOnly',    //key值(必填)
            elemType:"radioOnly",   //类型(必填)
            name:'驾考类型',    //组件label名字(必填)
            radioArr:[{value:1,label:'是'},{value:0,label:'否'}],  //radio候选值
        },
         //单选框 和 输入框 组合
        {
            key:'radioKey', //单选框key
            elemType:"radioAndInput", //类型 固定 radioAndInput
            name:'商品价格', //表单展示label
            inputKey:'inputKey', //输入框key
            inputTitleFront:'123', //输入框前面展示的提示信息
            inputTitleAfter:'123', //输入框后面展示的提示信息
            width:'45%',  //单选框box宽度，变形了可以用
            disabledTerm:'1',   //输入框disabled判断条件,如果等于 radioArray 那个label值，其他就会置灰
            radioArray:[{ label:'1',value:'C1',},{label:'2',value:'C2',}]   //单选框数组
        },
        //动态添加表格组件
        {
            elemType:"table",
            name:'拼团规则',
            key:'tableData',
            buttonBype：true,//没有输入框
            openInput:true,  //表格是否可以输入，开始输入框
            openDelete:true, //开始删除按钮
            buttonIs:true,//表示不需要新增按钮，表格只有一行记录

            tableModel:[
                {prop:'date',label:'日期',width:200,showType:'img'},//showType为图片
                {prop:'price',label:'C1价格(元)',width:200}
            ],
            defaultValue:[
                {date:'123456',price:'1333'}
            ]
        }
        //仅展示图片
        {
            elemType:"image",
            key:'url',
        }
        //分割线
        {
            key: "key" //key值(必填)
            elemType: "divider",
            location: 'left', //位置
            dividerTitle: ""//分割线内容
        }
        //全选问题
        schoolIds:{
                    key:'schoolIds',
                    jrOld:true,//兼容老的写法 老写法是不需要加上这一句代码的
                    keyType:'Array',
                    isCheckAll:true, //可以删除
                    checkAll:false,
                    isIndeterminate:true,
                    elemType:"checkbox",
                    name:'接收对象',
                    id:'id',
                    shortName:'shortName',
                    child:[],  //选项
                    rules:this.check_rules({required:true,type:'array'}),    //检验
                    handleCheckAllChange:(val,model,formData)=>{    //处理函数
                        let arr = []
                        model.child.map(v=>{
                            arr.push(v.id)
                        })
                        formData.schoolIds = val ? arr : [];
                    }
                },
    ],
    //底部按钮配置
    bottomBtn:[{
        value:'取消',
        loading:false,
        type:'primary',
        size:'small',
        method:(_this,formName) =>{

        }
    },{
        value:'保存',
        loading:false,
        className:'btn-active',
        type:'primary',
        size:'small',
        method:(_this,formName) =>{

        }
    }]
}





























