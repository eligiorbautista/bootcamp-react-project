// import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './style.css';


function App() {
   
  
  return (
     <BrowserRouter>
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
     </BrowserRouter>
 
  )
}

export default App;

