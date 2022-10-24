import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { bundleMDX } from 'mdx-bundler'
import rehypePrismPlus from 'rehype-prism-plus'

import { BlogPost } from '@/types/schema'
import Tag from '@/components/Tag'
import NotionService from '@/services/notion-service'
import MDXLayoutRenderer from '@/components/MDXLayoutRenderer'
import { BlogPostSEO } from '@/components/SEO'

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

  const result = await bundleMDX({
    source: post.markdown,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrismPlus, { ignoreMissing: true }],
      ]
      return options
    },
  })
  const { code } = result

  return {
    props: {
      markdown: code,
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
      <BlogPostSEO
        title={post.title}
        summary={post.description}
        images={post.cover}
        publishedAt={post.publihedAt}
        modifiedAt={post.modifiedAt}
      />

      <article className="flex flex-col items-center space-y-5">
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
            <time
              dateTime={post.publihedAt}
              className="text-[0.6rem] text-gray-400">
              {new Date(post.publihedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </article>

      <article className="prose mt-12">
        <MDXLayoutRenderer markdown={markdown} />
      </article>
    </>
  )
}

export default Post
