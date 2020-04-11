import React, { useEffect, useState, useMemo } from 'react'

export function useKeyUpListener(targetKey) {
  const [isKeyPressed, setIsKeyPressed] = useState(false)

  useEffect(() => {
    function onKeyUp({ key }) {
      setIsKeyPressed(targetKey === key)
    }

    document.addEventListener('keyup', onKeyUp, false)

    return () => {
      document.removeEventListener('keyup', onKeyUp, false)
    }
  }, [targetKey])

  return isKeyPressed
}
