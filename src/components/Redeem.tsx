"use client";

import { useState, useCallback } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { formatEther, parseEther } from "viem";
import { useRMetisBalance, useRatio } from "../hooks/useToken";
import { PRECISION } from "../constants";

export function Redeem() {
  const { address } = useAccount();
  const balance = useRMetisBalance(address)
  const {ratio, refresh} = useRatio()
  console.log({balance, ratio})

  // we need to input the amount of xMetis to redeem, then have a button to approve it and then finally redeem button
  const [inputAmount, setInputAmount] = useState('0');
  const [inputError, setInputError] = useState<string | null>("")
  
  const [parsedInput, setParsedInput] = useState<bigint>(BigInt(0));
  
  const onInputChange = useCallback((e) => {
    setInputAmount(e.target.value)
    try{
        const parsed = parseEther(e.target.value as `${number}`)
        setParsedInput(parsed)
        if (parsed > balance) setInputError('Insufficient balance')
        else setInputError(null)
    } catch (e) {
        setInputError('Invalid amount')
    }
  }, [balance])

  const approveCallback = useCallback(() => {
    // TODO: call write from the approve method
  }, [])

  const redeemCallback = useCallback(() => {
    // TODO: call write from the redeem method
  }, [])

  // TODO: show progress bar, on the left there would be starting date, on the left would be the end date
  // TODO: check allowance of account to contract, check if allowace is sufficient for the transaction, otherwise show approve button
  // TODO: write approve function, callback on approve click
  // TODO: check if the account has sufficient balance to redeem, otherwise show error, disable redeem button
  // TODO: write redeem function, callback on redeem click
  
  return (
    <div>
        {balance && <p>rMetis balance: {formatEther(balance)} rMetis</p>}
        {ratio && <p>1 rMetis = {Number(ratio) / Number(PRECISION)} Metis <button onClick={refresh}>refresh</button></p>}
        {ratio && balance && <p>You can redeem {formatEther(ratio * balance / PRECISION)} now</p>}
        <p><b>Redeem:</b></p>
        Amount: <input name="value" placeholder="value (rMetis)" onChange={onInputChange} />
        <br />
        {inputError ?? `You will get ${formatEther(ratio * parsedInput / PRECISION)} Metis`}
        <button disabled={inputError !== null} onClick={approveCallback}>Approve</button>
        <br />
        <button disabled={inputError !== null} onClick={redeemCallback}>Redeem</button>
    </div>
  )
}
