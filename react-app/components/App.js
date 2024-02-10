import React from "react";
import VegetablesListContainer from "./VegetablesListContainer";
import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import router from "./router";

const theme = createTheme();

const App = () => {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
};

export default App;
