'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const DeviceContext = createContext({})

type Args = {
  children: ReactNode
}
export const ScreenDeviceProvider = ({ children }: Args) => {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const userAgent = navigator.userAgent.toLowerCase()

      const isMobile = /mobile|iphone|ipad|android|blackberry|windows phone/i.test(userAgent)
      const isTablet = /tablet|ipad/i.test(userAgent)
      const isDesktopDevice = width >= 1024 && !isMobile && !isTablet // && height >= 768 - is removed for smaller laptops

      console.log('width:', width, 'height:', height, 'isMobile:', isMobile, 'isTablet:', isTablet)
      setIsDesktop(isDesktopDevice)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return (
    <DeviceContext.Provider value={{ isDesktop }}>
      {isDesktop ? (
        children
      ) : (
        <div className="flex flex-col h-screen items-center justify-center">
          <h1 className="text-lg font-normal">Access denied</h1>
          <p>This application is only accessible on desktop or laptop devices.</p>
        </div>
      )}
    </DeviceContext.Provider>
  )
}

export const useDevice = () => useContext(DeviceContext)
