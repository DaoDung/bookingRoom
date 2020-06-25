import authApi from '@/api/auth'
const state = {
    requiresAuth: false,
}

const getters = {
    requiresAuth: (state) => {
        return state.requiresAuth
    }
}

const actions = {
  async login ({ commit }, queries) {
    return new Promise((resolve, reject) => {
      let cb = (res) => {
        commit('setRequiresAuth', true)
        resolve(res)
      }
      let errorCb = (error) => {
        reject(error)
      }
      authApi.login(queries, cb, errorCb)
    })
  }
}

const mutations = {
    setRequiresAuth (state, payload) {
        state.requiresAuth = payload
    },
 }

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}