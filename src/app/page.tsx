"use client";

import { Account } from "../components/Account";
import { Balance } from "../components/Balance";
import { Connected } from "../components/Connected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { Web3Button } from "../components/Web3Button";
import { Claim } from "../components/Claim";
import { Redeem } from "../components/Redeem";
import { Table } from "../components/Table";
import "../styles/index.css";
import Welcome from "../components/Welcome";

export default function Page() {
  return (
    <>
      <div className="bg-[#0e0e0e] flex flex-row justify-center w-full">
        <div className="bg-[#0e0e0e] w-[1920px] h-[3665px] relative">
          <Welcome />
          <NetworkSwitcher />
          <Connected>
            <Account />
            <Balance />
            <Claim />
            <Redeem />
          </Connected>
        </div>
      </div>
    </>
  );
}
