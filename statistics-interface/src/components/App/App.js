import './App.css';
import { Routes, Route } from 'react-router-dom';
import SendBadge from '../SendBadge/SendBadge';
import Sidebar from '../Sidebar/Sidebar';
import Inscrits from '../../Pages/Inscrits/Inscrits';
import Presents from '../../Pages/Presents/Presents';
import Reponses from '../../Pages/Reponses/Reponses';
import React from 'react';
function App() {
  return (
      <div className="App">

          {/* <header className="header">
            <div className="header-actions">

              <div className="machin-actions"></div>
              <div className="login-actions">
                <p>Login Actions</p>
              </div>
              
            </div>
          </header> */}
        
        <Sidebar />

        <div className="row app-container">

            <div className="app">
              <Routes>
                <Route path="/" element=""/>
                <Route path="/inscrits" element={<Inscrits />}/>
                <Route path="/presents" element={<Presents />}/>
                <Route path="/reponses" element={<Reponses />}/>
                <Route path="/send" element={<SendBadge/>}/>
              </Routes>
            </div>
        </div>

      
      </div>
  );
}

export default App;
