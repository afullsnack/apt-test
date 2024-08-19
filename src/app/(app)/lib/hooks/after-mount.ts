/**
 * Custom useEffect that runs once
 * params: fn - function to run and deps - dependency array for wrapped useEffect
 */

import { useEffect, useRef } from 'react'

export default function useEffectAfterMount(fn: () => void, deps: any[] = []) {
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    fn()
  }, deps)
}
