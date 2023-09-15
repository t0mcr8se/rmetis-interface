"use client";

import { useAccount, useBalance } from "wagmi";

export function Balance() {
  return (
    <>
      <AccountBalance />
    </>
  );
}

export function AccountBalance() {
  const { address } = useAccount();
  const { data, refetch } = useBalance({
    address,
    watch: true,
  });

  return (
    <div className="absolute w-[1366px] h-[326px] top-[1185px] left-[280px] bg-[#303030] rounded-[40px] overflow-hidden">
      <p className="absolute w-[752px] h-[61px] top-[101px] left-[56px] [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[50px] tracking-[0] leading-[normal]">
        <span className="[font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[40px] tracking-[0]">
          {data?.formatted}{" "}
        </span>
        <span className="[font-family:'Inter-Bold',_Helvetica] font-bold text-[40px]">
          METIS
        </span>
      </p>
      <div className="absolute w-[529px] h-[26px] top-[60px] left-[56px] [font-family:'Raleway-Medium',_Helvetica] font-medium text-[#00dacc] text-[22px] tracking-[0] leading-[normal]">
        Metis Balance
      </div>
      <div className="absolute w-[240px] h-[60px] top-[204px] left-[56px] bg-white rounded-[50px]">
        <button
          onClick={() => refetch()}
          className="absolute w-[239px] h-[60px] -top-px left-px [font-family:'Raleway-Medium',_Helvetica] font-medium text-black text-[20px] text-center tracking-[0.20px] leading-[normal]"
        >
          Refetch
        </button>
      </div>
    </div>
  );
}
