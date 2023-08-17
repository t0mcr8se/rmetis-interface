import { useMemo } from "react";
import { useNetwork } from "wagmi";
import {
  RMETIS_ABI,
  RMETIS_ADDRESSES,
  VESTING_ABI,
  VESTING_ADDRESSES,
} from "../constants";
import { zeroAddress } from "viem";

export function useVestingConfig() {
  const { chain } = useNetwork();
  return useMemo(() => {
    if (!chain || chain.unsupported)
      return { address: zeroAddress, abi: VESTING_ABI };
    return {
      address: VESTING_ADDRESSES[chain.id] as `0x${string}`,
      abi: VESTING_ABI,
    };
  }, [chain]);
}

export function useRMetisConfig() {
  const { chain } = useNetwork();
  return useMemo(() => {
    if (!chain || chain.unsupported) return;
    return {
      address: RMETIS_ADDRESSES[chain.id] as `0x${string}`,
      abi: RMETIS_ABI,
    };
  }, [chain]);
}
