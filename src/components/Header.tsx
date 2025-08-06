"use client"

import Image from 'next/image'

export interface HeaderProps {
  isUnlocked: boolean
}

export default function Header({ isUnlocked }: HeaderProps) {

  return (
    <>
      {isUnlocked && (
        <header
          className={`
            fixed top-4 left-0 right-0
            h-24 flex items-center justify-center
            bg-black/80 backdrop-blur-sm
            border-b border-red-900/30
            px-6 glitch-container
          `}
          data-text="ARASAKA"
        >
          <div className="flex items-center justify-center">
            <Image
              src="/ArasakaLogoResources/Thumbnails-113.png"
              alt="arasaka logo"
              width={128}
              height={128}
            />
          </div>
        </header>
      )}
    </>
  )
}