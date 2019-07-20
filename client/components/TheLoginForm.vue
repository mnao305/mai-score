<template>
  <v-layout id="TheLoginForm" align-center justify-center column fill-height>
    <v-btn @click="twitterLogin">
      Twitterで{{ RegistFlg ? '登録' : 'ログイン' }}
    </v-btn>
    <v-form ref="form" v-model="valid" class="loginRegistForm" lazy-validation>
      <div class="loginForm">
        <v-text-field
          v-model="email"
          class="loginFormInput"
          label="メールアドレス"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="passwd"
          class="loginFormInput"
          label="パスワード"
          :rules="[rules.required, rules.counter]"
          :append-icon="showPasswdFlg ? 'visibility' : 'visibility_off'"
          :type="showPasswdFlg ? 'text' : 'password'"
          @click:append="showPasswdFlg = !showPasswdFlg"
        ></v-text-field>
        <v-layout>
          <v-spacer />
          <v-btn
            v-if="RegistFlg"
            class="mailRegistBtn"
            outline
            color="indigo"
            :disabled="!valid"
            @click="mailRegistration"
            >登録</v-btn
          >
          <v-btn
            v-else
            class="mailLoginBtn"
            outline
            color="indigo"
            :disabled="!valid"
            @click="mailLogin"
            >ログイン</v-btn
          >
        </v-layout>
      </div>
      <v-alert :value="isErrorFlg" type="error" class="errorMessage" outline>
        {{ RegistFlg ? '登録' : 'ログイン' }}に失敗しました。
      </v-alert>
    </v-form>
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as Vuex from 'vuex'
import auth from '~/plugins/auth'
@Component
export default class TheLoginForm extends Vue {
  $store!: Vuex.ExStore

  @Prop() RegistFlg?: boolean

  valid = true

  email = ''

  passwd = ''

  showPasswdFlg = false

  rules = {
    required: (value) => !!value || '必須項目です',
    counter: (value) => value.length >= 8 || 'パスワードは8文字以上必要です',
    email: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'メールアドレスの形式が間違っています'
    }
  }

  isErrorFlg = false

  twitterLogin() {
    auth.twitterLogin()
  }

  async beforeMount() {
    const data = await auth.getRedirectResult()
    if (data.user) {
      this.$store.dispatch('user/setUser', data.user)
      this.$router.push('/myscore')
    }
  }

  async mailRegistration() {
    if (!(this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      return
    }
    try {
      const data = await auth.mailRegist(this.email, this.passwd)
      if (data.user) {
        this.$store.dispatch('user/setUser', data.user)
        this.$router.push('/myscore')
      } else {
        throw new Error()
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
      // eslint-disable-next-line no-console
      console.log(data)
      this.$store.commit('user/isAuthenticatedFlgChange', true)
      this.$router.push('/myscore')
    } catch (error) {
      this.isErrorFlg = true
      console.error(error)
    }
  }
}
</script>

<style scoped lang="scss">
#TheLoginForm {
  .loginRegistForm {
    width: 260px;
    .loginForm {
      .loginFormInput {
        height: 70px;
      }
    }
    .errorMessage {
      position: fixed;
      width: 260px;
      left: calc(50% - 260px / 2);
    }
  }
}
</style>
