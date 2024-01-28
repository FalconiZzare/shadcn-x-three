import { Webhook } from "lucide-react";
import Lotus from "@/assets/lotus.webp";

const ShortDescription = () => {
  return (
    <>
      <div
        className={
          "mb-auto mt-8 flex items-center justify-center gap-2 self-start text-lg font-medium"
        }
      >
        <Webhook />
        Up 4 Nutrition
      </div>
      <div className={"mb-auto w-[580px] select-none "}>
        <img src={Lotus} alt={"Lotus"} className={"pointer-events-none w-full"} />
      </div>
    </>
  );
};

export default ShortDescription;
