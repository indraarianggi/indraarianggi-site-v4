import { useMemo } from 'react'
import Image from 'next/image'
import { getMDXComponent } from 'mdx-bundler/client'
import { MDXComponents as TMDXComponents } from 'mdx/types'

import Pre from './Pre'

export const MDXComponents: TMDXComponents = {
  Image,
  pre: Pre,
}

type TMDXLayoutRendererProps = {
  markdown: string
}

const MDXLayoutRenderer = ({ markdown }: TMDXLayoutRendererProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(markdown), [markdown])

  return <MDXLayout components={MDXComponents} />
}

export default MDXLayoutRenderer
