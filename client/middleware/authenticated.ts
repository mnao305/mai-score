import * as Cookies from 'js-cookie'
import cookie from 'cookie'
export default function({ route, store, redirect, req }) {
  const cookieStore = process.client
    ? Cookies.getJSON('mai-score')
    : cookie.parse(req.headers.cookie || '')['mai-score']
  if (
    (store.state.user.isAuthenticatedFlg && store.state.user.uid) ||
    (cookieStore.user.isAuthenticatedFlg && cookieStore.user.uid)
  ) {
    if (
      route.name === 'login' ||
      route.name === 'regist' ||
      route.name === 'index'
    ) {
      redirect('/myscore')
    }
  } else {
    store.dispatch('user/logout')
    if (route.name === 'myscore') redirect('/')
  }
}
