import { ThemeProvider } from "@mui/material";
import "./App.css";
import { AppRoutes } from "./Routes/Routes";
import theme from "./assets/Theme/theme";
import { AppContext } from "./context";
import { useState } from "react";

function App() {
  const [taskCount, setTaskCount] = useState<number>();
  const dispatchCountEvent = (actionType:string, payload:number) => {
    switch (actionType) {
      case "UPDATE_TASKCOUNT":
        setTaskCount(payload);
        return;
      default:
        return;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ taskCount, dispatchCountEvent }}>
        <AppRoutes />
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
