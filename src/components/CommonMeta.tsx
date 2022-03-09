import Head from "next/head"

const CommonMeta = (): JSX.Element => {
  return (
    <Head>
      {/* noindex:   Webページをインデックスに登録しない */}
      {/* nofollow:  クロールの際にページからのリンクを追跡しない */}
      {/* noarchive: 検索結果にページへのキャッシュリンクを表示しない */}
      <meta name="robots" content="noindex, nofollow, noarchive"/>
    </Head>
  )
}

export default CommonMeta