'use client'

import { useAccount, useNetwork } from 'wagmi'

export function Connected({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  if (!isConnected || !chain || chain.unsupported) return <tr><td colSpan={2}><h1>Connect to a supported network</h1></td></tr>
  return <>{children}</>
}
