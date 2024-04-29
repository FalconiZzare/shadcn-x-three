import { useState } from "react";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.jsx";
import {
  Binary,
  Book,
  BriefcaseBusiness,
  Cable,
  Image,
  Info,
  Text,
  UserSearch,
  Zap
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NameSearch from "@/components/SuperheroAPI/NameSearch.jsx";
import IdSearch from "@/components/SuperheroAPI/IdSearch.jsx";
import { SuperheroTabs } from "@/constants/SuperheroConstants.js";

const SuperHero = () => {
  const [token, setToken] = useState("");

  return (
    <div className={"mt-4 flex h-full w-full flex-col items-center justify-start gap-12 self-start"}>
      <div className={"flex flex-col gap-2"}>
        <Label htmlFor={"token"} className={"ml-1 flex items-center gap-2 text-[18px]"}>
          Your SuperHero API Access Token
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className={"cursor-help"} />
              </TooltipTrigger>
              <TooltipContent side={"right"}>
                <p>
                  We do not store your token.
                  <br />
                  It stays on the DOM and is cleared once
                  <br /> you hit <b>Clear</b> or refresh the page.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <div className={"flex flex-col items-center justify-center gap-4 md:flex-row"}>
          <Input
            id={"token"}
            type={"text"}
            placeholder={"Enter your token"}
            onChange={(e) => setToken(e.target.value)}
            value={token}
            className={"w-[340px]"}
          />
          <div className={"flex flex-row items-center justify-center gap-4"}>
            <Button
              variant={"destructive"}
              disabled={!token}
              onClick={() => setToken("")}
              className={"w-24"}
            >
              Clear
            </Button>
            <Button variant={"ghost"}>
              <a
                href={"https://superheroapi.com/#intro"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                Get Token
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue={"name"}
        className={"flex w-[360px] flex-col items-center gap-3 md:w-[750px] xl:w-[1200px]"}
      >
        <ScrollArea className={"w-full rounded-md bg-accent px-2"}>
          <TabsList className={"flex px-2 py-6 lg:gap-2"}>
            <TabsTrigger value={"name"}>
              <Text size={18} className={"mr-2"} />
              search/name
            </TabsTrigger>
            <TabsTrigger value={"id"}>
              <Binary size={18} className={"mr-2"} />
              search/id
            </TabsTrigger>
            <TabsTrigger value={"image"}>
              <Image size={18} className={"mr-2"} />
              id/image
            </TabsTrigger>
            <TabsTrigger value={"powerstats"}>
              <Zap size={18} className={"mr-2"} />
              id/powerstats
            </TabsTrigger>
            <TabsTrigger value={"biography"}>
              <Book size={18} className={"mr-2"} />
              id/biography
            </TabsTrigger>
            <TabsTrigger value={"appearance"}>
              <UserSearch size={18} className={"mr-2"} />
              id/appearance
            </TabsTrigger>
            <TabsTrigger value={"work"}>
              <BriefcaseBusiness size={18} className={"mr-2"} />
              id/work
            </TabsTrigger>
            <TabsTrigger value={"connections"}>
              <Cable size={18} className={"mr-2"} />
              id/connections
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation={"horizontal"} />
        </ScrollArea>
        <TabsContent value={"name"} className={"w-full"}>
          <NameSearch token={token} />
        </TabsContent>
        {SuperheroTabs.map((item, index) => (
          <TabsContent value={item.value} className={"w-full"} key={index}>
            <IdSearch
              endpoint={item.endpoint}
              description={item.description}
              title={item.title}
              value={item.value}
              token={token}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SuperHero;
