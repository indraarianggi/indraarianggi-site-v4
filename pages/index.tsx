import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import SocialIcon from '@components/SocialIcon'

/**
 * Automatic Static Optimization is turned off, because in the _app.tsx file it uses getInitialProps.
 * So to implement SSG for this page (home), we must explicitly use getStaticProps, even though it returns empty props.
 *
 * More to read:
 * https://nextjs.org/docs/advanced-features/automatic-static-optimization
 * https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 */
export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

const Home: NextPage = () => {
  const title = 'Test Blog'
  const description = 'Welcome to my Notion Blog'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" title="description" content={description} />
      </Head>

      <div className="flex items-center justify-center h-96">
        <div className="space-y-4 md:space-y-2">
          <Image
            src="/images/avatar.png"
            height={64}
            width={64}
            alt="Indra Arianggi"
            className="h-48 w-48 rounded-md"
          />
          <h1 className="text-3xl sm:text-4xl font-bold leading-[3rem]">
            Hi{' '}
            <span role="img" aria-label="wave">
              👋
            </span>
            , I&apos;m Indra Arianggi
          </h1>
          <p className="leading-7">
            A Frontend Developer specialized in React JS and currently using
            TypeScript.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <SocialIcon kind="linkedin" href="https://linkedin.com" />
            <SocialIcon kind="github" href="https://github.com" />
            <SocialIcon kind="twitter" href="https://twitter.com" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
