import * as storage from './auth/session'

export default {
    LOGIN({ commit }, token) {
        storage.setSessionToken(token)
        commit('SET_AUTHENTICATION', token)
    },
    LOGOUT({ commit }) {
        storage.deleteSessionToken('AUTH_TOKEN')
        commit("CLEAR_AUTHENTICATION")
    },
    CHECK_TOKEN({ commit }) {
        const token = storage.getSessionToken()
        if (token) {
            commit('SET_AUTHENTICATION', token)
        }
    }
}
