import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'
// ______________________________________________________
//
export const state = (): S => ({
  isAuthenticatedFlg: false
})
// ______________________________________________________
//
export const getters: Getters<S, G> = {
  //
}
// ______________________________________________________
//
export const mutations: Mutations<S, M> = {
  isAuthenticatedFlgChange(state, authFlg: boolean) {
    state.isAuthenticatedFlg = authFlg
  }
}
// ______________________________________________________
//
export const actions: Actions<S, A, G, M> = {
  login(ctx) {
    ctx.commit('isAuthenticatedFlgChange', true)
  },
  logout(ctx) {
    ctx.commit('isAuthenticatedFlgChange', false)
  }
}
