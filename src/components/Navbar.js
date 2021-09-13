  
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import {
    Button,
  } from "@material-ui/core";

const logoutNow = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

const navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to='/'>Blog Enclave</Link>
        <button 
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <NavLink className="nav-link" exact to='/'>Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/blog'>Blog</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/search'>Search</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/addpost'>AddPost</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/profile'>Profile</NavLink>
                </li>
                <Button  onClick={logoutNow}>
          Logout
        </Button>
                
            </ul>
        </div>
    </nav>
);

export default navbar;