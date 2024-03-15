import { useState } from "react";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import NameSearch from "@/components/SuperheroAPI/NameSearch.jsx";

const SuperHero = () => {
  const [token, setToken] = useState("");

  return (
    <div className={"flex h-full w-full flex-col items-center justify-start mt-4 gap-12"}>
      <div className={"flex flex-col gap-2"}>
        <Label htmlFor={"token"} className={"text-[18px] ml-1 flex items-center gap-2"}>
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
        <div className={"flex gap-4"}>
          <Input
            id={"token"}
            type={"text"}
            placeholder={"Enter your token"}
            onChange={(e) => setToken(e.target.value)}
            value={token}
            className={"w-[340px]"}
          />
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
      <div>
        <Tabs defaultValue={"name"} className={"w-[1200px] flex flex-col items-center gap-3"}>
          <TabsList className={"px-2 py-6"}>
            <TabsTrigger value={"name"}>
              <Text size={18} className={"mr-2"}/>
              search/name
            </TabsTrigger>
            <TabsTrigger value={"id"}>
              <Binary size={18} className={"mr-2"}/>
              search/id
            </TabsTrigger>
            <TabsTrigger value={"powerstats"}>
              <Zap size={18} className={"mr-2"}/>
              id/powerstats
            </TabsTrigger>
            <TabsTrigger value={"biography"}>
              <Book size={18} className={"mr-2"}/>
              id/biography
            </TabsTrigger>
            <TabsTrigger value={"appearance"}>
              <UserSearch size={18} className={"mr-2"}/>
              id/appearance
            </TabsTrigger>
            <TabsTrigger value={"work"}>
              <BriefcaseBusiness size={18} className={"mr-2"}/>
              id/work
            </TabsTrigger>
            <TabsTrigger value={"connections"}>
              <Cable size={18} className={"mr-2"}/>
              id/connections
            </TabsTrigger>
            <TabsTrigger value={"image"}>
              <Image size={18} className={"mr-2"}/>
              id/image
            </TabsTrigger>
          </TabsList>
          <TabsContent value={"name"} className={"w-full"}>
            <NameSearch token={token}/>
          </TabsContent>
          <TabsContent value={"id"}>
          Hello
        </TabsContent>
          <TabsContent value={"powerstats"}>
            Hello
          </TabsContent>
          <TabsContent value={"biography"}>
            Hello
          </TabsContent>
          <TabsContent value={"appearance"}>
            Hello
          </TabsContent>
          <TabsContent value={"work"}>
            Hello
          </TabsContent>
          <TabsContent value={"connections"}>
            Hello
          </TabsContent>
          <TabsContent value={"image"}>
            Hello
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperHero;
