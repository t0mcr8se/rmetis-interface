"use client";

import { useEffect, useMemo } from "react";
import { redirect, useParams } from "next/navigation";
import { Account } from "../../../components/Account";
import { Balance } from "../../../components/Balance";
import { Connected } from "../../../components/Connected";
import { NetworkSwitcher } from "../../../components/NetworkSwitcher";
import { Claim } from "../../../components/Claim";
import { Redeem } from "../../../components/Redeem";
import "../../../styles/index.css";
import Welcome from "../../../components/Welcome";

export default function Page() {
  const {id} = useParams<{id : string;}>()


  const index = useMemo(() => {
    if(id === '2') return 1
    if(id === '1') return 0
    return undefined
  }, [id])

  useEffect(() => {
    if(index === undefined) redirect('/batch/1')
  }, [index])

  return (
    <>
      <div className="bg-[#0e0e0e] flex flex-row justify-center w-full">
        <div className="bg-[#0e0e0e] w-[1920px] h-[3665px] relative">
          <Welcome />
          <NetworkSwitcher />
          <Connected>
            <Account />
            <Balance />
            <Claim index={index}/>
            <Redeem index={index}/>
          </Connected>
        </div>
      </div>
    </>
  );
}
