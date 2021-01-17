import { useEffect, useState } from 'react'

export default function useScrollQuery(breakPoint) {

  // match is true when user scrolls and cross the breakPoint
  const [match, setMatch] = useState(false)

  const handleScroll = e => {
    const scrollTop = window.scrollY
    if(scrollTop > breakPoint && !match) {
      setMatch(true)
    }
    if(scrollTop <= breakPoint && match) {
      setMatch(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    // cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [match])

  return match
} 