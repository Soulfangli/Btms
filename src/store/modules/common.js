//页面间临时传参
const state = {
  toDetail:false, //通知跳转到对应详情
  detailId:null, // 通知跳转项的id
  firstLogin:false, //登录之后弹出提示信息（头部）
  isClick:false //点击头部通知列表，自加1，触发详情页面刷新
}

const mutations = {
  TO_DETAIL: (state, value) => {
		state.toDetail = value;
  },
  DETAIL_ID: (state, value) => {
		state.detailId = value;
  },
  FIRST_LOGIN: (state, value) => {
		state.firstLogin = value;
  },
  IS_CLICK: (state, value) => {
		state.isClick = value;
  }
}

const actions = {
  toDetail({ commit }, data) {
    commit('TO_DETAIL', data)
  },
  detailId({ commit }, data) {
    commit('DETAIL_ID', data)
  },
  firstLogin({ commit }, data) {
    commit('FIRST_LOGIN', data)
  },
  isClick({ commit }, data) {
    commit('IS_CLICK', data)
  }
}

export default {
  state,
  mutations,
  actions
}

