import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import VegetablesListContainer from "./VegetablesListContainer";
import HistoryContainer from "./HistoryContainer";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";

const HeaderLayout = () => {
  const pathname = useLocation().pathname;
  return (
    <>
      <Box sx={{ height: "calc(100vh - 56px)" }}>
        <Outlet />
      </Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value={pathname}>
          <BottomNavigationAction
            LinkComponent={Link}
            to="/"
            value="/"
            label="Pick"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            LinkComponent={Link}
            to="/history"
            value="/history"
            label="History"
            icon={<HistoryIcon />}
          />
        </BottomNavigation>
      </Paper>
      {/* <footer>
      <FooterContent />
    </footer> */}
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HeaderLayout />}>
      <Route index element={<VegetablesListContainer />} />
      <Route path="/history" element={<HistoryContainer />} />
    </Route>
  )
);

export default router;
