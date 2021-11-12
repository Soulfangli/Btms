// import { getInfo } from '@/api/user'
import {
  entPwdLogin,
  pcEntSmsLogin,
  checkCompanyAccount,
  govEntPwdLogin,
  govPcEntSmsLogin,
  logout } from '@/api/login'
import { resetRouter } from '@/router'
// import Cookies from 'js-cookie'
import localHandle from '@/utils/localStorage'
import store from '@/store'
import router from '@/router'
const getDefaultState = () => {
  return {
    // token: getToken(),
    // name: null,
    // avatar: Cookies.get('headImage') || '',
    userInfoGov: localHandle.get('userInfoGov') ? JSON.parse(localHandle.get('userInfoGov')) : '' || {},
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_USER_INFO: (state, data) => {
    state.userInfoGov = data
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { phone, password, verifyCode, type, code, companyName } = userInfo
    return new Promise((resolve, reject) => {
      if (type === 1) {
        // 根据监管端的登录界面调用不同的登录接口
        const isGov = window.location.href.includes('govLogin');
        let loginFunc = pcEntSmsLogin;
        if (isGov) loginFunc = govPcEntSmsLogin;
        // 短信登陆
        loginFunc({phone: phone.trim(), verifyCode: verifyCode.trim()}).then(response => {
          if(isGov) response.data.companyType = 8; // 监管端的companyType默认为8，接口不返回
          LoginInfo(response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      } else if (type === 2) {
        // 根据监管端的登录界面调用不同的登录接口
        const isGov = window.location.href.includes('govLogin');
        let loginFunc = entPwdLogin;
        if (isGov) loginFunc = govEntPwdLogin;
        // 密码登陆
        loginFunc({ phone: phone.trim(), password: password }).then(response => {
          // if(response.code === 0){
            if(isGov) response.data.companyType = 8; // 监管端的companyType默认为8，接口不返回
            LoginInfo(response.data)
            resolve(response)
          // }
        }).catch(error => {
          reject(error)
        })
      } else if (type === 3){
        // 首次登陆
        checkCompanyAccount({ code: code, companyName: companyName }).then(response => {
          // if(response.code === 0){
            resolve(response)
          // }
        }).catch(error => {
          reject(error)
        })
      }
    });
    function LoginInfo(data){
      data['companyTypeText'] = {1:'驾校企业',2:'维修企业',4:'救援企业'}[data.companyType]
      commit('SET_USER_INFO',data)
      // commit('SET_TOKEN', data.token)
      // commit('SET_NAME', data.name)
      // commit('SET_AVATAR',data.headImage)
      localHandle.set('userInfoGov', data)
    }
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       // const { name, avatar } = data
  //       // commit('SET_NAME', name)
  //       // commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 若是监管端退出登录，则跳转监管端登录界面
      // let { companyType } = state.userInfoGov;
      // let path = '/login';
      // if (companyType === 8) path = '/govLogin'
      let path = '/govLogin';
      logout({}).then(res => {
        if(res.code == 0){
          localHandle.remove('userInfoGov')
          commit('RESET_STATE')
          store.commit('permission/SET_REFRESH', true) // 重置状态
          resetRouter()
          router.push({path})
          resolve()
        }
      }).catch(()=>{
        reject(error)
      })
    })
  },

  // remove token 清除登录用户信息
  resetToken({ commit }) {
    return new Promise(resolve => {
      localHandle.remove('userInfoGov')
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

