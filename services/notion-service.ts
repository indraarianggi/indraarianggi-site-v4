import {
  APIErrorCode,
  Client,
  ClientErrorCode,
  isNotionClientError,
  LogLevel,
} from '@notionhq/client'
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { NotionToMarkdown } from 'notion-to-md'

import { BlogPost, PageProperties, PostPage } from 'types/schema'

export default class NotionService {
  databaseId: string
  client: Client
  n2m: NotionToMarkdown

  constructor() {
    this.databaseId = process.env.NOTION_BLOG_DATABASE_ID ?? ''
    this.client = new Client({
      auth: process.env.NOTION_ACCESS_TOKEN,
      logLevel: LogLevel.DEBUG,
      notionVersion: '2022-02-22',
    })
    this.n2m = new NotionToMarkdown({ notionClient: this.client })
  }

  private static pageToPostTransformer(page: PageObjectResponse): BlogPost {
    const coverType = page.cover?.type
    let cover: any = ''

    switch (coverType) {
      case 'file':
        cover = page.cover?.file
        break
      case 'external':
        cover = page.cover?.external.url
        break
      default:
        // add default cover if you want...
        cover = ''
        break
    }

    const { Name, Category, Tags, Description, Updated, Slug } =
      page.properties as PageProperties

    return {
      id: page.id,
      cover: cover,
      title: Name.title[0].plain_text,
      category: Category.select,
      tags: Tags.multi_select,
      description: Description.rich_text[0].plain_text,
      date: Updated.last_edited_time,
      slug: Slug.formula.string,
    }
  }

  async getPublishedBlogPosts() {
    try {
      // list blog posts
      const response: QueryDatabaseResponse = await this.client.databases.query(
        {
          database_id: this.databaseId,
          filter: {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: 'Created',
              direction: 'descending',
            },
          ],
        }
      )

      return response.results.map(
        (page: PageObjectResponse | PartialPageObjectResponse) => {
          // transform this response to a blog post
          return NotionService.pageToPostTransformer(page as PageObjectResponse)
        }
      )
    } catch (error: unknown) {
      if (isNotionClientError(error)) {
        switch (error.code) {
          case ClientErrorCode.RequestTimeout:
            throw 'Request Timeout :('
          case APIErrorCode.ObjectNotFound:
          case APIErrorCode.Unauthorized:
          default:
            throw 'Something wrong, please notify Indra Arianggi'
        }
      } else {
        throw 'Something wrong, please notify Indra Arianggi'
      }
    }
  }

  async getSingleBlogPost(slug: string): Promise<PostPage> {
    try {
      let post, markdown

      const response = await this.client.databases.query({
        database_id: this.databaseId,
        filter: {
          property: 'Slug',
          formula: {
            string: {
              equals: slug,
            },
          },
        },
      })

      const page = response.results[0]

      if (!page) {
        throw 'No results available'
      }

      // grab page from notion
      const markdownBlocks = await this.n2m.pageToMarkdown(page.id)
      markdown = this.n2m.toMarkdownString(markdownBlocks)
      post = NotionService.pageToPostTransformer(page as PageObjectResponse)

      return {
        post,
        markdown,
      }
    } catch (error) {
      if (isNotionClientError(error)) {
        switch (error.code) {
          case ClientErrorCode.RequestTimeout:
            throw 'Request Timeout :('
          case APIErrorCode.ObjectNotFound:
          case APIErrorCode.Unauthorized:
          default:
            throw 'Something wrong, please notify Indra Arianggi'
        }
      } else {
        throw 'Something wrong, please notify Indra Arianggi'
      }
    }
  }
}
