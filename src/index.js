import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom/';
import './index.css';
import App from './App';
import Movies from "./pages/Movies";
import Theaters from "./pages/Theaters";
import About from "./pages/About";
import Movie from "./pages/Movie";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                  <Route index element={<Movies/>}/>
                  <Route path="movie/:id/" element={<Movie/>}/>
                  <Route path="theaters" element={<Theaters/>}/>
                  <Route path="about" element={<About/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
);
