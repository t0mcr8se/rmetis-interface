import { useContractRead } from "wagmi";
import { useRMetisConfig, useVestingConfig } from "./useConfig";
import { useMemo } from "react";

export function useRMetisBalance(index=0, account?: string) {
  const rMetisConfig = useRMetisConfig(index);
  const {
    data: balance,
    refetch,
    isRefetching,
  } = useContractRead({
    ...rMetisConfig,
    functionName: "balanceOf",
    args: [account],
    watch: true
  });
  return { balance: balance as bigint || BigInt(0), refetch, isRefetching };
}

export function useRatio(index = 0) {
  const vestingConfig = useVestingConfig(index);
  const { data: ratio, refetch } = useContractRead({
    ...vestingConfig,
    functionName: "priceRatio",
    watch: true
  });
  return { ratio: ratio as bigint || BigInt(0), refetch } as any;
}

export function useAidropDeadline(index = 0) {
  const vestingConfig = useVestingConfig(index);
  const { data: deadline } = useContractRead({
    ...vestingConfig,
    functionName: "claimDeadline",
  });
  return deadline as any;
}

export function useRMetisAllowance(index = 0, requiredAmount: bigint, spender?: string, owner?: string) {
  const {
    data: allowance,
    refetch,
    isRefetching,
  } = useContractRead({
    ...useRMetisConfig(index),
    functionName: "allowance",
    args: [owner, spender],
    watch: true,
  });
  return { allowance: allowance as bigint, refetch, isRefetching, needApprove: (allowance as bigint) < requiredAmount };
}

export function useVestingSchedule(index = 0) {
  const { data: startDate, refetch: startRefetch } = useContractRead({
    ...useVestingConfig(index),
    functionName: "startDate",
  });
  const { data: endDate, refetch: endRefetch } = useContractRead({
    ...useVestingConfig(index),
    functionName: "endDate",
  });
  return {
    startDate: startDate as bigint,
    endDate: endDate as bigint,
    refetch: () => {
      startRefetch();
      endRefetch();
    },
  };
}

export function useVestingProgress(index = 0) {
  const { startDate, endDate } = useVestingSchedule(index);
  return useMemo(() => {
    if (!startDate || !endDate) return 0;
    const now = BigInt(Math.floor(Date.now() / 1000));
    if (now < startDate) return 0;
    if (now > endDate) return 100;
    return (Number(now - startDate) / Number(endDate - startDate)) * 100;
  }, [startDate, endDate]);
}
