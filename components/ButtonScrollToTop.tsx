import { useEffect, useState } from 'react'

const ButtonScrollToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 300) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <button
      aria-label="Scroll To Top"
      type="button"
      className={`fixed right-4 md:right-6 bottom-4 md:bottom-6 z-10 rounded-full p-2 bg-gray-50 text-gray-400 drop-shadow-lg ${
        show ? 'block' : 'hidden'
      }`}
      onClick={handleScrollTop}>
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}

export default ButtonScrollToTop
