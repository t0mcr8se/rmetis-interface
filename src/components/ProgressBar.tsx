export function ProgressBar({ percent }: { percent: number }) {
  percent = 100;
  return (
    <>
      {percent <= 10 ? (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[52px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      ) : percent <= 20 ? (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[104px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      ) : percent <= 30 ? (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[156px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      ) : percent <= 40 ? (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[208px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      ) : percent <= 50 ? (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[260px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      ) : percent <= 60 ? (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[312px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      ) : percent <= 70 ? (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[364px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      ) : percent <= 80 ? (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[416px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      ) : percent <= 90 ? (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[468px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      ) : (
        <div className="absolute w-[540px] h-[100px] top-[179px] left-[60px] bg-black rounded-[20px]">
          <div className="relative w-[520px] h-[80px] top-[10px] left-[10px] rounded-[10px] [background:linear-gradient(180deg,_rgb(0,_218,_204)_0%,_rgb(0,_108.38,_101.42)_100%)]" />
        </div>
      )}
    </>
  );
}
