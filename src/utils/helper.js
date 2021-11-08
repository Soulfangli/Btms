import {
    Loading
} from 'element-ui';
let myLoading = '';
let loadingTimer = null;
const helpObj = { // 公共方法
    showLHloading: function (text) {
        myLoading = Loading.service({
            lock: true,
            text: text || 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        loadingTimer = setTimeout(() => {
            myLoading.close();
        }, 1000 * 10);
    },
    closeLHloading: function () {
        if (myLoading) {
            myLoading.close();
            loadingTimer = null
        }
    },
    isNullOrEmpty: function (value, text) { // 是否为空
        if (value === null || value === '' || value === undefined || value == '{}' || value == '[]') {
            return text || '';
        } else {
            return value;
        }
    },
    delNullObj: function (reqForm) { // 删除对象内key值为空的
        for (let key in reqForm) {
            if (!reqForm[key] && reqForm[key] !== 0) {
                delete reqForm[key];
            }
        }
        return reqForm;
    },
    getTheText: function (arr, val, id, name) { // 参数 目标数组,对应值,数据对比名称,输出数据名称 例如this.$helper.getTheText(this.ItemSerchData,2,'type','label')
        id = id || 'id';
        name = name || 'name';
        let myarr = arr.filter(item => {
            return item[id] == val;
        });
        if (myarr.length > 0) {
            return myarr[0][name];
        } else {
            return '';
        }
    },
    filterIncome(num) { 
    //     let reg=/\d{1,3}(?=(\d{3})+$)/g;   
    // return (num + '').replace(reg, '$&,'); 
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          
    },    
    fromatDate_y_m_d: (timestemp) => { // 时间戳格式化 yyyy-MM-dd
        if (timestemp == null) {
            return '';
        }
        var time = new Date(timestemp);
        var y = time.getFullYear(); // 年
        var m = time.getMonth() + 1; // 月
        var d = time.getDate(); // 日
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        return y + '-' + m + '-' + d;
    },
    fromatDate: function (timestemp) { // 时间戳格式化 yyyy-MM-dd HH:mm:ss
        if (timestemp == null) {
            return '';
        }
        var time = new Date(timestemp);
        var y = time.getFullYear(); // 年
        var m = time.getMonth() + 1; // 月
        var d = time.getDate(); // 日
        var h = time.getHours(); // 时
        var mm = time.getMinutes(); // 分
        var s = time.getSeconds(); // 秒
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (h < 10) {
            h = '0' + h;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    },
    timeFormat: function (time) { // "2018-05-19T08:04:52.000+0000"这种格式的时间转化为正常格式
        if (time == '' || time == null) {
            return '';
        } else {
            var d = new Date(time);
            var year = d.getFullYear(); // 年
            var month = d.getMonth() + 1; // 月
            var day = d.getDate(); // 日
            var hh = d.getHours(); // 时
            var mm = d.getMinutes(); // 分
            var ss = d.getSeconds(); // 秒
            var clock = year + '/';
            if (month < 10) { clock += '0'; }
            clock += month + '/';
            if (day < 10) { clock += '0'; }
            clock += day + ' ';
            if (hh < 10) { clock += '0'; }
            clock += hh + ':';
            if (mm < 10) clock += '0';
            clock += mm + ':';
            if (ss < 10) clock += '0';
            clock += ss;
            return (clock);
        }
    },
    timeFormatThree: function (time) { // "2018-05-19T08:04:52.000+0000"这种格式的时间转化为正常格式年月日
        if (time == '' || time == null) {
            return '';
        } else {
            var d = new Date(time);
            var year = d.getFullYear(); // 年
            var month = d.getMonth() + 1; // 月
            var day = d.getDate(); // 日
            // var hh = d.getHours(); // 时
            // var mm = d.getMinutes(); // 分
            // var ss = d.getSeconds(); // 秒
            var clock = year + '/';
            if (month < 10) { clock += '0'; }
            clock += month + '/';
            if (day < 10) { clock += '0'; }
            clock += day;
            return (clock);
        }
    },
    accAdd: function (num1, num2) { // 两个浮点数求和
        var r1, r2, m;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        // return (num1*m+num2*m)/m;
        return Math.round(num1 * m + num2 * m) / m;
    },
    accSub: function (num1, num2) { // 两个浮点数相减
        var r1, r2, m, n;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
    },
    accDiv: function (num1, num2) { // 两个浮点数相除
        var t1, t2, r1, r2;
        try {
            t1 = num1.toString().split('.')[1].length;
        } catch (e) {
            t1 = 0;
        }
        try {
            t2 = num2.toString().split('.')[1].length;
        } catch (e) {
            t2 = 0;
        }
        r1 = Number(num1.toString().replace('.', ''));
        r2 = Number(num2.toString().replace('.', ''));
        return ((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(2);
    },
    accMul: function (num1, num2) { // 两个浮点数相乘
        var m = 0;
        var s1 = num1.toString();
        var s2 = num2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) { };
        try {
            m += s2.split('.')[1].length;
        } catch (e) { };
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    },
    resetSeach: function (res) { // 重置搜索组件内容
        let arr = [];
        res.forEach(item => {
            if (item.type == 3) {
                item.value = [];
            } else {
                item.value = '';
            }
            arr.push(item.value);
        });
        return arr;
    },
};

// 暴露出这些属性和方法
export default {
    delNullObj: helpObj.delNullObj,
    getTheText: helpObj.getTheText,
    fromatDate: helpObj.fromatDate,
    fromatDate_y_m_d: helpObj.fromatDate_y_m_d,
    filterIncome: helpObj.filterIncome,
    timeFormat: helpObj.timeFormat,
    timeFormatThree: helpObj.timeFormatThree,
    accAdd: helpObj.accAdd,
    accSub: helpObj.accSub,
    accMul: helpObj.accMul,
    accDiv: helpObj.accDiv,
    showLHloading: helpObj.showLHloading,
    closeLHloading: helpObj.closeLHloading,
    isNullOrEmpty: helpObj.isNullOrEmpty,
    resetSeach: helpObj.resetSeach
};
