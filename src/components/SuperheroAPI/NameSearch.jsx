import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { waveform } from "ldrs";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { AlertTriangle, ClipboardCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { nameSearch } from "@/api/superhero.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { getAvatarFallback } from "@/lib/utils.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip.jsx";
import CodeBlock from "@/components/SuperheroAPI/CodeBlock.jsx";

waveform.register();

const NameSearch = ({ token }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(true);
  const [codeString, setCodeString] = useState("");

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["nameSearch"],
    mutationFn: () => {
      return nameSearch(token, name);
    },
    onError: (error) => {
      console.log(error);
      toast("Server Error", {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    },
    onSuccess: () => {
      setOpen(true);
    }
  });

  const handleSearch = () => {
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

    mutate();
  };

  const handleCopy = async (e, text) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);

      toast("Copied to clipboard!", {
        icon: <ClipboardCheck className={"size-5 text-green-500"} />
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card className={"w-11/12 md:w-full"}>
      <CardHeader className={"items-center"}>
        <CardTitle>Search By Name</CardTitle>
        <CardDescription className={"text-center"}>
          This API call helps you in finding the character-id of a character by searching their
          name. You can get the superhero ID from here and use the id on other tabs.
        </CardDescription>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className={"relative flex w-full flex-col gap-4 pt-4 md:w-6/12"}>
            <div className={"flex w-full flex-col gap-4 md:flex-row"}>
              <Input
                id={"item"}
                type={"text"}
                placeholder={"e.g. ironman"}
                onChange={(e) => setName(e.target.value)}
                value={name}
                onClick={() => name !== "" && setOpen(true)}
              />
              {isPending ? (
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
            </div>
            {open && name !== "" && (
              <Card
                className={
                  "absolute bottom-28 z-10 flex h-[304px] w-full flex-col items-center justify-center gap-4 px-1 py-4 md:top-16 md:h-[350px]"
                }
              >
                {isPending ? (
                  <l-waveform
                    size={"28"}
                    stroke={"2"}
                    speed={"1"}
                    color={"hsl(var(--foreground))"}
                  />
                ) : !data || (data?.data.error && data?.data.response === "error") ? (
                  <div className={"my-auto capitalize"}>character with given name not found!</div>
                ) : (
                  <>
                    <p className={"hidden text-center md:block"}>
                      Click on any of the cards below to see detailed JSON.
                    </p>
                    <ScrollArea className={"h-full w-full px-1 md:px-5"}>
                      {data &&
                        data.data.results?.map((item, index) => (
                          <Button
                            key={index}
                            className={"mb-3 w-full justify-start gap-2 px-1 py-7 md:gap-8 lg:px-6"}
                            variant={"outline"}
                            onClick={() => {
                              setCodeString(JSON.stringify(item, null, 2));
                              setOpen(false);
                            }}
                          >
                            <Avatar>
                              <AvatarImage src={item.image?.url} alt={item.name} />
                              <AvatarFallback>{getAvatarFallback(item.name)}</AvatarFallback>
                            </Avatar>
                            <p className={"ml-auto text-lg"}>{item.name}</p>
                            <TooltipProvider delayDuration={300}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={
                                      "ml-auto w-16 rounded-md border bg-background py-1 text-lg"
                                    }
                                    onClick={(e) => handleCopy(e, item.id)}
                                  >
                                    {item.id}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side={"top"}>
                                  <p>Click to copy!</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Button>
                        ))}
                    </ScrollArea>
                  </>
                )}
              </Card>
            )}
          </div>
        </ClickAwayListener>
      </CardHeader>
      {codeString && (
        <CardContent>
          <CodeBlock codeString={codeString} />
        </CardContent>
      )}
    </Card>
  );
};

NameSearch.propTypes = {
  token: PropTypes.string.isRequired
};

export default NameSearch;
