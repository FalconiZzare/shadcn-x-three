import StarsCanvas from "@/components/Canvas/Stars.jsx";
import { PriceData } from "@/constants/PriceConstants.js";
import PriceCard from "@/components/Pricing/PriceCard.jsx";

const Pricing = () => {
  return (
    <div
      className={"flex h-auto flex-col items-center justify-center gap-8 pt-8 sm:h-full lg:gap-14"}
    >
      <p className={"text-[34px] font-bold sm:text-[44px]"}>Welcome! &#128151;</p>
      <div className={"flex flex-col flex-wrap items-center justify-center gap-6 sm:flex-row"}>
        {PriceData &&
          PriceData.map((plan, index) => (
            <PriceCard
              key={index}
              title={plan.planName}
              price={plan.planPrice}
              contents={plan.planContent}
              footer={plan.planButtonName}
            />
          ))}
      </div>
      <StarsCanvas />
    </div>
  );
};

export default Pricing;
