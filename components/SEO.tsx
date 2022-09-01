/**
 * Reference: https://github.com/timlrx/tailwind-nextjs-starter-blog
 */

import Head from 'next/head'
import { useRouter } from 'next/router'

import siteMetadata from '@data/siteMetadata'

type TCommonSEOProps = {
  title: string
  description: string
  ogType: string
  ogImage: string | string[]
  twImage: string
}

const CommonSEO = ({
  title,
  description,
  ogType,
  ogImage,
  twImage,
}: TCommonSEOProps) => {
  const router = useRouter()

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta
        property="og:url"
        content={`${siteMetadata.siteUrl}${router.asPath}`}
      />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {typeof ogImage === 'string' ? (
        <meta property="og:image" content={ogImage} key={ogImage} />
      ) : (
        ogImage.map((img) => (
          <meta property="og:image" content={img} key={img} />
        ))
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
    </Head>
  )
}

type TPageSEOProps = {
  title: string
  description: string
}

export const PageSEO = ({ title, description }: TPageSEOProps) => {
  const ogImageUrl = `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`
  const twImageUrl = `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`

  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  )
}

type TBlogPostSEOProps = {
  title: string
  summary: string
  images: string | string[]
  publishedAt: string
  modifiedAt: string
}

export const BlogPostSEO = ({
  title,
  summary,
  images,
  publishedAt,
  modifiedAt,
}: TBlogPostSEOProps) => {
  const router = useRouter()
  const published = new Date(publishedAt).toISOString()
  const modified = new Date(modifiedAt).toISOString()

  const twImageUrl = typeof images === 'string' ? images : images[0]

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={images}
        twImage={twImageUrl}
      />
      <Head>
        <meta property="article:published_time" content={published} />
        <meta property="article:modified_time" content={modified} />
        <link
          rel="canonical"
          href={`${siteMetadata.siteUrl}${router.asPath}`}
        />
      </Head>
    </>
  )
}
