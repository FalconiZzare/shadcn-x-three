import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils.js";
import PropTypes from "prop-types";
import { Icons } from "@/Icons/Icons.jsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.jsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion.jsx";
import { Button } from "@/components/ui/button.jsx";
import Rotator from "@/layouts/Header/Rotator.jsx";
import { HeaderData } from "@/constants/HeaderConstants.jsx";
import { Separator } from "@/components/ui/separator.jsx";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const Divider = ({ className }) => {
    return <Separator className={cn("self-center bg-primary opacity-20", className)} />;
  };

  Divider.propTypes = {
    className: PropTypes.string
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.viewVertical className={"h-5 w-5"} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className={"z-50 border-r-primary px-0"}>
        <MobileLink
          className={"-mt-3 mb-8 flex items-center pl-6"}
          href={"/"}
          onOpenChange={setOpen}
        >
          <div className={"mr-4"}>
            <Rotator className={"h-[30px] w-[30px]"} />
          </div>
          <span className={"font-bold"}>shadcn x three</span>
        </MobileLink>
        <div className={"no-scrollbar h-[calc(100vh-6rem)] overflow-scroll"}>
          <div className={"flex flex-col gap-4"}>
            {HeaderData.map((item, index) =>
              item.megaMenu ? (
                <React.Fragment key={index}>
                  <Accordion key={index} type="single" collapsible className={"pl-12 pr-4"}>
                    <AccordionItem value="item-1" className={"border-b-0"}>
                      <AccordionTrigger className={"py-0 hover:no-underline"}>
                        {item.title}
                      </AccordionTrigger>
                      {item.megaMenuContent?.map((content, index) => (
                        <AccordionContent key={index}>
                          {content.icon ? (
                            <Link
                              to={content.href}
                              target={content.isExternal ? "_blank" : ""}
                              rel={content.isExternal ? "noreferrer" : ""}
                              onClick={() => setOpen(false)}
                              className={
                                "mt-4 flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 pt-10"
                              }
                            >
                              {content.icon}
                              <div className="mb-2 mt-4 text-sm font-medium">{content.title}</div>
                              <p className="w-full text-xs leading-tight text-muted-foreground">
                                {content.description}
                              </p>
                            </Link>
                          ) : (
                            <ListItem
                              key={index}
                              href={content.href}
                              target={content.isExternal ? "_blank" : ""}
                              rel={content.isExternal ? "noreferrer" : ""}
                              title={content.title}
                              onOpenChange={setOpen}
                            >
                              {content.description}
                            </ListItem>
                          )}
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  </Accordion>
                  {HeaderData.length - 1 !== index && <Divider />}
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  <MobileLink
                    href={item.href}
                    onOpenChange={setOpen}
                    target={item.isExternal ? "_blank" : ""}
                    rel={item.isExternal ? "noreferrer" : ""}
                    className={"pl-12 font-medium"}
                  >
                    {item.title}
                  </MobileLink>
                  {HeaderData.length - 1 !== index && <Divider />}
                </React.Fragment>
              )
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

const MobileLink = ({ href, onOpenChange, className, children, ...props }) => {
  return (
    <Link to={href} className={cn(className)} onClick={() => onOpenChange(false)} {...props}>
      {children}
    </Link>
  );
};

const ListItem = ({ className, title, children, href, onOpenChange, ...props }) => {
  return (
    <MobileLink
      className={cn(
        "block select-none space-y-2 rounded-md p-3 leading-none transition-colors focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
      onOpenChange={onOpenChange}
      href={href}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
    </MobileLink>
  );
};

MobileLink.propTypes = {
  href: PropTypes.string.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};

ListItem.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};
