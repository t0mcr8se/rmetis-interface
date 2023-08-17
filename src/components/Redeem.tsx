"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { formatEther, parseEther } from "viem";
import {
  useRMetisAllowance,
  useRMetisBalance,
  useRatio,
  useVestingSchedule,
} from "../hooks/useToken";
import { PRECISION } from "../constants";
import { useRMetisConfig, useVestingConfig } from "../hooks/useConfig";

export function AsciiProgressBar({
  percent,
  width,
}: {
  percent: number;
  width: number;
}) {
  const progress = Math.round((width * percent) / 100);
  const empty = width - progress;
  return (
    <div>
      <span style={{ color: "green" }}>{"".padEnd(progress, "|")}</span>
      <span style={{ color: "red" }}>{"".padEnd(empty, "|")}</span>
    </div>
  );
}

export function Redeem() {
  const { address } = useAccount();
  const {
    balance,
    isRefetching: isBalanceRefetching,
    refetch: balanceRefetch,
  } = useRMetisBalance(address);
  const { ratio, refetch: ratioRefetch } = useRatio();
  const rMetisConfig = useRMetisConfig();
  const vestingConfig = useVestingConfig();
  const {
    allowance,
    refetch: allowanceRefetch,
    isRefetching: isAllowanceRefetching,
  } = useRMetisAllowance(vestingConfig.address, address);
  // we need to input the amount of xMetis to redeem, then have a button to approve it and then finally redeem button
  const [inputAmount, setInputAmount] = useState("0");
  const [inputError, setInputError] = useState<string | null>(null);
  const [parsedInput, setParsedInput] = useState<bigint>(BigInt(0));
  const { startDate, endDate } = useVestingSchedule();

  const vestingProgress = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const now = BigInt(Math.floor(Date.now() / 1000));
    if (now < startDate) return 0;
    if (now > endDate) return 100;
    return (Number(now - startDate) / Number(endDate - startDate)) * 100;
  }, [startDate, endDate]);

  const needApprove = useMemo(() => {
    return allowance < parsedInput;
  }, [allowance, parsedInput]);

  const {
    write: approve,
    error: approveError,
    isError: isApproveError,
    isIdle: isApproveIdle,
  } = useContractWrite({
    ...rMetisConfig,
    functionName: "approve",
    args: [vestingConfig.address, parsedInput],
  });

  const {
    write: redeem,
    error: redeemError,
    isError: isRedeemError,
    isSuccess: isRedeemSuccess,
    isIdle: isRedeemIdle,
    data: redeemData,
  } = useContractWrite({
    ...vestingConfig,
    functionName: "redeem",
    args: [parsedInput],
  });

  useEffect(() => {
    if (!isAllowanceRefetching) allowanceRefetch(); // Refetch everytime the write function status changes
    if (!isBalanceRefetching) balanceRefetch();
  }, [isRedeemIdle, isApproveIdle]);

  const onInputChange = useCallback(
    (e) => {
      setInputAmount(e.target.value);
      try {
        const parsed = parseEther(e.target.value as `${number}`);
        setParsedInput(parsed);
        // setInputAmount(formatEther(parsed));
        if (parsed > balance) setInputError("Insufficient balance");
        else setInputError(null);
      } catch (e) {
        setInputError("Invalid amount");
      }
    },
    [balance]
  );

  return (
    <div>
      {balance && <p>rMetis balance: {formatEther(balance)} rMetis</p>}
      {ratio && (
        <p>
          1 rMetis = {Number(ratio) / Number(PRECISION)} Metis{" "}
          <button onClick={ratioRefetch}>refresh</button>
        </p>
      )}
      {ratio && balance && (
        <p>You can redeem {formatEther((ratio * balance) / PRECISION)} now</p>
      )}
      <p>
        <b>Vesting Schedule: </b>
      </p>
      <p>
        Start {new Date(Number(startDate) * 1000).toLocaleString()}{" "}
        <AsciiProgressBar percent={vestingProgress} width={100} /> End{" "}
        {new Date(Number(endDate) * 1000).toLocaleString()}
      </p>
      <p>
        <b>Redeem:</b>
      </p>
      Amount:{" "}
      <input
        name="value"
        placeholder="value (rMetis)"
        value={inputAmount}
        onChange={onInputChange}
      />
      <button
        onClick={() => {
          setInputAmount(formatEther(balance));
          setParsedInput(balance);
        }}
      >
        max
      </button>{" "}
      {inputError ??
        `You will get ${formatEther((ratio * parsedInput) / PRECISION)} Metis`}
      <br />
      <br />
      {needApprove ? (
        <>
          <button
            disabled={
              isAllowanceRefetching ||
              !isApproveIdle ||
              inputError !== null ||
              isBalanceRefetching
            }
            onClick={() =>
              approve({ args: [vestingConfig.address, parsedInput] })
            }
          >
            Approve
          </button>
          {isApproveError && <p>{approveError?.message}</p>}
        </>
      ) : (
        <button
          disabled={
            inputError !== null ||
            !isRedeemIdle ||
            isBalanceRefetching ||
            isAllowanceRefetching ||
            parsedInput === BigInt(0)
          }
          onClick={() => redeem({ args: [parsedInput] })}
        >
          Redeem
        </button>
      )}
      {inputError !== null && <p>Input error: {inputError}</p>}
      {isRedeemError && <p>{redeemError?.message}</p>}
      {isRedeemSuccess && <p>Redeem was successful {redeemData?.hash}</p>}
    </div>
  );
}
