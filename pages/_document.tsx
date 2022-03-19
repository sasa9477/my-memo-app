import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          {/* favicons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
          <link rel="manifest" href="/favicons/site.webmanifest"/>
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5"/>
          <meta name="msapplication-TileColor" content="#2b5797"/>
          <meta name="theme-color" content="#ffffff"/>

          {/* noindex:   Webページをインデックスに登録しない */}
          {/* nofollow:  クロールの際にページからのリンクを追跡しない */}
          {/* noarchive: 検索結果にページへのキャッシュリンクを表示しない */}
          <meta name="robots" content="noindex, nofollow, noarchive"/>

          {/* 自動翻訳を表示しない */}
          <meta httpEquiv="content-language" content="ja"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}