export default function({ route, store, redirect }) {
  if (store.state.user.isAuthenticatedFlg && store.state.user.uid) {
    if (route.name === 'login' || route.name === 'regist') redirect('/myscore')
  } else {
    store.dispatch('user/logout')
    if (route.name === 'myscore') redirect('/')
  }
}
