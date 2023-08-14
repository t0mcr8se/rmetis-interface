import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { SUPPORTED_CHAINS, WALLET_CONNECT_PROJECT_ID } from './constants'

export const walletConnectProjectId = WALLET_CONNECT_PROJECT_ID

const { chains, publicClient, webSocketPublicClient } = configureChains(
  SUPPORTED_CHAINS,
  [w3mProvider({ projectId: walletConnectProjectId })],
)

export const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 2,
  }),
  publicClient,
  webSocketPublicClient,
})

export { chains }
