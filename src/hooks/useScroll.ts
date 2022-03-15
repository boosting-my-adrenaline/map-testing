import { useState, useEffect, useRef } from 'react'

export function useScroll() {
  const prevPos = useRef(0)

  const [isScrollingTop, setIsScrollingTop] = useState(true)

  const listener = () => {
    const curPos = window.pageYOffset
    if (curPos >= prevPos.current) {
      setIsScrollingTop(false)
    } else {
      setIsScrollingTop(true)
    }

    prevPos.current = curPos
  }

  useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [])

  return {
    isScrollingTop,
  }
}
