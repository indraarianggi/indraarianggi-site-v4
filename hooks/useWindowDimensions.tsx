import { useEffect, useState } from 'react'

const useWindowDimensions = () => {
  const hasWindow = typeof window !== 'undefined'

  const getWindowDimensions = () => {
    const width = hasWindow
      ? Math.max(
          window.document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        )
      : 0
    const height = hasWindow
      ? Math.max(
          window.document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        )
      : 0
    return { width, height }
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasWindow])

  return windowDimensions
}

export default useWindowDimensions
