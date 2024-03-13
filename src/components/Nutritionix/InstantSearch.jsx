import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Dumbbell, PlusCircle, Utensils } from "lucide-react";
import ClickAwayListener from "react-click-away-listener";
import "ldrs/waveform";
import { waveform } from "ldrs";

waveform.register();

import FoodTable from "@/components/Nutritionix/FoodTable.jsx";
import { itemSearch, instantSearch, naturalExercise, naturalNutrients } from "@/api/nutritionix.js";

const InstantSearch = () => {
  const [search, setSearch] = useState("");
  const [naturalQuery, setNaturalQuery] = useState("");
  const [data, setData] = useState({});
  const [foods, setFoods] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [loading, setLoading] = useState(false);
  const [naturalLoading, setNaturalLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [resultType, setResultType] = useState("branded");
  const [searchMechanism, setSearchMechanism] = useState("instant");
  const [naturalSwitch, setNaturalSwitch] = useState("nutrients");

  const handleSearch = async () => {
    if (search === "") return;

    if (searchMechanism !== "instant") {
      setSearchMechanism("instant");
      setFoods([]);
    }

    setLoading(true);

    try {
      const res = await instantSearch(search);
      setData(res.data);
      setLoading(false);
      setOpen(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleNaturalQuery = async () => {
    if (naturalQuery === "") return;

    if (searchMechanism !== "natural") setSearchMechanism("natural");

    setNaturalLoading(true);

    setFoods([]);
    setExercise([]);

    const formData = new FormData();

    formData.append("query", naturalQuery);

    try {
      if (naturalSwitch === "nutrients") {
        const res = await naturalNutrients(formData);
        setFoods([...res.data.foods]);
      } else {
        const res = await naturalExercise(formData);
        setExercise([...res.data.exercises]);
      }
      setNaturalLoading(false);
    } catch (err) {
      console.log(err);
      setNaturalLoading(false);
    }
  };

  useEffect(() => {
    if (search === "") {
      setData({});
      setOpen(false);
    }

    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 100);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleItemAdd = async (id) => {
    try {
      const res = await itemSearch(id);
      setFoods(searchMechanism === "instant" ? [...foods, ...res.data.foods] : [...res.data.foods]);
    } catch (err) {
      console.log(err);
    }
  };

  const getAvatarFallback = (name) => {
    const parts = name.split(" ");
    return `${parts[0].charAt(0)}${parts[1] ? parts[1].charAt(0) : ""}`;
  };

  const getBurntCalories = () => {
    let burntCal = 0;

    exercise.forEach((item) => (burntCal += item.nf_calories));

    return burntCal;
  };

  return (
    <div className={"mt-[1rem] flex h-full flex-col items-center justify-start gap-14"}>
      <div className={"flex w-8/12 flex-col items-center justify-center"}>
        <div className={"flex w-full flex-row items-center justify-center gap-10"}>
          <div className={"flex w-full flex-col gap-2"}>
            <Label htmlFor={"item"} className={"text-md ml-1"}>
              Search for single food item.
            </Label>
            <div className={"relative flex w-full flex-row gap-4"}>
              <Input
                id={"item"}
                type={"text"}
                placeholder={"e.g. Hamburger"}
                onChange={(e) => setSearch(e.target.value)}
                onClick={() => search !== "" && setOpen(true)}
              />
              {loading ? (
                <Button variant={"outline"} className={"min-w-[80px]"}>
                  <l-waveform
                    size={"28"}
                    stroke={"2"}
                    speed={"1"}
                    color={"hsl(var(--foreground))"}
                  />
                </Button>
              ) : (
                <Button variant={"outline"} onClick={handleSearch} className={"min-w-[80px]"}>
                  Search
                </Button>
              )}
              {open && search !== "" && Object.keys(data).length > 0 && (
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <Card
                    className={
                      "absolute top-14 z-10 flex h-[550px] w-full flex-col items-center justify-start gap-4 px-1 py-4"
                    }
                  >
                    <div className={"item-start flex w-full flex-row justify-start gap-4 px-4"}>
                      {["branded", "common"].map((item, index) => (
                        <Button
                          key={index}
                          variant={resultType === item ? "default" : "outline"}
                          onClick={() => setResultType(item)}
                          className={"border capitalize"}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                    {data[resultType]?.length === 0 ? (
                      <div className={"my-auto"}>No Result Found!</div>
                    ) : (
                      <ScrollArea className={"h-full px-5"}>
                        {data[resultType]?.map((item, index) => (
                          <Button
                            variant={"outline"}
                            className={"mb-3 w-full justify-start gap-8 p-7"}
                            key={index}
                          >
                            <Avatar>
                              <AvatarImage src={item.photo.thumb} alt={item.food_name} />
                              <AvatarFallback>{getAvatarFallback(item.food_name)}</AvatarFallback>
                            </Avatar>
                            <div className={"text-left"}>
                              <p>{item.food_name}</p>
                              {item.nf_calories && <p>{`Calories ${item.nf_calories}`}</p>}
                            </div>
                            {item.nix_item_id && (
                              <PlusCircle
                                className={"ml-auto"}
                                onClick={() => handleItemAdd(item.nix_item_id)}
                              />
                            )}
                          </Button>
                        ))}
                      </ScrollArea>
                    )}
                  </Card>
                </ClickAwayListener>
              )}
            </div>
          </div>
          <div className={"flex w-full flex-col gap-2"}>
            <Label htmlFor={"item"} className={"text-md ml-1"}>
              {naturalSwitch === "nutrients"
                ? "Search for multiple food items with quantity."
                : "Enter exercise and personal details."}
            </Label>
            <div className={"flex w-full flex-row gap-4"}>
              <Input
                type={"text"}
                placeholder={
                  naturalSwitch === "nutrients"
                    ? "e.g. 1 hamburger 2 coke"
                    : "e.g. age 24 male ran 1 hour"
                }
                onChange={(e) => setNaturalQuery(e.target.value)}
              />
              {naturalLoading ? (
                <Button variant={"outline"} className={"min-w-[80px]"}>
                  <l-waveform
                    size={"28"}
                    stroke={"2"}
                    speed={"1"}
                    color={"hsl(var(--foreground))"}
                  />
                </Button>
              ) : (
                <div className={"flex items-center justify-center gap-4"}>
                  <Button
                    variant={"outline"}
                    onClick={handleNaturalQuery}
                    className={"min-w-[80px]"}
                  >
                    Calculate
                  </Button>
                  {naturalSwitch === "nutrients" ? (
                    <Dumbbell
                      className={"cursor-pointer"}
                      onClick={() => setNaturalSwitch("exercise")}
                    />
                  ) : (
                    <Utensils
                      className={"cursor-pointer"}
                      onClick={() => setNaturalSwitch("nutrients")}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {exercise.length > 0 && (
        <div className={"rounded-lg border p-4"}>{`You burned ${getBurntCalories()} calories`}</div>
      )}
      <FoodTable foods={foods} avatarFallback={getAvatarFallback} />
    </div>
  );
};

export default InstantSearch;
