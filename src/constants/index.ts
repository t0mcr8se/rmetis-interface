import { defineChain } from 'viem'
import {Chain, metis} from 'wagmi/chains'

export const metisSepolia: Chain = defineChain({
    id: 59902,
    name: 'Metis Sepolia',
    nativeCurrency: { name: 'Metis', symbol: 'tMETIS', decimals: 18 },
    rpcUrls: {
        public: { http: ['https://sepolia.metisdevops.link/'] },
        default: { http: ['https://sepolia.metisdevops.link/'] },
    },
    blockExplorers: {
        default: { name: 'Etherscan', url: 'https://etherscan.io' },
    },
    network: "metissepolia"

})
export const SUPPORTED_CHAINS = [metis, metisSepolia]

export const WALLET_CONNECT_PROJECT_ID = 'da1c3b9d03ca92585b6b7cd31e9e9b6b'


export {default as RMETIS_ABI} from '../abi/erc20.json'
export {default as VESTING_ABI} from '../abi/vesting-vault.json'

type AddressMap = {[chainId: number]: string}
type AddressArrayMap = {[chainId: number]: string[]}

export const RMETIS_ADDRESSES: AddressArrayMap = {
    1088: ['0xe08D8c6AF9F0221068E02DfD03A9B421f426332c', '0xe08D8c6AF9F0221068E02DfD03A9B421f426332c'],
    59902: ['0x4E1139C6AF127D6b346Ea453421d2A9a7Ab4E959', '0x4E1139C6AF127D6b346Ea453421d2A9a7Ab4E959']
}

export const VESTING_ADDRESSES: AddressArrayMap = {
    1088: ['0x1b28B90a958a4070bfB301929B99C7aEbDF074E2', '0x1b28B90a958a4070bfB301929B99C7aEbDF074E2'],
    59902: ['0x8eb422ded890B29679893B20db2255B2e9044719', '0x8eb422ded890B29679893B20db2255B2e9044719']
}

export const MERKLE_TREES: AddressArrayMap = {
    1088: ["https://raw.githubusercontent.com/t0mcr8se/rmetis-merkle-tree/main/merkle-lp-snapshot.json", "https://raw.githubusercontent.com/t0mcr8se/rmetis-merkle-tree/main/merkle-lp-snapshot.json"],
    59902: ["https://ipfs.io/ipfs/QmQd4WymhSbQqn2rAeQqKTxjuqicZEDqgEAfj6RW7tF5ac?filename=merkle-lp-snapshot.json", "https://ipfs.io/ipfs/QmQd4WymhSbQqn2rAeQqKTxjuqicZEDqgEAfj6RW7tF5ac?filename=merkle-lp-snapshot.json"],
}

export const PRECISION = BigInt(10000)