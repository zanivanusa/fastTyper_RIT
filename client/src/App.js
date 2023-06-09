import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Index from "./components/Index";
import Login from "./components/Login";
import Register from "./components/Register";
import Stats from "./components/Stats";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header title="FastTyper"></Header>
          <Routes>
            <Route path='/' exact element={<Index/>}></Route>
            <Route path='/login' exact element={<Login/>}></Route>
            <Route path='/register' exact element={<Register/>}></Route>
            <Route path='/stats' exact element={<Stats/>}></Route>
            <Route path='/leaderboard' exact element={<Leaderboard/>}></Route>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;