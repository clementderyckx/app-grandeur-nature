import './App.css';
import "@fontsource/aileron";
import SatisfasctionForm from '../../components/SatisfasctionForm/SatisfasctionForm';
import NotFound from '../../components/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
function App() {
    return (
        <div className="App">
            <Routes>
                {/* <Route path='/' element={<QrcodeReader/>}/> */}
                <Route path='/:id' element={<SatisfasctionForm />}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App;
