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
      <div className="absolute w-[1360px] h-[480px] top-[151px] left-[280px] rounded-[40px] overflow-hidden bg-[url(../../static/img/soft-with-iridescent-color-contemporary-abstract-background-1.png)] bg-cover bg-[50%_50%]">
        <div className="relative h-[480px] bg-[url(../../static/img/image-2023-08-28-11-57-41-1.png)] bg-cover bg-[50%_50%]">
          {/* <div className="absolute w-[240px] h-[60px] top-[92px] left-[101px] rounded-[50px]">
            <div className="w-[437px] h-[60px] top-[-31px] left-px [font-family:'Raleway-Medium',_Helvetica] font-medium text-[36px] tracking-[0.36px] absolute text-white leading-[normal]">
              Welcome
            </div>
          </div> */}
          <div className="absolute top-[50px] left-[101px] [font-family:'Raleway-Bold',_Helvetica] font-bold text-white text-[70px] tracking-[0] leading-[100px]">
            Metis
            <br />
            Redemption
          </div>
          <div className="absolute top-[280px] left-[101px] [font-family:'Raleway-Bold',_Helvetica] font-bold text-red-400 text-[28px] tracking-[0] leading-[100px]">
          PHISHING WARNING: Please make sure you're visiting https://redemption.metis.io <br />- Check the URL carefully. Read the <a className="text-blue-200 overline underline text-bold" href="https://metisdao.medium.com/step-by-step-instructions-on-how-to-redeem-your-metis-assets-lost-from-polynetwork-hack-ee57fac03502">TUTORIAL HERE</a> carefully before proceeding
          </div>
        </div>
      </div>
    </>
  );
}
