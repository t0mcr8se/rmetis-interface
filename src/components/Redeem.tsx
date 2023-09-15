"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { formatEther, parseEther } from "viem";
import {
  useRMetisAllowance,
  useRMetisBalance,
  useRatio,
  useVestingProgress,
  useVestingSchedule,
} from "../hooks/useToken";
import { PRECISION } from "../constants";
import { useRMetisConfig, useVestingConfig } from "../hooks/useConfig";
import { ProgressBar } from "./ProgressBar";


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
  // we need to input the amount of xMetis to redeem, then have a button to approve it and then finally redeem button
  const [inputAmount, setInputAmount] = useState("0");
  const [inputError, setInputError] = useState<string | null>(null);
  const [parsedInput, setParsedInput] = useState<bigint>(BigInt(0));
  const { startDate, endDate } = useVestingSchedule();

  const {
    refetch: allowanceRefetch,
    isRefetching: isAllowanceRefetching,
    needApprove,
  } = useRMetisAllowance(parsedInput, vestingConfig.address, address);

  const vestingProgress = useVestingProgress();

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
    (e: any) => {
      setInputAmount(e.target.value);
      try {
        const parsed = parseEther(e.target.value as `${number}`);
        setParsedInput(parsed);
        if (parsed > balance) setInputError("Insufficient balance");
        else setInputError(null);
      } catch (e) {
        setInputError("Invalid amount");
      }
    },
    [balance]
  );
  return (
    <>
      <div className="absolute w-[660px] h-[526px] top-[1964px] left-[280px] bg-[#303030] rounded-[40px] overflow-hidden">
        <div className="absolute w-[529px] h-[60px] top-[204px] left-[70px] bg-black rounded-[44px]">
          <div className="absolute w-[313px] h-[34px] top-[11px] left-[19px] [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[28px] tracking-[0] leading-[normal]">
            {formatEther(balance)} rMetis
          </div>
        </div>
        <p className="absolute w-[529px] h-[42px] top-[51px] left-[70px] [font-family:'Raleway-Medium',_Helvetica] font-medium text-white text-[36px] tracking-[0] leading-[normal]">
          Redeem your rMetis for Metis
        </p>
        <div className="absolute w-[313px] h-[42px] top-[380px] left-[70px] [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[35px] tracking-[0] leading-[normal]">
          {formatEther((ratio * balance) / PRECISION)} Metis
        </div>
        <div className="absolute w-[313px] top-[157px] left-[70px] [font-family:'Inter-Regular',_Helvetica] font-normal text-[#00dacc] text-[22px] tracking-[0] leading-[normal]">
          rMetis balance
        </div>
        <div className="absolute w-[313px] top-[348px] left-[70px] [font-family:'Inter-Regular',_Helvetica] font-normal text-[#00dacc] text-[22px] tracking-[0] leading-[normal]">
          You can redeem
        </div>
        <p className="absolute w-[313px] top-[272px] left-[70px] [font-family:'Inter-Regular',_Helvetica] font-normal text-[#6c6c6c] text-[20px] tracking-[0] leading-[normal]">
          <span className="[font-family:'Inter-Regular',_Helvetica] font-normal text-[#6c6c6c] text-[20px] tracking-[0]">
            1 rMetis = {Number(ratio) / Number(PRECISION)}{" "}
          </span>
          <span className="[font-family:'Inter-Bold',_Helvetica] font-bold">
            Metis
          </span>
        </p>
      </div>
      <div className="absolute w-[660px] h-[526px] top-[1964px] left-[980px] bg-[#303030] rounded-[40px] overflow-hidden">
        <div className="absolute w-[529px] h-[42px] top-[51px] left-[70px] [font-family:'Raleway-Medium',_Helvetica] font-medium text-white text-[36px] tracking-[0] leading-[normal]">
          Vesting Schedule
        </div>
        <div className="absolute w-[137px] top-[368px] left-[70px] [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[20px] tracking-[0] leading-[normal]">
          {new Date(Number(startDate) * 1000).toLocaleDateString()}
        </div>
        <div className="left-[70px] absolute w-[137px] top-[402px] [font-family:'Inter-Regular',_Helvetica] font-normal text-[#6c6c6c] text-[20px] tracking-[0] leading-[normal]">
          {new Date(Number(startDate) * 1000).toLocaleTimeString()}
        </div>
        <div className="absolute w-[137px] top-[326px] left-[70px] [font-family:'Inter-Bold',_Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[normal]">
          Start
        </div>
        <div className="absolute w-[137px] top-[368px] left-[453px] [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[20px] text-right tracking-[0] leading-[normal]">
          {new Date(Number(endDate) * 1000).toLocaleDateString()}
        </div>
        <div className="left-[453px] text-right absolute w-[137px] top-[402px] [font-family:'Inter-Regular',_Helvetica] font-normal text-[#6c6c6c] text-[20px] tracking-[0] leading-[normal]">
          {" "}
          {new Date(Number(endDate) * 1000).toLocaleTimeString()}
        </div>
        <div className="absolute w-[137px] top-[326px] left-[453px] [font-family:'Inter-Bold',_Helvetica] font-bold text-white text-[32px] text-right tracking-[0] leading-[normal]">
          End
        </div>
        <ProgressBar percent={vestingProgress} />
        <img
          className="left-[70px] absolute w-[2px] h-[20px] top-[289px]"
          alt="Vector"
          src="vector-3.svg"
        />
        <img
          className="left-[329px] absolute w-[2px] h-[20px] top-[289px]"
          alt="Vector"
          src="vector-5.svg"
        />
        <img
          className="left-[588px] absolute w-[2px] h-[20px] top-[289px]"
          alt="Vector"
          src="vector-4.svg"
        />
      </div>
      <div className="absolute w-[1360px] h-[353px] top-[2524px] left-[280px] bg-[#303030] rounded-[30px] overflow-hidden shadow-[var(--sombra-cuadros)]">
        <div className="absolute w-[529px] top-[130px] left-[66px] [font-family:'Inter-Regular',_Helvetica] font-normal text-[#00dacc] text-[22px] tracking-[0] leading-[normal]">
          Amount
        </div>
        {inputError ?? (
          <p className="absolute w-[529px] top-[247px] left-[66px] [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[22px] tracking-[0] leading-[normal]">
            <span className="[font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[22px] tracking-[0]">
              You will get {formatEther((ratio * parsedInput) / PRECISION)}{" "}
            </span>
            <span className="[font-family:'Inter-Bold',_Helvetica] font-bold">
              Metis
            </span>
          </p>
        )}
        {isRedeemSuccess && (
          <div className="absolute w-[529px] top-[156px] left-[771px] [font-family:'Inter-Regular',_Helvetica] font-normal text-neutral-300 text-[15px] tracking-[0] leading-[normal]">
            Redeem was successful
            {redeemData?.hash}
          </div>
        )}
        {inputError !== null && <p>Input error: {inputError}</p>}
        {isRedeemError && <p>{redeemError?.message}</p>}
        {isRedeemSuccess && <p>Redeem was successful {redeemData?.hash}</p>}

        <div className="w-[529px] h-[42px] top-[67px] left-[66px] text-white text-[36px] tracking-[0] absolute [font-family:'Raleway-Medium',_Helvetica] font-medium leading-[normal]">
          Redeem
        </div>
        <div className="absolute w-[529px] h-[60px] top-[170px] left-[66px] bg-black rounded-[50px] overflow-hidden border border-solid">
          <input
            name="value"
            placeholder="value (rMetis)"
            value={inputAmount}
            onChange={onInputChange}
            className="absolute w-[320px] h-[34px] top-[12px] left-[31px] bg-black overflow-hidden [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[28px] tracking-[0] leading-[normal]"
          />
          <div className="absolute w-[99px] h-[50px] top-[5px] left-[423px] bg-[#00dacc] rounded-[50px]">
            <button
              onClick={() => {
                setInputAmount(formatEther(balance));
                setParsedInput(balance);
              }}
              className="absolute w-[239px] h-[60px] top-[-6px] left-[-69px] [font-family:'Raleway-Medium',_Helvetica] font-medium text-black text-[20px] text-center tracking-[0.20px] leading-[normal]"
            >
              MAX
            </button>
          </div>
        </div>
        <div className="absolute w-[240px] h-[60px] top-[68px] left-[771px] bg-white rounded-[50px]">
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
                className="w-[239px] h-[60px] -top-px left-px text-black text-[20px] text-center tracking-[0.20px] absolute [font-family:'Raleway-Medium',_Helvetica] font-medium leading-[normal]"
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
              className="w-[239px] h-[60px] -top-px left-px text-black text-[20px] text-center tracking-[0.20px] absolute [font-family:'Raleway-Medium',_Helvetica] font-medium leading-[normal]"
            >
              Redeem
            </button>
          )}
        </div>
      </div>
    </>
  );
}
