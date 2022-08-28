import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'

import { BlogPost } from 'types/schema'
import NotionService from '@services/notion-service'
import '@styles/globals.css'
import Layout from '@components/Layout'

type TMyAppProps = AppProps & {
  posts: BlogPost[]
}

function MyApp({ Component, pageProps, posts }: TMyAppProps) {
  return (
    <Layout posts={posts}>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context)

  const notionService = new NotionService()

  const posts = await notionService.getPublishedBlogPosts()

  return { ...ctx, posts }
}

export default MyApp
