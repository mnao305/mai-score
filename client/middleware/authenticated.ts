export default async function({ route, store, redirect, app }) {
  const cookieStore = await app.$cookies.get('mai-score')

  if (
    (cookieStore &&
      cookieStore.user &&
      (cookieStore.user.isAuthenticatedFlg && cookieStore.user.uid)) ||
    (store.state.user.isAuthenticatedFlg && store.state.user.uid)
  ) {
    if (
      route.name === 'login' ||
      route.name === 'regist' ||
      route.name === 'index'
    ) {
      redirect('/myscore')
    }
  } else {
    // store.dispatch('user/logout')
    // if (route.name === 'myscore') redirect('/')
  }
}
