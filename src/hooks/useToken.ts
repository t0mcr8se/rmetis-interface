import { useContractRead } from "wagmi";
import { useRMetisConfig, useVestingConfig } from "./useConfig";
import { useMemo } from "react";

export function useRMetisBalance(account?: string) {
  const rMetisConfig = useRMetisConfig();
  const {
    data: balance,
    refetch,
    isRefetching,
  } = useContractRead({
    ...rMetisConfig,
    functionName: "balanceOf",
    args: [account],
  });
  return { balance: balance as bigint || BigInt(0), refetch, isRefetching };
}

export function useRatio() {
  const vestingConfig = useVestingConfig();
  const { data: ratio, refetch } = useContractRead({
    ...vestingConfig,
    functionName: "priceRatio",
  });
  return { ratio: ratio as bigint || BigInt(0), refetch } as any;
}

export function useAidropDeadline() {
  const vestingConfig = useVestingConfig();
  const { data: deadline } = useContractRead({
    ...vestingConfig,
    functionName: "claimDeadline",
  });
  return deadline as any;
}

export function useRMetisAllowance(requiredAmount: bigint, spender?: string, owner?: string) {
  const {
    data: allowance,
    refetch,
    isRefetching,
  } = useContractRead({
    ...useRMetisConfig(),
    functionName: "allowance",
    args: [owner, spender],
  });
  return { allowance: allowance as bigint, refetch, isRefetching, needApprove: (allowance as bigint) < requiredAmount };
}

export function useVestingSchedule() {
  const { data: startDate, refetch: startRefetch } = useContractRead({
    ...useVestingConfig(),
    functionName: "startDate",
  });
  const { data: endDate, refetch: endRefetch } = useContractRead({
    ...useVestingConfig(),
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

export function useVestingProgress() {
  const { startDate, endDate } = useVestingSchedule();
  return useMemo(() => {
    if (!startDate || !endDate) return 0;
    const now = BigInt(Math.floor(Date.now() / 1000));
    if (now < startDate) return 0;
    if (now > endDate) return 100;
    return (Number(now - startDate) / Number(endDate - startDate)) * 100;
  }, [startDate, endDate]);
}
