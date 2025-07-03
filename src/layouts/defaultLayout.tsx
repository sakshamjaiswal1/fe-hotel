
function DefaultLayout({
  MainContentComponent,
}: {
  MainContentComponent: React.FC;
}) {
  return (
    <div className="bg-neutral-greys-950">
      <div
        className={` 
                    ${"min-h-screen"}  
                   
                    bg-neutral-greys-950 max-w-[1114px] mx-auto pb-[85px]`}
      >
        <MainContentComponent />
      </div>
    </div>
  );
}

export default DefaultLayout;
