import {metis, metisGoerli} from 'wagmi/chains'

export const SUPPORTED_CHAINS = [metis, metisGoerli]

export const WALLET_CONNECT_PROJECT_ID = process.env['WALLET_CONNECT_PROJECT_ID'] || 'da1c3b9d03ca92585b6b7cd31e9e9b6b'

export {default as RMETIS_ABI} from '../abi/erc20.json'
export {default as VESTING_ABI} from '../abi/vesting-vault.json'

type AddressMap = {[chainId: number]: string}

export const RMETIS_ADDRESSES: AddressMap = {
    [metis.id]: '0xADA3f46af457A6ce74886cd32aC1916EaD6e3366',
    [metisGoerli.id]: '0x2e9c0D7a7c7Fb08392455e9655d693D8a67AC88C',
}

export const VESTING_ADDRESSES: AddressMap = {
    [metis.id]: '0xa7796c1B6A33671b963Ea512eD38F0493B1F79fd',
    [metisGoerli.id]: '0x19739037856a1e457A34932BbA4ee49A194AA854',
}

