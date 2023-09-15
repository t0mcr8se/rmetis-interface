"use client";

import { Web3Button } from "@web3modal/react";
import { useNetwork, useSwitchNetwork, useAccount, useEnsName } from "wagmi";

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  return (
    <div className="absolute w-[660px] h-[371px] top-[780px] left-[986px] w-[660px] h-[371px] bg-[#161616] rounded-[40px] overflow-hidden">
      <div className="absolute w-[529px] h-[26px] top-[49px] left-[51px] [font-family:'Raleway-Medium',_Helvetica] font-medium text-[#00dacc] text-[22px] tracking-[0] leading-[normal]">
        Network
      </div>
      <p className="absolute w-[529px] h-[27px] top-[102px] left-[51px] [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[22px] tracking-[0] leading-[normal]">
        <span className="[font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[22px] tracking-[0]">
          Connected to{" "}
        </span>
        <span className="[font-family:'Inter-Bold',_Helvetica] font-bold">
          {chain?.name ?? chain?.id}
          {chain?.unsupported && " (unsupported)"}
        </span>
      </p>
      {switchNetwork && (
        <div className="absolute w-[529px] h-[60px] top-[171px] left-[51px]">
          <div className="absolute w-[529px] h-[27px] top-[15px] left-0 [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[22px] tracking-[0] leading-[normal]">
            Switch to:
          </div>
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button
                key={x.id}
                className="w-[240px] top-0 left-[121px] absolute h-[60px] bg-black rounded-[50px] button"
                onClick={() => switchNetwork(x.id)}
              >
                <div className="absolute w-[107px] h-[60px] top-[14px] left-[67px] [font-family:'Raleway-Medium',_Helvetica] font-medium text-white text-[20px] tracking-[0.20px] leading-[normal]">
                  {x.name}
                  {isLoading && x.id === pendingChainId && ' (switching)'} 
                </div>
                <img
                  className="absolute w-[43px] h-[42px] top-[9px] left-[10px]"
                  alt="Vector"
                  src="../../static/img/vector.svg"
                />
              </button>
            )
          )}
        </div>
      )}

      <div className="w-[569px] top-[261px] left-[51px] overflow-hidden border border-solid absolute h-[60px] bg-black rounded-[50px]">
        <div className="absolute w-[278px] h-[34px] top-[12px] left-[73px] [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[28px] tracking-[0] leading-[normal]">
            <Web3Button />
        </div>
      </div>
    </div>
  );
}
