import React, { ReactElement, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { BlogPost, PostGroupObject } from 'types/schema'
import { CATEGORY_ORDER } from '@constants/index'

type TLayoutProps = {
  children: ReactElement
  posts: BlogPost[]
}

const initialPostGroup: PostGroupObject = Object.keys(CATEGORY_ORDER).reduce(
  (result, categoryName) => {
    return {
      ...result,
      [categoryName]: [],
    }
  },
  {}
)

const Layout = ({ children, posts }: TLayoutProps) => {
  const router = useRouter()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const postGroups = useMemo(() => {
    const groupObject: PostGroupObject = posts.reduce((result, currentPost) => {
      const currentPostCategory = currentPost.category.name
      return {
        ...result,
        [currentPostCategory]: [...result[currentPostCategory], currentPost],
      }
    }, initialPostGroup)

    const sortedGroupArray = Object.entries(groupObject).sort(
      (itemA, itemB) => {
        const [itemAName] = itemA
        const [itemBName] = itemB

        return CATEGORY_ORDER[itemAName] - CATEGORY_ORDER[itemBName]
      }
    )

    return sortedGroupArray
  }, [posts])

  return (
    <div className="flex">
      <header className="fixed w-full p-4 z-10 bg-white border-b-2 border-gray-100 xl:border-none xl:bg-transparent">
        <button
          className="inline-flex items-center justify-center bg-white rounded-md p-2 text-gray-400 hover:text-gray-500"
          onClick={() => setIsOpenMenu(true)}>
          <span className="sr-only">Open Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      </header>

      <nav
        className={`${
          isOpenMenu
            ? 'translate-x-0 lg:drop-shadow-2xl xl:drop-shadow-none'
            : '-translate-x-full'
        } fixed top-0 left-0 bottom-0 z-50 w-full lg:w-64 text-[0.8rem] transition-all ease-in-out duration-300`}>
        <div className="fixed top-0 left-0 w-full p-4 z-10 bg-gray-50 border-b-2 border-gray-100">
          <button
            className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
            onClick={() => setIsOpenMenu(false)}>
            <span className="sr-only">Close Menu</span>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="h-full overflow-auto pt-24 pb-8 px-8 bg-gray-50">
          <Link href="/">
            <a
              className={`grid grid-cols-8 place-items-start items-baseline ${
                router.asPath === '/' ? 'text-secondary-500' : 'text-gray-700'
              }`}>
              <span>🏠 </span>
              <p className="col-span-7">Home</p>
            </a>
          </Link>
          {postGroups.map((groupItem, groupIdx) => {
            const [groupName, posts] = groupItem

            return (
              <article key={groupIdx} className="mt-12">
                <div className="grid grid-cols-8 place-items-start items-baseline leading-7">
                  <span className="text-[0.6rem] text-gray-400">
                    {groupIdx + 1}.
                  </span>
                  <p className="col-span-7 capitalize font-semibold">
                    {groupName}
                  </p>

                  {posts.map((post) => {
                    const postPath = `/post/${post.slug}`

                    return (
                      <Link key={post.id} href={postPath}>
                        <a
                          className={`col-start-2 col-span-7 leading-7 ${
                            router.asPath === postPath
                              ? 'text-secondary-500'
                              : 'text-gray-700'
                          }`}>
                          {post.title}
                        </a>
                      </Link>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      </nav>

      <main
        className={`${
          isOpenMenu ? 'xl:ml-64' : 'xl:ml-0'
        } flex-1 transition-all ease-in-out duration-300`}>
        <div className="min-h-screen max-w-xl mx-auto pt-24 pb-8 px-4">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
