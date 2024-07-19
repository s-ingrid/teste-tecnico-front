export const getSessionToken = () => sessionStorage.getItem('AUTH_TOKEN')
export const deleteSessionToken = () => sessionStorage.removeItem('AUTH_TOKEN')
export const setSessionToken = token => sessionStorage.setItem('AUTH_TOKEN', token)