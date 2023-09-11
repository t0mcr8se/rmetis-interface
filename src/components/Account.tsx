"use client";

import { useAccount, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <div className="absolute w-[660px] h-[371px] top-[680px] left-[280px] bg-[#161616] rounded-[40px] overflow-hidden">
      <div className="absolute w-[529px] h-[26px] top-[49px] left-[56px] [font-family:'Raleway-Medium',_Helvetica] font-medium text-[#00dacc] text-[22px] tracking-[0] leading-[normal]">
        Connected Account
      </div>
      <img
        className="absolute w-[100px] h-[100px] top-[103px] left-[56px]"
        alt="Frame"
        src="../../static/img/metamask-icon 1.svg"
      />
      <img
        className="absolute w-[100px] h-[100px] top-[103px] left-[185px]"
        alt="Frame"
        src="../../static/img/Frame 7.svg"
      />
      <div className="absolute w-[547px] h-[60px] top-[261px] left-[57px] bg-[#505050] rounded-[50px] overflow-hidden">
        <div className="absolute w-[547px] h-[24px] top-[17px] left-0 [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[20px] text-center tracking-[0] leading-[normal]">
          {ensName ?? address}
          {ensName ? ` (${address})` : null}
        </div>
      </div>
    </div>
  );
}
