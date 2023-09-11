'use client'

import { useAccount, useNetwork } from 'wagmi'

export function Connected({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  if (!isConnected || !chain || chain.unsupported) return (
    <div className="absolute w-[660px] h-[371px] top-[680px] left-[280px] bg-[#161616] rounded-[40px] overflow-hidden">
      <div className="absolute w-[529px] h-[26px] top-[49px] left-[56px] [font-family:'Raleway-Medium',_Helvetica] font-large font-bold text-[#00dacc] text-[40px] tracking-[0] leading-[normal]">
        <h1>Connect your wallet to a supported network</h1>
      </div>
      {/* <div className="absolute w-[547px] h-[60px] top-[261px] left-[57px] bg-[#505050] rounded-[50px] overflow-hidden">
        <div className="absolute w-[547px] h-[24px] top-[17px] left-0 [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[20px] text-center tracking-[0] leading-[normal]">
          {ensName ?? address}
          {ensName ? ` (${address})` : null}
        </div>
      </div> */}
    </div>
  )
  return <>{children}</>
}
