"use client";

import { Account } from "../components/Account";
import { Balance } from "../components/Balance";
import { Connected } from "../components/Connected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { Web3Button } from "../components/Web3Button";
import { Claim } from "../components/Claim";
import { Redeem } from "../components/Redeem";
import { useNetwork } from "wagmi";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }
`;

export function Page() {
  const { chain } = useNetwork();
  return (
    <>
      <Connected>
        <Table>
          <tr>
            <td>
              <h1>Metis Redemption</h1>
            </td>
            <td>
              <Web3Button />
            </td>
          </tr>
          <tr>
            <td>
              <h2>Connected account</h2>
              <Account />
            </td>
            <td>
              <h2>Network</h2>
              <NetworkSwitcher />
            </td>
          </tr>
          {!chain || chain.unsupported ? (
            <tr>
              <td colSpan={2}>
                {chain?.unsupported
                  ? "Unsupported network"
                  : "Connect to a network"}
              </td>
            </tr>
          ) : (
            <>
              <tr>
                <td>
                  <h2>Metis Balance</h2>
                  <Balance />
                </td>
                <td>
                  <h2>Eligibility Check</h2>
                  <Claim />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <h2>Redeem your rMetis for Metis</h2>
                  <Redeem />
                </td>
              </tr>
            </>
          )}
        </Table>
      </Connected>
    </>
  );
}

export default Page;
