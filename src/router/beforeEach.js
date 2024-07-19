import store from '../store'

export default async (to, from, next) => {
    if (to.meta.requiresAuth && !store.getters['isLoggedIn']) {
        next({ name: 'Login' })
    } else if (to.name === undefined && store.getters['isLoggedIn']) {
        next({ name: 'Página não encontrada' })
    } else if (to.name === 'Login' && store.getters['isLoggedIn']) {
        next({ name: 'Dashboard' })
    } else if (to.name === undefined && !store.getters['isLoggedIn']) {
        next({ name: 'Login' })
    } else {
        next()
    }
}