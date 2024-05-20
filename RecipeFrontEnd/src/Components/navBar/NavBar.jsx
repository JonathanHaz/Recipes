import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/Recipes.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const controlNavbar = () => {
    if (window.scrollY > 150) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    location.reload();
  };
  const handleSignIn = () => {
    navigate("/auth");
  };

  return (
    <div>
      {user ? (
        <Navbar
          expand="lg"
          className={` NavBarDiv activeNav ${show && "hidden"}`}
        >
          <Container className={isNavOpen ? "navOpenBackground" : ""}>
            <Navbar.Brand href="/home">
              <img src={logo} />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={handleNavToggle}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar-light">
                <Nav.Link href="/recipes">Recipes</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link href="/createR">Create Recipe</Nav.Link>
                <Nav.Link href="/cookbooks">Cookbook</Nav.Link>

                <Nav.Link href="/createCB">Create CookBook</Nav.Link>

                {user.role === 'admin' && (

                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                )}
              </Nav>
              <Nav className="ml-auto">
                <div className="AuthDivNav">
                  <div className="DivForSignOutBtn">
                    <Link to={"/profile"}>
                      <i className="fa-regular fa-circle-user"></i>
                    </Link>
                    <button className={`SignOutBtn `} onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar
          expand="lg"
          className={` NavBarDiv activeNav ${show && "hidden"}`}
        >
          <Container className={isNavOpen ? "navOpenBackground" : ""}>
            <Navbar.Brand href="/home">
              <img src={logo} />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={handleNavToggle}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar-light">
                {/* <Nav.Link href="/auth">Auth</Nav.Link> */}
                <Nav.Link href="/recipes">Recipes</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
                {/* <Nav.Link href="/createR">CreateRecipe</Nav.Link> */}
                <Nav.Link href="/cookbook">Cookbook</Nav.Link>
                <Nav.Link href="/createCB">Create CookBook</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <div className="AuthDivNav">
                  <div className="DivForSignOutBtn">
                    <button className={`SignOutBtn `} onClick={handleSignIn}>
                      Sign In
                    </button>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default NavBar;
