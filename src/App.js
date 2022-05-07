import { Routes, Route } from 'react-router-dom/';
import Movies from "./pages/Movies";
import Theaters from "./pages/Theaters";
import About from "./pages/About";
import MainNavigation from "./components/layout/MainNavigation";
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div className="App">
        <MainNavigation />
        <Outlet/>
    </div>
  );
}

export default App;
