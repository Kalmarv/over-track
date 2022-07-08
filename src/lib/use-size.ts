import { useEffect, useState } from 'react'

const breakPointValues = new Map<string, number>([
  ['xs', 400],
  ['sm', 640],
  ['md', 768],
  ['lg', 1024],
  ['xl', 1280],
  ['2xl', 1536],
])

type BreakPoints = {
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  '2xl': boolean
}

export const useBreakpoints = () => {
  const [breakPoints, setBreakPoints] = useState<BreakPoints>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  })
  useEffect(() => {
    const handleResize = () => {
      for (const [key, value] of breakPointValues) {
        if (window.innerWidth >= value) {
          setBreakPoints({ ...breakPoints, [key]: true })
        }
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return breakPoints
}
