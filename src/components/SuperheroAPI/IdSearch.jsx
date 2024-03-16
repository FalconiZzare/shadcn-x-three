import { useState } from "react";
import { waveform } from "ldrs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card.jsx";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import CodeBlock from "@/components/SuperheroAPI/CodeBlock.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { getAvatarFallback } from "@/lib/utils.js";

waveform.register();

const IdSearch = ({ token, value, endpoint, title, description }) => {
  const [id, setId] = useState("");
  const [codeString, setCodeString] = useState("");

  const { data, mutate, isPending } = useMutation({
    mutationKey: [`${value}`],
    mutationFn: () => {
      return endpoint(token, id);
    },
    onError: (error) => {
      console.log(error);
      toast("Server Error", {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    },
    onSuccess: (data) => {
      if (data?.data.error && data?.data.response === "error") {
        toast("Error! Invalid ID!", {
          icon: <AlertTriangle className={"size-5 text-red-500"} />
        });

        return;
      }

      const JSONCopy = JSON.parse(JSON.stringify(data?.data));

      if (Object.prototype.hasOwnProperty.call(JSONCopy, "response")) {
        delete JSONCopy["response"];
      }

      setCodeString(JSON.stringify(JSONCopy, null, 2));
    }
  });

  const handleSearch = () => {
    if (!token) {
      toast("Please set your token first!", {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });

      return;
    }

    if (!id) {
      toast("Please enter a ID!", {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });

      return;
    }

    mutate();
  };

  return (
    <Card className={"w-11/12 md:w-full"}>
      <CardHeader className={"items-center"}>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={"text-center"}>{description}</CardDescription>
        <div className={"flex w-full flex-col gap-4 md:w-6/12 md:flex-row"}>
          <Input
            id={"item"}
            type={"text"}
            placeholder={"e.g. 644"}
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
          {isPending ? (
            <Button variant={"outline"} className={"min-w-[80px]"}>
              <l-waveform size={"28"} stroke={"2"} speed={"1"} color={"hsl(var(--foreground))"} />
            </Button>
          ) : (
            <Button variant={"outline"} onClick={handleSearch} className={"min-w-[80px]"}>
              Search
            </Button>
          )}
        </div>
      </CardHeader>
      {data?.data.response === "success" && codeString && (
        <CardContent
          className={value === "image" && "flex flex-col items-center justify-center gap-4"}
        >
          {value === "image" && (
            <Avatar className={"!size-32"}>
              <AvatarImage src={data?.data.url} alt={data?.data.name} />
              <AvatarFallback>{getAvatarFallback(data?.data.name)}</AvatarFallback>
            </Avatar>
          )}
          <CodeBlock codeString={codeString} />
        </CardContent>
      )}
    </Card>
  );
};

IdSearch.propTypes = {
  token: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  endpoint: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default IdSearch;
