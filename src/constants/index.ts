import {metis, metisGoerli} from 'wagmi/chains'

export const SUPPORTED_CHAINS = [metis, metisGoerli]

export const WALLET_CONNECT_PROJECT_ID = process.env['WALLET_CONNECT_PROJECT_ID'] || 'da1c3b9d03ca92585b6b7cd31e9e9b6b'