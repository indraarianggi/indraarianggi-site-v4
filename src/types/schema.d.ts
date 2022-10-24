import {
  PersonUserObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type SelectObject = {
  id: string
  color: string // "default" | "gray" | "brown" | "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink"
  name: string
}

export type PageProperties = {
  Name: {
    id: string
    type: string
    title: TextRichTextItemResponse[]
  }
  Author: {
    id: string
    type: string
    people: PersonUserObjectResponse[]
  }
  Category: {
    id: string
    type: string
    select: SelectObject
  }
  Tags: {
    id: string
    type: string
    multi_select: SelectObject[]
  }
  Description: {
    id: string
    type: string
    rich_text: TextRichTextItemResponse[]
  }
  Published: {
    id: string
    type: string
    checkbox: boolean
  }
  PublishedAt: {
    id: string
    type: string
    date: {
      start: string
      end: string | null
      time_zone: string | null
    }
  }
  Created: {
    id: string
    type: string
    created_time: string
  }
  Updated: {
    id: string
    type: string
    last_edited_time: string
  }
  Slug: {
    id: string
    type: string
    formula: {
      type: string
      string: string
    }
  }
}

export type BlogPost = {
  id: string
  slug: string
  cover: any
  title: string
  category: SelectObject
  tags: SelectObject[]
  description: string
  publihedAt: string
  modifiedAt: string
  author: PersonUserObjectResponse
}

export type PostPage = {
  post: BlogPost
  markdown: string
}

export type PostGroupObject = {
  [key: string]: BlogPost[]
}
