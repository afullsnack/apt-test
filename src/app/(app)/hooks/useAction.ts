import { useState, useCallback } from 'react'

export function useAction<T, A extends any[]>(action: (...args: A) => Promise<T>, initialState: T) {
  const [state, setState] = useState<T>(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (...args: A) => {
      setLoading(true)
      setError(null)
      try {
        const result = await action(...args)
        setState(result)
        return result
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An error occurred'))
        throw e
      } finally {
        setLoading(false)
      }
    },
    [action],
  )

  return { state, loading, error, execute }
}
