"use client";

import { useMemo } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { useMerkleProof } from "../hooks/useMerkleTree";
import { formatEther } from "viem";
import { useVestingConfig } from "../hooks/useConfig";
import { useCallback } from "react";
import { useAidropDeadline } from "../hooks/useToken";
import Link from "next/link";

export function Claim({index}: {index?: number}) {
  const { address } = useAccount();
  const { found, loading, amount, proof } = useMerkleProof(index, address);
  const vestingContractConfig = useVestingConfig(index);
  const claimDeadline = useAidropDeadline(index);
  const deadline = useMemo(() => {
    return new Date(Number(claimDeadline) * 1000).toLocaleString();
  }, [claimDeadline]);
  const deadlinePassed = useMemo(() => {
    return Number(claimDeadline) < Date.now() / 1000;
  }, [claimDeadline]);

  // Check if claimed
  const { data: isClaimed } = useContractRead({
    ...vestingContractConfig,
    functionName: "claimed",
    args: [address],
    watch: true,
  });

  const { write, isError } = useContractWrite({
    ...vestingContractConfig,
    functionName: "claim",
    args: [amount, proof],
  });

  const click = useCallback(() => {
    write({ args: [amount, proof] });
  }, [amount, proof, write]);

  return (
    <>
      <div className="absolute w-[659px] h-[193px] top-[1737px] left-[980px] bg-[url(../../static/img/frame-32.png)] bg-[100%_100%]">
        <p className="absolute w-[475px] h-[72px] top-[60px] left-[184px] [font-family:'Inter-Regular',_Helvetica] font-normal text-transparent text-[30px] tracking-[0] leading-[normal]">
          {deadlinePassed && !isClaimed ? (
            <span className="text-white">The airdrop has ended</span>
          ) : (
            <>
              {isClaimed ? (
                <span className="text-white">
                  You have already claimed your rMetis tokens
                </span>
              ) : address ? (
                loading ? (
                  <span className="text-white">Loading Merkle tree</span>
                ) : !found ? (
                  <span className="text-white">
                    You are not eligible for this airdrop, try checking <Link href={`/batch/${(index ?? 0 + 1) % 2}`} >Batch No. {(index ?? 0 + 1) % 2}</Link>
                  </span>
                ) : (
                  <>
                    <span className="text-white">
                      Claim your tokens before{" "}
                    </span>
                    <span className="text-[#00dacc]">{deadline}</span>
                  </>
                )
              ) : (
                <span className="text-white">
                  Connect wallet to check eligibility
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {!isClaimed && found && !deadlinePassed && amount && (
        <>
          <div className="absolute w-[659px] h-[193px] top-[1737px] left-[280px] bg-[#161616] rounded-[40px] overflow-hidden">
            <p className="absolute w-[500px] h-[135px] top-[60px] left-[138px] [font-family:'Inter-Regular',_Helvetica] font-normal text-transparent text-[30px] tracking-[0] leading-[normal]">
              <span className="text-white">You are eligible to claim </span>
              <span className="text-[#00dacc]">{formatEther(amount)}</span>
              <span className="text-white"> of rMetis tokens</span>
            </p>
            <img
              className="absolute w-[70px] h-[80px] top-[57px] left-[33px]"
              alt="Group"
              src="../../static/img/group-11.svg"
            />
          </div>
          <div className="absolute w-[240px] h-[60px] top-[1627px] left-[980px] bg-[#00dacc] rounded-[50px]">
            <button
              onClick={click}
              disabled={isError}
              className="absolute w-[239px] h-[60px] -top-px left-px [font-family:'Raleway-Medium',_Helvetica] font-medium text-black text-[20px] text-center tracking-[0.20px] leading-[normal]"
            >
              Claim
            </button>
          </div>
        </>
      )}
      <div className="absolute w-[660px] h-[94px] top-[1609px] left-[280px] [font-family:'Raleway-Medium',_Helvetica] font-medium text-white text-[80px] tracking-[0] leading-[normal]">
        Eligibility Check
      </div>
    </>
  );
}
