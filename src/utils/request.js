import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
import localHandle from '@/utils/localStorage'
import helper from '@/utils/helper'
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // 发布使用
    //  baseURL: 'http://api.xtaowu.com',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        if (config.showLoading === true) {
            // helper.showLHloading()
        }
        let userInfoGov = localHandle.get('userInfoGov')
        if (userInfoGov) {
            config.headers['X-ACCESS-TOKEN'] = JSON.parse(userInfoGov).token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        helper.closeLHloading()
        const res = response.data
        // 统计分析监管区域code100无权限需要返回成功的实例
        const isMessage = res.code === 100 && res.message === '您目前还没有监管区域的权限，请联系管理员处理!'
        if (res.code !== 0 && isMessage === false) {
            if (res.code === 101) {
                Message({
                    message: '该账号已在其他设备或浏览器登录，请重新登录',
                    type: 'error',
                    duration: 5 * 1000
                })
                // setTimeout(() => {
                //     store.dispatch('tagsView/delAllViews')
                //     store.dispatch('user/resetToken').then(() => {
                //         location.reload()
                //     })
                // }, 1000)
            } else {
                Message({
                    message: res.message || '请求接口错误',
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            return Promise.reject(res)
        } else {
            return res
        }
    },
    error => {
        helper.closeLHloading()
        // 错误判断
        if (error && error.response) {
            switch (error.response.status) {
            case 400:
                error.message = '请求错误'
                break
            case 404:
                error.message = `请求地址出错: ${error.response.config.url}`
                break
            case 408:
                error.message = '请求超时'
                break
            case 500:
                error.message = '请求失败，请重试'
                break
            case 501:
                error.message = '服务未实现'
                break
            case 502:
                error.message = '网络请求失败'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网络异常，请求超时'
                break
            case 505:
                error.message = 'HTTP版本不受支持'
                break
            default:
                error.message = '请求异常'
                break
            }
    }else{
        if (
            error.code == 'ECONNABORTED' &&
            error.message.indexOf('timeout') != -1
        ) {
            // 连接超时，此时请求未发出
            error.message = "连接超时"
        } else {
            error.message = "连接异常"
        }
    }
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
