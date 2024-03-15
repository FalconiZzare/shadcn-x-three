import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { waveform } from "ldrs";
import ClickAwayListener from "react-click-away-listener";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { nameSearch } from "@/api/superhero.js";

waveform.register();

const NameSearch = ({ token }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["nameSearch"],
    queryFn: () => {
      if (!token) {
        toast("Please set your token first!", {
          icon: <AlertTriangle className={"size-5 text-red-500"} />
        });

        return;
      }

      if (!name) {
        toast("Please enter a name!", {
          icon: <AlertTriangle className={"size-5 text-red-500"} />
        });

        return;
      }

      setOpen(true);

      return nameSearch(token, name) | {};
    },
    enabled: false
  });

  console.log(data);

  return (
    <Card className={"w-full min-h-full"}>
      <CardHeader className={"items-center"}>
        <CardTitle>Search By Name</CardTitle>
        <CardDescription>
          This API call helps you in finding the character-id of a character by searching their
          name.
          <div className={"relative min-h-full flex flex-col w-full gap-4 pt-4"}>
            <div className={"flex flex-row w-full gap-4"}>
              <Input
                id={"item"}
                type={"text"}
                placeholder={"e.g. ironman"}
                onChange={(e) => setName(e.target.value)}
                value={name}
                onClick={() => (data && name !== "") && setOpen(true)}
              />
              {isLoading ? (
                <Button variant={"outline"} className={"min-w-[80px]"}>
                  <l-waveform size={"28"} stroke={"2"} speed={"1"} color={"hsl(var(--foreground))"} />
                </Button>
              ) : (
                <Button variant={"outline"} onClick={refetch} className={"min-w-[80px]"}>
                  Search
                </Button>
              )}
            </div>
            {open && name !== "" && (
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Card
                  className={
                    "absolute h-[300px] z-10 top-16 flex w-full flex-col items-center justify-start gap-4 px-1 py-4"
                  }
                >
                  {(!data || data?.error && data?.response === "error") ? (
                    <div className={"my-auto capitalize"}>character with given name not found!</div>
                  ) : (
                    <ScrollArea className={"h-full px-5"}>Hello</ScrollArea>
                  )}
                </Card>
              </ClickAwayListener>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  );
};

NameSearch.propTypes = {
  token: PropTypes.string.isRequired
};

export default NameSearch;
