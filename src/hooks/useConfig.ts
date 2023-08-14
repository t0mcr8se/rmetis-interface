import { useMemo } from "react"
import { useNetwork } from "wagmi"
import { RMETIS_ABI, RMETIS_ADDRESSES, VESTING_ABI, VESTING_ADDRESSES } from "../constants"


export function useVestingConfig() {
    const { chain } = useNetwork()
    return useMemo(() => {
        if (!chain || chain.unsupported) return
        return {
            address: VESTING_ADDRESSES[chain.id],
            abi: VESTING_ABI
        }
    }, [chain])
}

export function useRMetisConfig() {
    const { chain } = useNetwork()
    return useMemo(() => {
        if (!chain || chain.unsupported) return
        return {
            address: RMETIS_ADDRESSES[chain.id],
            abi: RMETIS_ABI
        }
    }, [chain])
}