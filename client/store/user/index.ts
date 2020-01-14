import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'
import { db } from '~/plugins/firestore'
// ______________________________________________________
//
export const state = (): S => ({
  isAuthenticatedFlg: false,
  uid: '',
  providerData: [],
  filterOption: {
    difficultyLevel: ['Basic', 'Advanced', 'Expert', 'Master', 'ReMaster'],
    genre: [
      'niconico＆ボーカロイド',
      '東方Project',
      'バラエティ',
      'オリジナル',
      'POPS＆アニメ'
    ],
    version: [
      'maimai',
      'maimai_PLUS',
      'GreeN',
      'GreeN_PLUS',
      'ORANGE',
      'ORANGE_PLUS',
      'PiNK',
      'PiNK_PLUS',
      'MURASAKi',
      'MURASAKi_PLUS',
      'MiLK',
      'MiLK_PLUS',
      'FiNALE',
      'maimaiでらっくす'
    ],
    level: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      7.5,
      8,
      8.5,
      9,
      9.5,
      10,
      10.5,
      11,
      11.5,
      12,
      12.5,
      13,
      13.5,
      14
    ],
    type: ['deluxe', 'standard'],
    showColumn: [
      'title',
      'genre',
      'version',
      'difficultyLevel',
      'level',
      'type',
      'achievement',
      'rank',
      'dxScore',
      'maxDxScore',
      'comboRank',
      'sync',
      'date'
    ]
  }
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
  },
  setProviderData(state, providerData) {
    state.providerData = providerData
  },
  setFilterOption(state, filterOption) {
    state.filterOption = JSON.parse(JSON.stringify(filterOption))
  }
}
// ______________________________________________________
//
export const actions: Actions<S, A, G, M> = {
  async setUser(ctx, user) {
    const providerData = user.providerData.map((v) => {
      return { ...v }
    }) as firebase.UserInfo[]

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
            providerData,
            isDXScoreNotOnTheTweetImg: false, // デフォルトで画像にでらっくスコアのみの更新でも乗っける
            _createdAt: date,
            _updateAt: date
          })
      } else {
        await db
          .collection('users')
          .doc(user.uid)
          .collection('secure')
          .doc(user.uid)
          .set(
            {
              email: user.email,
              providerData
            },
            { merge: true }
          )
      }
      ctx.commit('isAuthenticatedFlgChange', true)
      ctx.commit('setUID', user.uid)
      ctx.commit('setProviderData', providerData)
    } catch (error) {
      console.error(error)
    }
  },
  logout(ctx) {
    ctx.commit('isAuthenticatedFlgChange', false)
    ctx.commit('setUID', '')
  },
  async saveTwitterToken(ctx, credential) {
    await db
      .collection('users')
      .doc(ctx.state.uid)
      .collection('secure')
      .doc(ctx.state.uid)
      .set(
        {
          accessToken: credential.accessToken,
          secret: credential.secret
        },
        { merge: true }
      )
  }
}
