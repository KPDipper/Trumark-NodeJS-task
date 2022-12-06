import "./App.css";

import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Products from "./componenets/Products";
import ProductUpdate from "./componenets/ProductUpdate";

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path='/update/:id' element={<ProductUpdate/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
