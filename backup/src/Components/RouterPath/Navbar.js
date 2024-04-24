import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.module.css"
import Logo from "../../imgs/natwest-logo.png"
function Navbar(props) {
    const NavlinkCSS=({isActive})=>{
        return {
            fontWeight: isActive ? 'bold' : 'lighter',
            fontSize: isActive ? '20px': '18px',
        }

    }
    return (

        // <>
        // <div className="logo">
        //     <img src={Logo} alt="" />
        //     <span className="logohead">MRX <span>Progressive</span></span>
        //   </div>
        <nav>
            {/* <div className='headrs'> */}
          <div className="logo">
            <img className="mainlogo" src={Logo} alt="" />
            <br />
            <span className="logohead">Market Risk Dashboard</span>
          </div>
          {/* <h1 className='DashHeading'>MRX Dashboard</h1> */}
        {/* </div> */}
           <NavLink style={NavlinkCSS} to='/'>Venture</NavLink>
            <NavLink style={NavlinkCSS} to='/nv'>Non-Venture</NavLink>
            <NavLink style={NavlinkCSS} to='/forest'>Forest</NavLink>
            

        </nav>
        // </>
    );
}
export default Navbar;