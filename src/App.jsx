import React from 'react';
import Home from './Home.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Create from './create.jsx';
import Update from './update.jsx';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Home />}/>
        <Route path='/create' element ={<Create />}/>
        <Route path='/edit/:id' element={<Update />}/>
      </Routes>
    </BrowserRouter>
    
  )
}
export default App;