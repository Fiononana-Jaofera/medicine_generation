import { Nav, NavLink } from "./navbar.elements";
const Navbar = () => {
    return (
        <Nav>
            <NavLink to="/">Médicaments</NavLink>
            <NavLink to="/symptoms">Symptômes</NavLink>
            <NavLink to="/effects">Effets</NavLink>
            <NavLink to="/consultation">Consultation</NavLink>
        </Nav>
    )
}

export default Navbar;