import react from 'react'
import './Navbar.css'
import './DropdownNav.js';
import DropdownNav from './DropdownNav.js';
import { Button, TextField,IconButton } from '@mui/material';
import { PersonRounded, SearchRounded, ShoppingCartRounded } from '@mui/icons-material';
import logo from "../assets/trendy-transparent.png";
import { useNavigate } from 'react-router-dom';

export default function Navbar(){

    const navigate=useNavigate();
     
    const womenMenuItems=[
        {label:"Bags",path:"/women/bags"},
        {label:"Accessories",path:"/women/accessories"},
        {label:"Wallets",path:"/women/wallets"}
    ];

    const menMenuItems=[
        {label:"Bags",path:"/men/bags"},
        {label:"Belts",path:"/men/belts"},
        {label:"Wallets",path:"/men/wallets"}
    ];

    const handleAccountClick=()=>{
        navigate("/login");
    }
    const handleCartClick=()=>{
        navigate("/shopping-cart");
    }

    return(
        <div className='navbar'>
            
                <img src={logo} alt="Trendy Bags Logo" className='logo-img-nav'/>
                <DropdownNav btnLabel="Women" menuItems={womenMenuItems}/>
                <DropdownNav btnLabel="Men" menuItems={menMenuItems} />
                <form id='search-form'>
                    <input type='search' 
                           id='search-field-nav'
                           placeholder='Search by...'/> 
                </form> 
                {/* <Button className='round-nav-btn'><ShoppingCartRounded/></Button>
                <Button className='round-nav-btn'><PersonRounded/></Button>             */}
                <IconButton className="round-nav-btn" onClick={handleCartClick} ><ShoppingCartRounded/></IconButton>
                <IconButton onClick={handleAccountClick} ><PersonRounded className="round-nav-btn" id="account-btn" /></IconButton>
        </div>
    )
}