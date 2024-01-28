import { useState } from "react";
import { cn } from "@/lib/utils.js";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { Icons } from "@/Icons/Icons.jsx";

const UserAuthForm = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const RoundedButton = ({ disabled, children }) => {
    return (
      <Button
        variant="outline"
        type="button"
        disabled={disabled}
        className={"h-9 w-9 rounded-[100%] p-2"}
      >
        {children}
      </Button>
    );
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input id="password" placeholder="Password" type="password" disabled={isLoading} />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className={"flex items-center justify-evenly"}>
        <RoundedButton disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className={"h-5 w-5 fill-red-500"} />
          )}
        </RoundedButton>
        <RoundedButton disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.apple className={"h-5 w-5 fill-foreground"} />
          )}
        </RoundedButton>
        <RoundedButton disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.x className={"h-5 w-5 fill-foreground"} />
          )}
        </RoundedButton>
        <RoundedButton disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.facebook className={"h-5 w-5 fill-blue-500"} />
          )}
        </RoundedButton>
        <RoundedButton disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.instagram className={"h-5 w-5"} />
          )}
        </RoundedButton>
        <RoundedButton disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.github className={"h-5 w-5 fill-foreground"} />
          )}
        </RoundedButton>
      </div>
    </div>
  );
};

export default UserAuthForm;
