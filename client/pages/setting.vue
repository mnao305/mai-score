<template>
  <div class="settingPage">
    <h4 class="display-1"><v-icon class="h4-icon">mdi-settings</v-icon>設定</h4>
    <v-form ref="form" v-model="valid" class="loginRegistForm" lazy-validation>
      <div>
        <h5 class="headline">
          <v-icon>mdi-account-badge-horizontal-outline</v-icon>
          表示名
        </h5>
        <p>
          `/user/設定した名前`という形のURLにアクセスすると表示できるようになります。
        </p>
        <v-text-field
          v-model="displayName"
          class="inputDisplayName"
          label="表示名(40文字まで)"
          counter="40"
          :rules="[rules.name, rules.counter]"
        ></v-text-field>
      </div>

      <div>
        <h5 class="headline"><v-icon>mdi-key-outline</v-icon>公開設定</h5>
        <p>
          表示名を設定し、これを公開設定にすれば`/user/設定した名前`という形でスコアデータを見ることができます。<br />
          公開設定にすると自分以外のユーザでもスコアデータを表示できます。
        </p>
        <v-radio-group
          v-model="publicData"
          :rules="[rules.publicData]"
          :mandatory="false"
        >
          <v-radio label="公開" :value="true"></v-radio>
          <v-radio label="非公開" :value="false"></v-radio>
        </v-radio-group>
      </div>

      <div>
        <h5 class="headline"><i class="mdi mdi-twitter" />Twitter連携</h5>
        <p>画像つきのスコア更新ツイートをするには必須です。</p>
        <v-btn
          depressed
          :disabled="isTwitterLogin"
          color="#00b0ed"
          class="white--text"
          @click="twitterLogin"
        >
          <template v-if="isTwitterLogin">
            Twitter連携済み
          </template>
          <template v-else>
            <i class="mdi mdi-twitter" />Twitter連携
          </template>
        </v-btn>
      </div>

      <br />
      <v-btn outlined color="indigo" @click="settingSave">保存</v-btn>
      <p>{{ message }}</p>
    </v-form>
    <Loading v-if="loadFlg" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as Vuex from 'vuex'
import { db } from '~/plugins/firestore'
import auth from '~/plugins/auth'

interface publicUserData {
  displayName: string
  public: boolean
}
@Component({
  head: {
    title: '設定'
  },
  components: {
    Loading: () => import('~/components/Loading.vue')
  },
  async asyncData({ store }) {
    const doc = await db
      .collection('users')
      .doc(store.state.user.uid)
      .get()

    if (doc && doc.exists) {
      const data = (await doc.data()) as publicUserData
      const displayName = data.displayName
      const publicData = data.public

      return {
        displayName,
        publicData
      }
    }
  }
})
export default class SettingPage extends Vue {
  $store!: Vuex.ExStore

  rules = {
    required: (value) => !!value || '必須項目です',
    counter: (value) => value.length <= 40 || '表示名は40文字までです',
    email: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'メールアドレスの形式が間違っています'
    },
    name: (value) => {
      const pattern = /^[a-zA-Z0-9]*$/
      return pattern.test(value) || '表示名は英数字である必要があります'
    },
    publicData: () => {
      return this.chackPublicData() || '先に表示名を設定してください'
    }
  }

  displayName = ''

  publicData = false

  valid = true

  message = ''

  loadFlg = true

  get isTwitterLogin(): boolean {
    return this.$store.state.user.providerData.some((v) => {
      return v.providerId === 'twitter.com'
    })
  }

  twitterLogin() {
    auth.linkTwitter()
  }

  async beforeMount() {
    const data = await auth.getRedirectResult()
    if (data.user) {
      await this.$store.dispatch('user/setUser', data.user)
      if (data.credential) {
        await this.$store.dispatch('user/saveTwitterToken', data.credential)
      }
    }
    this.loadFlg = false
  }

  chackPublicData() {
    if (this.publicData === false) {
      return true
    } else if (this.displayName) {
      return true
    } else {
      return false
    }
  }

  async settingSave() {
    if (!(this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.message = 'エラーメッセージを確認してください'
      return
    }
    try {
      if (this.displayName) {
        const snapShot = await db
          .collection('users')
          .where('displayName', '==', this.displayName)
          .get()
        const docs = await snapShot.docs[0]

        if (docs && docs.exists && docs.id !== this.$store.state.user.uid) {
          const tmp = docs.data()
          if (tmp.displayName === this.displayName) {
            this.message = 'その表示名は既に使われています'
            return
          }
        }
      }
      await auth.editUserProfile(this.displayName)
      const uid = this.$store.state.user.uid
      await db
        .collection('users')
        .doc(uid)
        .set(
          {
            public: this.publicData,
            displayName: this.displayName
          },
          { merge: true }
        )

      this.message = '保存に成功しました。'
    } catch (error) {
      this.message = '保存に失敗しました。'
    }
  }
}
</script>

<style lang="scss" scoped>
.settingPage {
  h4 {
    .h4-icon {
      font-size: 2.125rem !important;
      margin-right: 10px;
    }
    margin-bottom: 20px;
  }
  .loginRegistForm {
    margin: 10px;
    i {
      margin-right: 10px;
    }
    h5 {
      .mdi-twitter {
        color: #00b0ed;
        padding: 2px 4px;
      }
    }
    .inputDisplayName {
      max-width: 600px;
    }
  }
}
</style>
