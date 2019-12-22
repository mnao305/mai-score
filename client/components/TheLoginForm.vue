<template>
  <v-layout id="TheLoginForm" align-center justify-center column fill-height>
    <v-btn class="twitterLoginBtn" outlined @click="twitterLogin">
      Twitterで{{ RegistFlg ? '登録' : 'ログイン' }}
    </v-btn>
    <v-form ref="form" v-model="valid" class="loginRegistForm" lazy-validation>
      <div class="loginForm">
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          class="loginFormInput"
          label="メールアドレス"
        ></v-text-field>
        <v-text-field
          v-model="passwd"
          :rules="[rules.required, rules.counter]"
          :append-icon="showPasswdFlg ? 'visibility' : 'visibility_off'"
          :type="showPasswdFlg ? 'text' : 'password'"
          class="loginFormInput"
          label="パスワード"
          @click:append="showPasswdFlg = !showPasswdFlg"
        ></v-text-field>
        <v-text-field
          v-if="RegistFlg"
          v-model="confirmationPasswd"
          :rules="[rules.required, rules.counter, rules.confirmation]"
          :append-icon="showPasswdFlg ? 'visibility' : 'visibility_off'"
          :type="showConfirmationPasswdFlg ? 'text' : 'password'"
          class="loginFormInput"
          label="パスワード確認"
          @click:append="showConfirmationPasswdFlg = !showConfirmationPasswdFlg"
        ></v-text-field>
        <v-layout>
          <v-spacer />
          <v-btn
            v-if="RegistFlg"
            :disabled="!valid"
            class="mailRegistBtn"
            outlined
            color="indigo"
            @click="mailRegistration"
            >登録</v-btn
          >
          <v-btn
            v-else
            :disabled="!valid"
            class="mailLoginBtn"
            outlined
            color="indigo"
            @click="mailLogin"
            >ログイン</v-btn
          >
        </v-layout>
      </div>
      <v-alert :value="isErrorFlg" type="error" class="errorMessage" outlined>
        {{ RegistFlg ? '登録' : 'ログイン' }}に失敗しました。
      </v-alert>
    </v-form>
    <Loading v-if="loadFlg" />
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as Vuex from 'vuex'
import auth from '~/plugins/auth'
@Component({
  components: {
    Loading: () => import('~/components/Loading.vue')
  }
})
export default class TheLoginForm extends Vue {
  $store!: Vuex.ExStore

  @Prop() RegistFlg?: boolean

  valid = true

  email = ''

  passwd = ''

  confirmationPasswd = ''

  showPasswdFlg = false

  showConfirmationPasswdFlg = false

  rules = {
    required: (value: string) => !!value || '必須項目です',
    counter: (value: string) =>
      value.length >= 8 || 'パスワードは8文字以上必要です',
    email: (value: string) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'メールアドレスの形式が間違っています'
    },
    confirmation: () => {
      return this.confirmationCheck() || '同じパスワードを再入力してください'
    }
  }

  isErrorFlg = false

  loadFlg = true

  twitterLogin() {
    auth.twitterLogin()
  }

  async beforeMount() {
    const data = await auth.getRedirectResult()
    if (data.user) {
      await this.$store.dispatch('user/setUser', data.user)
      if (data.credential) {
        await this.$store.dispatch('user/saveTwitterToken', data.credential)
      }
      this.$router.push('/myscore')
      return
    }
    this.loadFlg = false
  }

  async mailRegistration() {
    if (!(this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      return
    }
    try {
      const data = await auth.mailRegist(this.email, this.passwd)
      if (data.user) {
        await this.$store.dispatch('user/setUser', data.user)
        this.$router.push('/myscore')
      } else {
        throw new Error('ユーザなし')
      }
    } catch (error) {
      this.isErrorFlg = true
      console.error(error)
    }
  }

  async mailLogin() {
    if (!(this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      return
    }
    try {
      const data = await auth.mailLogin(this.email, this.passwd)
      if (data.user) {
        await this.$store.dispatch('user/setUser', data.user)
        this.$router.push('/myscore')
      } else {
        throw new Error('ユーザなし')
      }
    } catch (error) {
      this.isErrorFlg = true
      console.error(error)
    }
  }

  confirmationCheck() {
    return this.passwd === this.confirmationPasswd
  }
}
</script>

<style scoped lang="scss">
#TheLoginForm {
  .twitterLoginBtn {
    margin: 20px;
  }
  .loginRegistForm {
    width: 300px;
    .loginForm {
      .loginFormInput {
        height: 70px;
      }
    }
    .errorMessage {
      margin-top: 15px;
      position: fixed;
      width: 300px;
      left: calc(50% - 300px / 2);
    }
  }
}
</style>
