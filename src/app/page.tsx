import { Account } from '../components/Account'
import { Balance } from '../components/Balance'
import { Connected } from '../components/Connected'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { Web3Button } from '../components/Web3Button'
import { MerkleCheck } from '../components/MerkleCheck'

export function Page() {
  return (
    <>
      <h1>wagmi + Web3Modal + Next.js</h1>

      <Web3Button />

      <Connected>
        <hr />
        <h2>Network</h2>
        <NetworkSwitcher />
        <br />
        <hr />
        <h2>Account</h2>
        <Account />
        <br />
        <hr />
        <h2>Metis Balance</h2>
        <Balance />
        <br />
        <hr />
        <h2>Eligibility Check</h2>
        <MerkleCheck />
        <br />
        <hr />
      </Connected>
    </>
  )
}

export default Page
