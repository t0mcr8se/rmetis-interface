import { useMemo } from "react";
import { useNetwork } from "wagmi";
import {
  RMETIS_ABI,
  RMETIS_ADDRESSES,
  VESTING_ABI,
  VESTING_ADDRESSES,
} from "../constants";
import { zeroAddress } from "viem";

export function useVestingConfig(index = 0) {
  const { chain } = useNetwork();
  return useMemo(() => {
    if (!chain || chain.unsupported)
      return { address: zeroAddress, abi: VESTING_ABI };
    return {
      address: VESTING_ADDRESSES[chain.id][index] as `0x${string}`,
      abi: VESTING_ABI,
    };
  }, [chain, index]);
}

export function useRMetisConfig(index = 0) {
  const { chain } = useNetwork();
  return useMemo(() => {
    if (!chain || chain.unsupported) return;
    return {
      address: RMETIS_ADDRESSES[chain.id][index] as `0x${string}`,
      abi: RMETIS_ABI,
    };
  }, [chain, index]);
}
