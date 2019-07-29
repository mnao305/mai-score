<template>
  <div class="settingPage">
    <h4 class="display-1">設定</h4>
    <v-form ref="form" v-model="valid" class="loginRegistForm" lazy-validation>
      <h5 class="headline">表示名</h5>
      <p>
        '/設定した名前'という形のURLにアクセスすると表示できるようになります。
      </p>
      <v-text-field
        v-model="displayName"
        class="loginFormInput"
        label="表示名"
        :rules="[rules.name]"
      ></v-text-field>
      <h5 class="headline">公開設定</h5>
      <p>
        表示名を設定し、これを公開設定にすればスコアデータを一般公開できます。
      </p>
      <v-radio-group
        v-model="publicData"
        :rules="[rules.publicData]"
        :mandatory="false"
      >
        <v-radio label="公開(誰でも見れる)" :value="true"></v-radio>
        <v-radio label="非公開(自分のみ見れる)" :value="false"></v-radio>
      </v-radio-group>
      <v-btn outlined color="indigo" @click="settingSave">保存</v-btn>
      <p>{{ message }}</p>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '~/plugins/firestore'

interface publicUserData {
  displayName: string | null
  public: boolean
}
@Component({
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
  rules = {
    required: (value) => !!value || '必須項目です',
    counter: (value) => value.length >= 8 || 'パスワードは8文字以上必要です',
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
      const uid = this.$store.state.user.uid
      await db
        .collection('users')
        .doc(uid)
        .set(
          {
            public: this.publicData,
            displayName: this.displayName || null
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
  margin: 0 auto;
  text-align: center;
  max-width: 600px;
}
</style>
