import './App.css';
import "@fontsource/aileron";
import React from 'react';
import SatisfactionForm from '../../components/SatisfactionForm/SatisfactionForm';
import Subscribe from '../Subscribe/Subscribe';
import NotFound from '../../components/NotFound/NotFound';
import QrcodeReader from '../../components/QrcodeReader/QrcodeReader.js';
import CheckContact from '../../components/CheckContact/CheckContact';
import { Routes, Route } from 'react-router-dom';
function App() {
    return (
        <div className="App">
            <Routes>
                {/* <Route path="/" element={<Subscribe />} /> */}
                <Route path='/' element={<SatisfactionForm />}/>
                <Route path='/questionnaire-satisfaction' element={<SatisfactionForm />}/>
                <Route path='/questionnaire-satisfaction/:id' element={<SatisfactionForm />}/>
                <Route path='/qrcode-scanner' element={<QrcodeReader/>}/>
                <Route path='/qrcode-scanner/check-contact/:id' element={<CheckContact/>}/>
                {/* <Route path='/admin' element={<AdminInterface />}/> */}
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App;
