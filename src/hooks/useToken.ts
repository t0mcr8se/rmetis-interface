import { useContractRead } from "wagmi";
import { useRMetisConfig, useVestingConfig } from "./useConfig";

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

export function useRMetisAllowance(spender?: string, owner?: string) {
  const {
    data: allowance,
    refetch,
    isRefetching,
  } = useContractRead({
    ...useRMetisConfig(),
    functionName: "allowance",
    args: [owner, spender],
  });
  return { allowance: allowance as bigint, refetch, isRefetching };
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
