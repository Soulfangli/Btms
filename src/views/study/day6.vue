<template>
    <div class="container">
        <tableContent
            v-show="showModule == 'list'"
            :prop-data="searchForm"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        />
        <component :is="componentName" :datalist="datalist" :id="id" @close="closeComponent"></component>
    </div>
</template>

<script>
import { tableContent } from '@/components'
import fixposition from './components/fixposition.vue'


export default {
    components: { tableContent, fixposition },
    data() {
        return {
            searchForm: {
                show: true,
                reset: true,
                searchLabelwidth: '100px',
                showFormItemNum: 3, // 初始，一行显示多出收起时，一行显示几个表单项【不需要伸展操作时不传或0】
                searchFormItemArr: [
                    {
                        elementType: 'input',
                        label: '职位名称',
                        key: 'positionName',
                        value: '',
                        placeholder: '请输职位名称',
                        span: 12,
                    },
                ],
                pageinfo: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                table: {
                    head: [],
                    body: [],
                    type: 'selection',
                    isHiddenIndex: true, //去除序号
                    selection:true, //添加多选框 添加的同时，需要添加handleSelectionChange(){}方法
                    // tableloading: true,
                    // tableHeight: `calc(100vh - 285px)`,
                    btns: [
                        {
                            label: '新增',
                            func: 'add',
                            type: 'primary',
                            icon: 'el-icon-plus',
                            inquiry: false,
                            permission: { groupCode: '67002',code:2}
                        },
                    ],
                    options: {
                        hidden: false,
                        width: 120,
                        render(h, params) {
                            console.log(h, params)
                        },
                        //
                        btnList: [
                            // {
                            //     label: '查看',
                            //     func: 'query',
                            //     type: 'text',
                            //     inquiry: false,
                            // },
                            {
                                label: '修改',
                                func: 'fixposition',
                                type: 'text',
                                inquiry: false,
                            },
                            {
                                label: '删除',
                                func: 'delete',
                                type: 'text',
                                color: '#F4333C',
                                inquiry: true,
                                msg: '确定删除此职位？',
                            },
                        ],
                    },
                },
            },
            showModule: 'list', // 控制显示隐藏列表
            componentName: '', // 控制渲染那个子组件
            id: '', // 根据id获取预约详情
            datalist: {},
        }
    },
    mounted() {
        this.setTableHead()
        // 获取搜索条件的待选项
        // this.searchOptions()
        this.search()
    },
    methods: {
        /**
         * 列表单独操作按钮
         */
        tableBtnClick(btn) {
            switch (btn.func) {
                case 'add': //新增一列
                    this.add(btn)
                    break
                default:
                    break
            }
        },
        /**
         * 设置表头
         */
        setTableHead() {
            const head = [
                {
                    prop: 'positionName',
                    label: '职位名称',
                },
                {
                    prop: 'departmentName',
                    label: '所属部门',
                },
                {
                    prop: 'remark',
                    label: '说明',
                },
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
            let datalist = [{
                departmentId: 44,
                departmentName: "前端开发部",
                id: 34,
                permissions: null,
                positionName: "www",
                remark: "打打",
                roleId: 142,
            },{
                departmentId: 44,
                departmentName: "前端开发部",
                id: 17,
                permissions: null,
                positionName: "前端小白",
                remark: "前端小白前端小白前端小白前端小白123",
            }
            ]
            this.searchForm.table.body = datalist
            this.searchForm.pageinfo.total = 2
            // let params = {
            //     positionName: this.searchForm.searchFormItemArr.filter((it) => it.key == 'positionName')[0].value,
            //     departmentId: this.searchForm.searchFormItemArr.filter((it) => it.key == 'departmentId')[0].value,
            //     pageIndex: this.searchForm.pageinfo.currentPage,
            //     pageSize: this.searchForm.pageinfo.pageSize,
            // }
            // queryPosition(params)
            //     .then((res) => {
            //         if (res.code === 0) {
            //             this.searchForm.table.body = res.data.data
            //             this.searchForm.pageinfo.total = res.data.total
            //         }
            //     })
            //     .finally(() => {})
        },

        // 获取搜索栏所有待选项数据
        searchOptions() {
            // let params = {
            //     pageIndex: this.searchForm.pageinfo.currentPage,
            //     pageSize: this.searchForm.pageinfo.pageSize,
            // }
            // queryCurDepartmentAndSub(params)
            //     .then((res) => {
            //         let datalist = []
            //         datalist.push(res.data)
            //         this.isdeletefn(datalist)
            //         this.replaceId(datalist)
            //         this.searchForm.searchFormItemArr.filter((it) => it.key == 'departmentId')[0].options =
            //             this.wipeNovalue(datalist, 'departmentId')
            //     })
            //     .finally(() => {})
        },
        //去除空余数组
        isdeletefn(arr) {
            if (arr) {
                arr.forEach((item) => {
                    if (item.subDepartment == '') {
                        delete item.subDepartment
                    }
                    this.isdeletefn(item.subDepartment)
                })
            }
        },
        //替换id==>departmentId
        replaceId(arr) {
            if (arr) {
                arr.forEach((index) => {
                    this.$set(index, 'departmentId', index.id)
                    this.replaceId(index.subDepartment)
                })
            }
        },
        // 消除空值
        wipeNovalue(data, key) {
            for (const it of data) {
                if (it[key] && it[key].length == 0) {
                    it[key] = undefined
                } else if (it[key] && it[key].length > 0) {
                    this.wipeNovalue(it[key], key)
                }
            }
            return data
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
                case 'delete': //删除当前列
                    this.deletepositon(row, 'list')
                    break
                case 'fixposition': //修改当前列
                    this.fixposition(0, row, 'list')
                    break
                default:
                    break
            }
        },
        deletepositon(row) {
            console.log('11111111')
            this.searchForm.table.body = this.searchForm.table.body.filter(
                (item) => item.id !== row.id
            );
            // let params = {
            //     id: row.id,
            // }
            // deletePosition(params)
            //     .then((res) => {
            //         this.$message.success('删除成功！')
            //         if (this.searchForm.table.body.length == 1 && this.searchForm.pageinfo.currentPage > 1) {
            //             this.searchForm.pageinfo.currentPage -= 1
            //         }
            //         this.search()
            //     })
            //     .catch((err) => {})
        },
        /**
         * 修改详情
         */
        fixposition(type, row, where) {
            this.datalist = row
            this.datalist.title = '修改'
            this.showModule = ''
            this.componentName = 'fixposition'
        },
        add() {
            this.datalist.title = '新增'
            this.showModule = ''
            this.componentName = 'fixposition'
        },
        // 关闭组件，回到列表
        closeComponent(index) {
            // 1 回到列表要刷新列表
            if (index == 1) {
                this.setTableBody()
            }
            this.componentName = ''
            this.showModule = 'list'
        },
        handleSelectionChange(val){
            console.log(val)
        }
    },
}
</script>

<style></style>
