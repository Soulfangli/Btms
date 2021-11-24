
<template>
    <div class="container">
        <el-row type="flex" align="middle" justify="center" style="position: relative;">
            <el-button type="text" icon="el-icon-back" style="position: absolute;left: 0;" @click="goback()">返 回</el-button>
            <h4>{{propData.title}}</h4>
        </el-row>
        <tableContent
            :prop-data="searchForm"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange" />
    </div>
</template>

<script>
import { tableContent } from "@/components";
export default {
    components: { tableContent },
    props: {
        propData: {
            type: Object,
            default: ()=>{
                return {
                    title: ''
                }
            }
        }
    },
    data() {
        //这里存放数据
        return {
            searchForm: {
                show: false,
                reset: false,
                pageinfo: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                table: {
                    head: [],
                    body: [],
                    type: 'selection',
                    tableloading: false,
                    options: {
                        hidden: false,
                        width: 70,
                        render(h, params) {
                            console.log(h, params)
                        },
                        // 
                        btnList: [
                            {
                                label: '查看',
                                func: 'seeFn',
                                type: 'text',
                                inquiry: false,
                                // isexists: {
                                //     key: 'status', // 作为操作项是否存在的判断属性名
                                //     value: [1] // 应该存在时的满足条件的可能值
                                // }
                            }
                        ]
                    }
                }
            },
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        /**
         * 设置表头
         */
        setTableHead() {
            const head = [
                // {
                //     prop: 'index',
                //     label: '序号'
                // },
                {
                    prop: 'createdTime',
                    label: '提交时间'
                },
                {
                    prop: 'bizTypeText',
                    label: '提审内容'
                },
                {
                    prop: 'verifyHandleStatusText',
                    label: '状态'
                },
                {
                    prop: 'companyName',
                    label: '驾校全称'
                },
                {
                    prop: 'creditCode',
                    label: '统一社会信用代码'
                },
                {
                    prop: 'legalPerson',
                    label: '法定代表人'
                },
                {
                    prop: 'licenceCode',
                    label: '许可证号'
                },
                {
                    prop: 'certEffectiveDateFrom',
                    label: '许可证发放日期'
                },
                {
                    prop: 'businessTypeText',
                    label: '业户类别'
                },
                {
                    prop: 'businessStatusText',
                    label: '经营状态'
                },
                {
                    prop: 'isShowText',
                    label: 'APP是否显示'
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
         * 获取设置表格数据
         */
        setTableBody() {
            let data=[
                {
                    bizType: 1,
                    bizTypeText: "基础信息",
                    businessStatus: 1,
                    businessStatusText: "营业",
                    businessType: 2,
                    businessTypeText: "分支机构",
                    certEffectiveDateFrom: null,
                    certEffectiveDateTo: null,
                    companyId: 1,
                    companyName: "上海安畅汽车牵引有限公司",
                    createdTime: "2021-11-02 16:38",
                    creditCode: "9133010058B079540",
                    driverSchoolId: 1,
                    id: 641,
                    isShow: 1,
                    isShowText: "是",
                    legalPerson: "aute",
                    licenceCode: "9133010058B09330",
                    reason: null,
                    verifyHandleStatus: 2,
                    verifyHandleStatusText: "审核通过",
                    verifyTime: null,
                    verifyType: 2,
                    verifyTypeText: "修改",
                }
            ]
            let total = 1
             for (const it of data) {
                        it['isShowText'] = it.isShow == 1 ? '是' : '否'
                    }
            this.searchForm.table.body = data
            this.searchForm.pageinfo.total = total
            // this.searchForm.table.tableloading = true;
            // let params = {
            //     companyId: this.propData.companyId,
            //     driverSchoolId: this.propData.driverSchoolId,
            //     pageIndex: this.searchForm.pageinfo.currentPage,
            //     pageSize: this.searchForm.pageinfo.pageSize
            // }
            // queryVerifyDriverSchoolHistory(params).then(res => {
            //     this.searchForm.table.tableloading = false;
            //     if(res.code == 0){
            //         for (const it of res.data.data) {
            //             it['isShowText'] = it.isShow == 1 ? '是' : '否'
            //         }
            //         this.searchForm.table.body = res.data.data
            //         this.searchForm.pageinfo.total = res.data.total
            //     }
            // }).catch(error => {
            //     // console.log(error,"=============")
            //     this.searchForm.table.tableloading = false;
            // })
        },
        // 每页条数改变
        handleSizeChange(pageSize) {
            this.searchForm.pageinfo.pageSize = pageSize
            this.setTableBody()
        },
        // 翻页
        handleCurrentChange(currentPage) {
            // console.log(currentPage)
            this.searchForm.pageinfo.currentPage = currentPage
            this.setTableBody()
        },
        /**
         * 列表操作
         */
        optionBtnClick(row, btn) {
            console.log(row,btn,"===row=btn")
            switch (btn.func) {
                case 'seeFn':
                    console.log('123')
                    // this.seeFn(row)
                    break
                default:
                    break
            }
        },
        /**
         * 查看审核历史明细
         */
        seeFn(row) {
            this.$emit('auditDetail', row)
           
        },
        goback(index=null) {
            // this.$router.go(-1)
            let newData = JSON.parse(JSON.stringify(this.propData))
            newData.from = 'list'
            this.$emit('close', index, newData)
        }
    },
    //
    mounted() {
        this.setTableHead()
        this.search()
    },
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.container {
    padding: 0 20px;
}
</style>
