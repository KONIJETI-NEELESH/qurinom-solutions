import './style.css';
import Login from './Login';
import Create from './Create';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Create/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}