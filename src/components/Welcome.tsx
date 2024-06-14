export default function Welcome() {
  return (
    <>
      <div className="absolute w-[1362px] h-[42px] top-[54px] left-[280px]">
        <img
          className="absolute w-[197px] h-[42px] top-0 left-0"
          alt="Metis ligt"
          src="../../static/img/metis-light-background.svg"
        />
      </div>
      <div className="absolute w-[1360px] h-[300px] top-[151px] left-[280px] rounded-[40px] overflow-hidden bg-[url(../../static/img/soft-with-iridescent-color-contemporary-abstract-background-1.png)] bg-cover bg-[50%_50%]">
        <div className="relative h-[480px] bg-[url(../../static/img/image-2023-08-28-11-57-41-1.png)] bg-cover bg-[50%_50%]">
          <div className="absolute top-[50px] left-[101px] [font-family:'Raleway-Bold',_Helvetica] font-bold text-white text-[70px] tracking-[0] leading-[100px]">
            Metis
            <br />
            Redemption
          </div>
        </div>
      </div>
      <div className="absolute w-[1360px] h-[270px] top-[480px] left-[280px] bg-[#8755cd4c] rounded-[40px] overflow-hidden">
        <div className="absolute w-[820px] h-[153px] top-[20px] left-[336px]">
          <p className="absolute w-[820px] h-[86px] top-[50px] left-0 [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[34px]">
            <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[34px]">
              Please make sure you are visiting{" "}
            </span>
            <span className="[font-family:'Inter-Bold',Helvetica] font-bold">
              https://lp-redemption.metis.io
            </span>
            <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[34px]">
              {" "}
              <br />
              Check the URL carefully.{' '} <br/>
            </span>
            {/* <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-red-400 text-[24px] tracking-[0] leading-[34px]">
            Read the {' '}
            </span> */}
            <span className="[font-family:'Inter-Bold',Helvetica] text-red-400 font-bold">
            Read the TUTORIAL carefully before proceeding!
            </span>
            {/* <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-red-400 text-[24px] tracking-[0] leading-[34px]">
            {' '}carefully before proceeding
            </span> */}
          </p>
          <div className="absolute w-[728px] h-[86px] top-0 left-0 [font-family:'Inter-Bold',Helvetica] font-bold text-red-400 text-[44px] tracking-[0] leading-[28px]">
            PHISHING WARNING:
          </div>
        </div>
        <div className="absolute w-[235px] h-[60px] top-[188px] left-[336px] text-red-400 bg-white rounded-[50px]">
          <button onClick={() => window.open("https://metisdao.medium.com/step-by-step-instructions-on-how-to-redeem-your-metis-assets-lost-from-polynetwork-hack-ee57fac03502", "_blank")} className="absolute w-[239px] h-[60px] -top-px -left-px [font-family:'Raleway-Medium',Helvetica] font-medium text-black text-[20px] text-center tracking-[0.20px] leading-[normal]">
            Tutorial Here
          </button>
        </div>
        <img
          className="absolute w-[221px] h-[210px] top-[35px] left-[78px]"
          alt="Group"
          src="../../static/img/group-13.svg"
        />
      </div>
    </>
  );
}
