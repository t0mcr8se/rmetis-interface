import {metis, metisGoerli} from 'wagmi/chains'

export const SUPPORTED_CHAINS = [metis, metisGoerli]

export const WALLET_CONNECT_PROJECT_ID = process.env['WALLET_CONNECT_PROJECT_ID'] || 'da1c3b9d03ca92585b6b7cd31e9e9b6b'

export {default as RMETIS_ABI} from '../abi/erc20.json'
export {default as VESTING_ABI} from '../abi/vesting-vault.json'

type AddressMap = {[chainId: number]: string}

export const RMETIS_ADDRESSES: AddressMap = {
    1088: '0xADA3f46af457A6ce74886cd32aC1916EaD6e3366',
    599: '0x41C587cD3Dc8982A53D994D943D48E98490Aa2F9',
}

export const VESTING_ADDRESSES: AddressMap = {
    1088: '0xa7796c1B6A33671b963Ea512eD38F0493B1F79fd',
    599: '0xefa11d94D5EDEF0a284C7FAA7ACecEd62E7d0FBE',
}

export const MERKLE_TREE_PATH = "../../snapshot.json" // TODO: insert ipfs hash here

// export {default as MERKLE_TREE} from '../snapshot.json'
import METIS_MERKLE_TREE from '../snapshots/snapshot-metis.json'
import METISGOERLI_MERKLE_TREE from '../snapshots/snapshot-metisgoerli.json'

export const MERKLE_TREES = {
    1088: METIS_MERKLE_TREE,
    599: METISGOERLI_MERKLE_TREE
}