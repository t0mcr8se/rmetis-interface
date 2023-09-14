import {metis, metisGoerli} from 'wagmi/chains'

export const SUPPORTED_CHAINS = [metis, metisGoerli]

export const WALLET_CONNECT_PROJECT_ID = 'da1c3b9d03ca92585b6b7cd31e9e9b6b'

export {default as RMETIS_ABI} from '../abi/erc20.json'
export {default as VESTING_ABI} from '../abi/vesting-vault.json'

type AddressMap = {[chainId: number]: string}

export const RMETIS_ADDRESSES: AddressMap = {
    1088: '0xaeC5fDc91AE13F0D096B7FE1a98A59A6B7B8807A',
    599: '0x2E396C9F6c7781188A64c6E6EDCB07A94411a968',
}

export const VESTING_ADDRESSES: AddressMap = {
    1088: '0xF39497E24b02504E0381B4bDE863743992B7E59B',
    599: '0x2abc1f61b65be381Ca9D678537D6F20088D0EA0B',
}

export const MERKLE_TREES: AddressMap = {
    1088: "https://ipfs.io/ipfs/Qma9u45w92yFK8LPeCbWBNL1J1QkNYTtgMtUGBotWK6wYc",
    599: "https://ipfs.io/ipfs/QmdGo9MfbapaJYpNeCfKHZHeNGTNJnJ1Ry8mVZVqXTskQb"
}

export const PRECISION = BigInt(10000)