import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createLightTheme, createDarkTheme } from "./utils/Theme";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? createDarkTheme() : createLightTheme()}>
      <CssBaseline />
      <Router>
        <Header handleThemeChange={handleThemeChange} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drug/:applicationNumber" element={<Details />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
