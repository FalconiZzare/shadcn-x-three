// import { useState } from "react";
import "@/components/Authentication/Authentication.css";
import { Button } from "@/components/ui/button.jsx";
import ShortDescription from "@/components/Authentication/ShortDescription.jsx";
import Login from "@/components/Authentication/Login.jsx";
import Signup from "@/components/Authentication/Signup.jsx";

const Authentication = () => {
  const moveSliderRight = () => {
    document.getElementById("overlay").classList.remove("overlay-moveHalfLeft");
    document.getElementById("overlayInner").classList.remove("overlayInner-moveHalfRight");
    document.getElementById("signUpForm").classList.remove("shiftLeft");

    document.getElementById("overlay").classList.add("overlay-moveHalfRight");
    document.getElementById("overlayInner").classList.add("overlayInner-moveHalfLeft");
    document.getElementById("signInForm").classList.add("shiftRight");
  };
  const moveSliderLeft = () => {
    document.getElementById("overlay").classList.remove("overlay-moveHalfRight");
    document.getElementById("overlayInner").classList.remove("overlayInner-moveHalfLeft");
    document.getElementById("signInForm").classList.remove("shiftRight");

    document.getElementById("overlay").classList.add("overlay-moveHalfLeft");
    document.getElementById("overlayInner").classList.add("overlayInner-moveHalfRight");
    document.getElementById("signUpForm").classList.add("shiftLeft");
  };

  return (
    <div className={"flex h-full w-full items-center justify-center"}>
      <div className={"container h-[750px] transform rounded-md border p-0 shadow-md"}>
        <div
          id="overlay"
          className={"relative left-0 h-full w-1/2 overflow-hidden rounded-md bg-zinc-900"}
        >
          <div
            id="overlayInner"
            className={"absolute flex h-full w-[200%] items-center justify-center"}
          >
            <div
              id="signUp"
              className={
                "flex h-full w-1/2 translate-x-0 transform flex-col items-center justify-center px-8 duration-1000"
              }
            >
              <ShortDescription />
              <div className={"mb-16 flex items-center justify-center gap-6"}>
                <p>Don&apos;t have an account?</p>
                <Button
                  onClick={moveSliderRight}
                  variant={"outline"}
                  className={"w-[100px] bg-zinc-900 hover:bg-background"}
                >
                  Sign Up
                </Button>
              </div>
            </div>
            <div
              id="signIn"
              className={
                "flex h-full w-1/2 translate-x-20 transform flex-col items-center justify-center px-8 duration-1000"
              }
            >
              <ShortDescription />
              <div className={"mb-16 flex items-center justify-center gap-6"}>
                <p>Already have an account?</p>
                <Button
                  onClick={moveSliderLeft}
                  variant={"outline"}
                  className={"w-[100px] bg-zinc-900 hover:bg-background"}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={"absolute left-0 top-0 -z-50 flex h-full w-full overflow-hidden"}>
          <div id="signUpForm" className="shiftRight flex-1 overflow-hidden">
            <div className="holder flex h-full translate-x-0 transform items-center justify-center text-center duration-1000">
              <Signup />
            </div>
          </div>
          <div id="signInForm" className={"flex-1 overflow-hidden"}>
            <div className="holder flex h-full translate-x-0 transform items-center justify-center text-center duration-1000">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
