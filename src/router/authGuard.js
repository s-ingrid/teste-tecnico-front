import store from '../store'

export function authGuard(to, from, next) {
    if (store.getters['isLoggedIn']) {
        next()
    } else {
        next('/login')
    }
}