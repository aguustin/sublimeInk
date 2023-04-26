import './App.css';
import { StickersContextProvider } from './context/stickersContext';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navigation from './components/navigation/navigation';
import Products from './components/products/products';
import AdminAccount from './components/adminAccount/adminAccount';
import { AdminContextProvider } from './context/adminContext';

function App() {
  return (
    <div className="App">
      <StickersContextProvider>
        <AdminContextProvider>
          <BrowserRouter>
            <Navigation/>
              <Routes>
                <Route path="/" element={<Products/>}></Route>
                <Route path="/AdminAccount" element={<AdminAccount/>}></Route>
              </Routes>
          </BrowserRouter>
        </AdminContextProvider>  
      </StickersContextProvider>
    </div>
  );
}

export default App;
