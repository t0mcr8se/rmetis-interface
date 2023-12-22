import {metis, metisGoerli} from 'wagmi/chains'

export const SUPPORTED_CHAINS = [metis, metisGoerli]

export const WALLET_CONNECT_PROJECT_ID = 'da1c3b9d03ca92585b6b7cd31e9e9b6b'

export {default as RMETIS_ABI} from '../abi/erc20.json'
export {default as VESTING_ABI} from '../abi/vesting-vault.json'

type AddressMap = {[chainId: number]: string}

export const RMETIS_ADDRESSES: AddressMap = {
    1088: '0x18ebC943Ba08e5FF31832F53C3B011db74Bc1911',
    599: '0x91Bfc6358A58Df7Fc1A0Ca9D1B1B3B7f08B80986',
}

export const VESTING_ADDRESSES: AddressMap = {
    1088: '0x4D4F5FAf217143eC1047d944d2e4928e3dCCC9FB',
    599: '0x4381F671Db28109cAcd31907F3EF5594350A027d',
}

export const MERKLE_TREES: AddressMap = {
    1088: "https://raw.githubusercontent.com/t0mcr8se/rmetis-merkle-tree/main/merkle-bsc-0xe552Fb52a4F19e44ef5A967632DBc320B0820639-11170743-29591664-no-contracts.json",
    599: "https://raw.githubusercontent.com/t0mcr8se/rmetis-merkle-tree/main/merkle-bsc-0xe552Fb52a4F19e44ef5A967632DBc320B0820639-11170743-29591664-no-contracts.json"
}

export const PRECISION = BigInt(10000)