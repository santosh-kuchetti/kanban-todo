import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Tasks from "../Views/Public/Tasks/Tasks";
import Notifications from "../Views/Public/Notifications/Notifications";
import Analytics from "../Views/Public/Analytics/Analytics";
import Teams from "../Views/Public/Teams/Teams";
import Navigation from "../Components/Navigation/Navigation";
import Settings from "../Views/Public/Settings/Settings";
import { Stack } from "@mui/material";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OpenRoutes />}>
          <Route path="/" element={<Tasks />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/team" element={<Teams />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const OpenRoutes = () => {
  return (
    <Navigation>
      <Outlet />
    </Navigation>
  );
};
