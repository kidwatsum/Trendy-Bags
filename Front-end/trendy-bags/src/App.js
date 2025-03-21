import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import WomenBags from './pages/Women/WomenBags';
import WomenAccessories from './pages/Women/WomenAccessories';
import WomenWallets from './pages/Women/WomenWallets';
import MenBags from './pages/Men/MenBags';
import MenBelts from './pages/Men/MenBelts';
import MenWallets from './pages/Men/MenWallets';
import { Router,Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth_Pages/Login';
import Register from './pages/Auth_Pages/Register';
import AddProduct from './pages/Admin/AddProduct';
import Cart from './pages/User/Cart';
import AdminPanel from './pages/Admin/AdminPanel';
import EditProduct from './pages/Admin/EditForm';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
     <Route path="/women/bags" element={<WomenBags/>}/>
      <Route path="/women/accessories" element={<WomenAccessories/>}/>
      <Route path="/women/wallets" element={<WomenWallets/>}/>
      <Route path="/men/bags" element={<MenBags/>}/>
      <Route path="/men/belts" element={<MenBelts/>}/>
      <Route path="/men/wallets" element={<MenWallets/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/add-product' element={<AddProduct/>}/>
      <Route path='/shopping-cart' element={<Cart/>}/>
      <Route path='/admin' element={<AdminPanel/>}/>
      <Route path='/edit-product/:id' element={<EditProduct/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
