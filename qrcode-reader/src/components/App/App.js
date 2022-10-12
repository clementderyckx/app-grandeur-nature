import './App.css';
import QrcodeReader from '../QrcodeReader/QrcodeReader';
import CheckContact from '../CheckContact/CheckContact';
import NotFound from '../NotFound/NotFound';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
function App() {

  const scannedUrlState = useState('');  
  let url = "";
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<QrcodeReader/>}/>
        <Route path='/check-contact/:id' element={<CheckContact/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}


export default App;

function updateUrl(response, scannedUrlState, url){
  const [scannedUrl, updateScannedUrl] = scannedUrlState;
  url = response;
  updateScannedUrl(response);
}