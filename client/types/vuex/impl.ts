import 'vuex'
import * as User from '~/store/user/type'

declare module 'vuex' {
  type RootState = {
    user: User.S
  }
  type RootGetters = User.RG
  type RootMutations = User.RM
  type RootActions = User.RA
}
