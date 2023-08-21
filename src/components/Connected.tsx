'use client'

import { useAccount, useNetwork } from 'wagmi'

export function Connected({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  if (!isConnected || !chain || chain.unsupported) return <h1>Connect to a supported network</h1>
  return <>{children}</>
}
