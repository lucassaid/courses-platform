import Head from 'next/head'
import Link from 'next/link'
import Footer from './footer'
import { Layout } from 'antd';
import TopBar from './topBar'

const { Content } = Layout;

export const name = 'Juli Amelie'
export const siteTitle = 'Juli Amelie'

export default function BasicLayout({ children, page }) {

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Te acompaño a potenciar tu emprendimiento"
        />
        <meta
          property="og:image"
          content={`/images/juli-amelie.png`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout>
        <TopBar/>
        <Content>
          <main>{children}</main>
          {page != 'home' && (
            <div>
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
          )}
        </Content>
        <Footer/>
      </Layout>
    </>
  )
}