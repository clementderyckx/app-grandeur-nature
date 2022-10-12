import './App.css';
import "@fontsource/aileron";
import React from 'react';
import SatisfasctionForm from '../../components/SatisfasctionForm/SatisfasctionForm';
import Subscribe from '../Subscribe/Subscribe';
import NotFound from '../../components/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Subscribe />} />
                <Route path='/questionnaire-satisfaction' element={<SatisfasctionForm />}/>
                <Route path='/questionnaire-satisfaction/:id' element={<SatisfasctionForm />}/>
                {/* <Route path='/admin' element={<AdminInterface />}/> */}
                {/* <Route path='/qrcode-scanner' element={<QrcodeReader/>}/> */}
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App;
