import React from "react";
import { Link, NavLink } from "react-router-dom";


const AdminTopNav = () => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navTopAdmin navbar-dark">
            <div className="container-fluid">
                <Link to="/"><img className="logoNav" src={require('../../img/logo.png')} alt="logo" /></Link>
                <div id="navbarNavAdmin">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/events">
                                Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default AdminTopNav;