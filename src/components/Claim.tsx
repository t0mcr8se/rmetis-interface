"use client";

import { useMemo } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { useMerkleProof } from "../hooks/useMerkleTree";
import { formatEther } from "viem";
import { useVestingConfig } from "../hooks/useConfig";
import { useCallback } from "react";
import { useAidropDeadline } from "../hooks/useToken";

export function Claim() {
  const { address } = useAccount();
  const { found, loading, leafIndex, amount, proof } = useMerkleProof(address);
  const vestingContractConfig = useVestingConfig();
  const claimDeadline = useAidropDeadline()
  const deadline = useMemo(() => {return (new Date(Number(claimDeadline) * 1000)).toLocaleString()}, [claimDeadline])

  // Check if claimed
  const {
    data: isClaimed,
  } = useContractRead({
    ...vestingContractConfig,
    functionName: "claimed",
    args: [address],
  });

  const {
    data: merkleRoot,
  } = useContractRead({
    ...vestingContractConfig,
    functionName: "merkleRoot",
  });

  const {write, error, isError} = useContractWrite({
    ...vestingContractConfig,
    functionName: "claim",
    args: [amount, proof]
  })

  const click = useCallback(() => {
    write({args: [amount, proof]})
  }, [amount, proof, write])

  return (<>
    <div>
      {isClaimed
        ? `You have already claimed your rMetis tokens`
        : address
        ? loading
          ? `Loading Merkle Tree`
          : !found
          ? `You are not eligible for this airdrop`
          : `You are eligible to claim ${formatEther(amount as bigint)} rMetis`
        : `Connect wallet to check eligibility`}
      {!isClaimed && address && found && (<>
        <br />
        <button disabled={isError} onClick={click}>{isError ? error?.message : `Claim`}</button>
        <p><b>Claim your tokens before {deadline}</b></p>
      </>)}
    </div>
    </>
  );
}
