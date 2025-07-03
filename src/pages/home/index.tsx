import TopBar from "@/components/home/topbar";
import cskLogo from "@/assets/home/csklogo.png";
import OrderCreationBox from "@/components/home/orderCrationBox";

function Home() {
  return (
    <div>
      <TopBar
        title="Chennai Super Kings"
        volume="$65.2M Vol."
        percentChange={0.84}
        logoUrl={cskLogo}
        price="34¢"
      />
      <div className="mt-[23px] flex items-start gap-x-[16px]">
        <OrderCreationBox />
        <div className="min-w-[134px]"></div>
      </div>
    </div>
  );
}

export default Home;
