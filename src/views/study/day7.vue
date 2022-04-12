<template>
    <div class="container">
        <tableContent
        
            ref="contentTable"
            :prop-data="searchForm" 
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"/>
        <PeizhiManage ref="peizhiManage" @closedialog="closeComponent"></PeizhiManage>
    </div>
</template>

<script>
import { tableContent } from '@/components'
import PeizhiManage from './components/peizhiManage'
// import paramsList from '@/utils/paramsList'
// import { queryConfigByGroups } from '@/api/common'
// import { queryConfigGroup } from '@/api/selfSetting'
export default {
    components: { tableContent, PeizhiManage },
    data() {
        return {
            searchForm: {
                show: true,
                reset: true,
                searchLabelwidth: '100px',
                searchFormItemArr:[
                    {
                        elementType: 'input',
                        label: '配置名称',
                        labelWidth: 100,
                        key: 'name',
                        value: '',
                        placeholder: '请输入配置名称',
                        span: 6
                    },
                    {
                        elementType: 'datePicker', //必填，日期选择器
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
                        elementType: 'select',
                        key: 'dataType',
                        value: '',
                        multiple: false,
                        label: '值类型',
                        labelWidth: 100,
                        span: 6,
                        placeholder: '请选择值类型',
                        options: [
                        ]
                    }
                ],
                pageinfo: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
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
                            // VhasPermi: [ safety:recheck:recheck'] 
                        }
                    ],
                    options: {
                        hidden: false,
                        width: 140,
                        render(h, params) {
                            // console.log(h, params)
                        },
                        btnList: [
                            {
                                label: '查看',
                                func: 'seeDetail',
                                type: 'text',
                                inquiry: false,
                            },
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
                                inquiry: false,
                            }
                        ]
                    }
                }
            },
            // paramsList: paramsList,
            // groupIds: [paramsList['groupIds']['ONE_VALUE_TYPE']],
            // showModule: "list", // 控制显示隐藏列表
            // componentName: '',  // 控制渲染那个子组件
            // handleType: '-1', // 操作类型，增'0'、改'1' 等操作
            // handleData: {} // 组件通信数据
        }
    },
    mounted() {
        this.setTableHead()
        // 获取搜索条件的待选项
        this.searchOptions() 
        // 获取表格数据
        this.search()
    },
    methods: {
        // 获取搜索栏所有待选项数据
        searchOptions() {
           this.datalist1 = [
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
            this.searchForm.searchFormItemArr.filter(it => it.key=='dataType')[0].options = this.datalist1;
            console.log(this.searchForm.searchFormItemArr,"1111")
            //这里打印能够打印出来，但是，页面显示不了这里面的数据，就很奇怪

            // queryConfigByGroups({ groupIds: this.groupIds }).then(res => {
            //     // console.log(res)
            //     let options = res.data[this.paramsList['groupIds']['ONE_VALUE_TYPE']];
            //     for (const it of options) {
            //         it['label'] = it.text;
            //     }
            //     this.searchForm.searchFormItemArr.filter(it => it.key=='dataType')[0].options = options;
            // })
        },
        /**
         * 设置表头
         */
        setTableHead() {
            const head = [
                {
                    prop: 'name',
                    label: '配置名称',
                    minWidth:'120px'
                },
                {
                    prop: 'id',
                    label: 'ID',
                    minWidth:'100px'
                },
                {
                    prop: 'dataTypeText',
                    label: '值类型',
                    width:'120px'
                },
                {
                    prop: 'isExpandText',
                    label: '是否可扩展',
                    width:'120px'
                }
            ]
            this.searchForm.table.head = head
        },
        /**
         * 搜索数据
         */
        search() {
            this.searchForm.pageinfo.currentPage = 1
            this.setTableBody()
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
        /**
         * 获取设置表格数据
         */
        setTableBody() {
            let datalist = [
                {
                    name: "前端开发部",
                    id: 34,
                    dataTypeText: "打打",
                    isExpandText: "是",
                },{
                    name: "前端开发部",
                    id: 44,
                    dataTypeText: "打打",
                    isExpandText: "否",
                }
            ]
            this.searchForm.table.body = datalist
            this.searchForm.pageinfo.total = 2


            let params = {
                // dataType: this.searchForm.searchFormItemArr.filter(it => it.key=='dataType')[0].value,
                name: this.searchForm.searchFormItemArr.filter(it => it.key=='name')[0].value,
                pageIndex: this.searchForm.pageinfo.currentPage,
                pageSize: this.searchForm.pageinfo.pageSize
            }
            queryConfigGroup(params).then(res => {
                this.searchForm.table.body = res.data.data
                this.searchForm.pageinfo.total = res.data.total
            }).catch(error => {
            })
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
         * 列表操作
         */
        optionBtnClick(row, btn) {
            switch (btn.func) {
                case 'seeDetail':
                    this.handleInfo('-1',row,'list')
                    break
                case 'update':
                    this.handleInfo('1',row,'list')
                    break
                case 'delete':
                    this.deleteFn(row)
                    break
                default:
                    break
            }
        },
        /**
         * 列表单独操作按钮
         */
        tableBtnClick(btn) {
            switch (btn.func) {
                case 'add':
                    this.handleInfo('0',{},'list')
                    break
                default:
                    break
            }
        },
        /**
         * 看'-1'、增'0'、改'1'、删'2' 等操作
         */
        handleInfo(type,row,where) {
            this.$refs.peizhiManage.open(type,row,where)
        },
        /**
         * 关闭组件，回到列表
         */
        closeComponent(index) {
            // 1.回到列表要刷新列表
            if (index == 1) {
                this.setTableBody()
            }
            this.componentName = ''
            this.showModule = 'list'
        },
        // 删除
        deleteFn(row) {
             console.log('11111111')
            this.searchForm.table.body = this.searchForm.table.body.filter(
                (item) => item.id !== row.id
            );

            // this.$confirm(`确定要删除吗?`, '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            //     }).then(() => {
            //         deleteConfigGroup({id: row.id}).then(res => {
            //             if(res.code == 0){
            //                 this.$message({
            //                     type: 'success',
            //                     message: '删除成功!'
            //                 });
            //                 if(this.searchForm.table.body.length == 1 && this.searchForm.pageinfo.currentPage > 1) {
            //                     this.searchForm.pageinfo.currentPage -= 1
            //                 }
            //                 this.setTableBody()
            //             }
            //         })
            //     }).catch(() => {
            //     });
        }
    }
}
</script>

<style></style>
