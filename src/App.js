import { Route } from 'react-router-dom/';
import Movies from "./pages/Movies";
import Theaters from "./pages/Theaters";
import About from "./pages/About";
import MainNavigation from "./components/layout/MainNavigation";
import {Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <MainNavigation/>
        <Routes>
            <Route path='/' element={<Movies/>}/>
            <Route path='/theaters' element={<Theaters/>}/>
            <Route path='/about' element={<About/>}/>
        </Routes>
    </div>
  );
}

export default App;
