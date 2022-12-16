import React from "react";
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Story from './Story'


const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
            <Route exact path="/login"  element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/story" element={<Story/>}/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}



export default App