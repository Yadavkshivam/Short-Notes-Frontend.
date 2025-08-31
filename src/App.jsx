import React from 'react';
import AppRoutes from './routes/AppRoutes.jsx';
import Navbar from './components/Navbar.jsx';


export default function App() {
return (
<div className="container">
<Navbar /> 
<AppRoutes />
</div>
);
}