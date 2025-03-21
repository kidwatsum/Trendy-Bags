import React, { useState } from "react";
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Dropdown arrow
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import "./DropdownNav.css";


const DropdownNav=({btnLabel,menuItems})=>{
    const[anchor,setAnchor]=useState(null);
    const open=Boolean(anchor);

    const handleClick=(e)=>{
        setAnchor(e.currentTarget);
    };

    const handleClose=()=>{
        setAnchor(null);
    };

    return(
        <>
            <Button aria-controls="dropdown-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    variant="contained"
                    endIcon={<KeyboardArrowDownRoundedIcon/>}
                    className="dropdown-btn-nav"
                    >
                        {btnLabel}
                    </Button>
                    <Menu anchorEl={anchor} 
                          open={open}
                          onClose={handleClose}
                          >
                            {menuItems && menuItems.length > 0 ? (
                                menuItems.map((item,index)=>{
                                    return(
                                        <MenuItem key={index} onClick={handleClose} component={Link} to={item.path}>
                                            <ListItemText primary={item.label}/>
                                    </MenuItem>
                                    );
                                })
                            ):(
                               <MenuItem disabled>No items</MenuItem> 
                            )}
                          </Menu>
        </>
    )

}

export default DropdownNav;