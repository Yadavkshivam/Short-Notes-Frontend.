import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


export default function Navbar() {
const { user, logout, token } = useAuth();
const nav = useNavigate();


function handleLogout() {
logout();
nav('/login');
}


return (
<nav>
<Link to="/" style={{ textDecoration: 'none' }}><h3>📝 Notes</h3></Link>
<div>
{token ? (
<>
<span className="small" style={{ marginRight: 12 }}>Hi, {user?.name || user?.email}</span>
<button className="btn" onClick={handleLogout}>Logout</button>
</>
) : (
<>
<Link to="/login"><button className="btn">Login</button></Link>
<Link to="/signup" style={{ marginLeft: 8 }}><button className="btn btn-primary">Signup</button></Link>
</>
)}
</div>
</nav>
);
}