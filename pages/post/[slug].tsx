import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import { BlogPost } from 'types/schema'
import Tag from '@components/Tag'
import NotionService from '@services/notion-service'

export const getStaticPaths = async () => {
  const notionService = new NotionService()

  const posts = await notionService.getPublishedBlogPosts()

  /**
   * Because we are generating static paths, we need to redeploy ~
   * the site when we make a change in Notion.
   */
  const paths = posts.map((post) => {
    return `/post/${post.slug}`
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  markdown: string
  post: BlogPost
}> = async (context) => {
  const notionService = new NotionService()

  // @ts-ignore
  const post = await notionService.getSingleBlogPost(context.params?.slug)

  if (!post) {
    throw 'Error'
  }

  return {
    props: {
      markdown: post.markdown,
      post: post.post,
    },
  }
}

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  markdown,
  post,
}) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          title="description"
          content={post.description}
        />
        <meta
          name="og:description"
          title="og:description"
          content={post.description}
        />
        <meta name="og:image" title="og:image" content={post.cover} />
      </Head>

      <article className="flex flex-col items-center space-y-5 px-4">
        <h1 className="text-gray-900 text-center font-semibold">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-baseline justify-center space-x-2 space-y-2 max-w-[75%]">
          {post.tags.map((tag) => (
            <Tag key={tag.id} text={tag.name} />
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Image
            src="/images/avatar.png"
            height={56}
            width={56}
            alt="Indra Arianggi"
            className="rounded-full"
          />
          <div className="flex flex-col space-y-0.5">
            <p className="text-[0.8rem]">{post.author.name}</p>
            <time dateTime={post.date} className="text-[0.6rem] text-gray-400">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </article>

      <article className="prose mt-12">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </>
  )
}

export default Post
