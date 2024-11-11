import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Screens
import HomeScreen from './Screens/HomeScreen'
import ChampInfoScreen from './Screens/ChampInfoScreen'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<HomeScreen/>}> </Route>
                <Route path = "/ChampInfo/:championName" element = {<ChampInfoScreen/>}> </Route>  
            </Routes>
        </Router>
    );
};

export default App;