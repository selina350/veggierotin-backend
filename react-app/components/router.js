import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Outlet,
  NavLink,
} from "react-router-dom";
import VegetablesListContainer from "./VegetablesListContainer";
import HistoryContainer from "./HistoryContainer";
import { Box } from "@mui/material";

const HeaderLayout = () => (
  <>
    <header>
      <NavLink to="/">Home </NavLink>
      <NavLink to="/history">Hisotry </NavLink>
    </header>
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Outlet />
    </Box>
    {/* <footer>
      <FooterContent />
    </footer> */}
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HeaderLayout />}>
      <Route index element={<VegetablesListContainer />} />
      <Route path="/history" element={<HistoryContainer />} />
    </Route>
  )
);

export default router;
