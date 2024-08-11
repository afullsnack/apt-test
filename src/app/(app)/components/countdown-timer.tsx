'use client'

import React, { useState, useEffect, useCallback } from 'react'

const CountdownTimer = ({ minutes }: { minutes: number }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60)

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      // onTimerEnd()
      alert('Timer ended! stop test')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <div className="flex items-center justify-center">
      <span className="text-xl font-bold text-black">{formatTime(timeLeft)}</span>
    </div>
  )
}

export default CountdownTimer
