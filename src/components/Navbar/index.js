import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
import { ReactComponent as Logo } from "react";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <img src="./stglogo.png" alt="logo" style={{width: "180px", height: "100px"}} />
        <NavLink to="/home" activeStyle>
            HOME
          </NavLink>
          <NavLink to="/policies" activeStyle>
            POLICIES
          </NavLink>
          <NavLink to="/payment" activeStyle>
            PAYMENT
          </NavLink>
          <NavLink to="/info" activeStyle>
            INFO
          </NavLink>
          <NavLink to="/status" activeStyle>
            STATUS
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
