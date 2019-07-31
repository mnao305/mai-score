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
    <h5 class="headline">使い方</h5>
    <ol>
      <li>当サイトにてユーザ登録</li>
      <li>
        <a
          href="https://chrome.google.com/webstore/detail/mai-score-extension/nkoehdjknmmnpgchiliidfkmhkafdcki"
          target="_blank"
        >
          スコアデータ登録用のブラウザ拡張機能のインストール(Chromeのみ)
        </a>
      </li>
      <li>ブラウザ拡張機能にてログインする</li>
      <li>ブラウザ拡張機能にてスコアデータの登録</li>
      <li>当サイトにてログインすればスコアデータが一覧で見れます</li>
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
@Component
export default class AboutPage extends Vue {}
</script>

<style lang="scss" scoped>
.aboutPage {
  text-align: center;
  ol {
    list-style-position: inside;
  }
}
</style>
