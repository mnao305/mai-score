<template>
  <div class="aboutPage">
    <h5 class="headline">このアプリはなに?</h5>
    <p>
      舞スコアはmaimaiでらっくす用の非公式スコア管理ツールです。
    </p>
    <p>
      メールアドレス、Twitterで登録することによりスコアデータの登録ができます。<br />
      設定から表示名を設定し公開設定することで自分のスコアデータを公開することもできます。<br />
      スコアデータの閲覧のみなら登録は不要です。
    </p>
    <p>
      <nuxt-link to="/user/mnao305">
        サンプルとして私のスコアデータを公開します。
      </nuxt-link>
    </p>
    <h5 class="headline">使い方</h5>
    <p>
      スコアデータを登録する前に事前に当サイトにてユーザ登録が必要です。<br />
      メールアドレス・Twitterアカウントにて登録ができます。
    </p>
    <h6 class="title">スコアデータ登録方法1(PC版Chromeブラウザ)</h6>
    <ol>
      <li>
        <a
          href="https://chrome.google.com/webstore/detail/mai-score-extension/nkoehdjknmmnpgchiliidfkmhkafdcki"
          target="_blank"
        >
          スコアデータ登録用のブラウザ拡張機能のインストール
        </a>
      </li>
      <li>ブラウザ拡張機能にてログインする</li>
      <li>ブラウザ拡張機能にてスコアデータの登録</li>
      <li>当サイトにてログインすればスコアデータが一覧で見れます</li>
    </ol>
    <h6 class="title">スコアデータ登録方法2(それ以外)</h6>
    <ol>
      <li>下記テキストをコピー</li>
      <v-textarea
        class="bookmarklet"
        outlined
        readonly
        :value="bookmarklet"
      ></v-textarea>
      <li>ブラウザのブックマーク登録ボタンを押す</li>
      <li>ブックマーク編集でURLをコピーしたコーデで上書き</li>
      <li>maimaiでらっくすNET上で保存したブックマークを実行</li>
      <li>
        ポップアップウィンドウ上でログインする。Twitterログインの場合ポップアップがブロックされることがあるがそれを許可する
      </li>
      <li>画面に従いスコアデータの登録</li>
      <li>当サイトにてログインすればスコアデータが一覧で見れます</li>
    </ol>
    <h6 class="title">スコアデータの公開方法</h6>
    <p>
      表示名を設定し公開設定をすることで、自分のスコアデータを公開することができます。
    </p>
    <ol>
      <li>
        ログインした状態で<nuxt-link to="/setting">settingページ</nuxt-link
        >に行きます
      </li>
      <li>表示名を設定します。英数字のみ、他者とかぶることはできません</li>
      <li>公開設定を「公開」にします</li>
      <li>保存します</li>
      <li>
        「/user/設定した表示名」というURLにアクセスすればスコアデータを見ることができます<br />
        サンプル)
        <nuxt-link to="/user/mnao305">
          https://mai-score.com/user/mnao305
        </nuxt-link>
      </li>
    </ol>
    <h5 class="headline">その他</h5>
    <p>
      当サイトはベータ版です。予告なくサービスの停止、データの削除等をおこなう可能性があります。<br />
      また、当アプリを利用し、利用者にいかなる損害が発生した場合も責任を負いかねます。
    </p>
    <h5 class="headline">プライバシーポリシー</h5>
    <p>
      本サイトでは、サイトの分析と改善のためにGoogleアナリティクスを使用しています。<br />
      その際、データ収集のためにGoogle がお使いのブラウザに cookie
      を設定したり、既存のcookieを読み取ったりする場合があります。また、本サイトをご利用中のウェブブラウザは、Googleに特定の非個人情報（たとえば、アクセスしたページのウェブ
      アドレスや IP アドレスなど）を自動的に送信します。<br />
      当サイトはそれらの情報を、サイト利用状況の把握やサイト利用体験の改善、サイトユーザーの傾向をコンテンツとして紹介するといった用途で利用する可能性があります。
    </p>
    <p>
      本サイトのユーザーは本サイトを利用することで、上記方法および目的においてGoogleとサイト管理者が行うこうしたデータ処理に対して、許可を与えたものとみなします。
    </p>
    <p>
      Google社によるアクセス情報の収集方法および利用方法については、<a
        href="https://marketingplatform.google.com/about/analytics/terms/jp/"
        target="_blank"
        >Google Analyticsサービス利用規約</a
      >および<a
        href="https://policies.google.com/privacy?hl=ja&gl=jp"
        target="_blank"
        >Google社プライバシーポリシー</a
      >によって定められています。
    </p>
    <h5 class="headline">リンク</h5>
    <p>
      <a href="https://twitter.com/mnao_305" target="_blank">作者Twitter</a
      ><br />
      <a href="https://github.com/mnao305/mai-score" target="_blank"
        >GitHubリポジトリ</a
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  head: {
    title: 'About'
  }
})
export default class AboutPage extends Vue {
  bookmarklet = `javascript:(function(d,s){let i=location.hostname.indexOf('maimaidx.jp');if(i!=-1){let g=d.createElement('div');g.id='mai-score-bookmarklet';d.body.appendChild(g);let s=d.createElement('script');s.src='//mai-score-bookmarklet.web.app/js/app.js'+'?'+Date.now();d.body.appendChild(s);let c=d.createElement('script');c.src='//mai-score-bookmarklet.web.app/js/chunk.js'+'?'+Date.now();d.body.appendChild(c);let a=d.createElement('link');a.href='//mai-score-bookmarklet.web.app/css/app.css'+'?'+Date.now();a.rel="stylesheet";a.type="text/css";d.body.appendChild(a);}else{if(confirm('maimaiでらっくすNETを開きますか？')){window.open('https://maimaidx.jp');}}})(document)`
}
</script>

<style lang="scss" scoped>
.aboutPage {
  h5,
  h6 {
    margin: 15px 0;
  }
  h5 {
    border-left: solid 5px #26c6da;
    padding: 0.25em 0.5em;
  }
  h6 {
    border-left: dotted 5px #26c6da;
    padding: 0.25em 0.5em;
  }

  .bookmarklet {
    max-width: 600px;
  }
}
</style>
