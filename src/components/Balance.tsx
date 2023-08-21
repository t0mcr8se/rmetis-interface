'use client'

import { useAccount, useBalance } from 'wagmi'

export function Balance() {
  return (
    <>
      <div>
        <AccountBalance />
      </div>
    </>
  )
}

export function AccountBalance() {
  const { address } = useAccount()
  const { data, refetch } = useBalance({
    address,
    watch: true,
  })

  return (
    <div>
      {data?.formatted} METIS{' '}
      <button onClick={() => refetch()}>refetch</button>
    </div>
  )
}
