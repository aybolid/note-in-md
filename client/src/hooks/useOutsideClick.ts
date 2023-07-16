import React from 'react'

const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  React.useEffect(() => {
    if (!ref.current) return
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [ref, callback])
}

export default useOutsideClick
