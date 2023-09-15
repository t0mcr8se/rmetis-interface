'use client'

import { useAccount, useNetwork } from 'wagmi'

export function Connected({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  if (!isConnected || !chain || chain.unsupported) return (
    <div className="absolute w-[660px] h-[371px] top-[780px] left-[280px] bg-[#161616] rounded-[40px] overflow-hidden">
      <div className="absolute w-[529px] h-[26px] top-[49px] left-[56px] [font-family:'Raleway-Medium',_Helvetica] font-large font-bold text-[#00dacc] text-[40px] tracking-[0] leading-[normal]">
        <h1>Connect your wallet to a supported network</h1>
      </div>
    </div>
  )
  return <>{children}</>
}
