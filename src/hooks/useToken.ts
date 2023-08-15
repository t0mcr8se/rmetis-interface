import { useMemo } from "react";
import { useContractRead } from "wagmi";
import { useRMetisConfig, useVestingConfig } from "./useConfig";

export function useRMetisBalance (account?: string) {
    const rMetisConfig = useRMetisConfig()
    const {data: balance} = useContractRead({...rMetisConfig, functionName: "balanceOf", args: [account]})
    return balance as any
}

export function useRatio () {
    const vestingConfig = useVestingConfig()
    const {data: ratio, refetch: refresh} = useContractRead({...vestingConfig, functionName: "priceRatio"})
    return {ratio, refresh} as any
}

export function useAidropDeadline () {
    const vestingConfig = useVestingConfig()
    const {data: deadline} = useContractRead({...vestingConfig, functionName: "claimDeadline"})
    return deadline as any
}

export function useRMetisAllowance (spender?: string, owner?: string) {
    const {data: allowance} = useContractRead({...useRMetisConfig(), functionName: "allowance", args: [owner, spender]})
    return allowance
}