import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'
import { db } from '~/plugins/firestore'
// ______________________________________________________
//
export const state = (): S => ({
  isAuthenticatedFlg: false,
  uid: ''
})
// ______________________________________________________
//
export const getters: Getters<S, G> = {
  //
}
// ______________________________________________________
//
export const mutations: Mutations<S, M> = {
  isAuthenticatedFlgChange(state, authFlg) {
    state.isAuthenticatedFlg = authFlg
  },
  setUID(state, uid) {
    state.uid = uid
  }
}
// ______________________________________________________
//
export const actions: Actions<S, A, G, M> = {
  async setUser(ctx, user) {
    const providerData = user.providerData.map((v) => {
      return { ...v }
    })

    try {
      const doc = await db
        .collection('users')
        .doc(user.uid)
        .get()

      if (!doc.exists) {
        const date = Date.now()
        await db
          .collection('users')
          .doc(user.uid)
          .set(
            {
              public: false,
              displayName: ''
            },
            { merge: true }
          )
        await db
          .collection('users')
          .doc(user.uid)
          .collection('secure')
          .doc(user.uid)
          .set({
            userID: user.uid,
            email: user.email,
            providerData: providerData,
            _createdAt: date,
            _updateAt: date
          })
      }
      ctx.commit('isAuthenticatedFlgChange', true)
      ctx.commit('setUID', user.uid)
    } catch (error) {
      console.error(error)
    }
  },
  logout(ctx) {
    ctx.commit('isAuthenticatedFlgChange', false)
    ctx.commit('setUID', '')
  }
}
