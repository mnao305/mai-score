import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req, isDev }: any) => {
  createPersistedState({
    key: '__session',
    storage: {
      getItem: (key) =>
        process.client
          ? Cookies.getJSON(key)
          : cookie.parse(req.headers.cookie || '')[key],
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 30, secure: !isDev }),
      removeItem: (key) => Cookies.remove(key)
    }
  })(store)
}
