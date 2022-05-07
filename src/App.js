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
