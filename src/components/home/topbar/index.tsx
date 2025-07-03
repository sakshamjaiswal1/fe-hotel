import ChartIcon from "@/assets/home/chart.svg?react";

function TopBar({
  logoUrl,
  title,
  volume,
  percentChange,
  price,
}: {
  title: string;
  volume: string;
  logoUrl: string;
  price: string;
  percentChange: number;
}) {
  return (
    <section className="pl-[17px] pr-[24px] flex items-center justify-between pt-[21px]">
      <div className="flex items-center gap-x-[8px]">
        <img src={logoUrl} alt="logo" className="h-12 w-12" />
        <div>
          <h3 className=" text-[#000000] text-[18px] font-[600] leading-[24px] tracking-[0.18px]">
            {title}
          </h3>
          <p className=" text-[#8F8F8F] text-[12px] font-[500] leading-[16px] tracking-[0.12px]">
            {volume}
          </p>
        </div>
      </div>
      <div className="flex items-end gap-x-[2px]">
        <div>
          <p className="text-align-right text-[18px] font-[600] leading-[24px] tracking-[0.18px] text-[#000000]">
            {price}
          </p>
          <p className="text-[#06A900] text-[12px] font-[500] leading-[16px] tracking-[0.12px]">
            {percentChange}
          </p>
        </div>
        <ChartIcon className="h-9 w-9" />
      </div>
    </section>
  );
}

export default TopBar;
