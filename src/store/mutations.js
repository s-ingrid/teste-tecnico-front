export default {
    SET_AUTHENTICATION (state, authorization) {
      state.isAuthenticated = true
      state.authorization = authorization
    },
    CLEAR_AUTHENTICATION (state) {
      state.isAuthenticated = false
      state.authorization = null
    }
}