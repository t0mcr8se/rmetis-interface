import {metis, metisGoerli} from 'wagmi/chains'

export const SUPPORTED_CHAINS = [metis, metisGoerli]

export const WALLET_CONNECT_PROJECT_ID = process.env['WALLET_CONNECT_PROJECT_ID'] || 'da1c3b9d03ca92585b6b7cd31e9e9b6b'

export {default as RMETIS_ABI} from '../abi/erc20.json'
export {default as VESTING_ABI} from '../abi/vesting-vault.json'

type AddressMap = {[chainId: number]: string}

export const RMETIS_ADDRESSES: AddressMap = {
    1088: '0xADA3f46af457A6ce74886cd32aC1916EaD6e3366',
    599: '0x479A23155cBe0db53d2E89373FB2178845eb9611',
}

export const VESTING_ADDRESSES: AddressMap = {
    1088: '0xa7796c1B6A33671b963Ea512eD38F0493B1F79fd',
    599: '0x2D86cd08D59e9602DD9585078fdb16FD560D6e2E',
}

export const MERKLE_TREES: AddressMap = {
    1088: "https://ipfs.io/ipfs/QmcVDVhGtudUGyfY4CJNYuVUuDFodo67Lf1fK9fj88EZNW",
    599: "https://ipfs.io/ipfs/QmcVDVhGtudUGyfY4CJNYuVUuDFodo67Lf1fK9fj88EZNW"
}

export const PRECISION = BigInt(10000)