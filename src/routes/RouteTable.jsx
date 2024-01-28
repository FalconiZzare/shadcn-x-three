import { Route, Routes } from "react-router-dom";

import WeatherApp from "@/components/WeatherApp/WeatherApp.jsx";
import Error from "@/pages/Error.jsx";
import Home from "@/components/Home/Home.jsx";
import Pricing from "@/components/Pricing/Pricing.jsx";
import Packages from "@/components/InternetPricing/Packages.jsx";
import InteractiveParticle from "@/components/InteractiveParticle/InteractiveParticle.jsx";
import Game from "@/components/GraphQL/Game.jsx";
import Games from "@/components/GraphQL/Games.jsx";
import InstantSearch from "@/components/Nutritionix/InstantSearch.jsx";
import Authentication from "@/components/Authentication/Authentication.jsx";

const RouteTable = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/weather-app"} element={<WeatherApp />} />
        <Route path={"/subscription"} element={<Pricing />} />
        <Route path={"/packages"} element={<Packages />} />
        <Route path={"/interactive-particle"} element={<InteractiveParticle />} />
        <Route path={"/nutritionix"} element={<InstantSearch />} />
        <Route path={"/games"} element={<Games />} />
        <Route path={"/game/:id"} element={<Game />} />
        <Route path={"/login"} element={<Authentication />} />
        <Route path={"*"} element={<Error />} />
      </Routes>
    </>
  );
};

export default RouteTable;
