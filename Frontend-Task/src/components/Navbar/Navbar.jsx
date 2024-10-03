import React from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Logo from '../../assets/logo.png';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MDBIcon } from 'mdbreact';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';;


axios.defaults.withCredentials = true;
function NavbarComponent({ loggedIn, username, onLogout }) {

  const handleLogout = () => {
    axios.post("https://task-backend-q4kt.onrender.com/logout")
    .then((response)=>{
      console.log(response.data)
      if(!response.data) onLogout();
    })
    .catch((err)=>console.log("error: ",err));
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={Logo} height="60" width="150" alt="Logo" id="img" loading="lazy" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

          <form className="search-bar">
          <div className="search-box">
            <MDBIcon className="search-icon ml-2" icon="search" />
            <input type="text" placeholder="Search for anything" />
            <button type="submit">Search</button>
          </div>
        </form>

            <Nav>
              {loggedIn ? (
                <>
                  <Nav.Link className="text-primary fw-bold">Hello {username}</Nav.Link>
                  <Nav.Link onClick={handleLogout} className="logout">
                    <h4 className="linkText">Logout</h4>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="login">
                    <h4 className="linkText1">Log in</h4>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" className="signup">
                    <h4 className="linkText2">Sign up</h4>
                  </Nav.Link>
                </>
              )} 
            </Nav>
            <Nav.Link as={Link} to="/contact" className="contact">
          <h4 className="linkText3">Contact Us</h4>
        </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
 
    </>
  );
}
export default NavbarComponent;