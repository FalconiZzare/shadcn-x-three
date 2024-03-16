import { Link } from "react-router-dom";
import { cn } from "@/lib/utils.js";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.jsx";
// import Rotator from "@/layouts/Header/Rotator.jsx";
import MobileNav from "@/layouts/Header/MobileNav.jsx";
import ButtonGroup from "@/layouts/Header/ButtonGroup.jsx";
import { HeaderData } from "@/constants/HeaderConstants.jsx";
import Lotus from "@/assets/lotus.webp";

const Header = () => {
  return (
    <header
      className={
        "fixed top-0 z-50 flex h-14 w-full flex-col items-center justify-center border-b border-ring backdrop-blur-xl"
      }
    >
      <div className={"relative flex w-11/12 items-center justify-between xl:w-10/12 2xl:w-9/12"}>
        <MobileNav />
        <Link className={"flex cursor-pointer items-center justify-start"} to={"/"}>
          <div className={"mr-1 select-none"}>
            {/*<Rotator className={"h-[30px] w-[30px]"} />*/}
            <img src={Lotus} alt={"Lotus"} className={"pointer-events-none w-[70px]"} />
          </div>
          <div className={"text-lg font-bold lg:text-xl"}>shadcn x three</div>
        </Link>
        <NavigationMenu className={"hidden xl:flex"}>
          <NavigationMenuList>
            {HeaderData.map((item, index) =>
              item.megaMenu ? (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger className={"bg-transparent"}>
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="grid min-h-[324px] gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {item.megaMenuContent?.map((content, index) =>
                      content.icon ? (
                        <NavigationMenuLink asChild key={index} className={"row-span-3"}>
                          <Link
                            className={
                              "flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6"
                            }
                            to={content.href}
                            target={content.isExternal ? "_blank" : ""}
                            rel={content.isExternal ? "noreferrer" : ""}
                          >
                            {content.icon}
                            <div className="mb-2 mt-4 text-lg font-medium">{content.title}</div>
                            <p className={"w-full text-sm leading-tight text-muted-foreground"}>
                              {content.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ) : (
                        <NavigationMenuLink asChild key={index}>
                          <Link
                            to={content.href}
                            target={content.isExternal ? "_blank" : ""}
                            rel={content.isExternal ? "noreferrer" : ""}
                            className={
                              "block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            }
                          >
                            <div className="text-sm font-medium leading-none">{content.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {content.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      )
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuLink
                  asChild
                  key={index}
                  className={cn("cursor-pointer", navigationMenuTriggerStyle())}
                >
                  <Link
                    to={item.href}
                    target={item.isExternal ? "_blank" : ""}
                    rel={item.isExternal ? "noreferrer" : ""}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className={"flex flex-row items-center justify-center gap-1 sm:gap-3"}>
          <ButtonGroup />
        </div>
      </div>
    </header>
  );
};
export default Header;
