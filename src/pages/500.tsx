import { GetStaticProps, NextPage } from 'next'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

const Custom500: NextPage = () => {
  return (
    <>
      <PageSEO
        title={`500 - ${siteMetadata.title}`}
        description={siteMetadata.description}
      />

      <div className="flex items-center justify-center h-96">
        <div className="space-y-4 md:space-y-2">
          <div className="flex items-baseline space-x-4">
            <span
              role="img"
              aria-label="see-no-evil-monkey"
              className="text-5xl">
              🙊
            </span>
            <h1 className="text-4xl font-bold leading-[3rem]">500</h1>
          </div>
          <p className="leading-7">Oops, something went wrong!</p>
        </div>
      </div>
    </>
  )
}

export default Custom500
